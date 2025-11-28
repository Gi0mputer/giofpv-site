// app/gear/page.tsx
import { gear } from "@/data/gear";
import Image from "next/image";

export default function GearPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-24 pb-12 px-6 lg:pt-20 lg:pb-12 lg:px-24 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-8 lg:space-y-12">

        {/* Header & Intro - Centered */}
        <section className="space-y-4 text-center mx-auto max-w-2xl">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              What's in my{" "}
              <span className="bg-gradient-gear bg-clip-text text-transparent">Backpack</span>
            </h1>
          </div>

          <div className="space-y-4 text-sm sm:text-lg text-neutral-300 leading-relaxed">
            <p>
              Due piattaforme principali per coprire il 90% dei progetti: un drone compatto da viaggio
              per riprese pulite in 4K e un sistema FPV per voli dinamici in prima persona.
            </p>
          </div>
        </section>

        {/* Gear List - Grid Side-by-Side */}
        <div className="grid gap-4 md:grid-cols-2">
          {gear.map((item, index) => (
            <div
              key={item.title}
              className="group relative rounded-3xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-white/10 flex flex-col items-center text-center gap-4"
            >
              {/* Icon with Colored Border */}
              <div className="flex h-20 w-20 lg:h-32 lg:w-32 shrink-0 items-center justify-center rounded-full bg-neutral-900 overflow-hidden group-hover:scale-105 transition-transform border-2 border-sunset-violet/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-3 flex flex-col items-center">
                <h2 className="text-lg sm:text-xl font-semibold text-white group-hover:text-sunset-amber transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-4">
                  {item.description}
                </p>

                {/* Responsive Links */}
                <div className="pt-2">
                  {/* Mobile Link */}
                  <a
                    href={item.links.mobile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:hidden text-sunset-violet hover:text-sunset-fuchsia underline underline-offset-4 text-sm font-medium transition-colors"
                  >
                    Per saperne di più
                  </a>
                  {/* Desktop Link */}
                  <a
                    href={item.links.desktop}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-block text-sunset-violet hover:text-sunset-fuchsia underline underline-offset-4 text-sm font-medium transition-colors"
                  >
                    Per saperne di più
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
