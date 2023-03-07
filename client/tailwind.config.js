/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'border-color': '#E6D5B8',
        'main-brown': '#4A3933',
        'main-orange': '#F0A500',
        'main-red': '#E45826',
        'light-gray': '#E8E2E2',
        'background-mobile': '#F5F5F5',
        'background-desktop': '#FBFBFB',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar-hide')],
};
