# 🎥 Video Demonstration Guide: Pearls AQI Predictor

This directory is designated for the video walkthrough and presentation demonstration of the Pearls AQI Predictor platform.

---

## 🔗 Live Demo Presentation Link

> [!TIP]
> **Insert Video URL Here:** [Watch the System Walkthrough & Live Demo](https://youtube.com/your-demo-link)

---

## 📺 Presentation Walkthrough Outline

The video demonstration covers the following technical highlights of the system:

1. **Dashboard Interface Walkthrough (0:00 - 1:30)**
   * Live 3-day AQI prediction cards for Islamabad.
   * Visual risk category indicators (Good, Moderate, Unhealthy, etc.).
   * Switchable model comparisons (horizon-specific champions vs. individual algorithms).

2. **Backend API Integration (1:30 - 3:00)**
   * Deployed FastAPI Swagger UI (`/docs`).
   * `/predict` payload query and real-time response.
   * `/metrics/latest` leaderboards showing Ridge, Random Forest, GBDT, and MLP metrics.
   * Ingestion quality audit reports via `/quality`.

3. **Cloud Feature Store & Model Registry (3:00 - 4:15)**
   * Inspection of MongoDB Atlas collections.
   * Ingested pollutant rows showing uniqueness indexes.
   * Registered champion weights saved inside MongoDB GridFS (`fs.files` and `fs.chunks`).

4. **CI/CD Automation (4:15 - end)**
   * Review of hourly feature workflows on GitHub Actions.
   * Review of daily retraining pipeline workflows on GitHub Actions.
   * Demonstration of manual pipeline execution/backfill recovery.
