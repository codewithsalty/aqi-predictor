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
          <h1>Salman Khan</h1>
          <p>
            AI Engineer &amp; Full Stack Developer. Focused on turning machine-learning pipelines 
            into scalable, production-grade, and decision-ready software applications.
          </p>
          <div className="hero-actions compact-actions">
            <a href="https://linkedin.com/in/s4lmankhan" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/s4lmankhan" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        {/* Project Description Panel */}
        <div className="creator-story-panel">
          <p className="eyebrow">Project Overview</p>
          <h2>Pearls AQI Predictor</h2>
          <p>
            Pearls AQI is a production-grade air quality forecasting system for Islamabad.
            It acts as an automated, self-healing pipeline that runs continuously.
            Rather than relying on static datasets, it collects live meteorological and pollutant readings,
            trains four machine-learning models daily, registers the top-performing candidate,
            and serves real-time predictions via a robust API.
          </p>
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
