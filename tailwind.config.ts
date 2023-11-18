import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'small': '3px 3px 0px 1px transparent',
        'none': '0px 0px 0px 0px transparent',
        'medium': '5px 5px 0px 1px transparent',
      }
    },
    colors: {
      'purple': '#AD3AE6',
      'green': '#94D39C',
      'white': '#FFFFFF',
      'black': '#000000',
      'yellow': '#F9BB58',
      'lightblue': '#599EFC',
      'red': '#FF2D55',
      'transparent': "transparent",
      'gray': {
        50: '#F9FAFB',
        100: '#F6F5FA',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
      'blue' : '#0A66C2',
      'green-gradient': '#D6EADA',
      'yellow-gradient': '#F6EFD5'
    },
  },
  plugins: [],
}
export default config
