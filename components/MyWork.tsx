"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  src: string;
  type: "image" | "video";
  link?: string;
}

interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  hero: GalleryItem;
  gallery: GalleryItem[];
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: "deep-ml",
    title: "Deep-ML",
    tag: "[ML / EDU]",
    description:
      "An open-source platform with hands-on ML coding challenges, interactive labs, and a community leaderboard. Problems vetted by ML professionals across deep learning, computer vision, and NLP.",
    hero: { src: "/images/deep-ml/deep-ml.png", type: "image", link: "https://deep-ml.com" },
    gallery: [
      { src: "/images/deep-ml/deep-0.png", type: "image", link: "https://deep-ml.com/deep-0" },
      { src: "/images/deep-ml/problem-page.png", type: "image", link: "https://deep-ml.com/problems" },
      { src: "/images/deep-ml/paths.png", type: "image", link: "https://deep-ml.com/paths" },
    ],
    link: "https://deep-ml.com",
  },
  {
    id: "greed-js",
    title: "greed.js",
    tag: "[LIB / PERF]",
    description:
      "A JavaScript library that runs pure Python PyTorch code in the browser via WebGPU acceleration. Pyodide + 50+ optimized compute shaders - full deep learning workflows client-side at 271KB.",
    hero: { src: "/images/greedjs/logo.png", type: "image" },
    gallery: [
      { src: "/images/greedjs/github.png", type: "image" },
      { src: "/images/greedjs/npm.png", type: "image" },
      { src: "/images/greedjs/greedjs.mp4", type: "video" },
    ],
    link: "https://github.com/adityakhalkar/greed.js",
  },
  {
    id: "deepubuntu",
    title: "DeepUbuntu",
    tag: "[FREELANCE / AV]",
    description:
      "Freelance build for an autonomous vehicle data startup. Animation-centered visual storytelling designed to convert visitors into inquirers - smooth scroll sequences, interactive data showcases, and a narrative that sells without pushing.",
    hero: { src: "/images/deepubuntu/deepubuntu-landing.mp4", type: "video", link: "https://deepubuntu.com" },
    gallery: [
      { src: "/images/deepubuntu/arch.png", type: "image", link: "https://deepubuntu.com" },
      { src: "/images/deepubuntu/deepav.mp4", type: "video", link: "https://deepubuntu.com" },
      { src: "/images/deepubuntu/blog.png", type: "image", link: "https://deepubuntu.com" },
    ],
    link: "https://deepubuntu.com",
  },
];

