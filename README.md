# Pearls AQI Predictor (Elite Submission Build)

End-to-end single-city AQI forecasting platform with:
- Hourly feature ingestion
- Daily multi-model retraining with dynamic champion selection
- MongoDB cloud feature/model metadata store
- FastAPI inference + pipeline status endpoints
- Premium Next.js dashboard for 3-day AQI forecast
- GitHub Actions automation workflows

## 1) Project Structure

- `backend/app`: ingestion, feature engineering, training, prediction, API
- `backend/scripts`: runnable pipeline entry points
- `backend/tests`: core tests for risk/feature logic
- `frontend`: Next.js dashboard UI
- `streamlit_dashboard`: optional Streamlit dashboard wrapper for rubric compatibility
- `.github/workflows`: hourly, daily, and manual recovery automation
- `COMPLIANCE_PLAYBOOK.md`: evidence-based requirement interpretation
- `EVALUATION_VIVA_SCRIPT.md`: 10–15 minute evaluator presentation flow
- `FINAL_EXECUTION_CHECKLIST.md`: submission-day go/no-go list
- `PROJECT_EXECUTION_PLAN.md`: day-by-day plan to deadline
- `RISK_REGISTER.md`: risk mitigation and contingency map

## 2) Setup

### Backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Update `.env` with MongoDB Atlas URI and city coordinates.

### Local MongoDB Option (Fastest)

```powershell
docker compose -f docker-compose.local.yml up -d mongo
```

### Frontend

```powershell
cd frontend
npm install
Copy-Item .env.local.example .env.local
```

### One-Command Bootstrap (Windows PowerShell)

```powershell
.\scripts\bootstrap_local.ps1
```

## 3) Run Locally

### Backfill and train

```powershell
cd backend
python -m scripts.run_backfill
python -m scripts.run_train
python -m scripts.run_quality_audit
python -m scripts.run_eda
python -m scripts.run_explainability
python -m scripts.generate_runtime_report
python -m scripts.generate_evidence_pack
```

### Auto-fill Final Report From Runtime Data

```powershell
cd backend
python -m scripts.autofill_report_from_runtime `
  --repo-link "https://github.com/<you>/<repo>" `
  --live-link "https://<your-app-url>" `
  --video-link "https://<your-demo-video-url>" `
  --screens-link "submission_evidence/screenshots"
```

### One-Command Local Full Run (Windows PowerShell)

```powershell
.\scripts\run_all_local.ps1
```

### Preflight Check (Recommended Before Full Run)

```powershell
cd backend
python -m scripts.preflight_check
```

### Fast Mongo URI Update Helper

```powershell
.\scripts\set_mongo_uri.ps1 -MongoUri "mongodb://localhost:27017"
```

If Mongo is still blocked, follow:
- `MONGODB_UNBLOCK_GUIDE.md`

### Start API

```powershell
cd backend
uvicorn app.api:app --reload --port 8000
```

### Start UI

```powershell
cd frontend
npm run dev
```

Open `http://localhost:3000`.

### Optional Streamlit Dashboard

```powershell
cd streamlit_dashboard
python -m pip install -r requirements.txt
streamlit run app.py
```

Set `AQI_API_BASE_URL` if the FastAPI backend is not running at `http://127.0.0.1:8000`.

## 4) Deployment Connection

The frontend is a live dashboard. It does not contain hardcoded demo data. It calls the FastAPI backend through:

```text
NEXT_PUBLIC_API_BASE_URL
```

For local development:

```text
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

For public deployment:

1. Deploy the FastAPI backend first.
2. Set frontend `NEXT_PUBLIC_API_BASE_URL` to the deployed backend URL.
3. Set backend `CORS_ORIGINS` to include the deployed frontend URL.

Example:

```text
Backend CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.vercel.app
Frontend NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.onrender.com
```

## 5) API Endpoints

- `GET /health`
- `GET /predict`
- `GET /metrics/latest`
- `GET /pipeline/health`
- `GET /quality/latest`
- `POST /quality/run`

## 6) CI/CD Workflows

- `feature-pipeline.yml`: hourly + manual trigger
- `training-pipeline.yml`: daily + manual trigger
- `manual-recovery.yml`: optional backfill + full recovery run

Required GitHub Secrets:
- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `CITY`
- `LATITUDE`
- `LONGITUDE`

Model families currently evaluated:
- Ridge Regression
- Random Forest
- Gradient Boosting
- MLP neural-network challenger

## 7) Submission Checklist

- [ ] Feature store data is cloud-hosted in MongoDB
- [ ] At least 3 models trained, metrics logged, champion selected
- [ ] 3-day prediction endpoint and dashboard are working
- [ ] GitHub Actions logs are green
- [ ] Final report completed (`report.md`)
- [ ] Demo video recorded for fallback evidence
