// app/contact/page.tsx
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Contact</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Parliamo del tuo progetto</h1>
        <p className="text-neutral-300 leading-relaxed">
          Nessun form: ti rispondo direttamente per telefono, mail o Instagram. Brief, location e
          tempistiche: più dettagli condividi, più veloce sarà la proposta.
        </p>
      </section>

      <div className="space-y-6 text-sm text-neutral-200">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500">Phone – WhatsApp</div>
          <Link
            href="https://wa.me/393331234567"
            className="mt-2 block text-2xl font-semibold text-white hover:text-amber-300"
          >
            +39 333 123 4567
          </Link>
          <p className="mt-2 text-neutral-400">Disponibile per call rapide o note vocali dal set.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500">Email</div>
          <a
            href="mailto:hello@giofpv.com"
            className="mt-2 block text-xl font-semibold text-white hover:text-amber-300"
          >
            hello@giofpv.com
          </a>
          <p className="mt-2 text-neutral-400">
            Invia briefing, moodboard, referenze video o semplicemente qualche riga su ciò che vuoi raccontare.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500">Connect</div>
          <Link
            href="https://instagram.com/giofpv"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 text-white transition hover:border-white/50"
          >
            <span className="text-xl">📷</span>
            <span className="font-semibold">Instagram</span>
          </Link>
          <p className="mt-2 text-neutral-400">Stories dal set, backstage e anteprime dei lavori.</p>
        </div>
      </div>

      <p className="text-xs text-neutral-500">
        GioFPV — Verona, Italy • Via Arche Scaligere 12, 37121 VR • P.IVA IT01234567890
      </p>
    </main>
  );
}
