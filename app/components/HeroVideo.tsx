"use client";

export function HeroVideo() {
    return (
        <div className="relative h-[100svh] w-full overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <iframe
                    src="https://www.youtube.com/embed/kddVKHFSUAw?autoplay=1&mute=1&controls=0&loop=1&playlist=kddVKHFSUAw&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080"
                    className="h-full w-full object-cover scale-150 pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                {/* Overlay to darken video for text readability */}
                <div className="absolute inset-0 bg-black/40" />
                {/* Pattern Overlay to reduce graininess perception */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                {/* Gradient overlay at bottom to blend with content */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
            </div>

            {/* Content - Minimal or removed as requested */}
            <div className="relative z-10 flex h-full flex-col items-center justify-end pb-20 text-center px-4 pointer-events-none">
                {/* Optional: Minimal indicator or arrow could go here, but keeping it clean for now */}
            </div>
        </div>
    );
}
