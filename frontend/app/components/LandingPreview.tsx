"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PredictResponse } from "../lib/types";
import { fetchJson } from "../lib/api";
import { formatDate, modelLabel, riskTone } from "../lib/format";

export function LandingPreview() {
  const [forecast, setForecast] = useState<PredictResponse | null>(null);
  const [status, setStatus] = useState("Loading live forecast from the deployed API...");

  useEffect(() => {
    let active = true;
    fetchJson<PredictResponse>("/predict")
      .then((payload) => {
        if (active) {
          setForecast(payload);
          setStatus("Live forecast synced from MongoDB Atlas and Render API");
        }
      })
      .catch((error) => {
        if (active) setStatus(error instanceof Error ? error.message : "Prediction service is waking up");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="landing-preview-card">
      <div className="preview-header">
        <div>
          <p className="eyebrow">Live preview</p>
          <h2>3-day Islamabad AQI forecast</h2>
        </div>
        <span className={`status-chip ${forecast ? "good" : "warning"}`}>{forecast ? "Online" : "Waking"}</span>
      </div>
      <p className="muted-copy">{status}</p>
      <div className="mini-forecast-grid">
        {(forecast?.predictions || [1, 2, 3].map((day) => ({ date: "", aqi: 0, risk: `Day ${day}` }))).map((item, index) => (
          <article key={`${item.date}-${index}`} className="mini-forecast-card">
            <span className={`pill ${riskTone(item.risk)}`}>{item.risk}</span>
            <strong>{item.aqi ? item.aqi.toFixed(0) : "--"}</strong>
            <p>{item.date ? formatDate(item.date) : `Day +${index + 1}`}</p>
            <small>{modelLabel(forecast?.model?.[`day_${index + 1}`] || "--")}</small>
          </article>
        ))}
      </div>
      <Link className="text-link" href="/dashboard">Open full analytics dashboard</Link>
    </div>
  );
}
