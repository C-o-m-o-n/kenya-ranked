import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/IHDI] Starting request...');

    const data = await buildHDROResponse(
      INDICES.IHDI,
      INDICATORS.IHDI,
      {
        eastAfrica: 0.420,
        africa: 0.410,
        world: 0.550
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/IHDI] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch IHDI data', details: error.message },
      { status: 500 }
    );
  }
}
