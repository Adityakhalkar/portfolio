"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How far it moves (default: 0.5)
}

export default function MagneticButton({
    children,
    className = "",
    strength = 0.5
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        // Optional: Move text slightly differently for parallax effect inside button
        const textXTo = textRef.current ? gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" }) : null;
        const textYTo = textRef.current ? gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" }) : null;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = button.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * strength);
            yTo(y * strength);

            if (textXTo && textYTo) {
                textXTo(x * strength * 0.5); // Text moves less for depth
                textYTo(y * strength * 0.5);
            }
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            if (textXTo && textYTo) {
                textXTo(0);
                textYTo(0);
            }
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={buttonRef} className={`inline-block cursor-pointer ${className}`}>
            <div ref={textRef}>
                {children}
            </div>
        </div>
    );
}
