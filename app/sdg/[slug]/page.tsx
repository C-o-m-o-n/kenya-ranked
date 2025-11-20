import { notFound } from 'next/navigation';
import { getSDGGoalBySlug } from '@/data/mockData';
import { getSDGStatusColor } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SDGGoalPage({
    params,
}: {
    params: { slug: string };
}) {
    const goal = getSDGGoalBySlug(params.slug);

    if (!goal) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-soft-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/sdg"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to all SDGs
                </Link>

                {/* Header */}
                <div className="flex items-start gap-6 mb-12">
                    <div
                        className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                        style={{ backgroundColor: goal.color }}
                    >
                        {goal.icon}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-slate-light mb-2">
                            SDG Goal {goal.number}
                        </p>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                            {goal.title}
                        </h1>
                        <p className="text-lg text-slate-light mb-4">{goal.description}</p>
                        <span
                            className={`rank-badge ${getSDGStatusColor(goal.status)} capitalize`}
                        >
                            Status: {goal.status.replace('-', ' ')}
                        </span>
                    </div>
                </div>

                {/* Overall Progress */}
                <div className="card mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-heading font-semibold text-primary">
                            Overall Progress
                        </h3>
                        <span className="text-4xl font-bold font-mono text-primary">
                            {goal.progress}%
                        </span>
                    </div>
                    <div className="w-full bg-soft-gray rounded-full h-6">
                        <div
                            className="h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                            style={{
                                width: `${goal.progress}%`,
                                backgroundColor: goal.color,
                            }}
                        >
                            <span className="text-xs font-medium text-white">
                                {goal.progress}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Indicators */}
                <div className="mb-12">
                    <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                        Key Indicators
                    </h2>
                    <div className="space-y-4">
                        {goal.indicators.map((indicator) => (
                            <div key={indicator.id} className="card">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div className="flex-1">
                                        <h4 className="font-heading font-semibold text-primary mb-2">
                                            {indicator.name}
                                        </h4>
                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <div>
                                                <span className="text-slate-light">Current: </span>
                                                <span className="font-mono font-semibold text-slate">
                                                    {indicator.value} {indicator.unit}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-slate-light">Target: </span>
                                                <span className="font-mono font-semibold text-slate">
                                                    {indicator.target} {indicator.unit}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-slate-light">Year: </span>
                                                <span className="font-mono font-semibold text-slate">
                                                    {indicator.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold font-mono text-primary">
                                            {indicator.progress}%
                                        </p>
                                        <p className="text-xs text-slate-light">of target</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-soft-gray rounded-full h-3">
                                    <div
                                        className="h-3 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(indicator.progress, 100)}%`,
                                            backgroundColor: goal.color,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Kenya vs East Africa */}
                <div className="card">
                    <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
                        Kenya vs East Africa Average
                    </h3>
                    <p className="text-slate-light mb-6">
                        Comparing Kenya's performance on this goal with the regional average
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm font-medium text-slate-light mb-2">Kenya</p>
                            <p className="text-4xl font-bold font-mono text-kenya-green">
                                {goal.progress}%
                            </p>
                            <div className="w-full bg-soft-gray rounded-full h-3 mt-2">
                                <div
                                    className="bg-kenya-green h-3 rounded-full"
                                    style={{ width: `${goal.progress}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-light mb-2">
                                East Africa Average
                            </p>
                            <p className="text-4xl font-bold font-mono text-data-cyan">
                                {Math.max(goal.progress - 5, 0)}%
                            </p>
                            <div className="w-full bg-soft-gray rounded-full h-3 mt-2">
                                <div
                                    className="bg-data-cyan h-3 rounded-full"
                                    style={{ width: `${Math.max(goal.progress - 5, 0)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
