// app/work/page.tsx
import { WorkGallery } from "./WorkGallery";
import { works } from "@/data/work";
import { HeroVideo } from "../components/HeroVideo";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-neutral-950 lg:pt-16">
      <HeroVideo />

      <div id="gallery" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sunset-orange via-[#fa991d] via-sunset-amber via-sunset-sky to-sunset-violet">Projects</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-sm">
            Riprese aeree FPV e stabilizzate
          </p>
        </div>

        <WorkGallery items={works} initialVisible={4} />
      </div>
    </main>
  );
}
