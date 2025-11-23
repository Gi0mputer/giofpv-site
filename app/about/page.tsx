// app/about/page.tsx
import { collaborations } from "@/data/collaborations";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-neutral-950">
      {/* Section 1: Bio */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-start pt-28 pb-24 px-6 relative">
        <div className="w-full max-w-2xl space-y-8 text-center mx-auto">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-[linear-gradient(to_right,#06b6d4_0%,#22d3ee_50%,#67e8f9_100%)] bg-clip-text text-transparent">Aerial & FPV</span>
              <span className="text-white"> Filmmaker</span>
            </h1>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            <p>
              Mi chiamo Giovanni Fantoni e sono un pilota di droni e filmmaker FPV con base a Verona,
              Italia. Vengo dall'informatica e dagli sport outdoor: per anni ho passato più weekend su
              fiumi, sentieri e neve che davanti alla TV.
            </p>
            <p>
              Il drone è arrivato come estensione naturale di tutto questo: la voglia di raccontare
              luoghi e persone da punti di vista che da terra non esistono.
            </p>
            <p>
              Oggi mi concentro su riprese FPV e aeree pulite, leggibili e sicure: voli che seguono
              l'azione da vicino senza diventare mai caotici.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Link
            href="#collaborations"
            className="flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors"
          >
            <span className="text-[10px] uppercase tracking-widest">See Collaborations</span>
            <ArrowDown size={20} />
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
