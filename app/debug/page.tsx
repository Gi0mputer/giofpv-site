"use client";

import { useEffect, useState } from "react";

export default function DebugPage() {
    const [info, setInfo] = useState<Record<string, string | number>>({});

    useEffect(() => {
        const updateInfo = () => {
            setInfo({
                "Window Inner (Viewport)": `${window.innerWidth} x ${window.innerHeight}`,
                "Window Outer": `${window.outerWidth} x ${window.outerHeight}`,
                "Screen Resolution": `${screen.width} x ${screen.height}`,
                "Screen Available": `${screen.availWidth} x ${screen.availHeight}`,
                "Device Pixel Ratio": window.devicePixelRatio,
                "User Agent": navigator.userAgent,
            });
        };

        updateInfo();
        window.addEventListener("resize", updateInfo);
        return () => window.removeEventListener("resize", updateInfo);
    }, []);

    return (
        <main className="min-h-screen p-8 bg-black text-white font-mono text-sm">
            <h1 className="text-xl font-bold mb-4 text-amber-400">Debug Dimensions</h1>
            <p className="mb-6 text-neutral-400">
                Apri questa pagina sui due PC diversi e confronta i valori.
                <br />
                Se "Device Pixel Ratio" è diverso da 1, significa che c'è uno zoom attivo
                (o dalle impostazioni di Windows o dal browser).
            </p>

            <div className="grid gap-2 max-w-2xl">
                {Object.entries(info).map(([key, value]) => (
                    <div key={key} className="flex border-b border-neutral-800 py-2">
                        <span className="w-48 text-neutral-500">{key}</span>
                        <span className="flex-1 font-bold">{value}</span>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 border border-amber-500/30 rounded bg-amber-950/20 text-amber-200">
                <h2 className="font-bold mb-2">Cosa controllare:</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <strong>Device Pixel Ratio:</strong> Se è 1.25, 1.5, etc., windows sta scalando l'interfaccia.
                        Il sito avrà meno "pixel CSS" a disposizione (vedi Window Inner).
                    </li>
                    <li>
                        <strong>Window Inner:</strong> Questa è la larghezza effettiva che il sito "vede".
                        Se è sotto 1024px, il sito potrebbe passare alla versione tablet/mobile.
                    </li>
                </ul>
            </div>
        </main>
    );
}
