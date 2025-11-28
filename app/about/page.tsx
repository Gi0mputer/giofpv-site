// app/about/page.tsx
import { collaborations } from "@/data/collaborations";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-neutral-950">
      {/* Section 1: Bio */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-24 px-6 relative">
        <div className="w-full max-w-2xl space-y-8 mx-auto">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-about bg-clip-text text-transparent">Aerial & FPV</span>
              <span className="text-white"> Filmmaker</span>
            </h1>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            <p>
              Mi chiamo Giovanni Fantoni.
              Sono da sempre appassionato di tecnologia e mi sono laureato in Informatica, ma in parallelo ho sempre coltivato una grande passione per l’outdoor, lo sport e la natura.
            </p>
            <p>
              Fin da piccolo mi ha affascinato la possibilità di vedere le cose dall’alto, da una prospettiva diversa rispetto a quella a cui siamo abituati. Una prospettiva che va oltre il nostro punto di vista naturale.
            </p>
            <p>
              Quando le tecnologie dei droni hanno iniziato a evolversi rapidamente, ho visto in loro il punto d’incontro perfetto tra queste due parti di me. Dal mio primo drone ho continuato a sperimentare e aggiornarmi per quasi dieci anni, trovandomi a riprendere in tanti scenari e occasioni diverse.
            </p>
            <p>
              Di recente mi sono concentrato sulle riprese FPV, che hanno ampliato ancora di più le possibilità creative e mi hanno fatto appassionare definitivamente a questo mondo. Mi permettono di catturare momenti e prospettive che prima non erano nemmeno immaginabili.
            </p>
            <p>
              Mi interessa mostrare un luogo o un momento in modo da valorizzarlo e renderlo entusiasmante, rivelando ciò che normalmente non è possibile filmare.
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
