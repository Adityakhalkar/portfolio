"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function KineticTypographyDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let mouse = { x: 0, y: 0 };
        let lastMouse = { x: 0, y: 0 };
        let velocity = { x: 0, y: 0 };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const animate = () => {
            // Calculate velocity
            velocity.x = mouse.x - lastMouse.x;
            velocity.y = mouse.y - lastMouse.y;

            lastMouse.x = mouse.x;
            lastMouse.y = mouse.y;

            // Apply skew based on velocity
            const skewX = velocity.x * 0.15; // Increased sensitivity

            // Clamp skew values
            const clampedSkewX = Math.max(Math.min(skewX, 20), -20);

            textRefs.current.forEach((text, index) => {
                if (!text) return;

                // Stagger effect based on index
                gsap.to(text, {
                    skewX: -clampedSkewX,
                    x: velocity.x * 0.8 * (1 + index * 0.1), // Parallax movement
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });

            requestAnimationFrame(animate);
        };

        container.addEventListener("mousemove", handleMouseMove);
        const animationId = requestAnimationFrame(animate);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative min-h-[400px] bg-white dark:bg-black overflow-hidden flex flex-col justify-center items-center cursor-none border-y border-black dark:border-white"
        >
            <div className="relative z-10 flex flex-col items-center justify-center space-y-[-1rem] select-none mix-blend-difference text-black dark:text-white">
                {["KINETIC", "TYPOGRAPHY", "SYSTEM"].map((word, i) => (
                    <h1
                        key={i}
                        ref={(el) => { textRefs.current[i] = el; }}
                        className="text-9xl font-black tracking-tighter leading-[0.8]"
                    >
                        {word}
                    </h1>
                ))}
            </div>

            {/* Minimalist Custom Cursor */}
            <div className="pointer-events-none absolute w-4 h-4 bg-black dark:bg-white rounded-full mix-blend-difference z-50 transition-transform duration-75 ease-out"
                style={{
                    left: 0,
                    top: 0,
                    transform: "translate(-50%, -50%)"
                }}
                ref={(el) => {
                    if (el && containerRef.current) {
                        const updateCursor = (e: MouseEvent) => {
                            const rect = containerRef.current?.getBoundingClientRect();
                            if (rect) {
                                gsap.set(el, {
                                    x: e.clientX - rect.left,
                                    y: e.clientY - rect.top
                                });
                            }
                        };
                        containerRef.current.addEventListener("mousemove", updateCursor);
                    }
                }}
            />
        </div>
    );
}
