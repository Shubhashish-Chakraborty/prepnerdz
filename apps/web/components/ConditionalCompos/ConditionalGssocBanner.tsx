'use client';

import { usePathname } from 'next/navigation';
import GssocBanner from '../ui/GssocBanner';

const ConditionalGssocBanner = () => {
    const pathname = usePathname();

    // Define the paths where you DON'T want the banner
    const disabledPaths = ['/code', '/nerdconnect'];

    // If the current path is in the disabled paths, render nothing
    if (disabledPaths.includes(pathname)) {
        return null;
    }

    // Otherwise, render the banner
    return <GssocBanner />;
};

export default ConditionalGssocBanner;
