/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'100': '#FFEEE5',
  				'200': '#FFA87A',
  				'300': '#FF5500',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			red: {
  				'100': '#FFF2F0',
  				'200': '#FFC2BA',
  				'300': '#FF472E'
  			},
  			green: {
  				'100': '#ECFAE9',
  				'200': '#27A00E'
  			},
  			blue: {
  				'100': '#EEF5FF',
  				'200': '#0051FF',
  				'300': '#0085FF'
  			},
  			black: '#1D1A17',
  			gray: {
  				'50': '#FBFAF9',
  				'100': '#F4F3F2',
  				'200': '#E5E2DF',
  				'300': '#D2CDC9',
  				'400': '#B3A8A1',
  				'500': '#978980',
  				'600': '#6E625A',
  				'700': '#514942',
  				'800': '#38322E',
  				'900': '#231F1C'
  			},
  			white: '#FFFFFF',
  			yellow: {
  				'100': '#FFF6E5',
  				'200': '#FFC23D'
  			},
  			purple: {
  				'100': '#FCF0FF',
  				'200': '#8407C7'
  			},
  			'dark-green': {
  				'100': '#01C525',
  				'200': '#143218'
  			},
  			'dark-blue': {
  				'100': '#15B9FF',
  				'200': '#193950'
  			},
  			'dark-purple': {
  				'100': '#CB71FF',
  				'200': '#321A4E'
  			},
  			'dark-red': {
  				'100': '#FD5C3C',
  				'200': '#471818'
  			},
  			'dark-gray': '#2A2C3D',
  			'dark-gray-40': 'rgba(42, 44, 61, 0.4)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			'3xl': [
  				'3.2rem',
  				{
  					lineHeight: '4.2rem'
  				}
  			],
  			'2xl': [
  				'2.4rem',
  				{
  					lineHeight: '3.2rem'
  				}
  			],
  			'2lg': [
  				'1.8rem',
  				{
  					lineHeight: '2.6rem'
  				}
  			],
  			xl: [
  				'2rem',
  				{
  					lineHeight: '3.2rem'
  				}
  			],
  			lg: [
  				'1.6rem',
  				{
  					lineHeight: '2.6rem'
  				}
  			],
  			md: [
  				'1.4rem',
  				{
  					lineHeight: '2.4rem'
  				}
  			],
  			sm: [
  				'1.3rem',
  				{
  					lineHeight: '2.2rem'
  				}
  			],
  			xs: [
  				'1.2rem',
  				{
  					lineHeight: '1.8rem'
  				}
  			]
  		},
  		fontWeight: {
  			regular: '400',
  			medium: '500',
  			semibold: '600',
  			bold: '700'
  		},
  		fontFamily: {
  			sans: [
  				'Pretendard',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require('tailwindcss-animated'), require('tailwindcss-animate')],
};
