# Project Context

## Purpose

This repository is the internship project for the 10Pearls Data Sciences track: Pearls AQI Predictor.

The task was to build an end-to-end AQI forecasting system for the user's city that predicts the next 3 days of AQI. The project needed to show data collection, feature engineering, model training, model storage, automated pipelines, a dashboard, and clear evidence for evaluation.

The final city is Islamabad, Pakistan.

## Original Requirement Summary

The candidate portal and project PDF asked for:

- AQI prediction for the next 3 days.
- Live or API-based weather and pollutant data collection.
- Feature pipeline development.
- Historical data backfill for training.
- Feature store usage through Hopsworks, Vertex AI, or a cloud alternative.
- Training pipeline that fetches historical features and targets.
- Multiple ML models such as Random Forest, Ridge Regression, TensorFlow or PyTorch style models.
- Evaluation with RMSE, MAE, and R2.
- Model registry or model storage.
- Automated CI/CD through GitHub Actions, Airflow, or similar.
- Dashboard through Streamlit, Gradio, Flask/FastAPI, or a similar web stack.
- EDA, feature importance or SHAP/LIME style reporting.
- Hazard alerts for risky AQI levels.
- GitHub repository submission with detailed README.

## Final Strategy

We chose a single-city system for Islamabad because the mentor guidance repeatedly focused on "your city". This makes the project safer, cleaner, and easier to defend before the deadline.

Final implementation choices:

- City: Islamabad
- Latitude: 33.6844
- Longitude: 73.0479
- Timezone: Asia/Karachi
- Data source: Open-Meteo weather and air quality APIs
- Feature store: MongoDB Atlas
- Model registry/storage: MongoDB Atlas plus GridFS
- Automation: GitHub Actions
- Backend API: FastAPI deployed on Render
- Frontend: Next.js product dashboard prepared for Vercel
- Repository: https://github.com/codewithsalty/aqi-predictor

MongoDB Atlas was used as the cloud feature store and registry because it is stable, evaluator-visible, and accepted as a cloud storage alternative when Hopsworks/Vertex-style setups are unstable or slow.

## What We Built

We built a complete cloud-backed machine learning product, not just a notebook.

The project now includes:

- Automated feature ingestion pipeline.
- Historical Islamabad AQI/weather feature store.
- Feature engineering with lag, rolling, time, pollutant, and AQI delta features.
- Data quality audit collection.
- Automated training pipeline.
- Multiple trained models.
- Dynamic champion selection.
- Model metrics history.
- Model registry records.
- Model artifacts stored in MongoDB GridFS.
- FastAPI backend with prediction and evidence endpoints.
- Render backend deployment.
- Next.js frontend with landing page, dashboard, methodology page, and about/creator page.
- Vercel deployment documentation.
- README and final project documentation.

## Current Live URLs

GitHub repository:

```text
https://github.com/codewithsalty/aqi-predictor
```

Backend API on Render:

```text
https://aqi-predictor-api-cuec.onrender.com
```

Important backend endpoints:

```text
/health
/predict
/metrics/latest
/models/latest
/pipeline/health
/quality/latest
```

Frontend local production preview, when running locally:

```text
http://127.0.0.1:3001
```

The final frontend should be deployed on Vercel from GitHub.

## MongoDB Atlas Structure

Database:

```text
aqi_predictor
```

Collections used:

```text
features_v1
model_metrics
model_registry
pipeline_runs
predictions
quality_audits
fs.files
fs.chunks
```

Collection purpose:

- `features_v1`: processed Islamabad feature records.
- `model_metrics`: RMSE, MAE, and R2 results for trained models.
- `model_registry`: champion model summary and feature list.
- `pipeline_runs`: feature, training, and audit run evidence.
- `predictions`: generated 3-day prediction records.
- `quality_audits`: duplicate/null/out-of-range/leakage checks.
- `fs.files` and `fs.chunks`: GridFS binary model artifact storage.

