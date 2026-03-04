"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const HorizontalScrollDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          scrollContainerRef.current?.scrollTo({
            top: scrollContainerRef.current.scrollHeight / 2,
            behavior: "smooth"
          });
        }, 100);
      }
    },
    reset: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".h-panel");
      const images = gsap.utils.toArray<HTMLElement>(".h-image");

      // Horizontal scroll
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: panelsContainerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (panelsContainerRef.current?.offsetWidth || 0) * panels.length,
          scroller: scrollContainerRef.current,
        },
      });

      // Internal parallax for images
      images.forEach((img) => {
        gsap.to(img, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            containerAnimation: gsap.getTweensOf(panels)[0],
            start: "left right",
            end: "right left",
            scrub: true,
            scroller: scrollContainerRef.current,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-white dark:bg-black transition-colors duration-500">
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto"
      >
        <div className="h-40 flex flex-col items-center justify-center text-xs tracking-widest uppercase border-b border-black/10 dark:border-white/10">
          <div className="mb-2">Infinite Gallery</div>
          <div className="w-[1px] h-8 bg-black dark:bg-white animate-bounce" />
        </div>

        <div
          ref={panelsContainerRef}
          className="h-[400px] flex w-full overflow-hidden"
        >
          {[
            { id: "01", title: "ABSTRACT", img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1000&auto=format&fit=crop" },
            { id: "02", title: "MINIMAL", img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop" },
            { id: "03", title: "STRUCTURE", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" },
            { id: "04", title: "FORM", img: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=1000&auto=format&fit=crop" },
            { id: "05", title: "VOID", img: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1000&auto=format&fit=crop" },
          ].map((item, i) => (
            <div
              key={i}
              className="h-panel w-full flex-shrink-0 flex items-center justify-center px-20"
            >
              <div className="relative w-full max-w-lg aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900 group">
                {/* Parallax Image */}
                <div className="h-image absolute inset-0 w-[120%] h-full -left-[10%]">
                  <div
                    className="w-full h-full bg-cover bg-center grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between mix-blend-difference text-white pointer-events-none">
                  <div className="text-6xl font-black tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {item.id}
                  </div>
                  <div className="text-right">
                    <div className="text-xs tracking-[0.3em] font-mono mb-2">{item.title}</div>
                    <div className="w-full h-[1px] bg-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[1000px] flex items-center justify-center text-xs tracking-widest opacity-20">
          SCROLL SPACE
        </div>
      </div>
    </div>
  );
});

HorizontalScrollDemo.displayName = "HorizontalScrollDemo";

export default HorizontalScrollDemo;
