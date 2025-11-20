'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/indicators', label: 'Indicators' },
    { href: '/compare', label: 'Compare' },
    { href: '/sdg', label: 'SDG Progress' },
    { href: '/about', label: 'About' },
    { href: '/methodology', label: 'Methodology' },
];

export default function Navigation() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-slate/10 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex items-center">
                            <span className="text-2xl font-heading font-bold text-primary">
                                Kenya Ranked
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href ||
                                (link.href !== '/' && pathname.startsWith(link.href));

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
                                            ? 'bg-primary text-white'
                                            : 'text-slate hover:bg-soft-gray hover:text-primary'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-slate hover:bg-soft-gray"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href ||
                                (link.href !== '/' && pathname.startsWith(link.href));

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
                                            ? 'bg-primary text-white'
                                            : 'text-slate hover:bg-soft-gray hover:text-primary'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </nav>
    );
}
