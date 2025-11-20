import { Mail, Globe, Database } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-soft-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                        About Kenya Ranked
                    </h1>
                    <p className="text-xl text-slate-light">
                        See how Kenya stands in the world — through data, not opinions.
                    </p>
                </div>

                {/* Mission */}
                <div className="card mb-8">
                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                        Our Mission
                    </h2>
                    <p className="text-slate leading-relaxed mb-4">
                        Kenya Ranked is a civic-tech platform dedicated to providing
                        transparent, factual, and accessible information about Kenya's
                        performance across global development indices.
                    </p>
                    <p className="text-slate leading-relaxed">
                        We believe that informed citizens make better decisions. By
                        centralizing data from authoritative international sources, we aim
                        to foster evidence-based discussions about Kenya's development
                        trajectory.
                    </p>
                </div>

                {/* Why This Platform Exists */}
                <div className="card mb-8">
                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                        Why This Platform Exists
                    </h2>
                    <div className="space-y-4 text-slate leading-relaxed">
                        <p>
                            <strong className="text-primary">Transparency:</strong> Development
                            data is often scattered across multiple international
                            organizations. We bring it together in one place.
                        </p>
                        <p>
                            <strong className="text-primary">Accessibility:</strong> Complex
                            indices and reports can be difficult to understand. We present
                            data in clear, visual formats.
                        </p>
                        <p>
                            <strong className="text-primary">Accountability:</strong> By
                            tracking Kenya's progress over time, we enable citizens to hold
                            leaders accountable for development outcomes.
                        </p>
                        <p>
                            <strong className="text-primary">Civic Engagement:</strong> An
                            informed citizenry is essential for democracy. We provide the data
                            needed for meaningful civic participation.
                        </p>
                    </div>
                </div>

                {/* What We Track */}
                <div className="card mb-8">
                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                        What We Track
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'Governance & Corruption',
                            'Economic Development',
                            'Human Development',
                            'Sustainable Development Goals',
                            'Health & Education',
                            'Poverty & Inequality',
                            'Infrastructure & Innovation',
                            'Environmental Sustainability',
                        ].map((category, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-soft-gray rounded-lg"
                            >
                                <span className="text-kenya-green text-xl">✓</span>
                                <span className="text-slate font-medium">{category}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Sources */}
                <div className="card mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Database className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            Powered by Public Data
                        </h2>
                    </div>
                    <p className="text-slate leading-relaxed mb-4">
                        All data on this platform comes from reputable international
                        organizations and research institutions, including:
                    </p>
                    <ul className="space-y-2 text-slate">
                        <li className="flex items-start gap-2">
                            <span className="text-data-cyan">•</span>
                            <span>World Bank (World Development Indicators, Governance Indicators)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-data-cyan">•</span>
                            <span>United Nations Development Programme (Human Development Index)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-data-cyan">•</span>
                            <span>Transparency International (Corruption Perceptions Index)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-data-cyan">•</span>
                            <span>Sustainable Development Solutions Network (SDG Index)</span>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="card">
                    <div className="flex items-center gap-3 mb-4">
                        <Mail className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            Get in Touch
                        </h2>
                    </div>
                    <p className="text-slate leading-relaxed mb-4">
                        Have questions, suggestions, or feedback? We'd love to hear from you.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-slate-light" />
                            <a
                                href="mailto:info@kenyaranked.org"
                                className="text-primary hover:text-primary-dark transition-colors"
                            >
                                info@kenyaranked.org
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-slate-light" />
                            <span className="text-slate">www.kenyaranked.org</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
