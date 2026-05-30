# Internship Compliance Playbook (Evidence-Based)

This playbook consolidates instructions from:
- `project.md`
- `AQI_predict-1.pdf`
- `day1.md` to `day7.md` sync notes/transcripts

It is optimized for **June 8, 2026 (5:00 AM)** submission and evaluator expectations.

## 1) Hard Requirements (Do Not Violate)

1. Use **your city** for prediction scope (single-city focus is safest).
2. Predict **next 3 days AQI** (Day+1, Day+2, Day+3).
3. Use **Python** and ML pipeline approach.
4. Implement:
- Feature pipeline
- Training pipeline
- Model storage/registry
- UI dashboard
- CI/CD automation (GitHub Actions or Airflow)
5. Train **at least 3 models** and select best model by metrics.
6. Maintain project in GitHub with runnable automation and visible logs.
7. Final submission should include code + report + deploy/demo evidence.

## 2) Allowed Flexibility (From Mentors)

1. Feature store alternatives were accepted when Hopsworks was unstable:
- MongoDB / other cloud-backed alternatives
2. API source can vary (OpenMeteo/OpenWeather/AQICN), but use one consistent source in the main pipeline.
3. FastAPI/Flask backend is preferred but strict backend complexity is not grading focus.
4. UI can be Streamlit or custom frontend; deployability matters more than framework.
5. Regression/classification both seen as acceptable depending on API target format.

## 3) Risky Patterns to Avoid

1. Do not hardcode one model forever as champion.
2. Do not fetch duplicate rows unchecked in hourly jobs.
3. Do not leave failed GitHub Actions runs unresolved (red checks hurt perception).
4. Do not rely only on CSV/local artifacts as final storage story.
5. Do not ignore overfit indicators (e.g., suspiciously high R2 near 1.0).

## 4) Scoring Boosters (Differentiate Among 500+)

1. Clean EDA narrative with visuals and reasoning path.
2. Explainability artifact (SHAP/LIME) linked to feature decisions.
3. Strong report section: biggest blockers + how you solved each.
4. Reliable demo story:
- Live deployed UI
- Green CI logs
- Backup demo video in case platform outage occurs
5. Crisp evaluation presentation flow (10–15 mins):
- Problem
- Architecture
- Pipeline proof
- Model proof
- Demo
- Lessons learned

## 5) Final 48-Hour Checklist

1. Backfill data complete (2–3 months+).
2. Hourly ingestion and daily training workflows green.
3. Champion selected dynamically for Day+1/2/3 horizons.
4. `/predict` returns 3-day values + risk labels.
5. UI shows forecast cards, trend chart, hazard state, freshness, pipeline health.
6. Report finalized (`report.md`) with evidence and screenshots.
7. Demo video recorded and accessible.
8. Submission bundle links validated.

## 6) Evaluator Q&A Prep

Be ready to answer:
1. Why this feature store choice?
2. How duplicate data is handled?
3. How leakage/overfitting was detected?
4. Why champion model changes over time?
5. Which metrics drove selection and why?
6. How system recovers if provider/API fails?
