'use client';

import { useState } from 'react';
import { Download, FileSpreadsheet, FileJson, FileText } from 'lucide-react';
import { ExportFormat } from '@/types';

interface ExportButtonProps {
    data: any[];
    filename?: string;
    formats?: ExportFormat[];
    onExport?: (format: ExportFormat) => void;
    className?: string;
    variant?: 'button' | 'dropdown';
}

export default function ExportButton({
    data,
    filename = 'kenya-ranked-data',
    formats = ['csv', 'excel', 'json'],
    onExport,
    className = '',
    variant = 'dropdown'
}: ExportButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleExport = async (format: ExportFormat) => {
        setIsOpen(false);

        if (onExport) {
            onExport(format);
            return;
        }

        // Default export behavior
        const { exportToCSV, exportToExcel, exportToJSON } = await import('@/lib/export');
        const timestamp = new Date().toISOString().split('T')[0];
        const fullFilename = `${filename}-${timestamp}`;

        switch (format) {
            case 'csv':
                exportToCSV(data, `${fullFilename}.csv`);
                break;
            case 'excel':
                exportToExcel(data, `${fullFilename}.xlsx`);
                break;
            case 'json':
                exportToJSON(data, `${fullFilename}.json`);
                break;
        }
    };

    const formatConfig = {
        csv: { icon: FileText, label: 'CSV', color: 'text-data-green' },
        excel: { icon: FileSpreadsheet, label: 'Excel', color: 'text-data-blue' },
        json: { icon: FileJson, label: 'JSON', color: 'text-data-cyan' }
    };

    if (variant === 'button' && formats.length === 1) {
        const format = formats[0];
        const { icon: Icon, label } = formatConfig[format];

        return (
            <button
                onClick={() => handleExport(format)}
                className={`btn-secondary inline-flex items-center gap-2 ${className}`}
                aria-label={`Export as ${label}`}
            >
                <Icon className="w-4 h-4" />
                Export {label}
            </button>
        );
    }

    return (
        <div className={`relative inline-block ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn-secondary inline-flex items-center gap-2"
                aria-label="Export data"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <Download className="w-4 h-4" />
                Export
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate/10 py-1 z-20">
                        {formats.map((format) => {
                            const { icon: Icon, label, color } = formatConfig[format];
                            return (
                                <button
                                    key={format}
                                    onClick={() => handleExport(format)}
                                    className="w-full px-4 py-2 text-left hover:bg-soft-gray transition-colors duration-150 flex items-center gap-3"
                                >
                                    <Icon className={`w-4 h-4 ${color}`} />
                                    <span className="text-sm font-medium text-slate">
                                        Export as {label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
