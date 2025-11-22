// app/work/page.tsx
import { WorkGallery } from "./WorkGallery";
import { works } from "@/data/work";
import { HeroVideo } from "../components/HeroVideo";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-neutral-950 lg:pt-16">
      <HeroVideo />

      <div id="gallery" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <div className="text-center space-y-3 mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">Portfolio</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-amber to-sunset-orange">Projects</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base">
            Una selezione dei migliori lavori realizzati con droni FPV e stabilizzati.
          </p>
        </div>

        <WorkGallery items={works} initialVisible={4} />
      </div>
    </main>
  );
}
