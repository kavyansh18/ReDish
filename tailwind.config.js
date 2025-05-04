/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'redish-bg': '#1E201E',
        'redish-accent': '#758570',
        'redish-text': '#ECDFCC',
        'redish-card': '#262926',
        'redish-secondary': '#e3d7c7',
        'quickstudy-bg': '#1F2633',
        'quickstudy-accent': '#5A7C9B',
        'quickstudy-text': '#DCE5F2',
        'quickstudy-card': '#2A3342',
        'quickstudy-secondary': '#C7D1E0',
        'motivation-bg': '#2E1F14',
        'motivation-accent': '#D97706',
        'motivation-text': '#F9E8D9',
        'motivation-card': '#3A2A1E',
        'motivation-secondary': '#F4D3A8',
        'debugger-bg': '#1A1C2C',
        'debugger-accent': '#7C3AED',
        'debugger-text': '#E0E7FF',
        'debugger-card': '#242638',
        'debugger-secondary': '#C4B5FD',
      },
    },
  },
  plugins: [],
}