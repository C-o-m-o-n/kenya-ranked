'use client';

import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

export default function Accordion({
    title,
    children,
    defaultOpen = false,
}: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-slate/20 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-soft-gray transition-colors duration-200"
            >
                <span className="font-heading font-semibold text-primary text-left">
                    {title}
                </span>
                <ChevronDown
                    className={`h-5 w-5 text-slate transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>
            {isOpen && (
                <div className="p-4 bg-soft-white border-t border-slate/10">
                    <div className="prose prose-sm max-w-none text-slate">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
