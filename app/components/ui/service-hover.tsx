"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

// ─── Types ────────────────────────────────────────────────────────────────────

type PhysicsTag = { el: HTMLElement; body: any; w: number; h: number };

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "design",
    num: "01",
    title: "UI Design",
    tags: ["Figma", "Design Systems", "Prototyping", "Research"],
    imgs: [
      "radial-gradient(ellipse at 35% 35%, #0d2a1a 0%, #050505 80%)",
      "radial-gradient(ellipse at 60% 40%, #0a1a2a 0%, #050505 80%)",
      "radial-gradient(ellipse at 45% 65%, #1a0a2a 0%, #050505 80%)",
    ],
  },
  {
    id: "dev",
    num: "02",
    title: "Development",
    tags: ["React", "TypeScript", "Next.js", "GSAP"],
    imgs: [
      "radial-gradient(ellipse at 55% 30%, #1a2a0d 0%, #050505 80%)",
      "radial-gradient(ellipse at 30% 60%, #2a0d1a 0%, #050505 80%)",
      "radial-gradient(ellipse at 70% 55%, #0d1a2a 0%, #050505 80%)",
    ],
  },
  {
    id: "motion",
    num: "03",
    title: "Motion Design",
    tags: ["GSAP", "After Effects", "3D", "Lottie"],
    imgs: [
      "radial-gradient(ellipse at 40% 50%, #2a1a0d 0%, #050505 80%)",
      "radial-gradient(ellipse at 65% 35%, #0d2a1a 0%, #050505 80%)",
      "radial-gradient(ellipse at 35% 65%, #1a0d2a 0%, #050505 80%)",
    ],
  },
  {
    id: "brand",
    num: "04",
    title: "Brand Identity",
    tags: ["Logo Design", "Typography", "Color", "Strategy"],
    imgs: [
      "radial-gradient(ellipse at 50% 40%, #2a0d1a 0%, #050505 80%)",
      "radial-gradient(ellipse at 35% 55%, #0a1e2a 0%, #050505 80%)",
      "radial-gradient(ellipse at 60% 60%, #1a2a0a 0%, #050505 80%)",
    ],
  },
];

const ROTS = [-9, 1, 9] as const;
const IMG_W = 76;
const IMG_H = 100;
const IMG_GAP = 26;
const EXPANDED_H = 185;
const TAGS_H = 85;

// ─── Component ────────────────────────────────────────────────────────────────

