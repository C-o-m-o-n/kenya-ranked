'use client';

import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface DataFreshnessProps {
    lastUpdated: string | Date;
    className?: string;
    showLabel?: boolean;
}

type FreshnessLevel = 'fresh' | 'recent' | 'stale';

function getFreshnessLevel(date: string | Date): FreshnessLevel {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) return 'fresh';
    if (diffDays <= 180) return 'recent';
    return 'stale';
}

export default function DataFreshness({
    lastUpdated,
    className = '',
    showLabel = true
}: DataFreshnessProps) {
    const level = getFreshnessLevel(lastUpdated);

    const config = {
        fresh: {
            icon: CheckCircle,
            color: 'text-data-green',
            bgColor: 'bg-data-green/10',
            label: 'Fresh',
            description: 'Updated within 30 days'
        },
        recent: {
            icon: Clock,
            color: 'text-data-yellow',
            bgColor: 'bg-data-yellow/10',
            label: 'Recent',
            description: 'Updated within 6 months'
        },
        stale: {
            icon: AlertCircle,
            color: 'text-data-red',
            bgColor: 'bg-data-red/10',
            label: 'Needs Update',
            description: 'Updated more than 6 months ago'
        }
    };

    const { icon: Icon, color, bgColor, label, description } = config[level];

    return (
        <div
            className={`inline-flex items-center gap-1.5 ${className}`}
            title={description}
        >
            <div className={`p-1 rounded-full ${bgColor}`}>
                <Icon className={`w-3 h-3 ${color}`} aria-hidden="true" />
            </div>
            {showLabel && (
                <span className={`text-xs font-medium ${color}`}>
                    {label}
                </span>
            )}
        </div>
    );
}
