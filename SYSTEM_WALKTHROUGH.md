# Pearls AQI Predictor System Walkthrough

This document explains how the complete AQI forecasting system works from data ingestion to frontend dashboard.

## 1. Big Picture

This project is an end-to-end AQI forecasting system for Islamabad.

It predicts:

```text
Day +1 AQI
Day +2 AQI
Day +3 AQI
```

The system has five main parts:

```text
1. Data ingestion
2. Feature store
3. Training pipeline
4. Model registry and prediction API
5. Frontend dashboard
```

Overall flow:

```text
Open-Meteo API
   -> GitHub Actions feature pipeline
   -> MongoDB Atlas feature store
   -> GitHub Actions training pipeline
   -> MongoDB model registry + GridFS model artifact
   -> Render FastAPI backend
   -> Next.js frontend dashboard
```

## 2. Data Ingestion

The feature pipeline is defined in:

```text
.github/workflows/feature-pipeline.yml
```

It runs automatically every hour:

```yaml
cron: "17 * * * *"
cron: "47 * * * *"
```

This means:

```text
Every hour at minute 17, with a backup trigger at minute 47
```

The workflow runs:

```text
backend/scripts/run_ingest.py
```

That script fetches Islamabad AQI and pollutant data from the Open-Meteo Air Quality API.

The ingested fields include:

```text
city
timestamp
aqi
pm10
pm2_5
co
no2
so2
o3
schema_version
source
ingested_at
```

The records are saved into MongoDB Atlas:

```text
Database: aqi_predictor
Collection: features_v1
```

## 3. Deduplication

The system creates a unique MongoDB index on:

```text
city + timestamp
```

This prevents duplicate hourly records.

So if the pipeline runs again and the same data already exists, it will not duplicate it.

Example output:

```text
inserted: 0
duplicates: 24
```

This is not a failure. It means the deduplication guard is working.

## 4. Feature Store

MongoDB Atlas is used as the cloud feature store.

The main collections are:

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

Collection meanings:

```text
features_v1
Stores AQI and pollutant feature records.

model_metrics
Stores RMSE, MAE, and R2 for every model and forecast horizon.

model_registry
Stores the selected champion models and model metadata.

pipeline_runs
Stores pipeline execution history.

predictions
Stores generated prediction outputs.

quality_audits
Stores data quality audit results.

fs.files / fs.chunks
Stores trained model artifacts through MongoDB GridFS.
```

## 5. Feature Engineering

Feature engineering logic is in:

```text
backend/app/features.py
```

The system creates time, lag, rolling, and change-rate features.

Important engineered features:

```text
day
month
aqi_delta
aqi_lag_1
aqi_lag_2
aqi_lag_3
pm2_5_lag_1
pm10_lag_1
pm2_5_roll_3
pm10_roll_3
```

Why these features matter:

```text
day/month
Capture calendar patterns.

aqi_delta
Shows recent AQI movement.

lag features
Use previous pollution values to predict future AQI.

rolling features
Smooth short-term pollution trends.
```

The system then creates three target columns:

```text
target_day_1
target_day_2
target_day_3
```

Meaning:

```text
target_day_1 = AQI tomorrow
target_day_2 = AQI after 2 days
target_day_3 = AQI after 3 days
```

## 6. Training Pipeline

The training pipeline is defined in:

```text
.github/workflows/training-pipeline.yml
```

It runs automatically once per day:

```yaml
cron: "37 0 * * *"
```

This means:

```text
Daily at 00:37 UTC
Daily at 5:37 AM Pakistan time
```

The workflow runs:

```text
backend/scripts/run_train.py
```

That calls:

```text
backend/app/train.py
```

Training pipeline steps:

```text
1. Read Islamabad feature records from MongoDB Atlas.
2. Build engineered features.
3. Create Day+1, Day+2, and Day+3 targets.
4. Train multiple machine learning models.
5. Evaluate each model using time-series validation.
6. Compare models with RMSE, MAE, and R2.
7. Select best model for each forecast horizon.
8. Store metrics in MongoDB.
9. Store registry metadata in MongoDB.
10. Store trained model artifact in MongoDB GridFS.
```

## 7. Models Trained

The system trains these models:

```text
Ridge Regression
Random Forest
Gradient Boosting
MLP Neural Network
```

This satisfies the requirement to train multiple models daily.

## 8. Metrics Used

The system evaluates models with:

```text
RMSE
MAE
R2
```

Metric meanings:

```text
RMSE
Root Mean Squared Error. Lower is better.

MAE
Mean Absolute Error. Lower is better.

R2
Explained variance score. Higher is better, but realistic values matter.
```

The champion selection primarily uses:

```text
lowest RMSE
```

## 9. Horizon-Specific Champion Selection

The project predicts three different forecast horizons:

```text
Day +1
Day +2
Day +3
```

Each horizon can have a different best model.

Current champion pattern:

```text
Day +1: ridge
Day +2: random_forest
Day +3: gradient_boosting
```

This is intentional.

Why this is strong:

```text
Tomorrow's AQI and AQI three days later are different prediction problems.
A model that performs best for Day +1 may not perform best for Day +3.
```

The system also stores an overall leaderboard.

Current overall winner:

```text
gradient_boosting
```

## 10. Model Registry

The model registry is stored in:

```text
MongoDB collection: model_registry
```

It stores:

