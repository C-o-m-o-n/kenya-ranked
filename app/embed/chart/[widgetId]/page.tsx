import { notFound } from 'next/navigation';
import { getIndicatorBySlug } from '@/lib/dataService';
import TrendSparkline from '@/components/charts/TrendSparkline';

interface PageProps {
    params: {
        widgetId: string;
    };
}

export default async function EmbedChartPage({ params }: PageProps) {
    const indicator = await getIndicatorBySlug(params.widgetId);

    if (!indicator) {
        notFound();
    }

    return (
        <div className="bg-white p-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-primary mb-2">{indicator.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="font-bold text-2xl text-primary">
                            {typeof indicator.score === 'number'
                                ? indicator.score.toLocaleString('en-US', { maximumFractionDigits: 2 })
                                : indicator.score
                            } {indicator.unit}
                        </span>
                        <span>Rank: #{indicator.rank}/{indicator.totalCountries}</span>
                        <span>Year: {indicator.year}</span>
                    </div>
                </div>

                <div className="h-80 w-full">
                    <TrendSparkline
                        data={indicator.trendData}
                        color={indicator.trend === 'up' ? '#10B981' : '#EF4444'}
                    />
                </div>

                <div className="mt-4 text-xs text-slate-500 border-t pt-2">
                    <p>Source: {indicator.source}</p>
                    <p className="mt-1">
                        Powered by{' '}
                        <a
                            href="https://kenyaranked.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Kenya Ranked
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
