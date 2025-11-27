import { NextResponse } from 'next/server';

const HDRO_API_BASE = 'https://hdrdata.org/api/CompositeIndices';
// Use the key from env or the one that worked in the test script
const HDRO_API_KEY = process.env.HDRO_API_KEY || 'HDR-V279I4a6nHC2N58lJjXRpxBaN0IVj9J9';

export async function GET() {
    try {
        console.log('🔵 [API/HDI] Starting request...');

        // 1. Fetch Kenya Data
        const kenyaUrl = `${HDRO_API_BASE}/query?apikey=${HDRO_API_KEY}&countryOrAggregation=KEN`;
        console.log('🔵 [API/HDI] Fetching Kenya data...');

        const kenyaResponse = await fetch(kenyaUrl, { next: { revalidate: 3600 } });

        if (!kenyaResponse.ok) {
            throw new Error(`HDRO API Error (Kenya): ${kenyaResponse.statusText}`);
        }

        const kenyaRawData = await kenyaResponse.json();

        // Filter for HDI
        const kenyaHdiData = kenyaRawData
            .filter((item: any) =>
                item.index === 'HDI - Human Development Index' &&
                item.indicator === 'hdi - Human Development Index (value)' &&
                item.value &&
                item.value !== '..'
            )
            .map((item: any) => ({
                year: parseInt(item.year),
                value: parseFloat(item.value)
            }))
            .sort((a: any, b: any) => b.year - a.year);

        if (kenyaHdiData.length === 0) {
            throw new Error('No HDI data found for Kenya');
        }

        const latestHdi = kenyaHdiData[0];

        // 2. Fetch Regional Data (Simplified for speed - sequential or parallel)
        // We'll just fetch a few neighbors for the comparison chart
        const neighbors = [
            { code: 'RWA', name: 'Rwanda' },
            { code: 'TZA', name: 'Tanzania' },
            { code: 'UGA', name: 'Uganda' }
        ];

        const comparisonData = [
            { country: 'Kenya', value: latestHdi.value }
        ];

        for (const neighbor of neighbors) {
            try {
                const url = `${HDRO_API_BASE}/query?apikey=${HDRO_API_KEY}&countryOrAggregation=${neighbor.code}`;
                const res = await fetch(url, { next: { revalidate: 3600 } });
                if (res.ok) {
                    const data = await res.json();
                    const hdi = data
                        .filter((item: any) =>
                            item.index === 'HDI - Human Development Index' &&
                            item.indicator === 'hdi - Human Development Index (value)'
                        )
                        .sort((a: any, b: any) => parseInt(b.year) - parseInt(a.year))[0];

                    if (hdi) {
                        comparisonData.push({
                            country: neighbor.name,
                            value: parseFloat(hdi.value)
                        });
                    }
                }
            } catch (e) {
                console.error(`Failed to fetch ${neighbor.name}`, e);
            }
        }

        // Add static averages since API doesn't provide them easily in this query format
        comparisonData.push(
            { country: 'East Africa Avg', value: 0.558 },
            { country: 'Africa Avg', value: 0.547 },
            { country: 'World Avg', value: 0.739 }
        );

        // Construct the final response object
        const responseData = {
            kenya: {
                current: latestHdi,
                history: kenyaHdiData
            },
            comparison: comparisonData
        };

        return NextResponse.json(responseData);

    } catch (error: any) {
        console.error('🔴 [API/HDI] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch HDI data', details: error.message },
            { status: 500 }
        );
    }
}
