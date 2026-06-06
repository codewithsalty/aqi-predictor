# Frontend Deployment on Vercel

This deploys the Next.js product frontend for Pearls AQI Predictor.
It includes the landing page, live dashboard, methodology page, and creator profile.

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

Do not deploy from the repository root. The frontend app lives inside `frontend`.

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

The backend already allows Vercel preview/live domains using:

```text
CORS_ORIGIN_REGEX=https://.*\.vercel\.app|http://localhost:\d+|http://127\.0\.0\.1:\d+
```

If you want to be extra strict later, open Render:

```text
aqi-predictor-api -> Environment
```

Then add your exact Vercel URL to `CORS_ORIGINS`.

## Step 6: Verify

Open the Vercel URL.

Expected:

- City card shows `Islamabad`
- Day +1, Day +2, Day +3 show AQI numbers
- Champion models show `ridge`, `random_forest`, and `gradient_boosting`
- Pipeline health shows recent successful runs
- The dashboard model picker can compare trained models
- The methodology and about pages load from the header navigation

## GitHub Cleanliness

The local file below should not be committed:

```text
frontend/.env.local
```

The committed safe template is:

```text
frontend/.env.local.example
```

## Automation

Once connected, Vercel automatically redeploys the frontend whenever code is pushed to GitHub.

Render automatically redeploys the backend whenever backend code is pushed to GitHub.

GitHub Actions automatically update the data and trained models on schedule.
