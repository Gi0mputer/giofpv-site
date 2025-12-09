"use client";

// #region Imports
import Link from "next/link";
import { Instagram, Phone, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
// #endregion

// #region Component
export function SiteFooter() {
  const pathname = usePathname();

  // Hide footer on contact page since it already has contact info
  // #region Conditional Logic
  if (pathname === "/contact") {
    return null;
  }
  // #endregion

  // #region Render
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 mt-10 md:mt-5 min-h-[100svh] md:min-h-0 flex-col justify-center gap-0 md:gap-0 divide-y divide-white/10 md:divide-y-0 md:divide-x md:divide-white/10">

        {/* Phone - Whatsapp Section */}
        <Link
          href="https://wa.me/393451575507"
          className="group py-12 md:py-4 flex flex-col items-center justify-center gap-3 text-center cursor-pointer flex-1"
        >
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sunset-sky group-hover:scale-110 transition-transform border border-white/10">
            <Phone size={20} />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Phone</h3>
            <span className="block text-lg font-semibold text-sunset-sky transition-colors">
              +39 345 157 5507
            </span>
          </div>
        </Link>

        {/* Email Section */}
        <a
          href="mailto:giovanni.fantoni.1997@gmail.com"
          className="group py-12 md:py-4 flex flex-col items-center justify-center gap-3 text-center cursor-pointer flex-1"
        >
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sunset-amber group-hover:scale-110 transition-transform border border-white/10">
            <Mail size={20} />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Email</h3>
            <span className="block text-lg font-semibold text-sunset-amber transition-colors">
              giovanni.fantoni.1997@gmail.com
            </span>
          </div>
        </a>

        {/* Connect Section */}
        <Link
          href="https://instagram.com/gio.fanto"
          target="_blank"
          rel="noreferrer"
          className="group py-12 md:py-4 flex flex-col items-center justify-center gap-3 text-center cursor-pointer flex-1"
        >
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-instagram group-hover:scale-110 transition-transform border border-white/10">
            <Instagram size={20} />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Connect</h3>
            <span className="block text-lg font-semibold text-instagram transition-colors">
              @gio.fanto
            </span>
          </div>
        </Link>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 py-4">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-neutral-600 font-light">
          <p>GIOFPV • Verona, Italy • © 2025 Giovanni Fantoni</p>
        </div>
      </div>
    </footer>
  );
  // #endregion
}
// #endregion
