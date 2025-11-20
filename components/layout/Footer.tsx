import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-heading font-semibold mb-4 text-white">
                            Kenya Ranked
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                            See how Kenya stands in the world — through data, not opinions.
                            A centralized platform for tracking Kenya's performance across
                            global development indices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-heading font-semibold mb-4 text-white">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/indicators"
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    All Indicators
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/sdg"
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    SDG Progress
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/compare"
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    Compare Data
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/methodology"
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    Methodology
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Data Sources */}
                    <div>
                        <h3 className="text-lg font-heading font-semibold mb-4 text-white">
                            Data Sources
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://www.worldbank.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    World Bank
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.transparency.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    Transparency International
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://hdr.undp.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    UNDP
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://dashboards.sdgindex.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    SDG Index
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/60 text-sm">
                            © {currentYear} Kenya Ranked. Powered by public data sources.
                        </p>
                        <p className="text-white/60 text-sm">
                            Built with transparency and civic engagement in mind.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
