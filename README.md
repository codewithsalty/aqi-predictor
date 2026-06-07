# 🌧️ Pearls AQI Predictor: Islamabad Forecast Lab

[![Live Demo](https://img.shields.io/badge/Live_Dashboard-Deploy--Success-emerald?style=for-the-badge&logo=vercel&logoColor=white)](https://pearls-aqi.vercel.app/)
[![Backend API](https://img.shields.io/badge/FastAPI-Active-blue?style=for-the-badge&logo=fastapi&logoColor=white)](https://aqi-predictor-api-cuec.onrender.com/health)
[![Data Pipeline](https://img.shields.io/badge/GitHub_Actions-Automated-orange?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/s4lmankhan)
[![Database](https://img.shields.io/badge/MongoDB-Atlas--GridFS-green?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)

Pearls AQI is a production-grade, end-to-end Machine Learning Air Quality Index (AQI) forecasting platform designed for Islamabad, Pakistan. 

Unlike static notebook prototypes, this platform operates as a fully automated software product. It manages live data collection, schedules daily multi-model retraining, registers versioned model weights in a cloud-backed registry, and serves real-time Day +1, Day +2, and Day +3 AQI predictions through a high-performance API and interactive Next.js dashboard.

---

## 🔗 Live Deployments

* **💻 Live Dashboard (Frontend)**: [https://pearls-aqi.vercel.app/](https://pearls-aqi.vercel.app/)
* **🔌 Prediction API (Backend)**: [https://aqi-predictor-api-cuec.onrender.com](https://aqi-predictor-api-cuec.onrender.com)
  * *API Health endpoint*: [https://aqi-predictor-api-cuec.onrender.com/health](https://aqi-predictor-api-cuec.onrender.com/health)
  * *Live Forecast payload*: [https://aqi-predictor-api-cuec.onrender.com/predict](https://aqi-predictor-api-cuec.onrender.com/predict)

---

## ⚙️ Automated Pipeline & MLOps Lifecycle

```
             [ Open-Meteo Air Quality API ]
                           │
                           │ (Hourly Cron Job via GitHub Actions)
                           ▼
┌────────────────────────────────────────────────────────┐
│ 🗄️ FEATURE STORE (MongoDB Atlas)                       │
│ - Unique indexes on (city, timestamp) prevent dups     │
│ - Performs null audits and out-of-range value filters  │
└────────────────────────────────────────────────────────┘
                           │
                           │ (Daily Retraining Cron Job)
                           ▼
┌────────────────────────────────────────────────────────┐
│ 🤖 RETRAINING & MODEL REGISTRY                         │
│ - TimeSeriesSplit (n=3) eliminates data leakage        │
│ - Trains Ridge, Random Forest, GBDT, & MLP Neural Net  │
│ - Promotes lowest RMSE model per horizon as Champion   │
│ - Weight binaries saved in MongoDB GridFS              │
└────────────────────────────────────────────────────────┘
                           │
                           │ (On-Demand Inference)
                           ▼
┌────────────────────────────────────────────────────────┐
│ 🔌 PREDICTION GATEWAY (FastAPI on Render)              │
│ - Day +1, +2, +3 forecasts with US AQI Hazard Labels   │
│ - Quality audit & explainability endpoints             │
└────────────────────────────────────────────────────────┘
                           │
                           │ (State-of-the-Art UI)
                           ▼
┌────────────────────────────────────────────────────────┐
│ 💻 WEB PORTAL (Next.js on Vercel)                      │
│ - Light gradient ambient theme with glassmorphic cards │
│ - Interactive charts & model performance comparator    │
└────────────────────────────────────────────────────────┘
```

---

## 📂 Repository Organization

The project directories are clean and highly structured:

* **[`frontend/`](file:///c:/Users/grcla/OneDrive/Desktop/10pearls%20proj/frontend)**: Next.js frontend application, layout elements, formatting utilities, and component files.
* **[`backend/`](file:///c:/Users/grcla/OneDrive/Desktop/10pearls%20proj/backend)**: FastAPI backend service, data ingest engines, training modules, evaluation metrics, and local unit tests.
* **[`documentation/`](file:///c:/Users/grcla/OneDrive/Desktop/10pearls%20proj/documentation)**: Contains the final project report, data audit logs, and evidence of automation.
* **[`video_demo/`](file:///c:/Users/grcla/OneDrive/Desktop/10pearls%20proj/video_demo)**: Folder holding presentation guidelines, scripts, and video walk-through placeholders.
* **[`.github/workflows/`](file:///c:/Users/grcla/OneDrive/Desktop/10pearls%20proj/.github/workflows)**: GitHub Actions workflows defining the automated cron ingestion and training schedules.

---

## 📊 Serving API Gateway Endpoints

The FastAPI backend exposes several core endpoints for predictions, diagnostics, and pipeline health:

| Endpoint | Method | Description | Live Link |
|---|---|---|---|
| `/health` | `GET` | Validates API connectivity and status | [View Live](https://aqi-predictor-api-cuec.onrender.com/health) |
| `/predict` | `GET` | Returns Islamabad 3-day AQI forecasts and champions | [View Live](https://aqi-predictor-api-cuec.onrender.com/predict) |
| `/metrics/latest` | `GET` | Returns performance metrics (RMSE, MAE, R2) for all models | [View Live](https://aqi-predictor-api-cuec.onrender.com/metrics/latest) |
| `/pipeline/health` | `GET` | Returns pipeline run histories and GitHub Action triggers | [View Live](https://aqi-predictor-api-cuec.onrender.com/pipeline/health) |
| `/quality/latest` | `GET` | Returns the data quality audit logs (null checks, leakage check) | [View Live](https://aqi-predictor-api-cuec.onrender.com/quality/latest) |

---

## 🔧 Technical Setup & Local Execution

### Local Environment Variables
Create a file at `backend/.env` containing:
```env
MONGO_URI=your_mongodb_atlas_connection_string
```

### 1. Launch Backend API (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.api:app --reload --port 8000
```
API Documentation will be available at `http://127.0.0.1:8000/docs`.

### 2. Launch Interface Dashboard (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` to view the live dashboard interface locally.

---

## 🤖 Feature Engineering Details

The pipeline engineers 17 feature fields from the raw hourly input streams before model training:
* **Pollutant Signatures**: Hourly levels of PM2.5, PM10, CO, SO2, NO2, and O3.
* **Seasonality Indicators**: Calendar month and day inputs mapping atmospheric cycles.
* **Trend & Memory Features**: AQI change rates (delta) and historical lag steps (Lags at 1h, 2h, and 3h).
* **Rolling Profiles**: 3-hour rolling averages of PM2.5 and PM10 to filter out outlier environmental spikes.

---

## 👨‍💻 Developed & Engineered By

**Salman Khan** — AI Engineer & Full Stack Developer
* **LinkedIn**: [https://linkedin.com/in/s4lmankhan](https://linkedin.com/in/s4lmankhan)
* **GitHub**: [https://github.com/s4lmankhan](https://github.com/s4lmankhan)
* **Email**: codewithsalty@gmail.com
