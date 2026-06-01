# Frontend Deployment on Vercel

This deploys the Next.js dashboard that visualizes the deployed FastAPI backend.

## Current Backend API

```text
https://aqi-predictor-api-cuec.onrender.com
```

The frontend must use this value:

```text
NEXT_PUBLIC_API_BASE_URL=https://aqi-predictor-api-cuec.onrender.com
```

## Step 1: Create Vercel Project

1. Open `https://vercel.com`.
2. Sign up or log in with GitHub.
3. Click `Add New`.
4. Choose `Project`.
5. Import this repository:

```text
codewithsalty/aqi-predictor
```

## Step 2: Configure Project

Use these settings:

```text
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

## Step 3: Add Environment Variable

Add this environment variable in Vercel:

```text
NEXT_PUBLIC_API_BASE_URL=https://aqi-predictor-api-cuec.onrender.com
```

## Step 4: Deploy

Click `Deploy`.

Vercel will give a URL like:

```text
https://aqi-predictor-xxxx.vercel.app
```

## Step 5: Allow Frontend in Render CORS

After Vercel gives the frontend URL, open Render:

```text
aqi-predictor-api -> Environment
```

Update:

```text
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,https://your-vercel-url.vercel.app
```

Then click `Save Changes` and let Render redeploy.

## Step 6: Verify

Open the Vercel URL.

Expected:

- City card shows `Islamabad`
- Day +1, Day +2, Day +3 show AQI numbers
- Champion models show `ridge`, `random_forest`, and `gradient_boosting`
- Pipeline health shows recent successful runs

## Automation

Once connected, Vercel automatically redeploys the frontend whenever code is pushed to GitHub.

Render automatically redeploys the backend whenever backend code is pushed to GitHub.

GitHub Actions automatically update the data and trained models on schedule.
