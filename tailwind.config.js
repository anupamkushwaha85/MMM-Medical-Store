/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#ecfdf8',
                    100: '#d1faef',
                    200: '#a7f3dc',
                    300: '#6ee7c9',
                    400: '#34d1b0',
                    500: '#0d9488',
                    600: '#0b7f76',
                    700: '#0a6b64',
                    800: '#095650',
                    900: '#074541',
                },
                gold: {
                    50: '#fff9ec',
                    100: '#fff2c7',
                    200: '#ffe38b',
                    300: '#ffd45a',
                    400: '#f8be31',
                    500: '#d4a12c',
                    600: '#b98320',
                },
                sage: {
                    50: '#f4f8f2',
                    100: '#e3efe1',
                    200: '#c7dbc4',
                    300: '#a2bf9f',
                    400: '#7a9e77',
                    500: '#5f815b',
                },
            },
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                body: ['"DM Sans"', 'sans-serif'],
            },
            boxShadow: {
                soft: '0 18px 40px rgba(15, 23, 42, 0.08)',
                lift: '0 28px 70px rgba(13, 148, 136, 0.14)',
            },
            backgroundImage: {
                'hero-gradient':
                    'radial-gradient(circle at top left, rgba(13, 148, 136, 0.18), transparent 38%), radial-gradient(circle at top right, rgba(212, 161, 44, 0.18), transparent 34%), linear-gradient(180deg, #ffffff 0%, #f7fbfa 100%)',
            },
        },
    },
    plugins: [],
};