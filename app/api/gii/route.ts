import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/GII] Starting request...');

    const data = await buildHDROResponse(
      INDICES.GII,
      INDICATORS.GII,
      {
        eastAfrica: 0.520,
        africa: 0.540,
        world: 0.390
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/GII] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GII data', details: error.message },
      { status: 500 }
    );
  }
}
