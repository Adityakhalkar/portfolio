"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  Backend: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB"],
  "AI / ML": ["TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face", "OpenCV"],
  Tools: ["Git", "Docker", "AWS", "Figma", "Vercel"],
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Stagger columns
      if (columnsRef.current) {
        gsap.fromTo(
          columnsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: columnsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-void"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={headingRef}
          className="text-sm tracking-[0.3em] uppercase text-secondary mb-14 opacity-0"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          Skills
        </h2>

        <div
          ref={columnsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8"
        >
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="space-y-4 opacity-0">
              <h3
                className="text-xs tracking-[0.2em] uppercase text-secondary border-b border-secondary/20 pb-2"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {category}
              </h3>
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-black dark:text-concrete font-mono leading-relaxed"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
