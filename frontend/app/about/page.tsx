import Link from "next/link";

const skills = [
  "Python", "Scikit-learn", "FastAPI", "MongoDB Atlas", "GitHub Actions", "Next.js", "Model Registry", "EDA", "SHAP-ready reporting", "Project management",
];

const highlights = [
  "Converted an internship brief into a working cloud-backed ML product.",
  "Built automated feature and training workflows with evaluator-visible evidence.",
  "Designed a polished frontend so non-technical reviewers can understand model behavior quickly.",
  "Documented the system clearly for viva, report writing, and final submission.",
];

export default function AboutPage() {
  return (
    <main className="page-shell content-page">
      <section className="creator-hero">
        <div className="creator-card hero-creator-card">
          <div className="creator-avatar" aria-hidden="true">SK</div>
          <p className="eyebrow">Built by</p>
          <h1>Salman Khan</h1>
          <p>
            Data Sciences intern focused on turning machine-learning ideas into useful, understandable,
            and demo-ready products. This AQI system is designed to show both technical depth and product thinking.
          </p>
          <div className="hero-actions compact-actions">
            <Link href="/dashboard">View project dashboard</Link>
            <a href="https://github.com/codewithsalty/aqi-predictor" target="_blank" rel="noreferrer">GitHub repository</a>
          </div>
        </div>
        <div className="creator-story-panel">
          <p className="eyebrow">Project stance</p>
          <h2>Competing with quality, not noise.</h2>
          <p>
            The goal was not only to satisfy the rubric. The goal was to make the project easy to inspect:
            green automation, clear metrics, live predictions, a deployed backend, and a frontend that explains the system like a data analyst would.
          </p>
          <div className="signature-line">Islamabad AQI Forecast Lab</div>
        </div>
      </section>

      <section className="creator-grid">
        <article className="method-card">
          <p className="eyebrow">What I built</p>
          <h2>End-to-end ML system</h2>
          <ul className="clean-list">
            {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </article>
        <article className="method-card">
          <p className="eyebrow">Skills shown</p>
          <h2>Technical stack</h2>
          <div className="skill-cloud">
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </article>
      </section>

      <section className="cta-band personal-cta">
        <div>
          <p className="eyebrow">For evaluators and visitors</p>
          <h2>Start with the dashboard, then inspect methodology for the full engineering story.</h2>
        </div>
        <Link href="/methodology">Read methodology</Link>
      </section>
    </main>
  );
}
