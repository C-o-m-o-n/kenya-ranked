// Data service layer - combines real API data with cached/fallback data
import type { Indicator } from '@/types';

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
    console.log('📍 [DATA SERVICE] getKeyIndicators called');
    try {
        // Import dynamically to avoid circular dependencies
        const { getKeyHDROIndicatorsAsStandard } = await import('./hdro/adapter');
        const result = await getKeyHDROIndicatorsAsStandard();
        console.log('✅ [DATA SERVICE] getKeyIndicators result:', result.length);
        return result;
    } catch (error) {
        console.error('🔴 [DATA SERVICE] getKeyIndicators error:', error);
        return [];
    }
}

/**
 * Get specific indicator by slug
 */
export async function getIndicatorBySlug(slug: string): Promise<Indicator | undefined> {
    const indicators = await getAllIndicators();
    return indicators.find(ind => ind.slug === slug || ind.slug === `hdro/${slug}`);
}

/**
 * Get all indicators (combines HDRO and other sources)
 */
export async function getAllIndicators(): Promise<Indicator[]> {
    try {
        // Import dynamically to avoid circular dependencies if any
        const { getAllHDROIndicatorsAsStandard } = await import('./hdro/adapter');
        const hdroIndicators = await getAllHDROIndicatorsAsStandard();
        
        // We can add other sources here in the future
        return hdroIndicators;
    } catch (error) {
        console.error('Error fetching all indicators:', error);
        return [];
    }
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
    try {
        const { fetchHDI } = await import('./hdro/client');
        const hdiData = await fetchHDI();
        return hdiData.comparison;
    } catch (error) {
        console.error('Error fetching regional HDI comparison:', error);
        return [];
    }
}
