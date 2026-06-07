# Pearls AQI Predictor - Final Internship Report

Prepared by Salman Khan  
City: Islamabad, Pakistan  
Submission date: 2026-06-08

## Executive Summary

I built an end-to-end AQI forecasting system for Islamabad that predicts the next 3 days of AQI. The project uses a cloud feature store, automated model training, a model registry, a backend API, and a live frontend dashboard.

This was not only a notebook. The final system includes:

- Open-Meteo weather and air-quality ingestion.
- MongoDB Atlas feature store and model registry.
- Feature engineering with lag, rolling, time, pollutant, and AQI movement features.
- Ridge, Random Forest, Gradient Boosting, and MLP neural-net challenger models.
- RMSE, MAE, and R2 evaluation.
- GitHub Actions automation.
- Render backend deployment.
- Vercel frontend deployment.
- EDA, quality audit, and evidence screenshots.

## Final Links

| Item | Link |
|---|---|
| GitHub repository | https://github.com/codewithsalty/aqi-predictor |
| Frontend | https://pearls-aqi.vercel.app/ |
| Dashboard | https://pearls-aqi.vercel.app/dashboard |
| Backend API | https://aqi-predictor-api-cuec.onrender.com |
| Backend docs | https://aqi-predictor-api-cuec.onrender.com/docs |

## Latest Prediction Snapshot

Generated at: 2026-06-07T19:24:22.226422+00:00  
Selection mode: horizon_champions

| Horizon | Date | Predicted AQI | Risk | Model |
|---|---:|---:|---|---|
| Day +1 | 2026-06-08 | 87.89 | Moderate | ridge |
| Day +2 | 2026-06-09 | 86.41 | Moderate | random_forest |
| Day +3 | 2026-06-10 | 100.50 | Unhealthy for Sensitive Groups | random_forest |

## Latest Champion Models

| Horizon | Champion | RMSE | MAE | R2 |
|---|---|---:|---:|---:|
| Day 1 | ridge | 12.19 | 8.88 | 0.507 |
| Day 2 | random_forest | 22.24 | 16.54 | -0.673 |
| Day 3 | random_forest | 24.10 | 17.45 | -0.973 |

Overall winner: random_forest  
Average RMSE: 20.58  
Average MAE: 15.10  
Average R2: -0.446

## Quality Audit

| Check | Value |
|---|---:|
| Rows audited | 2208 |
| Duplicate rows | 0 |
| AQI out of range rows | 0 |
| Leakage risk hint | False |
| Status | pass |

## What I Submitted

The candidate portal requires the GitHub repository URL. The repository is public and includes the complete backend, frontend, automation workflows, documentation, screenshots, evidence files, and deployment information.

The complete polished report is available as:

`documentation/Pearls_AQI_Predictor_Final_Internship_Report.docx`
