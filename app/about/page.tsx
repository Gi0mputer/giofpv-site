// app/about/page.tsx
import Image from "next/image";
import { collaborations } from "@/data/collaborations";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <section className="space-y-4 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">About</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Giovanni Fantoni</h1>
        <h2 className="text-xl text-amber-200">FPV &amp; Aerial Cinematography</h2>
        <p className="text-neutral-300 leading-relaxed">
          Mi chiamo Giovanni Fantoni e sono un pilota di droni e filmmaker FPV con base a Verona,
          Italia. Vengo dall’informatica e dagli sport outdoor: per anni ho passato più weekend su
          fiumi, sentieri e neve che davanti alla TV. Il drone è arrivato come estensione naturale di
          tutto questo: la voglia di raccontare luoghi e persone da punti di vista che da terra non
          esistono.
        </p>
        <p className="text-neutral-300 leading-relaxed">
          Ho iniziato con piccoli droni da viaggio sorvolando laghi, borghi e tetti di città,
          sperimentando linee morbide e voli radenti. Con il tempo ho affiancato al lavoro da
          sviluppatore la produzione di contenuti video per brand locali, turismo, real estate e sport
          outdoor, curando sia la parte di volo sia quella di montaggio e color grading.
        </p>
        <p className="text-neutral-300 leading-relaxed">
          Oggi mi concentro su riprese FPV e aeree pulite, leggibili e sicure: voli che seguono
          l’azione da vicino senza diventare mai caotici, pensati per integrarsi in campagne social,
          spot brevi e contenuti web. Opero nel rispetto delle normative EASA, con attenzione a
          permessi, sicurezza sul set e comunicazione chiara con il team di produzione.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Collaborations</h3>
          <p className="text-sm text-neutral-500">
            Una selezione di contesti in cui le riprese FPV fanno la differenza.
          </p>
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
