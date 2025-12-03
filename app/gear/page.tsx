// app/gear/page.tsx
import { gear } from "@/data/gear";
import Image from "next/image";

export default function GearPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-24 pb-12 px-6 lg:pt-20 lg:pb-12 lg:px-24 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8 lg:space-y-12">

        {/* Header & Intro - Centered Header, Left Text */}
        <section className="space-y-4 mx-auto max-w-4xl">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              What's in my{" "}
              <span className="bg-gradient-gear bg-clip-text text-transparent">Backpack</span>
            </h1>
          </div>

          <div className="space-y-6 text-sm sm:text-lg text-neutral-300 leading-relaxed">
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
        </section>

        {/* Gear List - Grid Side-by-Side */}
        {/* Gear List - Vertical List for more space */}
        <div className="grid gap-6 grid-cols-1">
          {gear.map((item, index) => (
            <div
              key={item.title}
              className="group relative rounded-3xl border border-white/5 bg-white/5 p-6 md:p-8 transition-all hover:bg-white/10 hover:border-white/10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8"
            >
              {/* Icon with Colored Border */}
              <div className="flex h-24 w-24 md:h-32 md:w-32 shrink-0 items-center justify-center rounded-full bg-neutral-900 overflow-hidden group-hover:scale-105 transition-transform border-2 border-sunset-violet/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-3 flex flex-col items-center md:items-start flex-grow">
                <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-sunset-amber transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Responsive Links */}
                {/* Responsive Links */}
                <div className="pt-2">
                  {/* Mobile Link */}
                  <a
                    href={item.links.mobile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:hidden inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
                  >
                    See on YouTube
                  </a>
                  {/* Desktop Link */}
                  <a
                    href={item.links.desktop}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
                  >
                    See on YouTube
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
