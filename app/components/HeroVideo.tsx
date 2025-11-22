"use client";

import { FaChevronDown } from "react-icons/fa";

export function HeroVideo() {
    return (
        <div className="relative h-[100svh] lg:h-[85svh] w-full lg:max-w-[1400px] lg:mx-auto overflow-hidden flex flex-col lg:block bg-black">
            {/* Video Background */}
            <div className="relative h-[75%] lg:h-full w-full overflow-hidden">
                <iframe
                    src="https://www.youtube.com/embed/kddVKHFSUAw?autoplay=1&mute=1&controls=1&loop=1&playlist=kddVKHFSUAw&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Hero Video"
                />
            </div>

            {/* Mobile CTA Section */}
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
