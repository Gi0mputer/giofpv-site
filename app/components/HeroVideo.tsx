"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroVideo() {
    return (
        <div className="relative w-full pt-16 pb-4">
            {/* Compact Video Container */}
            <div className="relative aspect-video w-full max-w-5xl mx-auto overflow-hidden rounded-lg">
                <iframe
                    src="https://www.youtube.com/embed/kddVKHFSUAw?autoplay=1&mute=1&controls=1&loop=1&playlist=kddVKHFSUAw&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Hero Video"
                />
            </div>

            {/* Scroll Down Button - Minimal Chevron (Desktop Only) */}
            <div className="hidden lg:flex justify-center mt-4 animate-bounce">
                <Link
                    href="#gallery"
                    className="text-white/40 hover:text-amber-400 transition-all duration-300 hover:scale-110"
                >
                    <ChevronDown size={32} strokeWidth={1.5} />
                </Link>
            </div>
        </div>
    );
}
