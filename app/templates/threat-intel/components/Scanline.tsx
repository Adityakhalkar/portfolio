"use client";

export default function Scanline() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9998,
        pointerEvents: "none",
        opacity: 0.4,
        background:
          "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 3px)",
      }}
    />
  );
}
