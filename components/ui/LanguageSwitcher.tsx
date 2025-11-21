'use client';

import { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { LanguageCode, getCurrentLanguage, setCurrentLanguage } from '@/lib/i18n';

interface LanguageSwitcherProps {
    className?: string;
    variant?: 'button' | 'dropdown';
}

export default function LanguageSwitcher({
    className = '',
    variant = 'button'
}: LanguageSwitcherProps) {
    const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setCurrentLang(getCurrentLanguage());
    }, []);

    const handleLanguageChange = (lang: LanguageCode) => {
        setCurrentLang(lang);
        setCurrentLanguage(lang);
        // Trigger page reload to apply translations
        window.location.reload();
    };

    // Don't render anything until mounted to avoid hydration mismatch
    if (!mounted) {
        return <div className={`w-[200px] h-[38px] ${className}`} />; // Placeholder with same dimensions
    }

    const languages = [
        { code: 'en' as LanguageCode, label: 'English', flag: '🇬🇧' },
        { code: 'sw' as LanguageCode, label: 'Kiswahili', flag: '🇰🇪' }
    ];

    if (variant === 'button') {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${currentLang === lang.code
                            ? 'bg-primary text-white'
                            : 'bg-white text-slate hover:bg-soft-gray border border-slate/20'
                            }`}
                        aria-label={`Switch to ${lang.label}`}
                        aria-current={currentLang === lang.code ? 'true' : 'false'}
                    >
                        <span className="mr-1.5">{lang.flag}</span>
                        {lang.label}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className={`relative inline-block ${className}`}>
            <button
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate hover:text-primary transition-colors duration-200"
                aria-label="Change language"
            >
                <Languages className="w-4 h-4" />
                <span>
                    {languages.find(l => l.code === currentLang)?.label}
                </span>
            </button>
        </div>
    );
}
