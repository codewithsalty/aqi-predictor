# Project Context

## Internship Project

This repository is the AQI forecasting internship project for 10Pearls. The target is a single-city, evaluator-friendly AQI forecasting system for Islamabad that predicts AQI for the next 3 days.

The original mentor guidance and sync notes emphasized:
- Use a cloud feature store or cloud database.
- Use automated pipelines, preferably GitHub Actions.
- Train multiple models, not a hardcoded single model.
- Store model metadata/artifacts and metrics.
- Provide a working UI/API demo.
- Keep evidence clear for evaluation and viva.

## City Scope

The final project scope is:
- City: Islamabad
- Latitude: 33.6844
- Longitude: 73.0479
- Timezone: Asia/Karachi

Old Lahore records were removed from MongoDB Atlas. Current city-based Atlas collections are Islamabad-only.

## Current Cloud Setup

MongoDB Atlas database:
- Database: `aqi_predictor`
- Feature collection: `features_v1`
- Metrics collection: `model_metrics`
- Model registry collection: `model_registry`
- Pipeline log collection: `pipeline_runs`
- Prediction collection: `predictions`
- Quality audit collection: `quality_audits`
- Model binary storage: GridFS via `fs.files` and `fs.chunks`

GitHub repository:
- `https://github.com/codewithsalty/aqi-predictor`

Configured GitHub Actions secrets:
- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `CITY`
- `LATITUDE`
- `LONGITUDE`

## Current Runtime Evidence

Latest verified state:
- Feature Pipeline: green on GitHub Actions.
- Training Pipeline: green on GitHub Actions.
- Atlas city data: Islamabad only.
- Latest feature rows: 2208 Islamabad records.
- Latest model registry: champion model entry stored in MongoDB and GridFS.
- Latest quality audit: pass.
- Backend API: verified locally.
- Frontend dashboard: upgraded and verified by production build.

Latest forecast generated locally:
- 2026-06-02: AQI 128.15, Unhealthy for Sensitive Groups
- 2026-06-03: AQI 142.34, Unhealthy for Sensitive Groups
- 2026-06-04: AQI 111.22, Unhealthy for Sensitive Groups

## Important Notes

The project previously had old Lahore records from earlier runs. These were cleaned from Atlas so final evidence matches Islamabad.

The GitHub Actions workflows train and ingest using Atlas secrets, so they do not need the local machine to be on.

No weather API key is required because the pipeline uses the Open-Meteo Air Quality API.
