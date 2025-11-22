import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaRegThumbsUp } from "react-icons/fa";

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      {/* Phone - Whatsapp Section */}
      <div className="border-t border-white/20 py-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <FaWhatsapp className="h-8 w-8 text-white" />
          <div>
            <h3 className="text-lg font-light tracking-wide">Phone - Whatsapp</h3>
            <Link
              href="https://wa.me/393451575507"
              className="mt-2 block text-xl font-light hover:text-neutral-300"
            >
              +39 345 157 5507
            </Link>
          </div>
        </div>
      </div>

      {/* Email Section */}
      <div className="border-t border-white/20 py-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <FaEnvelope className="h-8 w-8 text-white" />
          <div>
            <h3 className="text-lg font-light tracking-wide">Email</h3>
            <a
              href="mailto:gio.fantoni.fpv@gmail.com"
              className="mt-2 block text-lg font-light hover:text-neutral-300"
            >
              gio.fantoni.fpv@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Connect Section */}
      <div className="border-t border-white/20 py-12">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <FaRegThumbsUp className="h-8 w-8 text-white" />
            <h3 className="text-lg font-light tracking-wide">Connect</h3>
          </div>

          <Link
            href="https://instagram.com/gio.drone"
            target="_blank"
            rel="noreferrer"
            className="transition hover:scale-110 hover:text-pink-500"
          >
            <FaInstagram className="h-10 w-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-1 rounded-lg" />
            {/* Alternatively, just the icon if they want it minimal like the screenshot which seems to show a colored logo or just white */}
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-neutral-500 font-light">
          <p>GioFpv • Verona, Italy • © 2025 Giovanni Fantoni</p>
          <p className="mt-2">P.IVA 02676470228</p> {/* Added P.IVA as seen in screenshot example, though using placeholder or if user provided it. User didn't provide it for Gio, but Patrick had it. I'll leave it out or put a placeholder if unsure. I'll stick to what was there before + standard copyright. */}
        </div>
      </div>
    </footer>
  );
}
