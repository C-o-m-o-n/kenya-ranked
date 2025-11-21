// Internationalization utilities for English and Swahili

import type { LanguageCode } from '@/types';
export type { LanguageCode } from '@/types';


// Translation dictionary
export const translations = {
    // Navigation
    'nav.home': { en: 'Home', sw: 'Nyumbani' },
    'nav.indicators': { en: 'Indicators', sw: 'Viashiria' },
    'nav.sdg': { en: 'SDG Progress', sw: 'Maendeleo ya SDG' },
    'nav.compare': { en: 'Compare', sw: 'Linganisha' },
    'nav.about': { en: 'About', sw: 'Kuhusu' },
    'nav.methodology': { en: 'Methodology', sw: 'Mbinu' },

    // Homepage
    'home.title': { en: 'How is Kenya Ranked Globally?', sw: 'Kenya Iko Wapi Kimataifa?' },
    'home.subtitle': { en: 'A centralized view of Kenya\'s governance, development, and progress indicators.', sw: 'Mtazamo wa kati wa viashiria vya utawala, maendeleo, na maendeleo ya Kenya.' },
    'home.tagline': { en: 'See how Kenya stands in the world — through data, not opinions.', sw: 'Ona jinsi Kenya inavyosimama ulimwenguni — kupitia data, si maoni.' },
    'home.exploreIndicators': { en: 'Explore Indicators', sw: 'Chunguza Viashiria' },
    'home.viewSDG': { en: 'View SDG Progress', sw: 'Angalia Maendeleo ya SDG' },
    'home.keyHighlights': { en: 'Key Highlights', sw: 'Mambo Muhimu' },
    'home.keyHighlightsDesc': { en: 'Kenya\'s performance across critical global indicators', sw: 'Utendaji wa Kenya katika viashiria muhimu vya kimataifa' },
    'home.comparison': { en: 'Kenya vs Region vs World', sw: 'Kenya dhidi ya Mkoa dhidi ya Ulimwengu' },
    'home.comparisonDesc': { en: 'Comparing Kenya\'s performance with regional and global averages', sw: 'Kulinganisha utendaji wa Kenya na wastani wa kikanda na kimataifa' },
    'home.exploreByCategory': { en: 'Explore by Category', sw: 'Chunguza kwa Jamii' },
    'home.exploreByCategoryDesc': { en: 'Browse indicators by thematic areas', sw: 'Vinjari viashiria kwa maeneo ya mada' },
    'home.compareMultiple': { en: 'Want to Compare Multiple Indicators?', sw: 'Unataka Kulinganisha Viashiria Vingi?' },
    'home.compareMultipleDesc': { en: 'Use our comparison tool to analyze Kenya\'s performance across different metrics and countries', sw: 'Tumia zana yetu ya kulinganisha kuchambua utendaji wa Kenya katika vipimo na nchi tofauti' },
    'home.goToComparison': { en: 'Go to Comparison Tool', sw: 'Nenda kwa Zana ya Kulinganisha' },

    // Data sections
    'data.lastUpdated': { en: 'Last Updated', sw: 'Imesasishwa Mwisho' },
    'data.rank': { en: 'Rank', sw: 'Nafasi' },
    'data.score': { en: 'Score', sw: 'Alama' },
    'data.trend': { en: 'Trend', sw: 'Mwelekeo' },
    'data.year': { en: 'Year', sw: 'Mwaka' },
    'data.category': { en: 'Category', sw: 'Jamii' },
    'data.source': { en: 'Source', sw: 'Chanzo' },
    'data.methodology': { en: 'Methodology', sw: 'Mbinu' },
    'data.progress': { en: 'Progress', sw: 'Maendeleo' },
    'data.status': { en: 'Status', sw: 'Hali' },
    'data.indicators': { en: 'indicators', sw: 'viashiria' },
    'data.outOf': { en: 'out of', sw: 'kati ya' },

    // Actions
    'action.learnMore': { en: 'Learn More', sw: 'Jifunze Zaidi' },
    'action.viewDetails': { en: 'View Details', sw: 'Angalia Maelezo' },
    'action.export': { en: 'Export', sw: 'Hamisha' },
    'action.exportCSV': { en: 'Export as CSV', sw: 'Hamisha kama CSV' },
    'action.exportExcel': { en: 'Export as Excel', sw: 'Hamisha kama Excel' },
    'action.exportJSON': { en: 'Export as JSON', sw: 'Hamisha kama JSON' },
    'action.share': { en: 'Share', sw: 'Shiriki' },
    'action.embed': { en: 'Embed', sw: 'Pachika' },
    'action.subscribe': { en: 'Subscribe to Updates', sw: 'Jiandikishe kwa Masasisho' },
    'action.search': { en: 'Search', sw: 'Tafuta' },
    'action.filter': { en: 'Filter', sw: 'Chuja' },
    'action.close': { en: 'Close', sw: 'Funga' },
    'action.copy': { en: 'Copy', sw: 'Nakili' },
    'action.copied': { en: 'Copied!', sw: 'Imenakiliwa!' },

    // Categories
    'category.governance': { en: 'Governance', sw: 'Utawala' },
    'category.economy': { en: 'Economy', sw: 'Uchumi' },
    'category.society': { en: 'Society', sw: 'Jamii' },
    'category.sdg': { en: 'SDGs', sw: 'SDG' },
    'category.health': { en: 'Health', sw: 'Afya' },
    'category.education': { en: 'Education', sw: 'Elimu' },
    'category.development': { en: 'Development', sw: 'Maendeleo' },
    'category.corruption': { en: 'Corruption', sw: 'Rushwa' },
    'category.poverty': { en: 'Poverty', sw: 'Umaskini' },
    'category.all': { en: 'All', sw: 'Yote' },

    // SDG Page
    'sdg.title': { en: 'Sustainable Development Goals', sw: 'Malengo ya Maendeleo Endelevu' },
    'sdg.description': { en: 'Track Kenya\'s progress toward achieving the 17 UN Sustainable Development Goals by 2030', sw: 'Fuatilia maendeleo ya Kenya katika kufikia Malengo 17 ya Maendeleo Endelevu ya UN mennamo 2030' },
    'sdg.overallProgress': { en: 'Overall SDG Progress', sw: 'Maendeleo ya Jumla ya SDG' },
    'sdg.overallProgressDesc': { en: 'Kenya\'s aggregate performance across all 17 goals', sw: 'Utendaji wa jumla wa Kenya katika malengo yote 17' },
    'sdg.goal': { en: 'Goal', sw: 'Lengo' },

    // Indicators Page
    'indicators.title': { en: 'All Indicators', sw: 'Viashiria Vyote' },
    'indicators.description': { en: 'Browse and search through all available indicators for Kenya', sw: 'Vinjari na tafuta kupitia viashiria vyote vinavyopatikana kwa Kenya' },
    'indicators.searchPlaceholder': { en: 'Search indicators...', sw: 'Tafuta viashiria...' },
    'indicators.showing': { en: 'Showing', sw: 'Inaonyesha' },
    'indicators.indicator': { en: 'Indicator', sw: 'Kiashiria' },
    'indicators.noResults': { en: 'No indicators found matching your criteria', sw: 'Hakuna viashiria vilivyopatikana vinavyolingana na vigezo vyako' },

    // Info & Help
    'info.whyItMatters': { en: 'Why It Matters', sw: 'Kwa Nini Ni Muhimu' },
    'info.howMeasured': { en: 'How It\'s Measured', sw: 'Jinsi Inavyopimwa' },
    'info.dataSource': { en: 'Data Source', sw: 'Chanzo cha Data' },
    'info.updateFrequency': { en: 'Update Frequency', sw: 'Mzunguko wa Kusasisha' },
    'info.fresh': { en: 'Fresh', sw: 'Mpya' },
    'info.recent': { en: 'Recent', sw: 'Ya Hivi Karibuni' },
    'info.stale': { en: 'Needs Update', sw: 'Inahitaji Kusasishwa' },

    // Time
    'time.daysAgo': { en: 'days ago', sw: 'siku zilizopita' },
    'time.monthsAgo': { en: 'months ago', sw: 'miezi iliyopita' },
    'time.yearsAgo': { en: 'years ago', sw: 'miaka iliyopita' },
    'time.today': { en: 'today', sw: 'leo' },
    'time.yesterday': { en: 'yesterday', sw: 'jana' },

    // Footer
    'footer.about': { en: 'About Kenya Ranked', sw: 'Kuhusu Kenya Ranked' },
    'footer.description': { en: 'Data-driven insights into Kenya\'s global standing', sw: 'Maarifa yanayoongozwa na data kuhusu hadhi ya Kenya kimataifa' },
    'footer.rights': { en: 'All rights reserved', sw: 'Haki zote zimehifadhiwa' },
};

