/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#FF5500',
          200: '#FFA87A',
          100: '#FFEEE5',
        },
        red: {
          300: '#FF472E',
          200: '#FFC2BA',
          100: '#FFF2F0',
        },
        green: {
          200: '#27A00E',
          100: '#ECFAE9',
        },
        blue: {
          300: '#0085FF',
          200: '#0051FF',
          100: '#EEF5FF',
        },
        black: '#1D1A17',
        gray: {
          900: '#231F1C',
          800: '#38322E',
          700: '#514942',
          600: '#6E625A',
          500: '#978980',
          400: '#B3A8A1',
          300: '#D2CDC9',
          200: '#E5E2DF',
          100: '#F4F3F2',
          50: '#FBFAF9',
        },
        white: '#FFFFFF',
        yellow: {
          200: '#FFC23D',
          100: '#FFF6E5',
        },
        purple: {
          200: '#8407C7',
          100: '#FCF0FF',
        },
        'dark-gray': '#2A2C3D',
        'dark-gray-40': 'rgba(42, 44, 61, 0.4)',
      },
      fontSize: {
        //1rem = 10px
        '3xl': ['3.2rem', { lineHeight: '4.2rem' }], // 32px
        '2xl': ['2.4rem', { lineHeight: '3.2rem' }], // 24px
        '2lg': ['1.8rem', { lineHeight: '2.6rem' }], // 18px
        xl: ['2rem', { lineHeight: '3.2rem' }], // 20px
        lg: ['1.6rem', { lineHeight: '2.6rem' }], // 16px
        md: ['1.4rem', { lineHeight: '2.4rem' }], // 14px
        sm: ['1.3rem', { lineHeight: '2.2rem' }], // 13px
        xs: ['1.2rem', { lineHeight: '1.8rem' }], // 12px
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animated'), require('tailwindcss-animate')],
};
