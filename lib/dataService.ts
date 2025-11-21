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
