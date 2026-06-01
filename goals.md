# Goals and Current Status

## Original Goal

Build a strong internship submission for AQI prediction that can compete well against other students by being complete, reliable, and easy to evaluate.

Core objective:
- Predict AQI for the next 3 days for Islamabad.
- Use cloud storage for features and model evidence.
- Automate ingestion and training.
- Provide a clean API and UI.
- Produce clear report/evidence for evaluation and viva.

## Requirements We Wanted To Cover

- Single-city AQI forecasting for Islamabad.
- Live API ingestion instead of relying only on a static Kaggle dataset.
- MongoDB Atlas as cloud feature/model store.
- At least 3 trained models.
- Dynamic champion selection.
- 3-day forecast output.
- GitHub Actions automation.
- Quality audit.
- EDA artifacts.
- Explainability artifact.
- Frontend dashboard.
- Final report and viva support material.

## Completed

- MongoDB Atlas cluster configured.
- GitHub repository created and pushed.
- GitHub Actions secrets configured.
- Feature Pipeline green.
- Training Pipeline green.
- Backfill/history present in Atlas.
- Islamabad-only Atlas data after cleanup.
- Feature store collection populated.
- Model metrics collection populated.
- Model registry collection populated.
- GridFS model artifact stored.
- MLP neural-network challenger added to the model experiment set.
- Predictions collection populated.
- Quality audits collection populated.
- Backend API implemented.
- Frontend dashboard implemented and upgraded.
- Optional Streamlit dashboard wrapper added for rubric compatibility.
- Tests pass.
- Frontend build passes.
- Report auto-filled with latest runtime evidence.
- Evidence snapshot generated.
- Viva script and compliance docs created.

## Current Status

The project is functionally complete for local/demo evaluation.

Working local services:
- Backend API: `http://127.0.0.1:8000`
- Frontend dashboard: `http://127.0.0.1:3000`

Latest verified model automation:
- Feature Pipeline ran successfully on GitHub Actions.
- Training Pipeline ran successfully on GitHub Actions.
- Training stores new model metrics and model artifacts back into MongoDB Atlas.

Latest verified cloud data:
- `features_v1`: Islamabad data only.
- `model_metrics`: Islamabad metrics only.
- `model_registry`: Islamabad registry entries only.
- `predictions`: Islamabad predictions only.
- `quality_audits`: Islamabad quality audit records only.

## How The Model Trains On Its Own

The model trains automatically through GitHub Actions.

The Training Pipeline workflow is scheduled in `.github/workflows/training-pipeline.yml`.

It runs:
- on a daily schedule
- manually when clicked from the GitHub Actions tab

When it runs, GitHub Actions:
- installs Python dependencies
- reads data from MongoDB Atlas using repository secrets
- trains Ridge, Random Forest, and Gradient Boosting models
- selects the best model per horizon
- stores metrics in Atlas
- stores model registry metadata in Atlas
- stores the trained model artifact in GridFS

The local PC does not need to stay on for GitHub Actions automation.

## Remaining Before Final Submission

- Add live deployment link if deploying publicly.
- Add demo video link after recording.
- Take final screenshots of green Actions and Atlas collections.
- Submit repository, report, screenshots, and demo video.

## Demo Talking Points

- The project forecasts Islamabad AQI for the next 3 days.
- Data is ingested from Open-Meteo and stored in MongoDB Atlas.
- Features include time, lag, rolling, and AQI delta values.
- Three models are trained and evaluated using time-series validation.
- The champion model is selected dynamically by lowest RMSE for each horizon.
- Model artifacts are stored in GridFS and metadata is stored in MongoDB.
- GitHub Actions automates ingestion and training.
- The dashboard reads from FastAPI and shows forecast plus pipeline health.
