import { NextResponse } from 'next/server';
import { buildGenderHDROResponse } from '@/lib/hdro/utils';
import { INDICES, INDICATORS } from '@/lib/hdro/types';

export async function GET() {
  try {
    console.log('🔵 [API/Governance/Parliament] Starting request...');

    const data = await buildGenderHDROResponse(
      INDICES.GII,
      INDICATORS.PARLIAMENT_SEATS_M,
      INDICATORS.PARLIAMENT_SEATS_F,
      undefined,
      {
        eastAfrica: 30.0,
        africa: 25.0,
        world: 26.5
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🔴 [API/Governance/Parliament] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parliamentary representation data', details: error.message },
      { status: 500 }
    );
  }
}
