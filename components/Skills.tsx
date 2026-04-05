"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════
   Minecraft Inventory — Skills Section
   ════════════════════════════════════════ */

type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

interface Skill {
  name: string;
  icon: string; // devicon CDN path
  rarity: Rarity;
  desc: string;
  category: string;
}

const RARITY_COLOR: Record<Rarity, string> = {
  common: "#AAAAAA",
  uncommon: "#55FF55",
  rare: "#5555FF",
  epic: "#AA00AA",
  legendary: "#FFAA00",
};

const DI = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

/* ── Skills data ── */

const HOTBAR: Skill[] = [
  { name: "TypeScript", icon: DI("typescript"), rarity: "legendary", desc: "Primary language. Full-stack typed.", category: "Language" },
  { name: "React", icon: DI("react"), rarity: "legendary", desc: "Component architecture. Hooks.", category: "Framework" },
  { name: "Next.js", icon: DI("nextjs"), rarity: "epic", desc: "App Router. SSR/SSG/ISR.", category: "Framework" },
  { name: "Python", icon: DI("python"), rarity: "epic", desc: "ML pipelines. FastAPI.", category: "Language" },
  { name: "Node.js", icon: DI("nodejs"), rarity: "epic", desc: "Runtime of choice. APIs.", category: "Runtime" },
  { name: "Tailwind CSS", icon: DI("tailwindcss"), rarity: "rare", desc: "Utility-first CSS.", category: "Styling" },
  { name: "Git", icon: DI("git"), rarity: "rare", desc: "Version control.", category: "Tool" },
  { name: "Figma", icon: DI("figma"), rarity: "rare", desc: "Design to code.", category: "Design" },
  { name: "PostgreSQL", icon: DI("postgresql"), rarity: "rare", desc: "Relational DB.", category: "Database" },
];

const INVENTORY: (Skill | null)[] = [
  { name: "JavaScript", icon: DI("javascript"), rarity: "epic", desc: "The OG. ES2024+.", category: "Language" },
  { name: "HTML5", icon: DI("html5"), rarity: "uncommon", desc: "Semantic markup.", category: "Language" },
  { name: "CSS3", icon: DI("css3"), rarity: "uncommon", desc: "Modern CSS. Grid. Flex.", category: "Language" },
  { name: "C++", icon: DI("cplusplus"), rarity: "uncommon", desc: "Competitive programming.", category: "Language" },
  { name: "Docker", icon: DI("docker"), rarity: "rare", desc: "Containerization.", category: "DevOps" },
  { name: "AWS", icon: DI("amazonwebservices", "original-wordmark"), rarity: "rare", desc: "EC2, S3, Lambda.", category: "Cloud" },
  { name: "MongoDB", icon: DI("mongodb"), rarity: "uncommon", desc: "Document store.", category: "Database" },
  { name: "Redis", icon: DI("redis"), rarity: "uncommon", desc: "Caching. Pub/sub.", category: "Database" },
  { name: "GraphQL", icon: DI("graphql", "plain"), rarity: "uncommon", desc: "API queries.", category: "API" },
  { name: "Firebase", icon: DI("firebase"), rarity: "uncommon", desc: "Auth. Firestore.", category: "Cloud" },
  { name: "Prisma", icon: DI("prisma"), rarity: "uncommon", desc: "Type-safe ORM.", category: "Tool" },
  { name: "Three.js", icon: DI("threejs"), rarity: "uncommon", desc: "WebGL. 3D.", category: "Library" },
  { name: "TensorFlow", icon: DI("tensorflow"), rarity: "uncommon", desc: "ML models.", category: "ML" },
  { name: "Vercel", icon: DI("vercel"), rarity: "uncommon", desc: "Deploy. Edge.", category: "Platform" },
  { name: "Linux", icon: DI("linux"), rarity: "uncommon", desc: "Shell scripting.", category: "Tool" },
  { name: "Rust", icon: DI("rust"), rarity: "common", desc: "Learning. Systems.", category: "Language" },
  null, null, null, null, null, null, null, null, null, null, null,
];

// Crafting recipes — order-independent, matched by skill names in the grid
// Just like Minecraft: most combos do nothing, but the right ones are satisfying
interface Recipe {
  ingredients: string[]; // skill names (sorted for matching)
  output: string;
  usedBy: string;
  rarity: Rarity;
}

