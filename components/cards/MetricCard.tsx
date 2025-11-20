import { TrendDirection } from '@/types';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { getPerformanceBadgeColor } from '@/lib/utils';

interface MetricCardProps {
    title: string;
    value: string | number;
    rank: string;
    trend: TrendDirection;
    change?: string;
    totalCountries?: number;
}

export default function MetricCard({
    title,
    value,
    rank,
    trend,
    change,
}: MetricCardProps) {
    const TrendIcon =
        trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
    const trendColor =
        trend === 'up'
            ? 'text-data-green'
            : trend === 'down'
                ? 'text-data-red'
                : 'text-slate-light';

    // Extract rank numbers for badge color
    const [currentRank, total] = rank.split('/').map(Number);
    const badgeColor = getPerformanceBadgeColor(currentRank, total);

    return (
        <div className="card group hover:scale-[1.02] transition-transform duration-200">
            <div className="space-y-4">
                {/* Title */}
                <h3 className="text-sm font-medium text-slate-light">{title}</h3>

                {/* Value */}
                <div className="metric-value text-primary">{value}</div>

                {/* Rank and Trend */}
                <div className="flex items-center justify-between">
                    <span className={`rank-badge ${badgeColor}`}>
                        Rank: {rank}
                    </span>

                    <div className={`flex items-center gap-1 ${trendColor}`}>
                        <TrendIcon className="h-4 w-4" />
                        {change && <span className="text-sm font-medium">{change}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
