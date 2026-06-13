import type { MetadataRoute } from 'next';

export const revalidate = 86400;

const SITE = 'https://cosmyastral.com';

const STATIC_PAGES = [
  { url: '/',               priority: 1.0, changefreq: 'weekly'  as const },
  { url: '/carta-natal/',   priority: 0.9, changefreq: 'monthly' as const },
  { url: '/numerologia/',   priority: 0.9, changefreq: 'monthly' as const },
  { url: '/ascendente/',    priority: 0.8, changefreq: 'monthly' as const },
  { url: '/precios/',       priority: 0.8, changefreq: 'monthly' as const },
  { url: '/blog/',          priority: 0.7, changefreq: 'weekly'  as const },
  { url: '/sobre-nosotros/',priority: 0.5, changefreq: 'yearly'  as const },
];

const BLOG_POSTS = [
  'luna-llena-significado-astrologico',
  'revolucion-solar-que-es-como-calcularla',
  'luna-en-escorpio-carta-natal',
  '11-11-significado-espiritual',
  'camino-de-vida-11-numero-maestro',
  'carta-natal-gratis-explicada',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PAGES.map(({ url, priority, changefreq }) => ({
    url: `${SITE}${url}`,
    lastModified: new Date(),
    changeFrequency: changefreq,
    priority,
  }));

  const blogEntries = BLOG_POSTS.map((slug) => ({
    url: `${SITE}/blog/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
