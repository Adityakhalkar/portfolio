"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ElasticSliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  elasticity?: number; // how far past min/max it can stretch (px)
}

export function ElasticSlider({
  min = 0,
  max = 100,
  defaultValue = 50,
  onChange,
  className,
  elasticity = 32,
}: ElasticSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(defaultValue);
  const dragging = useRef(false);

  const [value, setValue] = useState(defaultValue);
  const [overshot, setOvershot] = useState(0); // px past boundary

  function getPercent(val: number) {
    return ((val - min) / (max - min)) * 100;
  }

  function percentFromPointer(clientX: number) {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }

  function rawPxFromPointer(clientX: number) {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    return clientX - rect.left;
  }

  const applyPosition = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      const thumb = thumbRef.current;
      const fill = fillRef.current;
      if (!track || !thumb || !fill) return;

      const rect = track.getBoundingClientRect();
      const rawPx = clientX - rect.left;
      const clamped = Math.max(0, Math.min(rect.width, rawPx));
      const percent = clamped / rect.width;
      const newValue = Math.round(min + percent * (max - min));

      // Overshot elastic stretch
      let stretch = 0;
      if (rawPx < 0) {
        stretch = Math.max(-elasticity, rawPx); // negative
      } else if (rawPx > rect.width) {
        stretch = Math.min(elasticity, rawPx - rect.width); // positive
      }

      // Dampen the stretch logarithmically
      const damped =
        stretch === 0
          ? 0
          : Math.sign(stretch) *
            (Math.log(Math.abs(stretch) + 1) / Math.log(elasticity + 1)) *
            elasticity;

      const thumbPos = clamped + damped;
      thumb.style.transition = "none";
      thumb.style.left = `${thumbPos}px`;
      fill.style.transition = "none";
      fill.style.width = `${clamped}px`;

      setOvershot(damped);
      valueRef.current = newValue;
      setValue(newValue);
      onChange?.(newValue);
    },
    [min, max, elasticity, onChange]
  );

  const snapBack = useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const fill = fillRef.current;
    if (!track || !thumb || !fill) return;

    const rect = track.getBoundingClientRect();
    const percent = getPercent(valueRef.current);
    const finalPx = (percent / 100) * rect.width;

    thumb.style.transition =
      "left 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    thumb.style.left = `${finalPx}px`;
    fill.style.transition =
      "width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    fill.style.width = `${finalPx}px`;

    setOvershot(0);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      dragging.current = true;
      applyPosition(e.clientX);
    },
    [applyPosition]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      applyPosition(e.clientX);
    },
    [applyPosition]
  );

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    snapBack();
  }, [snapBack]);

  const initialPct = getPercent(defaultValue);

  return (
    <div className={cn("flex flex-col gap-3 w-full select-none", className)}>
      <div
        ref={trackRef}
        className="relative h-1.5 bg-white/10 rounded-full cursor-pointer"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Fill */}
        <div
          ref={fillRef}
          className="absolute inset-y-0 left-0 bg-white/60 rounded-full pointer-events-none"
          style={{ width: `${initialPct}%` }}
        />
        {/* Thumb */}
        <div
          ref={thumbRef}
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full pointer-events-none shadow-sm"
          style={{ left: `${initialPct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-white/30 font-['Space_Mono'] tabular-nums">
        <span>{min}</span>
        <span className="text-white/60">{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

// Demo
export function ElasticSliderDemo() {
  const [vol, setVol] = useState(40);
  const [opacity, setOpacity] = useState(75);

  return (
    <div className="flex flex-col gap-10 w-full max-w-xs">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-white/40 font-['Space_Mono'] uppercase tracking-widest">
          Volume
        </span>
        <ElasticSlider defaultValue={40} onChange={setVol} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-white/40 font-['Space_Mono'] uppercase tracking-widest">
          Opacity
        </span>
        <ElasticSlider defaultValue={75} max={100} onChange={setOpacity} />
      </div>
      <p className="text-xs text-white/20 font-['Space_Mono'] text-center">
        Drag past the edges
      </p>
    </div>
  );
}

export const elasticSliderCode = `"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ElasticSliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  elasticity?: number;
}

export function ElasticSlider({
  min = 0,
  max = 100,
  defaultValue = 50,
  onChange,
  className,
  elasticity = 32,
}: ElasticSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(defaultValue);
  const dragging = useRef(false);
  const [value, setValue] = useState(defaultValue);

  function getPercent(val: number) {
    return ((val - min) / (max - min)) * 100;
  }

  const applyPosition = useCallback((clientX: number) => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const fill = fillRef.current;
    if (!track || !thumb || !fill) return;

    const rect = track.getBoundingClientRect();
    const rawPx = clientX - rect.left;
    const clamped = Math.max(0, Math.min(rect.width, rawPx));
    const newValue = Math.round(min + (clamped / rect.width) * (max - min));

    let stretch = 0;
    if (rawPx < 0) stretch = Math.max(-elasticity, rawPx);
    else if (rawPx > rect.width) stretch = Math.min(elasticity, rawPx - rect.width);

    const damped = stretch === 0 ? 0
      : Math.sign(stretch) * (Math.log(Math.abs(stretch) + 1) / Math.log(elasticity + 1)) * elasticity;

    thumb.style.transition = "none";
    thumb.style.left = \`\${clamped + damped}px\`;
    fill.style.transition = "none";
    fill.style.width = \`\${clamped}px\`;

    valueRef.current = newValue;
    setValue(newValue);
    onChange?.(newValue);
  }, [min, max, elasticity, onChange]);

  const snapBack = useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const fill = fillRef.current;
    if (!track || !thumb || !fill) return;

    const rect = track.getBoundingClientRect();
    const finalPx = (getPercent(valueRef.current) / 100) * rect.width;

    thumb.style.transition = "left 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    thumb.style.left = \`\${finalPx}px\`;
    fill.style.transition = "width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    fill.style.width = \`\${finalPx}px\`;
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    applyPosition(e.clientX);
  }, [applyPosition]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    applyPosition(e.clientX);
  }, [applyPosition]);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    snapBack();
  }, [snapBack]);

  const initialPct = getPercent(defaultValue);

  return (
    <div className={cn("flex flex-col gap-3 w-full select-none", className)}>
      <div
        ref={trackRef}
        className="relative h-1.5 bg-white/10 rounded-full cursor-pointer"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={fillRef} className="absolute inset-y-0 left-0 bg-white/60 rounded-full pointer-events-none" style={{ width: \`\${initialPct}%\` }} />
        <div ref={thumbRef} className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full pointer-events-none" style={{ left: \`\${initialPct}%\` }} />
      </div>
      <div className="flex justify-between text-xs text-white/30 font-['Space_Mono'] tabular-nums">
        <span>{min}</span>
        <span className="text-white/60">{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}`;
