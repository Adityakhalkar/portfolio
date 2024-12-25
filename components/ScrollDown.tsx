'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ScrollDownProps {
  targetId: string
}
const arrowVariants = {
    initial: { y: -5, rotate: 180 },
    animate: { 
      y: 5,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.8
      }
    }
  }

const ScrollDown: React.FC<ScrollDownProps> = ({ targetId }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`fixed bottom-8 transform text-zinc-600 dark:text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out font-['Press_Start_2P'] text-sm flex flex-col items-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 20 }}
      exit={{ y: 20, opacity: 0 }}
      aria-label="Scroll Down"
    >
      Scroll
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={arrowVariants}
        initial="initial"
        animate="animate"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
        <rect x="20" y="10" width="10" height="5" fill="black"/>
        <rect x="15" y="15" width="5" height="5" fill="black"/>
        <rect x="10" y="20" width="5" height="5" fill="black"/>
        <rect x="5" y="25" width="5" height="5" fill="black"/>
        <rect x="40" y="25" width="5" height="5" fill="black"/>
        <rect x="35" y="20" width="5" height="5" fill="black"/>
        <rect x="30" y="15" width="5" height="5" fill="black"/>
        </svg>
      </motion.svg>
    </motion.button>
  )
}

export default ScrollDown

