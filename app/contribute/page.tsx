'use client';

import Link from 'next/link';
import { 
    Github, 
    MessageSquare, 
    Code, 
    Database, 
    Palette, 
    GitBranch, 
    Terminal, 
    ArrowRight, 
    BookOpen,
    ExternalLink
} from 'lucide-react';

export default function ContributePage() {
    return (
        <div className="bg-soft-white min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    <svg viewBox="0 0 800 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <path d="M400 100 L450 150 L500 200 L480 280 L450 350 L400 400 L350 380 L320 320 L300 250 L320 180 L360 130 Z" fill="white" />
                    </svg>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                        Help Build Kenya Ranked
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        We're building an open platform to make development data accessible to everyone. 
                        Join our community of developers, data scientists, and designers.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a 
                            href="https://github.com/C-o-m-o-n/kenya-ranked" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-primary bg-white text-slate-900 hover:bg-slate-100 border-transparent flex items-center gap-2"
                        >
                            <Github className="h-5 w-5" />
                            Star on GitHub
                        </a>
                        <a 
                            href="https://discord.gg/eqSU46Y7xW" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-secondary bg-white/10 hover:bg-white/20 border-white/30 text-white flex items-center gap-2"
                        >
                            <MessageSquare className="h-5 w-5" />
                            Join Discord
                        </a>
                    </div>
                </div>
            </section>

            {/* Ways to Contribute */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                        Ways to Contribute
                    </h2>
                    <p className="text-lg text-slate-light max-w-2xl mx-auto">
                        There are many ways to help, regardless of your background or skill level.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Developers */}
                    <div className="card hover:border-primary/30 transition-colors">
                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <Code className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">Developers</h3>
                        <p className="text-slate-light mb-6">
                            Help us build features, fix bugs, and improve performance. We use Next.js, TypeScript, and Tailwind CSS.
                        </p>
                        <ul className="space-y-2 text-sm text-slate mb-6">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                Frontend development (React)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                Data visualization (Recharts)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                API integration
                            </li>
                        </ul>
                    </div>

                    {/* Data Scientists */}
                    <div className="card hover:border-primary/30 transition-colors">
                        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                            <Database className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">Data Scientists</h3>
                        <p className="text-slate-light mb-6">
                            Help us verify data accuracy, suggest new indicators, and create meaningful visualizations.
                        </p>
                        <ul className="space-y-2 text-sm text-slate mb-6">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                Data verification
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                Statistical analysis
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                New data sources
                            </li>
                        </ul>
                    </div>

                    {/* Designers */}
                    <div className="card hover:border-primary/30 transition-colors">
                        <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                            <Palette className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">Designers</h3>
                        <p className="text-slate-light mb-6">
                            Help us improve the user experience, accessibility, and visual design of the platform.
                        </p>
                        <ul className="space-y-2 text-sm text-slate mb-6">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                UI/UX design
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                Accessibility improvements
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                Data storytelling
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Getting Started */}
            <section className="bg-white py-20 border-y border-slate/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                            Getting Started
                        </h2>
                        <p className="text-lg text-slate-light">
                            Ready to dive in? Follow these steps to set up the project locally.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-xl border border-slate-200">
                                1
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                                    <GitBranch className="w-5 h-5 text-slate-400" />
                                    Fork and Clone
                                </h3>
                                <p className="text-slate-light mb-4">
                                    Fork the repository to your GitHub account and clone it to your local machine.
                                </p>
                                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                    git clone https://github.com/C-o-m-o-n/kenya-ranked.git
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-xl border border-slate-200">
                                2
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                                    <Terminal className="w-5 h-5 text-slate-400" />
                                    Install Dependencies
                                </h3>
                                <p className="text-slate-light mb-4">
                                    Navigate to the project directory and install the required packages.
                                </p>
                                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                    cd kenya-ranked<br />
                                    pnpm install
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-xl border border-slate-200">
                                3
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5 text-slate-400" />
                                    Run Development Server
                                </h3>
                                <p className="text-slate-light mb-4">
                                    Start the local development server to see your changes.
                                </p>
                                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                    pnpm dev
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                        Resources
                    </h2>
                    <p className="text-lg text-slate-light">
                        Useful links and documentation to help you contribute.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <a 
                        href="https://hdr.undp.org/data-center" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="card hover:border-primary/30 transition-all group"
                    >
                        <h3 className="font-bold text-primary mb-2 flex items-center justify-between">
                            UNDP Data Center
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                        </h3>
                        <p className="text-sm text-slate-light">
                            Official source for Human Development Reports and data.
                        </p>
                    </a>

                    <a 
                        href="https://nextjs.org/docs" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="card hover:border-primary/30 transition-all group"
                    >
                        <h3 className="font-bold text-primary mb-2 flex items-center justify-between">
                            Next.js Documentation
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                        </h3>
                        <p className="text-sm text-slate-light">
                            Learn about the React framework we use.
                        </p>
                    </a>

                    <a 
                        href="https://tailwindcss.com/docs" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="card hover:border-primary/30 transition-all group"
                    >
                        <h3 className="font-bold text-primary mb-2 flex items-center justify-between">
                            Tailwind CSS
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                        </h3>
                        <p className="text-sm text-slate-light">
                            Documentation for the utility-first CSS framework.
                        </p>
                    </a>
                </div>
            </section>
        </div>
    );
}
