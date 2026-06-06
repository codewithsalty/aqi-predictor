import Link from "next/link";
import { LandingPreview } from "./components/LandingPreview";
import { API_BASE } from "./lib/format";

const proofCards = [
  { value: "Hourly", label: "Feature ingestion", detail: "GitHub Actions collects and stores fresh city features automatically." },
  { value: "Daily", label: "Model training", detail: "The pipeline retrains several models and registers the best candidates." },
  { value: "3 days", label: "Forecast horizon", detail: "The dashboard serves Day +1, Day +2, and Day +3 AQI predictions." },
  { value: "Cloud", label: "Feature + model store", detail: "MongoDB Atlas stores features, metrics, registry records, and artifacts." },
];

const architectureCards = [
  { title: "Feature Store", text: "Weather, pollutant, lag, rolling, and time features are written to MongoDB Atlas with quality checks." },
  { title: "Model Registry", text: "Ridge, Random Forest, Gradient Boosting, and MLP models compete using RMSE, MAE, and R2." },
  { title: "Prediction API", text: "A deployed FastAPI backend loads the latest registry artifact and returns clean 72-hour predictions." },
  { title: "Visual Product", text: "The frontend turns the ML pipeline into a decision-ready experience for evaluators and users." },
];

const productFeatures = [
  { title: "Live city forecast", text: "Shows the next three AQI days for Islamabad with clean risk labels and forecast trend visuals." },
  { title: "Model comparison", text: "Lets reviewers switch between horizon champions and individual trained models for fair comparison." },
  { title: "Pipeline evidence", text: "Surfaces automation health, registry freshness, feature columns, and data quality checks in one place." },
];

const resumePoints = [
  "Built a full-stack machine-learning product from live environmental data.",
  "Automated ingestion, training, model registration, and dashboard delivery.",
  "Designed the app so technical and non-technical reviewers can both understand it fast.",
];

export default function HomePage() {
  return (
    <main className="page-shell landing-page">
      <section className="landing-hero">
        <div className="hero-panel reveal-card">
          <div className="hero-badge-row">
            <span className="status-chip good">Islamabad live system</span>
            <span className="status-chip neutral">Internship submission ready</span>
          </div>
          <p className="eyebrow">Pearls AQI Predictor</p>
          <h1>Air quality forecasting, explained like an intelligent control room.</h1>
          <p className="hero-lede">
            A complete AQI forecasting application for Islamabad that combines automated feature ingestion,
            daily model training, cloud model registry, and a polished analytics dashboard for the next 3 days.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard">Explore dashboard</Link>
            <a href={`${API_BASE}/health`} target="_blank" rel="noreferrer">Open backend</a>
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

      <section className="product-ribbon">
        <span>Live AQI intelligence</span>
        <span>Automated training</span>
        <span>Cloud model registry</span>
        <span>Resume-ready case study</span>
      </section>

      <section className="proof-strip">
        {proofCards.map((card, index) => (
          <article className="proof-card reveal-card" style={{ animationDelay: `${index * 90}ms` }} key={card.label}>
            <strong>{card.value}</strong>
            <span>{card.label}</span>
            <p>{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="split-section">
        <div className="section-kicker">
          <p className="eyebrow">Why this matters</p>
          <h2>Not just a notebook. A working ML product.</h2>
          <p>
            Evaluators can see the full loop: data enters the cloud store, models train automatically,
            predictions are served by an API, and the frontend explains the result without exposing fragile internals.
          </p>
        </div>
        <LandingPreview />
      </section>

      <section className="product-showcase">
        <div className="section-kicker">
          <p className="eyebrow">Product experience</p>
          <h2>Built so the project can be opened, understood, and trusted.</h2>
          <p>
            The app is designed like a small analytics product: it has a landing page, live dashboard,
            methodology, creator profile, API evidence, and deployment-ready configuration.
          </p>
        </div>
        <div className="product-feature-grid">
          {productFeatures.map((feature) => (
            <article className="product-feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-section">
        <div className="section-kicker centered">
          <p className="eyebrow">System map</p>
          <h2>Four connected layers that make the project defensible.</h2>
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

      <section className="resume-section">
        <article className="resume-panel">
          <p className="eyebrow">Resume story</p>
          <h2>A project that shows engineering, data science, and product sense.</h2>
          <ul className="clean-list">
            {resumePoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </article>
        <article className="deployment-panel">
          <p className="eyebrow">Deployment path</p>
          <h2>GitHub to Vercel</h2>
          <p>
            Import the repository into Vercel, set the root directory to <strong>frontend</strong>,
            and add <strong>NEXT_PUBLIC_API_BASE_URL</strong> with the Render backend URL.
          </p>
          <Link href="/methodology">Check the full workflow</Link>
        </article>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Ready for review</p>
          <h2>View predictions, compare models, and inspect pipeline evidence.</h2>
        </div>
        <Link href="/dashboard">Launch the live dashboard</Link>
      </section>
    </main>
  );
}
