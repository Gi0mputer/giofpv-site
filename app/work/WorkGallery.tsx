"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { WorkItem } from "@/data/work";

type Props = {
  items: WorkItem[];
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
      <Image
        fill
        alt={work.title}
        src={work.thumb}
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes={
          isVertical
            ? "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-medium text-neutral-200 backdrop-blur-sm">
        {work.duration}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
        <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
          ▶ Play
        </span>
      </div>

      {/* Info overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-[10px] uppercase tracking-widest text-amber-400 mb-1">
          {work.category}
        </div>
        <h3 className={`font-semibold leading-tight text-white ${isVertical ? "text-sm" : "text-lg"}`}>
          {work.title}
        </h3>
      </div>
    </div>
  );
}

export function WorkGallery({ items }: Props) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );

  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(6);

  const filtered = items.filter((item) =>
    category === "All" ? true : item.category === category
  );

  const canLoadMore = visible < filtered.length;
  const videoCountLabel = `${filtered.length} ${filtered.length === 1 ? "video selezionato" : "video selezionati"
    }`;
  const currentCategoryLabel =
    category === "All" ? "Tutti i video" : `Categoria: ${category}`;

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full border border-white/15 px-4 py-2 text-neutral-200">
            {currentCategoryLabel}
          </span>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setVisible(6);
            }}
            className="rounded-full border border-white/15 bg-neutral-900/80 px-3 py-2 text-neutral-100 shadow-sm focus:border-amber-400 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-neutral-900">
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs text-neutral-500" aria-live="polite">
          {videoCountLabel}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-neutral-900/80 p-6 text-center text-neutral-200">
          <p className="text-lg font-semibold">Nessun video per questa categoria.</p>
          <p className="mt-2 text-sm text-neutral-400">
            Prova a selezionare un altro filtro per vedere altri voli FPV.
          </p>
          <button
            type="button"
            onClick={() => setCategory("All")}
            className="mt-4 rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:border-white/60"
          >
            Torna a tutti i video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.slice(0, visible).map((work) => {
            const isVertical = work.format === "vertical";
            return (
              <article
                key={work.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 shadow-lg ${isVertical ? "col-span-1 row-span-2" : "col-span-2"
                  }`}
              >
                <VideoCard work={work} />
              </article>
            );
          })}
        </div>
      )}

      {canLoadMore && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setVisible((prev) => prev + 3)}
            className="rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-white transition hover:border-white/60"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
