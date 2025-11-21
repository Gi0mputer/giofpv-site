// app/work/page.tsx
import { WorkGallery } from "./WorkGallery";
import { works } from "@/data/work";
import { HeroVideo } from "../components/HeroVideo";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <HeroVideo />

      <div id="gallery" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Featured Projects
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Una selezione dei migliori lavori realizzati con droni FPV e stabilizzati.
          </p>
        </div>

        <WorkGallery items={works} />
      </div>
    </main>
  );
}
