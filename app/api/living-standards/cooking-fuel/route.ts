import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Living-Standards/Cooking-Fuel] Starting request...');

    const data = await buildHDROResponse(
      INDICES.MPI,
      INDICATORS.COOKING_FUEL,
      {
        eastAfrica: 25.0,
        africa: 30.0,
        world: 65.0
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Living-Standards/Cooking-Fuel] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clean cooking fuel data', details: error.message },
      { status: 500 }
    );
  }
}
