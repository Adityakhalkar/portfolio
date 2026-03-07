"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function CustomCursor() {
    const pathname = usePathname();
    const isTemplate = pathname?.startsWith("/templates/") ?? false;
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
    }, []);

    useEffect(() => {
        if (isTemplate || isTouchDevice) return;
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

        const followerXTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
        const followerYTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            followerXTo(e.clientX);
            followerYTo(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("magnetic-target")
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [isTemplate, isTouchDevice]);

    useEffect(() => {
        if (isTemplate || isTouchDevice) return;
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        if (isHovering) {
            gsap.to(cursor, { scale: 0, duration: 0.3 });
            gsap.to(follower, {
                scale: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "transparent",
                mixBlendMode: "difference",
                duration: 0.3
            });
        } else {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "white",
                mixBlendMode: "difference",
                duration: 0.3
            });
        }
    }, [isHovering, isTemplate, isTouchDevice]);

    if (isTemplate || isTouchDevice) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference transition-colors"
            />
        </>
    );
}
