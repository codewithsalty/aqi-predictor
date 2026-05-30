# Pearls AQI Predictor - Final Report

## 1) Objective and Scope
This project builds an end-to-end Air Quality Index (AQI) forecasting platform that predicts AQI for the next three days (Day+1, Day+2, Day+3) for a single city.  
The scope follows internship guidance: live API-based ingestion, automated pipelines, multi-model training, model selection by metrics, cloud-backed storage, and a dashboard for evaluator verification.

## 2) Requirement Alignment
This implementation aligns with artifacts and guidance from:
- `project.md` and `AQI_predict-1.pdf` (core required architecture)
- Weekly sync notes `day1.md` to `day7.md` (allowed alternatives, constraints, evaluation expectations)

Core rubric coverage implemented:
1. Feature pipeline
2. Historical backfill
3. Training pipeline with 3+ models
4. Model registry/storage in cloud-backed MongoDB + GridFS
5. CI/CD workflows (hourly + daily + manual recovery)
6. Prediction API returning Day+1/2/3
7. Interactive dashboard
8. Report, compliance playbook, and viva package

## 3) Architecture Summary
### 3.1 Data Source
- Open-Meteo Air Quality API for AQI and pollutant signals.

### 3.2 Data Storage (Feature Store Layer)
- MongoDB collection with uniqueness guarantees on `(city, timestamp)`.
- Schema version and ingestion metadata saved with each row.

### 3.3 Model Registry
- Registry metadata in MongoDB.
- Model binaries stored in MongoDB GridFS (with local artifact fallback path).

### 3.4 ML Pipeline
- Feature generation with lag/rolling/time features.
- Time-series-aware validation.
- Multi-model training and metric-based champion selection.
- Separate champion per horizon: `day_1`, `day_2`, `day_3`.

### 3.5 Serving and UI
- FastAPI backend for prediction, metrics, pipeline health, and quality audit endpoints.
- Next.js dashboard showing forecast cards, trend visualization, and risk badges.

### 3.6 Automation
- GitHub Actions:
  - feature ingestion schedule
  - daily training schedule
  - manual recovery workflow

## 4) Implementation Journey
### Step 1: Feature Ingestion and Backfill
- Built hourly ingestion script to fetch AQI + pollutant data.
- Added dedup controls using unique index and insert conflict handling.
- Added historical backfill script for training dataset generation.

### Step 2: Feature Engineering
- Added time-based features (`day`, `month`).
- Added lag features (`aqi_lag_1/2/3`, pollutant lags).
- Added rolling features and AQI delta.
- Built daily target horizons for next-day forecasting tasks.

### Step 3: Training and Champion Selection
- Trained at least three regressors:
  - Ridge
  - RandomForest
  - GradientBoosting
- Evaluated with RMSE, MAE, and R2 under time-series split.
- Saved horizon-wise champion metadata and model artifacts.
- Added overfit warning guardrail for suspiciously high R2.

### Step 4: Prediction Service
- Implemented `/predict` endpoint using horizon-specific champion models.
- Returns Day+1, Day+2, Day+3 AQI with risk categories.

### Step 5: Dashboard and Evidence
- Built evaluator-focused dashboard with:
  - three-day cards
  - trend chart
  - hazard visibility
  - model freshness/pipeline context
- Added quality audit endpoint and artifacts for defensibility.

## 5) EDA and Explainability
Generated EDA pipeline artifacts:
- Daily AQI trend plot
- Summary statistics
- Correlation matrix

Generated explainability artifact:
- SHAP-based feature importance export for day_1 champion model

Artifact locations:
- `backend/artifacts/eda/`
- `backend/artifacts/explainability/`

## 6) Evaluation Metrics and Model Summary
Model evaluation data is stored in MongoDB metrics collection and exposed through API.

Populate final values before submission from:
- `GET /metrics/latest`

Final table:

