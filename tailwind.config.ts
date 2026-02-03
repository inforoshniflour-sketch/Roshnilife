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
                    DEFAULT: '#00563F',
                    dark: '#003d2d',
                    light: '#7CB342',
                },
                secondary: {
                    DEFAULT: '#7CB342',
                    dark: '#558B2F',
                },
                accent: '#9CCC65',
                cream: '#f5f1ed',
            },
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease forwards',
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 2s infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
