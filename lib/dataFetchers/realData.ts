// Real data fetchers for Kenya Ranked
// Uses World Bank API, Transparency International data, and other official sources

const WORLD_BANK_API = 'https://api.worldbank.org/v2';
const KENYA_CODE = 'KEN';

// World Bank Indicator Codes
const WB_INDICATORS = {
    GDP_PER_CAPITA: 'NY.GDP.PCAP.CD', // GDP per capita (current US$)
    GDP_GROWTH: 'NY.GDP.MKTP.KD.ZG', // GDP growth (annual %)
    POVERTY_HEADCOUNT: 'SI.POV.NAHC', // Poverty headcount ratio at national poverty lines
    LIFE_EXPECTANCY: 'SP.DYN.LE00.IN', // Life expectancy at birth
    SCHOOL_ENROLLMENT: 'SE.PRM.CMPT.ZS', // Primary completion rate
    CONTROL_CORRUPTION: 'CC.EST', // Control of Corruption (WGI)
    GOVT_EFFECTIVENESS: 'GE.EST', // Government Effectiveness (WGI)
    RULE_OF_LAW: 'RL.EST', // Rule of Law (WGI)
    REGULATORY_QUALITY: 'RQ.EST', // Regulatory Quality (WGI)
};

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

/**
 * Fetch data from World Bank API
 */
async function fetchWorldBankData(
    indicatorCode: string,
    startYear: number = 2018,
    endYear: number = 2024
): Promise<WorldBankDataPoint[]> {
    const url = `${WORLD_BANK_API}/country/${KENYA_CODE}/indicator/${indicatorCode}?format=json&date=${startYear}:${endYear}&per_page=100`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`World Bank API error: ${response.statusText}`);
        }

        const data = await response.json();
        // World Bank API returns [metadata, data]
        return data[1] || [];
    } catch (error) {
        console.error(`Error fetching World Bank data for ${indicatorCode}:`, error);
        return [];
    }
}

/**
 * Get Kenya's GDP per capita data
 */
export async function getGDPPerCapita() {
    const data = await fetchWorldBankData(WB_INDICATORS.GDP_PER_CAPITA);
    const latest = data.find(d => d.value !== null);

    return {
        id: 'gdp-per-capita',
        name: 'GDP Per Capita',
        slug: 'gdp-per-capita',
        category: 'economy' as const,
        description: 'Gross domestic product divided by midyear population.',
        year: latest ? parseInt(latest.date) : 2023,
        score: latest?.value || 2099,
        rank: 158, // From external sources
        totalCountries: 195,
        trend: 'up' as const,
        trendData: data
            .filter(d => d.value !== null)
            .reverse()
            .map(d => ({ year: parseInt(d.date), value: d.value! })),
        source: 'World Bank - World Development Indicators',
        sourceUrl: 'https://data.worldbank.org/',
        methodology: 'GDP per capita is gross domestic product divided by midyear population. Data are in current U.S. dollars.',
        unit: 'USD',
        higherIsBetter: true,
        lastUpdated: new Date().toISOString().split('T')[0],
        updateFrequency: 'Quarterly',
    };
}

/**
 * Get Kenya's Control of Corruption (WGI) data
 */
export async function getControlOfCorruption() {
    const data = await fetchWorldBankData(WB_INDICATORS.CONTROL_CORRUPTION);
    const latest = data.find(d => d.value !== null);

    return {
        id: 'wgi-control-corruption',
        name: 'Control of Corruption (WGI)',
        slug: 'control-of-corruption',
        category: 'governance' as const,
        description: 'Reflects perceptions of the extent to which public power is exercised for private gain.',
        year: latest ? parseInt(latest.date) : 2022,
        score: latest?.value || -0.63,
        rank: 127,
        totalCountries: 214,
        trend: 'down' as const,
        trendData: data
            .filter(d => d.value !== null)
            .reverse()
            .map(d => ({ year: parseInt(d.date), value: d.value! })),
        source: 'World Bank - Worldwide Governance Indicators',
        sourceUrl: 'https://www.worldbank.org/en/publication/worldwide-governance-indicators',
        methodology: 'Aggregate indicator combining responses on the quality of governance from surveys of enterprises, citizens and experts.',
        unit: 'Estimate (-2.5 to 2.5)',
        higherIsBetter: true,
        lastUpdated: new Date().toISOString().split('T')[0],
        updateFrequency: 'Annually',
    };
}

/**
 * Get Corruption Perceptions Index data
 * Note: TI doesn't have a public API, so we use the latest known values
 */
