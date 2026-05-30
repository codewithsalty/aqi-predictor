# 10–15 Minute Evaluation Viva Script

## 0:00 - 1:00 | Problem and Objective
"I built an end-to-end AQI forecasting system for my city that predicts Day+1, Day+2, and Day+3 AQI with automated ingestion, training, model selection, and dashboard delivery."

## 1:00 - 3:00 | Architecture Walkthrough
1. Hourly ingestion from Open-Meteo air quality API.
2. Feature engineering with lag/rolling/time features.
3. Daily retraining of 3+ models with metric-based champion selection.
4. Model registry metadata in MongoDB + model binaries in GridFS.
5. FastAPI service exposing prediction, metrics, pipeline health, and quality endpoints.
6. Next.js dashboard for forecast cards, risk badges, and trend visuals.

## 3:00 - 5:00 | Data and Feature Strategy
1. Historical backfill (2–3 months+).
2. Dedup via unique index on `(city, timestamp)`.
3. Feature set includes:
- time features (day, month)
- AQI lag 1/2/3
- pollutant lag features
- rolling means
- AQI delta

## 5:00 - 7:00 | Modeling and Validation
1. Models: Ridge, RandomForest, GradientBoosting.
2. TimeSeriesSplit validation.
3. Metrics: RMSE, MAE, R².
4. Separate champion models for day_1/day_2/day_3 horizon.
5. Overfit guardrail: suspiciously high R² warning logging.

## 7:00 - 9:00 | Demo Flow
1. Show `/pipeline/health` and latest successful runs.
2. Show `/metrics/latest` and champion selection evidence.
3. Trigger `/predict` and confirm day+1/2/3 output + risk labels.
4. Open dashboard and show:
- Forecast cards
- Trend chart
- Hazard alert behavior
- Model freshness status

## 9:00 - 11:00 | Quality and Reliability
1. Data quality endpoint:
- duplicate checks
- null profile
- out-of-range AQI detection
- leakage-risk hint
2. Manual recovery workflow for incident handling.
3. Backup demo video for platform downtime.

## 11:00 - 13:00 | Key Blockers and How You Solved Them
1. Feature-store instability → cloud alternative + recovery path.
2. Duplicate hourly fetches → unique index + warning checks.
3. Horizon prediction realism → separate day horizon models.

## 13:00 - 15:00 | Close Strong
"The system is automated, traceable, and evaluation-ready. It meets core rubric requirements while adding explainability and reliability controls to improve confidence in real-world usage."
