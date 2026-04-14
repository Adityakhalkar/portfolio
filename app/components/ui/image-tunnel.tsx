"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type TunnelLayout = "spiral" | "cross" | "random";

interface BasePos { x: number; y: number; z: number; rotate: number; }

function computePositions(
  count: number,
  layout: TunnelLayout,
  depth: number,
  radius: number,
  imagesPerLoop: number
): BasePos[] {
  const spacing = depth / count;

  return Array.from({ length: count }, (_, i) => {
    const z = -(i * spacing);
    let x = 0, y = 0, rotate = 0;

    if (layout === "spiral") {
      const angle = (i / imagesPerLoop) * Math.PI * 2;
      x = radius * Math.cos(angle);
      y = radius * Math.sin(angle);
      rotate = (angle * 180) / Math.PI;

    } else if (layout === "cross") {
      const arm = i % 4;
      const offsets = [
        { x: 0,       y: -radius },
        { x: radius,  y: 0       },
        { x: 0,       y: radius  },
        { x: -radius, y: 0       },
      ];
      x = offsets[arm].x;
      y = offsets[arm].y;
      rotate = arm * 90;

    } else {
      // Fibonacci / golden-angle distribution — uniform, not truly random
      const goldenAngle = 2.39996; // radians
      const angle = i * goldenAngle;
      const r = radius * Math.sqrt((i % imagesPerLoop) / imagesPerLoop + 0.3);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
      rotate = (angle * 180) / Math.PI;
    }

    return { x, y, z, rotate };
  });
}

interface ImageTunnelProps {
  images: string[];
  layout?: TunnelLayout;
  depth?: number;
  radius?: number;
  imagesPerLoop?: number;
  speed?: number;
  perspective?: number;
  className?: string;
}

