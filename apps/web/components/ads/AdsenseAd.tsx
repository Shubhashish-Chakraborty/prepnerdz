// components/AdsenseAd.tsx
'use client';

import { useEffect } from 'react';

// Define the type for the component's props
type AdsenseAdProps = {
    client: string;
    slot: string;
    className?: string;
    style?: React.CSSProperties;
    format?: string;
};

declare global {
    interface Window {
        adsbygoogle?: Record<string, unknown>[];
    }
}

/**
 * A reusable component to display a Google AdSense ad unit.
 * It handles pushing the ad request to the adsbygoogle array.
 */
const AdsenseAd = ({ client, slot, className, style, format = "auto" }: AdsenseAdProps) => {
    useEffect(() => {
        // This effect runs when the component mounts to the page.
        // It pushes an empty object to the adsbygoogle array, which
        // signals the AdSense script to render an ad in this slot.
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('Adsense error:', err);
        }
    }, []); // The empty dependency array ensures this effect runs only once.

    return (
        <div className={className}>
            <ins
                className="adsbygoogle"
                style={style || { display: 'block' }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default AdsenseAd;