```text
city
registered_at
champion_model
model_path
gridfs_model_id
feature_columns
available_models
overall_winner
overall_leaderboard
summary
```

Example champion map:

```json
{
  "day_1": "ridge",
  "day_2": "random_forest",
  "day_3": "gradient_boosting"
}
```

The actual trained model artifact is stored in MongoDB GridFS:

```text
fs.files
fs.chunks
```

This means the trained model is cloud-stored, not only a local file.

## 11. Prediction API

The backend API is built with FastAPI.

Backend code:

```text
backend/app/api.py
```

Live backend:

```text
https://aqi-predictor-api-cuec.onrender.com
```

Important endpoints:

```text
GET /health
GET /predict
GET /predict?model=random_forest
GET /predict?model=ridge
GET /predict?model=gradient_boosting
GET /metrics/latest
GET /models/latest
GET /pipeline/health
GET /quality/latest
POST /quality/run
```

## 12. How Prediction Works

When `/predict` is called:

```text
1. Load the latest model registry document from MongoDB.
2. Load the trained model artifact from GridFS.
3. Fetch latest Islamabad feature data from MongoDB.
4. Recreate latest feature row.
5. Predict Day+1 AQI.
6. Predict Day+2 AQI.
7. Predict Day+3 AQI.
8. Assign AQI risk labels.
9. Return JSON response to frontend.
```

Default mode:

```text
Horizon champions
```

That means:

```text
Day +1 uses ridge
Day +2 uses random_forest
Day +3 uses gradient_boosting
```

Model override mode:

```text
/predict?model=random_forest
```

This forces Random Forest to predict all three days.

Available selectable models:

```text
gradient_boosting
mlp_neural_net
random_forest
ridge
```

## 13. Frontend Dashboard

Frontend code:

```text
frontend/app/page.tsx
frontend/app/globals.css
```

Local frontend URL:

```text
http://localhost:3000
```

The frontend talks to the deployed backend:

```text
https://aqi-predictor-api-cuec.onrender.com
```

The frontend shows:

```text
Islamabad forecast
Day +1 / Day +2 / Day +3 AQI cards
AQI risk labels
Model selector
Metrics leaderboard
Overall model winner
Model registry panel
Feature columns
Pipeline health
Data quality audit
```

The frontend is not hardcoded demo data. It reads live API responses from the backend.

## 14. Automation

There are three GitHub Actions workflows:

```text
feature-pipeline.yml
training-pipeline.yml
manual-recovery.yml
```

Feature pipeline:

```text
Runs hourly.
Fetches latest AQI/pollutant data.
Stores features in MongoDB Atlas.
```

Training pipeline:

```text
Runs daily.
Trains models.
Updates metrics.
Updates model registry.
Stores model artifact in GridFS.
```

Manual recovery:

```text
Used when a manual backfill or recovery run is needed.
```

## 15. Deployment

Backend deployment:

```text
Platform: Render
URL: https://aqi-predictor-api-cuec.onrender.com
```

Frontend deployment:

```text
Current status: local frontend is working.
Next target: Vercel deployment.
```

Once deployed on Vercel, the frontend will call the same Render backend.

## 16. Data Quality

Data quality logic checks:

```text
duplicate rows
missing/null values
AQI out-of-range values
leakage risk
daily training row count
```

Results are stored in:

```text
quality_audits
```

Endpoint:

```text
GET /quality/latest
```

## 17. EDA and Explainability

EDA artifacts are stored in:

```text
backend/artifacts/eda/
```

Examples:

```text
correlations.csv
summary_stats.csv
```

Explainability artifacts are stored in:

```text
backend/artifacts/explainability/
```

These support the report and viva explanation.

## 18. Why This Project Is Strong

Strong points:

```text
Cloud feature store
Automated hourly feature ingestion
Automated daily training
Multiple trained models
Metric-based model comparison
Horizon-specific champion selection
Cloud model registry
GridFS model artifact storage
Deployed FastAPI backend
Frontend dashboard connected to real backend
Model selector for prediction comparison
Pipeline health evidence
Data quality audit evidence
EDA and explainability artifacts
```

## 19. How To Explain In Viva

Use this explanation:

```text
My system is a serverless AQI forecasting pipeline for Islamabad.
The feature pipeline runs hourly through GitHub Actions and stores live AQI/pollutant data in MongoDB Atlas.
The training pipeline runs daily, trains Ridge, Random Forest, Gradient Boosting, and MLP models, evaluates them with RMSE, MAE, and R2 using time-series validation, and registers the best model for each forecast horizon.
The trained model artifact is stored in MongoDB GridFS.
A deployed FastAPI backend loads the latest registered model and serves 3-day predictions.
The Next.js dashboard shows forecasts, model comparison, pipeline health, feature-store evidence, and data quality audit results.
```

## 20. Current Live Verification Links

Backend health:

```text
https://aqi-predictor-api-cuec.onrender.com/health
```

Default prediction:

```text
https://aqi-predictor-api-cuec.onrender.com/predict
```

Random Forest prediction:

```text
https://aqi-predictor-api-cuec.onrender.com/predict?model=random_forest
```

Latest model registry:

```text
https://aqi-predictor-api-cuec.onrender.com/models/latest
```

Latest metrics:

```text
https://aqi-predictor-api-cuec.onrender.com/metrics/latest
```

Pipeline health:

```text
https://aqi-predictor-api-cuec.onrender.com/pipeline/health
```
