import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Living-Standards/Electricity] Starting request...');

    const data = await buildHDROResponse(
      INDICES.MPI,
      INDICATORS.ELECTRICITY,
      {
        eastAfrica: 45.0,
        africa: 55.0,
        world: 90.0
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Living-Standards/Electricity] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch electricity access data', details: error.message },
      { status: 500 }
    );
  }
}