/**
 * Get current language from localStorage or default to English
 */
export function getCurrentLanguage(): LanguageCode {
    if (typeof window === 'undefined') return 'en';

    const stored = localStorage.getItem('language');
    return (stored === 'sw' ? 'sw' : 'en') as LanguageCode;
}

/**
 * Set current language in localStorage
 */
export function setCurrentLanguage(lang: LanguageCode): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('language', lang);
}

/**
 * Translate a key to the current language
 */
export function translate(key: string, lang?: LanguageCode): string {
    const currentLang = lang || getCurrentLanguage();
    const translation = translations[key as keyof typeof translations];

    if (!translation) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
    }

    return translation[currentLang];
}

/**
 * Shorthand for translate function
 */
export const t = translate;

/**
 * Format date according to locale
 */
export function formatDate(date: string | Date, lang?: LanguageCode): string {
    const currentLang = lang || getCurrentLanguage();
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    const locale = currentLang === 'sw' ? 'sw-KE' : 'en-KE';

    return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function getRelativeTime(date: string | Date, lang?: LanguageCode): string {
    const currentLang = lang || getCurrentLanguage();
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return translate('time.today', currentLang);
    if (diffDays === 1) return translate('time.yesterday', currentLang);
    if (diffDays < 30) return `${diffDays} ${translate('time.daysAgo', currentLang)}`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} ${translate('time.monthsAgo', currentLang)}`;

    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} ${translate('time.yearsAgo', currentLang)}`;
}
