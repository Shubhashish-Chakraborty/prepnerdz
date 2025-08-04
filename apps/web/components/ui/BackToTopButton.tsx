'use client';

import React, { useState, useEffect } from 'react';

// A simple SVG arrow icon for a cleaner look
const UpArrowIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={3} // Bolder stroke
        stroke="currentColor" 
        className="w-6 h-6"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
);


const BackToTopButton: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // We use a transition class on the button itself for smooth appearance/disappearance
    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-32 right-6 z-40
                w-14 h-14 
                bg-gray-900 text-white 
                rounded-full 
                flex items-center justify-center 
                shadow-lg 
                border-2 border-white/20
                transition-all duration-300 ease-in-out
                hover:bg-amber-500 hover:scale-110 hover:shadow-amber-500/50
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
                ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
            `}
            aria-label="Back to top"
        >
            <UpArrowIcon />
        </button>
    );
};

export default BackToTopButton;
