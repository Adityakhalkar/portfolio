"use client";

export default function Grain() {
  return (
    <svg
      style={{
        position: "fixed",
        top: "-50%",
        left: "-50%",
        width: "200%",
        height: "200%",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.03,
      }}
    >
      <filter id="aegis-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#aegis-grain)" />
    </svg>
  );
}