No MongoDB credentials or full connection string should be written in this file or committed to GitHub.

## GitHub Actions Automation

Feature pipeline workflow:

```text
.github/workflows/feature-pipeline.yml
```

Training pipeline workflow:

```text
.github/workflows/training-pipeline.yml
```

Manual recovery workflow:

```text
.github/workflows/manual-recovery.yml
```

Feature pipeline behavior:

- Runs on schedule every hour using GitHub Actions cron.
- Has a primary hourly trigger and a backup hourly trigger.
- Uses deduplication, so backup runs do not corrupt the feature store.
- Can also be run manually from the GitHub Actions tab.
- Fetches current Islamabad weather and air quality data.
- Builds processed features.
- Stores features in MongoDB Atlas.
- Writes pipeline run logs to Atlas.

Training pipeline behavior:

- Runs daily using GitHub Actions cron.
- Has a primary daily trigger and a backup daily trigger.
- Also has a training catch-up check after feature pipeline runs.
- Can also be run manually from the GitHub Actions tab.
- Reads historical feature records from Atlas.
- Trains multiple models.
- Evaluates models using RMSE, MAE, and R2.
- Saves metrics to `model_metrics`.
- Saves registry records to `model_registry`.
- Saves model binary artifacts to GridFS.
- Generates latest predictions.

Important note about GitHub cron:

GitHub Actions scheduled workflows do not always run at the exact minute shown in the YAML. Public GitHub runners can delay or occasionally skip scheduled jobs. To handle this, we added backup cron triggers and a catch-up training check. The evidence in GitHub Actions shows scheduled feature and training runs are happening and green.

## GitHub Secrets

The GitHub repository needs these Actions secrets:

```text
MONGODB_URI
MONGODB_DB_NAME
CITY
LATITUDE
LONGITUDE
```

Values are stored in GitHub Secrets and should not be committed to code.

Expected public-safe values:

```text
MONGODB_DB_NAME=aqi_predictor
CITY=Islamabad
LATITUDE=33.6844
LONGITUDE=73.0479
```

The full Atlas URI is private and must stay secret.

## Feature Engineering

The feature pipeline creates a training dataset from raw air quality and weather data.

Feature categories:

- Pollutants: `pm10`, `pm2_5`, `co`, `no2`, `so2`, `o3`
- Time features: `day`, `month`
- AQI movement: `aqi_delta`
- AQI memory: `aqi_lag_1`, `aqi_lag_2`, `aqi_lag_3`
- Pollutant memory: `pm2_5_lag_1`, `pm10_lag_1`
- Rolling signals: `pm2_5_roll_3`, `pm10_roll_3`

The feature store also records:

- City
- Timestamp
- AQI target
- Schema version
- Source
- Ingestion time

## Data Quality Checks

Quality checks include:

- Row count.
- Duplicate row count.
- Null counts.
- AQI out-of-range count.
- Leakage risk hint.
- Pass/fail status.

Current live quality status from backend:

```text
status: pass
row_count: 2208
```

## Model Training

Training reads historical Islamabad features from MongoDB Atlas.

Models trained:

```text
ridge
random_forest
gradient_boosting
mlp_neural_net
```

Metrics calculated:

```text
RMSE
MAE
R2
```

Validation style:

- Time-aware train/test split.
- No random shuffle for final validation.
- Newer records are used for evaluation so it behaves more like real forecasting.

## Champion Selection Logic

This project does not hardcode one winning model.

The system trains multiple models and compares them using metrics. It selects champion models separately for each forecast horizon:

- Day +1 can have one best model.
- Day +2 can have another best model.
- Day +3 can have another best model.

This is intentional because the best model for tomorrow may not be the best model for three days ahead.

Current live backend champion models:

```text
Day +1: ridge
Day +2: random_forest
Day +3: random_forest
```

The backend also exposes available model override options:

```text
gradient_boosting
mlp_neural_net
random_forest
ridge
```

