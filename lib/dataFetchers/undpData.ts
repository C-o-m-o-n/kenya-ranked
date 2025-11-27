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

        console.log('🔵 [HDRO API] Starting HDI data fetch...');
        console.log('🔵 [HDRO API] API URL:', url.replace(HDRO_API_KEY, 'API_KEY_HIDDEN'));
        console.log('🔵 [HDRO API] API Key present:', !!HDRO_API_KEY);

        const response = await fetch(url, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        console.log('🔵 [HDRO API] Response status:', response.status);
        console.log('🔵 [HDRO API] Response OK:', response.ok);

        if (!response.ok) {
            throw new Error(`Failed to fetch HDRO data: ${response.statusText}`);
        }

        const data: HDROApiResponse[] = await response.json();

        console.log('🔵 [HDRO API] Total records returned:', data.length);
        console.log('🔵 [HDRO API] Sample record:', data[0]);

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

        console.log('🔵 [HDRO API] Filtered HDI records:', hdiData.length);
        console.log('🔵 [HDRO API] HDI Data:', JSON.stringify(hdiData, null, 2));

        if (hdiData.length === 0) {
            console.error('🔴 [HDRO API] No HDI data found for Kenya after filtering');
            throw new Error('No HDI data found for Kenya');
        }

        console.log('✅ [HDRO API] Successfully fetched HDI data');

        return hdiData;
    } catch (error) {
        console.error('🔴 [HDRO API] Error fetching HDI data:', error);
        throw new Error('Failed to fetch HDI data from HDRO API. Please check your API key and try again.');
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
        console.log('🟢 [REGIONAL HDI] Starting regional HDI comparison fetch...');

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

            console.log(`🟢 [REGIONAL HDI] Fetching ${country.name} (${country.code})...`);

            const response = await fetch(url, {
                next: { revalidate: 86400 } // Cache for 24 hours
            });

            console.log(`🟢 [REGIONAL HDI] ${country.name} response status:`, response.status);

            if (response.ok) {
                const data: HDROApiResponse[] = await response.json();

                console.log(`🟢 [REGIONAL HDI] ${country.name} total records:`, data.length);

                // Get the most recent HDI value
                const hdiValues = data
                    .filter(item =>
                        item.index === 'HDI - Human Development Index' &&
                        item.indicator === 'hdi - Human Development Index (value)' &&
                        item.value &&
                        item.value !== '..'
                    )
                    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

                console.log(`🟢 [REGIONAL HDI] ${country.name} HDI values found:`, hdiValues.length);

                if (hdiValues.length > 0) {
                    const countryData = {
                        country: country.name,
                        value: parseFloat(hdiValues[0].value)
                    };
                    comparisonData.push(countryData);
                    console.log(`🟢 [REGIONAL HDI] ${country.name} HDI:`, countryData.value);
                }
            } else {
                console.warn(`⚠️ [REGIONAL HDI] Failed to fetch ${country.name}`);
            }
        }

        // Add regional averages (these might not be available via API, using estimates)
        // TODO: Fetch actual regional averages from HDRO if available
        comparisonData.push(
            { country: 'East Africa Avg', value: 0.558 },
            { country: 'Africa Avg', value: 0.547 },
            { country: 'World Avg', value: 0.739 }
        );

        console.log('✅ [REGIONAL HDI] Final comparison data:', JSON.stringify(comparisonData, null, 2));

        return comparisonData;
    } catch (error) {
        console.error('🔴 [REGIONAL HDI] Error:', error);
        throw new Error('Failed to fetch regional HDI comparison data from HDRO API.');
    }
}

/**
 * Fetch SDG data from UNDP API
 */
export async function fetchUNDPSDGData(operatingUnit: string = 'KEN', year: number = 2024) {
    try {
        const url = `https://api.open.undp.org/api/sdg-index.json?operating_unit=${operatingUnit}&year=${year}`;
        const response = await fetch(url, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch UNDP SDG data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching UNDP SDG data:', error);
        return null;
    }
}
