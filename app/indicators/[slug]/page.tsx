import { notFound } from 'next/navigation';
import { getIndicatorBySlug, regionalComparisons } from '@/data/mockData';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import Accordion from '@/components/ui/Accordion';
import SourceDisclaimer from '@/components/ui/SourceDisclaimer';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { calculateChange } from '@/lib/utils';

export default function IndicatorDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const indicator = getIndicatorBySlug(params.slug);

    if (!indicator) {
        notFound();
    }

    const TrendIcon =
        indicator.trend === 'up'
            ? ArrowUp
            : indicator.trend === 'down'
                ? ArrowDown
                : Minus;
    const trendColor =
        indicator.trend === 'up'
            ? 'text-data-green'
            : indicator.trend === 'down'
                ? 'text-data-red'
                : 'text-slate-light';

    const previousValue =
        indicator.trendData[indicator.trendData.length - 2]?.value;
    const change = previousValue
        ? calculateChange(indicator.score, previousValue)
        : null;

    const comparisonData = regionalComparisons[indicator.slug] || [];

    return (
        <div className="min-h-screen bg-soft-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-data-cyan/10 text-data-cyan capitalize">
                            {indicator.category}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                        {indicator.name}
                    </h1>
                    <p className="text-lg text-slate-light max-w-3xl">
                        {indicator.description}
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="card">
                        <p className="text-sm font-medium text-slate-light mb-2">
                            Kenya's Score
                        </p>
                        <p className="metric-value text-primary">
                            {indicator.score}
                            {indicator.unit && (
                                <span className="text-lg text-slate-light ml-2">
                                    {indicator.unit}
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="card">
                        <p className="text-sm font-medium text-slate-light mb-2">
                            Global Rank
                        </p>
                        <p className="metric-value text-primary">
                            {indicator.rank}
                            <span className="text-lg text-slate-light">
                                /{indicator.totalCountries}
                            </span>
                        </p>
                    </div>

                    <div className="card">
                        <p className="text-sm font-medium text-slate-light mb-2">
                            Change from Last Year
                        </p>
                        <div className={`flex items-center gap-2 ${trendColor}`}>
                            <TrendIcon className="h-8 w-8" />
                            {change && (
                                <span className="text-2xl font-bold font-mono">{change}</span>
                            )}
                        </div>
                    </div>

                    <div className="card">
                        <p className="text-sm font-medium text-slate-light mb-2">Year</p>
                        <p className="metric-value text-primary">{indicator.year}</p>
                    </div>
                </div>

                {/* Trend Chart */}
                <div className="card mb-12">
                    <LineChart
                        data={indicator.trendData}
                        title="Historical Trend"
                        yAxisLabel={indicator.unit}
                        color="#00A7C4"
                    />
                </div>

                {/* Regional Comparison */}
                {comparisonData.length > 0 && (
                    <div className="card mb-12">
                        <BarChart
                            data={comparisonData}
                            title="Kenya vs Region Comparison"
                            yAxisLabel={indicator.unit}
                        />
                    </div>
                )}

                {/* Explanation Accordions */}
                <div className="space-y-4 mb-12">
                    <Accordion title="What does this indicator measure?" defaultOpen>
                        <p>{indicator.description}</p>
                    </Accordion>

                    <Accordion title="Why does it matter?">
                        <p>
                            This indicator provides crucial insights into Kenya's performance
                            in {indicator.category}. Understanding these metrics helps
                            policymakers, researchers, and citizens track progress and
                            identify areas for improvement.
                        </p>
                    </Accordion>

                    <Accordion title="How is the score calculated?">
                        <p>{indicator.methodology}</p>
                    </Accordion>
                </div>

                {/* Source */}
                <SourceDisclaimer
                    source={indicator.source}
                    sourceUrl={indicator.sourceUrl}
                    year={indicator.year}
                />
            </div>
        </div>
    );
}
