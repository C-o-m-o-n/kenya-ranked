import { NextResponse } from 'next/server';
import { buildGenderHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Economic/GNI] Starting request...');

    const data = await buildGenderHDROResponse(
      INDICES.GDI,
      INDICATORS.GNI_PER_CAPITA_M,
      INDICATORS.GNI_PER_CAPITA_F,
      INDICATORS.GNI_PER_CAPITA,
      {
        eastAfrica: 3200,
        africa: 5500,
        world: 17800
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Economic/GNI] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GNI per capita data', details: error.message },
      { status: 500 }
    );
  }
}
