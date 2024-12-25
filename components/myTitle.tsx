"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PixelMaskTransitionProps {
  texts: string[]
  className?: string
}

const PixelMaskTransition: React.FC<PixelMaskTransitionProps> = ({ texts, className = '' }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pixels, setPixels] = useState<{ x: number; y: number }[]>([])

  const maskSize = { width: 300, height: 100 }
  const pixelSize = 10
  const columns = Math.floor(maskSize.width / pixelSize)
  const rows = Math.floor(maskSize.height / pixelSize)
  const totalPixels = columns * rows

  const allPositions = useMemo(() => {
    const positions = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        positions.push({ x, y })
      }
    }
    return positions
  }, [columns, rows])

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
    }, 5000)

    return () => clearInterval(interval)
  }, [texts])

  useEffect(() => {
    if (isTransitioning) {
      const shuffledPositions = shuffleArray([...allPositions])
      const newPixels = shuffledPositions.slice(0, totalPixels)
      setPixels(newPixels)

      const timeout = setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        setIsTransitioning(false)
      }, 1500) 

      return () => clearTimeout(timeout)
    }
  }, [isTransitioning, texts, allPositions, totalPixels])

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ width: maskSize.width, height: maskSize.height }}
    >
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {pixels.map((pixel, index) => (
              <motion.div
                key={index}
                className="absolute bg-white dark:bg-black"
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  left: pixel.x * pixelSize,
                  top: pixel.y * pixelSize,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.001 }} // Slightly staggered animation
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        key={currentTextIndex}
        className="absolute inset-0 flex items-center justify-center text-zinc-500 font-press-start text-2xl text-center z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {texts[currentTextIndex]}
      </motion.div>
    </div>
  )
}

export default PixelMaskTransition

