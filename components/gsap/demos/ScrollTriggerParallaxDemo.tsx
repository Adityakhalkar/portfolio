"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const ScrollTriggerParallaxDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

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
      // Image - Slow movement
      gsap.to(imgRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          scroller: scrollContainerRef.current,
        },
      });

      // Text - Fast movement (Reverse direction)
      gsap.to(textRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          scroller: scrollContainerRef.current,
        },
      });

      // Shape - Rotation and movement
      gsap.to(shapeRef.current, {
        y: -50,
        rotation: 45,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          scroller: scrollContainerRef.current,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full bg-white dark:bg-black transition-colors duration-500">
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto"
      >
        <div className="h-40 flex items-center justify-center text-xs tracking-widest opacity-30">
          SCROLL TO EXPLORE DEPTH
        </div>

        <div ref={containerRef} className="relative h-[600px] overflow-hidden flex items-center justify-center">
          {/* Background Image Layer */}
          <div
            ref={imgRef}
            className="absolute w-[60%] h-[80%] bg-neutral-200 dark:bg-neutral-800 overflow-hidden"
            style={{ transform: "translateY(-50px)" }}
          >
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-80" />
          </div>

          {/* Foreground Text Layer */}
          <div
            ref={textRef}
            className="absolute z-10 mix-blend-difference text-white pointer-events-none"
            style={{ transform: "translateY(100px)" }}
          >
            <h1 className="text-9xl font-black tracking-tighter leading-none">
              DEPTH
              <br />
              FIELD
            </h1>
          </div>

          {/* Abstract Shape Layer */}
          <div
            ref={shapeRef}
            className="absolute right-[10%] top-[20%] w-32 h-32 border border-black dark:border-white z-20"
          />

          <div className="absolute left-[10%] bottom-[20%] w-[1px] h-32 bg-black dark:bg-white z-20" />
        </div>

        <div className="h-40 flex items-center justify-center text-xs tracking-widest opacity-30">
          END OF SECTION
        </div>
      </div>
    </div>
  );
});

ScrollTriggerParallaxDemo.displayName = "ScrollTriggerParallaxDemo";

export default ScrollTriggerParallaxDemo;
