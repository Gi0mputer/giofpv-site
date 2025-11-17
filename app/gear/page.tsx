// app/gear/page.tsx
import Image from "next/image";
import { gear } from "@/data/gear";

export default function GearPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <section className="space-y-4 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Gear</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Arsenale modulare</h1>
        <p className="text-neutral-300 leading-relaxed">
          Droni costruiti e configurati per ogni scenario: sub-250g per indoor sicuri, 5–7″ per
          inseguimenti, cine-lifter per camere cinema e sistemi DJI ready-to-go per set
          time-critical. Ogni setup è assicurato e pronto con feed remoto per regia e client.
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
