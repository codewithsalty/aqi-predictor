import Link from "next/link";
import { LandingPreview } from "./components/LandingPreview";
import { API_BASE } from "./lib/format";

const proofCards = [
  { value: "Hourly", label: "Feature Ingestion", detail: "Automated collection of weather and pollutant data." },
  { value: "Daily", label: "Model Training", detail: "Daily retraining pipeline to find the most accurate models." },
  { value: "3 Days", label: "Forecast Horizon", detail: "Serving Day +1, Day +2, and Day +3 AQI forecasts." },
  { value: "Cloud", label: "Secure Storage", detail: "MongoDB Atlas stores features, metrics, and registered models." },
];

const architectureCards = [
  { title: "Feature Store", text: "Clean hourly weather and pollutant features are validated and stored securely in MongoDB Atlas." },
  { title: "Model Registry", text: "Ridge, Random Forest, Gradient Boosting, and MLP models compete daily. The best performers are registered." },
  { title: "Prediction API", text: "A robust FastAPI backend retrieves the latest registered model artifact and returns 72-hour predictions." },
  { title: "Visual Analytics", text: "A modern analytics interface turns complex model outputs into decision-ready predictions." },
];

export default function HomePage() {
  return (
    <main className="page-shell landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-panel reveal-card">
          <div className="hero-badge-row">
            <span className="status-chip good">Islamabad Live System</span>
            <span className="status-chip neutral">Production Ready</span>
          </div>
          <p className="eyebrow">Pearls AQI Predictor</p>
          <h1>Air quality forecasting, explained like an intelligent control room.</h1>
          <p className="hero-lede">
            An advanced air quality forecasting platform for Islamabad that combines automated feature ingestion,
            daily model retraining, and a cloud model registry to deliver live, 3-day AQI predictions.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard">Explore dashboard</Link>
            <a href={`${API_BASE}/predict`} target="_blank" rel="noreferrer">Open backend API</a>
          </div>
        </div>

        <div className="hero-visual reveal-card delay-1" aria-label="AQI system visual">
          <div className="orbital-system">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="orbit orbit-three" />
            <div className="core-node">
              <strong>AQI</strong>
              <small>72h</small>
            </div>
            <div className="floating-chip chip-a">PM2.5</div>
            <div className="floating-chip chip-b">NO2</div>
            <div className="floating-chip chip-c">Models</div>
          </div>
        </div>
      </section>

      {/* Product Ribbon */}
      <section className="product-ribbon">
        <span>Live AQI Intelligence</span>
        <span>Automated Training</span>
        <span>Cloud Model Registry</span>
        <span>Production-Ready ML Pipeline</span>
      </section>

      {/* Proof Strip */}
      <section className="proof-strip">
        {proofCards.map((card, index) => (
          <article className="proof-card reveal-card" style={{ animationDelay: `${index * 90}ms` }} key={card.label}>
            <strong>{card.value}</strong>
            <span>{card.label}</span>
            <p>{card.detail}</p>
          </article>
        ))}
      </section>

      {/* Split Section / Preview */}
      <section className="split-section">
        <div className="section-kicker">
          <p className="eyebrow">Real-Time Forecast</p>
          <h2>A fully operational machine learning product.</h2>
          <p>
            Observe the entire pipeline: fresh data enters the cloud store, models train and update automatically,
            predictions are served via an API, and the dashboard presents the results with model explanation.
          </p>
        </div>
        <LandingPreview />
      </section>

      {/* System Map / Architecture */}
      <section className="architecture-section">
        <div className="section-kicker centered">
          <p className="eyebrow">System Map</p>
          <h2>Four integrated layers powering the platform.</h2>
        </div>
        <div className="story-grid">
          {architectureCards.map((card, index) => (
            <article className="story-card reveal-card" style={{ animationDelay: `${index * 80}ms` }} key={card.title}>
              <span className="story-number">0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-band">
        <div>
          <p className="eyebrow">Ready for review</p>
          <h2>View live predictions, compare models, and inspect pipeline evidence.</h2>
        </div>
        <Link href="/dashboard">Launch the live dashboard</Link>
      </section>
    </main>
  );
}
