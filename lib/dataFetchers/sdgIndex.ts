// SDG Index Data Fetcher

export interface SDGGoalData {
    goalNumber: number;
    score: number;
    trend: string;
}

export interface SDGIndexData {
    country: string;
    overallScore: number;
    rank: number;
    totalCountries: number;
    goals: SDGGoalData[];
    year: number;
}

export async function fetchSDGIndex(): Promise<SDGIndexData | null> {
    const jsonUrl = 'https://dashboards.sdgindex.org/static/data/2024/data.json';

    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`SDG Index fetch error: ${response.statusText}`);
        }

        const data = await response.json();

        // Find Kenya in the data
        const kenya = data.countries?.find(
            (c: any) => c.iso3 === 'KEN' || c.country?.toLowerCase().includes('kenya')
        );

        if (!kenya) {
            console.warn('Kenya not found in SDG Index data');
            return null;
        }

        // Extract overall score and rank
        const overallScore = parseFloat(kenya.score || kenya.overall_score || 0);
        const rank = parseInt(kenya.rank || kenya.overall_rank || 0);
        const totalCountries = data.countries?.length || 0;

        // Extract individual goal scores
        const goals: SDGGoalData[] = [];
        for (let i = 1; i <= 17; i++) {
            const goalKey = `goal_${i}`;
            const trendKey = `goal_${i}_trend`;

            if (kenya[goalKey] !== undefined) {
                goals.push({
                    goalNumber: i,
                    score: parseFloat(kenya[goalKey]) || 0,
                    trend: kenya[trendKey] || 'stagnating',
                });
            }
        }

        return {
            country: 'Kenya',
            overallScore,
            rank,
            totalCountries,
            goals,
            year: 2024,
        };
    } catch (error) {
        console.error('Error fetching SDG Index:', error);
        return null;
    }
}
