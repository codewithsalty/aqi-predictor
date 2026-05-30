from datetime import timedelta
from io import BytesIO

import joblib
import pandas as pd

from .config import settings
from .db import db
from .features import create_time_series_features
from .storage import load_model_bytes_from_gridfs
from .utils import risk_level, utc_now


def _latest_registry():
    return db[settings.registry_collection].find_one(sort=[("registered_at", -1)])


def predict_next_3_days() -> dict:
    latest = _latest_registry()
    if not latest:
        raise ValueError("No registered model found.")

    if latest.get("gridfs_model_id"):
        model_bytes = load_model_bytes_from_gridfs(latest["gridfs_model_id"])
        artifact = joblib.load(BytesIO(model_bytes))
    else:
        artifact = joblib.load(latest["model_path"])

    models = artifact["models"]
    feature_columns = artifact["feature_columns"]

    docs = list(
        db[settings.feature_collection]
        .find({"city": settings.city}, {"_id": 0})
        .sort("timestamp", 1)
    )
    raw = pd.DataFrame(docs)
    raw["timestamp"] = pd.to_datetime(raw["timestamp"], utc=True)
    feats = create_time_series_features(raw)
    # We only need features from the most recent daily row for next-day horizon models.
    daily = (
        feats.set_index("timestamp")
        .resample("D")
        .mean(numeric_only=True)
        .reset_index()
        .sort_values("timestamp")
    )
    latest_row = daily.tail(1).copy()
    x = latest_row[feature_columns].ffill().dropna(axis=1, how="all")
    day1 = float(models["day_1"].predict(x)[0])
    day2 = float(models["day_2"].predict(x)[0])
    day3 = float(models["day_3"].predict(x)[0])

    base_day = utc_now().date()
    result = {
        "city": settings.city,
        "generated_at": utc_now().isoformat(),
        "model": latest["champion_model"],
        "predictions": [
            {"date": str(base_day + timedelta(days=1)), "aqi": day1, "risk": risk_level(day1)},
            {"date": str(base_day + timedelta(days=2)), "aqi": day2, "risk": risk_level(day2)},
            {"date": str(base_day + timedelta(days=3)), "aqi": day3, "risk": risk_level(day3)},
        ],
    }
    db[settings.predictions_collection].insert_one(result)
    return result
