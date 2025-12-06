// app/layout.tsx
// #region Imports
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";
// #endregion

// #region Config & Metadata
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://giofpv.com"),
  title: "GioFPV • Aerial Shots",
  description:
    "Riprese aeree FPV e stabilizzate in 4K per eventi, turismo e immobili.",
  openGraph: {
    title: "GioFPV • Aerial Shots",
    description:
      "Riprese aeree FPV e stabilizzate in 4K. Verona, Italia — video per eventi, turismo, sport e immobili.",
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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32x32.png",
  },
};
// #endregion

// #region Layout Component
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
// #endregion
