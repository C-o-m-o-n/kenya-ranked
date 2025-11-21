import { Metadata } from 'next';
import { getAllIndicators } from '@/lib/dataService';
import IndicatorsList from '@/components/indicators/IndicatorsList';

export const metadata: Metadata = {
    title: 'All Indicators | Kenya Ranked',
    description: 'Browse all available indicators and metrics for Kenya. Filter by category, search for specific topics, and download data.',
};

// Revalidate every 6 hours
export const revalidate = 21600;

export default async function IndicatorsPage() {
    const allIndicators = await getAllIndicators();

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
            </div>
        </div>
    );
}
