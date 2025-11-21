"use client";

export function HeroVideo() {
    return (
        <div className="relative h-[80vh] w-full overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <iframe
                    src="https://www.youtube.com/embed/y9n6HkftahM?autoplay=1&mute=1&controls=0&loop=1&playlist=y9n6HkftahM&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1"
                    className="h-full w-full object-cover scale-150 pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                {/* Overlay to darken video for text readability */}
                <div className="absolute inset-0 bg-black/40" />
                {/* Gradient overlay at bottom to blend with content */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
                    Cinematic <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-amber to-sunset-orange">FPV</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg sm:text-xl text-neutral-200 drop-shadow-md">
                    Riprese aeree immersive e dinamiche per brand, eventi e turismo.
                    <br className="hidden sm:block" />
                    Prospettive uniche, velocità e precisione.
                </p>

                <div className="mt-10 flex gap-4">
                    <a
                        href="#gallery"
                        className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/20 hover:scale-105"
                    >
                        Esplora i lavori
                    </a>
                    <a
                        href="/contact"
                        className="rounded-full bg-gradient-to-r from-sunset-amber to-sunset-orange px-8 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:shadow-orange-500/40 hover:scale-105"
                    >
                        Contattami
                    </a>
                </div>
            </div>
        </div>
    );
}
