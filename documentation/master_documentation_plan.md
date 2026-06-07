# Master Documentation and Screenshot Plan

This file is the capture plan for the final internship submission report.

The goal is to replace scattered documentation with one clean master report in the `documentation` folder after all required screenshots are collected.

Final target report file:

```text
documentation/final_submission_report.md
```

Optional screenshot folder:

```text
documentation/screenshots/
```

Do not include private secrets, passwords, full MongoDB URI values, API keys, or hidden tokens in screenshots.

## Screenshot Naming Rule

Use simple numbered filenames so the final report is easy to assemble:

```text
01_candidate_portal_requirements.png
02_live_frontend_home.png
03_live_frontend_dashboard_forecast.png
04_live_frontend_model_comparison.png
...
```

Keep all screenshots inside:

```text
documentation/screenshots/
```

## Master Screenshot Checklist

### A. Project Requirement Proof

1. `01_candidate_portal_requirements.png`
   - Capture the candidate portal project card.
   - Show project title, requirement summary, tech stack, and deadline.
   - Purpose: proves what the task asked us to build.

2. `02_submission_form_github_requirement.png`
   - Capture the submission form showing it asks for GitHub repository URL.
   - Purpose: proves final deliverable requirement.

### B. Live Frontend Product Proof

3. `03_live_frontend_home.png`
   - Open `https://pearls-aqi.vercel.app/`.
   - Capture the landing hero and live preview.
   - Purpose: proves deployed frontend exists and looks product-ready.

4. `04_live_frontend_dashboard_forecast.png`
   - Open `https://pearls-aqi.vercel.app/dashboard`.
   - Capture the main dashboard with Islamabad, AQI cards, forecast values, and status.
   - Purpose: proves live 3-day forecast UI.

5. `05_live_frontend_forecast_chart.png`
   - Capture forecast trend chart on dashboard.
   - Purpose: proves visual analytics, not just plain text output.

6. `06_live_frontend_model_picker.png`
   - Open model dropdown and capture available models.
   - Show champion mode plus individual models such as Ridge, Random Forest, Gradient Boosting, and MLP.
   - Purpose: proves multiple model comparison.

7. `07_live_frontend_model_metrics.png`
   - Capture leaderboard or model diagnostics section.
   - Purpose: proves RMSE, MAE, and R2 evaluation is visible.

8. `08_live_frontend_pipeline_quality.png`
   - Capture pipeline health and quality audit cards.
   - Purpose: proves operational evidence is visible in frontend.

9. `09_live_frontend_methodology.png`
   - Capture methodology page.
   - Purpose: proves project explanation is included in the web product.

10. `10_live_frontend_about_salman.png`
    - Capture about/creator page.
    - Purpose: supports resume/product presentation.

11. `11_live_frontend_mobile_view.png`
    - Use browser responsive mode and capture mobile dashboard or landing page.
    - Purpose: proves responsive UI.

### C. Backend API Proof

12. `12_render_backend_service.png`
    - Capture Render service dashboard for `aqi-predictor-api`.
    - Show deployed status and service URL.
    - Hide environment variable values.
    - Purpose: proves backend deployment.

13. `13_backend_health_endpoint.png`
    - Open `https://aqi-predictor-api-cuec.onrender.com/health`.
    - Capture JSON showing status ok and city Islamabad.
    - Purpose: proves backend health.

14. `14_backend_predict_endpoint.png`
    - Open `https://aqi-predictor-api-cuec.onrender.com/predict`.
    - Capture JSON showing city, generated_at, models, and 3 predictions.
    - Purpose: proves live inference output.

15. `15_backend_metrics_endpoint.png`
    - Open `https://aqi-predictor-api-cuec.onrender.com/metrics/latest`.
    - Capture model metrics JSON.
    - Purpose: proves RMSE, MAE, R2 are stored and served.

