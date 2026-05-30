from __future__ import annotations

from typing import Any

import pandas as pd

from .config import settings
from .db import db, record_pipeline_run
from .features import create_time_series_features, make_day_targets
from .utils import utc_now


def run_data_quality_audit() -> dict[str, Any]:
    docs = list(
        db[settings.feature_collection]
        .find({"city": settings.city}, {"_id": 0})
        .sort("timestamp", 1)
    )
    if not docs:
        raise ValueError("No feature data found for selected city.")

    raw = pd.DataFrame(docs)
    raw["timestamp"] = pd.to_datetime(raw["timestamp"], utc=True)

    duplicate_count = int(raw.duplicated(subset=["city", "timestamp"]).sum())
    null_counts = raw.isnull().sum().to_dict()
    total_rows = len(raw)

    # Expected range check for Open-Meteo AQI scale.
    out_of_range_aqi = int(((raw["aqi"] < 0) | (raw["aqi"] > 500)).fillna(False).sum())

    ts_df = create_time_series_features(raw)
    daily = make_day_targets(ts_df)
    leakage_hint = bool(daily["target_day_1"].isna().mean() < 0.01)

    audit = {
        "city": settings.city,
        "audited_at": utc_now(),
        "row_count": total_rows,
        "duplicate_rows": duplicate_count,
        "null_counts": null_counts,
        "aqi_out_of_range_rows": out_of_range_aqi,
        "leakage_risk_hint": leakage_hint,
        "status": "pass" if duplicate_count == 0 and out_of_range_aqi == 0 else "warning",
    }
    db["quality_audits"].insert_one(audit)
    record_pipeline_run(
        "data_quality_audit",
        "success",
        {
            "duplicates": duplicate_count,
            "aqi_out_of_range_rows": out_of_range_aqi,
            "status": audit["status"],
        },
    )
    return audit
