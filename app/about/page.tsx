// app/about/page.tsx
import { collaborations } from "@/data/collaborations";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 space-y-20 animate-fade-in">
      {/* Intro Section */}
      <section className="space-y-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-sunset-sky font-medium">About Me</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Giovanni Fantoni
        </h1>
        <h2 className="text-2xl sm:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-sunset-amber to-sunset-orange">
          FPV &amp; Aerial Cinematography
        </h2>

        <div className="space-y-6 text-lg text-neutral-300 leading-relaxed max-w-2xl">
          <p>
            Mi chiamo Giovanni Fantoni e sono un pilota di droni e filmmaker FPV con base a Verona,
            Italia. Vengo dall’informatica e dagli sport outdoor: per anni ho passato più weekend su
            fiumi, sentieri e neve che davanti alla TV.
          </p>
          <p>
            Il drone è arrivato come estensione naturale di tutto questo: la voglia di raccontare
            luoghi e persone da punti di vista che da terra non esistono.
          </p>
          <p>
            Oggi mi concentro su riprese FPV e aeree pulite, leggibili e sicure: voli che seguono
            l’azione da vicino senza diventare mai caotici, pensati per integrarsi in campagne social,
            spot brevi e contenuti web.
          </p>
        </div>
      </section>

      {/* Collaborations Section */}
      <section className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold text-white">Collaborations</h3>
            <p className="text-neutral-400 max-w-md">
              Settori e contesti dove le riprese aeree portano valore aggiunto.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collaborations.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 p-8 transition-all hover:bg-neutral-900 hover:border-sunset-amber/30"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-sunset-amber group-hover:scale-110 transition-transform duration-300">
                <item.icon size={24} />
              </div>
              <h4 className="mb-3 text-lg font-semibold text-white group-hover:text-sunset-amber transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
