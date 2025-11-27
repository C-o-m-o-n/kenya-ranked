'use client';

import { useState } from 'react';
import { TrendDirection } from '@/types';
import { ArrowUp, ArrowDown, Minus, Info } from 'lucide-react';
import { getPerformanceBadgeColor } from '@/lib/utils';
import InfoTooltip from '@/components/ui/InfoTooltip';
import InfoModal from '@/components/ui/InfoModal';
import LastUpdated from '@/components/ui/LastUpdated';
import DataFreshness from '@/components/ui/DataFreshness';

interface MetricCardProps {
    title: string;
    value: string | number;
    rank?: string;
    trend: TrendDirection;
    change?: string;
    totalCountries?: number;
    lastUpdated?: string;
    tooltipContent?: string;
    detailedInfo?: {
        description: string;
        methodology: string;
        source: string;
        sourceUrl?: string;
    };
}

export default function MetricCard({
    title,
    value,
    rank,
    trend,
    change,
    lastUpdated,
    tooltipContent,
    detailedInfo,
}: MetricCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const TrendIcon =
        trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
    const trendColor =
        trend === 'up'
            ? 'text-data-green'
            : trend === 'down'
                ? 'text-data-red'
                : 'text-slate-light';

    // Extract rank numbers for badge color if rank exists
    let badgeColor = 'bg-slate-100 text-slate-800 border-slate-200';
    if (rank) {
        const [currentRank, total] = rank.split('/').map(Number);
        if (!isNaN(currentRank) && !isNaN(total)) {
            badgeColor = getPerformanceBadgeColor(currentRank, total);
        }
    }

    return (
        <>
            <div className="card group hover:scale-[1.02] transition-transform duration-200">
                <div className="space-y-4">
                    {/* Title with Info Icon */}
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-medium text-slate-light flex-1">{title}</h3>
                        <div className="flex items-center gap-1">
                            {lastUpdated && (
                                <DataFreshness lastUpdated={lastUpdated} showLabel={false} />
                            )}
                            {tooltipContent && (
                                <InfoTooltip content={tooltipContent} title={title} />
                            )}
                        </div>
                    </div>

                    {/* Value */}
                    <div className="metric-value text-primary">{value}</div>

                    {/* Rank and Trend */}
                    <div className="flex items-center justify-between">
                        {rank ? (
                            <span className={`rank-badge ${badgeColor}`}>
                                Rank: {rank}
                            </span>
                        ) : (
                            <span></span>
                        )}

                        <div className={`flex items-center gap-1 ${trendColor}`}>
                            <TrendIcon className="h-4 w-4" aria-hidden="true" />
                            {change && <span className="text-sm font-medium">{change}</span>}
                        </div>
                    </div>

                    {/* Last Updated */}
                    {lastUpdated && (
                        <div className="pt-2 border-t border-slate/10">
                            <LastUpdated date={lastUpdated} format="relative" showIcon={true} />
                        </div>
                    )}

                    {/* Learn More Link */}
                    {detailedInfo && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1 transition-colors duration-200"
                            aria-label={`Learn more about ${title}`}
                        >
                            <Info className="w-3.5 h-3.5" />
                            Learn More
                        </button>
                    )}
                </div>
            </div>

            {/* Detailed Info Modal */}
            {detailedInfo && (
                <InfoModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={title}
                >
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-primary mb-2">What is this?</h4>
                            <p className="text-slate">{detailedInfo.description}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-primary mb-2">How it's measured</h4>
                            <p className="text-slate">{detailedInfo.methodology}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-primary mb-2">Data Source</h4>
                            <p className="text-slate">{detailedInfo.source}</p>
                            {detailedInfo.sourceUrl && (
                                <a
                                    href={detailedInfo.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-data-cyan hover:text-data-blue underline mt-1 inline-block"
                                >
                                    View source →
                                </a>
                            )}
                        </div>
                    </div>
                </InfoModal>
            )}
        </>
    );
}
