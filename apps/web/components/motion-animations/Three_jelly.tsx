"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedBackgroundProps {
    children: ReactNode
}

export default function AnimatedBackground({ children }: AnimatedBackgroundProps) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br">
            {/* Animated Background Circles */}
            <div className="absolute inset-0">
                {/* Blue Jelly Circle - LEFT ZONE ONLY (Far Left) */}
                <motion.div
                    className="absolute w-[130vh] h-[130vh]"
                    style={{
                        background: `radial-gradient(circle, #37a9e8, #2563eb)`,
                        opacity: 0.4,
                        filter: "blur(20px)",
                        boxShadow: "0 0 200px rgba(55, 169, 232, 0.6)",
                        left: "-40vh",
                    }}
                    animate={{
                        x: [-100, 0, 100, 0, -100],
                        y: [100, 200, 400, 600, 300],
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
                        duration: 25,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />

                {/* Pink Jelly Circle - RIGHT ZONE ONLY (Far Right) */}
                <motion.div
                    className="absolute w-[130vh] h-[130vh]"
                    style={{
                        background: `radial-gradient(circle, #ffdbf6, #f472b6)`,
                        opacity: 0.45,
                        filter: "blur(25px)",
                        boxShadow: "0 0 180px rgba(255, 219, 246, 0.7)",
                        right: "-40vh",
                    }}
                    animate={{
                        x: [-100, 0, 100, 0, -100],
                        y: [150, 250, 450, 650, 400],
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
                        duration: 28,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: 3,
                    }}
                />

                {/* Yellow Jelly Circle - TOP ZONE ONLY (Far Top) */}
                <motion.div
                    className="absolute w-[130vh] h-[130vh]"
                    style={{
                        background: `radial-gradient(circle, #fbbf24, #f59e0b)`,
                        opacity: 0.4,
                        filter: "blur(22px)",
                        boxShadow: "0 0 190px rgba(251, 191, 36, 0.6)",
                        top: "-50vh",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                    animate={{
                        x: [-200, 0, 200, 0, -200],
                        y: [-50, 0, 50, 100, 25],
                        borderRadius: [
                            "50% 50% 60% 40%",
                            "40% 60% 50% 50%",
                            "60% 40% 40% 60%",
                            "50% 50% 50% 50%",
                            "50% 50% 60% 40%",
                        ],
                        rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: 1.5,
                    }}
                />

                {/* Additional Blue Jelly Layer - LEFT ZONE */}
                <motion.div
                    className="absolute w-[100vh] h-[100vh]"
                    style={{
                        background: `radial-gradient(circle, #37a9e8, transparent)`,
                        opacity: 0.3,
                        filter: "blur(15px)",
                        left: "-30vh",
                    }}
                    animate={{
                        x: [-50, 50, 100, 50, -50],
                        y: [200, 300, 500, 700, 450],
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
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />

                {/* Additional Pink Jelly Layer - RIGHT ZONE */}
                <motion.div
                    className="absolute w-[100vh] h-[100vh]"
                    style={{
                        background: `radial-gradient(circle, #ffdbf6, transparent)`,
                        opacity: 0.35,
                        filter: "blur(18px)",
                        right: "-30vh",
                    }}
                    animate={{
                        x: [-100, -50, 50, -50, -100],
                        y: [250, 350, 550, 750, 500],
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
                        duration: 24,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 4,
                    }}
                />

                {/* Additional Yellow Jelly Layer - TOP ZONE */}
                <motion.div
                    className="absolute w-[100vh] h-[100vh]"
                    style={{
                        background: `radial-gradient(circle, #fbbf24, transparent)`,
                        opacity: 0.3,
                        filter: "blur(16px)",
                        top: "-40vh",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                    animate={{
                        x: [-150, 0, 150, 0, -150],
                        y: [-25, 25, 75, 125, 50],
                        borderRadius: [
                            "60% 40% 50% 50%",
                            "40% 60% 60% 40%",
                            "50% 50% 40% 60%",
                            "60% 40% 50% 50%",
                            "60% 40% 50% 50%",
                        ],
                        scale: [1, 1.2, 1, 0.9, 1],
                    }}
                    transition={{
                        duration: 19,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2.5,
                    }}
                />
            </div>

            {/* Subtle overlay for content readability - REMOVED BACKDROP-FILTER */}
            <div className="absolute inset-0 bg-white/5" />

            {/* Main Content Area */}
            <div className="relative z-10 min-h-screen w-full">
                <div className="container">{children}</div>
            </div>
        </div>
    )
}