// UNDP HDI Data Fetcher
// Downloads and parses real HDI data from UNDP Human Development Reports

const UNDP_DATA_URLS = {
    // HDI Trends 1990-2023 (Excel format - we'll need to parse)
    HDI_TRENDS: 'https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Statistical_Annex_HDI_Trends_Table.xlsx',
    // All composite indices time series (CSV format - easier to parse)
    ALL_INDICES_CSV: 'https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Composite_indices_complete_time_series.csv',
    // HDI Table with components
    HDI_TABLE: 'https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Statistical_Annex_HDI_Table.xlsx',
};

interface HDIData {
    country: string;
    iso3: string;
    year: number;
    hdi: number;
    rank?: number;
}

/**
 * Fetch and parse HDI CSV data from UNDP
 * Note: This is a server-side only function
 */
export async function fetchUNDPHDIData(): Promise<HDIData[]> {
    try {
        const response = await fetch(UNDP_DATA_URLS.ALL_INDICES_CSV, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch UNDP data: ${response.statusText}`);
        }

        const csvText = await response.text();
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

        const data: HDIData[] = [];

        // Parse CSV data
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));

            // Find Kenya data
            const countryIndex = headers.indexOf('country');
            const iso3Index = headers.indexOf('iso3');
            const yearIndex = headers.indexOf('year');
            const hdiIndex = headers.indexOf('hdi');

            if (values[iso3Index] === 'KEN' && values[hdiIndex] && values[hdiIndex] !== '..') {
                data.push({
                    country: values[countryIndex] || 'Kenya',
                    iso3: values[iso3Index],
                    year: parseInt(values[yearIndex]) || 2023,
                    hdi: parseFloat(values[hdiIndex]) || 0,
                });
            }
        }

        if (data.length === 0) {
            throw new Error('No data found for Kenya');
        }

        return data.sort((a, b) => b.year - a.year);
    } catch (error) {
        console.error('Error fetching UNDP HDI data:', error);
        // Return fallback data
        return [
            { country: 'Kenya', iso3: 'KEN', year: 2023, hdi: 0.601, rank: 146 },
            { country: 'Kenya', iso3: 'KEN', year: 2022, hdi: 0.601, rank: 146 },
            { country: 'Kenya', iso3: 'KEN', year: 2021, hdi: 0.595, rank: 152 },
            { country: 'Kenya', iso3: 'KEN', year: 2020, hdi: 0.588, rank: 143 },
            { country: 'Kenya', iso3: 'KEN', year: 2019, hdi: 0.591, rank: 143 },
            { country: 'Kenya', iso3: 'KEN', year: 2018, hdi: 0.585, rank: 142 },
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