16. `16_backend_models_endpoint.png`
    - Open `https://aqi-predictor-api-cuec.onrender.com/models/latest`.
    - Capture champion model, feature columns, and leaderboard fields.
    - Purpose: proves model registry API.

17. `17_backend_pipeline_health_endpoint.png`
    - Open `https://aqi-predictor-api-cuec.onrender.com/pipeline/health`.
    - Capture recent successful runs.
    - Purpose: proves automation evidence is exposed.

18. `18_backend_quality_endpoint.png`
    - Open `https://aqi-predictor-api-cuec.onrender.com/quality/latest`.
    - Capture pass status, row count, duplicates, null checks.
    - Purpose: proves data quality audit.

19. `19_backend_swagger_docs.png`
    - Open `https://aqi-predictor-api-cuec.onrender.com/docs` if available.
    - Capture FastAPI Swagger endpoints list.
    - Purpose: proves professional API documentation.

### D. MongoDB Atlas Proof

20. `20_atlas_database_collections.png`
    - Capture MongoDB Atlas Data Explorer showing database `aqi_predictor` and collections.
    - Include `features_v1`, `model_metrics`, `model_registry`, `pipeline_runs`, `predictions`, `quality_audits`, `fs.files`, and `fs.chunks`.
    - Purpose: proves cloud feature/model storage structure.

21. `21_atlas_features_islamabad.png`
    - Open `features_v1` and filter/query for Islamabad if needed.
    - Show city Islamabad, timestamp, AQI, pollutant fields, schema version.
    - Purpose: proves feature store data.

22. `22_atlas_features_indexes.png`
    - Open Indexes tab for `features_v1`.
    - Show city/timestamp unique or dedup index.
    - Purpose: proves deduplication reliability.

23. `23_atlas_model_metrics.png`
    - Open `model_metrics` and expand latest Islamabad record.
    - Show metrics object with RMSE, MAE, R2 if visible.
    - Purpose: proves training evaluation storage.

24. `24_atlas_model_registry_champions.png`
    - Open `model_registry` and expand latest Islamabad record.
    - Show champion_model for day_1/day_2/day_3 and feature_columns.
    - Purpose: proves dynamic champion registry.

25. `25_atlas_gridfs_files.png`
    - Open `fs.files`.
    - Show model artifact file metadata.
    - Purpose: proves trained model binary storage.

26. `26_atlas_gridfs_chunks.png`
    - Open `fs.chunks`.
    - Show binary chunks connected to GridFS file.
    - Purpose: proves GridFS storage is real.

27. `27_atlas_predictions.png`
    - Open `predictions` and expand latest Islamabad record.
    - Show generated_at, model object, and 3 prediction objects.
    - Purpose: proves prediction records stored in cloud.

28. `28_atlas_quality_audit.png`
    - Open `quality_audits` and show latest pass status.
    - Purpose: proves data quality audit storage.

29. `29_atlas_pipeline_runs.png`
    - Open `pipeline_runs` and show successful feature/training runs.
    - Purpose: proves backend writes operational run logs.

### E. GitHub Repository and Actions Proof

30. `30_github_repo_home.png`
    - Capture public GitHub repository home page.
    - Show repo name, README, branch, and file structure.
    - Purpose: proves submission repository.

31. `31_github_actions_all_green.png`
    - Capture GitHub Actions All workflows page.
    - Show recent green scheduled feature and training runs.
    - Purpose: proves CI/CD automation is working.

32. `32_github_feature_pipeline_runs.png`
    - Open Feature Pipeline workflow.
    - Capture scheduled runs with success status.
    - Purpose: proves hourly ingestion automation.

33. `33_github_feature_pipeline_log.png`
    - Open one successful Feature Pipeline run log.
    - Capture steps: checkout, setup Python, install dependencies, run feature ingestion.
    - Purpose: proves workflow actually executes pipeline code.

