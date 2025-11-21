import { ComparisonData } from '@/types';

// Regional Comparison Data
// This data is currently static/hardcoded as we don't have a direct API for all regional comparisons yet.
// In a future update, this should be replaced with dynamic data fetching where possible.
export const regionalComparisons: Record<string, ComparisonData[]> = {
    'corruption-perceptions-index': [
        { country: 'Kenya', value: 31 },
        { country: 'Rwanda', value: 51 },
        { country: 'Tanzania', value: 38 },
        { country: 'Uganda', value: 26 },
        { country: 'East Africa Avg', value: 32 },
        { country: 'Africa Avg', value: 33 },
        { country: 'World Avg', value: 43 },
    ],
    'human-development-index': [
        { country: 'Kenya', value: 0.601 },
        { country: 'Rwanda', value: 0.534 },
        { country: 'Tanzania', value: 0.549 },
        { country: 'Uganda', value: 0.550 },
        { country: 'East Africa Avg', value: 0.558 },
        { country: 'Africa Avg', value: 0.547 },
        { country: 'World Avg', value: 0.739 },
    ],
    'gdp-per-capita': [
        { country: 'Kenya', value: 2099 },
        { country: 'Rwanda', value: 966 },
        { country: 'Tanzania', value: 1192 },
        { country: 'Uganda', value: 1015 },
        { country: 'East Africa Avg', value: 1318 },
        { country: 'Africa Avg', value: 1952 },
        { country: 'World Avg', value: 12236 },
    ],
    'poverty-headcount-ratio': [
        { country: 'Kenya', value: 36.1 },
        { country: 'Rwanda', value: 52.0 },
        { country: 'Tanzania', value: 49.1 },
        { country: 'Uganda', value: 41.7 },
        { country: 'East Africa Avg', value: 44.7 },
        { country: 'Sub-Saharan Africa', value: 41.1 },
    ],
    'unemployment-rate': [
        { country: 'Kenya', value: 5.7 },
        { country: 'Rwanda', value: 11.8 },
        { country: 'Tanzania', value: 2.6 },
        { country: 'Uganda', value: 2.9 },
        { country: 'South Africa', value: 32.9 },
        { country: 'Africa Avg', value: 7.1 },
    ],
};
