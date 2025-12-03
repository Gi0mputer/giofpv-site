"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroVideo() {
    return (
        <section className="relative w-full flex flex-col items-center px-0 md:px-6 pt-24 pb-4 md:h-screen md:pt-[70px] md:pb-6 md:justify-between bg-neutral-950">
            {/* Centered Video Container */}
            <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-lg shadow-xl shadow-black/30 z-10" style={{ aspectRatio: '16/9' }}>
                <iframe
                    src="https://www.youtube.com/embed/kddVKHFSUAw?autoplay=1&mute=1&controls=1&loop=1&playlist=kddVKHFSUAw&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Hero Video"
                />
            </div>

            {/* Scroll Down Button - Pushed to bottom by justify-between */}
            <div className="hidden md:flex animate-bounce z-20">
                <Link
                    href="#gallery"
                    className="text-white/40 hover:text-amber-400 transition-all duration-300 hover:scale-110"
                >
                    <ChevronDown size={32} strokeWidth={1.5} />
                </Link>
            </div>
        </section>
    );
}
