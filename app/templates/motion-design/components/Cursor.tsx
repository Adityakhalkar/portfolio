"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Motive cursor — a single accent-filled dot with elastic spring follow.
 * No ring. Bold and playful, matching Soft Maximalism.
 *
 * Distinct from:
 *   AgentVault → yellow square crosshair
 *   Aegis → subtle dark dot + thin ring
 */
export default function Cursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    gsap.set(blob, { xPercent: -50, yPercent: -50 });

    const blobX = gsap.quickTo(blob, "x", {
      duration: 0.35,
      ease: "elastic.out(1, 0.45)",
    });
    const blobY = gsap.quickTo(blob, "y", {
      duration: 0.35,
      ease: "elastic.out(1, 0.45)",
    });

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      blobX(e.clientX);
      blobY(e.clientY);
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
    const blob = blobRef.current;
    if (!blob) return;

    if (hovering) {
      gsap.to(blob, {
        width: 48,
        height: 48,
        backgroundColor: "rgba(255, 51, 102, 0.12)",
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    } else {
      gsap.to(blob, {
        width: 10,
        height: 10,
        backgroundColor: "#FF3366",
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, [hovering]);

  return (
    <div
      ref={blobRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "10px",
        height: "10px",
        backgroundColor: "#FF3366",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s",
      }}
    />
  );
}
