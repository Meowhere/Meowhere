/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
          100: '#FFE4E0',
        },
        green: {
          DEFAULT: '#00AC07',
        },
        blue: {
          300: '#0085FF',
          200: '#2EB4FF',
          100: '#E5F3FF',
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
      },
      fontSize: {
        '3xl': ['3.2rem', { lineHeight: '4.2rem' }],
        '2xl': ['2.4rem', { lineHeight: '3.2rem' }],
        '2lg': ['1.8rem', { lineHeight: '2.6rem' }],
        xl: ['2rem', { lineHeight: '3.2rem' }],
        lg: ['1.6rem', { lineHeight: '2.6rem' }],
        md: ['1.4rem', { lineHeight: '2.4rem' }],
        sm: ['1.3rem', { lineHeight: '2.2rem' }],
        xs: ['1.2rem', { lineHeight: '1.8rem' }],
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
  plugins: [require('tailwindcss-animated')],
};
