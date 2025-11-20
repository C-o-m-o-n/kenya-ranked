import { ExternalLink, AlertCircle, RefreshCw, FileText } from 'lucide-react';

export default function MethodologyPage() {
    return (
        <div className="min-h-screen bg-soft-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                        Methodology
                    </h1>
                    <p className="text-xl text-slate-light">
                        Understanding how we collect, verify, and present data
                    </p>
                </div>

                {/* Data Sources */}
                <div className="card mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            Data Sources
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-heading font-semibold text-primary mb-2">
                                World Bank - Worldwide Governance Indicators (WGI)
                            </h3>
                            <p className="text-slate mb-2">
                                Aggregate and individual governance indicators for over 200
                                countries, covering six dimensions of governance.
                            </p>
                            <a
                                href="https://www.worldbank.org/en/publication/worldwide-governance-indicators"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-data-cyan hover:text-data-blue inline-flex items-center gap-1 text-sm"
                            >
                                View Source
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>

                        <div>
                            <h3 className="font-heading font-semibold text-primary mb-2">
                                Transparency International - Corruption Perceptions Index (CPI)
                            </h3>
                            <p className="text-slate mb-2">
                                Ranks countries by their perceived levels of public sector
                                corruption, based on expert assessments and opinion surveys.
                            </p>
                            <a
                                href="https://www.transparency.org/en/cpi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-data-cyan hover:text-data-blue inline-flex items-center gap-1 text-sm"
                            >
                                View Source
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>

                        <div>
                            <h3 className="font-heading font-semibold text-primary mb-2">
                                UNDP - Human Development Index (HDI)
                            </h3>
                            <p className="text-slate mb-2">
                                Composite index measuring average achievement in three basic
                                dimensions: long and healthy life, knowledge, and decent
                                standard of living.
                            </p>
                            <a
                                href="https://hdr.undp.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-data-cyan hover:text-data-blue inline-flex items-center gap-1 text-sm"
                            >
                                View Source
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>

                        <div>
                            <h3 className="font-heading font-semibold text-primary mb-2">
                                Sustainable Development Solutions Network - SDG Index
                            </h3>
                            <p className="text-slate mb-2">
                                Assesses countries' progress toward achieving the Sustainable
                                Development Goals across all 17 goals.
                            </p>
                            <a
                                href="https://dashboards.sdgindex.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-data-cyan hover:text-data-blue inline-flex items-center gap-1 text-sm"
                            >
                                View Source
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Update Frequency */}
                <div className="card mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <RefreshCw className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            Update Frequency
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <p className="text-slate leading-relaxed">
                            Different indicators are updated at different frequencies,
                            depending on the source organization's publication schedule:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-soft-gray rounded-lg">
                                <p className="font-semibold text-primary mb-1">Annual Updates</p>
                                <p className="text-sm text-slate">
                                    CPI, HDI, SDG Index, World Development Indicators
                                </p>
                            </div>
                            <div className="p-4 bg-soft-gray rounded-lg">
                                <p className="font-semibold text-primary mb-1">Biennial Updates</p>
                                <p className="text-sm text-slate">
                                    Worldwide Governance Indicators (WGI)
                                </p>
                            </div>
                        </div>

                        <p className="text-slate leading-relaxed">
                            We update our platform within 30 days of new data releases from
                            source organizations.
                        </p>
                    </div>
                </div>

                {/* Limitations */}
                <div className="card mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertCircle className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            Data Limitations & Transparency
                        </h2>
                    </div>

                    <div className="space-y-4 text-slate leading-relaxed">
                        <div className="bg-data-yellow/10 border-l-4 border-data-yellow p-4 rounded">
                            <p className="font-semibold text-primary mb-2">
                                Perception vs. Reality
                            </p>
                            <p className="text-sm">
                                Some indices (like CPI) measure perceptions rather than actual
                                occurrences. While valuable, they should be interpreted with
                                this limitation in mind.
                            </p>
                        </div>

                        <div className="bg-data-yellow/10 border-l-4 border-data-yellow p-4 rounded">
                            <p className="font-semibold text-primary mb-2">
                                Methodology Changes
                            </p>
                            <p className="text-sm">
                                Source organizations occasionally update their methodologies,
                                which can affect year-over-year comparability. We note such
                                changes where applicable.
                            </p>
                        </div>

                        <div className="bg-data-yellow/10 border-l-4 border-data-yellow p-4 rounded">
                            <p className="font-semibold text-primary mb-2">Data Gaps</p>
                            <p className="text-sm">
                                Not all indicators are available for all years. Missing data
                                points are clearly marked in our visualizations.
                            </p>
                        </div>

                        <div className="bg-data-yellow/10 border-l-4 border-data-yellow p-4 rounded">
                            <p className="font-semibold text-primary mb-2">
                                Aggregation Challenges
                            </p>
                            <p className="text-sm">
                                Composite indices combine multiple sub-indicators, which can
                                mask variations in specific areas. We provide breakdowns where
                                available.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How to Use This Data */}
                <div className="card">
                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                        How to Use This Data
                    </h2>
                    <div className="space-y-4 text-slate leading-relaxed">
                        <p>
                            <strong className="text-primary">Context Matters:</strong> Always
                            consider the broader context when interpreting rankings and
                            scores. A single indicator doesn't tell the whole story.
                        </p>
                        <p>
                            <strong className="text-primary">Trends Over Time:</strong> Focus
                            on trends rather than absolute rankings. Consistent improvement or
                            decline is often more meaningful than a single year's position.
                        </p>
                        <p>
                            <strong className="text-primary">Regional Comparisons:</strong>{' '}
                            Compare Kenya with similar countries and regional averages for
                            more relevant insights.
                        </p>
                        <p>
                            <strong className="text-primary">Consult Original Sources:</strong>{' '}
                            For detailed analysis and methodology, always refer to the
                            original source documentation linked on each indicator page.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
