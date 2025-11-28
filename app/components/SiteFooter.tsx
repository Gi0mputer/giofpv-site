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
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3">

        {/* Phone - Whatsapp Section */}
        <div className="group py-8 md:py-10 flex flex-col items-center justify-center gap-3 text-center cursor-pointer">
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunset-sky/10 text-sunset-sky group-hover:scale-110 transition-transform">
            <Phone size={20} />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Phone - Whatsapp</h3>
            <Link
              href="https://wa.me/393451575507"
              className="block text-lg font-semibold text-white transition-colors group-hover:text-sunset-sky"
            >
              +39 345 157 5507
            </Link>
          </div>
        </div>

        {/* Email Section */}
        <div className="group py-8 md:py-10 flex flex-col items-center justify-center gap-3 text-center cursor-pointer">
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunset-amber/10 text-sunset-amber group-hover:scale-110 transition-transform">
            <Mail size={20} />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Email</h3>
            <a
              href="mailto:gio.fantoni.fpv@gmail.com"
              className="block text-lg font-semibold text-white transition-colors group-hover:text-sunset-amber"
            >
              gio.fantoni.fpv@gmail.com
            </a>
          </div>
        </div>

        {/* Connect Section */}
        <div className="group py-8 md:py-10 flex flex-col items-center justify-center gap-3 text-center cursor-pointer">
          <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunset-violet/10 text-sunset-violet group-hover:scale-110 transition-transform">
            <Instagram size={20} />
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Connect</h3>
            <Link
              href="https://instagram.com/gio.drone"
              target="_blank"
              rel="noreferrer"
              className="block text-lg font-semibold text-white transition-colors group-hover:text-sunset-violet"
            >
              @gio.drone
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-neutral-600 font-light">
          <p>GIOFPV • Verona, Italy • © 2025 Giovanni Fantoni</p>
        </div>
      </div>
    </footer>
  );
}
