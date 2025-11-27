import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Living-Standards/Water] Starting request...');

    const data = await buildHDROResponse(
      INDICES.MPI,
      INDICATORS.DRINKING_WATER,
      {
        eastAfrica: 65.0,
        africa: 70.0,
        world: 90.0
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Living-Standards/Water] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch drinking water access data', details: error.message },
      { status: 500 }
    );
  }
}