The frontend model picker can compare the champion setup against individual trained models.

## Model Registry

The model registry is stored in MongoDB Atlas.

Registry contents include:

- City
- Registration time
- Champion model per horizon
- Overall leaderboard
- Feature columns
- Summary metrics
- GridFS model artifact ID
- Model artifact path reference

The binary model artifact is stored through GridFS in:

```text
fs.files
fs.chunks
```

This satisfies the requirement that trained models are stored in a registry/storage system, not just kept locally.

## Prediction Service

The backend is a FastAPI application.

It reads the latest registry and prediction records from MongoDB Atlas and serves them to the frontend.

Main API behavior:

- `/health` confirms API health and city.
- `/predict` returns Day +1, Day +2, and Day +3 AQI predictions.
- `/predict?model=ridge` or similar returns predictions using one selected model when supported.
- `/metrics/latest` returns latest model performance.
- `/models/latest` returns registry and model evidence.
- `/pipeline/health` returns recent successful automation runs.
- `/quality/latest` returns latest data quality audit.

Current live prediction evidence:

```text
generated_at: 2026-06-06T22:17:40.330817+00:00
prediction_count: 3
city: Islamabad
```

## Frontend Product

The frontend is a Next.js application in:

```text
frontend
```

It was upgraded into a complete product-style website that can be used for resume, demo, and final evaluation.

Pages included:

- `/` landing page
- `/dashboard` live AQI analytics dashboard
- `/methodology` methodology and system explanation
- `/about` creator/project profile for Salman Khan

Frontend features:

- Product landing page.
- Live 3-day AQI forecast cards.
- Forecast trend visualization.
- Model picker.
- Model leaderboard and diagnostics.
- Overall model ranking chart.
- Champion registry panel.
- Feature store evidence.
- Pipeline health evidence.
- Data quality audit cards.
- About/creator page.
- Methodology explanation page.
- Professional layout, animations, cards, and responsive styling.

The frontend uses this public environment variable:

```text
NEXT_PUBLIC_API_BASE_URL=https://aqi-predictor-api-cuec.onrender.com
```

Local file:

```text
frontend/.env.local
```

This file exists locally but is intentionally not tracked by GitHub.

Safe template file:

```text
frontend/.env.local.example
```

## Vercel Deployment Plan

Deploy frontend on Vercel by importing the GitHub repository.

Use these Vercel settings:

