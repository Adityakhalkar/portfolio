"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    company: "Deep-ML",
    role: "Co-founder",
    period: "Sept '24 - Present",
    description: "Building the future of machine learning education and tools.",
    link: "https://deep-ml.com"
  },
  {
    company: "ShinobiAI",
    role: "Full Stack Developer Intern",
    period: "Jan '23 - Aug '24",
    description: "Developed scalable web applications and integrated AI solutions.",
    link: "https://another-example.com"
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-16 tracking-tight"
        >
          EXPERIENCE
        </motion.h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group border-l-2 border-secondary/20 pl-8 hover:border-accent transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] group-hover:text-accent transition-colors">
                  {exp.company}
                </h3>
                <span className="font-['Inter'] text-sm text-secondary font-medium">
                  {exp.period}
                </span>
              </div>
              <p className="text-lg md:text-xl font-['Inter'] font-medium mb-2">
                {exp.role}
              </p>
              <p className="font-['Inter'] text-secondary leading-relaxed max-w-2xl">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
