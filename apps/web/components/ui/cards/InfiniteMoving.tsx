'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface CardItem {
    text: string;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

interface InfiniteMovingCardsProps {
    items: CardItem[];
    direction?: 'left' | 'right';
    speed?: 'fast' | 'normal' | 'slow';
    pauseOnHover?: boolean;
    className?: string;
}

export const InfiniteMovingCards = ({
    items,
    direction = 'left',
    speed = 'normal',
    pauseOnHover = true,
    className,
}: InfiniteMovingCardsProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        function addAnimation() {
            if (containerRef.current && scrollerRef.current) {
                const scrollerContent = Array.from(scrollerRef.current.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    if (scrollerRef.current) {
                        scrollerRef.current.appendChild(duplicatedItem);
                    }
                });

                setStart(true);
            }
        }
        addAnimation();
    }, []);

    const getDirection = () => {
        if (direction === 'left') {
            return 'animate-scroll-left';
        }
        return 'animate-scroll-right';
    };

    const getSpeed = () => {
        switch (speed) {
            case 'fast':
                return 'duration-20s';
            case 'slow':
                return 'duration-60s';
            default:
                return 'duration-40s';
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                'scroller relative z-20 w-full overflow-hidden',
                'max-w-full md:max-w-6xl lg:max-w-7xl mx-auto',
                '[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    'flex shrink-0 flex-nowrap gap-3 md:gap-4 py-4',
                    'w-max flex-nowrap',
                    start && getDirection(),
                    start && getSpeed(),
                    pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
            >
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        onClick={item.onClick}
                        className={cn(
                            'relative cursor-pointer w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[320px]',
                            'flex-shrink-0 rounded-lg md:rounded-xl p-4 md:p-6',
                            'bg-gradient-to-br from-primary/10 to-secondary/10',
                            'border border-primary/20 hover:border-primary/30',
                            'transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2',
                            'flex flex-col items-center justify-center gap-3',
                            'hover:shadow-md hover:shadow-primary/10',
                            item.className
                        )}
                    >
                        <div className="text-3xl md:text-4xl text-primary">
                            {item.icon}
                        </div>
                        <p className="text-center text-sm md:text-base font-medium ">
                            {item.text}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};