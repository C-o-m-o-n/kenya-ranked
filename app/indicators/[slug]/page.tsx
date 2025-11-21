import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Info, Calendar, TrendingUp, TrendingDown, Minus, Globe, Download, Share2, ArrowRight } from 'lucide-react';
import { getIndicatorBySlug } from '@/lib/dataService';
import { regionalComparisons } from '@/data/staticData';
import TrendSparkline from '@/components/charts/TrendSparkline';
import BarChart from '@/components/charts/BarChart';
import InfoTooltip from '@/components/ui/InfoTooltip';
import ClientInfoModal from '@/components/ui/ClientInfoModal';
import LastUpdated from '@/components/ui/LastUpdated';
import DataFreshness from '@/components/ui/DataFreshness';
import ExportButton from '@/components/ui/ExportButton';
import EmbedCode from '@/components/ui/EmbedCode';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const indicator = await getIndicatorBySlug(params.slug);

    if (!indicator) {
        return {
            title: 'Indicator Not Found | Kenya Ranked',
        };
    }

    return {
        title: `${indicator.name} - Kenya Statistics | Kenya Ranked`,
        description: indicator.description,
    };
}

// Revalidate every 6 hours
export const revalidate = 21600;

export default async function IndicatorPage({ params }: PageProps) {
    const indicator = await getIndicatorBySlug(params.slug);

    if (!indicator) {
        notFound();
    }

    const comparisonData = regionalComparisons[indicator.slug] || [];

    return (
        <div className="min-h-screen bg-soft-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link
                        href="/indicators"
                        className="inline-flex items-center text-slate-500 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to all indicators
                    </Link>
                </nav>

                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                    ${indicator.category === 'governance' ? 'bg-blue-100 text-blue-800' :
                                        indicator.category === 'economy' ? 'bg-green-100 text-green-800' :
                                            indicator.category === 'society' ? 'bg-purple-100 text-purple-800' :
                                                'bg-slate-100 text-slate-800'}`}>
                                    {indicator.category}
                                </span>
                                <DataFreshness lastUpdated={indicator.lastUpdated} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 flex items-center gap-3">
                                {indicator.name}
                                <InfoTooltip
                                    content={{
                                        title: indicator.name,
                                        brief: indicator.description,
                                        detailed: indicator.description, // Using description for detailed too as we don't have separate detailed text yet
                                        whyItMatters: "This indicator is crucial for understanding Kenya's development progress.",
                                        methodology: indicator.methodology,
                                        source: indicator.source,
                                        sourceUrl: indicator.sourceUrl
                                    }}
                                />
                            </h1>
                            <p className="text-lg text-slate-600 max-w-3xl">
                                {indicator.description}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <ExportButton
                                data={[indicator]}
                                filename={indicator.slug}
                                variant="button"
                            />
                            <ClientInfoModal
                                trigger={
                                    <button className="btn-secondary flex items-center gap-2">
                                        <Info className="w-4 h-4" />
                                        Details
                                    </button>
                                }
                                title={indicator.name}
                            >
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-primary mb-1">Description</h4>
                                        <p className="text-slate-600">{indicator.description}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-primary mb-1">Why it matters</h4>
                                        <p className="text-slate-600">Understanding this metric helps in assessing the country's performance relative to regional and global standards.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-primary mb-1">Methodology</h4>
                                        <p className="text-slate-600">{indicator.methodology}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-primary mb-1">Source</h4>
                                        <p className="text-slate-600">{indicator.source}</p>
                                        {indicator.sourceUrl && (
                                            <a href={indicator.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                                                Visit Source
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </ClientInfoModal>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Key Stats & Trend */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Key Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="text-sm text-slate-500 mb-1">Current Value</div>
                                <div className="text-3xl font-bold text-primary">
                                    {indicator.score.toLocaleString()}
                                    <span className="text-sm font-normal text-slate-400 ml-1">{indicator.unit}</span>
                                </div>
                                <div className="mt-2 flex items-center text-sm">
                                    <span className="text-slate-400">Year: {indicator.year}</span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="text-sm text-slate-500 mb-1">Global Rank</div>
                                <div className="text-3xl font-bold text-primary">
                                    #{indicator.rank}
                                    <span className="text-sm font-normal text-slate-400 ml-1">/ {indicator.totalCountries}</span>
                                </div>
                                <div className="mt-2 text-sm text-slate-400">
                                    Out of {indicator.totalCountries} countries
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="text-sm text-slate-500 mb-1">Trend</div>
                                <div className={`text-3xl font-bold flex items-center gap-2
                                    ${indicator.trend === 'up' ? 'text-green-600' :
                                        indicator.trend === 'down' ? 'text-red-600' : 'text-slate-600'}`}>
                                    {indicator.trend === 'up' ? <TrendingUp className="w-6 h-6" /> :
                                        indicator.trend === 'down' ? <TrendingDown className="w-6 h-6" /> :
                                            <Minus className="w-6 h-6" />}
                                    <span className="capitalize">{indicator.trend}</span>
                                </div>
                                <div className="mt-2 text-sm text-slate-400">
                                    vs Previous Year
                                </div>
                            </div>
                        </div>

                        {/* Trend Chart */}
                        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold text-primary mb-6">Historical Trend</h3>
                            <div className="h-64 md:h-80 w-full overflow-hidden">
                                <TrendSparkline
                                    data={indicator.trendData}
                                    width={800}
                                    height={300}
                                    color={indicator.trend === 'up' ? '#10B981' : '#EF4444'}
                                />
                            </div>
                        </div>

                        {/* Regional Comparison */}
                        {comparisonData.length > 0 && (
                            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="text-lg font-semibold text-primary mb-6">Regional Comparison</h3>
                                <div className="h-64 md:h-80 w-full overflow-hidden">
                                    <BarChart data={comparisonData} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Meta Info */}
                    <div className="space-y-8">
                        {/* Source Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5" />
                                Source Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-slate-500 mb-1">Data Source</div>
                                    <div className="font-medium text-slate-900">{indicator.source}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 mb-1">Last Updated</div>
                                    <LastUpdated date={indicator.lastUpdated} />
                                </div>
                                <div>
                                    <div className="text-sm text-slate-500 mb-1">Update Frequency</div>
                                    <div className="font-medium text-slate-900">{indicator.updateFrequency || 'Annually'}</div>
                                </div>
                                {indicator.sourceUrl && (
                                    <a
                                        href={indicator.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm mt-2"
                                    >
                                        Visit Source Website
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Embed Widget */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                                <Share2 className="w-5 h-5" />
                                Share & Embed
                            </h3>
                            <p className="text-sm text-slate-500 mb-4">
                                Use this code to embed this indicator chart on your website.
                            </p>
                            <EmbedCode
                                config={{
                                    widgetType: 'chart',
                                    widgetId: indicator.slug,
                                    height: 400
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