```text
Repository: codewithsalty/aqi-predictor
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

Add this Vercel environment variable:

```text
NEXT_PUBLIC_API_BASE_URL=https://aqi-predictor-api-cuec.onrender.com
```

The backend CORS has already been configured to allow Vercel preview/live domains using a regex for `*.vercel.app`.

After Vercel deployment, verify:

- Landing page loads.
- Dashboard loads.
- No failed-to-fetch message.
- Islamabad forecast numbers appear.
- Model picker works.
- Pipeline health appears.
- Methodology and about pages load.

## Render Backend Deployment

Backend is deployed on Render.

Backend URL:

```text
https://aqi-predictor-api-cuec.onrender.com
```

Render service reads environment variables for MongoDB and CORS.

The deployed backend does not retrain models itself. GitHub Actions trains models and stores them in Atlas. Render only serves the latest predictions, metrics, model registry, quality audit, and pipeline evidence.

## Current Verified Status

Verified live backend facts:

```text
health_city: Islamabad
generated_at: 2026-06-06T22:17:40.330817+00:00
prediction_count: 3
available_models: gradient_boosting, mlp_neural_net, random_forest, ridge
model_day_1: ridge
model_day_2: random_forest
model_day_3: random_forest
metrics_at: 2026-06-06T19:58:43.976000
registry_at: 2026-06-06T19:58:43.976000
quality_status: pass
quality_rows: 2208
recent_pipeline_runs_returned_by_api: 10
```

Verified frontend facts:

```text
npm run build: passed
local production preview: http://127.0.0.1:3001
/ route: 200 OK
/dashboard route: 200 OK
```

Latest pushed commit:

```text
d3d6e8c final commit
```

## What We Completed

Completed items:

- Read and understood the internship project requirements.
- Planned single-city Islamabad implementation.
- Created MongoDB Atlas cloud setup.
- Added GitHub Actions secrets.
- Uploaded project to GitHub repository.
- Fixed the original billing issue by moving from the blocked GitHub account to `codewithsalty`.
- Fixed Atlas URI credential encoding issue.
- Ran feature pipeline successfully.
- Ran training pipeline successfully.
- Removed old Lahore evidence from final project state.
- Confirmed Islamabad data in Atlas.
- Confirmed model metrics in Atlas.
- Confirmed model registry in Atlas.
- Confirmed model artifacts in GridFS.
- Confirmed pipeline run evidence.
- Confirmed quality audit status.
- Deployed backend API on Render.
- Fixed backend CORS for local frontend and Vercel.
- Built a polished Next.js frontend.
- Connected frontend to backend API.
- Added Vercel deployment documentation.
- Removed `frontend/.env.local` from GitHub tracking.
- Verified production frontend build.
- Pushed final commit to GitHub.

## What Is Still Needed Before Final Submission

Final user-side steps:

1. Deploy frontend to Vercel from GitHub.
2. Add the Vercel environment variable `NEXT_PUBLIC_API_BASE_URL`.
3. Open the Vercel link and verify the dashboard loads predictions.
4. Add the Vercel link to README/report if required.
5. Record a short demo video showing:
   - GitHub Actions green runs.
   - MongoDB Atlas collections.
   - Render backend health endpoint.
   - Vercel frontend dashboard.
   - Model picker and prediction cards.
6. Submit the GitHub repository URL in the candidate portal.

Candidate portal asks for the GitHub repository URL. The repo should be public so evaluators can see the code and GitHub Actions evidence.

Submission URL to use:

```text
https://github.com/codewithsalty/aqi-predictor
```

## How This Project Stands Out

This project is stronger than a basic internship submission because:

- It is not only a notebook. It is a working ML product.
- It has cloud feature storage.
- It has model registry evidence.
- It has real automated GitHub Actions runs.
- It has a deployed backend API.
- It has a polished frontend suitable for resume/demo.
- It has model comparison instead of one hardcoded model.
- It has data quality checks.
- It has clear documentation and viva support.
- It is designed for evaluator confidence under demo conditions.

## Important Safety Notes

Do not commit these:

```text
frontend/.env.local
backend/.env
any MongoDB URI with credentials
any private API key
```

Safe files that can be committed:

```text
frontend/.env.local.example
backend/.env.example
README.md
FRONTEND_DEPLOY_VERCEL.md
BACKEND_DEPLOY_RENDER.md
context.md
```

If the frontend says "failed to fetch", check:

- Vercel has `NEXT_PUBLIC_API_BASE_URL` set.
- Render backend is awake.
- Backend `/health` works.
- Backend CORS includes the Vercel domain or regex.

If GitHub Actions looks delayed, remember:

- GitHub cron jobs can be delayed.
- Backup triggers are already added.
- Deduplication prevents duplicate feature damage.
- Manual run is always available from the Actions tab.

## Simple Explanation For Viva

This is how to explain the system:

"I built an end-to-end AQI forecasting system for Islamabad. A GitHub Actions feature pipeline collects live weather and pollution data, creates lag, rolling, time, and AQI trend features, and stores them in MongoDB Atlas as the feature store. A training pipeline reads those historical features, trains Ridge, Random Forest, Gradient Boosting, and MLP models, evaluates them with RMSE, MAE, and R2, and stores the champions and model artifacts in a MongoDB model registry using GridFS. The FastAPI backend reads the latest registry and predictions from Atlas and serves them to a Next.js dashboard. The frontend lets users view 3-day forecasts, compare models, see metrics, inspect feature evidence, and check pipeline health."
