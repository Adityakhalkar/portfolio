'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { HoverEffect } from "@/components/ui/card-hover-effect"

const skillCategories = [
  {
    title: "Languages",
    description: "Proficient in multiple programming languages for versatile development.",
    skills: ["Python", "JavaScript", "C/C++", "SQL", "HTML/CSS"],
  },
  {
    title: "Frameworks & Libraries",
    description: "Experienced with modern tools for web, data, and ML development.",
    skills: ["FastAPI", "Flask", "Node.js", "React", "Selenium", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "Pytorch"],
  },
  {
    title: "Tools",
    description: "Skilled in industry-standard tools for version control and deployment.",
    skills: ["Git", "GitHub", "Docker", "Google Cloud", "AWS EC2"],
  },
  {
    title: "Databases",
    description: "Proficient in both relational and NoSQL database systems.",
    skills: ["MySQL", "MongoDB"],
  },
  {
    title: "Design",
    description: "Capable of creating user-friendly interfaces and prototypes.",
    skills: ["Figma"],
  }
]

export default function Skillset() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.h2 
        className="text-4xl font-bold text-center mb-12 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Skillset
      </motion.h2>

      <div className="max-w-7xl mx-auto">
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </CanvasRevealEffect>
      </div>

      <div className="max-w-7xl mx-auto mt-16">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Explore My Skills</h3>
        <HoverEffect items={skillCategories.map(category => ({
          title: category.title,
          description: category.description,
          link: '#'
        }))} />
      </div>
    </div>
  )
}