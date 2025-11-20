// Core data types for Kenya Ranked

export type TrendDirection = 'up' | 'down' | 'neutral';

export type Category =
    | 'governance'
    | 'economy'
    | 'society'
    | 'sdg'
    | 'health'
    | 'education'
    | 'development'
    | 'corruption'
    | 'poverty';

export interface Indicator {
    id: string;
    name: string;
    slug: string;
    category: Category;
    description: string;
    year: number;
    score: number;
    rank: number;
    totalCountries: number;
    trend: TrendDirection;
    trendData: TrendPoint[];
    source: string;
    sourceUrl: string;
    methodology: string;
    unit?: string;
    higherIsBetter: boolean;
}

export interface TrendPoint {
    year: number;
    value: number;
}

export interface ComparisonData {
    country: string;
    value: number;
    color?: string;
}

export interface RegionalComparison {
    kenya: number;
    eastAfrica: number;
    africa: number;
    world: number;
}

export interface SDGGoal {
    number: number;
    title: string;
    slug: string;
    description: string;
    color: string;
    icon: string;
    progress: number; // 0-100
    status: 'on-track' | 'moderate' | 'off-track' | 'insufficient-data';
    indicators: SDGIndicator[];
}

export interface SDGIndicator {
    id: string;
    name: string;
    value: number;
    target: number;
    unit: string;
    year: number;
    progress: number; // 0-100
}

export interface MetricCardData {
    title: string;
    value: string | number;
    rank: string;
    trend: TrendDirection;
    change?: string;
    category: Category;
}

export interface FilterOption {
    label: string;
    value: string;
}
