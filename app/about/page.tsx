// app/about/page.tsx
import { collaborations } from "@/data/collaborations";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-neutral-950">
      {/* Section 1: Bio */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-24 px-6 relative">
        <div className="w-full max-w-5xl space-y-8 mx-auto">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-about bg-clip-text text-transparent">Aerial & FPV</span>
              <span className="text-white"> Filmmaker</span>
            </h1>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            <p>
              Mi chiamo Giovanni Fantoni e sono un videomaker e pilota di droni.
              <br />
              Da sempre ho una grande curiosità e desiderio di esplorare, già da piccolo mi affascinava l'idea di vedere le cose dall'alto, da una prospettiva diversa rispetto a quella a cui siamo abituati.
            </p>
            <p>
              Sono appassionato di tecnologia, mi sono laureato in Informatica e in parallelo ho sempre coltivato una grande passione per l’outdoor, gli sport all'aperto e la natura.
              <br />
              Quando il mondo dei droni ha iniziato a evolversi, ho trovato in questa tecnologia il punto d’incontro perfetto tra le mie passioni.
            </p>
            <p>
              Negli anni ho continuato ad aggiornarmi e sperimentare, fino ad avvicinarmi anche al volo FPV, che mi ha aperto nuove possibilità creative.
              Oggi realizzo riprese aeree pensate per mostrare ogni luogo dal suo punto di vista più interessante.
            </p>
          </div>
        </div>

        {/* Scroll Indicator - Visible on all screens, positioned at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex animate-bounce z-10">
          <Link
            href="#collaborations"
            className="text-white/40 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronDown size={32} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* Section 2: Collaborations */}
      <section id="collaborations" className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-24 bg-neutral-900/30">
        <div className="w-full max-w-4xl space-y-12">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Collaborations</h3>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Settori e contesti dove le riprese aeree portano valore aggiunto.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {collaborations.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-white/10"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sunset-amber/10 text-sunset-amber group-hover:scale-110 transition-transform">
                  <item.icon size={20} />
                </div>
                <h4 className="mb-2 text-lg font-semibold text-white group-hover:text-sunset-amber transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
