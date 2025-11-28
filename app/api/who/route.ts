import { NextResponse } from 'next/server';
import { fetchWhoIndicatorData, fetchWhoIndicators } from '@/lib/dataFetchers/who/client';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const indicator = searchParams.get('indicator');
    const filter = searchParams.get('filter');

    try {
        console.log(`🔵 [API/WHO] Requesting ${indicator || 'all indicators'}`);

        if (indicator) {
            const data = await fetchWhoIndicatorData(indicator, filter || undefined);
            return NextResponse.json({ data });
        } else {
            const indicators = await fetchWhoIndicators();
            return NextResponse.json({ indicators });
        }

    } catch (error: any) {
        console.error('🔴 [API/WHO] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch WHO data', details: error.message },
            { status: 500 }
        );
    }
}
