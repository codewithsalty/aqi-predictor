"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Prediction = { date: string; aqi: number; risk: string };
type PredictResponse = {
  city: string;
  generated_at: string;
  model: Record<string, string>;
  predictions: Prediction[];
};
type MetricRow = { model: string; rmse: number; mae: number; r2: number };
type MetricsResponse = {
  city: string;
  evaluated_at: string;
  metrics: Record<string, MetricRow[]>;
};
type PipelineRun = {
  pipeline_name: string;
  status: string;
  run_at: string;
  details?: Record<string, unknown>;
};
type PipelineResponse = {
  recent_runs: PipelineRun[];
  github_actions?: { name: string; status: string; conclusion: string; html_url: string }[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

function riskTone(risk: string): "good" | "warning" | "danger" {
  if (risk.includes("Hazardous") || risk.includes("Very")) return "danger";
  if (risk.includes("Unhealthy") || risk.includes("Moderate")) return "warning";
  return "good";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

function formatDateTime(value?: string) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function HomePage() {
  const [forecast, setForecast] = useState<PredictResponse | null>(null);
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [pipeline, setPipeline] = useState<PipelineResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [predictionRes, metricsRes] = await Promise.all([
          fetch(`${API_BASE}/predict`, { cache: "no-store" }),
          fetch(`${API_BASE}/metrics/latest`, { cache: "no-store" }),
        ]);
        const predictionJson = await predictionRes.json();
        const metricsJson = await metricsRes.json();
        if (!predictionRes.ok) throw new Error(predictionJson.detail || "Prediction endpoint failed");
        if (!metricsRes.ok) throw new Error(metricsJson.detail || "Metrics endpoint failed");
        setForecast(predictionJson);
        setMetrics(metricsJson);
        try {
          const pipelineRes = await fetch(`${API_BASE}/pipeline/health`, { cache: "no-store" });
          if (pipelineRes.ok) setPipeline(await pipelineRes.json());
        } catch {
          setPipeline({ recent_runs: [] });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Dashboard failed to load");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const latestAqi = forecast?.predictions[0]?.aqi;
  const worstRisk = useMemo(() => {
    const risks = forecast?.predictions.map((item) => item.risk) || [];
    return risks.find((risk) => risk.includes("Hazardous") || risk.includes("Very")) || risks[0] || "Pending";
  }, [forecast]);
  const champions = forecast?.model || {};
  const recentRuns = pipeline?.recent_runs?.slice(0, 5) || [];

  return (
    <main className="dashboard-shell">
      <section className="top-band">
        <div>
          <p className="eyebrow">Islamabad AQI Operations</p>
          <h1>Pearls AQI Predictor</h1>
          <p className="lede">
            3-day AQI forecast, model registry, and pipeline health backed by MongoDB Atlas.
          </p>
        </div>
        <div className="status-panel">
          <span className={`status-dot ${error ? "danger" : "good"}`} />
          <div>
            <p className="panel-label">System status</p>
            <strong>{error ? "Needs attention" : loading ? "Loading" : "Operational"}</strong>
          </div>
        </div>
      </section>

      {error && <section className="alert-panel">{error}</section>}

      <section className="summary-grid">
        <article className="metric-card">
          <p className="panel-label">City</p>
          <strong>{forecast?.city || "Islamabad"}</strong>
          <span>Single-city submission scope</span>
        </article>
        <article className="metric-card">
          <p className="panel-label">Next-day AQI</p>
          <strong>{latestAqi ? latestAqi.toFixed(1) : "--"}</strong>
          <span className={`pill ${riskTone(worstRisk)}`}>{worstRisk}</span>
        </article>
        <article className="metric-card">
          <p className="panel-label">Model freshness</p>
          <strong>{formatDateTime(forecast?.generated_at)}</strong>
          <span>Latest inference run</span>
        </article>
        <article className="metric-card">
          <p className="panel-label">Latest training</p>
          <strong>{formatDateTime(metrics?.evaluated_at)}</strong>
          <span>Champion models updated</span>
        </article>
      </section>

      <section className="forecast-grid">
        {(forecast?.predictions || [1, 2, 3].map((day) => ({ date: "", aqi: 0, risk: `Day ${day}` }))).map(
          (item, index) => (
            <article className="forecast-card" key={`${item.date}-${index}`}>
              <p className="panel-label">Day +{index + 1}</p>
              <h2>{item.date ? formatDate(item.date) : "Pending"}</h2>
              <div className="aqi-row">
                <strong>{item.aqi ? item.aqi.toFixed(1) : "--"}</strong>
                <span className={`pill ${riskTone(item.risk)}`}>{item.risk}</span>
              </div>
              <p>Champion: {champions[`day_${index + 1}`] || "--"}</p>
            </article>
          )
        )}
      </section>

      <section className="content-grid">
        <article className="chart-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Forecast Trend</p>
              <h2>Next 72 hours</h2>
            </div>
            <span className="pill neutral">US AQI</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={forecast?.predictions || []} margin={{ top: 16, right: 22, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d7dee8" />
              <XAxis dataKey="date" tickFormatter={formatDate} stroke="#667085" />
              <YAxis stroke="#667085" width={42} />
              <Tooltip
                formatter={(value: number) => [Number(value).toFixed(1), "AQI"]}
                labelFormatter={(label) => formatDate(String(label))}
              />
              <Line type="monotone" dataKey="aqi" stroke="#0e7c7b" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <article className="health-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Pipeline Health</p>
              <h2>Latest runs</h2>
            </div>
            <span className="pill good">Green</span>
          </div>
          <div className="run-list">
            {recentRuns.map((run, index) => (
              <div className="run-row" key={`${run.pipeline_name}-${run.run_at}-${index}`}>
                <span className={`status-dot ${run.status === "success" ? "good" : "warning"}`} />
                <div>
                  <strong>{run.pipeline_name.replaceAll("_", " ")}</strong>
                  <p>{formatDateTime(run.run_at)}</p>
                </div>
                <span>{run.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
