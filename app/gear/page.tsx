// app/gear/page.tsx
import { gear } from "@/data/gear";
import { Zap } from "lucide-react";

export default function GearPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-36 pb-24 px-6 lg:pt-32 lg:pb-32 lg:px-24">
      <div className="w-full max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-24 items-start">

        {/* Left Column: Header & Intro */}
        <section className="space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-sunset-amber font-medium">Equipment</p>
            <h1 className="text-3xl sm:text-6xl font-bold tracking-tight text-white">
              What's in my <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">Backpack</span>
            </h1>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
            <p>
              Due piattaforme principali per coprire il 90% dei progetti: un drone compatto da viaggio
              per riprese pulite in 4K e un sistema FPV per voli dinamici in prima persona.
            </p>
            <p>
              Tutto in 4K 60fps, sia in formato orizzontale che verticale, pronto per social, web e campagne digital.
            </p>
          </div>
        </section>

        {/* Right Column: Gear List (No Images) */}
        <div className="space-y-4">
          {gear.map((item, index) => (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sunset-amber/10 text-sunset-amber group-hover:scale-110 transition-transform">
                  <Zap size={16} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white group-hover:text-sunset-amber transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
