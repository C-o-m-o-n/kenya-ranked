// Real data fetchers for Kenya Ranked
// ONLY HDI data from UNDP HDRO API - all other metrics removed

import { Indicator } from '@/types';
import { getKenyaHDI } from './undpData';

/**
 * Get all key indicators - currently only HDI from UNDP
 */
export async function getAllKeyIndicators(): Promise<Indicator[]> {
    try {
        const hdi = await getKenyaHDI();
        return [hdi];
    } catch (error) {
        console.error('Error fetching indicators:', error);
        return [];
    }
}
