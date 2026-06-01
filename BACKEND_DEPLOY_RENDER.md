# Backend Deployment on Render

This deploys the FastAPI backend that powers the AQI dashboard.

## What Render Will Do Automatically

- Build the backend from the `backend` folder.
- Install only runtime API dependencies from `requirements.deploy.txt`.
- Start the API with `uvicorn`.
- Redeploy automatically whenever new code is pushed to the `main` branch.

The model does not need to be retrained inside Render. GitHub Actions trains models and stores them in MongoDB Atlas. The deployed backend reads the latest model and predictions from Atlas whenever the frontend calls it.

## Step 1: Create the Render Service

1. Open `https://dashboard.render.com`.
2. Sign up or log in with GitHub.
3. Click `New`.
4. Choose `Blueprint`.
5. Select the GitHub repository:

```text
codewithsalty/aqi-predictor
```

6. Render will detect `render.yaml`.
7. Click `Apply` or `Deploy`.

## Step 2: Add Secret Environment Values

Render will ask for values marked as secret.

Use these:

```text
MONGODB_URI = your MongoDB Atlas URI
GITHUB_TOKEN = leave blank unless GitHub API rate limits happen
```

For `MONGODB_URI`, use the same working Atlas URI you added to GitHub Actions.

Important: do not commit the real MongoDB URI into GitHub.

## Step 3: Wait for Deploy

Render will show build logs.

Success looks like:

```text
Your service is live
```

Render gives a URL like:

```text
https://aqi-predictor-api.onrender.com
```

## Step 4: Test the Backend

Open these in your browser:

```text
https://aqi-predictor-api.onrender.com/health
https://aqi-predictor-api.onrender.com/predict
https://aqi-predictor-api.onrender.com/metrics/latest
```

Expected result:

- `/health` returns `{"status":"ok","city":"Islamabad"}`
- `/predict` returns 3 AQI predictions
- `/metrics/latest` returns RMSE, MAE, and R2 results

## Step 5: If MongoDB Fails

If Render logs show a MongoDB connection timeout, open MongoDB Atlas:

1. Go to `Database & Network Access`.
2. Open `Network Access`.
3. Add IP Address.
4. For demo deployment, add:

```text
0.0.0.0/0
```

This allows Render to connect. For production, this should be locked down more carefully.

## Step 6: Connect Frontend Later

After frontend deployment, update the backend `CORS_ORIGINS` value in Render:

```text
http://localhost:3000,http://127.0.0.1:3000,https://your-vercel-url.vercel.app
```

Then update the frontend environment variable:

```text
NEXT_PUBLIC_API_BASE_URL=https://aqi-predictor-api.onrender.com
```

## Free Plan Note

Render free web services sleep after inactivity. The first request after sleeping can take around a minute. That is normal and acceptable for demo use.
