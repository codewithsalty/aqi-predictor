import Link from "next/link";

const projectHighlights = [
  "Hourly live feature collection with duplicate guards and quality audits.",
  "Daily automated retraining and scoring of four distinct ML algorithms.",
  "Secure model artifact registration and versioning in MongoDB GridFS.",
  "Time-series validation split to eliminate data leakage and guarantee temporal honesty.",
];

const techStack = [
  "Python", "Scikit-Learn", "FastAPI", "MongoDB Atlas", "GridFS",
  "GitHub Actions", "Next.js", "TypeScript", "TailwindCSS", "Recharts"
];

export default function AboutPage() {
  return (
    <main className="page-shell content-page">
      <section className="creator-hero">
        {/* Developer Info Card */}
        <div className="creator-card hero-creator-card">
          <div className="creator-avatar" aria-label="Salman Khan">
            <img 
              src="/Salman.png" 
              alt="Salman Khan" 
              style={{ width: "100%", height: "100%", borderRadius: "30px", objectFit: "cover" }} 
            />
          </div>
          <p className="eyebrow">Developed by</p>
          <h1 style={{ whiteSpace: "nowrap" }}>Salman Khan</h1>
          <p>
            <strong style={{ color: "var(--cyan)", display: "block", marginBottom: "8px", fontSize: "1.1rem", fontWeight: 700 }}>AI Engineer &amp; Full Stack Developer</strong>
            Focused on turning machine-learning pipelines into scalable, production-grade, and decision-ready software applications.
          </p>
          <div className="hero-actions compact-actions">
            <a 
              href="https://linkedin.com/in/s4lmankhan" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-linkedin"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
              </svg>
              LinkedIn
            </a>
            <a 
              href="https://github.com/s4lmankhan" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-github"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.5 58.6 27.7 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
              GitHub
            </a>
            <a 
              href="https://linktr.ee/codewithsalty" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-linktree"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                <path d="m13.511 5.853 4.005-4.117 2.325 2.381-4.201 4.319h5.9v3.375h-5.9l4.201 4.319-2.325 2.381-4.005-4.117v7.456H9.49V14.39l-4.003 4.117-2.325-2.381 4.2-4.319H1.46v-3.375h5.9l-4.2-4.319 2.325-2.381 4.003 4.117V.132h4.021v5.721z"></path>
              </svg>
              Linktree
            </a>
          </div>
        </div>

        {/* Project Description Panel */}
        <div className="creator-story-panel">
          <p className="eyebrow">Project Overview</p>
          <h2>Pearls AQI Predictor</h2>
          <p style={{ marginBottom: "20px" }}>
            Pearls AQI is a production-grade air quality forecasting system for Islamabad.
            It acts as an automated, self-healing pipeline that runs continuously.
            Rather than relying on static datasets, it collects live meteorological and pollutant readings,
            trains four machine-learning models daily, registers the top-performing candidate,
            and serves real-time predictions via a robust API.
          </p>
          
          {/* Telemetry Metrics Grid to fill empty space */}
          <div className="telemetry-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            marginBottom: "24px"
          }}>
            <div className="telemetry-box" style={{
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(15, 118, 110, 0.15)",
              borderRadius: "16px",
              padding: "12px 16px"
            }}>
              <span style={{ display: "block", fontSize: "0.68rem", fontWeight: 900, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Inference Latency</span>
              <strong style={{ display: "block", fontSize: "1.1rem", color: "var(--ink-strong)", fontFamily: "'Source Serif 4', serif", marginTop: "4px" }}>&lt; 85ms avg</strong>
            </div>
            <div className="telemetry-box" style={{
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(15, 118, 110, 0.15)",
              borderRadius: "16px",
              padding: "12px 16px"
            }}>
              <span style={{ display: "block", fontSize: "0.68rem", fontWeight: 900, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Ingestion Cycle</span>
              <strong style={{ display: "block", fontSize: "1.1rem", color: "var(--ink-strong)", fontFamily: "'Source Serif 4', serif", marginTop: "4px" }}>Hourly (24/7)</strong>
            </div>
            <div className="telemetry-box" style={{
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(15, 118, 110, 0.15)",
              borderRadius: "16px",
              padding: "12px 16px"
            }}>
              <span style={{ display: "block", fontSize: "0.68rem", fontWeight: 900, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Retraining Cadence</span>
              <strong style={{ display: "block", fontSize: "1.1rem", color: "var(--ink-strong)", fontFamily: "'Source Serif 4', serif", marginTop: "4px" }}>DailyRetrain</strong>
            </div>
            <div className="telemetry-box" style={{
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(15, 118, 110, 0.15)",
              borderRadius: "16px",
              padding: "12px 16px"
            }}>
              <span style={{ display: "block", fontSize: "0.68rem", fontWeight: 900, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Model Repository</span>
              <strong style={{ display: "block", fontSize: "1.1rem", color: "var(--ink-strong)", fontFamily: "'Source Serif 4', serif", marginTop: "4px" }}>MongoDB GridFS</strong>
            </div>
          </div>
          
          <div className="signature-line">Islamabad AQI Forecast Lab</div>
        </div>
      </section>

      {/* Grid of Project Details */}
      <section className="creator-grid">
        <article className="method-card">
          <p className="eyebrow">System Strengths</p>
          <h2>Pipeline Engineering</h2>
          <ul className="clean-list">
            {projectHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>

        <article className="method-card">
          <p className="eyebrow">Stack</p>
          <h2>Technologies Used</h2>
          <div className="skill-cloud">
            {techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </article>
      </section>

      {/* Call to Action Band */}
      <section className="cta-band personal-cta">
        <div>
          <p className="eyebrow">Ready to inspect</p>
          <h2>Explore predictions, check model performance, or analyze data quality live.</h2>
        </div>
        <Link href="/dashboard">Launch Dashboard</Link>
      </section>
    </main>
  );
}
