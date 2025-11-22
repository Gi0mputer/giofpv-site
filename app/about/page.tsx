              Il drone è arrivato come estensione naturale di tutto questo: la voglia di raccontare
              luoghi e persone da punti di vista che da terra non esistono.
            </p >
  <p>
    Oggi mi concentro su riprese FPV e aeree pulite, leggibili e sicure: voli che seguono
    l’azione da vicino senza diventare mai caotici.
  </p>
          </div >
        </section >

  {/* Right Column: Collaborations Grid */ }
  < div className = "space-y-6" >
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
        </div >
      </div >
    </main >
  );
}
