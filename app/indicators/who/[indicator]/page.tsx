'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { notFound } from 'next/navigation';
import HistoricalTrendChart from '@/components/hdro/HistoricalTrendChart';
import { Indicator } from '@/types';

export default function WhoIndicatorPage() {
    const params = useParams();
    const indicatorCode = params.indicator as string;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [indicator, setIndicator] = useState<Indicator | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                // Fetch data from our API route which uses the adapter
                const response = await fetch(`/api/who?indicator=${indicatorCode}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch indicator data');
                }

                const result = await response.json();
                
                // The API returns { data: WhoDataPoint[] } for raw data, 
                // but we want the adapted Indicator object.
                // Since the API route currently returns raw data for specific indicators,
                // we might need to adapt it here or update the API to return adapted data.
                // Let's use the server-side adapter via a server action or just fetch raw and adapt here?
                // Actually, let's update the API to return adapted data or use a server component.
                // But since this is a client component (hooks), we fetch from API.
                
                // Wait, I can't import server code (adapter) into client component directly if it uses 'fs' or similar,
                // but my adapter just uses fetch. However, it's cleaner to have the API return the standard format.
                // Let's check what the API returns.
                // The API route I wrote returns: { data: WhoDataPoint[] }
                
                // I should probably update the API route to optionally return adapted data, 
                // OR I can just adapt it here if I import the adapter? 
                // The adapter is in lib/dataFetchers/who/adapter.ts.
                // It uses 'cache' from 'react' (which I removed) and fetch. It should be safe to use in a Server Component,
                // but maybe not in a Client Component if it has Node.js dependencies.
                // It seems safe. BUT, to be safe and follow Next.js patterns, I should probably 
                // fetch the *adapted* data from an API endpoint.
                
                // Let's fetch the ALL indicators list to find this one, as `getAllIndicators` includes it.
                // But `getAllIndicators` might be heavy.
                
                // Alternative: Fetch raw data and adapt it on the client? 
                // The adapter logic is simple.
                // Let's try to fetch the adapted data from a new API endpoint or modify the existing one.
                
                // Actually, I'll just fetch the raw data and display it for now, 
                // mimicking the adapter logic locally or just displaying what we have.
                // BETTER: Update the API route to return the adapted indicator if requested.
                
                // For now, let's assume I'll update the API to return adapted data if I pass a flag,
                // or I'll just do the adaptation here for simplicity to match the plan.
                
                // Let's look at the raw data structure again.
                // It has Value, NumericValue, TimeDim (Year).
                
                // I will fetch the raw data and construct the Indicator object here.
                const rawData = result.data;
                
                if (!rawData || rawData.length === 0) {
                    setError('No data found for this indicator');
                    return;
                }

                // Sort by year desc
                const sortedData = rawData.sort((a: any, b: any) => b.TimeDim - a.TimeDim);
                const latest = sortedData[0];
                
                // We need the name. The raw data might not have the full name if it's just data points.
                // The API route `fetchWhoIndicatorData` returns `WhoDataPoint[]`.
                // `WhoDataPoint` has `IndicatorCode` but maybe not `IndicatorName`?
                // Checking `client.ts`: `WhoDataPoint` has `IndicatorCode`, `SpatialDim`, etc. 
                // It does NOT have `IndicatorName`.
                // So we need to fetch metadata too.
                
                // Let's fetch metadata from /api/who (all indicators) to get the name.
                const metadataResponse = await fetch('/api/who');
                const metadataResult = await metadataResponse.json();
                const metadata = metadataResult.indicators.find((i: any) => i.IndicatorCode === indicatorCode);
                
                const name = metadata ? metadata.IndicatorName : indicatorCode;

                const adaptedIndicator: Indicator = {
                    id: `who-${indicatorCode}`,
                    slug: `who/${indicatorCode}`,
                    name: name,
                    score: latest.NumericValue ?? parseFloat(latest.Value) ?? 0,
                    year: latest.TimeDim,
                    description: latest.Comments || name,
                    source: 'World Health Organization',
                    sourceUrl: `https://www.who.int/data/gho/data/indicators/indicator-details/GHO/${indicatorCode}`,
                    category: 'health',
                    rank: 0,
                    totalCountries: 0,
                    trend: sortedData.length > 1 ? (sortedData[0].NumericValue > sortedData[1].NumericValue ? 'up' : 'down') : 'neutral',
                    trendData: sortedData.map((d: any) => ({
                        year: d.TimeDim,
                        value: d.NumericValue ?? parseFloat(d.Value) ?? 0
                    })),
                    methodology: 'Data fetched from WHO Global Health Observatory',
                    higherIsBetter: true,
                    lastUpdated: new Date().toISOString()
                };

                setIndicator(adaptedIndicator);

            } catch (err: any) {
                setError(err.message || 'Failed to load indicator data');
            } finally {
                setLoading(false);
            }
        }

        if (indicatorCode) {
            loadData();
        }
    }, [indicatorCode]);

    if (loading) {
        return (
            <div className="bg-soft-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg text-slate-light">Loading indicator data...</p>
                </div>
            </div>
        );
    }

    if (error || !indicator) {
        return (
            <div className="bg-soft-white min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-primary mb-2">Error Loading Data</h2>
                    <p className="text-slate-light mb-4">{error || 'No data available'}</p>
                    <Link href="/indicators" className="btn-primary">
                        Back to Indicators
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-soft-white min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-slate/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/indicators"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                                {indicator.name}
                            </h1>
                            <p className="text-lg text-slate-light">{indicator.description}</p>
                        </div>

                        <button
                            onClick={() => {
                                const csvData = indicator.trendData
                                    .map(d => `${d.year},${d.value}`)
                                    .join('\n');
                                const blob = new Blob([`Year,Value\n${csvData}`], { type: 'text/csv' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `kenya-${indicatorCode}-data.csv`;
                                a.click();
                            }}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Export Data
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

                {/* Current Value Highlight */}
                <section className="card bg-gradient-to-br from-primary/5 to-data-cyan/5 border-l-4 border-primary">
                    <div className="text-center">
                        <div className="text-sm text-slate-light mb-2">Current Value ({indicator.year})</div>
                        <div className="text-5xl md:text-6xl font-heading font-bold text-primary mb-2">
                            {indicator.score.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-slate-light">{indicator.unit || 'Score'}</div>
                    </div>
                </section>

                {/* Historical Trend */}
                <section className="card">
                    <HistoricalTrendChart
                        data={indicator.trendData}
                        title="Historical Trend"
                        yAxisLabel={indicator.unit || 'Value'}
                        valueFormatter={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    />
                </section>

                {/* Key Insights */}
                <section className="card">
                    <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
                        Key Insights
                    </h2>

                    <div className="space-y-4">
                        {/* Latest Value */}
                        <div className="p-4 bg-slate/5 rounded-lg">
                            <h3 className="font-semibold text-primary mb-2">Latest Value</h3>
                            <p className="text-slate">
                                As of {indicator.year}, Kenya's {indicator.name.toLowerCase()} stands at{' '}
                                <span className="font-semibold text-primary">{indicator.score.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>.
                            </p>
                        </div>

                        {/* Trend */}
                        {indicator.trendData.length >= 2 && (
                            <div className="p-4 bg-slate/5 rounded-lg">
                                <h3 className="font-semibold text-primary mb-2">Trend Analysis</h3>
                                <p className="text-slate">
                                    {(() => {
                                        const first = indicator.trendData[indicator.trendData.length - 1];
                                        const last = indicator.trendData[0];
                                        const change = last.value - first.value;
                                        const percentChange = first.value !== 0 ? ((change / first.value) * 100).toFixed(1) : '0';

                                        return `From ${first.year} to ${last.year}, this indicator has ${change > 0 ? 'increased' : 'decreased'
                                            } by ${Math.abs(parseFloat(percentChange))}% (from ${first.value.toLocaleString(undefined, { maximumFractionDigits: 2 })} to ${last.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}).`;
                                    })()}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Methodology */}
                <section className="card bg-gradient-to-r from-slate/5 to-transparent">
                    <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
                        About This Indicator
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-primary mb-2">What It Measures</h3>
                            <p className="text-slate">{indicator.description}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-primary mb-2">Data Source</h3>
                            <p className="text-slate mb-2">
                                {indicator.source}
                            </p>
                            {indicator.sourceUrl && (
                                <a
                                    href={indicator.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-data-cyan hover:text-data-blue font-medium inline-flex items-center gap-2"
                                >
                                    Visit Source →
                                </a>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
