/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 4px 36px 0px rgba(0, 0, 0, 0.10)',
        'card':'0px 4px 28px 0px rgba(0, 0, 0, 0.25)',
        'input':'0px 1px 2px 0px rgba(0, 0, 0, 0.05)'
      },
      fontFamily: {
        'lato': ['"Lato", sans-serif'],
        'inter': ['"Inter", sans-serif'],
      }
    },
    screens: {
      'xs':'280px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ]
}

