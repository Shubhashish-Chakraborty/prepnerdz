"use client"

import { useEffect, useState } from "react"

interface FloatingFeaturesProps {
    features: string[]
    className?: string
}

export default function FloatingFeatures({ features, className = "" }: FloatingFeaturesProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Trigger animation after component mounts
        const timer = setTimeout(() => setIsVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    // Different gradient combinations for each card
    const gradientVariants = [
        "from-purple-400/30 via-pink-400/20 to-red-400/30",
        "from-blue-400/30 via-cyan-400/20 to-teal-400/30",
        "from-orange-400/30 via-yellow-400/20 to-pink-400/30",
        "from-green-400/30 via-blue-400/20 to-purple-400/30",
        "from-pink-400/30 via-purple-400/20 to-indigo-400/30",
        "from-cyan-400/30 via-blue-400/20 to-purple-400/30",
    ]

    const hoverGradientVariants = [
        "hover:from-purple-500/40 hover:via-pink-500/30 hover:to-red-500/40",
        "hover:from-blue-500/40 hover:via-cyan-500/30 hover:to-teal-500/40",
        "hover:from-orange-500/40 hover:via-yellow-500/30 hover:to-pink-500/40",
        "hover:from-green-500/40 hover:via-blue-500/30 hover:to-purple-500/40",
        "hover:from-pink-500/40 hover:via-purple-500/30 hover:to-indigo-500/40",
        "hover:from-cyan-500/40 hover:via-blue-500/30 hover:to-purple-500/40",
    ]

    const borderVariants = [
        "border-purple-300/40 group-hover:border-pink-400/60",
        "border-blue-300/40 group-hover:border-cyan-400/60",
        "border-orange-300/40 group-hover:border-yellow-400/60",
        "border-green-300/40 group-hover:border-blue-400/60",
        "border-pink-300/40 group-hover:border-purple-400/60",
        "border-cyan-300/40 group-hover:border-blue-400/60",
    ]

    return (
        <div className={`py-16 px-4 ${className}`}>
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`floating-card group transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            style={{
                                transitionDelay: `${index * 200}ms`,
                                animationDelay: `${index * 0.5}s`,
                            }}
                        >
                            <div
                                className={`relative p-8 rounded-2xl bg-gradient-to-br ${gradientVariants[index % gradientVariants.length]} ${hoverGradientVariants[index % hoverGradientVariants.length]} backdrop-blur-xl border ${borderVariants[index % borderVariants.length]} shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2`}
                            >
                                {/* Floating background decoration with colorful gradients */}
                                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-400/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700"></div>

                                {/* Additional floating orbs for more glass effect */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>

                                {/* Feature text */}
                                <h3 className="relative z-10 text-lg font-semibold text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors duration-300 text-center drop-shadow-sm">
                                    {feature}
                                </h3>

                                {/* Animated underline with gradient */}
                                <div className="relative z-10 mt-6 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
