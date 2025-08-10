'use client';

import React, { useEffect, useState } from 'react';

/**
 * Hook to safely handle client-side only logic
 * Prevents hydration mismatches by ensuring consistent rendering
 */
export function useHydrationSafe() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Component that only renders children after hydration
 * Useful for components that depend on browser APIs
 */
export function HydrationSafe({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode; 
}) {
  const isHydrated = useHydrationSafe();

  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Utility to suppress hydration warnings for known safe cases
 * Use sparingly and only when you're certain the mismatch is safe
 */
export function suppressHydrationWarning(element: React.ReactElement) {
  return React.cloneElement(element, {
    suppressHydrationWarning: true,
  });
} 