// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://giofpv.com"),
  title: "GioFPV • Aerial Shots",
  description:
    "Riprese aeree 4K cinematografiche e adrenaliniche con droni FPV e stabilizzati per eventi, turismo, sport e valorizzazione immobiliare.",
  openGraph: {
    title: "GioFPV • Aerial Shots",
    description:
      "Riprese aeree 4K, cinematografiche e adrenaliniche con droni FPV e stabilizzati. Verona, Italia — video per eventi, turismo, sport e immobili.",
    url: "https://giofpv.com",
    siteName: "GioFPV",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GioFPV — Riprese aeree 4K cinematografiche e adrenaliniche",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className + " bg-neutral-950 text-neutral-100 antialiased"}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
