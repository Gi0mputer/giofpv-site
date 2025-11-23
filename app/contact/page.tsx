// app/contact/page.tsx
import Link from "next/link";
import { Phone, Mail, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="h-[100dvh] min-h-[600px] bg-neutral-950 pt-20 pb-6 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sunset-amber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl space-y-12 relative z-10 text-center">
        {/* Header */}
        <section className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Let's create <br className="sm:hidden" />
            <span className="bg-[linear-gradient(to_right,#f97316_0%,#fbbf24_50%,#f59e0b_100%)] bg-clip-text text-transparent">Something Epic</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl mx-auto">
            Location e tempistiche: raccontami la tua idea.
          </p>
        </section>

        {/* Contact Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Phone */}
          <div className="group rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-white/10 hover:-translate-y-1">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunset-sky/10 text-sunset-sky group-hover:scale-110 transition-transform">
              <Phone size={20} />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Phone</div>
            <Link
              href="https://wa.me/393451575507"
              className="block text-lg font-semibold text-white hover:text-sunset-sky transition-colors"
            >
              +39 345 157 5507
            </Link>
          </div>

          {/* Email */}
          <div className="group rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-white/10 hover:-translate-y-1">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunset-amber/10 text-sunset-amber group-hover:scale-110 transition-transform">
              <Mail size={20} />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Email</div>
            <Link
              href="mailto:gio.fantoni.fpv@gmail.com"
              className="block text-lg font-semibold text-white hover:text-sunset-amber transition-colors truncate"
            >
              gio.fantoni.fpv@gmail.com
            </Link>
          </div>

          {/* Instagram */}
          <div className="group rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-white/10 hover:-translate-y-1">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sunset-violet/10 text-sunset-violet group-hover:scale-110 transition-transform">
              <Instagram size={20} />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Instagram</div>
            <Link
              href="https://instagram.com/gio.drone"
              target="_blank"
              rel="noreferrer"
              className="block text-lg font-semibold text-white hover:text-sunset-violet transition-colors"
            >
              @gio.drone
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-8 border-t border-white/5">
          <p className="text-xs text-neutral-600">
            GioFpv — Verona, Italy • © 2025 Giovanni Fantoni
          </p>
        </div>
      </div>
    </main>
  );
}
