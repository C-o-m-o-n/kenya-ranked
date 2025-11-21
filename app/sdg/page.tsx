import Link from 'next/link';
import { getAllSDGGoals } from '@/lib/dataService';
import { getSDGStatusColor } from '@/lib/utils';
import DataFreshness from '@/components/ui/DataFreshness';

export const revalidate = 86400; // Revalidate daily

export default async function SDGPage() {
    const goals = await getAllSDGGoals();

    return (
        <div className="min-h-screen bg-soft-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                        Sustainable Development Goals
                    </h1>
                    <p className="text-lg text-slate-light max-w-3xl">
                        Track Kenya's progress toward achieving the 17 UN Sustainable
                        Development Goals by 2030
                    </p>
                </div>

                {/* Overall Progress */}
                <div className="card mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-2xl font-heading font-semibold text-primary mb-2">
                                Overall SDG Progress
                            </h3>
                            <p className="text-slate-light">
                                Kenya's aggregate performance across all 17 goals
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-5xl font-bold font-mono text-primary">59.8</p>
                            <p className="text-sm text-slate-light">out of 100</p>
                        </div>
                    </div>
                    <div className="w-full bg-soft-gray rounded-full h-4">
                        <div
                            className="bg-gradient-to-r from-data-cyan to-data-blue h-4 rounded-full transition-all duration-500"
                            style={{ width: '59.8%' }}
                        />
                    </div>
                </div>

                {/* SDG Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal) => (
                        <Link
                            key={goal.number}
                            href={`/sdg/${goal.slug}`}
                            className="card group hover:scale-105 transition-all duration-200"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                    style={{ backgroundColor: goal.color }}
                                >
                                    {goal.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-light mb-1">
                                        Goal {goal.number}
                                    </p>
                                    <h3 className="font-heading font-semibold text-primary group-hover:text-primary-dark transition-colors line-clamp-2">
                                        {goal.title}
                                    </h3>
                                </div>
                            </div>

                            <p className="text-sm text-slate-light mb-4 line-clamp-2">
                                {goal.description}
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate">
                                        Progress
                                    </span>
                                    <span className="text-sm font-bold font-mono text-primary">
                                        {goal.progress}%
                                    </span>
                                </div>
                                <div className="w-full bg-soft-gray rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${goal.progress}%`,
                                            backgroundColor: goal.color,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="flex items-center justify-between">
                                <span
                                    className={`rank-badge ${getSDGStatusColor(goal.status)} capitalize`}
                                >
                                    {goal.status.replace('-', ' ')}
                                </span>
                                {goal.lastUpdated && (
                                    <DataFreshness lastUpdated={goal.lastUpdated} showLabel={false} />
                                )}
                                <span className="text-sm text-slate-light">
                                    {goal.indicators.length} indicators
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
