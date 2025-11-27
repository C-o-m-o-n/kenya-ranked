import { NextResponse } from 'next/server';
import { buildGenderHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Education/Mean-Years] Starting request...');

    const data = await buildGenderHDROResponse(
      INDICES.GDI,
      INDICATORS.MEAN_YEARS_SCHOOLING_M,
      INDICATORS.MEAN_YEARS_SCHOOLING_F,
      INDICATORS.MEAN_YEARS_SCHOOLING,
      {
        eastAfrica: 6.5,
        africa: 6.2,
        world: 8.7
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Education/Mean-Years] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mean years of schooling data', details: error.message },
      { status: 500 }
    );
  }
}
