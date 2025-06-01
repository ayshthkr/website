"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { ChevronDown } from "lucide-react"

interface HeroSectionProps {
  scrollToContent: () => void
}

export default function HeroSection({ scrollToContent }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const gradientStyle = {
    background: `radial-gradient(
      circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
      rgba(79, 70, 229, 0.8) 0%,
      rgba(16, 185, 129, 0.8) 50%,
      rgba(59, 130, 246, 0.8) 100%
    )`,
  }

  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden" style={gradientStyle}>
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <motion.div
        className="z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-white mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
        >
          My Resume
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Ayush Thakur • Developer • Student
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          onClick={scrollToContent}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>
    </div>
  )
}
