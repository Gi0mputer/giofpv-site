// app/about/page.tsx
import { collaborations } from "@/data/collaborations";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-36 pb-12 px-6 lg:pt-24 lg:flex lg:items-center lg:justify-center lg:p-24">
      <div className="w-full max-w-7xl grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">

        {/* Left Column: Bio */}
        <section className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              <span className="text-white">Giovanni </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sunset-orange via-[#fa991d] to-sunset-amber">Fantoni</span>
            </h1>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
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
        </section>

        {/* Right Column: Collaborations Grid */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4 mb-6">
            <h3 className="text-xl font-semibold text-white">Collaborations</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Settori e contesti dove le riprese aeree portano valore aggiunto.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {collaborations.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/10"
              >
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sunset-amber/10 text-sunset-amber group-hover:scale-110 transition-transform">
                  <item.icon size={16} />
                </div>
                <h4 className="mb-1 text-base font-semibold text-white group-hover:text-sunset-amber transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
