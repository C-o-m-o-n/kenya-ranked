import React from 'react';
import { WorldBankDocument } from '@/lib/worldbank/types';
import { getAbstract } from '@/lib/worldbank/utils';

interface DocumentCardProps {
  document: WorldBankDocument;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const abstract = getAbstract(document);
  const date = new Date(document.docdt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-lg font-semibold text-primary line-clamp-2" title={document.display_title}>
            {document.display_title}
          </h3>
          <span className="text-xs font-medium text-slate-500 whitespace-nowrap bg-slate-100 px-2 py-1 rounded">
            {date}
          </span>
        </div>
        
        <div className="mb-4 flex-grow">
          <p className="text-sm text-slate-600 line-clamp-3">
            {abstract || 'No abstract available.'}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">
            {document.count || 'Unknown Location'}
          </span>
          
          <div className="flex gap-3">
            <a 
              href={document.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              View Details
            </a>
            {document.pdfurl && (
              <a 
                href={document.pdfurl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
              >
                PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
