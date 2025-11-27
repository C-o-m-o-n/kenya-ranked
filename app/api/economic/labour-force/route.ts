import { NextResponse } from 'next/server';
import { buildGenderHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Economic/Labour-Force] Starting request...');

    const data = await buildGenderHDROResponse(
      INDICES.GII,
      INDICATORS.LABOUR_FORCE_M,
      INDICATORS.LABOUR_FORCE_F,
      undefined,
      {
        eastAfrica: 70.0,
        africa: 65.0,
        world: 60.0
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Economic/Labour-Force] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch labour force participation data', details: error.message },
      { status: 500 }
    );
  }
}
