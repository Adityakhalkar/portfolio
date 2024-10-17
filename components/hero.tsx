'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Button } from "@/components/ui/moving-border"

const skills = ['Full Stack Developer', 'UI Designer', 'Data Engineer', 'ML Enthusiast']

export default function Hero() {
  const [currentSkill, setCurrentSkill] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length)
    }, 5000) // Change skill every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen bg-white text-black flex flex-col items-center justify-center overflow-hidden">
      <BackgroundBeams />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mb-8"
        >
          <Image
            src="/adityakhalkar.gif" 
            alt="Aditya Khalkar"
            width={600}
            height={500}
            className="rounded-lg"
            unoptimized
          />
        </motion.div>

        <div className="h-20 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSkill}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TextGenerateEffect words={skills[currentSkill]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className="z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Explore My Work
        </Button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 z-10 flex space-x-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {[
          { name: 'GitHub', icon: Github, url: '#' },
          { name: 'LinkedIn', icon: Linkedin, url: '#' },
          { name: 'Twitter', icon: Twitter, url: '#' }
        ].map((platform) => (
          <motion.a
            key={platform.name}
            href={platform.url}
            whileHover={{ y: -3, color: "#3B82F6" }}
            className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
          >
            <platform.icon size={24} />
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Contact Me
        </Button>
      </motion.div>
    </div>
  )
}