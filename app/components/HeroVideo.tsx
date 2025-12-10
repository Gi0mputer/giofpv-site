"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useVideoContext } from "../context/VideoContext";
import { useEffect, useRef } from "react";

// #region Component
export function HeroVideo() {
    const { activeVideoId } = useVideoContext();
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (!iframeRef.current?.contentWindow) return;

        if (activeVideoId) {
            // Someone else is playing -> Pause Hero
            iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } else {
            // No one is playing -> Resume Hero (if intended to be always loop)
            iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
    }, [activeVideoId]);

    return (
        <section className="relative w-full flex flex-col items-center pt-24 pb-6 md:p-0 md:h-[100svh] md:justify-center bg-neutral-950 overflow-hidden">

            {/* #region Video Container */}
            {/* 
                DESKTOP BEHAVIOR (md+):
                - Centered in the available space.
                - Max Width: Increased to 7xl for larger impact.
                - Max Height: constrained to calc(100vh - ~180px) to ensure room for Header (top) and Arrow (bottom).
                - Aspect Ratio triggers resizing if height limit is hit first.
                
                MOBILE BEHAVIOR (default):
                - Top aligned (via section padding)
                - Width 100% (minus margins)
                - Height auto (aspect ratio)
            */}
            <div
                className="relative aspect-video rounded-xl shadow-2xl shadow-black/50 z-10 mx-4 md:mx-0 overflow-hidden bg-black"
                style={{
                    // Robust "Contain" Logic for CSS:
                    // 1. Mobile: Default to width-based sizing (100% of container).
                    // 2. Desktop: Calculate width based on the AVAILABLE HEIGHT to ensure 16:9 ratio is never broken.
                    //    If the calculated width (Height * 1.77) is wider than screen, min() falls back to 100%.
                    //    max-w-7xl caps it for ultra-wide screens.
                    width: 'var(--hero-width, 100%)',
                } as React.CSSProperties}
            >
                <style jsx>{`
                    @media (min-width: 768px) {
                        div {
                            --hero-width: min(100%, min(80rem, calc((100vh - 180px) * 1.7777)));
                        }
                    }
                `}</style>
                <iframe
                    ref={iframeRef}
                    src="https://www.youtube.com/embed/kddVKHFSUAw?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=1&playlist=kddVKHFSUAw&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
                    className="absolute inset-0 h-full w-full object-cover"
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
                    className="text-white/40 hover:text-work-accent transition-all duration-300 hover:scale-110"
                >
                    <ChevronDown size={32} strokeWidth={1.5} />
                </Link>
            </div>
            {/* #endregion */}
        </section>
    );
}
// #endregion
