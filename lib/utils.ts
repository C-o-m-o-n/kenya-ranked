import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatNumber(num: number, decimals: number = 2): string {
    return num.toFixed(decimals);
}

export function formatRank(rank: number, total: number): string {
    return `${rank}/${total}`;
}

export function getTrendDirection(current: number, previous: number, higherIsBetter: boolean = true): 'up' | 'down' | 'neutral' {
    if (current === previous) return 'neutral';

    const isImproving = higherIsBetter
        ? current > previous
        : current < previous;

    return isImproving ? 'up' : 'down';
}

export function getPerformanceColor(rank: number, total: number): string {
    const percentile = (rank / total) * 100;

    if (percentile <= 25) return 'text-data-green';
    if (percentile <= 50) return 'text-data-cyan';
    if (percentile <= 75) return 'text-data-yellow';
    return 'text-data-red';
}

export function getPerformanceBadgeColor(rank: number, total: number): string {
    const percentile = (rank / total) * 100;

    if (percentile <= 25) return 'bg-data-green/10 text-data-green';
    if (percentile <= 50) return 'bg-data-cyan/10 text-data-cyan';
    if (percentile <= 75) return 'bg-data-yellow/10 text-data-yellow';
    return 'bg-data-red/10 text-data-red';
}

export function calculateChange(current: number, previous: number): string {
    const change = current - previous;
    const sign = change > 0 ? '+' : '';
    return `${sign}${formatNumber(change)}`;
}

export function getSDGStatusColor(status: string): string {
    switch (status) {
        case 'on-track':
            return 'bg-data-green text-white';
        case 'moderate':
            return 'bg-data-yellow text-white';
        case 'off-track':
            return 'bg-data-red text-white';
        default:
            return 'bg-slate-light text-white';
    }
}
