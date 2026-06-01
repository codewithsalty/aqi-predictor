# Requirements Audit

This file cross-checks the implemented project against the Candidate Portal and the provided PDF (`AQI_predict-1.pdf`).

## Submission Target

- Project: Pearls AQI Predictor
- Final city: Islamabad
- Repository: https://github.com/codewithsalty/aqi-predictor
- Due date: June 8, 2026 at 5:00 AM

## PDF Requirements Cross-Check

| Requirement | Status | Evidence |
|---|---|---|
| Predict AQI in your city for the next 3 days | Complete | `/predict`, frontend dashboard, `predictions` collection |
| Feature pipeline fetches raw pollutant/weather data | Complete | `backend/app/ingest.py`, `feature-pipeline.yml` |
| External API like AQICN/OpenWeather | Complete with equivalent API | Uses Open-Meteo Air Quality API; PDF says APIs are examples and other options can be explored |
| Compute time features hour/day/month | Complete | `backend/app/features.py` |
| Compute derived AQI change rate | Complete | `aqi_delta` in `backend/app/features.py` |
| Store features in feature store | Complete with MongoDB Atlas substitute | `features_v1` in Atlas stores processed feature rows |
| Backfill historical data | Complete | `backend/scripts/run_backfill.py`, 2208 Islamabad feature rows verified |
| Fetch historical features/targets for training | Complete | `backend/app/train.py` |
| Train/evaluate multiple models | Complete | Ridge, Random Forest, Gradient Boosting, MLP neural-network challenger |
| Evaluate RMSE, MAE, R2 | Complete | `model_metrics` collection and `report.md` |
| Store trained model in model registry | Complete | `model_registry` collection and GridFS `fs.files`/`fs.chunks` |
| Feature pipeline every hour | Complete | `.github/workflows/feature-pipeline.yml` uses `0 * * * *` |
| Training pipeline daily | Complete | `.github/workflows/training-pipeline.yml` uses `20 0 * * *` |
| GitHub Actions automation | Complete | Public Actions runs are green |
| Web app loads model/features and shows predictions | Complete | FastAPI + Next.js dashboard |
| Streamlit/Gradio and Flask/FastAPI | Complete | FastAPI is implemented; premium Next.js UI is primary; optional Streamlit dashboard is included in `streamlit_dashboard/app.py` |
| EDA | Complete | `backend/scripts/run_eda.py`, EDA artifacts |
| SHAP or LIME | Complete | `backend/scripts/run_explainability.py`, SHAP importance output |
| Hazardous AQI alerts | Complete | Dashboard risk badges and hazard alert logic |
| Detailed report | Complete | `report.md` |

## Portal Technology Stack Cross-Check

| Technology | Status | Notes |
|---|---|---|
| Python | Complete | Backend and pipelines |
| Scikit-learn | Complete | Ridge, Random Forest, Gradient Boosting |
| TensorFlow | Partial substitute | TensorFlow is not installed because it would destabilize the Python 3.13 local environment; the training pipeline includes an MLP neural-network challenger through scikit-learn |
| Hopsworks or Vertex AI | Substituted | MongoDB Atlas is used as the feature store/model registry equivalent because it was accepted as the cloud storage path during execution |
| Apache Airflow or GitHub Actions | Complete | GitHub Actions implemented |
| Streamlit | Complete | Optional Streamlit dashboard wrapper included in `streamlit_dashboard/app.py`; premium Next.js dashboard remains the main UI |
| Flask | Complete by equivalent | FastAPI is the API framework; PDF says Flask/FastAPI |
| AQICN or OpenWeather APIs | Complete by equivalent | Open-Meteo Air Quality API is used; PDF allows exploring other API options |
| SHAP | Complete | SHAP script included |
| Git | Complete | Public GitHub repository |

## Automation Explanation

The project is automatic because GitHub Actions schedules the pipelines:

- Feature Pipeline: runs hourly through cron `0 * * * *`
- Training Pipeline: runs daily through cron `20 0 * * *`
- Manual Recovery: can run backfill and retraining manually

GitHub Actions uses repository secrets to connect to MongoDB Atlas. The local laptop does not need to be on for scheduled runs.

## What Evaluators Can See

Because the repository is public, evaluators can open:

- Code tab: source code, report, README, documentation
- Actions tab: workflow run history and green logs
- Workflow files: scheduled automation definitions

Recommended supporting evidence:

- Screenshots of green Actions runs
- Screenshots of Atlas collections
- Demo video showing dashboard + `/predict` + pipeline evidence

## Strength Compared With Average Submissions

This submission is stronger because it includes:

- Cloud feature storage and model registry evidence in MongoDB Atlas
- Scheduled GitHub Actions for ingestion and training
- Multi-model dynamic champion selection per forecast horizon
- GridFS model artifact storage, not only local files
- Quality audit records with duplicate/null/range/leakage checks
- EDA and SHAP explainability artifacts
- API endpoints for metrics, prediction, quality, and pipeline health
- A polished dashboard plus report/viva/project-management documentation
- Clean Islamabad-only cloud evidence after removing earlier Lahore records

## Remaining Risk

The only strict wording risk is that the portal lists TensorFlow and Hopsworks/Vertex explicitly. The PDF itself is more flexible and allows API/tool exploration, and the implemented system covers the functional requirements with MongoDB Atlas, GitHub Actions, FastAPI, Streamlit, and Next.js.

If time allows before final submission, the safest optional upgrades are:

1. Add screenshots into `submission_evidence/screenshots`.
