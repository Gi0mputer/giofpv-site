"use client";

import { gear } from "@/data/gear";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

export default function AboutPage() {
  // State to toggle ALL gear items at once
  const [isGearExpanded, setIsGearExpanded] = useState(false);
  const gearSectionRef = useRef<HTMLElement>(null);

  const toggleGear = () => {
    const newState = !isGearExpanded;
    setIsGearExpanded(newState);

    // If expanding, scroll to position the cards nicely
    if (newState && gearSectionRef.current) {
      setTimeout(() => {
        const yOffset = -40; // Offset to leave some space at top
        const element = gearSectionRef.current;
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <main className="bg-neutral-950">
      {/* Section 1: Bio with Floating Bubbles */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-24 px-6 relative">
        <div className="w-full max-w-5xl mx-auto">
          {/* Title */}
          <div className="space-y-3 text-center mb-12">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-about bg-clip-text text-transparent">Aerial & FPV</span>
              <span className="text-white"> Filmmaker</span>
            </h1>
          </div>

          {/* Text Container with Floats */}
          <div className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-4xl mx-auto clearfix">

            {/* Left Bubble - Logo (Desktop) */}
            <div className="hidden lg:block float-left mr-8 mb-4 shape-circle">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-sunset-sky/30 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] bg-neutral-900 relative z-10">
                <Image
                  src="/icon.png"
                  alt="GioFPV Logo"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Right Bubble - Profile (Desktop) */}
            <div className="hidden lg:block float-right ml-8 mb-4 mt-24 shape-circle">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-sunset-sky/30 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] bg-neutral-900 relative z-10">
                <Image
                  src="/profilepic.png"
                  alt="Giovanni Fantoni"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Mobile Bubbles (Centered, not floating) */}
            <div className="lg:hidden flex justify-center gap-6 mb-8">
              <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-sunset-sky/30 shadow-[0_0_30px_-10px_rgba(6,182,212,0.4)] bg-neutral-900 shrink-0">
                <Image src="/icon.png" alt="GioFPV Logo" width={112} height={112} className="object-cover w-full h-full" />
              </div>
              <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-sunset-violet/30 shadow-[0_0_30px_-10px_rgba(168,85,247,0.4)] bg-neutral-900 shrink-0">
                <Image src="/profilepic.png" alt="Giovanni Fantoni" width={112} height={112} className="object-cover w-full h-full" />
              </div>
            </div>

            {/* Paragraphs */}
            <p className="mb-6">
              Mi chiamo Giovanni Fantoni e sono un videomaker e pilota di droni.
              <br />
              Da sempre ho una grande curiosità e desiderio di esplorare, già da piccolo mi affascinava l'idea di vedere le cose dall'alto, da una prospettiva diversa rispetto a quella a cui siamo abituati.
            </p>
            <p className="mb-6">
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
      <section
        id="gear"
        ref={gearSectionRef}
        className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16 bg-neutral-950 scroll-mt-0"
      >
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
          <div className="grid gap-6 sm:grid-cols-2 mx-auto max-w-5xl">
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
                  {isGearExpanded && (
                    <div className="p-6 md:p-8 flex flex-col items-center text-center gap-6 animate-fade-in">
                      <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-neutral-900 overflow-hidden transition-transform border-2 border-sunset-violet/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="space-y-4 flex flex-col items-center flex-grow">
                        <h3 className="text-2xl font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
