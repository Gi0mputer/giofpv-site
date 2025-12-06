"use client";

// #region Imports
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// #endregion

// #region Configuration
const navLinks = [
  { href: "/work", label: "Work", color: "text-sunset-amber" },
  { href: "/about", label: "About", color: "text-sunset-sky" },
  { href: "/contact", label: "Contact", color: "text-sunset-orange" },
];
// #endregion

// #region Component
export function SiteHeader() {
  // #region Logic
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // #endregion

  // #region Render
  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 bg-neutral-950/90 backdrop-blur`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3 sm:gap-4">
        {/* LOGO */}
        <Link
          href="/work"
          className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-semibold tracking-wide uppercase text-white"
        >
          <Image
            src="/favicon-48x48.png"
            alt="GioFPV logo"
            width={22}
            height={22}
            className="h-9 w-9"
          />
          <span>Gio<span className="bg-gradient-logo bg-clip-text text-transparent">FPV</span></span>
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-2.5 sm:gap-5 md:gap-6 text-sm sm:text-base md:text-lg">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 px-1 transition ${isActive
                  ? link.color
                  : `text-neutral-500 ${link.color.replace('text-', 'hover:text-')}`
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
  // #endregion
}
// #endregion
