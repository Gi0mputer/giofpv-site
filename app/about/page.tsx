"use client";

import { gear } from "@/data/gear";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [expandedDrone, setExpandedDrone] = useState<number | null>(null);

  const toggleDrone = (index: number) => {
    setExpandedDrone(expandedDrone === index ? null : index);
  };

  return (
    <main className="bg-neutral-950">
      {/* Section 1: Bio */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-24 px-6 relative">
        <div className="w-full max-w-5xl mx-auto">
          <div className="space-y-3 text-center mb-8">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-about bg-clip-text text-transparent">Aerial & FPV</span>
              <span className="text-white"> Filmmaker</span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Profile Image */}
            <div className="shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-sunset-sky/30 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)]">
                <Image
                  src="/icon.png"
                  alt="Giovanni Fantoni"
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Bio Text */}
            <div className="space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed flex-grow">
              <p>
                Mi chiamo Giovanni Fantoni e sono un videomaker e pilota di droni.
                <br />
                Da sempre ho una grande curiosità e desiderio di esplorare, già da piccolo mi affascinava l'idea di vedere le cose dall'alto, da una prospettiva diversa rispetto a quella a cui siamo abituati.
              </p>
              <p>
                Sono appassionato di tecnologia, mi sono laureato in Informatica e in parallelo ho sempre coltivato una grande passione per l'outdoor, gli sport all'aperto e la natura.
                <br />
                Quando il mondo dei droni ha iniziato a evolversi, ho trovato in questa tecnologia il punto d'incontro perfetto tra le mie passioni.
              </p>
              <p>
                Negli anni ho continuato ad aggiornarmi e sperimentare, fino ad avvicinarmi anche al volo FPV, che mi ha aperto nuove possibilità creative.
                Oggi realizzo riprese aeree pensate per mostrare ogni luogo dal suo punto di vista più interessante.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex animate-bounce z-10">
          <Link
            href="#gear"
            className="text-white/40 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronDown size={32} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* Section 2: Gear */}
      <section id="gear" className="flex flex-col items-center justify-center px-6 py-16 md:py-20 bg-neutral-950">
        <div className="w-full max-w-5xl space-y-8">
          {/* Header & Intro */}
          <div className="space-y-6 text-center mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              What's in my{" "}
              <span className="bg-gradient-gear bg-clip-text text-transparent">Backpack</span>
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
              <p>
                L'attrezzatura che porto con me mi permette di adattarmi a qualsiasi tipo di ripresa,
                dalle immagini stabili e cinematiche ai voli più dinamici e immersivi.
              </p>
              <p>
                Per le immagini più pulite utilizzo un drone stabilizzato con gimbal a tre assi,
                ideale per viste dall'alto, panoramiche e primi piani stabili e definiti.
              </p>
              <p>
                Quando invece serve movimento, energia o un punto di vista impossibile per un drone tradizionale,
                uso un drone FPV che permette passaggi precisi, inseguimenti e prospettive ravvicinate e adrenaliniche.
              </p>
            </div>
          </div>

          {/* Gear Cards - Expandable */}
          <div className="grid gap-6 sm:grid-cols-2 mx-auto max-w-4xl">
            {gear.map((item, index) => {
              const isExpanded = expandedDrone === index;
              return (
                <div
                  key={item.title}
                  className={`group relative rounded-3xl border border-white/5 bg-white/5 transition-all ${isExpanded ? "bg-white/10 border-white/10" : "hover:bg-white/8 hover:border-white/8"
                    }`}
                >
                  {/* Collapsed State */}
                  {!isExpanded && (
                    <button
                      onClick={() => toggleDrone(index)}
                      className="w-full p-8 flex flex-col items-center gap-6 text-center cursor-pointer"
                    >
                      <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-neutral-900 overflow-hidden group-hover:scale-105 transition-transform border-2 border-sunset-violet/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-sunset-violet transition-colors">
                        {item.title}
                      </h3>
                      <div className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-6 py-2 text-sm font-medium text-white transition-all group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105">
                        See more
                      </div>
                    </button>
                  )}

                  {/* Expanded State */}
                  {isExpanded && (
                    <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8">
                      <div className="flex h-24 w-24 md:h-32 md:w-32 shrink-0 items-center justify-center rounded-full bg-neutral-900 overflow-hidden transition-transform border-2 border-sunset-violet/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="space-y-4 flex flex-col items-center md:items-start flex-grow">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          {/* See on YouTube Button */}
                          <a
                            href={item.links.mobile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sm:hidden inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
                          >
                            See on YouTube
                          </a>
                          <a
                            href={item.links.desktop}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
                          >
                            See on YouTube
                          </a>

                          {/* Collapse Button */}
                          <button
                            onClick={() => toggleDrone(index)}
                            className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-6 py-2 text-sm font-medium text-neutral-400 transition-all hover:bg-white/10 hover:border-white/20 hover:text-white"
                          >
                            Show less
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TODO: Collaborations section - could be added to Work page in the future
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
      */}
    </main>
  );
}
