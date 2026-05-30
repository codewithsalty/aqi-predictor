"use client";

import { useEffect, useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Prediction = { date: string; aqi: number; risk: string };
type PredictResponse = {
  city: string;
  generated_at: string;
  model: string;
  predictions: Prediction[];
};

type PipelineRun = { pipeline_name: string; status: string; run_at: string };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

function riskClass(risk: string): string {
  if (risk.includes("Hazardous") || risk.includes("Very")) return "badge danger";
  if (risk.includes("Unhealthy") || risk.includes("Moderate")) return "badge warning";
  return "badge ok";
}

export default function HomePage() {
  const [predict, setPredict] = useState<PredictResponse | null>(null);
  const [runs, setRuns] = useState<PipelineRun[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const predRes = await fetch(`${API_BASE}/predict`);
        const predJson = await predRes.json();
        if (!predRes.ok) throw new Error(predJson.detail || "Prediction failed");
        setPredict(predJson);

        const pipeRes = await fetch(`${API_BASE}/pipeline/health`);
        const pipeJson = await pipeRes.json();
        setRuns(pipeJson.recent_runs || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load dashboard");
      }
    };
    load();
  }, []);

  const hasHazard = useMemo(
    () => (predict?.predictions || []).some((p) => p.risk.includes("Hazardous")),
    [predict]
  );

  return (
    <main className="container">
      <section className="hero">
        <h1 style={{ margin: 0 }}>Pearls AQI Predictor</h1>
        <p style={{ marginTop: 8 }}>
          Premium 3-day forecast view for <strong>{predict?.city || "your city"}</strong>.
        </p>
        {hasHazard && <span className="badge danger">Hazard Alert Active</span>}
      </section>

      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

      <section className="grid">
        {(predict?.predictions || []).map((p) => (
          <article className="card" key={p.date}>
            <h3 style={{ marginTop: 0 }}>{p.date}</h3>
            <p style={{ fontSize: 32, margin: "8px 0" }}>{p.aqi.toFixed(1)}</p>
            <span className={riskClass(p.risk)}>{p.risk}</span>
          </article>
        ))}
      </section>

      <section className="card" style={{ marginTop: 18, height: 300 }}>
        <h3 style={{ marginTop: 0 }}>Forecast Trend</h3>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={predict?.predictions || []}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="aqi" stroke="#0f766e" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h3 style={{ marginTop: 0 }}>Pipeline Health</h3>
        <ul>
          {runs.slice(0, 5).map((run, idx) => (
            <li key={idx}>
              {run.pipeline_name} - {run.status} - {new Date(run.run_at).toLocaleString()}
            </li>
          ))}
        </ul>
        {predict && <p>Model freshness: {new Date(predict.generated_at).toLocaleString()}</p>}
      </section>
    </main>
  );
}
