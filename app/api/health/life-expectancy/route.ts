import { NextResponse } from 'next/server';
import { buildGenderHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Health/Life-Expectancy] Starting request...');

    const data = await buildGenderHDROResponse(
      INDICES.GDI,
      INDICATORS.LIFE_EXPECTANCY_M,
      INDICATORS.LIFE_EXPECTANCY_F,
      INDICATORS.LIFE_EXPECTANCY,
      {
        eastAfrica: 65.0,
        africa: 62.0,
        world: 71.4
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Health/Life-Expectancy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch life expectancy data', details: error.message },
      { status: 500 }
    );
  }
}
