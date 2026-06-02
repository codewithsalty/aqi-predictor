import "./globals.css";
import { ReactNode } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export const metadata = {
  title: "Pearls AQI Predictor | Islamabad Forecast Lab",
  description: "A complete AQI forecasting web application for Islamabad with automated pipelines, model registry, and live 3-day predictions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="ambient-layer" aria-hidden="true" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