<!-- AUTO_METRICS_TABLE_START -->
| Horizon | Champion Model | RMSE | MAE | R2 |
|---|---|---:|---:|---:|
| Day+1 | ridge | 13.283 | 10.040 | 0.294 |
| Day+2 | random_forest | 28.125 | 22.435 | -3.522 |
| Day+3 | random_forest | 30.161 | 23.440 | -3.715 |
<!-- AUTO_METRICS_TABLE_END -->

## 7) Data Quality and Reliability Controls
Quality subsystem validates:
1. Duplicate row risk
2. Missing value profile
3. AQI range sanity checks
4. Leakage-risk hint

Endpoints:
- `POST /quality/run`
- `GET /quality/latest`

Operational reliability:
- Scheduled pipelines
- Manual recovery workflow
- Pipeline run logging in database

## 8) Biggest Blockers and Resolutions
1. **Feature-store instability concerns from cohort guidance**  
   Resolution: Implemented MongoDB-based cloud feature layer and GridFS model storage to reduce dependency risk.

2. **Risk of duplicate hourly data ingestion**  
   Resolution: Added uniqueness index and duplicate-aware insertion summary.

3. **Weakness of naive multi-day forecast extrapolation**  
   Resolution: Replaced with horizon-specific champion model predictions (day_1/day_2/day_3).

4. **Evaluator scrutiny on quality and leakage**  
   Resolution: Added quality audit service + time-series validation + overfit warning logic.

## 9) AI Usage Disclosure
AI was used as an accelerator for:
- development scaffolding
- documentation drafting
- code pattern generation

Manual verification performed on:
- requirement compliance against meeting notes
- model/training logic path
- endpoint contract behavior
- pipeline layout and dependency consistency

## 10) Final Submission Artifacts
Repository includes:
- Backend pipelines and API
- Frontend dashboard
- CI/CD workflow definitions
- Compliance playbook
- Viva script
- Final execution checklist
- This report

Required links to finalize before submission:
<!-- AUTO_LINKS_START -->
- GitHub repository: `[add]`
- Live deployment: `[add]`
- Demo video fallback: `[add]`
- Screenshots folder/reference: `submission_evidence/screenshots`
<!-- AUTO_LINKS_END -->

## 11) Runtime Evidence Snapshot
<!-- AUTO_RUNTIME_SUMMARY_START -->
- City: `Lahore`
- Latest registry timestamp: `2026-05-30 20:16:22.360000`
- Latest metrics timestamp: `2026-05-30 20:16:22.360000`
- Latest quality audit timestamp: `2026-05-30 20:16:28.721000`
- Latest prediction timestamp: `2026-05-30T20:17:34.175209+00:00`

Latest quality audit:
```json
{
  "city": "Lahore",
  "audited_at": "2026-05-30 20:16:28.721000",
  "row_count": 2184,
  "duplicate_rows": 0,
  "null_counts": {
    "city": 0,
    "timestamp": 0,
    "aqi": 0,
    "pm10": 0,
    "pm2_5": 0,
    "co": 0,
    "no2": 0,
    "so2": 0,
    "o3": 0,
    "schema_version": 0,
    "source": 0,
    "ingested_at": 0
  },
  "aqi_out_of_range_rows": 0,
  "leakage_risk_hint": true,
  "status": "pass"
}
```

Latest prediction snapshot:
```json
{
  "city": "Lahore",
  "generated_at": "2026-05-30T20:17:34.175209+00:00",
  "model": {
    "day_1": "ridge",
    "day_2": "random_forest",
    "day_3": "random_forest"
  },
  "predictions": [
    {
      "date": "2026-05-31",
      "aqi": 161.43970440206215,
      "risk": "Unhealthy"
    },
    {
      "date": "2026-06-01",
      "aqi": 145.53520833333314,
      "risk": "Unhealthy for Sensitive Groups"
    },
    {
      "date": "2026-06-02",
      "aqi": 130.4929166666665,
      "risk": "Unhealthy for Sensitive Groups"
    }
  ]
}
```
<!-- AUTO_RUNTIME_SUMMARY_END -->
