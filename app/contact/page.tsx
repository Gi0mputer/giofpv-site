import Link from "next/link";
import { Phone, Mail, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 space-y-20 animate-fade-in">
      <section className="space-y-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">Contact</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Parliamo del tuo <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-amber to-sunset-orange">Progetto</span>
        </h1>
        <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl">
          Brief, location e tempistiche: più dettagli condividi, più veloce sarà la proposta.
          Raccontami la tua idea.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-2xl border border-white/10 bg-neutral-900/50 p-8 transition-all hover:bg-neutral-900 hover:border-sunset-amber/30">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-sunset-amber group-hover:scale-110 transition-transform duration-300">
            <Phone size={24} />
          </div>
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2">Phone – WhatsApp</div>
          <Link
            href="https://wa.me/393451575507"
            className="block text-xl font-semibold text-white hover:text-sunset-amber transition-colors"
          >
            +39 3451575507
          </Link>
          <p className="mt-3 text-sm text-neutral-400">Disponibile per messaggi o note vocali.</p>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-neutral-900/50 p-8 transition-all hover:bg-neutral-900 hover:border-sunset-amber/30">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-sunset-amber group-hover:scale-110 transition-transform duration-300">
            <Mail size={24} />
          </div>
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2">Email</div>
          <a
            href="mailto:hello@giofpv.com"
            className="block text-xl font-semibold text-white hover:text-sunset-amber transition-colors break-all"
          >
            giovanni.fantoni.1997@gmail.com
          </a>
          <p className="mt-3 text-sm text-neutral-400">
            Invia briefing, moodboard o referenze video.
          </p>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-neutral-900/50 p-8 transition-all hover:bg-neutral-900 hover:border-sunset-amber/30">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-sunset-amber group-hover:scale-110 transition-transform duration-300">
            <Instagram size={24} />
          </div>
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2">Connect</div>
          <Link
            href="https://instagram.com/gio.fanto"
            target="_blank"
            rel="noreferrer"
            className="block text-xl font-semibold text-white hover:text-sunset-amber transition-colors"
          >
            @gio.fanto
          </Link>
          <p className="mt-3 text-sm text-neutral-400">Guarda le mie Stories e i miei Reels.</p>
        </div>
      </div>

      <div className="pt-10 border-t border-white/10">
        <p className="text-xs text-neutral-500">
          GioFpv — Verona, Italy • © 2025 Giovanni Fantoni
        </p>
      </div>
    </main>
  );
}
