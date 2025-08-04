import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],       
        display: ['Orbitron', 'sans-serif'],      
      },
      colors: {
        background: '#0F0F0F',
        foreground: '#ffffff',
      },
    },
  },
  plugins: [],
};

export default config;
