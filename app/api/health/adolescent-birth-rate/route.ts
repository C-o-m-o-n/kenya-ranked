import { NextResponse } from 'next/server';
import { buildHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Health/Adolescent-Birth-Rate] Starting request...');

    const data = await buildHDROResponse(
      INDICES.GII,
      INDICATORS.ADOLESCENT_BIRTH_RATE,
      {
        eastAfrica: 95.0,
        africa: 101.0,
        world: 42.5
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Health/Adolescent-Birth-Rate] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch adolescent birth rate data', details: error.message },
      { status: 500 }
    );
  }
}
