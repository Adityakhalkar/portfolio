'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface LoadingComponentProps {
  onLoadComplete: () => void;
}

// Petal SVG (Cherry Blossom shape)
const PetalSVG = ({ color }: { color: string }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 25C0 25 25 0 50 0C75 0 100 25 100 25C100 25 75 50 50 50C25 50 0 25 0 25Z" fill={color} />
    <path d="M10 25C10 25 30 10 50 10C70 10 90 25 90 25C90 25 70 40 50 40C30 40 10 25 10 25Z" fill={`${color}88`} />
    <path d="M20 25C20 25 35 20 50 20C65 20 80 25 80 25C80 25 65 30 50 30C35 30 20 25 20 25Z" fill={`${color}44`} />
  </svg>
)

// Petal component
const Petal = ({ delay, duration, size }: { delay: number; duration: number; size: number }) => {
  const colors = ['#000000']
  const color = colors[Math.floor(Math.random() * colors.length)]
  const rotationAngle = Math.random() * 60 - 30

  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [windowHeight, setWindowHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
  }, []);

  if (windowWidth === null || windowHeight === null) {
    return null; // Don't render the petal until we have the window dimensions
  }

  return (
    <motion.div
      className="absolute"
      style={{ 
        width: size, 
        height: size / 2,
        transformOrigin: 'center',
      }}
      initial={{ 
        x: -size - 100, // Start off-screen to the left
        y: Math.random() * windowHeight, 
        rotate: rotationAngle,
        opacity: 0 
      }}
      animate={{
        x: windowWidth + size, // Move across the screen
        y: [
          Math.random() * windowHeight,
          Math.random() * windowHeight,
        ],
        rotate: [rotationAngle - 10, rotationAngle + 10, rotationAngle - 5],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <PetalSVG color={color} />
    </motion.div>
  )
}

// Loading counter component
const LoadingCounter = ({ progress }: { progress: number }) => (
  <motion.div
    className="text-6xl font-bold text-black text-center"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div>{progress}%</div>
    <div className="text-2xl mt-2">Loading</div>
  </motion.div>
)

// Enter message component
const EnterMessage = ({ onEnter }: { onEnter: () => void }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-4xl font-bold text-black mb-4">Enter the page</h2>
    <Button onClick={onEnter} className="text-xl px-8 py-4">
      Yes
    </Button>
  </motion.div>  
)

export default function LoadingComponent({ onLoadComplete }: LoadingComponentProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const petals = Array.from({ length: 100 }, (_, index) => ({
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 5,
    size: 30 + Math.random() * 40,
  }));

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <AnimatePresence>
          {isLoading ? (
            <LoadingCounter key="loading" progress={progress} />
          ) : (
            <EnterMessage key="enter" onEnter={onLoadComplete} />
          )}
        </AnimatePresence>
      </div>
      {petals.map((petal, index) => (
        <Petal key={index} delay={petal.delay} duration={petal.duration} size={petal.size} />
      ))}
    </div>
  );
}
