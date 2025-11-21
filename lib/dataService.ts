// Data service layer - combines real API data with cached/fallback data
import type { Indicator } from '@/types';
import * as realData from './dataFetchers/realData';

// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

interface CachedData<T> {
    data: T;
    timestamp: number;
}

// In-memory cache
const cache = new Map<string, CachedData<any>>();

/**
 * Get data with caching
 */
async function getCachedData<T>(
    key: string,
    fetcher: () => Promise<T>,
    cacheDuration: number = CACHE_DURATION
): Promise<T> {
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < cacheDuration) {
        return cached.data;
    }

    try {
        const data = await fetcher();
        cache.set(key, { data, timestamp: Date.now() });
        return data;
    } catch (error) {
        console.error(`Error fetching ${key}:`, error);
        // Return cached data even if expired, or throw
        if (cached) {
            return cached.data;
        }
        throw error;
    }
}

/**
 * Get all key indicators with caching
 */
export async function getKeyIndicators(): Promise<Indicator[]> {
    return getCachedData('keyIndicators', realData.getAllKeyIndicators);
}

/**
 * Get specific indicator by slug
 */
export async function getIndicatorBySlug(slug: string): Promise<Indicator | undefined> {
    const indicators = await getKeyIndicators();
    return indicators.find(ind => ind.slug === slug);
}

/**
 * Get all indicators (for now, same as key indicators)
 */
export async function getAllIndicators(): Promise<Indicator[]> {
    return getKeyIndicators();
}

/**
 * Clear cache (useful for testing or manual refresh)
 */
export function clearCache() {
    cache.clear();
}

/**
 * Get cache status
 */
export function getCacheStatus() {
    const status: Record<string, { age: number; expired: boolean }> = {};

    cache.forEach((value, key) => {
        const age = Date.now() - value.timestamp;
        status[key] = {
            age,
            expired: age > CACHE_DURATION,
        };
    });

    return status;
}

/**
 * Get all SDG goals
 */
import { sdgGoals } from '@/data/sdgData';
import type { SDGGoal } from '@/types';

export async function getAllSDGGoals(): Promise<SDGGoal[]> {
    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 100));
    return sdgGoals;
}

/**
 * Get SDG goal by slug
 */
export async function getSDGGoalBySlug(slug: string): Promise<SDGGoal | undefined> {
    const goals = await getAllSDGGoals();
    return goals.find(goal => goal.slug === slug);
}

/**
 * Get regional HDI comparison data from HDRO API
 */
export async function getRegionalHDIComparison() {
    const { fetchRegionalHDIComparison } = await import('./dataFetchers/undpData');
    console.log('Fetching regional HDI comparison data...', fetchRegionalHDIComparison);
    return getCachedData('regionalHDIComparison', fetchRegionalHDIComparison, 86400000); // Cache for 24 hours
}
