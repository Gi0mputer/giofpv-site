"use client";

import { FaChevronDown } from "react-icons/fa";

export function HeroVideo() {
    return (
        <div className="relative h-[100svh] w-full lg:max-w-[1400px] lg:mx-auto lg:border-x lg:border-white/30 lg:shadow-2xl overflow-hidden flex flex-col lg:block bg-black">
            {/* Video Background / Top Section on Mobile */}
            <div className="relative h-[75%] lg:h-full w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <iframe
                        src="https://www.youtube.com/embed/kddVKHFSUAw?autoplay=1&mute=1&controls=0&loop=1&playlist=kddVKHFSUAw&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080"
                        className="h-full w-full object-cover scale-125 pointer-events-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    {/* Overlay to darken video for text readability */}
                    <div className="absolute inset-0 bg-black/30" />
                    {/* Gradient overlay at bottom to blend with content */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
                </div>
            </div>

            {/* Mobile Bottom Section (CTA) */}
            <div className="relative z-10 flex h-[25%] lg:hidden flex-col items-center justify-center text-center px-4 bg-neutral-950">
                <p className="text-neutral-400 text-sm uppercase tracking-widest mb-2">Explore the World</p>
                <h1 className="text-2xl font-bold text-white mb-4">Cinematic FPV</h1>
                <div className="animate-bounce">
                    <FaChevronDown className="text-sunset-amber h-6 w-6" />
                </div>
            </div>

            {/* Desktop Overlay Content (Hidden on Mobile) */}
            <div className="hidden lg:flex absolute inset-0 z-10 flex-col items-center justify-end pb-12 pointer-events-none">
                <div className="animate-bounce">
                    <FaChevronDown className="text-white/50 h-8 w-8" />
                </div>
            </div>
        </div>
    );
}