34. `34_github_training_pipeline_runs.png`
    - Open Training Pipeline workflow.
    - Capture scheduled runs with success status.
    - Purpose: proves daily model training automation.

35. `35_github_training_pipeline_log.png`
    - Open one successful Training Pipeline run log.
    - Capture train step and completion.
    - Purpose: proves model training executes in GitHub Actions.

36. `36_github_workflow_feature_yaml.png`
    - Open `.github/workflows/feature-pipeline.yml` in GitHub.
    - Capture cron schedule and secrets usage without exposing secret values.
    - Purpose: proves workflow configuration.

37. `37_github_workflow_training_yaml.png`
    - Open `.github/workflows/training-pipeline.yml` in GitHub.
    - Capture cron schedule and run_train step.
    - Purpose: proves daily training configuration.

### F. Vercel Deployment Proof

38. `38_vercel_project_dashboard.png`
    - Capture Vercel project dashboard for the frontend.
    - Show domain and successful deployment status.
    - Purpose: proves frontend deployment.

39. `39_vercel_environment_variable.png`
    - Capture Vercel env var names only.
    - Show `NEXT_PUBLIC_API_BASE_URL` name but hide value if needed.
    - Purpose: proves frontend-backend connection config.

40. `40_vercel_deployment_logs.png`
    - Capture successful Vercel build/deployment logs.
    - Purpose: proves frontend build pipeline.

### G. Render Deployment Proof

41. `41_render_logs.png`
    - Capture Render logs showing FastAPI/Uvicorn startup or successful health check.
    - Purpose: proves backend service runtime.

42. `42_render_environment_names.png`
    - Capture env var names only, not values.
    - Show `MONGODB_URI`, `MONGODB_DB_NAME`, `CITY`, CORS settings.
    - Purpose: proves backend deployment configuration.

### H. EDA and Explainability Proof

43. `43_eda_daily_aqi_trend.png`
    - Use local artifact `backend/artifacts/eda/daily_aqi_trend.png`.
    - Purpose: proves EDA trend analysis.

44. `44_eda_summary_stats.png`
    - Open `backend/artifacts/eda/summary_stats.csv`.
    - Capture summary statistics table.
    - Purpose: proves EDA numerical summary.

45. `45_eda_correlations.png`
    - Open `backend/artifacts/eda/correlations.csv`.
    - Capture correlation table.
    - Purpose: proves relationship analysis.

46. `46_shap_importance.png`
    - Open `backend/artifacts/explainability/shap_day1_importance.json`.
    - Capture top feature importance rows.
    - Purpose: proves SHAP explainability artifact.

### I. Code Proof Screenshots

47. `47_code_feature_pipeline.png`
    - Capture `backend/app/features.py` or feature pipeline code.
    - Purpose: proves feature engineering implementation.

48. `48_code_training_pipeline.png`
    - Capture `backend/app/train.py` around model list and champion selection.
    - Purpose: proves multiple model training logic.

49. `49_code_fastapi_endpoints.png`
    - Capture `backend/app/api.py` endpoint definitions.
    - Purpose: proves backend API implementation.

50. `50_code_frontend_dashboard.png`
    - Capture `frontend/app/components/LiveDashboard.tsx`.
    - Purpose: proves frontend dashboard implementation.

## Minimum Screenshot Set If Time Is Short

If time is short, take these 15 screenshots first:

1. Candidate portal requirements.
2. Live frontend home.
3. Live frontend dashboard forecast.
4. Live frontend model picker.
5. Live frontend metrics/leaderboard.
6. Backend `/health`.
7. Backend `/predict`.
8. Backend `/metrics/latest`.
9. MongoDB collections list.
10. Atlas `features_v1` Islamabad record.
11. Atlas `model_registry` champion record.
12. Atlas `fs.files` GridFS model artifact.
13. GitHub Actions all green page.
14. Feature Pipeline successful scheduled run.
15. Training Pipeline successful scheduled run.

## Final Master Report Structure

