import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "AQI Predictor Dashboard",
  description: "3-day AQI forecast dashboard"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