const RECIPES: Recipe[] = [
  { ingredients: ["React", "TypeScript"], output: "Modern Frontend", usedBy: "Vercel, Stripe, Linear", rarity: "epic" },
  { ingredients: ["Next.js", "Tailwind CSS"], output: "Ship Fast Stack", usedBy: "Shadcn, Cal.com, Vercel", rarity: "epic" },
  { ingredients: ["Python", "TensorFlow"], output: "ML Pipeline", usedBy: "Google, OpenAI, DeepMind", rarity: "legendary" },
  { ingredients: ["Node.js", "MongoDB"], output: "MERN Backend", usedBy: "Uber, Trello, eBay", rarity: "rare" },
  { ingredients: ["Docker", "AWS"], output: "Cloud Deploy", usedBy: "Every startup ever", rarity: "rare" },
  { ingredients: ["PostgreSQL", "Prisma"], output: "Type-Safe DB", usedBy: "Vercel, Supabase", rarity: "rare" },
  { ingredients: ["React", "Firebase"], output: "Rapid Prototype", usedBy: "Indie hackers everywhere", rarity: "uncommon" },
  { ingredients: ["TypeScript", "Node.js"], output: "Backend TS", usedBy: "Slack, Revolut, Asana", rarity: "epic" },
  { ingredients: ["Python", "Docker"], output: "ML Ops", usedBy: "Every ML team", rarity: "rare" },
  { ingredients: ["React", "Next.js"], output: "SSR App", usedBy: "Netflix, TikTok, Hulu", rarity: "epic" },
  { ingredients: ["Redis", "Node.js"], output: "Fast Cache", usedBy: "Twitter, GitHub, StackOverflow", rarity: "rare" },
  { ingredients: ["TypeScript", "GraphQL"], output: "Typed API", usedBy: "Shopify, GitHub, Airbnb", rarity: "rare" },
  { ingredients: ["React", "TypeScript", "Next.js"], output: "Holy Trinity", usedBy: "The entire modern web", rarity: "legendary" },
  { ingredients: ["React", "TypeScript", "Tailwind CSS", "Next.js"], output: "God Stack", usedBy: "You're reading it right now", rarity: "legendary" },
  { ingredients: ["Python", "TensorFlow", "Docker"], output: "ML in Prod", usedBy: "Google, Tesla, Spotify", rarity: "legendary" },
  { ingredients: ["AWS", "Docker", "Node.js"], output: "Scalable Infra", usedBy: "Most of YC", rarity: "epic" },
];

function findRecipe(slots: (Skill | null)[]): Recipe | null {
  const names = slots.filter(Boolean).map((s) => s!.name).sort();
  if (names.length < 2) return null;
  return RECIPES.find((r) => {
    const sorted = [...r.ingredients].sort();
    return sorted.length === names.length && sorted.every((n, i) => n === names[i]);
  }) || null;
}

const SLOT = 44;
const COLS = 9;

/* ── Slot component ── */
function MCSlot({
  skill,
  size = SLOT,
  onHover,
  onLeave,
  onClick,
  placeholder,
}: {
  skill: Skill | null;
  size?: number;
  onHover: (skill: Skill) => void;
  onLeave: () => void;
  onClick?: () => void;
  placeholder?: React.ReactNode;
}) {
  const iconSize = Math.floor(size * 0.6);

  return (
    <div
      className={`relative group ${onClick ? "cursor-pointer" : ""}`}
      onMouseEnter={() => skill && onHover(skill)}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        background: "#8b8b8b",
        borderTop: "2px solid #373737",
        borderLeft: "2px solid #373737",
        borderBottom: "2px solid #fff",
        borderRight: "2px solid #fff",
      }}
    >
      {/* Hover highlight */}
      {skill && (
        <div
          className="absolute inset-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none z-10"
          style={{ background: "rgba(255,255,255,0.3)" }}
        />
      )}

      {/* Icon */}
      {skill && skill.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={skill.icon}
          alt={skill.name}
          className="absolute pointer-events-none"
          style={{
            width: iconSize,
            height: iconSize,
            top: (size - iconSize) / 2,
            left: (size - iconSize) / 2,
            imageRendering: "auto",
            filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.4))",
          }}
          draggable={false}
        />
      ) : skill ? (
        // Text fallback for skills without icons
        <span
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 9,
            color: RARITY_COLOR[skill.rarity],
            textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
            lineHeight: 1.1,
            textAlign: "center",
            padding: 2,
          }}
        >
          {skill.name.length > 6 ? skill.name.slice(0, 6) : skill.name}
        </span>
      ) : placeholder ? (
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          {placeholder}
        </span>
      ) : null}
    </div>
  );
}

