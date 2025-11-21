import Link from 'next/link';
import { Metadata } from 'next';
import MetricCard from '@/components/cards/MetricCard';
import BarChart from '@/components/charts/BarChart';
import StructuredData from '@/components/seo/StructuredData';
import { getKeyIndicators } from '@/lib/dataService';
import { indicatorTooltips } from '@/data/tooltips';
import { regionalComparisons } from '@/data/staticData';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Kenya Ranked',
    description: 'Track Kenya\'s performance across global indices: governance, corruption, poverty, HDI, SDGs, and more. Data-driven insights from authoritative international sources.',
    openGraph: {
        title: 'Kenya Ranked | See how Kenya stands in the world',
        description: 'Track Kenya\'s performance across global indices through data, not opinions.',
        url: 'https://kenyaranked.com',
        type: 'website',
    },
};

// Revalidate every 6 hours for fresh data
export const revalidate = 21600;

const categories = [
    { name: 'Governance', slug: 'governance', icon: '⚖️', color: 'bg-blue-500' },
    { name: 'Economy', slug: 'economy', icon: '💰', color: 'bg-green-500' },
    { name: 'Society', slug: 'society', icon: '👥', color: 'bg-purple-500' },
    { name: 'SDGs', slug: 'sdg', icon: '🎯', color: 'bg-cyan-500' },
    { name: 'Health', slug: 'health', icon: '🏥', color: 'bg-red-500' },
    { name: 'Education', slug: 'education', icon: '📚', color: 'bg-yellow-500' },
    { name: 'Development', slug: 'development', icon: '📈', color: 'bg-indigo-500' },
    { name: 'Corruption', slug: 'corruption', icon: '🔍', color: 'bg-orange-500' },
];

