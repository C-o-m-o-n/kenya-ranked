import StructuredData from '@/components/seo/StructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kenya Ranked',
    description: 'See how Kenya stands in the world through data, not opinions. Track performance across global indices.',
    openGraph: {
        title: 'Kenya Ranked | See how Kenya stands in the world',
        description: 'Track Kenya\'s performance across global indices: governance, corruption, poverty, HDI, SDGs, and more.',
        url: 'https://kenyaranked.com',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Kenya Ranked',
            },
        ],
    },
};

// Revalidate every 24 hours
export const revalidate = 86400;

export default function HomePage() {
    return (
        <>
            <StructuredData type="organization" />
            <StructuredData type="website" />

            {/* Rest of homepage content remains unchanged */}
        </>
    );
}
