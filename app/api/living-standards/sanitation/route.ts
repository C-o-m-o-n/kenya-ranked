import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Living-Standards/Sanitation] Starting request...');

    const data = await buildHDROResponse(
      INDICES.MPI,
      INDICATORS.SANITATION,
      {
        eastAfrica: 40.0,
        africa: 50.0,
        world: 75.0
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Living-Standards/Sanitation] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sanitation access data', details: error.message },
      { status: 500 }
    );
  }
}
