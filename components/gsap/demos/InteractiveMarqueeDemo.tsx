"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveMarqueeDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const text = textRef.current;

        if (!container || !text) return;

        let xPercent = 0;
        let direction = -1;

        const animate = () => {
            if (xPercent <= -100) {
                xPercent = 0;
            }
            if (xPercent > 0) {
                xPercent = -100;
            }

            gsap.set(text, { xPercent: xPercent });
            requestAnimationFrame(animate);
            xPercent += 0.05 * direction; // Slower base speed for elegance
        };

        // Basic animation loop
        const animation = gsap.to({}, {
            duration: 1,
            repeat: -1,
            onRepeat: () => {
                // Dummy tween
            }
        });

        // ScrollTrigger for direction and speed
        ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                const speed = Math.max(Math.abs(velocity / 1000), 1);

                // Change direction based on scroll direction
                if (self.direction !== 0) {
                    direction = self.direction === 1 ? -1 : 1;
                }

                // Apply skew based on velocity
                gsap.to(text, {
                    skewX: -velocity / 300,
                    overwrite: "auto",
                    duration: 0.5
                });

                // Temporarily boost speed
                xPercent += (0.1 * direction) * speed;
            }
        });

        // Start the loop
        const rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
            animation.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="py-24 bg-white dark:bg-black text-black dark:text-white overflow-hidden whitespace-nowrap border-y border-black dark:border-white">
            <div className="relative flex items-center">
                <div ref={textRef} className="flex text-[8vw] font-bold leading-none uppercase tracking-tighter will-change-transform">
                    <span className="mr-12">Minimalism</span>
                    <span className="mr-12 opacity-30">Is</span>
                    <span className="mr-12">Not</span>
                    <span className="mr-12 opacity-30">Lack</span>
                    <span className="mr-12">Of</span>
                    <span className="mr-12 opacity-30">Something</span>
                    {/* Duplicate for loop */}
                    <span className="mr-12">Minimalism</span>
                    <span className="mr-12 opacity-30">Is</span>
                    <span className="mr-12">Not</span>
                    <span className="mr-12 opacity-30">Lack</span>
                    <span className="mr-12">Of</span>
                    <span className="mr-12 opacity-30">Something</span>
                </div>
            </div>
        </div>
    );
}
