// app/fonts.ts
import { Montserrat, Orbitron } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});
