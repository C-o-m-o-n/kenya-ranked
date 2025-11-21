import Link from 'next/link';
import { Metadata } from 'next';
import MetricCard from '@/components/cards/MetricCard';
import BarChart from '@/components/charts/BarChart';
import StructuredData from '@/components/seo/StructuredData';
import { homeMetrics, regionalComparisons } from '@/data/mockData';
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

// Revalidate every 24 hours for fresh data
export const revalidate = 86400;

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

export default function HomePage() {
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
                        {homeMetrics.map((metric, index) => (
                            <MetricCard
                                key={index}
                                title={metric.title}
                                value={metric.value}
                                rank={metric.rank}
                                trend={metric.trend}
                                change={metric.change}
                            />
                        ))}
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
