"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedBackgroundProps {
  children: ReactNode
}

export default function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Animated Background Circles */}
      <div className="absolute inset-0">
        {/* Blue Jelly Circle - LEFT SIDE ONLY */}
        <motion.div
          className="absolute w-[130vh] h-[130vh]"
          style={{
            background: `radial-gradient(circle, #37a9e8, #2563eb)`,
            opacity: 0.4,
            filter: "blur(20px)",
            boxShadow: "0 0 200px rgba(55, 169, 232, 0.6)",
            left: "-20vh",
          }}
          animate={{
            x: [-100, 100, 200, 100, -100],
            y: [50, 100, 300, 500, 300],
            borderRadius: [
              "60% 40% 30% 70%",
              "30% 60% 70% 40%",
              "50% 60% 30% 60%",
              "60% 30% 60% 40%",
              "60% 40% 30% 70%",
            ],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Pink Jelly Circle - RIGHT SIDE ONLY */}
        <motion.div
          className="absolute w-[130vh] h-[130vh]"
          style={{
            background: `radial-gradient(circle, #ffdbf6, #f472b6)`,
            opacity: 0.45,
            filter: "blur(25px)",
            boxShadow: "0 0 180px rgba(255, 219, 246, 0.7)",
            right: "-20vh",
          }}
          animate={{
            x: [-200, -100, 100, -100, -200],
            y: [100, 150, 350, 550, 400],
            borderRadius: [
              "40% 60% 60% 40%",
              "60% 40% 40% 60%",
              "30% 70% 60% 40%",
              "70% 30% 40% 60%",
              "40% 60% 60% 40%",
            ],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 3,
          }}
        />

        {/* Additional Blue Jelly Layer for More Density - LEFT SIDE */}
        <motion.div
          className="absolute w-[100vh] h-[100vh]"
          style={{
            background: `radial-gradient(circle, #37a9e8, transparent)`,
            opacity: 0.3,
            filter: "blur(15px)",
            left: "-10vh",
          }}
          animate={{
            x: [-50, 50, 150, 50, -50],
            y: [200, 150, 400, 600, 450],
            borderRadius: [
              "50% 50% 40% 60%",
              "40% 60% 50% 50%",
              "60% 40% 50% 50%",
              "50% 50% 60% 40%",
              "50% 50% 40% 60%",
            ],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Additional Pink Jelly Layer for More Density - RIGHT SIDE */}
        <motion.div
          className="absolute w-[100vh] h-[100vh]"
          style={{
            background: `radial-gradient(circle, #ffdbf6, transparent)`,
            opacity: 0.35,
            filter: "blur(18px)",
            right: "-10vh",
          }}
          animate={{
            x: [-150, -50, 50, -50, -150],
            y: [150, 250, 450, 650, 500],
            borderRadius: [
              "70% 30% 50% 50%",
              "30% 70% 40% 60%",
              "50% 50% 70% 30%",
              "60% 40% 30% 70%",
              "70% 30% 50% 50%",
            ],
            scale: [1, 0.8, 1.2, 1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]" />

      {/* Main Content Area */}
      <div className="relative z-10 min-h-screen w-full">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </div>
    </div>
  )
}
