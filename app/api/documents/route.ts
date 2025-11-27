import { NextRequest, NextResponse } from 'next/server';
import { searchWorldBankDocuments, getKenyaDocuments } from '@/lib/worldbank/services';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const rows = parseInt(searchParams.get('rows') || '10', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  try {
    let documents;
    
    if (query) {
      documents = await searchWorldBankDocuments(query, { rows, os: offset });
    } else {
      // Default to Kenya documents if no query
      documents = await getKenyaDocuments({ rows, os: offset });
    }

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching World Bank documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}
