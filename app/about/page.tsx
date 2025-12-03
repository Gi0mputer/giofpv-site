"use client";

import { gear } from "@/data/gear";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  // State to track MULTIPLE expanded cards (array of titles)
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  const toggleGear = (title: string) => {
    setExpandedCards((prev) => {
      const isCurrentlyExpanded = prev.includes(title);

      if (isCurrentlyExpanded) {
        // Close card: remove from array
        return prev.filter((t) => t !== title);
      } else {
        // Open card: add to array AND scroll to it
        setTimeout(() => {
          const element = document.getElementById(`gear-${title}`);
          if (element) {
            const yOffset = -100; // Header height + some padding
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100); // Small delay to ensure render
        return [...prev, title];
      }
    });
  };

  return (
    <main className="bg-neutral-950">
      <section className="min-h-[100dvh] flex flex-col items-center justify-start pt-18 pb-15 px-6 relative">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-5 sm:mb-10">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-about bg-clip-text text-transparent">Aerial & FPV</span>
              <span className="text-white"> Filmmaker</span>
            </h1>
          </div>

          <div className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-4xl mx-auto clearfix text-justify">
            <div className="float-right mt-10 lg:mt-0 ml-6 lg:ml-16 mb-0 shape-circle">
              <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-sunset-sky/30 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] bg-neutral-900">
                <Image
                  src="/profilepic.png"
                  alt="Giovanni Fantoni"
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <p className="mb-4">
              Mi chiamo Giovanni Fantoni e sono un videomaker e pilota di droni.
            </p>
            <p className="mb-4">
              Da sempre ho una grande curiosità e desiderio di esplorare, già da piccolo mi affascinava l'idea di vedere le cose dall'alto, da una prospettiva diversa rispetto a quella a cui siamo abituati.
            </p>

            <p className="mb-5">
              Sono appassionato di tecnologia, mi sono laureato in Informatica e in parallelo ho sempre coltivato una grande passione per l'outdoor, gli sport all'aperto e la natura.
            </p>

            <div className="float-left mr-6 mt-12 lg:mr-16 lg:mt-0 shape-circle">
              <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-sunset-sky/30 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] bg-neutral-900">
                <Image
                  src="/icon.png"
                  alt="GioFPV Logo"
                  width={208}
                  height={208}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <p className="mt-7 mb-4">
              Quando il mondo dei droni ha iniziato a evolversi, ho trovato in questa tecnologia il punto d'incontro perfetto tra le mie passioni.
            </p>
            <p className="mb-4 ml-16">
              Negli anni ho continuato ad aggiornarmi e sperimentare, fino ad avvicinarmi anche al volo FPV, che mi ha aperto nuove possibilità creative.
            </p>
            <p className="mb-4">
              Oggi realizzo riprese aeree pensate per mostrare ogni luogo dal suo punto di vista più interessante.
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex animate-bounce z-10">
          <Link href="#gear" className="text-white/40 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
            <ChevronDown size={32} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <section id="gear" className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 bg-neutral-950 scroll-mt-8 lg:scroll-mt-4">
        <div className="w-full max-w-5xl space-y-6 sm:space-y-8">
          <div className="space-y-4 text-center mx-auto max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              What's in my{" "}
              <span className="bg-gradient-gear bg-clip-text text-transparent">Backpack</span>
            </h1>
            <div className="space-y-4 text-base sm:text-lg text-neutral-300 leading-relaxed text-justify max-w-4xl mx-auto">
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

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 mx-auto max-w-5xl">
            {gear.map((item) => {
              const isExpanded = expandedCards.includes(item.title);
              return (
                <div
                  key={item.title}
                  id={`gear-${item.title}`} // Unique ID for scrolling
                  className={`group relative rounded-3xl border border-white/5 bg-white/5 transition-all duration-500 ${isExpanded ? "bg-white/10 border-white/10" : "hover:bg-white/8 hover:border-white/8"
                    }`}
                >
                  {!isExpanded && (
                    <button onClick={() => toggleGear(item.title)} className="w-full p-4 sm:p-8 flex flex-col items-center gap-4 sm:gap-6 text-center cursor-pointer">
                      <div className="flex h-20 w-20 sm:h-32 sm:w-32 shrink-0 items-center justify-center rounded-full bg-neutral-900 overflow-hidden group-hover:scale-105 transition-transform border-2 border-sunset-violet/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                        <Image src={item.image} alt={item.title} width={128} height={128} className="object-cover w-full h-full" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-sunset-violet transition-colors">
                        {item.title}
                      </h3>
                      <div className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-medium text-white transition-all group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105">
                        See more
                      </div>
                    </button>
                  )}

                  {isExpanded && (
                    <div className="p-4 sm:p-8 flex flex-col items-center text-center gap-4 sm:gap-6 animate-fade-in">
                      <div className="flex h-24 w-24 sm:h-32 sm:w-32 shrink-0 items-center justify-center rounded-full bg-neutral-900 overflow-hidden transition-transform border-2 border-sunset-violet/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                        <Image src={item.image} alt={item.title} width={128} height={128} className="object-cover w-full h-full" />
                      </div>

                      <div className="space-y-3 sm:space-y-4 flex flex-col items-center flex-grow">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-base text-neutral-400 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 w-full sm:w-auto">
                          <a
                            href={item.links.desktop}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
                          >
                            See on YouTube
                          </a>
                          <button
                            onClick={() => toggleGear(item.title)}
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
    </main>
  );
}
