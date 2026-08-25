"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
}

interface DockProps {
  items: DockItem[];
  baseSize?: number;
  maxScale?: number;
  sigma?: number; // px influence radius
  className?: string;
}

export function Dock({
  items,
  baseSize = 48,
  maxScale = 1.75,
  sigma = 80,
  className,
}: DockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateScales = useCallback(
    (mouseX: number) => {
      const container = containerRef.current;
      if (!container) return;

      const cRect = container.getBoundingClientRect();

      itemRefs.current.forEach((el) => {
        if (!el) return;
        const eRect = el.getBoundingClientRect();
        const center = eRect.left + eRect.width / 2 - cRect.left;
        const dist = Math.abs(mouseX - cRect.left - center);
        const scale = 1 + (maxScale - 1) * Math.exp(-(dist * dist) / (2 * sigma * sigma));
        el.style.transition = "transform 0.08s linear";
        el.style.transform = `scale(${scale})`;
      });
    },
    [maxScale, sigma]
  );

  const resetScales = useCallback(() => {
    itemRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transition = "transform 0.45s cubic-bezier(0.215, 0.61, 0.355, 1)";
      el.style.transform = "scale(1)";
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => updateScales(e.clientX)}
      onMouseLeave={resetScales}
      className={cn(
        "flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10",
        className
      )}
    >
      {items.map((item, i) => (
        <button
          key={item.id}
          ref={(el) => { itemRefs.current[i] = el; }}
          onClick={item.onClick}
          aria-label={item.label ?? item.id}
          className="flex items-center justify-center rounded-xl bg-white/8 hover:bg-white/12 transition-colors duration-150 flex-shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          style={{
            width: baseSize,
            height: baseSize,
            transformOrigin: "bottom center",
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}

// Demo
const DOCK_ITEMS: DockItem[] = [
  { id: "home",     icon: <span className="text-2xl">⌂</span>,  label: "Home" },
  { id: "search",   icon: <span className="text-2xl">⌕</span>,  label: "Search" },
  { id: "files",    icon: <span className="text-2xl">◫</span>,  label: "Files" },
  { id: "terminal", icon: <span className="text-2xl">❯</span>,  label: "Terminal" },
  { id: "settings", icon: <span className="text-2xl">⚙</span>,  label: "Settings" },
  { id: "mail",     icon: <span className="text-2xl">✉</span>,  label: "Mail" },
  { id: "music",    icon: <span className="text-2xl">♫</span>,  label: "Music" },
];

export function DockDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Dock items={DOCK_ITEMS} />
      <p className="text-xs text-white/20 font-['Space_Mono']">
        Move cursor across icons
      </p>
    </div>
  );
}

export const dockCode = `"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
}

interface DockProps {
  items: DockItem[];
  baseSize?: number;
  maxScale?: number;
  sigma?: number;
  className?: string;
}

export function Dock({
  items,
  baseSize = 48,
  maxScale = 1.75,
  sigma = 80,
  className,
}: DockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateScales = useCallback(
    (mouseX: number) => {
      const container = containerRef.current;
      if (!container) return;

      const cRect = container.getBoundingClientRect();

      itemRefs.current.forEach((el) => {
        if (!el) return;
        const eRect = el.getBoundingClientRect();
        const center = eRect.left + eRect.width / 2 - cRect.left;
        const dist = Math.abs(mouseX - cRect.left - center);
        const scale = 1 + (maxScale - 1) * Math.exp(-(dist * dist) / (2 * sigma * sigma));
        el.style.transition = "transform 0.08s linear";
        el.style.transform = \`scale(\${scale})\`;
      });
    },
    [maxScale, sigma]
  );

  const resetScales = useCallback(() => {
    itemRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transition = "transform 0.45s cubic-bezier(0.215, 0.61, 0.355, 1)";
      el.style.transform = "scale(1)";
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => updateScales(e.clientX)}
      onMouseLeave={resetScales}
      className={cn(
        "flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10",
        className
      )}
    >
      {items.map((item, i) => (
        <button
          key={item.id}
          ref={(el) => { itemRefs.current[i] = el; }}
          onClick={item.onClick}
          aria-label={item.label ?? item.id}
          className="flex items-center justify-center rounded-xl bg-white/8 hover:bg-white/12 transition-colors duration-150 flex-shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          style={{
            width: baseSize,
            height: baseSize,
            transformOrigin: "bottom center",
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}`;
