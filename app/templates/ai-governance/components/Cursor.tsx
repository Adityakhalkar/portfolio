"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.closest("a") ||
        t.closest("button")
      ) {
        setHovering(true);
      }
    };

    const onOut = () => setHovering(false);

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    if (hovering) {
      gsap.to(dot, { scale: 0, duration: 0.25, ease: "power2.out" });
      gsap.to(ring, {
        scale: 2.2,
        borderColor: "#2D6A4F",
        opacity: 0.25,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "power2.out" });
      gsap.to(ring, {
        scale: 1,
        borderColor: "#1A1A1A",
        opacity: 0.15,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [hovering]);

  return (
    <>
      {/* Tiny warm dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          backgroundColor: "#1A1A1A",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 0.7 : 0,
          transition: "opacity 0.2s",
        }}
      />
      {/* Delicate thin ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          border: "1px solid #1A1A1A",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? 0.15 : 0,
          transition: "opacity 0.2s",
        }}
      />
    </>
  );
}
