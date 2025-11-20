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
    title: "Kenya Ranked | See how Kenya stands in the world",
    description:
        "A centralized view of Kenya's governance, development, and progress indicators. Track Kenya's performance across global indices through data, not opinions.",
    keywords: [
        "Kenya",
        "data",
        "governance",
        "development",
        "SDG",
        "corruption",
        "HDI",
        "indicators",
        "rankings",
    ],
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
                <Navigation />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
