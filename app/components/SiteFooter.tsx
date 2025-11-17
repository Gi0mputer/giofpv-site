import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3 text-sm text-neutral-300">
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-neutral-500">Phone – WhatsApp</h3>
          <Link
            href="https://wa.me/393331234567"
            className="mt-2 inline-block text-lg text-white hover:text-amber-300"
          >
            +39 333 123 4567
          </Link>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-neutral-500">Email</h3>
          <a
            href="mailto:hello@giofpv.com"
            className="mt-2 inline-block text-lg text-white hover:text-amber-300"
          >
            hello@giofpv.com
          </a>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-neutral-500">Connect</h3>
          <div className="mt-2 flex items-center gap-3 text-white">
            <Link
              href="https://instagram.com/giofpv"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs uppercase trackin"
            >
              <span className="text-xl">📷</span> Instagram
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-neutral-950/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-neutral-500">
          <p>
            GioFPV — Verona, Italy • Via Arche Scaligere 12, 37121 VR • P.IVA IT01234567890
          </p>
        </div>
      </div>
    </footer>
  );
}
