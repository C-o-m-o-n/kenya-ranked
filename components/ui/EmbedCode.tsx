'use client';

import { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';
import { EmbedConfig } from '@/types';
import { generateEmbedCode, generateResponsiveEmbedCode, copyToClipboard } from '@/lib/embed';

interface EmbedCodeProps {
    config: EmbedConfig;
    className?: string;
}

export default function EmbedCode({ config, className = '' }: EmbedCodeProps) {
    const [copied, setCopied] = useState(false);
    const [isResponsive, setIsResponsive] = useState(false);

    const embedCode = isResponsive
        ? generateResponsiveEmbedCode(config)
        : generateEmbedCode(config);

    const handleCopy = async () => {
        const success = await copyToClipboard(embedCode);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Options */}
            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-slate">
                    <input
                        type="checkbox"
                        checked={isResponsive}
                        onChange={(e) => setIsResponsive(e.target.checked)}
                        className="rounded border-slate/30 text-primary focus:ring-primary/50"
                    />
                    <span>Responsive embed</span>
                </label>
            </div>

            {/* Code Display */}
            <div className="relative">
                <div className="bg-slate-dark rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-white/90 font-mono">
                        <code>{embedCode}</code>
                    </pre>
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Copy embed code"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-data-green" />
                    ) : (
                        <Copy className="w-4 h-4 text-white" />
                    )}
                </button>
            </div>

            {copied && (
                <p className="text-sm text-data-green flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Copied to clipboard!
                </p>
            )}

            {/* Preview */}
            <div className="border-t border-slate/10 pt-4">
                <h4 className="text-sm font-semibold text-slate mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Preview
                </h4>
                <div
                    className="border border-slate/20 rounded-lg p-4 bg-soft-gray"
                    dangerouslySetInnerHTML={{ __html: embedCode }}
                />
            </div>
        </div>
    );
}
