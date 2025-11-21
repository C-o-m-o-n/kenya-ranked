// World Bank API Data Fetcher

interface WorldBankResponse {
    page: number;
    pages: number;
    per_page: number;
    total: number;
}

interface WorldBankDataPoint {
    indicator: { id: string; value: string };
    country: { id: string; value: string };
    countryiso3code: string;
    date: string;
    value: number | null;
    unit: string;
    obs_status: string;
    decimal: number;
}

export interface WorldBankIndicator {
    code: string;
    name: string;
    category: string;
    description: string;
    unit: string;
    higherIsBetter: boolean;
}

// Key World Bank Indicators
export const WORLD_BANK_INDICATORS: WorldBankIndicator[] = [
    {
        code: 'NY.GDP.PCAP.CD',
        name: 'GDP Per Capita',
        category: 'economy',
        description: 'Gross domestic product divided by midyear population.',
        unit: 'USD',
        higherIsBetter: true,
    },
    {
        code: 'SI.POV.DDAY',
        name: 'Poverty Headcount Ratio',
        category: 'poverty',
        description: 'Percentage of population living below $2.15 per day.',
        unit: 'Percentage',
        higherIsBetter: false,
    },
    {
        code: 'SP.DYN.LE00.IN',
        name: 'Life Expectancy at Birth',
        category: 'health',
        description: 'Number of years a newborn infant would live if prevailing patterns of mortality remain the same.',
        unit: 'Years',
        higherIsBetter: true,
    },
    {
        code: 'CC.CC.PER',
        name: 'Control of Corruption (WGI)',
        category: 'governance',
        description: 'Reflects perceptions of the extent to which public power is exercised for private gain.',
        unit: 'Estimate (-2.5 to 2.5)',
        higherIsBetter: true,
    },
    {
        code: 'CC.GE.PER',
        name: 'Government Effectiveness (WGI)',
        category: 'governance',
        description: 'Reflects perceptions of the quality of public services and policy formulation.',
        unit: 'Estimate (-2.5 to 2.5)',
        higherIsBetter: true,
    },
    {
        code: 'CC.RL.PER',
        name: 'Rule of Law (WGI)',
        category: 'governance',
        description: 'Reflects perceptions of the extent to which agents have confidence in and abide by the rules of society.',
        unit: 'Estimate (-2.5 to 2.5)',
        higherIsBetter: true,
    },
    {
        code: 'CC.RQ.PER',
        name: 'Regulatory Quality (WGI)',
        category: 'governance',
        description: 'Reflects perceptions of the ability of the government to formulate and implement sound policies.',
        unit: 'Estimate (-2.5 to 2.5)',
        higherIsBetter: true,
    },
    {
        code: 'CC.VA.PER',
        name: 'Voice and Accountability (WGI)',
        category: 'governance',
        description: 'Reflects perceptions of the extent to which citizens can participate in selecting their government.',
        unit: 'Estimate (-2.5 to 2.5)',
        higherIsBetter: true,
    },
    {
        code: 'CC.PS.PER',
        name: 'Political Stability (WGI)',
        category: 'governance',
        description: 'Reflects perceptions of the likelihood of political instability and/or politically-motivated violence.',
        unit: 'Estimate (-2.5 to 2.5)',
        higherIsBetter: true,
    },
];

export async function fetchWorldBankIndicator(
    indicatorCode: string,
    countryCode: string = 'KEN'
): Promise<WorldBankDataPoint[]> {
    const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorCode}?format=json&per_page=100`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`World Bank API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || data.length < 2) {
            console.warn(`No data found for indicator ${indicatorCode}`);
            return [];
        }

        const dataPoints: WorldBankDataPoint[] = data[1];
        return dataPoints.filter((point) => point.value !== null);
    } catch (error) {
        console.error(`Error fetching World Bank indicator ${indicatorCode}:`, error);
        return [];
    }
}

export async function fetchRegionalComparison(
    indicatorCode: string,
    countries: string[] = ['KEN', 'UGA', 'TZA', 'RWA']
): Promise<{ country: string; value: number }[]> {
    const results = await Promise.all(
        countries.map(async (country) => {
            const data = await fetchWorldBankIndicator(indicatorCode, country);
            const latestData = data.find((d) => d.value !== null);
            return {
                country: latestData?.country.value || country,
                value: latestData?.value || 0,
            };
        })
    );

    // Add regional averages
    const eastAfricaAvg = results.reduce((sum, r) => sum + r.value, 0) / results.length;
    results.push({ country: 'East Africa Avg', value: eastAfricaAvg });

    return results;
}
