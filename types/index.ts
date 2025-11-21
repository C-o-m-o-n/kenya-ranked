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
    lastUpdated: string; // ISO date string
    updateFrequency?: string;
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
    lastUpdated: string; // ISO date string
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

// New types for enhanced features

export interface InfoContent {
    title: string;
    brief: string; // For tooltips (1-2 sentences)
    detailed: string; // For modals (full explanation)
    whyItMatters: string;
    methodology?: string;
    source?: string;
    sourceUrl?: string;
}

export type ExportFormat = 'csv' | 'excel' | 'json';

export interface EmbedConfig {
    widgetType: 'metric' | 'sdg' | 'comparison' | 'chart';
    widgetId: string;
    width?: number;
    height?: number;
    theme?: 'light' | 'dark';
}

export type LanguageCode = 'en' | 'sw'; // English and Swahili

export interface Translation {
    [key: string]: {
        en: string;
        sw: string;
    };
}

export interface DataUpdate {
    indicatorId: string;
    lastUpdated: Date;
    nextUpdate?: Date;
    updateFrequency?: string; // e.g., "Annually", "Quarterly"
}

export interface Subscription {
    email: string;
    indicators: string[]; // Array of indicator IDs to subscribe to
    frequency: 'immediate' | 'daily' | 'weekly';
}

export interface NarrativeInsight {
    type: 'strength' | 'challenge';
    title: string;
    description: string;
    indicatorId: string;
    value: number | string;
    rank: string;
    context: string;
}

