"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface DemoControls {
    play: () => void;
    reset: () => void;
}

const DutchAngleDemo = forwardRef<DemoControls>((props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        play: () => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                    scrollContainerRef.current?.scrollTo({
                        top: scrollContainerRef.current.scrollHeight / 2,
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
            gsap.to(contentRef.current, {
                rotation: -15,
                scale: 1.2,
                scrollTrigger: {
                    trigger: contentRef.current,
                    scroller: scrollContainerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full bg-white dark:bg-black transition-colors duration-500">
            <div ref={scrollContainerRef} className="h-full overflow-y-auto">
                <div className="h-[150vh] flex items-center justify-center overflow-hidden">
                    <div
                        ref={contentRef}
                        className="w-64 h-64 border-4 border-black dark:border-white flex items-center justify-center"
                    >
                        <div className="text-4xl font-black tracking-tighter">TENSION</div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 text-[10px] font-mono tracking-widest opacity-50 pointer-events-none">
                CANTED ANGLE
            </div>
        </div>
    );
});

DutchAngleDemo.displayName = "DutchAngleDemo";

export default DutchAngleDemo;
