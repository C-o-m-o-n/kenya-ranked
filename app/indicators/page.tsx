import { Metadata } from 'next';
import { getAllIndicators } from '@/lib/dataService';
import IndicatorsList from '@/components/indicators/IndicatorsList';
import { getKenyaDocuments } from '@/lib/worldbank/services';
import DocumentCard from '@/components/documents/DocumentCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'All Indicators | Kenya Ranked',
    description: 'Browse all available indicators and metrics for Kenya. Filter by category, search for specific topics, and download data.',
};

// Revalidate every 6 hours
export const revalidate = 21600;

export default async function IndicatorsPage() {
    const allIndicators = await getAllIndicators();
    const latestDocuments = await getKenyaDocuments({ rows: 3 });

    return (
        <div className="min-h-screen bg-soft-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                        All Indicators
                    </h1>
                    <p className="text-lg text-slate-light max-w-3xl">
                        Browse our complete database of development indicators for Kenya.
                        Search, filter, and explore trends across governance, economy, and social metrics.
                    </p>
                </div>

                <IndicatorsList initialIndicators={allIndicators} />

                {/* Related Documents Section */}
                <div className="mt-20 pt-12 border-t border-slate-200">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
                                Related Documents
                            </h2>
                            <p className="text-slate-light">
                                Official reports and data from the World Bank
                            </p>
                        </div>
                        <Link href="/documents" className="flex items-center text-primary font-semibold hover:text-primary-dark transition-colors">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestDocuments.map((doc) => (
                            <DocumentCard key={doc.id} document={doc} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
