const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            'minW': '900px',
            'mdW': '1400px',
            'lgW': '1900px',
        },
        extend: {
            fontFamily: {
                'merri': ['Merriweather', 'regular']
            },
            colors: {
                darkPrimary: '#00ADB5',
                darkSecondary: '#1c6569',
                darkBG: '#222831',
                darkBGTwo: '#393E46',
                darkFont: colors.white,
                lightPrimary: '#736CED',
                lightSecondary: '#9F9FED',
                lightBG: '#FEF9FF',
                lightBGTwo: '#CCCCFF',
                lightFont: colors.black,
                lightFontTwo: '#FEF9FF',
            }
        },
    },
    variants: {},
    plugins: [],
};