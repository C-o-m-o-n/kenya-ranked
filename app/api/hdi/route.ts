// UNDP HDI Data Fetcher using HDRO Data API
// Fetches real HDI data from UNDP Human Development Reports API

const HDRO_API_BASE = 'https://hdrdata.org/api/CompositeIndices';
const HDRO_API_KEY = process.env.HDRO_API_KEY || '';

interface HDIData {
    country: string;
    iso3: string;
    year: number;
    hdi: number;
    rank?: number;
}

interface HDROApiResponse {
    country: string;
    dimension: string;
    index: string;
    indicator: string;
    year: string;
    value: string;
}

/**
 * Fetch and parse HDI data from HDRO Data API
 * Note: This is a server-side only function
 */
export async function fetchUNDPHDIData(): Promise<HDIData[]> {
    try {
        const url = `${HDRO_API_BASE}/query?apikey=${HDRO_API_KEY}&countryOrAggregation=KEN`;

        const response = await fetch(url, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch HDRO data: ${response.statusText}`);
        }

        const data: HDROApiResponse[] = await response.json();

        // Filter for HDI values only
        const hdiData: HDIData[] = data
            .filter(item =>
                item.index === 'HDI - Human Development Index' &&
                item.indicator === 'hdi - Human Development Index (value)' &&
                item.value &&
                item.value !== '..'
            )
            .map(item => ({
                country: 'Kenya',
                iso3: 'KEN',
                year: parseInt(item.year),
                hdi: parseFloat(item.value),
            }))
            .sort((a, b) => b.year - a.year);

        if (hdiData.length === 0) {
            throw new Error('No HDI data found for Kenya');
        }

        console.log(hdiData);

        return hdiData;
    } catch (error) {
        console.error('Error fetching HDRO HDI data:', error);
        // Return fallback data
        return [

        ];
    }
}

/**
 * Get Kenya's latest HDI value
 */
export async function getKenyaHDI() {
    const hdiData = await fetchUNDPHDIData();
    const latest = hdiData[0];

    return {
        id: 'hdi-' + latest.year,
        name: 'Human Development Index',
        slug: 'human-development-index',
        category: 'development' as const,
        description: 'Composite index measuring average achievement in three basic dimensions of human development.',
        year: latest.year,
        score: latest.hdi,
        rank: latest.rank || 146,
        totalCountries: 193,
        trend: 'up' as const,
        trendData: hdiData.slice(0, 6).reverse().map(d => ({
            year: d.year,
            value: d.hdi,
        })),
        source: 'UNDP - Human Development Report',
        sourceUrl: 'https://hdr.undp.org/',
        methodology: 'The HDI is a summary measure of average achievement in key dimensions of human development: a long and healthy life, being knowledgeable and have a decent standard of living.',
        unit: 'Index (0-1)',
        higherIsBetter: true,
        lastUpdated: new Date().toISOString().split('T')[0],
        updateFrequency: 'Annually',
    };
}

/**
 * Fetch regional HDI comparison data from HDRO API
 * Fetches HDI values for Kenya, neighboring countries, and regional averages
 */
export async function fetchRegionalHDIComparison() {
    try {
        const countries = [
            { code: 'KEN', name: 'Kenya' },
            { code: 'RWA', name: 'Rwanda' },
            { code: 'TZA', name: 'Tanzania' },
            { code: 'UGA', name: 'Uganda' },
        ];

        const comparisonData = [];

        // Fetch data for each country
        for (const country of countries) {
            const url = `${HDRO_API_BASE}/query?apikey=${HDRO_API_KEY}&countryOrAggregation=${country.code}`;

            const response = await fetch(url, {
                next: { revalidate: 86400 } // Cache for 24 hours
            });

            if (response.ok) {
                const data: HDROApiResponse[] = await response.json();

                // Get the most recent HDI value
                const hdiValues = data
                    .filter(item =>
                        item.index === 'HDI - Human Development Index' &&
                        item.indicator === 'hdi - Human Development Index (value)' &&
                        item.value &&
                        item.value !== '..'
                    )
                    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

                if (hdiValues.length > 0) {
                    comparisonData.push({
                        country: country.name,
                        value: parseFloat(hdiValues[0].value)
                    });
                }
            }
        }

        // Add regional averages (these might not be available via API, using estimates)
        // TODO: Fetch actual regional averages from HDRO if available
        comparisonData.push(
            { country: 'East Africa Avg', value: 0.558 },
            { country: 'Africa Avg', value: 0.547 },
            { country: 'World Avg', value: 0.739 }
        );

        return comparisonData;
    } catch (error) {
        console.error('Error fetching regional HDI comparison:', error);
        // Return fallback data
        return [
            { country: 'Kenya', value: 0.601 },
            { country: 'Rwanda', value: 0.534 },
            { country: 'Tanzania', value: 0.549 },
            { country: 'Uganda', value: 0.550 },
            { country: 'East Africa Avg', value: 0.558 },
            { country: 'Africa Avg', value: 0.547 },
            { country: 'World Avg', value: 0.739 },
        ];
    }
}
