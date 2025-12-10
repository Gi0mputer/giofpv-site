"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type VideoContextType = {
    activeVideoId: string | null;
    setActiveVideoId: (id: string | null) => void;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    return (
        <VideoContext.Provider value={{ activeVideoId, setActiveVideoId }}>
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
