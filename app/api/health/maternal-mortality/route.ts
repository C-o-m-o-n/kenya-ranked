import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Health/Maternal-Mortality] Starting request...');

    const data = await buildHDROResponse(
      INDICES.GII,
      INDICATORS.MATERNAL_MORTALITY,
      {
        eastAfrica: 450,
        africa: 547,
        world: 223
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Health/Maternal-Mortality] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch maternal mortality data', details: error.message },
      { status: 500 }
    );
  }
}
