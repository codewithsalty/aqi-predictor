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

> [!NOTE]
> **GitHub Actions & Account Note:** Due to subscription and payment processing limitations on my primary GitHub profile (`s4lmankhan`), GitHub Actions run limits were restricted. To guarantee 100% pipeline uptime and execute automated runners on schedule, all automated workflows, pipelines, and deployment integrations are hosted and executed under my secondary account (`codewithsalty`).

---

## 🏛️ Platform Architecture & Engineering Breakdown

I engineered the platform using a robust, decoupled architecture across four primary layers:

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

## 🛠️ Detailed Implementation Lifecycle

### 1. Data Ingestion & Storage (The Feature Store)
* **What I Did**: I built a continuous, automated ingestion pipeline that communicates directly with the **Open-Meteo API** (extracting raw meteorology, time variables, and pollutant levels: PM2.5, PM10, CO, SO2, NO2, O3).
* **The Data Store**: I utilized **MongoDB Atlas** as my primary cloud feature store database. 
* **Reliability Features**: 
  * I configured a compound unique constraint on `(city, timestamp)` to block duplicate ingestion records.
  * I implemented a custom data auditing script to detect missing rows, flag out-of-range pollution metrics, and log daily ingestion health.

### 2. Feature Engineering Pipeline
* **What I Did**: I designed a preprocessing script inside `backend/app/features.py` that transforms raw readings into clean, high-signal ML features.
* **Engineered Signals**:
  * **Seasonality Inductors**: I extracted temporal variables (`day_of_month`, `month_of_year`) to teach the model natural seasonal pollution cycles.
  * **AQI Lags**: I generated lag indicators at 1h, 2h, and 3h intervals to provide the regression algorithms with short-term ambient memory.
  * **Rolling Metrics**: I calculated a 3-hour rolling average on PM2.5 and PM10 to filter out transient outlier peaks.
  * **Rate of Change**: I designed an AQI delta (first-order difference) feature to track the velocity of air quality variations.

### 3. Model Training & Champion Promotion (MLOps)
* **What I Did**: I built an automated training pipeline inside `backend/app/train.py` that evaluates four different regressor families:
  1. **Ridge Regression**: Linear baseline, resilient to multi-collinearity.
  2. **Random Forest Regressor**: Non-linear tree ensemble to capture interactions.
  3. **Gradient Boosting Regressor**: Boosting trees optimized on forecasting residuals.
  4. **MLP Neural Network**: A multi-layer perceptron neural network using standard scaling, hidden layers, and early stopping.
* **Validation Strategy**: I avoided random shuffling. Instead, I implemented a time-series-aware split (`TimeSeriesSplit(n_splits=3)`) to simulate actual production environments.
* **Registry & GridFS**: Metrics (RMSE, MAE, R²) and trained model files are saved. Model binary weights are registered dynamically inside **MongoDB GridFS**, enabling direct streaming retrieval by the serving backend on demand.
* **Overfitting Guardrail**: An safety checker raises warnings in the pipeline run logs if any model scores an R² value exceeding `0.999`.

### 4. Inference & Gateway Service (FastAPI)
* **What I Did**: I developed a REST API using **FastAPI** to load the champion model for each day (`day_1`, `day_2`, `day_3`) and return forecasts.
* **Operational Endpoints**:
  * `/predict`: Returns live predictions with US AQI hazard labels (e.g. *Good*, *Moderate*, *Unhealthy*).
  * `/metrics/latest`: Exposes the leaderboard metrics.
  * `/pipeline/health`: Checks the status of Github Actions.
  * `/quality/latest`: Exposes the feature store data audit.

### 5. Render Backend Deployment
* **What I Did**: I deployed the FastAPI backend as a public Web Service on **Render** to serve live inference queries for the frontend.
* **Deployment Details**:
  * **Service Type**: Web Service
  * **Root Directory**: `backend` (tells Render to execute commands inside the backend folder)
  * **Build Command**: `pip install -r requirements.deploy.txt` (installs only lightweight serving packages without heavy training dependencies)
  * **Start Command**: `uvicorn app.api:app --host 0.0.0.0 --port $PORT`
  * **Environment Variables**:
    * `MONGO_URI`: The MongoDB Atlas connection string so the API can read features and load registered GridFS model champions.
    * `MONGO_DB_NAME`: The database namespace to fetch models.

### 6. Client User Interface (Next.js Dashboard)
* **What I Did**: I developed a sleek Client UI using **Next.js** and TypeScript, employing the original light gradient ambient design tokens and responsive glassmorphic cards.
* **UI Capabilities**:
  * **Three-Day Forecast Cards**: Dynamic risk indicators based on predicted AQI levels.
  * **Interactive Trend Visualizations**: Uses `Recharts` to chart forecasted pollution levels.
  * **Model Comparators**: An interactive selector that allows users to compare champion performance with individual baseline algorithms.

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

## 👨‍💻 Developed & Engineered By

**Salman Khan** — AI Engineer & Full Stack Developer
* **LinkedIn**: [https://linkedin.com/in/s4lmankhan](https://linkedin.com/in/s4lmankhan)
* **GitHub**: [https://github.com/s4lmankhan](https://github.com/s4lmankhan)
* **Email**: codewithsalty@gmail.com
