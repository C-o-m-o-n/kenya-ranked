'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { Indicator } from '@/types';
import TrendSparkline from '@/components/charts/TrendSparkline';
import ExportButton from '@/components/ui/ExportButton';

const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'governance', name: 'Governance' },
    { id: 'economy', name: 'Economy' },
    { id: 'society', name: 'Society' },
    { id: 'sdg', name: 'SDGs' },
    { id: 'health', name: 'Health' },
    { id: 'education', name: 'Education' },
    { id: 'environment', name: 'Environment' },
];

export default function IndicatorsList({ initialIndicators }: { initialIndicators: Indicator[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredIndicators = initialIndicators.filter(indicator => {
        const matchesSearch = indicator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            indicator.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || indicator.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8 sticky top-20 z-10">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search indicators..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category.id
                                    ? 'bg-primary text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Indicators Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Indicator</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Latest Value</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Trend</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredIndicators.map((indicator) => (
                                <tr key={indicator.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <Link href={`/indicators/${indicator.slug}`} className="group">
                                            <div className="font-medium text-primary group-hover:text-primary-dark transition-colors">
                                                {indicator.name}
                                            </div>
                                            <div className="text-sm text-slate-500 line-clamp-1">
                                                {indicator.description}
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${indicator.category === 'governance' ? 'bg-blue-100 text-blue-800' :
                                                indicator.category === 'economy' ? 'bg-green-100 text-green-800' :
                                                    indicator.category === 'society' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-slate-100 text-slate-800'}`}>
                                            {indicator.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900">
                                                {indicator.score.toLocaleString()} {indicator.unit}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                Year: {indicator.year}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-24 h-12">
                                            <TrendSparkline
                                                data={indicator.trendData}
                                                color={indicator.trend === 'up' ? '#10B981' : indicator.trend === 'down' ? '#EF4444' : '#6B7280'}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <ExportButton
                                                data={[indicator]}
                                                filename={indicator.slug}
                                                variant="button"
                                                className="text-xs px-2 py-1 h-8"
                                            />
                                            <Link
                                                href={`/indicators/${indicator.slug}`}
                                                className="p-2 text-slate-400 hover:text-primary transition-colors"
                                            >
                                                <ArrowRight className="h-5 w-5" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredIndicators.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-slate-500 text-lg">No indicators found matching your search.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                            className="mt-4 text-primary hover:text-primary-dark font-medium"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
