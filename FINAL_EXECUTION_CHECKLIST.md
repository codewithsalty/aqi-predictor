# Final Execution Checklist (Before June 8, 2026 - 5:00 AM)

## A) Mandatory Functionality
- [ ] `run_backfill` completed successfully.
- [ ] Hourly ingestion script works and inserts new rows.
- [ ] Daily training script trains 3+ models and selects champions.
- [ ] `/predict` returns 3 days with risk labels.
- [ ] UI loads and shows forecast cards and trend chart.

## B) Rubric Evidence
- [ ] Feature store data exists in MongoDB cloud.
- [ ] Model registry metadata exists (with horizon champions).
- [ ] GridFS model artifact is stored.
- [ ] GitHub Actions runs are visible and mostly green.
- [ ] Report contains blockers + resolution + EDA + metrics.

## C) Data Science Quality
- [ ] `run_quality_audit` executed; warnings addressed.
- [ ] No unresolved data duplication issues.
- [ ] Metrics are realistic (no unreviewed overfit symptoms).
- [ ] SHAP importance generated (`run_explainability`).
- [ ] EDA artifacts generated (`run_eda` outputs).

## D) Demo Safety
- [ ] Live deployment URL works.
- [ ] Fallback demo video recorded.
- [ ] Key screenshots captured:
  - pipeline logs
  - metrics endpoint
  - prediction endpoint
  - dashboard output

## E) Viva Readiness
- [ ] Practice once with `EVALUATION_VIVA_SCRIPT.md`.
- [ ] Keep 3 strongest technical decisions ready:
  - Why this feature store path
  - Why time-split validation
  - Why multi-horizon model selection
