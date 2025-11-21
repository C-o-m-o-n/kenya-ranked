import Head from 'next/head';

export interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    twitterCard?: 'summary' | 'summary_large_image';
    noindex?: boolean;
    keywords?: string[];
}

const defaultSEO = {
    title: 'Kenya Ranked | See how Kenya stands in the world',
    description:
        'Track Kenya\'s performance across global indices: governance, corruption, poverty, HDI, SDGs, and more. Data-driven insights from authoritative international sources.',
    ogImage: '/og-image.png', // Placeholder - will be replaced with generated image
    ogType: 'website' as const,
    twitterCard: 'summary_large_image' as const,
    keywords: [
        'Kenya',
        'data',
        'governance',
        'development',
        'SDG',
        'corruption',
        'HDI',
        'indicators',
        'rankings',
        'transparency',
    ],
};

export default function SEO({
    title,
    description,
    canonical,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    noindex = false,
    keywords,
}: SEOProps) {
    const siteUrl = 'https://kenyaranked.com';

    const seo = {
        title: title ? `${title} | Kenya Ranked` : defaultSEO.title,
        description: description || defaultSEO.description,
        canonical: canonical ? `${siteUrl}${canonical}` : siteUrl,
        ogImage: ogImage || defaultSEO.ogImage,
        ogType: ogType || defaultSEO.ogType,
        twitterCard: twitterCard || defaultSEO.twitterCard,
        keywords: keywords || defaultSEO.keywords,
    };

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{seo.title}</title>
            <meta name="title" content={seo.title} />
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.keywords.join(', ')} />

            {/* Canonical URL */}
            <link rel="canonical" href={seo.canonical} />

            {/* Robots */}
            {noindex && <meta name="robots" content="noindex,nofollow" />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={seo.ogType} />
            <meta property="og:url" content={seo.canonical} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={`${siteUrl}${seo.ogImage}`} />
            <meta property="og:site_name" content="Kenya Ranked" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta property="twitter:card" content={seo.twitterCard} />
            <meta property="twitter:url" content={seo.canonical} />
            <meta property="twitter:title" content={seo.title} />
            <meta property="twitter:description" content={seo.description} />
            <meta property="twitter:image" content={`${siteUrl}${seo.ogImage}`} />

            {/* Additional Meta Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="author" content="Kenya Ranked" />
        </Head>
    );
}
