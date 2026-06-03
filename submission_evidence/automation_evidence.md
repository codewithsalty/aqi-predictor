# Automation Evidence

Verified on: `2026-06-03` Asia/Karachi

## Feature Pipeline Schedule

The feature pipeline is defined in:

```text
.github/workflows/feature-pipeline.yml
```

Current automation triggers:

```yaml
schedule:
  - cron: "17 * * * *"
  - cron: "47 * * * *"
workflow_dispatch:
push:
```

Meaning:

- The main hourly trigger runs at minute `17` of every UTC hour.
- The backup hourly trigger runs at minute `47` of every UTC hour.
- GitHub Actions can delay scheduled jobs under load, so the backup trigger gives the project a second hourly chance.
- The feature ingestion code is deduplicated by `city + timestamp`, so an extra backup run does not create duplicate feature rows.

## GitHub Actions Proof

Latest confirmed scheduled Feature Pipeline run:

```text
Workflow: Feature Pipeline
Run number: #7
Event: schedule
Status: completed
Conclusion: success
Commit: 4ab895d
Created at UTC: 2026-06-02T22:04:39Z
Updated at UTC: 2026-06-02T22:05:26Z
```

Verification run after workflow fix:

```text
Workflow: Feature Pipeline
Run number: #6
Event: push
Status: completed
Conclusion: success
Commit: 87f1b69
Created at UTC: 2026-06-02T20:51:25Z
Updated at UTC: 2026-06-02T20:52:17Z
```

## MongoDB / Backend Proof

The deployed backend pipeline health endpoint showed the scheduled feature run reached MongoDB Atlas:

```text
pipeline_name: feature_ingestion
status: success
run_at: 2026-06-02T22:05:22.729000
details: {"total":24,"inserted":0,"duplicates":24}
```

Interpretation:

- `total: 24` means the pipeline processed 24 hourly records.
- `inserted: 0` and `duplicates: 24` means those hourly timestamps already existed.
- This is expected after recent successful runs and proves the deduplication guard is working.

The previous push-triggered verification inserted fresh rows:

```text
pipeline_name: feature_ingestion
status: success
run_at: 2026-06-02T20:52:13.536000
details: {"total":24,"inserted":24,"duplicates":0}
```

## Training Pipeline Schedule

The training pipeline is defined in:

```text
.github/workflows/training-pipeline.yml
```

Current automation trigger:

```yaml
schedule:
  - cron: "37 0 * * *"
  - cron: "7 1 * * *"
workflow_dispatch:
push:
```

Meaning:

- Training has a primary daily run at `00:37 UTC`, which is `05:37 AM` in Pakistan.
- Training has a backup daily run at `01:07 UTC`, which is `06:07 AM` in Pakistan.
- Training also runs on relevant pushes so workflow/code changes are verified immediately.
- The feature workflow runs `backend/scripts/run_train_if_due.py` after ingestion as a non-blocking catch-up guard.
- If the latest successful training run is fresh, catch-up skips.
- If the latest successful training run is stale, catch-up trains and registers a new model.
- This design protects the model registry from GitHub public scheduler delays or dropped cron events.

Latest confirmed successful training run:

```text
Workflow: Training Pipeline
Run number: #5
Event: workflow_dispatch
Status: completed
Conclusion: success
Created at UTC: 2026-06-02T10:05:25Z
Updated at UTC: 2026-06-02T10:06:20Z
```

Backend evidence for that training run:

```text
pipeline_name: training
status: success
run_at: 2026-06-02T10:06:16.642000
champions:
  day_1: ridge
  day_2: random_forest
  day_3: gradient_boosting
overall_winner: gradient_boosting
```

## Submission Interpretation

This evidence proves:

- GitHub Actions is active.
- The feature pipeline is configured with primary and backup hourly schedules.
- The feature pipeline reaches MongoDB Atlas and writes run metadata.
- The system has duplicate protection, so repeated hourly runs are safe.
- The training pipeline is configured with primary and backup daily automation and has confirmed successful runs.
- Feature ingestion now includes a training freshness guard so missed daily training can be recovered automatically.
