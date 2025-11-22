"use client";

import { FaChevronDown } from "react-icons/fa";

export function HeroVideo() {
    return (
        <div className="relative h-[100svh] lg:h-[70svh] w-full lg:max-w-[1400px] lg:mx-auto overflow-hidden flex flex-col lg:block bg-black">
            {/* Video Background / Top Section on Mobile */}
            <div className="relative h-[75%] lg:h-full w-full overflow-hidden group">
                <div className="absolute inset-0 z-0">
                    <iframe
                        src="https://www.youtube.com/embed/kddVKHFSUAw?autoplay=1&mute=1&controls=1&loop=1&playlist=kddVKHFSUAw&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080&disablekb=0"
                        className="h-full w-full object-cover"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    {/* Overlay to darken video for text readability - reduced opacity for interaction */}
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    {/* Gradient overlay at bottom to blend with content */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
                </div>

                {/* Desktop Scroll Indicator (Bubble Design) */}
                <div className="hidden lg:block absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                    {/* Hover detection area - 150px radius (~4cm) */}
                    <div className="relative w-[150px] h-[150px] pointer-events-auto group">
                        {/* Clickable bubble - centered */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] cursor-pointer"
                            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {/* Transparent bubble that becomes visible on hover */}
                            <div className="absolute inset-0 flex items-center justify-center rounded-full border-2 border-white/20 bg-white/5 opacity-0 group-hover:opacity-100 group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300">
                                <FaChevronDown className="text-white h-5 w-5 animate-bounce" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Section (CTA) */}
            <div
                className="relative z-10 flex h-[25%] lg:hidden flex-col items-center justify-center text-center px-4 bg-neutral-950 cursor-pointer"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <p className="text-neutral-400 text-sm uppercase tracking-widest mb-2">Explore the World</p>
                <h1 className="text-2xl font-bold text-white mb-4">Cinematic FPV</h1>
                <div className="animate-bounce">
                    <FaChevronDown className="text-sunset-amber h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
