import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/PHDI] Starting request...');

    const data = await buildHDROResponse(
      INDICES.PHDI,
      INDICATORS.PHDI,
      {
        eastAfrica: 0.530,
        africa: 0.520,
        world: 0.640
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/PHDI] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PHDI data', details: error.message },
      { status: 500 }
    );
  }
}
