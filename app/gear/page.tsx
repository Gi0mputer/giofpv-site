// app/gear/page.tsx
import Image from "next/image";
import { gear } from "@/data/gear";

export default function GearPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <section className="space-y-4 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Gear</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Set FPV &amp; Aerial attuali</h1>
        <p className="text-neutral-300 leading-relaxed">
          Due piattaforme principali per coprire il 90% dei progetti: un drone compatto da viaggio
          per riprese pulite in 4K e un sistema FPV per voli dinamici in prima persona. Tutto in 4K
          60fps, sia in formato orizzontale che verticale, pronto per social, web e campagne digital.
        </p>
      </section>

      <div className="space-y-8">
        {gear.map((item) => (
          <div
            key={item.title}
            className="grid gap-6 rounded-3xl border border-white/10 bg-neutral-900/80 p-6 shadow-lg sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-center"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                fill
                alt={item.title}
                src={item.image}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="text-neutral-300 leading-relaxed text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
