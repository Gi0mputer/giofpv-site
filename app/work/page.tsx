"use client";

import { WorkGallery } from "./WorkGallery";
import { works } from "@/data/work";
import { HeroVideo } from "../components/HeroVideo";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-0">
      <HeroVideo />
      <div id="gallery" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-2 sm:py-4 mt-6 lg:mt-2 space-y-4 animate-fade-in scroll-mt-15" style={{ animationDelay: "0.5s" }}>
        <div className="text-center space-y-1 mb-8 lg:mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            <span className="bg-[linear-gradient(to_right,#fbbf24_0%,#f59e0b_100%)] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-sm">
            Riprese aeree FPV e stabilizzate
          </p>
        </div>
        <WorkGallery items={works} initialVisible={0} />
      </div>
    </main>
  );
}
