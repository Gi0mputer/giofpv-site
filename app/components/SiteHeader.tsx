"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/work", label: "Work", color: "text-sunset-amber" },
  { href: "/about", label: "About", color: "text-sunset-sky" },
  { href: "/gear", label: "Gear", color: "text-sunset-violet" },
  { href: "/contact", label: "Contact", color: "text-sunset-orange" },
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
          className="flex flex-1 items-center gap-2 text-sm font-semibold tracking-wide uppercase text-white"
        >
          <Image
            src="/icon.png"
            alt="GioFPV logo"
            width={24}
            height={24}
            className="h-10 w-10"
          />
          <span>Gio<span className="bg-clip-text text-transparent bg-gradient-to-r from-sunset-amber via-[#fa991d] via-sunset-orange via-sunset-sky to-sunset-violet">FPV</span></span>
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-6 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${isActive ? link.color : "text-neutral-500 hover:text-white"
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
