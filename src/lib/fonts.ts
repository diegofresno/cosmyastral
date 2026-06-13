import { EB_Garamond, Inter, Italianno } from 'next/font/google';

export const garamond = EB_Garamond({
  variable: '--font-garamond',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const italianno = Italianno({
  variable: '--font-italianno',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});
