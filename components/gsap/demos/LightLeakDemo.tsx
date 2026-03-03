"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

export interface DemoControls {
    play: () => void;
    reset: () => void;
}

const LightLeakDemo = forwardRef<DemoControls>((props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leakRef = useRef<HTMLDivElement>(null);
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
            const tl = gsap.timeline({ paused: true });

            tl.fromTo(leakRef.current,
                {
                    opacity: 0,
                    scale: 0.5,
                    x: "100%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)"
                },
                {
                    opacity: 1,
                    scale: 2,
                    x: "-50%",
                    duration: 1.5,
                    ease: "power2.inOut"
                }
            )
                .to(leakRef.current, {
                    opacity: 0,
                    duration: 1,
                }, "-=0.5");

            timelineRef.current = tl;
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
            <div className="text-white font-serif text-4xl italic">Memories</div>

            {/* Light Leak Overlay */}
            <div
                ref={leakRef}
                className="absolute inset-0 pointer-events-none mix-blend-screen"
            />
        </div>
    );
});

LightLeakDemo.displayName = "LightLeakDemo";

export default LightLeakDemo;