function MediaSlot({ item, alt }: { item: GalleryItem; alt: string }) {
  const content =
    item.type === "video" ? (
      <video
        src={item.src}
        className="w-full h-full object-contain"
        autoPlay
        loop
        muted
        playsInline
      />
    ) : (
      <img
        src={item.src}
        alt={alt}
        className="w-full h-full object-contain"
        draggable={false}
      />
    );

  if (item.link) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        {content}
      </a>
    );
  }

  return content;
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const bracketTL = useRef<HTMLSpanElement>(null);
  const bracketTR = useRef<HTMLSpanElement>(null);
  const bracketBL = useRef<HTMLSpanElement>(null);
  const bracketBR = useRef<HTMLSpanElement>(null);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isEven = index % 2 === 0;

  // Detect mobile (< md breakpoint)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Clip-mask scroll reveal
  useEffect(() => {
    if (!cardRef.current) return;

    gsap.set(cardRef.current, {
      clipPath: "inset(50% 0% 50% 0%)",
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.to(cardRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        // Remove clipPath so the expanded container isn't clipped by card bounds
        if (cardRef.current) gsap.set(cardRef.current, { clipPath: "none" });
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      if (cardRef.current) gsap.set(cardRef.current, { clearProps: "all" });
    };
  }, []);

  // Build hover timeline ONCE, paused -- play() on enter, reverse() on leave
  // On mobile: show 2x2 grid permanently, no hover interaction
  useEffect(() => {
    const container = containerRef.current;
    const hero = heroRef.current;
    const text = textRef.current;
    const imgs = [img1Ref.current, img2Ref.current, img3Ref.current];
    const brackets = [bracketTL.current, bracketTR.current, bracketBL.current, bracketBR.current];

    if (!container || !hero || !text || imgs.some((i) => !i) || brackets.some((b) => !b)) return;

    if (isMobile) {
      // Mobile: show 2x2 grid permanently, hero takes top-left quadrant
      gsap.set(imgs, { opacity: 1, scale: 1 });
      gsap.set(hero, { width: "50%", height: "50%" });
      gsap.set(container, { scaleX: 1, scaleY: 1, zIndex: 1 });
      hoverTl.current = null;
      return () => {
        [container, hero, text, ...imgs, ...brackets].forEach((el) => {
          if (el) gsap.set(el, { clearProps: "all" });
        });
      };
    }

    // Desktop: hover expansion
    const scaleXVal = 2;
    const scaleYVal = 1.8;
    const invScaleX = 1 / scaleXVal;
    const invScaleY = 1 / scaleYVal;

    // Set initial states so GSAP knows the start values for reverse
    gsap.set(imgs, { opacity: 0, scale: 0.92 });
    gsap.set(hero, { width: "100%", height: "100%" });
    gsap.set(container, { scaleX: 1, scaleY: 1, zIndex: 1 });
    gsap.set(text, { opacity: 1, x: 0 });
    gsap.set(brackets, { x: 0, y: 0, scale: 1, borderRadius: 0 });

    const tl = gsap.timeline({ paused: true });

    // Remove clipPath on card so expansion isn't clipped
    tl.set(cardRef.current!, { clipPath: "none", overflow: "visible" }, 0);

    // Container stretches wider on X, less on Y
    tl.to(container, {
      scaleX: scaleXVal,
      scaleY: scaleYVal,
      zIndex: 30,
      duration: 0.7,
      ease: "power3.inOut",
    }, 0);

    // Hero shrinks into top-left quadrant
    tl.to(hero, {
      width: "50%",
      height: "50%",
      duration: 0.6,
      ease: "power3.inOut",
    }, 0);

    // Gallery images fade in at grid positions
    tl.to(imgs[0], { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0.1);
    tl.to(imgs[1], { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0.15);
    tl.to(imgs[2], { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0.2);

    // Text fades out
    tl.to(text, {
      opacity: 0,
      x: isEven ? -20 : 20,
      duration: 0.35,
      ease: "power2.in",
    }, 0);

    // Brackets: spread outward, counteract parent scale, add curve for stretched look
    tl.to(brackets[0], {
      x: -6, y: -6, scaleX: invScaleX, scaleY: invScaleY,
      borderTopLeftRadius: "14px",
      duration: 0.7, ease: "power3.inOut",
    }, 0);
    tl.to(brackets[1], {
      x: 6, y: -6, scaleX: invScaleX, scaleY: invScaleY,
      borderTopRightRadius: "14px",
      duration: 0.7, ease: "power3.inOut",
    }, 0);
    tl.to(brackets[2], {
      x: -6, y: 6, scaleX: invScaleX, scaleY: invScaleY,
      borderBottomLeftRadius: "14px",
      duration: 0.7, ease: "power3.inOut",
    }, 0);
    tl.to(brackets[3], {
      x: 6, y: 6, scaleX: invScaleX, scaleY: invScaleY,
      borderBottomRightRadius: "14px",
      duration: 0.7, ease: "power3.inOut",
    }, 0);

    hoverTl.current = tl;

    return () => {
      tl.kill();
      // Clear all GSAP inline styles so HMR re-renders cleanly
      [container, hero, text, ...imgs, ...brackets].forEach((el) => {
        if (el) gsap.set(el, { clearProps: "all" });
      });
    };
  }, [isEven, isMobile]);

  return (
    <div
      ref={cardRef}
      className={`
        relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16
        py-16 md:py-0 md:min-h-screen px-6 md:px-16
        ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
      `}
    >
      {/* Image side */}
      <div
        className="relative w-full md:w-1/2 z-20"
        onMouseEnter={isMobile ? undefined : () => {
          delayTimer.current = setTimeout(() => {
            hoverTl.current?.play();
          }, 500);
        }}
        onMouseLeave={isMobile ? undefined : () => {
          if (delayTimer.current) {
            clearTimeout(delayTimer.current);
            delayTimer.current = null;
          }
          hoverTl.current?.reverse();
        }}
      >
        {/* Image container -- brackets live inside so they scale with it */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3]"
          style={{ transformOrigin: isEven ? "top left" : "top right" }}
        >
          {/* Corner brackets (CSS borders, animatable border-radius for curve) */}
          <span
            ref={bracketTL}
            className="absolute -top-2 -left-2 w-6 h-6 z-30 border-t-2 border-l-2 border-black dark:border-white pointer-events-none"
          />
          <span
            ref={bracketTR}
            className="absolute -top-2 -right-2 w-6 h-6 z-30 border-t-2 border-r-2 border-black dark:border-white pointer-events-none"
          />
          <span
            ref={bracketBL}
            className="absolute -bottom-2 -left-2 w-6 h-6 z-30 border-b-2 border-l-2 border-black dark:border-white pointer-events-none"
          />
          <span
            ref={bracketBR}
            className="absolute -bottom-2 -right-2 w-6 h-6 z-30 border-b-2 border-r-2 border-black dark:border-white pointer-events-none"
          />

          {/* Hero -- morphs into top-left slot */}
          <div
            ref={heroRef}
            className="absolute top-0 left-0 w-full h-full z-10 bg-gray-100 dark:bg-gray-900"
          >
            <MediaSlot item={project.hero} alt={project.title} />
          </div>

          {/* Gallery at grid positions -- hidden by default */}
          <div
            ref={img1Ref}
            className="absolute top-0 left-[50%] w-[50%] h-[50%] bg-gray-100 dark:bg-gray-900"
          >
            <MediaSlot item={project.gallery[0]} alt={`${project.title} 2`} />
          </div>
          <div
            ref={img2Ref}
            className="absolute top-[50%] left-0 w-[50%] h-[50%] bg-gray-100 dark:bg-gray-900"
          >
            <MediaSlot item={project.gallery[1]} alt={`${project.title} 3`} />
          </div>
          <div
            ref={img3Ref}
            className="absolute top-[50%] left-[50%] w-[50%] h-[50%] bg-gray-100 dark:bg-gray-900"
          >
            <MediaSlot item={project.gallery[2]} alt={`${project.title} 4`} />
          </div>
        </div>
      </div>

      {/* Text side */}
      <div ref={textRef} className="w-full md:w-1/2 space-y-4">
        <span className="text-xs tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 font-mono">
          {project.tag}
        </span>
        <h3
          className="text-3xl md:text-5xl font-bold text-black dark:text-white tracking-tight"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          {project.title}
        </h3>
        <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-md font-mono">
          {project.description}
        </p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-mono text-black dark:text-white
            border-b border-current pb-0.5 hover:pb-1 transition-all duration-200
            tracking-wider uppercase"
        >
          View Project
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="transition-transform duration-300 ease-out group-hover:-rotate-45"
          >
            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function MyWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    gsap.set(headingRef.current, {
      clipPath: "inset(0% 100% 0% 0%)",
    });

    const tween = gsap.to(headingRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      if (headingRef.current) gsap.set(headingRef.current, { clearProps: "all" });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white dark:bg-void py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="px-6 md:px-16 mb-8">
          <h2
            ref={headingRef}
            className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            My Work
          </h2>
          <div className="mt-4 w-16 h-px bg-gray-300 dark:bg-gray-700" />
        </div>

        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
