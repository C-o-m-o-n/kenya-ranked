import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Poverty/MPI] Starting request...');

    const data = await buildHDROResponse(
      INDICES.MPI,
      INDICATORS.MPI,
      {
        eastAfrica: 0.350,
        africa: 0.380,
        world: 0.120
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Poverty/MPI] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MPI data', details: error.message },
      { status: 500 }
    );
  }
}
