'use client';

import { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const fullUrl = `https://kenyaranked.com${url}`;
    const shareText = description || title;

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate hover:text-primary transition-colors"
                aria-label="Share this page"
            >
                <Share2 className="h-4 w-4" />
                Share
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Share Menu */}
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-card-hover border border-slate/10 p-4 z-50">
                        <p className="text-sm font-medium text-slate mb-3">Share this page</p>

                        <div className="space-y-2">
                            {/* Twitter */}
                            <a
                                href={shareLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-soft-gray transition-colors"
                            >
                                <div className="w-8 h-8 bg-[#1DA1F2] rounded-lg flex items-center justify-center">
                                    <Twitter className="h-4 w-4 text-white" fill="white" />
                                </div>
                                <span className="text-sm font-medium text-slate">Twitter</span>
                            </a>

                            {/* Facebook */}
                            <a
                                href={shareLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-soft-gray transition-colors"
                            >
                                <div className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center">
                                    <Facebook className="h-4 w-4 text-white" fill="white" />
                                </div>
                                <span className="text-sm font-medium text-slate">Facebook</span>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href={shareLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-soft-gray transition-colors"
                            >
                                <div className="w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center">
                                    <Linkedin className="h-4 w-4 text-white" fill="white" />
                                </div>
                                <span className="text-sm font-medium text-slate">LinkedIn</span>
                            </a>

                            {/* Copy Link */}
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-soft-gray transition-colors w-full"
                            >
                                <div className="w-8 h-8 bg-slate rounded-lg flex items-center justify-center">
                                    {copied ? (
                                        <Check className="h-4 w-4 text-white" />
                                    ) : (
                                        <LinkIcon className="h-4 w-4 text-white" />
                                    )}
                                </div>
                                <span className="text-sm font-medium text-slate">
                                    {copied ? 'Copied!' : 'Copy Link'}
                                </span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
