import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#003B73',
                    dark: '#002850',
                    light: '#004D94',
                },
                kenya: {
                    green: '#0F9D58',
                    red: '#DC3545',
                    black: '#000000',
                },
                slate: {
                    DEFAULT: '#475569',
                    light: '#64748B',
                    dark: '#334155',
                },
                soft: {
                    white: '#F8FAFC',
                    gray: '#F1F5F9',
                },
                data: {
                    cyan: '#00A7C4',
                    blue: '#0066CC',
                    green: '#10B981',
                    yellow: '#F59E0B',
                    red: '#EF4444',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                heading: ['var(--font-ibm-plex)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-space-mono)', 'monospace'],
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
        },
    },
    plugins: [],
};

export default config;
