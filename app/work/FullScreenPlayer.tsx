"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useVideoContext } from "../context/VideoContext";
import type { WorkItem } from "@/data/work";

type Props = {
    items: WorkItem[];
};

function getYoutubeId(url: string) {
    const regex = /(?:youtube\.com\/(?:shorts\/|(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export function FullScreenPlayer({ items }: Props) {
    const { isFullscreen, setIsFullscreen, fullscreenIndex, setFullscreenIndex, setActiveVideoId } = useVideoContext();
    const containerRef = useRef<HTMLDivElement>(null);

    // Close handler
    const handleClose = () => {
        setIsFullscreen(false);
        setActiveVideoId(null); // Pause everything
    };

    // Scroll to initial index when opening
    useEffect(() => {
        if (isFullscreen && containerRef.current) {
            // Small timeout to allow render
            setTimeout(() => {
                const target = containerRef.current?.children[fullscreenIndex] as HTMLElement;
                if (target) {
                    target.scrollIntoView({ behavior: "instant" });
                }
            }, 50);

            // Lock body scroll
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isFullscreen]); // eslint-disable-line react-hooks/exhaustive-deps

    // Intersection Observer for Autoplay
    useEffect(() => {
        if (!isFullscreen || !containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        setFullscreenIndex(index);
                    }
                });
            },
            { threshold: 0.6 } // Video must be 60% visible
        );

        const children = Array.from(containerRef.current.children);
        children.forEach((child) => observer.observe(child));

        return () => observer.disconnect();
    }, [isFullscreen, setFullscreenIndex]);

    // Handle Swipe/Scroll logic is handled natively by CSS snap-y

    if (!isFullscreen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-end bg-gradient-to-b from-black/80 to-transparent">
                <button
                    onClick={handleClose}
                    className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition backdrop-blur-md"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Videos Container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto snap-y snap-mandatory remove-scrollbar pb- safe-area-bottom"
                style={{ scrollBehavior: 'smooth' }}
            >
                {items.map((work, index) => {
                    const isActive = index === fullscreenIndex;
                    const videoId = getYoutubeId(work.href);

                    return (
                        <div
                            key={work.title}
                            data-index={index}
                            className="h-[100dvh] w-full snap-start relative flex items-center justify-center bg-neutral-950"
                        >
                            {videoId && (
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=${isActive ? 1 : 0}&mute=0&controls=0&loop=1&playlist=${videoId}&rel=0&modestbranding=1&playsinline=1`}
                                    title={work.title}
                                    className="h-full w-full object-cover"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ pointerEvents: 'none' }} // Prevent hijacking scroll
                                />
                            )}

                            {/* Overlay Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
                                <h3 className="text-2xl font-bold text-white mb-2">{work.title}</h3>
                                <p className="text-sm text-neutral-300 line-clamp-2">{work.description}</p>
                                <div className="flex gap-3 mt-4">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#9e3eff] border border-[#9e3eff]/30 px-2 py-1 rounded bg-[#9e3eff]/10">
                                        {work.category}
                                    </span>
                                </div>
                            </div>

                            {/* Next/Prev Hint Arrows (Optional) */}
                            {index < items.length - 1 && isActive && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                                    <ChevronDown className="text-white" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
