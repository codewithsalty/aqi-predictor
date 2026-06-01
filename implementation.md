# Implementation Notes

## Architecture

The project is split into four main layers:

1. Data ingestion
2. Feature/model pipeline
3. FastAPI backend
4. Next.js dashboard

Data comes from the Open-Meteo Air Quality API and is written into MongoDB Atlas. The backend then trains models from stored feature data, registers champion models, and serves predictions to the frontend.

## Backend

Backend location:
- `backend/app`
- `backend/scripts`

Main components:
- `app/ingest.py`: fetches Open-Meteo hourly AQI/pollutant data and upserts it into MongoDB.
- `app/features.py`: creates time, lag, rolling, and target features.
- `app/train.py`: trains multiple models and selects horizon-specific champions.
- `app/predict.py`: loads the latest model from GridFS and returns Day+1, Day+2, Day+3 predictions.
- `app/quality.py`: runs data quality checks for duplicates, nulls, AQI range, and leakage indicators.
- `app/api.py`: exposes FastAPI endpoints for health, metrics, prediction, pipeline status, and quality.

API endpoints:
- `GET /health`
- `GET /predict`
- `GET /metrics/latest`
- `GET /pipeline/health`
- `GET /quality/latest`
- `POST /quality/run`

## Model Training

Training is performed by:
- `backend/scripts/run_train.py`

The training pipeline:
- Reads Islamabad feature records from MongoDB Atlas.
- Builds lag, rolling, and time-based features.
- Creates Day+1, Day+2, and Day+3 target columns.
- Trains at least 3 regressors:
  - Ridge
  - RandomForestRegressor
  - GradientBoostingRegressor
  - MLPRegressor neural-network challenger
- Uses time-series validation.
- Logs RMSE, MAE, and R2.
- Selects the best model for each forecast horizon by lowest RMSE.
- Stores metrics in `model_metrics`.
- Stores registry metadata in `model_registry`.
- Stores the model artifact in MongoDB GridFS.

Latest champion pattern before the MLP challenger was added:
- Day+1: ridge
- Day+2: random_forest
- Day+3: gradient_boosting

## Automation

GitHub Actions workflows:
- `.github/workflows/feature-pipeline.yml`
- `.github/workflows/training-pipeline.yml`
- `.github/workflows/manual-recovery.yml`

Automation behavior:
- Feature Pipeline runs hourly and can also be triggered manually.
- Training Pipeline runs daily and can also be triggered manually.
- Manual Recovery can run a 90-day backfill and then retrain if needed.

This means the model can retrain on its own after the repo secrets are configured. GitHub Actions pulls data from Atlas, trains models in the runner, stores metrics/model artifacts back in Atlas, and exits with green/red status for evidence.

## Frontend

Frontend location:
- `frontend/app`

Current dashboard includes:
- Islamabad status header.
- 3-day forecast cards.
- AQI risk badges.
- Forecast trend chart.
- Model freshness timestamp.
- Latest training timestamp.
- Recent pipeline health list.

Frontend environment:
- `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000`

An optional Streamlit dashboard is also included in `streamlit_dashboard/app.py` for rubric compatibility. It reads from the same FastAPI endpoints and can be run with `streamlit run app.py`.

## Verification Completed

Verified locally:
- Backend tests passed.
- Frontend production build passed.
- API `/health` returned Islamabad.
- API `/metrics/latest` returned model metrics.
- API `/predict` returned 3-day forecast.
- API `/quality/run` returned pass.
- Dashboard served locally at `http://127.0.0.1:3000`.

Verified in cloud:
- Feature Pipeline green.
- Training Pipeline green.
- MongoDB Atlas contains Islamabad records in all city-based collections.
- GridFS model artifact exists.
