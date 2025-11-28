// Transparency International CPI Data Fetcher
import Papa from 'papaparse';

export interface CPIData {
    country: string;
    score: number;
    rank: number;
    totalCountries: number;
    year: number;
}

export async function fetchTransparencyCPI(): Promise<CPIData | null> {
    const csvUrl = 'https://images.transparencycdn.org/images/2023_CPI_dataset.csv';

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
            console.warn(`CPI fetch error: ${response.statusText}. Using fallback data.`);
            // Return fallback data for Kenya based on 2023 CPI report
            return {
                country: 'Kenya',
                score: 31,
                rank: 126,
                totalCountries: 180,
                year: 2023,
            };
        }

        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                complete: (results) => {
                    try {
                        const data = results.data as any[];

                        // Find Kenya in the data
                        const kenyaRow = data.find(
                            (row) =>
                                row.Country?.toLowerCase().includes('kenya') ||
                                row['Country / Territory']?.toLowerCase().includes('kenya')
                        );

                        if (!kenyaRow) {
                            console.warn('Kenya not found in CPI data');
                            resolve(null);
                            return;
                        }

                        // Extract CPI score and rank
                        const score =
                            parseFloat(kenyaRow['CPI score 2023'] || kenyaRow['CPI Score'] || kenyaRow['Score']) || 0;

                        const rank =
                            parseInt(kenyaRow['Rank'] || kenyaRow['CPI Rank'] || kenyaRow['Rank 2023']) || 0;

                        const totalCountries = data.filter((row) => row['CPI score 2023'] || row['Score']).length;

                        resolve({
                            country: 'Kenya',
                            score,
                            rank,
                            totalCountries,
                            year: 2023,
                        });
                    } catch (error) {
                        console.error('Error parsing CPI data:', error);
                        reject(error);
                    }
                },
                error: (error: Error) => {
                    console.error('Error parsing CSV:', error);
                    reject(error);
                },
            });
        });
    } catch (error) {
        console.error('Error fetching CPI:', error);
        // Return fallback data for Kenya based on 2023 CPI report
        return {
            country: 'Kenya',
            score: 31,
            rank: 126,
            totalCountries: 180,
            year: 2023,
        };
    }
}

import { Indicator } from '@/types';

export async function getTransparencyIndicatorAsStandard(): Promise<Indicator | undefined> {
    try {
        console.log('🔍 [CPI] Starting to fetch CPI data...');
        const cpiData = await fetchTransparencyCPI();
        
        console.log('🔍 [CPI] Fetch result:', cpiData);

        if (!cpiData) {
            console.warn('⚠️ [CPI] fetchTransparencyCPI returned null');
            return undefined;
        }

        const indicator: Indicator = {
            id: 'cpi',
            name: 'Corruption Perceptions Index',
            slug: 'cpi',
            category: 'corruption',
            description: 'The Corruption Perceptions Index (CPI) ranks countries based on how corrupt their public sectors are perceived to be.',
            year: cpiData.year,
            score: cpiData.score,
            rank: cpiData.rank,
            totalCountries: cpiData.totalCountries,
            trend: 'down', // Hardcoded based on -1 change in screenshot
            trendData: [
                { year: 2022, value: 32 },
                { year: 2023, value: 31 }
            ],
            source: 'Transparency International',
            sourceUrl: 'https://www.transparency.org/en/cpi/2023',
            methodology: 'The CPI aggregates data from a number of different sources that provide perceptions by business people and country experts of the level of corruption in the public sector.',
            unit: 'Index (0-100)',
            higherIsBetter: true, // Higher score means less corruption
            lastUpdated: new Date().toISOString(),
            updateFrequency: 'Annually'
        };
        
        console.log('✅ [CPI] Successfully created indicator:', indicator.slug);
        return indicator;
    } catch (error) {
        console.error('🔴 [CPI] Error in getTransparencyIndicatorAsStandard:', error);
        return undefined;
    }
}
