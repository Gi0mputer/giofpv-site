// app/work/page.tsx
import Image from "next/image";
import Link from "next/link";
import { works } from "@/data/work";

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* HERO: testo + showreel */}
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            GioFpv
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">
            Cinematic FPV &amp; aerial footage
          </h1>
          <p className="mt-4 text-neutral-300 max-w-xl">
            Riprese FPV e droni cinematografici per progetti commerciali,
            turismo, sport e storytelling personale. Focus su fluidità,
            composizione e sicurezza sul set.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="https://www.youtube.com/watch?v=yyTD2J0G4H0"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/70 px-4 py-2 text-amber-300 hover:border-amber-300 hover:text-amber-200 transition"
            >
              ▶ Showreel
            </Link>
            <Link
              href="https://www.youtube.com/@giosbando"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-neutral-100"
            >
              Canale YouTube →
            </Link>
          </div>
        </div>

        {/* Video di presentazione */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-black shadow-xl">
          <div className="relative w-full pb-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/yyTD2J0G4H0"
              title="GioFpv • Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Selected work</h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Alcune clip recenti. Altri video sono disponibili sul canale YouTube.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((w, i) => (
            <a
              key={i}
              href={w.href}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-lg ring-1 ring-white/10"
            >
              <div className="relative h-56 w-full">
                <Image
                  fill
                  alt={w.title}
                  src={w.thumb}
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <div className="inline-flex items-center gap-2 text-sm text-neutral-300">
                  <span>▶</span> {w.duration}
                </div>
                <h3 className="mt-1 text-lg font-medium">{w.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}      