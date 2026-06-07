# 🌧️ Pearls AQI Predictor: Islamabad Forecast Lab

[![Data Pipeline](https://img.shields.io/badge/Pipeline-Active-emerald?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/s4lmankhan)
[![Backend API](https://img.shields.io/badge/FastAPI-Serving-blue?style=for-the-badge&logo=fastapi&logoColor=white)](https://aqi-predictor-api-cuec.onrender.com/health)
[![Frontend Dashboard](https://img.shields.io/badge/Next.js-Live-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://vercel.com)
[![Database](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)

An advanced, production-grade Air Quality Index (AQI) forecasting platform for Islamabad. Pearls AQI operates as an automated, self-healing pipeline that runs continuously: fetching live pollutant readings hourly, retraining four machine-learning models daily, registering the top-performing candidate in the cloud model store, and serving real-time 3-day forecasts via a high-performance API and interactive Next.js dashboard.

---

## 🏛️ Platform Architecture

The platform is engineered using a robust, decoupled architecture across four primary layers:

```
[ Open-Meteo API ]
        │ (Hourly Ingest via GitHub Actions)
        ▼
┌────────────────────────────────────────────────────────┐
│ 🗄️ FEATURE STORE LAYER (MongoDB Atlas)                 │
│ - Uniqueness constraints on (city, timestamp)         │
│ - Schema validation & deduplication guards             │
└────────────────────────────────────────────────────────┘
        │ (Daily Training Sync)
        ▼
┌────────────────────────────────────────────────────────┐
│ 🤖 ML PIPELINE & MODEL REGISTRY                        │
│ - Ridge Regression, Random Forest, Gradient Boosting,   │
│   and MLP Neural Networks evaluated daily              │
│ - TimeSeriesSplit (n=3) prevents temporal data leakage │
│ - Best model per forecast horizon saved to GridFS      │
└────────────────────────────────────────────────────────┘
        │ (Live Inference Requests)
        ▼
┌────────────────────────────────────────────────────────┐
│ 🔌 PREDICTION GATEWAY (FastAPI on Render)              │
│ - Serves 3-day horizon predictions with risk labels    │
│ - Real-time metrics, pipeline health, & quality audits │
└────────────────────────────────────────────────────────┘
        │ (Decision-Ready Analytics)
        ▼
┌────────────────────────────────────────────────────────┐
│ 💻 ANALYTICS INTERFACE (Next.js on Vercel)             │
│ - Light gradient theme with glassmorphic elements      │
│ - Trend graphs, model comparators, & pipeline evidence │
└────────────────────────────────────────────────────────┘
```

---

## 📂 Repository Structure

The codebase is organized into clean, modular components representing the deployed layout of the system:

* **[`frontend/`](file:///c:/Users/grcla/OneDrive/Desktop/10pearls%20proj/frontend)**: Next.js frontend application with dashboard viewports, styling tokens, and format utilities.
* **[`backend/`](file:///c:/Users/grcla/OneDrive/Desktop/10pearls%20proj/backend)**: FastAPI backend service, ML pipeline files (`train.py`, `predict.py`), feature store ingest logic, and unit tests.
* **[`documentation/`](file:///c:/Users/grcla/OneDrive/Desktop/10pearls%20proj/documentation)**: Project reports, data audit logs, and evidence of pipeline operations.
* **[`video_demo/`](file:///c:/Users/grcla/OneDrive/Desktop/10pearls%20proj/video_demo)**: Video demonstration guidelines, scripts, and video links.
* **[`.github/workflows/`](file:///c:/Users/grcla/OneDrive/Desktop/10pearls%20proj/.github/workflows)**: GitHub Actions YAML configuration files for the feature ingestion and training pipelines.

---

## 🚀 Quick Start & Local Setup

### Prerequisite Environment
Create a `.env` file at `backend/.env` with the following variables:
```env
MONGO_URI=your_mongodb_atlas_connection_string
```

### 1. Run the Backend (FastAPI)
Navigate to the backend directory and launch the server:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.api:app --reload --port 8000
```
Verify the API is live by visiting `http://127.0.0.1:8000/health`.

### 2. Run the Frontend (Next.js)
In a new terminal window, navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` to view the live dashboard.

---

## ⚙️ Automated Workflows (CI/CD)

The system relies on GitHub Actions to keep the prediction gateway operational and synchronized with fresh environmental features:

1. **Hourly Ingestion Pipeline (`feature-pipeline.yml`)**:
   * Runs at minute 17 of every hour (with a backup at minute 47).
   * Fetches weather data, computes lag/rolling averages, and saves them to MongoDB Atlas.
2. **Daily Training Pipeline (`training-pipeline.yml`)**:
   * Runs at 00:37 UTC daily.
   * Retrains Ridge, RF, GBDT, and MLP models, evaluates metrics, and saves the new champion model weight binaries to MongoDB GridFS.

---

## 👨‍💻 Developed By

**Salman Khan** — AI Engineer & Full Stack Developer
* **LinkedIn**: [https://linkedin.com/in/s4lmankhan](https://linkedin.com/in/s4lmankhan)
* **GitHub**: [https://github.com/s4lmankhan](https://github.com/s4lmankhan)
* **Email**: codewithsalty@gmail.com