export async function getCorruptionPerceptionsIndex() {
    // Data from Transparency International CPI 2023
    return {
        id: 'cpi-2023',
        name: 'Corruption Perceptions Index',
        slug: 'corruption-perceptions-index',
        category: 'corruption' as const,
        description: 'Measures perceived levels of public sector corruption according to experts and business people.',
        year: 2023,
        score: 31,
        rank: 126,
        totalCountries: 180,
        trend: 'down' as const,
        trendData: [
            { year: 2018, value: 27 },
            { year: 2019, value: 28 },
            { year: 2020, value: 31 },
            { year: 2021, value: 30 },
            { year: 2022, value: 32 },
            { year: 2023, value: 31 },
        ],
        source: 'Transparency International',
        sourceUrl: 'https://www.transparency.org/en/cpi/2023',
        methodology: 'The CPI scores and ranks countries/territories based on how corrupt a country\'s public sector is perceived to be by experts and business executives. It is a composite index, a combination of 13 surveys and assessments of corruption.',
        unit: 'Score (0-100)',
        higherIsBetter: true,
        lastUpdated: '2024-01-31',
        updateFrequency: 'Annually',
    };
}

/**
 * Get Human Development Index data
 * Note: UNDP API is discontinued, using latest known values
 */
export async function getHumanDevelopmentIndex() {
    return {
        id: 'hdi-2022',
        name: 'Human Development Index',
        slug: 'human-development-index',
        category: 'development' as const,
        description: 'Composite index measuring average achievement in three basic dimensions of human development.',
        year: 2022,
        score: 0.601,
        rank: 146,
        totalCountries: 193,
        trend: 'up' as const,
        trendData: [
            { year: 2017, value: 0.579 },
            { year: 2018, value: 0.585 },
            { year: 2019, value: 0.591 },
            { year: 2020, value: 0.588 },
            { year: 2021, value: 0.595 },
            { year: 2022, value: 0.601 },
        ],
        source: 'UNDP - Human Development Report',
        sourceUrl: 'https://hdr.undp.org/',
        methodology: 'The HDI is a summary measure of average achievement in key dimensions of human development: a long and healthy life, being knowledgeable and have a decent standard of living.',
        unit: 'Index (0-1)',
        higherIsBetter: true,
        lastUpdated: '2024-03-13',
        updateFrequency: 'Annually',
    };
}

/**
 * Get poverty data
 */
export async function getPovertyHeadcount() {
    const data = await fetchWorldBankData(WB_INDICATORS.POVERTY_HEADCOUNT);
    const latest = data.find(d => d.value !== null);

    return {
        id: 'poverty-rate',
        name: 'Poverty Headcount Ratio',
        slug: 'poverty-headcount-ratio',
        category: 'poverty' as const,
        description: 'Percentage of population living below the national poverty line.',
        year: latest ? parseInt(latest.date) : 2023,
        score: latest?.value || 36.1,
        rank: 142,
        totalCountries: 170,
        trend: 'up' as const, // Improving (lower is better)
        trendData: data
            .filter(d => d.value !== null)
            .reverse()
            .map(d => ({ year: parseInt(d.date), value: d.value! })),
        source: 'World Bank - Poverty and Inequality Platform',
        sourceUrl: 'https://pip.worldbank.org/',
        methodology: 'Poverty headcount ratio at national poverty lines (% of population).',
        unit: 'Percentage',
        higherIsBetter: false,
        lastUpdated: new Date().toISOString().split('T')[0],
        updateFrequency: 'Annually',
    };
}

/**
 * Get SDG Index data
 * Note: Using latest known values from Sustainable Development Report
 */
export async function getSDGIndex() {
    return {
        id: 'sdg-index-2023',
        name: 'SDG Index Score',
        slug: 'sdg-index-score',
        category: 'sdg' as const,
        description: 'Overall performance on the 17 Sustainable Development Goals.',
        year: 2023,
        score: 59.8,
        rank: 124,
        totalCountries: 166,
        trend: 'up' as const,
        trendData: [
            { year: 2018, value: 56.2 },
            { year: 2019, value: 57.1 },
            { year: 2020, value: 57.8 },
            { year: 2021, value: 58.5 },
            { year: 2022, value: 59.2 },
            { year: 2023, value: 59.8 },
        ],
        source: 'Sustainable Development Report',
        sourceUrl: 'https://dashboards.sdgindex.org/',
        methodology: 'The SDG Index score can be interpreted as a percentage of SDG achievement. A score of 100 indicates that all SDGs have been achieved.',
        unit: 'Score (0-100)',
        higherIsBetter: true,
        lastUpdated: '2023-06-20',
        updateFrequency: 'Annually',
    };
}

/**
 * Get all key indicators
 */
export async function getAllKeyIndicators() {
    const [gdp, corruption, controlCorruption, hdi, poverty, sdg] = await Promise.all([
        getGDPPerCapita(),
        getCorruptionPerceptionsIndex(),
        getControlOfCorruption(),
        getHumanDevelopmentIndex(),
        getPovertyHeadcount(),
        getSDGIndex(),
    ]);

    return [corruption, controlCorruption, hdi, gdp, poverty, sdg];
}
