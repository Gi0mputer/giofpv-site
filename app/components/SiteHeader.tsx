"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/gear", label: "Gear" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 bg-neutral-950/90 backdrop-blur`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          href="/work"
          className="flex flex-1 items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase text-white"
        >
          <Image
            src="/icon.png"
            alt="GioFPV logo"
            width={24}
            height={24}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span>GioFPV</span>
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-6 text-sm text-neutral-300">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-white ${isActive ? "text-white" : "text-neutral-400"
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
