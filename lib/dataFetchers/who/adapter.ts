import { Indicator } from '@/types';
import { fetchWhoIndicatorData, fetchWhoIndicators } from './client';

// Mapping of WHO indicator codes to user-friendly slugs/names if needed
// For now we'll use the code as the slug or a sanitized version of the name

/**
 * Transform WHO data point to our Indicator format
 */
export async function getWhoIndicatorAsStandard(indicatorCode: string): Promise<Indicator | null> {
    try {
        // 1. Get metadata to find the name
        const allIndicators = await fetchWhoIndicators();
        const metadata = allIndicators.find(i => i.IndicatorCode === indicatorCode);
        
        if (!metadata) {
            console.error(`WHO Indicator metadata not found for ${indicatorCode}`);
            return null;
        }

        // 2. Get data for Kenya
        const data = await fetchWhoIndicatorData(indicatorCode);
        
        if (!data || data.length === 0) {
            return null;
        }

        // 3. Sort by date descending to get latest
        const sortedData = data.sort((a, b) => 
            new Date(b.TimeDimensionBegin).getTime() - new Date(a.TimeDimensionBegin).getTime()
        );

        const latest = sortedData[0];

        // 4. Construct Indicator object
        // 4. Construct Indicator object
        return {
            id: `who-${indicatorCode}`,
            slug: `who/${indicatorCode}`, // Namespaced slug
            name: metadata.IndicatorName, // Changed from title to name
            score: latest.NumericValue ?? parseFloat(latest.Value) ?? 0, // Changed from value to score
            year: latest.TimeDim,
            description: latest.Comments || metadata.IndicatorName, // Ensure string
            source: 'World Health Organization',
            sourceUrl: `https://www.who.int/data/gho/data/indicators/indicator-details/GHO/${indicatorCode}`,
            category: 'health', // Lowercase to match Category type
            rank: 0, // Placeholder as we don't calculate rank yet
            totalCountries: 0, // Placeholder
            trend: sortedData.length > 1 ? calculateTrend(sortedData) : 'neutral',
            trendData: sortedData.map(d => ({ // Changed from history to trendData
                year: d.TimeDim,
                value: d.NumericValue ?? parseFloat(d.Value) ?? 0
            })),
            methodology: 'Data fetched from WHO Global Health Observatory',
            higherIsBetter: true, // Default assumption, might need metadata to be accurate
            lastUpdated: new Date().toISOString()
        };

    } catch (error) {
        console.error(`Error adapting WHO indicator ${indicatorCode}:`, error);
        return null;
    }
}

function calculateTrend(data: any[]): 'up' | 'down' | 'neutral' {
    if (data.length < 2) return 'neutral';
    
    // data is already sorted desc by date
    const current = data[0].NumericValue ?? parseFloat(data[0].Value);
    const previous = data[1].NumericValue ?? parseFloat(data[1].Value);
    
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'neutral';
}
