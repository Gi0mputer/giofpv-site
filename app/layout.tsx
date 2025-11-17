// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://giofpv.com"),
  title: "GIOFPV — Cinematic FPV & Aerial | Verona, Italy",
  description:
    "Portfolio FPV e riprese cinematografiche. Long-range, indoor, automotive, turismo. Operazioni EASA/assicurate. Contattami per un preventivo.",
  openGraph: {
    title: "GIOFPV — Cinematic FPV & Aerial",
    description:
      "Riprese FPV professionali per brand, sport, turismo e film. Verona • Italy • EU",
    url: "https://giofpv.com",
    siteName: "GIOFPV",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "GIOFPV" }],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GIOFPV — Cinematic FPV & Aerial",
    description: "Riprese FPV professionali per brand, sport, turismo e film.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className + " bg-neutral-950 text-neutral-100 antialiased"}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
