import type { MetadataRoute } from 'next';

const SITE = 'https://cosmyastral.com';

const STATIC_PAGES: { url: string; lastMod: string; priority: number; changefreq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { url: '/',             lastMod: '2026-06-10', priority: 1.0, changefreq: 'weekly'  },
  { url: '/carta-natal/', lastMod: '2026-06-10', priority: 0.9, changefreq: 'monthly' },
  { url: '/numerologia/', lastMod: '2026-06-10', priority: 0.9, changefreq: 'monthly' },
  { url: '/ascendente/',  lastMod: '2026-06-10', priority: 0.8, changefreq: 'monthly' },
  { url: '/precios/',     lastMod: '2026-06-10', priority: 0.8, changefreq: 'monthly' },
  { url: '/blog/',        lastMod: '2026-06-26', priority: 0.7, changefreq: 'weekly'  },
  { url: '/big-three/',   lastMod: '2026-06-27', priority: 0.8, changefreq: 'monthly' },
  { url: '/privacidad/',  lastMod: '2026-06-10', priority: 0.3, changefreq: 'yearly'  },
];

const BLOG_POSTS: { slug: string; lastMod: string }[] = [
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
