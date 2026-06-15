import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import BlogPosts from '@/components/blog/BlogPosts';

const SITE = 'https://cosmyastral.com';

export const metadata: Metadata = {
  title: 'Blog de Astrología y Numerología — Cosmyastral',
  description:
    'Guías, explicaciones y lecturas honestas sobre astrología y numerología. Sin predicciones mágicas — solo lo que los sistemas dicen realmente y por qué puede ser útil.',
  alternates: { canonical: '/blog/' },
};

export const POSTS = [
  {
    slug: 'carta-natal-gratis-explicada',
    title: 'Carta natal gratis: qué es, cómo leerla y qué te dice realmente',
    excerpt: 'Entender tu carta natal más allá del signo solar. Te explicamos qué es cada elemento, cómo interpretar los planetas en los signos y por qué la hora de nacimiento importa.',
    category: 'Astrología',
    date: '2026-06-01',
    featured: true,
  },
  {
    slug: 'luna-llena-significado-astrologico',
    title: 'Luna llena: significado astrológico, rituales y fechas 2026',
    excerpt: 'La luna llena marca el clímax del ciclo lunar. Te explicamos qué significa astrológicamente, cómo afecta emocionalmente y cuándo caen las lunas llenas de 2026.',
    category: 'Ciclos lunares',
    date: '2026-05-15',
  },
  {
    slug: 'luna-en-escorpio-carta-natal',
    title: 'Luna en Escorpio en la carta natal: intensidad emocional y regeneración',
    excerpt: 'La Luna en Escorpio es una de las posiciones lunares más intensas. Profundidad emocional, necesidad de transformación y dificultad para soltar. Qué significa en tu carta.',
    category: 'Astrología',
    date: '2026-05-08',
  },
  {
    slug: '11-11-significado-espiritual',
    title: '11:11 significado: ¿qué hay detrás del número espejo más popular?',
    excerpt: 'El 11:11 se ha convertido en un fenómeno viral. Te explicamos qué dice la numerología sobre los números espejo, el 11 como número maestro y por qué lo vemos tanto.',
    category: 'Numerología',
    date: '2026-04-28',
  },
  {
    slug: 'camino-de-vida-11-numero-maestro',
    title: 'Camino de Vida 11: el número maestro de la intuición',
    excerpt: 'El Camino de Vida 11 es el más sensible e intuitivo de los números maestros. No se reduce a 2. Te explicamos qué implica, sus desafíos y su potencial de vida.',
    category: 'Numerología',
    date: '2026-04-10',
  },
  {
    slug: 'revolucion-solar-que-es-como-calcularla',
    title: 'Revolución solar: qué es, cómo se calcula y para qué sirve',
    excerpt: 'La revolución solar es la carta natal de tu año. Se calcula en el momento exacto en que el Sol vuelve al grado preciso donde estaba cuando naciste. Guía completa.',
    category: 'Astrología',
    date: '2026-03-22',
  },
];

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE}/blog/#blog`,
  name: 'Blog de Cosmyastral',
  url: `${SITE}/blog/`,
  description: 'Guías, explicaciones y lecturas honestas sobre astrología y numerología en español.',
  inLanguage: 'es',
  publisher: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Cosmyastral' },
  blogPost: POSTS.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `${SITE}/blog/${p.slug}/`,
    datePublished: p.date,
    description: p.excerpt,
    articleSection: p.category,
  })),
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogSchema} />
      <Breadcrumb crumbs={[{ label: 'Blog', href: '/blog/' }]} />

      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,80px) 32px', textAlign: 'center', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p className="eyebrow">Astrología · Numerología · Ciclos</p>
          <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(2.2rem,4.5vw,3.6rem)', lineHeight: 1.12, color: 'var(--ink)', marginBottom: '20px' }}>
            Blog
          </h1>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.15rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
            Guías y explicaciones honestas sobre astrología y numerología. Sin predicciones mágicas ni fórmulas esotéricas vacías.
          </p>
        </div>
      </section>

      <BlogPosts posts={POSTS} />
    </>
  );
}
