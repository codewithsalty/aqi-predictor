"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
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
  selection_mode: string;
  model: Record<string, string>;
  available_models?: string[];
  supports_model_override?: boolean;
  predictions: Prediction[];
};
type MetricRow = { model: string; rmse: number; mae: number; r2: number };
type OverallRow = {
  model: string;
  composite_rank_score: number;
  avg_rmse: number;
  avg_mae: number;
  avg_r2: number;
};
type MetricsResponse = {
  city: string;
  evaluated_at: string;
  metrics: Record<string, MetricRow[]>;
  overall_winner?: OverallRow;
  overall_leaderboard?: OverallRow[];
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
type RegistryResponse = {
  city: string;
  registered_at: string;
  champion_model: Record<string, string>;
  available_models: string[];
  supports_model_override?: boolean;
  overall_winner?: OverallRow;
  overall_leaderboard?: OverallRow[];
  feature_columns: string[];
  gridfs_model_id?: string;
  metrics: Record<string, MetricRow[]>;
};
type QualityResponse = {
  city: string;
  audited_at: string;
  row_count: number;
  duplicate_rows: number;
  aqi_out_of_range_rows: number;
  leakage_risk_hint: boolean;
  status: string;
  daily_training_rows?: number;
};

type Horizon = "day_1" | "day_2" | "day_3";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
const HORIZONS: Horizon[] = ["day_1", "day_2", "day_3"];

function riskTone(risk: string): "good" | "warning" | "danger" {
  if (risk.includes("Hazardous") || risk.includes("Very")) return "danger";
  if (risk.includes("Unhealthy") || risk.includes("Moderate")) return "warning";
  return "good";
}

function formatDate(value: string) {
  if (!value) return "Pending";
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

function horizonLabel(horizon: string) {
  return horizon.replace("day_", "Day +");
}

function modelLabel(model: string) {
  if (model === "champion") return "Horizon champions";
  return model.replaceAll("_", " ");
}

function formatNumber(value?: number, digits = 2) {
  if (value === undefined || Number.isNaN(value)) return "--";
  return value.toFixed(digits);
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export default function HomePage() {
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

  const modelOptions = useMemo(() => {
    return ["champion", ...unique([...(registry?.available_models || []), ...(forecast?.available_models || [])])];
  }, [forecast, registry]);

  const latestAqi = forecast?.predictions[0]?.aqi;
  const worstRisk = useMemo(() => {
    const risks = forecast?.predictions.map((item) => item.risk) || [];
    return risks.find((risk) => risk.includes("Hazardous") || risk.includes("Very")) || risks[0] || "Pending";
  }, [forecast]);
  const champions = forecast?.model || registry?.champion_model || {};
  const recentRuns = pipeline?.recent_runs?.slice(0, 6) || [];
  const horizonRows = metrics?.metrics?.[selectedHorizon] || [];
  const overallRows = registry?.overall_leaderboard || metrics?.overall_leaderboard || [];
  const winner = registry?.overall_winner || metrics?.overall_winner || overallRows[0];
  const featureColumns = registry?.feature_columns || [];
  const chartData = forecast?.predictions.map((item, index) => ({ ...item, label: `Day +${index + 1}` })) || [];
  const healthGreen = !error && recentRuns.every((run) => run.status === "success");

  return (
    <main className="dashboard-shell">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Islamabad AQI command center</p>
          <h1>Forecast, inspect, and defend the full ML pipeline.</h1>
          <p className="lede">
            Live 72-hour AQI predictions from MongoDB Atlas model registry, backed by hourly feature ingestion,
            daily training, metric-based model selection, and operational health evidence.
          </p>
          <div className="hero-actions">
            <a href={`${API_BASE}/predict`} target="_blank" rel="noreferrer">Open live API</a>
            <a href="https://github.com/codewithsalty/aqi-predictor/actions" target="_blank" rel="noreferrer">View Actions</a>
          </div>
        </div>
        <div className="control-card">
          <p className="panel-label">Prediction mode</p>
          <label htmlFor="model-select">Model to use</label>
          <select id="model-select" value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}>
            {modelOptions.map((model) => (
              <option value={model} key={model}>{modelLabel(model)}</option>
            ))}
          </select>
          <p>
            {!registry?.supports_model_override
              ? "Model override unlocks after the next training run stores every trained model in GridFS."
              : selectedModel === "champion"
              ? "Uses the best model separately for Day +1, Day +2, and Day +3."
              : `Forces ${modelLabel(selectedModel)} across all three horizons for comparison.`}
          </p>
          <div className="status-panel compact">
            <span className={`status-dot ${error ? "danger" : loading ? "warning" : "good"}`} />
            <div>
              <p className="panel-label">System status</p>
              <strong>{error ? "Needs attention" : loading ? "Refreshing" : "Operational"}</strong>
            </div>
          </div>
        </div>
      </section>

      {error && <section className="alert-panel">{error}</section>}

      <section className="summary-grid">
        <article className="metric-card accent-teal">
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
          <p className="panel-label">Overall winner</p>
          <strong>{winner ? modelLabel(winner.model) : "Pending"}</strong>
          <span>Composite rank across horizons</span>
        </article>
        <article className="metric-card">
          <p className="panel-label">Latest training</p>
          <strong>{formatDateTime(metrics?.evaluated_at)}</strong>
          <span>Model registry refreshed</span>
        </article>
      </section>

      <section className="forecast-grid">
        {(forecast?.predictions || [1, 2, 3].map((day) => ({ date: "", aqi: 0, risk: `Day ${day}` }))).map(
          (item, index) => (
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
          )
        )}
      </section>

      <section className="main-grid">
        <article className="panel chart-panel wide-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Forecast trend</p>
              <h2>Next 72 hours</h2>
            </div>
            <span className="pill neutral">{forecast?.selection_mode?.replaceAll("_", " ") || "loading"}</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 16, right: 22, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d4dce7" />
              <XAxis dataKey="label" stroke="#657386" />
              <YAxis stroke="#657386" width={44} />
              <Tooltip formatter={(value: number) => [Number(value).toFixed(1), "AQI"]} />
              <Line type="monotone" dataKey="aqi" stroke="#0f766e" strokeWidth={4} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Model registry</p>
              <h2>Champion map</h2>
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
          <div className="micro-copy">
            <p>Registry ID</p>
            <strong>{registry?.gridfs_model_id || "Loading"}</strong>
          </div>
        </article>
      </section>

      <section className="main-grid">
        <article className="panel wide-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Metrics leaderboard</p>
              <h2>Daily model comparison</h2>
            </div>
            <div className="segmented-control">
              {HORIZONS.map((horizon) => (
                <button
                  key={horizon}
                  className={selectedHorizon === horizon ? "active" : ""}
                  onClick={() => setSelectedHorizon(horizon)}
                >
                  {horizonLabel(horizon)}
                </button>
              ))}
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Model</th>
                  <th>RMSE</th>
                  <th>MAE</th>
                  <th>R2</th>
                </tr>
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
              <h2>Composite winner</h2>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={overallRows} margin={{ top: 12, right: 12, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d4dce7" />
              <XAxis dataKey="model" tickFormatter={modelLabel} stroke="#657386" />
              <YAxis stroke="#657386" />
              <Tooltip formatter={(value: number) => [Number(value).toFixed(2), "Avg RMSE"]} />
              <Bar dataKey="avg_rmse" fill="#d97706" radius={[7, 7, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </section>

      <section className="main-grid bottom-grid">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Pipeline health</p>
              <h2>Latest runs</h2>
            </div>
            <span className={`pill ${healthGreen ? "good" : "warning"}`}>{healthGreen ? "Green" : "Review"}</span>
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

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Feature store</p>
              <h2>Training columns</h2>
            </div>
            <span className="pill neutral">{featureColumns.length} features</span>
          </div>
          <div className="feature-cloud">
            {featureColumns.map((feature) => <span key={feature}>{feature}</span>)}
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Data quality</p>
              <h2>Audit status</h2>
            </div>
            <span className={`pill ${quality?.status === "pass" ? "good" : "warning"}`}>{quality?.status || "Loading"}</span>
          </div>
          <div className="quality-grid">
            <div><span>Rows</span><strong>{quality?.row_count ?? "--"}</strong></div>
            <div><span>Duplicates</span><strong>{quality?.duplicate_rows ?? "--"}</strong></div>
            <div><span>Out of range</span><strong>{quality?.aqi_out_of_range_rows ?? "--"}</strong></div>
            <div><span>Leakage risk</span><strong>{quality?.leakage_risk_hint ? "Review" : "No"}</strong></div>
          </div>
        </article>
      </section>
    </main>
  );
}
