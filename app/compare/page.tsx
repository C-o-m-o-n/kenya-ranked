export default function ComparePage() {
    return (
        <div className="min-h-screen bg-soft-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                        Compare Indicators
                    </h1>
                    <p className="text-lg text-slate-light max-w-3xl">
                        Compare Kenya's performance across multiple indicators and against
                        other countries
                    </p>
                </div>

                {/* Coming Soon Notice */}
                <div className="card text-center py-16">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-24 h-24 bg-data-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-5xl">📊</span>
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                            Comparison Tool Coming Soon
                        </h2>
                        <p className="text-lg text-slate-light mb-8">
                            We're building an interactive comparison tool that will allow you
                            to:
                        </p>
                        <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
                            <li className="flex items-start gap-3">
                                <span className="text-kenya-green text-xl">✓</span>
                                <span className="text-slate">
                                    Select multiple indicators to compare side-by-side
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-kenya-green text-xl">✓</span>
                                <span className="text-slate">
                                    Compare Kenya with other East African countries
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-kenya-green text-xl">✓</span>
                                <span className="text-slate">
                                    Analyze trends across different time periods
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-kenya-green text-xl">✓</span>
                                <span className="text-slate">
                                    Export comparison data for further analysis
                                </span>
                            </li>
                        </ul>
                        <p className="text-sm text-slate-light">
                            In the meantime, you can explore individual indicators and their
                            regional comparisons.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
