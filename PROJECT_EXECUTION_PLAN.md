# Project Execution Plan (May 30, 2026 -> June 8, 2026)

This plan is designed to maximize both **submission quality** and **evaluation performance** before the deadline.

## Milestones

1. **M1 - Technical Stability** (May 30-31)
- Environment setup complete
- Backfill, ingestion, training scripts run successfully
- API and dashboard run locally

2. **M2 - Evidence and Quality** (June 1-3)
- EDA artifacts generated
- SHAP explainability generated
- Quality audit clean or documented with mitigations
- GitHub Actions configured and green

3. **M3 - Deployment and Demo** (June 4-6)
- Deploy backend + frontend
- Validate pipeline health visibility
- Record demo video fallback
- Capture key screenshots

4. **M4 - Submission and Viva Readiness** (June 7)
- Final report complete with actual metrics
- Checklist fully closed
- Viva dry run completed
- Submission bundle verified

## Daily Action Plan

## May 30
- Install dependencies and configure `.env`.
- Run backfill and initial training.
- Start API and frontend locally.

## May 31
- Run quality audit and resolve findings.
- Confirm endpoint outputs for predict/metrics/quality.
- Confirm Day+1/2/3 horizon predictions are valid.

## June 1
- Generate EDA artifacts.
- Generate SHAP explainability output.
- Start writing final metrics section in report.

## June 2
- Configure GitHub Actions secrets.
- Trigger workflows manually and verify successful runs.
- Fix any failing workflow immediately.

## June 3
- Repeat workflow validation.
- Verify logs and run history are evaluator-friendly.
- Prepare screenshot set.

## June 4
- Deploy API and dashboard.
- Validate deployed prediction path.
- Add deployment links to report placeholders.

## June 5
- Record demo video (with narration).
- Include fallback flow in case cloud services are unstable.

## June 6
- Full dry-run of 10–15 minute viva using script.
- Tighten report language and architecture diagrams/screenshots.

## June 7
- Final QA pass with `FINAL_EXECUTION_CHECKLIST.md`.
- Freeze submission package.

## June 8 (deadline day)
- Final sanity check.
- Submit before **5:00 AM** buffer target.

## Quality Gates

1. No critical runtime failures in local execution path.
2. At least one clean successful run for:
- ingestion
- training
- quality audit
- prediction endpoint
3. Metrics present and report populated with actual values.
4. Dashboard and API deploy links functional.