The final report should be one clean file:

```text
documentation/final_submission_report.md
```

Recommended sections:

1. Title page
   - Project name
   - Salman Khan
   - Data Sciences internship
   - City: Islamabad
   - GitHub, frontend, and backend links

2. Executive summary
   - What the system does
   - Why it is useful
   - What makes it end-to-end

3. Project requirements mapping
   - Requirement vs implementation table
   - Mention Python, Scikit-learn, FastAPI, GitHub Actions, MongoDB Atlas, Next.js, Render, Vercel, SHAP

4. Architecture overview
   - Data source to feature store to training to registry to API to frontend
   - Include architecture screenshot or diagram

5. Data collection and feature store
   - Open-Meteo source
   - Islamabad coordinates
   - MongoDB Atlas collections
   - Deduplication and schema versioning
   - Screenshots: Atlas collections, features, indexes

6. Feature engineering
   - Pollutants
   - Time features
   - AQI delta
   - Lag features
   - Rolling features
   - Data quality checks

7. Historical backfill
   - Explain how stored feature history creates training data
   - Mention row count and quality status

8. Model training pipeline
   - Ridge Regression
   - Random Forest
   - Gradient Boosting
   - MLP Neural Network
   - Time-aware validation
   - Metrics: RMSE, MAE, R2
   - Screenshots: GitHub training logs, model metrics, model registry

9. Champion selection and model registry
   - Explain best model per horizon
   - Explain why Day +1, Day +2, Day +3 can have different champions
   - Explain GridFS model storage

10. Prediction backend
    - FastAPI endpoints
    - Render deployment
    - Live endpoint screenshots

11. Frontend dashboard
    - Vercel deployment
    - Landing page
    - Dashboard forecast
    - Model comparison
    - Pipeline health
    - Quality audit
    - Mobile responsiveness

12. Automation and CI/CD
    - Hourly feature pipeline
    - Daily training pipeline
    - Backup schedules
    - Training catch-up guard
    - GitHub Actions evidence

13. EDA and explainability
    - Daily AQI trend
    - Summary stats
    - Correlations
    - SHAP feature importance

14. Results and observations
    - Latest forecast values
    - Latest champion models
    - Quality audit status
    - Practical interpretation of AQI categories

15. Challenges and fixes
    - GitHub billing/account issue and switch to codewithsalty
    - Atlas URI encoding issue
    - Old Lahore records cleanup
    - GitHub cron delays and backup triggers
    - CORS/frontend failed-fetch fix

16. Final submission evidence
    - GitHub repo link
    - Live frontend link
    - Backend API link
    - Screenshots list

17. Conclusion
    - What was learned
    - Why this is more than a notebook
    - Future improvements: multi-city support, better real-time sensor APIs, richer SHAP plots, notification alerts

## Report Writing Style

The report should sound like Salman wrote it, not like a corporate whitepaper.

Style rules:

- Clear and honest wording.
- Use first person where natural, for example: "I chose MongoDB Atlas because..."
- Avoid overclaiming.
- Mention real blockers and how they were fixed.
- Explain technical terms simply.
- Keep screenshots close to the related explanation.
- Use tables for requirement mapping and metrics.

## Cleanup Plan After Final Report Is Created

After `documentation/final_submission_report.md` is complete and verified, we can simplify the repo documentation.

Keep:

```text
documentation/final_submission_report.md
documentation/screenshots/
video_demo/README.md
README.md
```

Remove or archive from public submission if they are no longer needed:

```text
documentation/automation_evidence.md
documentation/evidence_snapshot.md
documentation/pdf_extracted_text.md
documentation/report.md
documentation/README.md
```

The ignored `docs/` folder can stay local as source material, because `.gitignore` already keeps it out of GitHub.

## Next Action

Take screenshots in the order above. Once screenshots are available in `documentation/screenshots/`, the final report can be created and old documentation can be removed from the public tracked documentation folder.
