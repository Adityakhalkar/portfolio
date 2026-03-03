"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const cross = crossRef.current;
    if (!dot || !cross) return;

    gsap.set([dot, cross], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2" });
    const crossX = gsap.quickTo(cross, "x", { duration: 0.35, ease: "power3" });
    const crossY = gsap.quickTo(cross, "y", { duration: 0.35, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      crossX(e.clientX);
      crossY(e.clientY);
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
    const cross = crossRef.current;
    if (!dot || !cross) return;

    if (hovering) {
      gsap.to(dot, { scale: 0, duration: 0.2 });
      gsap.to(cross, {
        scale: 2.5,
        borderColor: "#E8FF47",
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(cross, {
        scale: 1,
        borderColor: "#E8FF47",
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [hovering]);

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "4px",
          height: "4px",
          backgroundColor: "#E8FF47",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      />
      {/* Crosshair frame */}
      <div
        ref={crossRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "28px",
          height: "28px",
          border: "1px solid #E8FF47",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? 0.6 : 0,
          transition: "opacity 0.15s",
        }}
      >
        {/* Crosshair lines */}
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "-5px",
            width: "4px",
            height: "1px",
            backgroundColor: "#E8FF47",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            right: "-5px",
            width: "4px",
            height: "1px",
            backgroundColor: "#E8FF47",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "-5px",
            width: "1px",
            height: "4px",
            backgroundColor: "#E8FF47",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-5px",
            width: "1px",
            height: "4px",
            backgroundColor: "#E8FF47",
          }}
        />
      </div>
    </>
  );
}
