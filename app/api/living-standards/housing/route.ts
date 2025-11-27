import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Living-Standards/Housing] Starting request...');

    const data = await buildHDROResponse(
      INDICES.MPI,
      INDICATORS.HOUSING,
      {
        eastAfrica: 60.0,
        africa: 65.0,
        world: 85.0
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Living-Standards/Housing] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch housing quality data', details: error.message },
      { status: 500 }
    );
  }
}
