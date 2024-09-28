'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSound } from 'use-sound'

const fonts = [
  'font-serif',
  'font-mono',
  'font-sans',
  'font-cursive',
  'font-fantasy',
  'font-display',
  'font-handwriting',
  'font-orbitron'
]

export default function Hero() {
  const [currentFont, setCurrentFont] = useState(0)
  const [showName, setShowName] = useState(true)
  const [play] = useSound('/click.wav', { volume: 0.5 })

  useEffect(() => {
    if (currentFont < fonts.length - 1) {
      const timer = setTimeout(() => {
        setShowName(false)
        play()
        setTimeout(() => {
          setCurrentFont(prev => (prev + 1) % fonts.length)
          setShowName(true)
        }, 100)
      }, 300) // Faster font change
      return () => clearTimeout(timer)
    }
  }, [currentFont, play])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-pink-600 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating particles in the background */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-20"
        animate={{ x: [-100, 100], y: [-50, 50] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      >
        {/* Adding minimalistic animation like floating petals */}
        <div className="w-32 h-32 rounded-full bg-pink-300 opacity-50 blur-xl"></div>
      </motion.div>

      <div className="text-center mb-8 z-10">
        <AnimatePresence mode="wait">
          {showName && (
            <motion.h1
              key={currentFont}
              className={`text-4xl sm:text-6xl md:text-7xl font-bold text-white ${fonts[currentFont]}`}
              initial={{ opacity: 0, y: -20, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: [0, 5, -5, 0] }} // Subtle rotation animation
              exit={{ opacity: 0, y: 20, rotate: 0 }}
              transition={{ duration: 0.2 }} // Faster transition for smoother effect
            >
              Aditya Khalkar
            </motion.h1>
          )}
        </AnimatePresence>

        <motion.p
          className="text-xl sm:text-2xl text-white mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          Full Stack Developer | Data Scientist | Machine Learning Enthusiast
        </motion.p>
      </div>

      <motion.div
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5trt9i14X7j?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify playlist"
        ></iframe>
      </motion.div>
    </div>
  )
}
