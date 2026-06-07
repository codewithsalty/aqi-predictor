import Link from "next/link";
import { API_BASE } from "../lib/format";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Air Quality Platform</p>
        <h2>Pearls AQI Predictor</h2>
        <p>
          Developed by Salman Khan as a cloud-backed data science platform with automated pipelines,
          model registry, explainability evidence, and a deployed prediction API.
        </p>
      </div>
      <div className="footer-links">
        <Link href="/dashboard">Live dashboard</Link>
        <Link href="/methodology">Methodology</Link>
        <Link href="/about">About</Link>
        <a href={`${API_BASE}/health`} target="_blank" rel="noreferrer">Backend health</a>
      </div>
    </footer>
  );
}
