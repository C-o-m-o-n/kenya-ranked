import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://kenyaranked.com';

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/indicators`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sdg`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/compare`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/methodology`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
    ];

    // Dynamic indicator pages
    const indicatorSlugs = [
        'corruption-perceptions-index',
        'human-development-index',
        'control-of-corruption',
        'gdp-per-capita',
        'poverty-headcount-ratio',
        'sdg-index-score',
        'press-freedom-index',
        'life-expectancy-at-birth',
        'government-effectiveness',
        'rule-of-law',
        'regulatory-quality',
        'voice-and-accountability',
        'political-stability',
    ];

    const indicatorPages = indicatorSlugs.map((slug) => ({
        url: `${baseUrl}/indicators/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Dynamic SDG pages
    const sdgSlugs = [
        'no-poverty',
        'zero-hunger',
        'good-health',
        'quality-education',
        'gender-equality',
        'clean-water',
        'clean-energy',
        'economic-growth',
        'innovation-infrastructure',
        'reduced-inequalities',
        'sustainable-cities',
        'responsible-consumption',
        'climate-action',
        'life-below-water',
        'life-on-land',
        'peace-justice',
        'partnerships',
    ];

    const sdgPages = sdgSlugs.map((slug) => ({
        url: `${baseUrl}/sdg/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...indicatorPages, ...sdgPages];
}
