'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DocumentSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    
    // Reset page when searching
    params.delete('page');
    
    router.push(`/documents?${params.toString()}`);
    setIsSearching(false);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for documents (e.g., 'wind energy', 'education')..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
        />
        <div className="absolute left-4 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="absolute right-2 px-4 py-1.5 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark disabled:opacity-50 transition-colors"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}
