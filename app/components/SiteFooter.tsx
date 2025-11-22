import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3">

        {/* Phone - Whatsapp Section */}
        <div className="group border-t border-white/20 md:border-t-0 py-12 md:py-16 flex flex-col items-center justify-center gap-4 text-center cursor-pointer">
          <FaWhatsapp className="h-8 w-8 text-white transition-colors group-hover:text-sunset-amber" />
          <div>
            <h3 className="text-lg font-light tracking-wide text-white">Phone - Whatsapp</h3>
            <Link
              href="https://wa.me/393451575507"
              className="mt-2 block text-xl font-light text-white transition-colors group-hover:text-sunset-amber"
            >
              +39 345 157 5507
            </Link>
          </div>
        </div>

        {/* Email Section */}
        <div className="group border-t border-white/20 md:border-t-0 md:border-l md:border-r md:border-white/10 py-12 md:py-16 flex flex-col items-center justify-center gap-4 text-center cursor-pointer">
          <FaEnvelope className="h-8 w-8 text-white transition-colors group-hover:text-sunset-amber" />
          <div>
            <h3 className="text-lg font-light tracking-wide text-white">Email</h3>
            <a
              href="mailto:gio.fantoni.fpv@gmail.com"
              className="mt-2 block text-lg font-light text-white transition-colors group-hover:text-sunset-amber"
            >
              gio.fantoni.fpv@gmail.com
            </a>
          </div>
        </div>

        {/* Connect Section */}
        <div className="group border-t border-white/20 md:border-t-0 py-12 md:py-16 flex flex-col items-center justify-center gap-4 text-center cursor-pointer">
          <FaInstagram className="h-8 w-8 text-white transition-colors group-hover:text-sunset-amber" />
          <div>
            <h3 className="text-lg font-light tracking-wide text-white">Connect</h3>
            <Link
              href="https://instagram.com/gio.drone"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-xl font-light text-white transition-colors group-hover:text-sunset-amber"
            >
              @gio.drone
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-neutral-500 font-light">
          <p>GioFpv • Verona, Italy • © 2025 Giovanni Fantoni</p>
          <p className="mt-2">P.IVA 02676470228</p>
        </div>
      </div>
    </footer>
  );
}
