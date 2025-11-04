"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  children: React.ReactNode[] | React.ReactNode
  autoSlide?: boolean
  autoSlideInterval?: number
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoSlide = true,
  autoSlideInterval = 2000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoSliding, setIsAutoSliding] = useState(autoSlide)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSlides = React.Children.count(children)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.max(1, totalSlides))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.max(1, totalSlides)) % Math.max(1, totalSlides))
  }, [totalSlides])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index % Math.max(1, totalSlides))
  }, [totalSlides])

  useEffect(() => {
    // clear any existing interval first (defensive)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (isAutoSliding && autoSlideInterval > 0 && totalSlides > 1) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, autoSlideInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isAutoSliding, autoSlideInterval, nextSlide, totalSlides])

  const handleMouseEnter = () => {
    setIsAutoSliding(false)
  }

  const handleMouseLeave = () => {
    setIsAutoSliding(autoSlide)
  }

  return (
    <div className="relative w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div key={index} className="w-full flex justify-center flex-shrink-0 px-2">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => {
          prevSlide()
          setIsAutoSliding(false)
        }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => {
          nextSlide()
          setIsAutoSliding(false)
        }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToSlide(index)
              setIsAutoSliding(false)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex ? "bg-blue-500 w-4" : "bg-gray-300"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
