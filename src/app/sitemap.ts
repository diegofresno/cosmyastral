import type { MetadataRoute } from 'next';

const SITE = 'https://cosmyastral.com';
const now = new Date();

const STATIC_PAGES: { url: string; lastMod: string | Date; priority: number; changefreq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { url: '/',                          lastMod: now,          priority: 1.0, changefreq: 'weekly'  },
  { url: '/carta-natal/',              lastMod: now,          priority: 0.9, changefreq: 'monthly' },
  { url: '/numerologia/',              lastMod: now,          priority: 0.9, changefreq: 'monthly' },
  { url: '/ascendente/',               lastMod: now,          priority: 0.8, changefreq: 'monthly' },
  { url: '/carta-natal-interpretada/', lastMod: now,          priority: 0.9, changefreq: 'monthly' },
  { url: '/precios/',                  lastMod: now,          priority: 0.8, changefreq: 'monthly' },
  { url: '/blog/',                     lastMod: now,          priority: 0.7, changefreq: 'weekly'  },
  { url: '/big-three/',                lastMod: '2026-06-27', priority: 0.8, changefreq: 'monthly' },
  { url: '/privacidad/',               lastMod: '2026-06-10', priority: 0.3, changefreq: 'yearly'  },
];

const BLOG_POSTS: { slug: string; lastMod: string }[] = [
  { slug: 'luna-llena-agosto-2026',                    lastMod: '2026-07-20' },
  { slug: 'eclipse-solar-agosto-2026',                 lastMod: '2026-07-20' },
  { slug: 'ascendente-en-aries',                       lastMod: '2026-07-20' },
  { slug: 'ascendente-en-tauro',                       lastMod: '2026-07-20' },
  { slug: 'ascendente-en-geminis',                     lastMod: '2026-07-20' },
  { slug: 'ascendente-en-cancer',                      lastMod: '2026-07-20' },
  { slug: 'ascendente-en-leo',                         lastMod: '2026-07-20' },
  { slug: 'ascendente-en-libra',                       lastMod: '2026-07-20' },
  { slug: 'ascendente-en-sagitario',                   lastMod: '2026-07-20' },
  { slug: 'ascendente-en-capricornio',                 lastMod: '2026-07-20' },
  { slug: 'ascendente-en-acuario',                     lastMod: '2026-07-20' },
  { slug: 'ascendente-en-piscis',                      lastMod: '2026-07-20' },
  { slug: 'luna-en-acuario',                           lastMod: '2026-07-18' },
  { slug: 'luna-en-libra',                             lastMod: '2026-07-18' },
  { slug: 'luna-en-virgo',                             lastMod: '2026-07-18' },
  { slug: 'luna-en-leo',                               lastMod: '2026-07-18' },
  { slug: 'luna-en-cancer',                            lastMod: '2026-07-18' },
  { slug: 'luna-en-geminis',                           lastMod: '2026-07-18' },
  { slug: 'luna-en-tauro',                             lastMod: '2026-07-18' },
  { slug: 'luna-en-aries',                             lastMod: '2026-07-18' },
  { slug: 'venus-en-piscis',                            lastMod: '2026-07-17' },
  { slug: 'venus-en-acuario',                          lastMod: '2026-07-17' },
  { slug: 'venus-en-sagitario',                        lastMod: '2026-07-17' },
  { slug: 'venus-en-libra',                            lastMod: '2026-07-17' },
  { slug: 'venus-en-cancer',                           lastMod: '2026-07-17' },
  { slug: 'venus-en-tauro',                            lastMod: '2026-07-17' },
  { slug: 'venus-en-leo',                              lastMod: '2026-07-15' },
  { slug: 'venus-en-capricornio',                      lastMod: '2026-07-13' },
  { slug: 'venus-en-geminis',                         lastMod: '2026-07-10' },
  { slug: 'venus-en-aries',                           lastMod: '2026-07-08' },
  { slug: 'venus-en-escorpio',                       lastMod: '2026-07-06' },
  { slug: 'venus-en-virgo',                          lastMod: '2026-07-03' },
  { slug: 'ascendente-en-escorpio',                  lastMod: '2026-07-01' },
  { slug: 'ascendente-en-virgo',                     lastMod: '2026-06-29' },
  { slug: 'luna-en-sagitario',                       lastMod: '2026-06-26' },
  { slug: 'luna-en-piscis',                          lastMod: '2026-06-26' },
  { slug: 'luna-nueva-julio-2026',                   lastMod: '2026-06-24' },
  { slug: 'luna-en-capricornio-carta-natal',         lastMod: '2026-06-22' },
  { slug: 'hora-espejo-11-11',                       lastMod: '2026-06-19' },
  { slug: 'luna-llena-julio-2026',                   lastMod: '2026-06-17' },
  { slug: 'carta-natal-gratis-explicada',            lastMod: '2026-06-09' },
  { slug: 'luna-llena-significado-astrologico',      lastMod: '2026-06-09' },
  { slug: 'luna-en-escorpio-carta-natal',            lastMod: '2026-06-11' },
  { slug: 'que-significa-11-11',                     lastMod: '2026-06-15' },
  { slug: '11-11-significado-espiritual',            lastMod: '2026-06-15' },
  { slug: 'camino-de-vida-11-numero-maestro',        lastMod: '2026-06-11' },
  { slug: 'revolucion-solar-que-es-como-calcularla', lastMod: '2026-06-11' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PAGES.map(({ url, lastMod, priority, changefreq }) => ({
    url: `${SITE}${url}`,
    lastModified: lastMod,
    changeFrequency: changefreq,
    priority,
  }));

  const blogEntries = BLOG_POSTS.map(({ slug, lastMod }) => ({
    url: `${SITE}/blog/${slug}/`,
    lastModified: lastMod,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
