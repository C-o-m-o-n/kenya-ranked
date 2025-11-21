'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
    content: string;
    title?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

export default function InfoTooltip({
    content,
    title,
    position = 'top',
    className = ''
}: InfoTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-slate-dark',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-slate-dark',
        left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-slate-dark',
        right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-slate-dark',
    };

    return (
        <div className={`relative inline-block ${className}`}>
            <button
                type="button"
                className="inline-flex items-center justify-center w-5 h-5 text-slate-light hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onFocus={() => setIsVisible(true)}
                onBlur={() => setIsVisible(false)}
                aria-label={title || 'More information'}
                aria-describedby="tooltip-content"
            >
                <Info className="w-4 h-4" aria-hidden="true" />
            </button>

            {isVisible && (
                <div
                    id="tooltip-content"
                    role="tooltip"
                    className={`absolute z-50 ${positionClasses[position]} w-64 pointer-events-none`}
                >
                    <div className="bg-slate-dark text-white text-sm rounded-lg shadow-lg p-3">
                        {title && (
                            <div className="font-semibold mb-1">{title}</div>
                        )}
                        <div className="text-white/90">{content}</div>
                    </div>
                    <div
                        className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
                        aria-hidden="true"
                    />
                </div>
            )}
        </div>
    );
}
