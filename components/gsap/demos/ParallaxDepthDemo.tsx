"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface DemoControls {
    play: () => void;
    reset: () => void;
}

const ParallaxDepthDemo = forwardRef<DemoControls>((props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<(HTMLDivElement | null)[]>([]);

    useImperativeHandle(ref, () => ({
        play: () => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                    scrollContainerRef.current?.scrollTo({
                        top: scrollContainerRef.current.scrollHeight,
                        behavior: "smooth"
                    });
                }, 100);
            }
        },
        reset: () => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
            }
        },
    }));

    useEffect(() => {
        const ctx = gsap.context(() => {
            layersRef.current.forEach((layer, i) => {
                const speed = (i + 1) * 0.5;
                gsap.to(layer, {
                    y: -100 * speed,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        scroller: scrollContainerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full h-full bg-white dark:bg-black transition-colors duration-500">
            <div ref={scrollContainerRef} className="h-full overflow-y-auto relative">
                <div ref={containerRef} className="h-[200vh] relative flex justify-center pt-20">

                    {/* Layer 1: Far */}
                    <div
                        ref={el => { layersRef.current[0] = el; }}
                        className="absolute top-20 w-32 h-32 bg-black/10 dark:bg-white/10 z-0"
                    />

                    {/* Layer 2: Mid */}
                    <div
                        ref={el => { layersRef.current[1] = el; }}
                        className="absolute top-40 w-32 h-32 border border-black dark:border-white z-10"
                    />

                    {/* Layer 3: Near */}
                    <div
                        ref={el => { layersRef.current[2] = el; }}
                        className="absolute top-60 w-32 h-32 bg-black dark:bg-white z-20 flex items-center justify-center text-white dark:text-black font-bold"
                    >
                        DEPTH
                    </div>

                </div>
            </div>
        </div>
    );
});

ParallaxDepthDemo.displayName = "ParallaxDepthDemo";

export default ParallaxDepthDemo;
