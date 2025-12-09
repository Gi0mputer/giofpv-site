"use client";

// #region Imports
import Link from "next/link";
import { ChevronDown } from "lucide-react";
// #endregion

// #region Component
export function HeroVideo() {
    return (
        <section className="relative w-full h-[100svh] flex flex-col items-center justify-center bg-neutral-950 overflow-hidden">

            {/* #region Video Container */}
            {/* 
                DESKTOP BEHAVIOR:
                - Centered in the available space.
                - Max Width: Increased to 7xl for larger impact.
                - Max Height: constrained to calc(100vh - ~180px) to ensure room for Header (top) and Arrow (bottom).
                - Aspect Ratio triggers resizing if height limit is hit first.
            */}
            <div
                className="relative w-full max-w-6xl aspect-video rounded-xl shadow-2xl shadow-black/50 z-10 mx-4 md:mx-0
                           max-h-[60vh] md:max-h-[calc(100svh-180px)]"
            >
                <iframe
                    src="https://www.youtube.com/embed/kddVKHFSUAw?autoplay=1&mute=1&controls=0&loop=1&playlist=kddVKHFSUAw&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
                    className="absolute inset-0 h-full w-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Hero Video"
                />
            </div>
            {/* #endregion */}

            {/* #region Scroll Button */}
            {/* Absolute positioning ensures it stays at the bottom regardless of video aspect ratio scaling */}
            <div className="absolute bottom-8 hidden md:flex animate-bounce z-20">
                <Link
                    href="#gallery"
                    className="text-white/40 hover:text-amber-400 transition-all duration-300 hover:scale-110"
                >
                    <ChevronDown size={32} strokeWidth={1.5} />
                </Link>
            </div>
            {/* #endregion */}
        </section>
    );
}
// #endregion
