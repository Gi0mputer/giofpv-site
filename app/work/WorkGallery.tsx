"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { WorkItem } from "@/data/work";

type Props = {
  items: WorkItem[];
};

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

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full border border-white/15 px-4 py-2 text-neutral-200">All videos</span>
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
        <p className="text-xs text-neutral-500">{filtered.length} video selezionati</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, visible).map((work) => (
          <article
            key={work.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 shadow-lg"
          >
            <div className="relative h-56 w-full">
              <Image
                fill
                alt={work.title}
                src={work.thumb}
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs text-neutral-200">
                {work.duration}
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2">▶ Play video</span>
              </div>
            </div>
            <div className="space-y-2 px-4 py-4">
              <div className="text-xs uppercase tracking-[0.2em] text-amber-300/90">
                {work.category}
              </div>
              <h3 className="text-lg font-semibold leading-tight text-white">{work.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{work.description}</p>
              <Link
                href={work.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-300 transition hover:text-amber-200"
              >
                Guarda su YouTube →
              </Link>
            </div>
          </article>
        ))}
      </div>

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
