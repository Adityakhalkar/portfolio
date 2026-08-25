"use client";
import React from "react";
import { usePathname } from "next/navigation";

/* This used to be a live <feTurbulence> filter painted across the whole
   viewport under mix-blend-overlay. The browser had to re-run the filter and
   re-blend the full screen on every scroll frame, which was one of the two
   main sources of dropped frames. The noise is now baked into a small tiled
   PNG, so the overlay costs one composited layer and nothing per frame. */
export default function GrainOverlay() {
    const pathname = usePathname();
    if (pathname?.startsWith("/templates/")) return null;

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[9990] opacity-[0.035]"
            style={{
                backgroundImage: "url(/noise.png)",
                backgroundRepeat: "repeat",
                backgroundSize: "160px 160px",
                transform: "translateZ(0)",
                willChange: "transform",
            }}
        />
    );
}
