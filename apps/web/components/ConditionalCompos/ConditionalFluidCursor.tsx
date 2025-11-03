'use client';

import { usePathname } from 'next/navigation';
import FluidCursor from '../FluidCursor';

const ConditionalFluidCursor = () => {
    const pathname = usePathname();

    // Define the paths where you DON'T want the cursor
    const disabledPaths = ['/code'];
    const disabledPrefixes = ['/nerdconnect']; // any route starting with this


    // If the current path is in the disabled paths, render nothing
    if (disabledPaths.includes(pathname) || disabledPrefixes.some(prefix => pathname.startsWith(prefix))) {
        return null;
    }

    // Otherwise, render the cursor
    return <FluidCursor />;
};

export default ConditionalFluidCursor;