export function ServiceHoverDemo() {
  const bodyRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const arrowRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const imgRefs    = useRef<(HTMLDivElement | null)[][]>(SERVICES.map(() => []));
  const tagsRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef  = useRef(-1);
  const MRef       = useRef<any>(null);
  const engineRef  = useRef<any>(null);
  const runnerRef  = useRef<any>(null);
  const syncRafRef = useRef(0);
  const tagBodies  = useRef<PhysicsTag[]>([]);

  // Load Matter.js once on mount
  useEffect(() => {
    import("matter-js").then((m) => { MRef.current = m; });
  }, []);

  // ── Physics cleanup ───────────────────────────────────────────────────────

  const stopPhysics = useCallback(() => {
    cancelAnimationFrame(syncRafRef.current);
    syncRafRef.current = 0;

    tagBodies.current.forEach(({ el }) => el.parentNode?.removeChild(el));
    tagBodies.current = [];

    const M = MRef.current;
    if (M && engineRef.current) {
      if (runnerRef.current) M.Runner.stop(runnerRef.current);
      M.World.clear(engineRef.current.world, false);
      M.Engine.clear(engineRef.current);
      engineRef.current = null;
      runnerRef.current = null;
    }
  }, []);

  // ── Start physics for service idx ─────────────────────────────────────────

  const startPhysics = useCallback((idx: number) => {
    const M = MRef.current;
    const container = tagsRefs.current[idx];
    if (!M || !container) return;

    const { Engine, Runner, World, Bodies, Body } = M;
    const W = container.offsetWidth;
    const H = container.offsetHeight;

    const engine = Engine.create({ gravity: { x: 0, y: 2.5 } });
    const runner = Runner.create();
    Runner.run(runner, engine);
    engineRef.current = engine;
    runnerRef.current = runner;

    // Static boundary bodies
    World.add(engine.world, [
      Bodies.rectangle(W / 2, H + 10, W + 20, 20, { isStatic: true }),
      Bodies.rectangle(-10, H / 2, 20, H * 2, { isStatic: true }),
      Bodies.rectangle(W + 10, H / 2, 20, H * 2, { isStatic: true }),
    ]);

    const service = SERVICES[idx];
    const newBodies: PhysicsTag[] = [];

    service.tags.forEach((tag, i) => {
      const el = document.createElement("div");
      el.textContent = tag;
      Object.assign(el.style, {
        position: "absolute",
        top: "0",
        left: "0",
        padding: "4px 11px",
        border: "1px solid #222",
        borderRadius: "9999px",
        fontSize: "9px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#555",
        background: "#080808",
        whiteSpace: "nowrap",
        transformOrigin: "center center",
        pointerEvents: "none",
        fontFamily: "monospace",
        userSelect: "none",
      });
      container.appendChild(el);

      const bRect = el.getBoundingClientRect();
      const elW = bRect.width || 76;
      const elH = bRect.height || 24;
      const startX = (W / (service.tags.length + 1)) * (i + 1);
      const startY = -elH - i * 20;

      const body = Bodies.rectangle(startX, startY, elW, elH, {
        restitution: 0.35,
        friction: 0.5,
        frictionAir: 0.012,
        density: 0.002,
      });
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 0.5 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);
      World.add(engine.world, body);
      newBodies.push({ el, body, w: elW, h: elH });
    });

    tagBodies.current = newBodies;

    // Sync DOM positions to physics each frame
    const sync = () => {
      tagBodies.current.forEach(({ el, body, w, h }) => {
        el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
      });
      syncRafRef.current = requestAnimationFrame(sync);
    };
    syncRafRef.current = requestAnimationFrame(sync);
  }, []);

  // ── Open service ──────────────────────────────────────────────────────────

  const openService = useCallback((idx: number) => {
    const body    = bodyRefs.current[idx];
    const imgs    = imgRefs.current[idx].filter((el): el is HTMLDivElement => el !== null);
    const title   = titleRefs.current[idx];
    const arrow   = arrowRefs.current[idx];
    if (!body) return;

    gsap.set(imgs, { y: 22, opacity: 0 });
    gsap.to(body,  { height: EXPANDED_H, duration: 0.52, ease: "power3.out" });
    gsap.to(title, { color: "#eaeaea",   duration: 0.2 });
    gsap.to(arrow, { rotate: 45,         duration: 0.25, ease: "power2.out" });

    imgs.forEach((img, i) => {
      gsap.to(img, { y: 0, opacity: 1, duration: 0.4, delay: 0.08 + i * 0.07, ease: "power3.out" });
    });

    setTimeout(() => {
      if (activeRef.current === idx) startPhysics(idx);
    }, 160);
  }, [startPhysics]);

  // ── Close service ─────────────────────────────────────────────────────────

  const closeService = useCallback((idx: number) => {
    const body  = bodyRefs.current[idx];
    const imgs  = imgRefs.current[idx].filter((el): el is HTMLDivElement => el !== null);
    const title = titleRefs.current[idx];
    const arrow = arrowRefs.current[idx];

    stopPhysics();
    gsap.to(imgs,  { y: 12, opacity: 0, duration: 0.22, stagger: 0.03, ease: "power2.in" });
    if (body) gsap.to(body, { height: 0, duration: 0.38, ease: "power3.inOut", delay: 0.04 });
    gsap.to(title, { color: "#333",     duration: 0.2 });
    gsap.to(arrow, { rotate: 0,         duration: 0.22, ease: "power2.out" });
  }, [stopPhysics]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleEnter = useCallback((idx: number) => {
    if (activeRef.current === idx) return;
    if (activeRef.current !== -1) closeService(activeRef.current);
    activeRef.current = idx;
    openService(idx);
  }, [closeService, openService]);

  const handleLeave = useCallback((idx: number) => {
    if (activeRef.current !== idx) return;
    activeRef.current = -1;
    closeService(idx);
  }, [closeService]);

  // ── Init ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    bodyRefs.current.forEach((el)  => { if (el) gsap.set(el, { height: 0 }); });
    imgRefs.current.forEach((imgs) => imgs.forEach((img) => { if (img) gsap.set(img, { y: 22, opacity: 0 }); }));
    titleRefs.current.forEach((el) => { if (el) gsap.set(el, { color: "#333" }); });
    return () => { stopPhysics(); };
  }, [stopPhysics]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className="relative w-full bg-[#050505] font-mono border-t border-[#111]"
      style={{ minHeight: 360 }}
    >
      {SERVICES.map((svc, idx) => (
        <div
          key={svc.id}
          className="border-b border-[#111] select-none"
          style={{ cursor: "crosshair" }}
          onMouseEnter={() => handleEnter(idx)}
          onMouseLeave={() => handleLeave(idx)}
        >
          {/* ── Header ── */}
          <div className="flex items-center gap-4 px-5 py-[18px]">
            <span className="text-[9px] text-[#252525] tracking-widest w-5 shrink-0">
              {svc.num}
            </span>
            <span
              ref={(el) => { titleRefs.current[idx] = el; }}
              className="text-xl md:text-2xl tracking-tight"
              style={{ color: "#333" }}
            >
              {svc.title}
            </span>
            <span
              ref={(el) => { arrowRefs.current[idx] = el; }}
              className="ml-auto inline-block text-[#2a2a2a] text-sm"
            >
              ↗
            </span>
          </div>

          {/* ── Expandable body ── */}
          <div
            ref={(el) => { bodyRefs.current[idx] = el; }}
            className="overflow-hidden"
            style={{ height: 0 }}
          >
            <div className="relative px-5 pb-5" style={{ height: EXPANDED_H }}>

              {/* Image stack (right side) */}
              <div
                className="absolute"
                style={{
                  right: 20,
                  top: 8,
                  width: IMG_W + IMG_GAP * 2,
                  height: IMG_H,
                }}
              >
                {svc.imgs.map((bg, imgIdx) => (
                  <div
                    key={imgIdx}
                    ref={(el) => { imgRefs.current[idx][imgIdx] = el; }}
                    className="absolute rounded-[3px]"
                    style={{
                      width: IMG_W,
                      height: IMG_H,
                      background: bg,
                      border: "1px solid #181818",
                      left: imgIdx * IMG_GAP,
                      top: 0,
                      transform: `rotate(${ROTS[imgIdx]}deg)`,
                      opacity: 0,
                    }}
                  />
                ))}
              </div>

              {/* Physics tags container (left side) */}
              <div
                ref={(el) => { tagsRefs.current[idx] = el; }}
                className="absolute overflow-hidden"
                style={{
                  left: 20,
                  bottom: 20,
                  right: IMG_W + IMG_GAP * 2 + 40,
                  height: TAGS_H,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const serviceHoverCode = `"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
// npm install matter-js @types/matter-js

type PhysicsTag = { el: HTMLElement; body: any; w: number; h: number };

const SERVICES = [
  { id: "design", num: "01", title: "UI Design",      tags: ["Figma", "Design Systems", "Prototyping", "Research"] },
  { id: "dev",    num: "02", title: "Development",    tags: ["React", "TypeScript", "Next.js", "GSAP"] },
  { id: "motion", num: "03", title: "Motion Design",  tags: ["GSAP", "After Effects", "3D", "Lottie"] },
  { id: "brand",  num: "04", title: "Brand Identity", tags: ["Logo Design", "Typography", "Color", "Strategy"] },
];

const ROTS = [-9, 1, 9] as const;
const EXPANDED_H = 220;
const TAGS_H = 100;

export function ServiceHover() {
  const bodyRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const arrowRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const imgRefs    = useRef<(HTMLDivElement | null)[][]>(SERVICES.map(() => []));
  const tagsRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef  = useRef(-1);
  const MRef       = useRef<any>(null);
  const engineRef  = useRef<any>(null);
  const runnerRef  = useRef<any>(null);
  const syncRafRef = useRef(0);
  const tagBodies  = useRef<PhysicsTag[]>([]);

  useEffect(() => {
    import("matter-js").then((m) => { MRef.current = m; });
  }, []);

  const stopPhysics = useCallback(() => {
    cancelAnimationFrame(syncRafRef.current);
    tagBodies.current.forEach(({ el }) => el.parentNode?.removeChild(el));
    tagBodies.current = [];
    const M = MRef.current;
    if (M && engineRef.current) {
      if (runnerRef.current) M.Runner.stop(runnerRef.current);
      M.World.clear(engineRef.current.world, false);
      M.Engine.clear(engineRef.current);
      engineRef.current = null;
      runnerRef.current = null;
    }
  }, []);

  const startPhysics = useCallback((idx: number) => {
    const M = MRef.current;
    const container = tagsRefs.current[idx];
    if (!M || !container) return;

    const { Engine, Runner, World, Bodies, Body } = M;
    const W = container.offsetWidth;
    const H = container.offsetHeight;

    const engine = Engine.create({ gravity: { x: 0, y: 2.5 } });
    const runner = Runner.create();
    Runner.run(runner, engine);
    engineRef.current = engine;
    runnerRef.current = runner;

    World.add(engine.world, [
      Bodies.rectangle(W / 2, H + 10, W + 20, 20, { isStatic: true }),
      Bodies.rectangle(-10, H / 2, 20, H * 2, { isStatic: true }),
      Bodies.rectangle(W + 10, H / 2, 20, H * 2, { isStatic: true }),
    ]);

    const service = SERVICES[idx];
    const newBodies: PhysicsTag[] = [];

    service.tags.forEach((tag, i) => {
      const el = document.createElement("div");
      el.textContent = tag;
      Object.assign(el.style, {
        position: "absolute", top: "0", left: "0",
        padding: "4px 11px", border: "1px solid #222",
        borderRadius: "9999px", fontSize: "9px",
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: "#555", background: "#080808",
        whiteSpace: "nowrap", transformOrigin: "center center",
        pointerEvents: "none", fontFamily: "monospace",
      });
      container.appendChild(el);

      const bRect = el.getBoundingClientRect();
      const elW = bRect.width || 76;
      const elH = bRect.height || 24;
      const startX = (W / (service.tags.length + 1)) * (i + 1);
      const startY = -elH - i * 20;

      const body = Bodies.rectangle(startX, startY, elW, elH, {
        restitution: 0.35, friction: 0.5, frictionAir: 0.012, density: 0.002,
      });
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 0.5 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);
      World.add(engine.world, body);
      newBodies.push({ el, body, w: elW, h: elH });
    });

    tagBodies.current = newBodies;

    const sync = () => {
      tagBodies.current.forEach(({ el, body, w, h }) => {
        el.style.transform = \`translate(\${body.position.x - w / 2}px, \${body.position.y - h / 2}px) rotate(\${body.angle}rad)\`;
      });
      syncRafRef.current = requestAnimationFrame(sync);
    };
    syncRafRef.current = requestAnimationFrame(sync);
  }, []);

  const openService = useCallback((idx: number) => {
    const body  = bodyRefs.current[idx];
    const imgs  = imgRefs.current[idx].filter((el): el is HTMLDivElement => el !== null);
    if (!body) return;

    gsap.set(imgs, { y: 22, opacity: 0 });
    gsap.to(body,                    { height: EXPANDED_H, duration: 0.52, ease: "power3.out" });
    gsap.to(titleRefs.current[idx],  { color: "#eaeaea",   duration: 0.2 });
    gsap.to(arrowRefs.current[idx],  { rotate: 45,         duration: 0.25 });
    imgs.forEach((img, i) => {
      gsap.to(img, { y: 0, opacity: 1, duration: 0.4, delay: 0.08 + i * 0.07, ease: "power3.out" });
    });
    setTimeout(() => {
      if (activeRef.current === idx) startPhysics(idx);
    }, 160);
  }, [startPhysics]);

  const closeService = useCallback((idx: number) => {
    const body = bodyRefs.current[idx];
    const imgs = imgRefs.current[idx].filter((el): el is HTMLDivElement => el !== null);
    stopPhysics();
    gsap.to(imgs, { y: 12, opacity: 0, duration: 0.22, stagger: 0.03, ease: "power2.in" });
    if (body) gsap.to(body, { height: 0, duration: 0.38, ease: "power3.inOut", delay: 0.04 });
    gsap.to(titleRefs.current[idx], { color: "#333", duration: 0.2 });
    gsap.to(arrowRefs.current[idx], { rotate: 0,     duration: 0.22 });
  }, [stopPhysics]);

  const handleEnter = useCallback((idx: number) => {
    if (activeRef.current === idx) return;
    if (activeRef.current !== -1) closeService(activeRef.current);
    activeRef.current = idx;
    openService(idx);
  }, [closeService, openService]);

  const handleLeave = useCallback((idx: number) => {
    if (activeRef.current !== idx) return;
    activeRef.current = -1;
    closeService(idx);
  }, [closeService]);

  useEffect(() => {
    bodyRefs.current.forEach((el) => { if (el) gsap.set(el, { height: 0 }); });
    imgRefs.current.forEach((imgs) => imgs.forEach((img) => { if (img) gsap.set(img, { y: 22, opacity: 0 }); }));
    titleRefs.current.forEach((el) => { if (el) gsap.set(el, { color: "#333" }); });
    return () => { stopPhysics(); };
  }, [stopPhysics]);

  return (
    <div className="relative w-full h-screen bg-[#050505] font-mono border-t border-[#111]">
      {SERVICES.map((svc, idx) => (
        <div key={svc.id} className="border-b border-[#111] select-none" style={{ cursor: "crosshair" }}
          onMouseEnter={() => handleEnter(idx)} onMouseLeave={() => handleLeave(idx)}>
          <div className="flex items-center gap-4 px-6 py-5">
            <span className="text-[9px] text-[#252525] tracking-widest w-5 shrink-0">{svc.num}</span>
            <span ref={(el) => { titleRefs.current[idx] = el; }}
              className="text-2xl tracking-tight" style={{ color: "#333" }}>
              {svc.title}
            </span>
            <span ref={(el) => { arrowRefs.current[idx] = el; }}
              className="ml-auto inline-block text-[#2a2a2a] text-sm">↗</span>
          </div>
          <div ref={(el) => { bodyRefs.current[idx] = el; }} className="overflow-hidden" style={{ height: 0 }}>
            <div className="relative px-6 pb-6" style={{ height: EXPANDED_H }}>
              <div className="absolute" style={{ right: 24, top: 8, width: 180, height: 120 }}>
                {svc.imgs?.map((bg: string, imgIdx: number) => (
                  <div key={imgIdx} ref={(el) => { imgRefs.current[idx][imgIdx] = el; }}
                    className="absolute rounded-[3px]"
                    style={{ width: 80, height: 108, background: bg, border: "1px solid #181818",
                      left: imgIdx * 26, top: 0, transform: \`rotate(\${ROTS[imgIdx]}deg)\`, opacity: 0 }} />
                ))}
              </div>
              <div ref={(el) => { tagsRefs.current[idx] = el; }}
                className="absolute overflow-hidden"
                style={{ left: 24, bottom: 24, right: 220, height: TAGS_H }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`;
