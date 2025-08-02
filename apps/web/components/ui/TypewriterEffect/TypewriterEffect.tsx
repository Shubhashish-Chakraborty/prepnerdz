import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterProps {
  words: string[];
  prefix?: string;
  typeSpeed?: number;
  delayBetweenWords?: number;
  cursor?: boolean;
  cursorBlinkSpeed?: number;
  prefixClassName?: string;
  wordClassName?: string;
}

export const TypewriterEffect = ({
  words,
  prefix = "Searching for",
  typeSpeed = 100,
  delayBetweenWords = 2000,
  cursor = true,
  cursorBlinkSpeed = 500,
  prefixClassName = "text-sm md:text-base text-gray-500",
  wordClassName = "text-2xl md:text-4xl font-bold text-blue-600",
}: TypewriterProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  // Current word being typed
  const currentWord = words[currentIndex];

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return;

    const interval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(interval);
  }, [cursor, cursorBlinkSpeed]);

  // Typing effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayedText.length < currentWord.length) {
        // Typing forward
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing, wait then move to next word
        timeout = setTimeout(() => {
          setIsTyping(false);
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }, delayBetweenWords);
      }
    } else {
      // Immediately start typing next word (no deletion phase)
      setIsTyping(true);
      setDisplayedText("");
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    currentWord,
    isTyping,
    words,
    typeSpeed,
    delayBetweenWords,
  ]);

  return (
    <div className="inline-flex items-baseline">
      {prefix && <span className={`mr-2 ${prefixClassName}`}>{prefix}</span>}

      <div className="relative inline-block">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`inline-block ${wordClassName}`}
          >
            {displayedText}
          </motion.span>
        </AnimatePresence>

        {cursor && (
          <motion.span
            animate={{ opacity: isCursorVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute bottom-1 w-[2px] h-10 ${wordClassName} bg-current`}
            aria-hidden="true"
          />
        )}
      </div>

      <span className="sr-only">
        {prefix} {words.join(", ")}
      </span>
    </div>
  );
};