export function ImageTunnel({
  images,
  layout = "spiral",
  depth = 2400,
  radius = 280,
  imagesPerLoop = 6,
  speed = 1.2,
  perspective = 900,
  className,
}: ImageTunnelProps) {
  const count = images.length;
  const spacing = depth / count;

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const scrollZ = useRef(0);
  const targetZ = useRef(0);
  const rafRef = useRef<number>(0);

  // Live XY positions, lerped toward target on layout switch
  const currentXY = useRef(
    computePositions(count, layout, depth, radius, imagesPerLoop).map(p => ({ x: p.x, y: p.y, rotate: p.rotate }))
  );
  const targetXY = useRef(currentXY.current.map(p => ({ ...p })));
  // Z is always derived from scroll — doesn't change with layout
  const baseZ = useRef(
    Array.from({ length: count }, (_, i) => -(i * spacing))
  );

  // When layout prop changes, update target XY
  useEffect(() => {
    const newPos = computePositions(count, layout, depth, radius, imagesPerLoop);
    targetXY.current = newPos.map(p => ({ x: p.x, y: p.y, rotate: p.rotate }));
  }, [layout, count, depth, radius, imagesPerLoop]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZ.current += e.deltaY * speed;
    };

    let lastTouchY = 0;
    const onTouchStart = (e: TouchEvent) => { lastTouchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = lastTouchY - e.touches[0].clientY;
      targetZ.current += dy * speed * 2;
      lastTouchY = e.touches[0].clientY;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    function tick() {
      // Lerp scroll Z
      scrollZ.current += (targetZ.current - scrollZ.current) * 0.08;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;

        // Lerp XY toward target layout
        const cur = currentXY.current[i];
        const tgt = targetXY.current[i];
        cur.x += (tgt.x - cur.x) * 0.1;
        cur.y += (tgt.y - cur.y) * 0.1;
        cur.rotate += (tgt.rotate - cur.rotate) * 0.1;

        // Wrap Z infinitely
        let worldZ = baseZ.current[i] + scrollZ.current;
        const nearClip = spacing;
        worldZ = ((worldZ + nearClip) % depth) - nearClip;
        if (worldZ > nearClip) worldZ -= depth;

        el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, ${worldZ}px) rotateZ(${cur.rotate}deg)`;

        // Depth of field — blur far (emerging) and near (approaching)
        const farBlur = worldZ < -(depth * 0.45)
          ? Math.min(7, (Math.abs(worldZ) - depth * 0.45) / 70)
          : 0;
        const nearBlur = worldZ > -280
          ? Math.min(7, (worldZ + 280) / 35)
          : 0;
        const blur = Math.max(farBlur, nearBlur);
        el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";

        // Fade near viewer
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
  }, [depth, spacing, speed]);

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
            style={{ willChange: "transform" }}
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
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, black 100%)" }}
      />
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

const LAYOUTS: { value: TunnelLayout; label: string }[] = [
  { value: "spiral", label: "Spiral" },
  { value: "cross",  label: "Cross"  },
  { value: "random", label: "Random" },
];

export function ImageTunnelDemo() {
  const [layout, setLayout] = useState<TunnelLayout>("spiral");

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Layout toggles */}
      <div className="flex justify-center gap-2">
        {LAYOUTS.map((l) => (
          <button
            key={l.value}
            onClick={() => setLayout(l.value)}
            className={cn(
              "text-xs px-4 py-1.5 border font-['Space_Mono'] tracking-widest uppercase transition-colors duration-150",
              layout === l.value
                ? "border-accent text-accent"
                : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/30"
            )}
          >
            {l.label}
          </button>
        ))}
      </div>

      <ImageTunnel
        images={DEMO_IMAGES}
        layout={layout}
        className="w-full h-72 sm:h-96"
      />

      <p className="text-center text-xs text-white/20 font-['Space_Mono']">
        scroll inside to fly through
      </p>
    </div>
  );
}

export const imageTunnelCode = `"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type TunnelLayout = "spiral" | "cross" | "random";

interface BasePos { x: number; y: number; z: number; rotate: number; }

function computePositions(count: number, layout: TunnelLayout, depth: number, radius: number, imagesPerLoop: number): BasePos[] {
  const spacing = depth / count;
  return Array.from({ length: count }, (_, i) => {
    const z = -(i * spacing);
    let x = 0, y = 0, rotate = 0;
    if (layout === "spiral") {
      const angle = (i / imagesPerLoop) * Math.PI * 2;
      x = radius * Math.cos(angle); y = radius * Math.sin(angle);
      rotate = (angle * 180) / Math.PI;
    } else if (layout === "cross") {
      const arm = i % 4;
      const offsets = [{ x: 0, y: -radius },{ x: radius, y: 0 },{ x: 0, y: radius },{ x: -radius, y: 0 }];
      x = offsets[arm].x; y = offsets[arm].y; rotate = arm * 90;
    } else {
      const goldenAngle = 2.39996;
      const angle = i * goldenAngle;
      const r = radius * Math.sqrt((i % imagesPerLoop) / imagesPerLoop + 0.3);
      x = r * Math.cos(angle); y = r * Math.sin(angle);
      rotate = (angle * 180) / Math.PI;
    }
    return { x, y, z, rotate };
  });
}

interface ImageTunnelProps {
  images: string[];
  layout?: TunnelLayout;
  depth?: number;
  radius?: number;
  imagesPerLoop?: number;
  speed?: number;
  perspective?: number;
  className?: string;
}

export function ImageTunnel({ images, layout = "spiral", depth = 2400, radius = 280, imagesPerLoop = 6, speed = 1.2, perspective = 900, className }: ImageTunnelProps) {
  const count = images.length;
  const spacing = depth / count;
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const scrollZ = useRef(0);
  const targetZ = useRef(0);
  const rafRef = useRef<number>(0);
  const currentXY = useRef(computePositions(count, layout, depth, radius, imagesPerLoop).map(p => ({ x: p.x, y: p.y, rotate: p.rotate })));
  const targetXY = useRef(currentXY.current.map(p => ({ ...p })));
  const baseZ = useRef(Array.from({ length: count }, (_, i) => -(i * spacing)));

  useEffect(() => {
    const newPos = computePositions(count, layout, depth, radius, imagesPerLoop);
    targetXY.current = newPos.map(p => ({ x: p.x, y: p.y, rotate: p.rotate }));
  }, [layout, count, depth, radius, imagesPerLoop]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e: WheelEvent) => { e.preventDefault(); targetZ.current += e.deltaY * speed; };
    let lastTouchY = 0;
    const onTouchStart = (e: TouchEvent) => { lastTouchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); const dy = lastTouchY - e.touches[0].clientY; targetZ.current += dy * speed * 2; lastTouchY = e.touches[0].clientY; };
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    function tick() {
      scrollZ.current += (targetZ.current - scrollZ.current) * 0.08;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const cur = currentXY.current[i];
        const tgt = targetXY.current[i];
        cur.x += (tgt.x - cur.x) * 0.1;
        cur.y += (tgt.y - cur.y) * 0.1;
        cur.rotate += (tgt.rotate - cur.rotate) * 0.1;
        let worldZ = baseZ.current[i] + scrollZ.current;
        const nearClip = spacing;
        worldZ = ((worldZ + nearClip) % depth) - nearClip;
        if (worldZ > nearClip) worldZ -= depth;
        el.style.transform = \`translate3d(\${cur.x}px, \${cur.y}px, \${worldZ}px) rotateZ(\${cur.rotate}deg)\`;
        el.style.opacity = String(1 - Math.max(0, Math.min(1, (worldZ + 200) / 200)));
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
  }, [depth, spacing, speed]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden cursor-ns-resize", className)} style={{ perspective, perspectiveOrigin: "50% 50%" }}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        {images.map((src, i) => (
          <div key={i} ref={(el) => { if (el) itemRefs.current[i] = el; }} className="absolute" style={{ willChange: "transform" }}>
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
