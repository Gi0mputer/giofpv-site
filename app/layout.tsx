// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://giofpv.com"),
  title: "GioFPV • FPV Drone & Aerial Shots",
  description:
    "GioFPV — riprese FPV e drone per brand, turismo, sport ed eventi. Aerial shots, long-range, indoor e automotive. Verona, Italia — contattami per un preventivo.",
  openGraph: {
    title: "GioFPV • FPV Drone & Aerial Shots",
    description:
      "Riprese FPV e drone per brand, turismo, sport ed eventi. Verona, Italia — portfolio e contatti su giofpv.com.",
    url: "https://giofpv.com",
    siteName: "GioFPV",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "GioFPV — FPV Drone & Aerial Shots",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GioFPV • FPV Drone & Aerial Shots",
    description:
      "Riprese FPV e drone per brand, turismo, sport ed eventi. Verona, Italia.",
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
