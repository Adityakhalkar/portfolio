"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

export interface DemoControls {
    play: () => void;
    reset: () => void;
}

const CinemagraphDemo = forwardRef<DemoControls>((props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useImperativeHandle(ref, () => ({
        play: () => {
            if (timelineRef.current) {
                timelineRef.current.restart();
            }
        },
        reset: () => {
            if (timelineRef.current) {
                timelineRef.current.pause(0);
            }
        },
    }));

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, yoyo: true });

            // Subtle, breathing animation
            tl.to(overlayRef.current, {
                opacity: 0.4,
                scale: 1.1,
                duration: 4,
                ease: "sine.inOut",
            });

            timelineRef.current = tl;
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-black overflow-hidden relative">
            {/* Static Base Image (Simulated) */}
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                <div className="w-64 h-64 border border-white/10 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/5 rounded-full" />
                </div>
            </div>

            {/* Animated "Alive" Region */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-10 pointer-events-none"
                style={{ mixBlendMode: "overlay" }}
            />

            <div className="absolute bottom-8 text-center">
                <div className="text-white text-[10px] tracking-[0.5em] font-mono opacity-50">LIVING STILL</div>
            </div>
        </div>
    );
});

CinemagraphDemo.displayName = "CinemagraphDemo";

export default CinemagraphDemo;
