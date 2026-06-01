from __future__ import annotations

import os
from datetime import datetime

import pandas as pd
import requests
import streamlit as st


API_BASE = os.getenv("AQI_API_BASE_URL", "http://127.0.0.1:8000")


def _get_json(path: str) -> dict:
    response = requests.get(f"{API_BASE}{path}", timeout=30)
    response.raise_for_status()
    return response.json()


def _format_dt(value: str | None) -> str:
    if not value:
        return "Not available"
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).strftime("%b %d, %Y %H:%M")
    except ValueError:
        return value


st.set_page_config(page_title="Pearls AQI Predictor", page_icon="AQI", layout="wide")

st.title("Pearls AQI Predictor")
st.caption("Islamabad 3-day AQI forecast powered by FastAPI, MongoDB Atlas, and GitHub Actions.")

try:
    prediction = _get_json("/predict")
    metrics = _get_json("/metrics/latest")
    quality = _get_json("/quality/latest")
    pipeline = _get_json("/pipeline/health")
except Exception as exc:
    st.error(f"Dashboard data could not be loaded: {exc}")
    st.stop()

cards = st.columns(4)
cards[0].metric("City", prediction.get("city", "Islamabad"))
cards[1].metric("Next-day AQI", f"{prediction['predictions'][0]['aqi']:.1f}")
cards[2].metric("Latest Training", _format_dt(metrics.get("evaluated_at")))
cards[3].metric("Quality Status", quality.get("status", "unknown").title())

st.subheader("3-Day Forecast")
forecast_df = pd.DataFrame(prediction["predictions"])
st.dataframe(forecast_df, use_container_width=True, hide_index=True)
st.line_chart(forecast_df.set_index("date")["aqi"])

if any("Hazardous" in item["risk"] for item in prediction["predictions"]):
    st.error("Hazardous AQI alert active.")
else:
    st.success("No hazardous AQI alert in the current 3-day forecast.")

st.subheader("Champion Models")
st.json(prediction.get("model", {}))

st.subheader("Latest Pipeline Runs")
runs_df = pd.DataFrame(pipeline.get("recent_runs", []))
if runs_df.empty:
    st.info("No pipeline runs available.")
else:
    st.dataframe(
        runs_df[["pipeline_name", "status", "run_at"]].head(8),
        use_container_width=True,
        hide_index=True,
    )

st.subheader("Model Metrics")
st.json(metrics.get("metrics", {}))
