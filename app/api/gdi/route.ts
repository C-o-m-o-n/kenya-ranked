import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/GDI] Starting request...');

    const data = await buildHDROResponse(
      INDICES.GDI,
      INDICATORS.GDI,
      {
        eastAfrica: 0.920,
        africa: 0.910,
        world: 0.950
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/GDI] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GDI data', details: error.message },
      { status: 500 }
    );
  }
}