/* ── Tooltip — exact Minecraft style ── */
function MCTooltip({
  skill,
  pos,
}: {
  skill: Skill | null;
  pos: { x: number; y: number };
}) {
  if (!skill) return null;

  return (
    <div
      className="fixed z-[100] pointer-events-none"
      style={{ left: pos.x + 14, top: pos.y - 30 }}
    >
      {/* Outer border (dark purple) */}
      <div
        style={{
          background: "#100010",
          padding: 2,
        }}
      >
        {/* Inner border (bright purple) */}
        <div
          style={{
            background: "#100010",
            border: "2px solid #2d0080",
            padding: "4px 6px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-minecraft)",
              fontSize: 16,
              color: "#fff",
              whiteSpace: "nowrap",
              textShadow: "2px 2px 0 #3f3f3f",
            }}
          >
            {skill.name}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Main component
   ════════════════════════════════════════ */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inventoryRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skinRef = useRef<{ head: { rotation: { x: number; y: number } } } | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [craftSlots, setCraftSlots] = useState<(Skill | null)[]>([null, null, null, null]);
  const craftResult = findRecipe(craftSlots);

  // Tooltip follows cursor
  useEffect(() => {
    const handler = (e: MouseEvent) => setTooltipPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // 3D skin viewer
  useEffect(() => {
    if (!canvasRef.current) return;

    let viewer: { dispose: () => void; controls: { enableRotate: boolean; enableZoom: boolean }; playerObject: { skin: { head: { rotation: { x: number; y: number } } } }; animation: unknown } | null = null;

    import("skinview3d").then((skinview3d) => {
      if (!canvasRef.current) return;

      viewer = new skinview3d.SkinViewer({
        canvas: canvasRef.current,
        width: 140,
        height: 170,
        skin: "/images/minecraft-skin.png",
      });

      viewer.controls.enableRotate = false;
      viewer.controls.enableZoom = false;
      viewer.animation = new skinview3d.IdleAnimation();
      skinRef.current = viewer.playerObject.skin;
    });

    return () => {
      if (viewer) viewer.dispose();
    };
  }, []);

  // Head follows cursor
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!canvasRef.current || !skinRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.3;

      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      skinRef.current.head.rotation.y = Math.max(-0.8, Math.min(0.8, dx * 0.8));
      skinRef.current.head.rotation.x = Math.max(-0.5, Math.min(0.5, dy * 0.5));
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(headingRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 0);
      tl.fromTo(inventoryRef.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }, 0.15);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleHover = useCallback((skill: Skill) => setHoveredSkill(skill), []);
  const handleLeave = useCallback(() => setHoveredSkill(null), []);

  // Click inventory/hotbar skill → add to first empty craft slot
  const addToCraft = useCallback((skill: Skill) => {
    setCraftSlots((prev) => {
      // Don't add if already in the grid
      if (prev.some((s) => s?.name === skill.name)) return prev;
      const next = [...prev];
      const emptyIdx = next.indexOf(null);
      if (emptyIdx === -1) return prev;
      next[emptyIdx] = skill;
      return next;
    });
  }, []);

  // Click craft slot → remove it
  const removeFromCraft = useCallback((idx: number) => {
    setCraftSlots((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
  }, []);

  // Click output → clear the grid
  const clearCraft = useCallback(() => {
    setCraftSlots([null, null, null, null]);
  }, []);

  // Pad inventory to 3 rows
  const padded = [...INVENTORY];
  while (padded.length < COLS * 3) padded.push(null);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-void">
      <div className="max-w-3xl mx-auto">
        <h2
          ref={headingRef}
          className="text-sm tracking-[0.3em] uppercase text-secondary mb-10 md:mb-12 opacity-0"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          Skills
        </h2>

        {/* ── Minecraft Inventory Panel ── */}
        <div
          ref={inventoryRef}
          className="opacity-0 select-none w-fit mx-auto"
          style={{
            background: "#c6c6c6",
            borderTop: "4px solid #fff",
            borderLeft: "4px solid #fff",
            borderBottom: "4px solid #555",
            borderRight: "4px solid #555",
            padding: "10px",
            boxShadow: "4px 4px 0 #00000022",
          }}
        >
          {/* ── Top: Character + Crafting ── */}
          <div className="flex gap-3 mb-3">
            {/* Character preview */}
            <div
              style={{
                width: 140,
                height: 170,
                background: "#222",
                borderTop: "2px solid #111",
                borderLeft: "2px solid #111",
                borderBottom: "2px solid #444",
                borderRight: "2px solid #444",
                overflow: "hidden",
              }}
            >
              <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
            </div>

            {/* Crafting area */}
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: "var(--font-minecraft)",
                  fontSize: 14,
                  color: "#404040",
                  marginBottom: 6,
                  textShadow: "1px 1px 0 #c0c0c0",
                }}
              >
                Crafting
              </span>

              <div className="flex items-center gap-3">
                {/* 2x2 grid — click to remove */}
                <div className="grid grid-cols-2 gap-[2px]">
                  {craftSlots.map((skill, i) => (
                    <MCSlot
                      key={`cr-${i}`}
                      skill={skill}
                      onHover={handleHover}
                      onLeave={handleLeave}
                      onClick={() => removeFromCraft(i)}
                    />
                  ))}
                </div>

                {/* Arrow */}
                <svg width="24" height="16" viewBox="0 0 24 16">
                  <path d="M0 6h16v-4l8 6-8 6v-4H0z" fill="#8b8b8b" />
                  <path d="M0 7h16v-3l6 4.5-6 4.5v-3H0z" fill="#a0a0a0" />
                </svg>

                {/* Output — shows recipe result or empty */}
                <div className="flex flex-col items-center gap-1">
                  <MCSlot
                    skill={
                      craftResult
                        ? { name: craftResult.output, icon: "", rarity: craftResult.rarity, desc: craftResult.usedBy, category: "" }
                        : null
                    }
                    size={SLOT + 8}
                    onHover={handleHover}
                    onLeave={handleLeave}
                    onClick={clearCraft}
                  />
                </div>
              </div>

              {/* Recipe result text */}
              <div className="mt-2 min-h-[28px]">
                {craftResult ? (
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-minecraft)",
                        fontSize: 11,
                        color: RARITY_COLOR[craftResult.rarity],
                        textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
                      }}
                    >
                      {craftResult.output}
                    </span>
                    <div
                      style={{
                        fontFamily: "var(--font-pixel)",
                        fontSize: 9,
                        color: "#666",
                        marginTop: 2,
                      }}
                    >
                      Used by: {craftResult.usedBy}
                    </div>
                  </div>
                ) : craftSlots.some(Boolean) ? (
                  <span
                    style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: 9,
                      color: "#888",
                    }}
                  >
                    no recipe found
                  </span>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: 9,
                      color: "#aaa",
                    }}
                  >
                    click skills to craft
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Main inventory (3x9) ── */}
          <div
            className="grid gap-[2px] mb-1"
            style={{ gridTemplateColumns: `repeat(${COLS}, ${SLOT}px)` }}
          >
            {padded.map((skill, i) => (
              <MCSlot key={`i-${i}`} skill={skill} onHover={handleHover} onLeave={handleLeave} onClick={skill ? () => addToCraft(skill) : undefined} />
            ))}
          </div>

          {/* ── Hotbar (separated) ── */}
          <div className="h-[6px]" />
          <div
            className="grid gap-[2px]"
            style={{ gridTemplateColumns: `repeat(${COLS}, ${SLOT}px)` }}
          >
            {HOTBAR.map((skill, i) => (
              <MCSlot key={`hb-${i}`} skill={skill} onHover={handleHover} onLeave={handleLeave} onClick={() => addToCraft(skill)} />
            ))}
          </div>
        </div>
      </div>

      <MCTooltip skill={hoveredSkill} pos={tooltipPos} />
    </section>
  );
}
