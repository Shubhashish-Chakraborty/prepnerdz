"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
    textArray: string[]
    typingSpeed?: number
    pauseBetweenTexts?: number
    className?: string
    separator?: string
}

export default function TypeMultiple({
    textArray,
    typingSpeed = 50,
    pauseBetweenTexts = 1500,
    className = "",
    // separator = "\n",
}: TypewriterTextProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [currentCharIndex, setCurrentCharIndex] = useState(0)
    const [displayedTexts, setDisplayedTexts] = useState<string[]>([])
    const [currentText, setCurrentText] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        if (textArray.length === 0 || isComplete) return

        const currentFullText = textArray[currentTextIndex]

        if (currentCharIndex < currentFullText.length) {
            // Still typing current text
            const timeout = setTimeout(() => {
                setCurrentText(currentFullText.slice(0, currentCharIndex + 1))
                setCurrentCharIndex((prev) => prev + 1)
            }, typingSpeed)

            return () => clearTimeout(timeout)
        } else {
            // Finished typing current text
            const timeout = setTimeout(() => {
                // Add completed text to displayed texts
                setDisplayedTexts((prev) => [...prev, currentFullText])
                setCurrentText("")
                setCurrentCharIndex(0)

                if (currentTextIndex < textArray.length - 1) {
                    // Move to next text
                    setCurrentTextIndex((prev) => prev + 1)
                } else {
                    // All texts completed
                    setIsComplete(true)
                }
            }, pauseBetweenTexts)

            return () => clearTimeout(timeout)
        }
    }, [currentCharIndex, currentTextIndex, textArray, typingSpeed, pauseBetweenTexts, isComplete])

    // Cursor blinking effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 500)

        return () => clearInterval(cursorInterval)
    }, [])

    // Reset animation after completion (optional)
    useEffect(() => {
        if (isComplete) {
            const resetTimeout = setTimeout(() => {
                setDisplayedTexts([])
                setCurrentTextIndex(0)
                setCurrentCharIndex(0)
                setCurrentText("")
                setIsComplete(false)
            }, 3000) // Wait 3 seconds before restarting

            return () => clearTimeout(resetTimeout)
        }
    }, [isComplete])

    return (
        <div className={`min-h-[200px] flex flex-col items-center justify-center ${className}`}>
            <div className="text-center space-y-3">
                {/* Display completed texts */}
                {displayedTexts.map((text, index) => (
                    <p key={index} className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium">
                        • {text}
                    </p>
                ))}

                {/* Display currently typing text */}
                {!isComplete && (
                    <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium">
                        • {currentText}
                        <span
                            className={`inline-block w-0.5 h-6 md:h-7 lg:h-8 bg-primary ml-1 transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    </p>
                )}
            </div>
        </div>
    )
}
