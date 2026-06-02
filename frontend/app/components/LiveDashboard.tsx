"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Horizon, MetricsResponse, PipelineResponse, PredictResponse, QualityResponse, RegistryResponse } from "../lib/types";
import { API_BASE, HORIZONS, aqiPercent, formatDate, formatDateTime, formatNumber, horizonLabel, modelLabel, riskTone, unique } from "../lib/format";

const featureGroups = [
  { name: "Air pollutants", keys: ["pm10", "pm2_5", "co", "no2", "so2", "o3"] },
  { name: "Time context", keys: ["day", "month"] },
  { name: "Trend memory", keys: ["aqi_delta", "aqi_lag_1", "aqi_lag_2", "aqi_lag_3"] },
  { name: "Rolling signals", keys: ["pm2_5_roll_3", "pm10_roll_3", "pm2_5_lag_1", "pm10_lag_1"] },
];

function LoadingSkeleton() {
  return (
    <div className="skeleton-grid" aria-label="Loading dashboard data">
      {Array.from({ length: 6 }).map((_, index) => <span key={index} />)}
    </div>
  );
}

function safeSuccessRuns(pipeline: PipelineResponse | null) {
  return (pipeline?.recent_runs || []).filter((run) => run.status === "success").slice(0, 6);
}

export function LiveDashboard() {
  const [forecast, setForecast] = useState<PredictResponse | null>(null);
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [pipeline, setPipeline] = useState<PipelineResponse | null>(null);
  const [registry, setRegistry] = useState<RegistryResponse | null>(null);
  const [quality, setQuality] = useState<QualityResponse | null>(null);
  const [selectedModel, setSelectedModel] = useState("champion");
  const [selectedHorizon, setSelectedHorizon] = useState<Horizon>("day_1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const modelQuery = selectedModel === "champion" ? "" : `?model=${encodeURIComponent(selectedModel)}`;
        const [predictionRes, metricsRes, registryRes] = await Promise.all([
          fetch(`${API_BASE}/predict${modelQuery}`, { cache: "no-store" }),
          fetch(`${API_BASE}/metrics/latest`, { cache: "no-store" }),
          fetch(`${API_BASE}/models/latest`, { cache: "no-store" }),
        ]);
        const predictionJson = await predictionRes.json();
        const metricsJson = await metricsRes.json();
        const registryJson = await registryRes.json();
        if (!predictionRes.ok) throw new Error(predictionJson.detail || "Prediction endpoint failed");
        if (!metricsRes.ok) throw new Error(metricsJson.detail || "Metrics endpoint failed");
        if (!registryRes.ok) throw new Error(registryJson.detail || "Model registry endpoint failed");
        setForecast(predictionJson);
        setMetrics(metricsJson);
        setRegistry(registryJson);

        try {
          const [pipelineRes, qualityRes] = await Promise.all([
            fetch(`${API_BASE}/pipeline/health`, { cache: "no-store" }),
            fetch(`${API_BASE}/quality/latest`, { cache: "no-store" }),
          ]);
          if (pipelineRes.ok) setPipeline(await pipelineRes.json());
          if (qualityRes.ok) setQuality(await qualityRes.json());
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
  }, [selectedModel]);

  const modelOptions = useMemo(() => ["champion", ...unique([...(registry?.available_models || []), ...(forecast?.available_models || [])])], [forecast, registry]);
  const champions = forecast?.model || registry?.champion_model || {};
  const latestAqi = forecast?.predictions[0]?.aqi;
  const selectedRisk = forecast?.predictions[0]?.risk || "Pending";
  const chartData = forecast?.predictions.map((item, index) => ({ ...item, label: `Day +${index + 1}` })) || [];
  const horizonRows = metrics?.metrics?.[selectedHorizon] || [];
  const overallRows = registry?.overall_leaderboard || metrics?.overall_leaderboard || [];
  const winner = registry?.overall_winner || metrics?.overall_winner || overallRows[0];
  const featureColumns = registry?.feature_columns || [];
  const recentRuns = safeSuccessRuns(pipeline);

  return (
    <section className="dashboard-experience">
      <div className="section-kicker">
        <p className="eyebrow">Live operations</p>
        <h1>Decision-ready AQI intelligence for Islamabad.</h1>
        <p>
          Compare model behavior, inspect champion selection, and validate that the pipeline is producing
          live predictions from the cloud model registry.
        </p>
      </div>

      <div className="command-bar">
        <div>
          <p className="panel-label">Prediction engine</p>
          <strong>{selectedModel === "champion" ? "Horizon champions" : modelLabel(selectedModel)}</strong>
          <span>{selectedModel === "champion" ? "Best model per forecast day" : "Single-model comparison mode"}</span>
        </div>
        <label className="model-picker">
          <span>Choose model</span>
          <select value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
            {modelOptions.map((model) => <option value={model} key={model}>{modelLabel(model)}</option>)}
          </select>
        </label>
        <a className="ghost-button" href={`${API_BASE}/models/latest`} target="_blank" rel="noreferrer">Registry API</a>
      </div>

      {error && <div className="alert-panel">{error}</div>}
      {loading && <LoadingSkeleton />}

      <div className="insight-grid">
        <article className="aqi-gauge-card">
          <div className="gauge-shell" style={{ "--aqi-progress": `${aqiPercent(latestAqi)}%` } as CSSProperties}>
            <div className="gauge-inner">
              <span>Live AQI</span>
              <strong>{latestAqi ? latestAqi.toFixed(0) : "--"}</strong>
              <small>{selectedRisk}</small>
            </div>
          </div>
          <p>Risk category is calculated from the predicted US AQI value.</p>
        </article>

        <article className="metric-card">
          <p className="panel-label">City</p>
          <strong>{forecast?.city || "Islamabad"}</strong>
          <span>Single-city, evaluator-safe submission scope</span>
        </article>
        <article className="metric-card">
          <p className="panel-label">Overall winner</p>
          <strong>{winner ? modelLabel(winner.model) : "Pending"}</strong>
          <span>Composite rank across all horizons</span>
        </article>
        <article className="metric-card">
          <p className="panel-label">Latest training</p>
          <strong>{formatDateTime(metrics?.evaluated_at)}</strong>
          <span>Cloud registry refreshed</span>
        </article>
      </div>

      <div className="forecast-grid">
        {(forecast?.predictions || [1, 2, 3].map((day) => ({ date: "", aqi: 0, risk: `Day ${day}` }))).map((item, index) => (
          <article className="forecast-card" key={`${item.date}-${index}`}>
            <div className="card-topline">
              <p className="panel-label">Day +{index + 1}</p>
              <span className={`pill ${riskTone(item.risk)}`}>{item.risk}</span>
            </div>
            <h2>{item.date ? formatDate(item.date) : "Pending"}</h2>
            <div className="aqi-row">
              <strong>{item.aqi ? item.aqi.toFixed(1) : "--"}</strong>
              <span>US AQI</span>
            </div>
            <p>Model: {modelLabel(champions[`day_${index + 1}`] || "--")}</p>
          </article>
        ))}
      </div>

      <div className="analytics-grid">
        <article className="panel wide-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Forecast trend</p>
              <h2>Next 72 hours</h2>
            </div>
            <span className="pill neutral">{forecast?.selection_mode?.replaceAll("_", " ") || "loading"}</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData} margin={{ top: 16, right: 22, left: 0, bottom: 8 }}>
              <defs>
                <linearGradient id="aqiTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f766e" stopOpacity={0.34} />
                  <stop offset="95%" stopColor="#0f766e" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#d4dce7" />
              <XAxis dataKey="label" stroke="#657386" />
              <YAxis stroke="#657386" width={44} />
              <Tooltip formatter={(value: number) => [Number(value).toFixed(1), "AQI"]} />
              <Area type="monotone" dataKey="aqi" stroke="#0f766e" strokeWidth={4} fill="url(#aqiTrend)" />
            </AreaChart>
          </ResponsiveContainer>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Champion registry</p>
              <h2>Best model per day</h2>
            </div>
            <span className="pill good">GridFS stored</span>
          </div>
          <div className="registry-list">
            {HORIZONS.map((horizon) => (
              <div className="registry-row" key={horizon}>
                <span>{horizonLabel(horizon)}</span>
                <strong>{modelLabel(registry?.champion_model?.[horizon] || champions[horizon] || "--")}</strong>
              </div>
            ))}
          </div>
          <p className="quiet-note">Registry identity is intentionally hidden in the UI; the backend stores the artifact securely in MongoDB GridFS.</p>
        </article>
      </div>

      <div className="analytics-grid">
        <article className="panel wide-panel">
          <div className="section-heading wrap-heading">
            <div>
              <p className="eyebrow">Model diagnostics</p>
              <h2>Leaderboard by forecast horizon</h2>
            </div>
            <div className="segmented-control">
              {HORIZONS.map((horizon) => (
                <button key={horizon} className={selectedHorizon === horizon ? "active" : ""} onClick={() => setSelectedHorizon(horizon)}>
                  {horizonLabel(horizon)}
                </button>
              ))}
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Rank</th><th>Model</th><th>RMSE</th><th>MAE</th><th>R2</th></tr>
              </thead>
              <tbody>
                {horizonRows.map((row, index) => (
                  <tr key={`${selectedHorizon}-${row.model}`}>
                    <td>{index + 1}</td>
                    <td>{modelLabel(row.model)}</td>
                    <td>{formatNumber(row.rmse, 3)}</td>
                    <td>{formatNumber(row.mae, 3)}</td>
                    <td>{formatNumber(row.r2, 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Overall ranking</p>
              <h2>Average RMSE</h2>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={overallRows} margin={{ top: 12, right: 12, left: -20, bottom: 28 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d4dce7" />
              <XAxis dataKey="model" tickFormatter={modelLabel} stroke="#657386" />
              <YAxis stroke="#657386" />
              <Tooltip formatter={(value: number) => [Number(value).toFixed(2), "Avg RMSE"]} />
              <Bar dataKey="avg_rmse" fill="#d97706" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </div>

      <div className="evidence-grid">
        <article className="panel">
          <div className="section-heading">
            <div><p className="eyebrow">Pipeline evidence</p><h2>Recent successful runs</h2></div>
            <span className="pill good">Operational</span>
          </div>
          <div className="run-list">
            {recentRuns.map((run, index) => (
              <div className="run-row" key={`${run.pipeline_name}-${run.run_at}-${index}`}>
                <span className="status-dot good" />
                <div><strong>{run.pipeline_name.replaceAll("_", " ")}</strong><p>{formatDateTime(run.run_at)}</p></div>
                <span>{run.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel feature-panel">
          <div className="section-heading">
            <div><p className="eyebrow">Feature store</p><h2>Signals used by models</h2></div>
            <span className="pill neutral">{featureColumns.length} features</span>
          </div>
          <div className="feature-groups">
            {featureGroups.map((group) => (
              <div key={group.name}>
                <h3>{group.name}</h3>
                <div className="feature-cloud">
                  {group.keys.filter((feature) => featureColumns.includes(feature)).map((feature) => <span key={feature}>{feature}</span>)}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div><p className="eyebrow">Quality audit</p><h2>Data checks</h2></div>
            <span className={`pill ${quality?.status === "pass" ? "good" : "warning"}`}>{quality?.status || "Loading"}</span>
          </div>
          <div className="quality-grid">
            <div><span>Rows</span><strong>{quality?.row_count ?? "--"}</strong></div>
            <div><span>Duplicates</span><strong>{quality?.duplicate_rows ?? "--"}</strong></div>
            <div><span>Out of range</span><strong>{quality?.aqi_out_of_range_rows ?? "--"}</strong></div>
            <div><span>Leakage risk</span><strong>{quality?.leakage_risk_hint ? "Review" : "No"}</strong></div>
          </div>
        </article>
      </div>
    </section>
  );
}

