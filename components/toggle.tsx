'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes";
import { motion } from 'framer-motion'

const LightbulbAnimation = () => {
  const [isOn, setIsOn] = useState(true)
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (theme === "light") {
      setIsOn(true)
    }
    else {
      setIsOn(false)
    }
  }, [theme]);

  if (!mounted) return null;
  const toggleTheme = () => {
    setIsOn(!isOn);
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed top-0 right-4 z-10 ">
      <svg width="100" height="100" viewBox="0 0 100 100" className="cursor-pointer">
        <defs>
          <clipPath id="mask">
            <motion.rect
              width="100"
              height="100"
              initial={{ x: 200 }}
              animate={{ x: isOn ? 200 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </clipPath>
        </defs>

        <motion.g
          initial={{ y: -15, rotate: 180 }}
          animate={{ y: isOn ? -15 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Lightbulb On */}
          <motion.image
            href="/lightbulb-on.svg"
            width="50"
            height="50"
            onClick={toggleTheme}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOn ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Lightbulb Off */}
          <motion.image
            href="/lightbulb-off.svg"
            onClick={toggleTheme}
            width="50"
            height="50"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOn ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            clipPath="url(#mask)"
          />
        </motion.g>
      </svg>
    </div>
  )
}

export default LightbulbAnimation

