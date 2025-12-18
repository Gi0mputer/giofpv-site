"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type VideoContextType = {
    activeVideoId: string | null;
    setActiveVideoId: (id: string | null) => void;

    // Fullscreen Mode State
    isFullscreen: boolean;
    setIsFullscreen: (v: boolean) => void;
    fullscreenIndex: number;
    setFullscreenIndex: (i: number) => void;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenIndex, setFullscreenIndex] = useState(0);

    return (
        <VideoContext.Provider value={{
            activeVideoId, setActiveVideoId,
            isFullscreen, setIsFullscreen,
            fullscreenIndex, setFullscreenIndex
        }}>
            {children}
        </VideoContext.Provider>
    );
}

export function useVideoContext() {
    const context = useContext(VideoContext);
    if (context === undefined) {
        throw new Error("useVideoContext must be used within a VideoProvider");
    }
    return context;
}
