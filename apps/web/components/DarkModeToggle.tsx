'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration errors
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full flex items-center justify-center transition-colors"
>
  {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
</button>
  );
}
