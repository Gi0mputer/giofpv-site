"use client";

import { gear } from "@/data/gear";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

export default function AboutPage() {
  // State to toggle ALL gear items at once
  const [isGearExpanded, setIsGearExpanded] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  const toggleGear = () => {
    const newState = !isGearExpanded;
    setIsGearExpanded(newState);

    // If expanding, scroll to position the CARDS nicely (not the title)
    if (newState && cardsRef.current) {
      setTimeout(() => {
        const yOffset = -20; // Small offset to not cut off top border
        const element = cardsRef.current;
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <main className="bg-neutral-950">
      {/* =========================================
          SECTION 1: BIO (About)
         ========================================= */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-12 px-6 relative">
        <div className="w-full max-w-5xl mx-auto">
          {/* Title - Compact spacing */}
          <div className="space-y-2 text-center mb-6 sm:mb-10">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-about bg-clip-text text-transparent">Aerial & FPV</span>
              <span className="text-white"> Filmmaker</span>
            </h1>
          </div>

          {/* Text Container with Floats */}
          <div className="text-base sm:text-lg text-neutral-300 leading-normal sm:leading-relaxed max-w-4xl mx-auto clearfix relative">

            {/* 1. Profile Pic - Top Right (Float Right) */}
            <div className="float-right ml-4 mb-1 mt-1 lg:ml-12 lg:mb-6 shape-circle">
              <div className="w-28 h-28 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-sunset-sky/30 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] bg-neutral-900 relative z-10">
                <Image
                  src="/profilepic.png"
                  alt="Giovanni Fantoni"
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Paragraph 1 */}
            <p className="mb-4 sm:mb-6">
              Mi chiamo Giovanni Fantoni e sono un videomaker e pilota di droni.
              <br />
              Da sempre ho una grande curiosità e desiderio di esplorare, già da piccolo mi affascinava l'idea di vedere le cose dall'alto, da una prospettiva diversa rispetto a quella a cui siamo abituati.
            </p>

            {/* Paragraph 2 */}
            <p className="mb-6">
              Sono appassionato di tecnologia, mi sono laureato in Informatica e in parallelo ho sempre coltivato una grande passione per l'outdoor, gli sport all'aperto e la natura.
              <br />
              Quando il mondo dei droni ha iniziato a evolversi, ho trovato in questa tecnologia il punto d'incontro perfetto tra le mie passioni.
            </p>

            {/* 2. Logo - Bottom Left (Float Left) - Inserted before last paragraph */}
            <div className="float-left mr-6 mt-2 lg:mr-12 lg:mt-12 shape-circle">
              <div className="w-28 h-28 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-sunset-sky/30 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] bg-neutral-900 relative z-10">
                <Image
                  src="/icon.png"
                  alt="GioFPV Logo"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Paragraph 2 */}
            <p className="mb-4 sm:mb-6">
              Sono appassionato di tecnologia, mi sono laureato in Informatica e in parallelo ho sempre coltivato una grande passione per l'outdoor e la natura.
              <br className="hidden sm:block" />
              Quando il mondo dei droni ha iniziato a evolversi, ho trovato in questa tecnologia il punto d'incontro perfetto tra le mie passioni.
            </p>

            {/* Paragraph 3 */}
            <p>
              Negli anni ho continuato ad aggiornarmi e sperimentare, fino ad avvicinarmi anche al volo FPV, che mi ha aperto nuove possibilità creative.
              Oggi realizzo riprese aeree pensate per mostrare ogni luogo dal suo punto di vista più interessante.
            </p>
          </div>
        </div>

        {/* Scroll Indicator - Positioned to ensure visibility */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex animate-bounce z-10">
          <Link
            href="#gear"
            className="text-white/40 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronDown size={32} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* =========================================
          SECTION 2: GEAR
         ========================================= */}
      <section
        id="gear"
        className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 bg-neutral-950 scroll-mt-0"
      >
        <div className="w-full max-w-5xl space-y-6 sm:space-y-8">
          {/* Header & Intro */}
          <div className="space-y-4 text-center mx-auto max-w-3xl">
            <h2 className="text-2xl sm:text-5xl font-bold tracking-tight text-white">
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
          <div ref={cardsRef} className="grid gap-4 sm:gap-6 sm:grid-cols-2 mx-auto max-w-5xl">
            {gear.map((item, index) => {
              return (
                <div
                  key={item.title}
                  className={`group relative rounded-3xl border border-white/5 bg-white/5 transition-all duration-500 ${isGearExpanded ? "bg-white/10 border-white/10" : "hover:bg-white/8 hover:border-white/8"
                    }`}
                >
                  {/* Collapsed State */}
                  {!isGearExpanded && (
                    <button
                      onClick={toggleGear}
                      className="w-full p-4 sm:p-8 flex flex-col items-center gap-4 sm:gap-6 text-center cursor-pointer"
                    >
                      <div className="flex h-20 w-20 sm:h-32 sm:w-32 shrink-0 items-center justify-center rounded-full bg-neutral-900 overflow-hidden group-hover:scale-105 transition-transform border-2 border-sunset-violet/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-sunset-violet transition-colors">
                        {item.title}
                      </h3>
                      <div className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-medium text-white transition-all group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105">
                        See more
                      </div>
                    </button>
                  )}

                  {/* Expanded State */}
                  {isGearExpanded && (
                    <div className="p-4 sm:p-8 flex flex-col items-center text-center gap-4 sm:gap-6 animate-fade-in">
                      <div className="flex h-24 w-24 sm:h-32 sm:w-32 shrink-0 items-center justify-center rounded-full bg-neutral-900 overflow-hidden transition-transform border-2 border-sunset-violet/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
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
                            onClick={toggleGear}
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
