/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'crypto-blue': '#0f172a',
        'crypto-blue-dark': '#0a0f1d',
        'crypto-cyan': '#06b6d4',
        'crypto-white': '#f8fafc',
        'crypto-gray-light': '#94a3b8',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow': '0 0 15px 5px rgba(6, 182, 212, 0.15)',
      },
    },
  },
  plugins: [],
}
