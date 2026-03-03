"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

export interface DemoControls {
    play: () => void;
    reset: () => void;
}

const SpeedRampDemo = forwardRef<DemoControls>((props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const ballRef = useRef<HTMLDivElement>(null);
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

            // Slow -> Fast -> Slow
            tl.to(ballRef.current, {
                x: 100,
                duration: 2,
                ease: "power1.in", // Slow start
            })
                .to(ballRef.current, {
                    x: 300,
                    duration: 0.2,
                    ease: "none", // Fast middle
                })
                .to(ballRef.current, {
                    x: 400,
                    duration: 2,
                    ease: "power1.out", // Slow end
                });

            timelineRef.current = tl;
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col justify-center px-12 bg-white dark:bg-black transition-colors duration-500">
            <div className="relative h-1 bg-black/10 dark:bg-white/10 w-full max-w-md mx-auto">
                <div
                    ref={ballRef}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-black dark:bg-white rounded-full"
                />
            </div>
            <div className="flex justify-between w-full max-w-md mx-auto mt-4 text-[10px] font-mono tracking-widest opacity-50">
                <span>SLOW</span>
                <span>FAST</span>
                <span>SLOW</span>
            </div>
        </div>
    );
});

SpeedRampDemo.displayName = "SpeedRampDemo";

export default SpeedRampDemo;
