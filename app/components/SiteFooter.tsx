import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3 text-sm text-neutral-300">

        {/* PHONE */}
        <div className="flex flex-col text-center">
          <h3 className="text-xs uppercase tracking-[0.25em] text-subtle mb-3">
            Phone – WhatsApp
          </h3>
          <Link
            href="https://wa.me/393451575507"
            className="mt-1 inline-block text-lg text-white hover:text-amber-300"
          >
            +39 345 157 5507
          </Link>
        </div>

        {/* EMAIL */}
        <div className="flex flex-col text-center">
          <h3 className="text-xs uppercase tracking-[0.25em] text-subtle mb-3">
            Email
          </h3>
          <a
            href="mailto:gio.fantoni.fpv@gmail.com"
            className="mt-1 inline-block text-lg text-white hover:text-amber-300"
          >
            gio.fantoni.fpv@gmail.com
          </a>
        </div>

        {/* SOCIAL */}
        <div className="flex flex-col text-center">
          <h3 className="text-xs uppercase tracking-[0.25em] text-subtle mb-3">
            Connect
          </h3>
          <div className="mt-1 flex justify-center items-center gap-3 text-white">
            <Link
              href="https://instagram.com/gio.drone"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-base hover:text-amber-300"
            >
              <FaInstagram className="h-6 w-6" />
              gio.drone
            </Link>

          </div>
        </div>

      </div>

      <div className="border-t border-white/5 bg-neutral-950/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-neutral-500 text-center">
          <p>GioFpv • Verona, Italy • © 2025 Giovanni Fantoni</p>
        </div>
      </div>
    </footer>
  );
}
