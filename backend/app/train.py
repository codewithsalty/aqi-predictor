import json
from pathlib import Path
from typing import Any

import joblib
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import TimeSeriesSplit

from .config import settings
from .db import db, ensure_indexes, record_pipeline_run
from .features import create_time_series_features, make_day_targets
from .storage import save_model_to_gridfs
from .utils import utc_now


FEATURE_COLUMNS = [
    "aqi",
    "pm10",
    "pm2_5",
    "co",
    "no2",
    "so2",
    "o3",
    "day",
    "month",
    "aqi_delta",
    "aqi_lag_1",
    "aqi_lag_2",
    "aqi_lag_3",
    "pm2_5_lag_1",
    "pm10_lag_1",
    "pm2_5_roll_3",
    "pm10_roll_3",
]


def _models() -> dict[str, Any]:
    return {
        "ridge": Ridge(alpha=1.0),
        "random_forest": RandomForestRegressor(n_estimators=200, random_state=42),
        "gradient_boosting": GradientBoostingRegressor(random_state=42),
    }


def _rmse(y_true, y_pred) -> float:
    return mean_squared_error(y_true, y_pred) ** 0.5


def _evaluate_model(name: str, model, x: pd.DataFrame, y: pd.Series) -> dict[str, float]:
    splitter = TimeSeriesSplit(n_splits=3)
    fold_metrics = []
    for train_idx, test_idx in splitter.split(x):
        x_train, x_test = x.iloc[train_idx], x.iloc[test_idx]
        y_train, y_test = y.iloc[train_idx], y.iloc[test_idx]
        model.fit(x_train, y_train)
        preds = model.predict(x_test)
        fold_metrics.append(
            {
                "rmse": _rmse(y_test, preds),
                "mae": mean_absolute_error(y_test, preds),
                "r2": r2_score(y_test, preds),
            }
        )
    return {
        "rmse": float(sum(m["rmse"] for m in fold_metrics) / len(fold_metrics)),
        "mae": float(sum(m["mae"] for m in fold_metrics) / len(fold_metrics)),
        "r2": float(sum(m["r2"] for m in fold_metrics) / len(fold_metrics)),
    }


def train_and_register() -> dict[str, Any]:
    ensure_indexes()
    docs = list(
        db[settings.feature_collection]
        .find({"city": settings.city}, {"_id": 0})
        .sort("timestamp", 1)
    )
    if len(docs) < 200:
        raise ValueError("Insufficient feature data. Need at least 200 records.")

    raw = pd.DataFrame(docs)
    raw["timestamp"] = pd.to_datetime(raw["timestamp"], utc=True)
    ts_df = create_time_series_features(raw)
    daily = make_day_targets(ts_df)
    daily = daily.dropna()

    x = daily[FEATURE_COLUMNS].ffill().dropna()
    y_all = {
        "day_1": daily["target_day_1"].loc[x.index],
        "day_2": daily["target_day_2"].loc[x.index],
        "day_3": daily["target_day_3"].loc[x.index],
    }

    if len(x) < 30:
        raise ValueError("Not enough processed daily points after feature creation.")

    horizon_models: dict[str, Any] = {}
    all_horizon_metrics: dict[str, list[dict[str, Any]]] = {}

    for horizon, y in y_all.items():
        metrics_rows = []
        trained_models = {}
        for name, model in _models().items():
            metrics = _evaluate_model(name, model, x, y)
            trained_models[name] = model.fit(x, y)
            metrics_rows.append({"model": name, **metrics})

        metrics_df = pd.DataFrame(metrics_rows).sort_values("rmse", ascending=True)
        champion = metrics_df.iloc[0].to_dict()
        champion_name = champion["model"]
        champion_model = trained_models[champion_name]
        all_horizon_metrics[horizon] = json.loads(metrics_df.to_json(orient="records"))
        horizon_models[horizon] = {
            "champion_name": champion_name,
            "champion_model": champion_model,
            "summary": champion,
        }
        if champion["r2"] > 0.999:
            record_pipeline_run(
                "training",
                "warning",
                {
                    "reason": "suspiciously_high_r2",
                    "horizon": horizon,
                    "value": champion["r2"],
                },
            )

    model_dir = Path(settings.model_storage_dir)
    model_dir.mkdir(parents=True, exist_ok=True)
    model_path = model_dir / f"champions_{utc_now().strftime('%Y%m%d_%H%M%S')}.joblib"
    joblib.dump(
        {
            "models": {
                "day_1": horizon_models["day_1"]["champion_model"],
                "day_2": horizon_models["day_2"]["champion_model"],
                "day_3": horizon_models["day_3"]["champion_model"],
            },
            "feature_columns": FEATURE_COLUMNS,
            "city": settings.city,
            "trained_at": utc_now().isoformat(),
        },
        model_path,
    )
    model_gridfs_id = str(save_model_to_gridfs(model_path))

    evaluated_at = utc_now()
    db[settings.metrics_collection].insert_one(
        {
            "city": settings.city,
            "evaluated_at": evaluated_at,
            "metrics": all_horizon_metrics,
        }
    )
    db[settings.registry_collection].insert_one(
        {
            "city": settings.city,
            "registered_at": evaluated_at,
            "champion_model": {
                "day_1": horizon_models["day_1"]["champion_name"],
                "day_2": horizon_models["day_2"]["champion_name"],
                "day_3": horizon_models["day_3"]["champion_name"],
            },
            "model_path": str(model_path),
            "gridfs_model_id": model_gridfs_id,
            "feature_columns": FEATURE_COLUMNS,
            "summary": {
                "day_1": horizon_models["day_1"]["summary"],
                "day_2": horizon_models["day_2"]["summary"],
                "day_3": horizon_models["day_3"]["summary"],
            },
        }
    )
    record_pipeline_run(
        "training",
        "success",
        {
            "champions": {
                "day_1": horizon_models["day_1"]["champion_name"],
                "day_2": horizon_models["day_2"]["champion_name"],
                "day_3": horizon_models["day_3"]["champion_name"],
            },
            "model_path": str(model_path),
            "gridfs_model_id": model_gridfs_id,
        },
    )
    return {
        "champion": {
            "day_1": horizon_models["day_1"]["champion_name"],
            "day_2": horizon_models["day_2"]["champion_name"],
            "day_3": horizon_models["day_3"]["champion_name"],
        },
        "model_path": str(model_path),
        "gridfs_model_id": model_gridfs_id,
        "metrics": all_horizon_metrics,
    }
