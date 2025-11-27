import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Environment/CO2] Starting request...');

    const data = await buildHDROResponse(
      INDICES.PHDI,
      INDICATORS.CO2_EMISSIONS,
      {
        eastAfrica: 0.5,
        africa: 1.0,
        world: 4.5
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Environment/CO2] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CO2 emissions data', details: error.message },
      { status: 500 }
    );
  }
}
