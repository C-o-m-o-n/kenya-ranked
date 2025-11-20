'use client';

import { useState } from 'react';
import Link from 'next/link';
import { allIndicators } from '@/data/mockData';
import { Search } from 'lucide-react';
import TrendSparkline from '@/components/charts/TrendSparkline';

export default function IndicatorsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', 'governance', 'economy', 'society', 'sdg', 'health', 'education', 'development', 'corruption', 'poverty'];

    const filteredIndicators = allIndicators.filter((indicator) => {
        const matchesSearch = indicator.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === 'all' || indicator.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-soft-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                        All Indicators
                    </h1>
                    <p className="text-lg text-slate-light">
                        Browse and search through all available indicators for Kenya
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-light" />
                        <input
                            type="text"
                            placeholder="Search indicators..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-slate border border-slate/20 hover:bg-soft-gray'
                                    }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <p className="text-sm text-slate-light mb-4">
                    Showing {filteredIndicators.length} indicator{filteredIndicators.length !== 1 ? 's' : ''}
                </p>

                {/* Indicators Table */}
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-soft-gray border-b border-slate/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                                        Indicator
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary">
                                        Score
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary">
                                        Rank
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary">
                                        Trend
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary">
                                        Year
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate/10">
                                {filteredIndicators.map((indicator) => (
                                    <tr
                                        key={indicator.id}
                                        className="hover:bg-soft-gray transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/indicators/${indicator.slug}`}
                                                className="text-primary hover:text-primary-dark font-medium hover:underline"
                                            >
                                                {indicator.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-data-cyan/10 text-data-cyan capitalize">
                                                {indicator.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-mono font-semibold text-slate">
                                            {indicator.score}
                                            {indicator.unit && (
                                                <span className="text-xs text-slate-light ml-1">
                                                    {indicator.unit}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center font-mono text-slate">
                                            {indicator.rank}/{indicator.totalCountries}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <TrendSparkline
                                                data={indicator.trendData}
                                                width={80}
                                                height={30}
                                                higherIsBetter={indicator.higherIsBetter}
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center text-slate-light text-sm">
                                            {indicator.year}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredIndicators.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-light text-lg">
                            No indicators found matching your criteria
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
