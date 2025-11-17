// app/about/page.tsx
import Image from "next/image";
import { collaborations } from "@/data/collaborations";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <section className="space-y-4 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">About</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Patrick Lombardi</h1>
        <h2 className="text-xl text-amber-200">Certified Dynamic Drone Operator</h2>
        <p className="text-neutral-300 leading-relaxed">
          FPV filmmaker basato tra Verona e il Trentino Alto Adige. Dopo anni di downhill
          skateboarding e un incidente che ha chiuso la carriera da rider, ho trasformato la
          stessa ricerca di adrenalina in riprese dinamiche aeree. Mi occupo di storytelling
          per brand premium: automotive, sport, turismo e hospitality.
        </p>
        <p className="text-neutral-300 leading-relaxed">
          Le mie inquadrature FPV sostituiscono carrelli, crane e Russian arm, portando la
          camera dove prima non arrivava. Opero con droni assicurati e conformi EASA, con crew
          dedicata quando serve e workflow colore pronto per la post cinema.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Collaborations</h3>
          <p className="text-sm text-neutral-500">Una selezione di set e brand recenti.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collaborations.map((item) => (
            <div
              key={item.image}
              className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 shadow-md"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  fill
                  alt={item.alt}
                  src={item.image}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
