import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-ibm-plex",
    display: "swap",
});

const spaceMono = Space_Mono({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-space-mono",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://kenyaranked.com'),
    title: {
        default: 'Kenya Ranked | See how Kenya stands in the world',
        template: '%s | Kenya Ranked',
    },
    description:
        'Track Kenya\'s performance across global indices: governance, corruption, poverty, HDI, SDGs, and more. Data-driven insights from authoritative international sources.',
    keywords: [
        'Kenya',
        'data',
        'governance',
        'development',
        'SDG',
        'corruption',
        'HDI',
        'indicators',
        'rankings',
        'transparency',
        'World Bank',
        'UNDP',
    ],
    authors: [{ name: 'Kenya Ranked' }],
    creator: 'Kenya Ranked',
    publisher: 'Kenya Ranked',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://kenyaranked.com',
        siteName: 'Kenya Ranked',
        title: 'Kenya Ranked | See how Kenya stands in the world',
        description:
            'Track Kenya\'s performance across global indices through data, not opinions.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Kenya Ranked - Data-driven insights',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kenya Ranked | See how Kenya stands in the world',
        description:
            'Track Kenya\'s performance across global indices through data, not opinions.',
        images: ['/og-image.png'],
        creator: '@kenyaranked',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${ibmPlexSans.variable} ${spaceMono.variable} font-sans`}
            >
                {/* Skip to content link for accessibility */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
                >
                    Skip to main content
                </a>

                <Navigation />
                <main id="main-content" className="min-h-screen" role="main" aria-label="Main content">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
