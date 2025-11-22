"use client";

import { FaChevronDown } from "react-icons/fa";

export function HeroVideo() {
    return (
        <div className="relative h-[100svh] lg:h-[85svh] w-full lg:max-w-[1400px] lg:mx-auto overflow-hidden flex flex-col lg:block bg-black mt-16 lg:mt-0">
            {/* Video Background */}
            <div className="relative h-[88%] lg:h-full w-full overflow-hidden">
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
                className="relative z-10 flex h-[12%] lg:hidden flex-col items-center justify-center text-center px-4 bg-neutral-950 cursor-pointer"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Guarda lavori</p>
                <div className="animate-bounce">
                    <FaChevronDown className="text-neutral-600 h-4 w-4" />
                </div>
            </div>
        </div>
    );
}
