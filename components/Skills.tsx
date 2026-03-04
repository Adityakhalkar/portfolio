"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillsData = {
  "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  "Backend": ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB"],
  "AI / ML": ["TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face", "OpenCV"],
  "Tools": ["Git", "Docker", "AWS", "Figma", "Vercel"]
};

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-8 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-16 tracking-tight text-center md:text-left"
        >
          TECHNICAL ARSENAL
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold font-['Space_Grotesk'] text-secondary uppercase tracking-widest border-b border-secondary/20 pb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-background border border-secondary/20 rounded-full text-sm font-['Inter'] text-secondary hover:border-accent hover:text-accent transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
