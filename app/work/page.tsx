"use client";

// #region Imports
import { WorkGallery } from "./WorkGallery";
import { FullScreenPlayer } from "./FullScreenPlayer";
import { works } from "@/data/work";
import { HeroVideo } from "../components/HeroVideo";
import { VideoProvider } from "../context/VideoContext";
// #endregion

// #region Page Component
export default function WorkPage() {
  return (
    <VideoProvider>
      <main className="min-h-screen bg-neutral-950 pt-0">

        <HeroVideo />
        {/* Fullscreen Player Overlay */}
        <FullScreenPlayer items={works.filter(w => w.format === 'vertical')} />
        {/* #endregion */}

        {/* #region Gallery Section */}
        <div id="gallery" className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-2 sm:py-4 mt-4 lg:mt-7 space-y-4 animate-fade-in scroll-mt-15" style={{ animationDelay: "0.5s" }}>
          {/* Ambient Glow - Behind Projects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-work-glow/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-float-slow" />

          {/* Header */}
          <div className="text-center space-y-1 mb-6 lg:mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              <span className="text-gradient-work">Projects</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-sm">
              Riprese aeree FPV e stabilizzate
            </p>
          </div>

          {/* List */}
          <WorkGallery items={works} initialVisible={0} />
        </div>
        {/* #endregion */}

      </main>
    </VideoProvider>
  );
}
// #endregion
