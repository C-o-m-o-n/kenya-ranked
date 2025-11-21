// Press Freedom Index Data Fetcher

export interface PressFreedomData {
    country: string;
    score: number;
    rank: number;
    totalCountries: number;
    year: number;
}

export async function fetchPressFreedom(): Promise<PressFreedomData | null> {
    const jsonUrl = 'https://api.rsf.org/press-freedom-index/2024/countries';

    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`Press Freedom fetch error: ${response.statusText}`);
        }

        const data = await response.json();

        // Find Kenya in the data
        const kenya = data.find(
            (c: any) => c.iso_code === 'KEN' || c.country?.toLowerCase().includes('kenya')
        );

        if (!kenya) {
            console.warn('Kenya not found in Press Freedom Index data');
            return null;
        }

        const score = parseFloat(kenya.score || 0);
        const rank = parseInt(kenya.rank || 0);
        const totalCountries = data.length;

        return {
            country: 'Kenya',
            score,
            rank,
            totalCountries,
            year: 2024,
        };
    } catch (error) {
        console.error('Error fetching Press Freedom Index:', error);
        return null;
    }
}
