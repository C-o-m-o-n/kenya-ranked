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
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex-1">
          {document.docty && (
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase bg-blue-50 text-blue-600 mb-2">
              {document.docty}
            </span>
          )}
          <h3 className="text-lg font-semibold text-primary line-clamp-2 leading-tight" title={document.display_title}>
            {document.display_title}
          </h3>
        </div>
        <span className="text-xs font-medium text-slate-500 whitespace-nowrap bg-slate-100 px-2 py-1 rounded shrink-0">
          {date}
        </span>
      </div>

      {document.authr && (
        <div className="mb-3 text-xs text-slate-500">
          <span className="font-medium text-slate-700">By:</span> {document.authr}
        </div>
      )}
      
      <div className="mb-4 flex-grow">
        <p className="text-sm text-slate-600 line-clamp-3">
          {abstract || 'No abstract available.'}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100">
        <div className="flex flex-wrap gap-2 mb-3">
          {document.majtheme && (
            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md">
              {document.majtheme}
            </span>
          )}
          {document.topic && (
            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md truncate max-w-[150px]" title={document.topic}>
              {document.topic.split(',')[0]}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium truncate max-w-[120px]" title={document.count}>
            {document.count || 'Unknown Location'}
          </span>
          
          <div className="flex gap-3 shrink-0">
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
