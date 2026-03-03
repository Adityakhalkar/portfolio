"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    xTo.current = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.05,
      ease: "power2",
    });
    yTo.current = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.05,
      ease: "power2",
    });

    const onMove = (e: MouseEvent) => {
      xTo.current?.(e.clientX);
      yTo.current?.(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;
      setHovering(isInteractive);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const lineLength = hovering ? 30 : 20;
  const lineColor = hovering ? "#E0E0E0" : "#475569";

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Vertical line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1,
          height: lineLength,
          backgroundColor: lineColor,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Horizontal line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: lineLength,
          height: 1,
          backgroundColor: lineColor,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 2,
          height: 2,
          backgroundColor: "#94A3B8",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
