'use client';

import { useState } from 'react';
import InfoModal from './InfoModal';

interface ClientInfoModalProps {
    trigger: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

export default function ClientInfoModal({ trigger, title, children }: ClientInfoModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="cursor-pointer inline-block">
                {trigger}
            </div>
            <InfoModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={title}
            >
                {children}
            </InfoModal>
        </>
    );
}
