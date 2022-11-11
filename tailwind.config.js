/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                UTM: 'UTM Swiss Condensed'
            },
            colors: {
                primary: {
                    blue: '#1890FF',
                    red: '#F80000'
                },
                secondary: {
                    'dark-blue': '#2C3A57',
                    blue: '#0072F8',
                    green: '#09B530',
                    violet: '#683C73',
                    red: '#FF3D3D'
                },
                neutrals: {
                    '01': '#FCFCFD',
                    '02': '#F4F5F6',
                    '03': '#E6E8EC',
                    '04': '#B1B5C4',
                    '05': '#777E90',
                    '06': '#353945',
                    '07': '#23262F'
                }
            }
        }
    },
    plugins: []
}
