'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function InfoModal({ isOpen, onClose, title, children }: InfoModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                ref={modalRef}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate/10">
                    <h2
                        id="modal-title"
                        className="text-2xl font-heading font-bold text-primary"
                    >
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-light hover:text-primary hover:bg-soft-gray rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="prose prose-slate max-w-none">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate/10 bg-soft-gray">
                    <button
                        onClick={onClose}
                        className="btn-primary w-full sm:w-auto"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
