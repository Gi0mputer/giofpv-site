"use client";

// #region Imports
import Image from "next/image";
import { useState } from "react";
import type { WorkItem } from "@/data/work";
// #endregion

// #region Types & Helpers
type Props = {
  items: WorkItem[];
  initialVisible?: number;
};

function getYoutubeId(url: string) {
  // Regex for standard, shorts, and embed URLs
  const regex = /(?:youtube\.com\/(?:shorts\/|(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
// #endregion

// #region Components

// -----------------------------------------------------------------------------
// VideoCard
// -----------------------------------------------------------------------------
function VideoCard({ work }: { work: WorkItem }) {
  // #region Logic
  const [isPlaying, setIsPlaying] = useState(false);
  const isVertical = work.format === "vertical";
  const videoId = getYoutubeId(work.href);

  const isPlaceholder = work.href.includes('PLACEHOLDER');
  const thumbnailUrl = !isPlaceholder && videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "/portfolio/city-night.png";
  // #endregion

  // #region Render (Active Player)
  if (isPlaying && videoId) {
    return (
      <div className={`relative w-full bg-black ${isVertical ? "aspect-[9/16]" : "aspect-video"}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={work.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }
  // #endregion

  // #region Render (Thumbnail)
  return (
    <div
      onClick={() => setIsPlaying(true)}
      className={`relative w-full cursor-pointer ${isVertical ? "aspect-[9/16]" : "aspect-video"}`}
    >
      <Image fill alt={work.title} src={thumbnailUrl}
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes={isVertical ? "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-medium text-neutral-200 backdrop-blur-sm">{work.duration}</div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
        <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">▶ Play</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-[10px] uppercase tracking-widest text-sunset-sky mb-1">{work.category}</div>
        <h3 className={`font-semibold leading-tight text-white ${isVertical ? "text-sm" : "text-lg"}`}>{work.title}</h3>
      </div>
    </div>
  );
  // #endregion
}

// -----------------------------------------------------------------------------
// WorkGallery
// -----------------------------------------------------------------------------
export function WorkGallery({ items, initialVisible }: Props) {
  // #region Data Processing
  const verticalVideos = items.filter(item => item.format === "vertical");
  const horizontalVideos = items.filter(item => item.format === "horizontal");
  const [visibleHorizontal, setVisibleHorizontal] = useState(initialVisible || 0);

  const actuallyVisibleCount = Math.min(visibleHorizontal, horizontalVideos.length);
  const canLoadMore = actuallyVisibleCount < horizontalVideos.length;
  // #endregion

  // #region Handlers
  const handleLoadMore = () => {
    setVisibleHorizontal((prev) => prev + 4); // Load 4 videos at a time
    setTimeout(() => {
      const horizontalSection = document.getElementById('horizontal-section');
      if (horizontalSection) {
        const headerHeight = 56;
        const elementPosition = horizontalSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 200);
  };
  // #endregion

  // #region Render
  return (
    <section className="space-y-4">
      {/* Verticals Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {verticalVideos.map((work) => (
          <article key={work.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 shadow-lg">
            <VideoCard work={work} />
          </article>
        ))}
      </div>

      {/* Horizontals Grid */}
      {visibleHorizontal > 0 && (
        <div id="horizontal-section" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {horizontalVideos.slice(0, visibleHorizontal).map((work) => (
            <article key={work.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 shadow-lg">
              <VideoCard work={work} />
            </article>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {canLoadMore && (
        <div className="flex justify-center pt-6 mb-5">
          <button type="button" onClick={handleLoadMore}
            className="rounded-full border border-sunset-sky/40 px-6 py-2 text-sm font-medium text-sunset-sky transition hover:border-sunset-sky hover:text-white hover:bg-sunset-sky/10">
            See more
          </button>
        </div>
      )}
    </section>
  );
  // #endregion
}
// #endregion
