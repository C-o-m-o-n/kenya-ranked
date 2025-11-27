'use client';

import React, { useEffect, useState } from 'react';
import { WorldBankDocument } from '@/lib/worldbank/types';
import DocumentCard from './DocumentCard';
import { useSearchParams } from 'next/navigation';

interface DocumentsListProps {
  initialDocuments: WorldBankDocument[];
}

export default function DocumentsList({ initialDocuments }: DocumentsListProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [documents, setDocuments] = useState<WorldBankDocument[]>(initialDocuments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effect to handle client-side search updates if needed, 
  // but since we are using URL params and server components for the page, 
  // this component might just display what's passed to it.
  // However, if we want client-side transitions without full page reload, we can fetch here.
  // For now, let's assume the page component handles the data fetching based on URL params 
  // and passes it down. But wait, the page component is a Server Component.
  // So when URL changes, the page re-renders on the server and passes new initialDocuments.
  // So we just need to update state when props change.
  
  useEffect(() => {
    setDocuments(initialDocuments);
  }, [initialDocuments]);

  // If we wanted to implement "load more" or client-side filtering, we'd do it here.

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-slate-100 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">No documents found.</p>
        {query && <p className="text-slate-400 mt-2">Try adjusting your search terms.</p>}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
}
