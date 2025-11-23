"use client";

import Image from "next/image";
import { useState } from "react";
import type { WorkItem } from "@/data/work";

type Props = {
  items: WorkItem[];
  initialVisible?: number;
};

function getYoutubeId(url: string) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function VideoCard({ work }: { work: WorkItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isVertical = work.format === "vertical";
  const videoId = getYoutubeId(work.href);

  const isPlaceholder = work.href.includes('PLACEHOLDER');
  const thumbnailUrl = !isPlaceholder && videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "/portfolio/city-night.png";

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
        <div className="text-[10px] uppercase tracking-widest text-amber-400 mb-1">{work.category}</div>
        <h3 className={`font-semibold leading-tight text-white ${isVertical ? "text-sm" : "text-lg"}`}>{work.title}</h3>
      </div>
    </div>
  );
}

export function WorkGallery({ items, initialVisible }: Props) {
  const verticalVideos = items.filter(item => item.format === "vertical");
  const horizontalVideos = items.filter(item => item.format === "horizontal");
  const [visibleHorizontal, setVisibleHorizontal] = useState(initialVisible || 0);

  const actuallyVisibleCount = Math.min(visibleHorizontal, horizontalVideos.length);
  const canLoadMore = actuallyVisibleCount < horizontalVideos.length;

  const handleLoadMore = () => {
    setVisibleHorizontal((prev) => prev + 3);
    setTimeout(() => {
      const section = document.getElementById('horizontal-section');
      section?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {verticalVideos.map((work) => (
          <article key={work.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 shadow-lg">
            <VideoCard work={work} />
          </article>
        ))}
      </div>

      {visibleHorizontal > 0 && (
        <div id="horizontal-section" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {horizontalVideos.slice(0, visibleHorizontal).map((work) => (
            <article key={work.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 shadow-lg">
              <VideoCard work={work} />
            </article>
          ))}
        </div>
      )}

      {canLoadMore && (
        <div className="flex justify-center pt-4">
          <button type="button" onClick={handleLoadMore}
            className="rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-white transition hover:border-amber-400 hover:text-amber-400">
            See more
          </button>
        </div>
      )}
    </section>
  );
}
