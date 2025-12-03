"use client";

import Link from "next/link";
import { Instagram, Phone, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();

  // Hide footer on contact page since it already has contact info
  if (pathname === "/contact") {
    return null;
  }

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3  mt-10 md:mt-5">

        {/* Phone - Whatsapp Section */}
        <Link
          href="https://wa.me/393451575507"
          className="group py-10 md:py-4 flex flex-col items-center justify-center gap-3 text-center cursor-pointer"
        >
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunset-sky/10 text-sunset-sky group-hover:scale-110 transition-transform">
            <Phone size={20} />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Phone - Whatsapp</h3>
            <span className="block text-lg font-semibold text-white transition-colors group-hover:text-sunset-sky">
              +39 345 157 5507
            </span>
          </div>
        </Link>

        {/* Email Section */}
        <a
          href="mailto:giovanni.fantoni.1997@gmail.com"
          className="group py-10 md:py-4 flex flex-col items-center justify-center gap-3 text-center cursor-pointer"
        >
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunset-amber/10 text-sunset-amber group-hover:scale-110 transition-transform">
            <Mail size={20} />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Email</h3>
            <span className="block text-lg font-semibold text-white transition-colors group-hover:text-sunset-amber">
              giovanni.fantoni.1997@gmail.com
            </span>
          </div>
        </a>

        {/* Connect Section */}
        <Link
          href="https://instagram.com/gio.fanto"
          target="_blank"
          rel="noreferrer"
          className="group py-10 md:py-4 flex flex-col items-center justify-center gap-3 text-center cursor-pointer"
        >
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunset-violet/10 text-sunset-violet group-hover:scale-110 transition-transform">
            <Instagram size={20} />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Connect</h3>
            <span className="block text-lg font-semibold text-white transition-colors group-hover:text-sunset-violet">
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
}
