import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';

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
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Cosmyastral',
  },
  blogPost: POSTS.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `${SITE}/blog/${p.slug}/`,
    datePublished: p.date,
    description: p.excerpt,
    articleSection: p.category,
  })),
};

const CATS = ['Todos', 'Astrología', 'Numerología', 'Ciclos lunares'];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <JsonLd data={blogSchema} />
      <Breadcrumb crumbs={[{ label: 'Blog', href: '/blog/' }]} />

      {/* HERO */}
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

      {/* CATEGORIES */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)', padding: '0 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', display: 'flex', gap: '8px', padding: '16px 0', flexWrap: 'wrap' }}>
          {CATS.map((cat, i) => (
            <span
              key={cat}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.82rem',
                fontWeight: i === 0 ? 600 : 400,
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid var(--line)',
                color: i === 0 ? 'var(--bg)' : 'var(--ink-soft)',
                background: i === 0 ? 'var(--accent)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* POSTS */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,6vw,80px) 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>

          {/* Featured */}
          <Link
            href={`/blog/${featured.slug}/`}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', background: 'var(--bg-warm)', border: '1px solid var(--line)', borderRadius: '10px', padding: '40px', textDecoration: 'none', marginBottom: '32px' }}
            className="featured-post"
          >
            <div style={{ background: 'var(--bg)', borderRadius: '6px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-italianno)', fontSize: '3rem', color: 'var(--gold)', opacity: 0.5 }}>✦</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>{featured.category}</span>
                <span style={{ color: 'var(--line)', fontSize: '0.8rem' }}>·</span>
                <time style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'var(--ink-mute)' }}>{new Date(featured.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
              <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--ink)', lineHeight: 1.25 }}>{featured.title}</h2>
              <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>{featured.excerpt}</p>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.88rem', fontWeight: 500, color: 'var(--accent)' }}>Leer artículo →</span>
            </div>
          </Link>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                style={{ background: 'var(--bg-warm)', border: '1px solid var(--line)', borderRadius: '8px', textDecoration: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ background: 'var(--bg)', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--line)' }}>
                  <span style={{ fontFamily: 'var(--font-italianno)', fontSize: '2rem', color: 'var(--gold)', opacity: 0.4 }}>✦</span>
                </div>
                <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>{post.category}</span>
                    <span style={{ color: 'var(--line)' }}>·</span>
                    <time style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--ink-mute)' }}>{new Date(post.date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}</time>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: '1.2rem', color: 'var(--ink)', lineHeight: 1.3, flex: 1 }}>{post.title}</h2>
                  <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.92rem', color: 'var(--ink-soft)', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', fontWeight: 500, color: 'var(--accent)', marginTop: '4px' }}>Leer →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
