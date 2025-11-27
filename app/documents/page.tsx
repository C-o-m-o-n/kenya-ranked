import { Metadata } from 'next';
import { getKenyaDocuments, searchWorldBankDocuments } from '@/lib/worldbank/services';
import { WorldBankDocument } from '@/lib/worldbank/types';
import DocumentSearch from '@/components/documents/DocumentSearch';
import DocumentsList from '@/components/documents/DocumentsList';

export const metadata: Metadata = {
  title: 'World Bank Documents | Kenya Ranked',
  description: 'Explore World Bank documents and reports related to Kenya and development topics.',
};

// Revalidate every hour
export const revalidate = 3600;

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DocumentsPage({ searchParams }: PageProps) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  
  let documents: WorldBankDocument[];
  try {
    if (query) {
      documents = await searchWorldBankDocuments(query, { rows: 12 });
    } else {
      documents = await getKenyaDocuments({ rows: 12 });
    }
  } catch (error) {
    console.error('Error loading documents:', error);
    documents = [];
  }

  return (
    <div className="min-h-screen bg-soft-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            World Bank Documents
          </h1>
          <p className="text-lg text-slate-light max-w-2xl mx-auto">
            Access official reports, research papers, and project documents from the World Bank.
          </p>
        </div>

        <DocumentSearch />

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            {query ? `Search Results for "${query}"` : 'Latest Documents for Kenya'}
          </h2>
          <DocumentsList initialDocuments={documents} />
        </div>
      </div>
    </div>
  );
}
