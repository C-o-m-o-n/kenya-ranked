import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Environment/Material-Footprint] Starting request...');

    const data = await buildHDROResponse(
      INDICES.PHDI,
      INDICATORS.MATERIAL_FOOTPRINT,
      {
        eastAfrica: 8.0,
        africa: 10.0,
        world: 12.0
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Environment/Material-Footprint] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch material footprint data', details: error.message },
      { status: 500 }
    );
  }
}
