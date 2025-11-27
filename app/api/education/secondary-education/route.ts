import { NextResponse } from 'next/server';
import { buildGenderHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Education/Secondary] Starting request...');

    const data = await buildGenderHDROResponse(
      INDICES.GII,
      INDICATORS.SECONDARY_EDUCATION_M,
      INDICATORS.SECONDARY_EDUCATION_F,
      undefined,
      {
        eastAfrica: 35.0,
        africa: 32.0,
        world: 62.0
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Education/Secondary] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch secondary education data', details: error.message },
      { status: 500 }
    );
  }
}
