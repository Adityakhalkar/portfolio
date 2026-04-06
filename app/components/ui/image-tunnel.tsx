"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageTunnelProps {
  images: string[];
  depth?: number;        // total tunnel length in px
  radius?: number;       // helix radius in px
  imagesPerLoop?: number; // how many images per full spiral rotation
  speed?: number;        // scroll multiplier
  perspective?: number;
  className?: string;
}

export function ImageTunnel({
  images,
  depth = 2400,
  radius = 280,
  imagesPerLoop = 6,
  speed = 1.2,
  perspective = 900,
  className,
}: ImageTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const scrollZ = useRef(0);
  const targetZ = useRef(0);
  const rafRef = useRef<number>(0);
  const count = images.length;
  const spacing = depth / count;

  // Base positions along the helix
  const basePositions = images.map((_, i) => {
    const angle = (i / imagesPerLoop) * Math.PI * 2;
    const z = -(i * spacing); // start spread away from viewer
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const rotate = (angle * 180) / Math.PI;
    return { x, y, z, rotate };
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZ.current += e.deltaY * speed;
    };

    const onTouch = (() => {
      let lastY = 0;
      return {
        start: (e: TouchEvent) => { lastY = e.touches[0].clientY; },
        move: (e: TouchEvent) => {
          e.preventDefault();
          const dy = lastY - e.touches[0].clientY;
          targetZ.current += dy * speed * 2;
          lastY = e.touches[0].clientY;
        },
      };
    })();

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouch.start, { passive: true });
    container.addEventListener("touchmove", onTouch.move, { passive: false });

    function tick() {
      // Lerp scroll
      scrollZ.current += (targetZ.current - scrollZ.current) * 0.08;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const base = basePositions[i];

        // World Z = base Z + scroll offset, wrapped within tunnel depth
        let worldZ = base.z + scrollZ.current;

        // Wrap: when image passes viewer (z > nearClip), teleport to back
        const nearClip = spacing;
        worldZ = ((worldZ + nearClip) % depth) - nearClip;
        if (worldZ > nearClip) worldZ -= depth;

        el.style.transform = `translate3d(${base.x}px, ${base.y}px, ${worldZ}px) rotateZ(${base.rotate}deg)`;

        // Fade out as it gets too close (within 200px of viewer)
        const proximity = 1 - Math.max(0, Math.min(1, (worldZ + 200) / 200));
        el.style.opacity = String(proximity);
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouch.start);
      container.removeEventListener("touchmove", onTouch.move);
    };
  }, [basePositions, depth, spacing]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-ns-resize", className)}
      style={{ perspective, perspectiveOrigin: "50% 50%" }}
    >
      {/* Scene — transform-style preserve-3d so children live in 3D space */}
      <div
        ref={sceneRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => { if (el) itemRefs.current[i] = el; }}
            className="absolute"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
              transform: `translate3d(${basePositions[i].x}px, ${basePositions[i].y}px, ${basePositions[i].z}px) rotateZ(${basePositions[i].rotate}deg)`,
            }}
          >
            <div className="relative w-36 h-24 sm:w-44 sm:h-28 overflow-hidden rounded-sm border border-white/10">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 144px, 176px"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, black 100%)",
        }}
      />

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/20 font-['Space_Mono'] pointer-events-none">
        scroll to fly
      </p>
    </div>
  );
}

// Demo
const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=80",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&q=80",
  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80",
];

export function ImageTunnelDemo() {
  return (
    <ImageTunnel
      images={DEMO_IMAGES}
      className="w-full h-72 sm:h-96"
    />
  );
}

export const imageTunnelCode = `"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageTunnelProps {
  images: string[];
  depth?: number;
  radius?: number;
  imagesPerLoop?: number;
  speed?: number;
  perspective?: number;
  className?: string;
}

export function ImageTunnel({
  images,
  depth = 2400,
  radius = 280,
  imagesPerLoop = 6,
  speed = 1.2,
  perspective = 900,
  className,
}: ImageTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const scrollZ = useRef(0);
  const targetZ = useRef(0);
  const rafRef = useRef<number>(0);
  const count = images.length;
  const spacing = depth / count;

  const basePositions = images.map((_, i) => {
    const angle = (i / imagesPerLoop) * Math.PI * 2;
    const z = -(i * spacing);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const rotate = (angle * 180) / Math.PI;
    return { x, y, z, rotate };
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZ.current += e.deltaY * speed;
    };

    let lastY = 0;
    const onTouchStart = (e: TouchEvent) => { lastY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = lastY - e.touches[0].clientY;
      targetZ.current += dy * speed * 2;
      lastY = e.touches[0].clientY;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    function tick() {
      scrollZ.current += (targetZ.current - scrollZ.current) * 0.08;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const base = basePositions[i];
        let worldZ = base.z + scrollZ.current;
        const nearClip = spacing;
        worldZ = ((worldZ + nearClip) % depth) - nearClip;
        if (worldZ > nearClip) worldZ -= depth;
        el.style.transform = \`translate3d(\${base.x}px, \${base.y}px, \${worldZ}px) rotateZ(\${base.rotate}deg)\`;
        const proximity = 1 - Math.max(0, Math.min(1, (worldZ + 200) / 200));
        el.style.opacity = String(proximity);
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, [basePositions, depth, spacing, speed]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-ns-resize", className)}
      style={{ perspective, perspectiveOrigin: "50% 50%" }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => { if (el) itemRefs.current[i] = el; }}
            className="absolute"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
              transform: \`translate3d(\${basePositions[i].x}px, \${basePositions[i].y}px, \${basePositions[i].z}px) rotateZ(\${basePositions[i].rotate}deg)\`,
            }}
          >
            <div className="relative w-44 h-28 overflow-hidden rounded-sm border border-white/10">
              <Image src={src} alt="" fill className="object-cover" sizes="176px" draggable={false} />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, black 100%)" }} />
    </div>
  );
}`;
