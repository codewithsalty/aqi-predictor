# MongoDB Unblock Guide

If `python -m scripts.preflight_check` fails on `mongodb_connectivity`, use one of these paths.

## Path A: Local MongoDB via Docker Desktop

1. Start Docker Desktop.
2. Run:
```powershell
docker compose -f docker-compose.local.yml up -d mongo
```
3. Confirm:
```powershell
cd backend
python -m scripts.preflight_check
```

Expected: `mongodb_connectivity` should be `pass`.

## Path B: MongoDB Atlas

1. Create a free Atlas cluster.
2. Get connection string from Atlas.
3. Set URI:
```powershell
.\scripts\set_mongo_uri.ps1 -MongoUri "mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority"
```
4. Run preflight again:
```powershell
cd backend
python -m scripts.preflight_check
```

## After Unblock

Run full pipeline:
```powershell
.\scripts\run_all_local.ps1
```

Auto-fill report:
```powershell
cd backend
python -m scripts.autofill_report_from_runtime --repo-link "<repo>" --live-link "<live>" --video-link "<video>" --screens-link "submission_evidence/screenshots"
```
