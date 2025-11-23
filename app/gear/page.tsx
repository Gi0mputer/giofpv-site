// app/gear/page.tsx
import { gear } from "@/data/gear";
import Image from "next/image";

export default function GearPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-28 pb-12 px-6 lg:pt-32 lg:pb-32 lg:px-24">
      <div className="w-full max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 lg:gap-24 items-start">

        {/* Left Column: Header & Intro */}
        <section className="space-y-6 lg:sticky lg:top-24">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              What's in my{" "}
              <span className="bg-[linear-gradient(to_right,#a855f7_0%,#7c3aed_50%,#d946ef_100%)] bg-clip-text text-transparent">Backpack</span>
            </h1>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
            <p>
              Due piattaforme principali per coprire il 90% dei progetti: un drone compatto da viaggio
              per riprese pulite in 4K e un sistema FPV per voli dinamici in prima persona.
            </p>
          </div>
        </section>

        {/* Right Column: Gear List */}
        <div className="space-y-4">
          {gear.map((item, index) => (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-white/5 bg-white/5 p-4 sm:p-6 transition-all hover:bg-white/10 hover:border-white/10 flex items-center gap-4"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/5 overflow-hidden group-hover:scale-110 transition-transform">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-white group-hover:text-sunset-amber transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
