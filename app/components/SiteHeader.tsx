"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/gear", label: "Gear" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/work" className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase">
          <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden />
          <span>GioFPV</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-neutral-300">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-white ${
                  isActive ? "text-white" : "text-neutral-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
