"use client";

import { gear } from "@/data/gear";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  // State to track MULTIPLE expanded cards (array of titles)
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  const getHeaderOffset = () => (window.innerWidth >= 1024 ? 90 : 72);

  const smoothScrollTo = (targetY: number, duration = 550) => {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    const startTime = performance.now();
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + diff * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const toggleGear = (title: string) => {
    setExpandedCards((prev) => {
      const isCurrentlyExpanded = prev.includes(title);

      if (isCurrentlyExpanded) {
        // Close card: remove from array
        const newState = prev.filter((t) => t !== title);

        // If all cards are closed, scroll back to the section start
        if (newState.length === 0) {
          setTimeout(() => {
            const gearSection = document.getElementById("gear");
            if (gearSection) {
              const headerOffset = getHeaderOffset();
              const y = gearSection.getBoundingClientRect().top + window.pageYOffset - headerOffset + 50;
              smoothScrollTo(y);
            }
          }, 100);
        } else {
          // If there is an expanded card above the one just closed, center on it
          const closedIndex = gear.findIndex((g) => g.title === title);
          const expandedAbove = gear
            .slice(0, closedIndex)
            .reverse()
            .find((g) => newState.includes(g.title));

          if (expandedAbove) {
            setTimeout(() => {
              const element = document.getElementById(`gear-${expandedAbove.title}`);
              if (element) {
                const headerOffset = getHeaderOffset();
                const elementRect = element.getBoundingClientRect();
                const elementTop = elementRect.top + window.pageYOffset;
                const visibleHeight = window.innerHeight - headerOffset;
                const y = elementTop - headerOffset - visibleHeight / 2 + elementRect.height / 2 + 16;
                smoothScrollTo(y);
              }
            }, 150);
          }
        }

        return newState;
      } else {
        // Open card: add to array AND scroll to it
        setTimeout(() => {
          const element = document.getElementById(`gear-${title}`);
          if (element) {
            const headerOffset = getHeaderOffset();
            const y = element.getBoundingClientRect().top + window.pageYOffset - headerOffset - 30;
            smoothScrollTo(y);
          }
        }, 100); // Small delay to ensure render
        return [...prev, title];
      }
    });
  };

  return (
    <main className="bg-neutral-950">
      <section className="relative flex flex-col bg-neutral-950 min-h-[100svh] pt-17 pb-8 px-5 sm:pt-18 sm:pb-16 sm:px-6 md:h-screen md:pt-[70px] md:pb-6 md:justify-between">
        <div className="flex-1 flex items-center w-full">
          <div className="w-full max-w-5xl mx-auto">
            <div className="text-center mb-3 sm:mb-10">
              <h1 className="text-2xl sm:text-5xl font-bold tracking-tight">
                <span className="bg-gradient-about bg-clip-text text-transparent">Aerial & FPV</span>
                <span className="text-white"> Filmmaker</span>
              </h1>
            </div>

            <div className="text-[15px] sm:text-lg text-neutral-300 leading-relaxed max-w-4xl mx-auto clearfix text-left sm:text-justify">
              <div className="float-right mt-5 sm:mt-10 lg:mt-0 ml-2 lg:ml-16 mb-3 lg:mb-3 shape-circle">
                <div className="w-36 h-36 sm:w-40 sm:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-sunset-sky/70 shadow-[0_0_40px_-12px_rgba(6,182,212,0.35)] bg-cyan-500/10">
                  <Image
                    src="/profilepic.png"
                    alt="Giovanni Fantoni"
                    width={224}
                    height={224}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <p className="mb-1 sm:mb-3">
                Mi chiamo Giovanni Fantoni e sono un videomaker e pilota di droni.
              </p>
              <p className="mb-2 sm:mb-3">
                Da sempre ho una grande curiosita' e desiderio di esplorare, gia' da piccolo mi affascinava l'idea di vedere le cose dall'alto, da una prospettiva diversa rispetto a quella a cui siamo abituati.
              </p>

              <p className="mb-1 sm:mb-6">
                Sono appassionato di tecnologia, mi sono laureato in Informatica e in parallelo ho sempre coltivato una grande passione per l'outdoor, gli sport all'aperto e la natura.
              </p>

              <div className="float-left mr-4 mt-3 sm:mt-12 lg:mr-16 lg:mt-0 mb-0 lg:mb-3 shape-circle">
                <div className="w-36 h-36 sm:w-40 sm:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-sunset-sky/70 shadow-[0_0_40px_-12px_rgba(6,182,212,0.35)] bg-cyan-500/10 p-4 sm:p-5">
                  <Image
                    src="/icon-512x512.png"
                    alt="GioFPV Logo"
                    width={180}
                    height={180}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              <div className="text-right sm:text-justify">
                <p className="mt-2 mb-1 sm:mt-7 sm:mb-3">
                  Quando il mondo dei droni ha iniziato a evolversi, ho trovato in questa tecnologia il punto d'incontro perfetto tra le mie passioni.
                </p>
                <p className="mb-1 ml-8 sm:mb-3 sm:ml-16">
                  Negli anni ho continuato ad aggiornarmi e sperimentare, fino ad avvicinarmi anche al volo FPV, che mi ha aperto nuove possibilita' creative.
                </p>
              </div>
              <p className="mb-3 sm:mb-3 text-left sm:text-justify">
                Oggi realizzo riprese aeree pensate per mostrare ogni luogo dal suo punto di vista piu' interessante.
              </p>
            </div>
          </div>
        </div>

        {/* Arrow mobile: visibile solo sotto md */}
        <div className="pb-0 sm:pb-8 flex justify-center md:hidden">
          <Link href="#gear" className="text-white/40 hover:text-cyan-400 transition-all duration-300 hover:scale-110 animate-bounce">
            <ChevronDown size={32} strokeWidth={1.5} />
          </Link>
        </div>
        {/* Arrow desktop: stessa posizione della hero Work */}
        <div className="hidden md:flex md:w-full md:justify-center animate-bounce z-20">
          <Link href="#gear" className="text-white/40 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
            <ChevronDown size={32} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <section id="gear" className="min-h-[100svh] flex flex-col items-center px-5 sm:px-6 py-3 sm:py-10 bg-neutral-950 scroll-mt-8 lg:scroll-mt-4">
        <div className="w-full max-w-5xl space-y-2 sm:space-y-6">
          <div className="space-y-1 sm:space-y-2 text-center mx-auto max-w-3xl">
            <h1 className="text-2xl sm:text-5xl font-bold tracking-tight text-white">
              What's in my{" "}
              <span className="bg-gradient-gear bg-clip-text text-transparent">Backpack</span>
            </h1>
            <div className="mt-3 sm:mt-8 space-y-2 sm:space-y-3 text-[15px] sm:text-lg text-neutral-300 leading-relaxed text-left sm:text-justify max-w-4xl mx-auto">
              <p>
                Utilizzo droni diversi a seconda del contesto e a ciò che la scena richiede.
              </p>
              <p>
                Per riprese cinematiche utilizzo un drone stabilizzato con gimbal a tre assi,
                ideale per viste dall'alto, panoramiche e primi piani stabili e definiti.
              </p>
              <p>
                Per riprese dinamiche e immersive, quando serve energia e un punto di vista impossibile per un drone tradizionale,
                uso un drone FPV che permette passaggi precisi, inseguimenti e prospettive ravvicinate e adrenaliniche.
              </p>
            </div>
          </div>

          <div className="grid gap-2 sm:gap-6 sm:grid-cols-2 mx-auto max-w-5xl items-start">
            {gear.map((item) => {
              const isExpanded = expandedCards.includes(item.title);
              return (
                <div
                  key={item.title}
                  id={`gear-${item.title}`} // Unique ID for scrolling
                  className={`group relative rounded-3xl border border-white/5 bg-white/5 transition-all duration-500 ${
                    isExpanded ? "bg-white/10 border-white/10" : "hover:bg-white/8 hover:border-white/8"
                  }`}
                >
                  {!isExpanded && (
                    <button
                      onClick={() => toggleGear(item.title)}
                      className="w-full p-3 sm:p-6 flex flex-col items-center gap-3 sm:gap-6 text-center cursor-pointer"
                    >
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
                    <div className="p-3 sm:p-6 flex flex-col items-center text-center gap-3 sm:gap-6 animate-fade-in">
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

                        <div className="flex flex-col gap-2 sm:gap-3 pt-2 w-full sm:w-auto">
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
                            Hide
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
