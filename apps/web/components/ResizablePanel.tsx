"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface ResizablePanelProps {
    children: React.ReactNode
    className?: string
    minWidth?: number
    maxWidth?: number
    defaultWidth?: number
    onResize?: (width: number) => void
}

export function ResizablePanel({
    children,
    className = "",
    minWidth = 200,
    maxWidth = 800,
    defaultWidth = 400,
    onResize,
}: ResizablePanelProps) {
    const [width, setWidth] = useState(defaultWidth)
    const [isResizing, setIsResizing] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !panelRef.current) return

            const container = panelRef.current.parentElement
            if (!container) return

            const containerRect = container.getBoundingClientRect()
            const newWidth = e.clientX - containerRect.left
            const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth)

            setWidth(clampedWidth)
            onResize?.(clampedWidth)
        }

        const handleMouseUp = () => {
            setIsResizing(false)
            document.body.style.cursor = ""
            document.body.style.userSelect = ""
        }

        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
            document.body.style.cursor = "col-resize"
            document.body.style.userSelect = "none"
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isResizing, minWidth, maxWidth, onResize])

    return (
        <div ref={panelRef} className={`relative ${className}`} style={{ width: `${width}px` }}>
            {children}
            <div
                className="absolute top-0 right-0 w-2 h-full cursor-col-resize bg-gray-600 hover:bg-gray-500 transition-colors duration-200"
                onMouseDown={() => setIsResizing(true)}
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-400 rounded"></div>
            </div>
        </div>
    )
}