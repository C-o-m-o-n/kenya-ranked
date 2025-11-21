'use client';

import { formatDate, getRelativeTime } from '@/lib/i18n';
import { Clock } from 'lucide-react';

interface LastUpdatedProps {
    date: string | Date;
    format?: 'relative' | 'absolute' | 'both';
    className?: string;
    showIcon?: boolean;
}

export default function LastUpdated({
    date,
    format = 'both',
    className = '',
    showIcon = true
}: LastUpdatedProps) {
    const relativeTime = getRelativeTime(date);
    const absoluteDate = formatDate(date);

    return (
        <div className={`inline-flex items-center gap-1.5 text-sm text-slate-light ${className}`}>
            {showIcon && <Clock className="w-4 h-4" aria-hidden="true" />}
            <span>
                {format === 'relative' && (
                    <time dateTime={typeof date === 'string' ? date : date.toISOString()}>
                        {relativeTime}
                    </time>
                )}
                {format === 'absolute' && (
                    <time dateTime={typeof date === 'string' ? date : date.toISOString()}>
                        {absoluteDate}
                    </time>
                )}
                {format === 'both' && (
                    <time
                        dateTime={typeof date === 'string' ? date : date.toISOString()}
                        title={absoluteDate}
                    >
                        {relativeTime}
                    </time>
                )}
            </span>
        </div>
    );
}
