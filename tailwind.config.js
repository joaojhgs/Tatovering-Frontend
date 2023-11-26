const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false,
    },
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: ['class'],
    theme: {
        container: {
            center: true,
            padding: '1.5rem',
            screens: {
                '2xl': '1360px',
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', ...fontFamily.sans],
            },
        },
    },
    plugins: [],
};
