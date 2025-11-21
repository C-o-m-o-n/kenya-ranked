interface StructuredDataProps {
    type: 'organization' | 'website' | 'breadcrumb' | 'article';
    data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
    let schema = {};

    switch (type) {
        case 'organization':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Kenya Ranked',
                url: 'https://kenyaranked.com',
                logo: 'https://kenyaranked.com/logo.png',
                description:
                    'A centralized platform for tracking Kenya\'s performance across global development indices.',
                sameAs: [
                    'https://twitter.com/kenyaranked',
                    'https://facebook.com/kenyaranked',
                ],
                contactPoint: {
                    '@type': 'ContactPoint',
                    email: 'info@kenyaranked.org',
                    contactType: 'Customer Service',
                },
            };
            break;

        case 'website':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Kenya Ranked',
                url: 'https://kenyaranked.com',
                description:
                    'Track Kenya\'s performance across global indices through data, not opinions.',
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: 'https://kenyaranked.com/indicators?search={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                },
            };
            break;

        case 'breadcrumb':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: data?.items || [],
            };
            break;

        case 'article':
            schema = {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: data?.title || '',
                description: data?.description || '',
                datePublished: data?.datePublished || new Date().toISOString(),
                dateModified: data?.dateModified || new Date().toISOString(),
                author: {
                    '@type': 'Organization',
                    name: 'Kenya Ranked',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Kenya Ranked',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://kenyaranked.com/logo.png',
                    },
                },
            };
            break;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Helper function to generate breadcrumb schema
export function generateBreadcrumbs(items: { name: string; url: string }[]) {
    return {
        items: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://kenyaranked.com${item.url}`,
        })),
    };
}
