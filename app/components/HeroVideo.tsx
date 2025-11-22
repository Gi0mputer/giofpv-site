"use client";

export function HeroVideo() {
    return (
        <div className="relative w-full py-4 lg:py-6">
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
        </div>
    );
}
