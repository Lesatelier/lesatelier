import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1B2A6B',
          light: '#F0F4FA',
          blue: '#CADCFC',
          red: '#CC0000',
        },
      },
    },
  },
  plugins: [],
};

export default config;
