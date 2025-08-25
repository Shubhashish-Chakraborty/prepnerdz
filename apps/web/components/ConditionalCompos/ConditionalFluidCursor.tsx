'use client';

import { usePathname } from 'next/navigation';
import FluidCursor from '../FluidCursor';

const ConditionalFluidCursor = () => {
    const pathname = usePathname();

    // Define the path where you DON'T want the cursor
    const disabledPath = '/code';

    // If the current path is the disabled path, render nothing
    if (pathname === disabledPath) {
        return null;
    }

    // Otherwise, render the cursor
    return <FluidCursor />;
};

export default ConditionalFluidCursor;