"use client";

import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
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
          <FaWhatsapp className="h-7 w-7 text-sunset-sky transition-colors" />
          <div>
            <h3 className="text-base font-light tracking-wide text-white">Phone - Whatsapp</h3>
            <Link
              href="https://wa.me/393451575507"
              className="mt-2 block text-lg font-light text-white transition-colors group-hover:text-sunset-sky"
            >
              +39 345 157 5507
            </Link>
          </div>
        </div>

        {/* Email Section */}
        <div className="group py-8 md:py-10 flex flex-col items-center justify-center gap-3 text-center cursor-pointer">
          <FaEnvelope className="h-7 w-7 text-sunset-amber transition-colors" />
          <div>
            <h3 className="text-base font-light tracking-wide text-white">Email</h3>
            <a
              href="mailto:gio.fantoni.fpv@gmail.com"
              className="mt-2 block text-base font-light text-white transition-colors group-hover:text-sunset-amber"
            >
              gio.fantoni.fpv@gmail.com
            </a>
          </div>
        </div>

        {/* Connect Section */}
        <div className="group py-8 md:py-10 flex flex-col items-center justify-center gap-3 text-center cursor-pointer">
          <FaInstagram className="h-7 w-7 text-sunset-violet transition-colors" />
          <div>
            <h3 className="text-base font-light tracking-wide text-white">Connect</h3>
            <Link
              href="https://instagram.com/gio.drone"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-lg font-light text-white transition-colors group-hover:text-sunset-violet"
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