export default async function HomePage() {
    // Fetch real data from APIs
    const keyIndicators = await getKeyIndicators();

    // Create home metrics from key indicators
    const homeMetrics = keyIndicators.slice(0, 6).map(indicator => ({
        title: indicator.name,
        value: typeof indicator.score === 'number' ? indicator.score.toLocaleString('en-US', { maximumFractionDigits: 2 }) : indicator.score,
        rank: `${indicator.rank}/${indicator.totalCountries}`,
        trend: indicator.trend,
        change: indicator.trendData.length >= 2
            ? `${indicator.trendData[indicator.trendData.length - 1].value - indicator.trendData[indicator.trendData.length - 2].value > 0 ? '+' : ''}${(indicator.trendData[indicator.trendData.length - 1].value - indicator.trendData[indicator.trendData.length - 2].value).toFixed(1)}`
            : undefined,
        category: indicator.category,
    }));


    return (
        <>
            <StructuredData type="organization" />
            <StructuredData type="website" />

            <div className="bg-soft-white">
                {/* Hero Section */}
                <header>
                    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white overflow-hidden" aria-label="Hero section">
                        {/* Kenya Map Outline Background */}
                        <div className="absolute inset-0 opacity-5" aria-hidden="true">
                            <svg
                                viewBox="0 0 800 600"
                                className="w-full h-full"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M400 100 L450 150 L500 200 L480 280 L450 350 L400 400 L350 380 L320 320 L300 250 L320 180 L360 130 Z"
                                    fill="white"
                                    stroke="white"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>

                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                            <div className="max-w-3xl">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white">
                                    How is Kenya Ranked Globally?
                                </h1>
                                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                                    A centralized view of Kenya's governance, development, and
                                    progress indicators.
                                </p>
                                <p className="text-lg text-white/80 mb-8">
                                    See how Kenya stands in the world — through data, not opinions.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/indicators" className="btn-primary bg-kenya-green hover:bg-kenya-green/90">
                                        Explore Indicators
                                        <ArrowRight className="inline-block ml-2 h-5 w-5" />
                                    </Link>
                                    <Link href="/sdg" className="btn-secondary bg-white/10 hover:bg-white/20 border-white/30 text-white">
                                        View SDG Progress
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </header>

                {/* Data Freshness Banner */}
                <div className="bg-data-cyan/5 border-l-4 border-data-cyan py-3">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-sm text-slate flex items-center gap-2">
                            <span className="font-semibold">Data Status:</span>
                            All indicators updated as of November 2024. Data sources are refreshed according to their publication schedules.
                        </p>
                    </div>
                </div>

                {/* Kenya's Story - Narrative Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                            Kenya's Story in Numbers
                        </h2>
                        <p className="text-lg text-slate-light max-w-3xl mx-auto">
                            Kenya stands at a crossroads of opportunity and challenge. As East Africa's economic hub,
                            the country has made remarkable progress in some areas while facing persistent challenges in others.
                        </p>
                    </div>

                    {/* Strengths and Challenges Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Strengths */}
                        <div>
                            <h3 className="text-2xl font-heading font-semibold text-data-green mb-6 flex items-center gap-2">
                                <span className="text-3xl">✓</span>
                                Kenya's Strengths
                            </h3>
                            <div className="space-y-4">
                                <div className="card bg-gradient-to-br from-data-green/5 to-transparent border-l-4 border-data-green">
                                    <h4 className="font-semibold text-primary mb-2">Leading in Climate Action</h4>
                                    <p className="text-sm text-slate-light mb-2">
                                        Kenya demonstrates strong commitment to environmental sustainability with low CO2 emissions and significant renewable energy adoption.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-light">
                                        <span className="font-mono font-semibold text-data-green">64% progress</span>
                                        <span>•</span>
                                        <span>48.9% renewable energy share</span>
                                    </div>
                                </div>

                                <div className="card bg-gradient-to-br from-data-green/5 to-transparent border-l-4 border-data-green">
                                    <h4 className="font-semibold text-primary mb-2">Quality Education Progress</h4>
                                    <p className="text-sm text-slate-light mb-2">
                                        Kenya has made significant strides in education with high primary completion rates and improving literacy.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-light">
                                        <span className="font-mono font-semibold text-data-green">68% progress</span>
                                        <span>•</span>
                                        <span>87.3% primary completion</span>
                                    </div>
                                </div>

                                <div className="card bg-gradient-to-br from-data-green/5 to-transparent border-l-4 border-data-green">
                                    <h4 className="font-semibold text-primary mb-2">Economic Growth Momentum</h4>
                                    <p className="text-sm text-slate-light mb-2">
                                        Despite global challenges, Kenya maintains steady economic growth and rising GDP per capita.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-light">
                                        <span className="font-mono font-semibold text-data-green">$2,099</span>
                                        <span>•</span>
                                        <span>5.3% GDP growth rate</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Challenges */}
                        <div>
                            <h3 className="text-2xl font-heading font-semibold text-data-red mb-6 flex items-center gap-2">
                                <span className="text-3xl">!</span>
                                Key Challenges
                            </h3>
                            <div className="space-y-4">
                                <div className="card bg-gradient-to-br from-data-red/5 to-transparent border-l-4 border-data-red">
                                    <h4 className="font-semibold text-primary mb-2">Corruption Remains a Major Concern</h4>
                                    <p className="text-sm text-slate-light mb-2">
                                        Kenya continues to struggle with high levels of perceived corruption in the public sector.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-light">
                                        <span className="font-mono font-semibold text-data-red">31/100 score</span>
                                        <span>•</span>
                                        <span>Rank 126/180</span>
                                    </div>
                                </div>

                                <div className="card bg-gradient-to-br from-data-red/5 to-transparent border-l-4 border-data-red">
                                    <h4 className="font-semibold text-primary mb-2">Persistent Poverty and Inequality</h4>
                                    <p className="text-sm text-slate-light mb-2">
                                        Over one-third of Kenyans still live below the poverty line, with significant regional disparities.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-light">
                                        <span className="font-mono font-semibold text-data-red">36.1%</span>
                                        <span>•</span>
                                        <span>Rank 142/170</span>
                                    </div>
                                </div>

                                <div className="card bg-gradient-to-br from-data-red/5 to-transparent border-l-4 border-data-red">
                                    <h4 className="font-semibold text-primary mb-2">Food Security and Nutrition Gaps</h4>
                                    <p className="text-sm text-slate-light mb-2">
                                        Kenya faces ongoing challenges with hunger and malnutrition, particularly in arid and semi-arid regions.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-light">
                                        <span className="font-mono font-semibold text-data-red">48% progress</span>
                                        <span>•</span>
                                        <span>Off-track for 2030</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Outlook */}
                    <div className="card bg-gradient-to-r from-primary/5 to-data-cyan/5 border-t-4 border-primary">
                        <h3 className="text-xl font-heading font-semibold text-primary mb-3">Looking Ahead</h3>
                        <p className="text-slate-light leading-relaxed">
                            Kenya's young, dynamic population and strategic investments in technology, infrastructure, and renewable energy
                            position it well for future growth. Success will depend on strengthening governance, reducing inequality, and
                            ensuring that economic growth translates into improved living standards for all Kenyans.
                        </p>
                    </div>
                </section>

                {/* Key Highlights Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                            Key Highlights
                        </h2>
                        <p className="text-lg text-slate-light">
                            Kenya's performance across critical global indicators
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {homeMetrics.map((metric, index) => {
                            // Find the corresponding indicator for detailed info
                            const indicator = keyIndicators.find(ind =>
                                ind.name === metric.title ||
                                ind.name.includes(metric.title.split(' ')[0])
                            );

                            // Get tooltip content
                            const tooltipContent = indicator && indicatorTooltips[indicator.id];

                            return (
                                <MetricCard
                                    key={index}
                                    title={metric.title}
                                    value={metric.value}
                                    rank={metric.rank}
                                    trend={metric.trend}
                                    change={metric.change}
                                    lastUpdated={indicator?.lastUpdated}
                                    tooltipContent={tooltipContent?.brief}
                                    detailedInfo={tooltipContent ? {
                                        description: tooltipContent.detailed,
                                        methodology: tooltipContent.methodology || '',
                                        source: indicator?.source || '',
                                        sourceUrl: indicator?.sourceUrl,
                                    } : undefined}
                                />
                            );
                        })}
                    </div>
                </section>

                {/* Kenya vs Region vs World */}
                <section className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                                Kenya vs Region vs World
                            </h2>
                            <p className="text-lg text-slate-light">
                                Comparing Kenya's performance with regional and global averages
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="card">
                                <BarChart
                                    data={regionalComparisons['corruption-perceptions-index']}
                                    title="Corruption Perceptions Index"
                                    yAxisLabel="Score (0-100)"
                                />
                            </div>
                            <div className="card">
                                <BarChart
                                    data={regionalComparisons['human-development-index']}
                                    title="Human Development Index"
                                    yAxisLabel="Index (0-1)"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rankings Explorer */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                            Explore by Category
                        </h2>
                        <p className="text-lg text-slate-light">
                            Browse indicators by thematic areas
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/indicators?category=${category.slug}`}
                                className="card group hover:scale-105 transition-all duration-200"
                            >
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-200`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="font-heading font-semibold text-primary">
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                            Want to Compare Multiple Indicators?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Use our comparison tool to analyze Kenya's performance across
                            different metrics and countries
                        </p>
                        <Link href="/compare" className="btn-primary bg-kenya-green hover:bg-kenya-green/90">
                            Go to Comparison Tool
                            <ArrowRight className="inline-block ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
