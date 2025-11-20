import { ExternalLink } from 'lucide-react';

interface SourceDisclaimerProps {
    source: string;
    sourceUrl: string;
    year: number;
}

export default function SourceDisclaimer({
    source,
    sourceUrl,
    year,
}: SourceDisclaimerProps) {
    return (
        <div className="bg-soft-gray border border-slate/10 rounded-lg p-4 text-sm">
            <div className="flex items-start gap-2">
                <div className="flex-1">
                    <p className="text-slate-light font-medium mb-1">Data Source</p>
                    <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors"
                    >
                        {source}
                        <ExternalLink className="h-3 w-3" />
                    </a>
                    <p className="text-slate-light mt-1">Last updated: {year}</p>
                </div>
            </div>
        </div>
    );
}
