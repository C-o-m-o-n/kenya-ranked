import { NextResponse } from 'next/server';
import { buildGenderHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Education/Expected-Years] Starting request...');

    const data = await buildGenderHDROResponse(
      INDICES.GDI,
      INDICATORS.EXPECTED_YEARS_SCHOOLING_M,
      INDICATORS.EXPECTED_YEARS_SCHOOLING_F,
      INDICATORS.EXPECTED_YEARS_SCHOOLING,
      {
        eastAfrica: 11.5,
        africa: 10.8,
        world: 12.8
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Education/Expected-Years] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expected years of schooling data', details: error.message },
      { status: 500 }
    );
  }
}
