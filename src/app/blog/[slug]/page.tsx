import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import { POSTS } from '@/app/blog/page';

const SITE = 'https://cosmyastral.com';

// Placeholder content for each post until MDX is set up
const CONTENT: Record<string, { body: string; readingTime: string }> = {
  'carta-natal-gratis-explicada': {
    readingTime: '8 min',
    body: `
La carta natal es el mapa del cielo en el momento exacto en que naciste. No es una predicción: es una descripción de las energías que estaban en juego cuando llegaste al mundo, y de los patrones que tiendes a repetir a lo largo de tu vida.

## Qué es exactamente una carta natal

Una carta natal (también llamada carta astral, tema natal u horóscopo natal) es un diagrama circular dividido en 12 sectores —las casas— que muestra la posición de los planetas en los signos del zodíaco en el momento preciso de tu nacimiento.

Para calcularla con precisión necesitas tres datos: fecha, hora y lugar de nacimiento. La hora es especialmente importante porque determina el Ascendente (qué signo salía por el horizonte) y las cúspides de las 12 casas, que cambian cada dos horas aproximadamente.

## Los tres elementos principales

**El Sol** representa tu identidad central, tu propósito vital y la forma en que quieres brillar en el mundo. Es el elemento más conocido del horóscopo popular, pero en astrología natal es solo uno de los doce factores importantes.

**La Luna** describe tu mundo emocional: cómo reaccionas instintivamente, qué necesitas para sentirte seguro, y tu relación con el pasado y la familia. La Luna cambia de signo cada 2-3 días, por lo que es mucho más personal que el Sol.

**El Ascendente** es la "máscara" que muestras al mundo: tu imagen pública, primera impresión y forma de proyectarte. Cambia de signo cada 2 horas, por eso es el factor más individualizado de toda la carta.

## Los planetas en los signos

Más allá del Big Three, tu carta natal incluye Mercurio (mente y comunicación), Venus (amor y valores), Marte (acción y deseo), Júpiter (expansión), Saturno (disciplina y límites), Urano (originalidad), Neptuno (espiritualidad) y Plutón (transformación).

Cada planeta en un signo describe una forma particular de expresar esa energía. Mercurio en Virgo piensa de forma analítica y detallista. Venus en Aries ama con impulsividad y directness. No hay combinaciones mejores ni peores —hay formas distintas de ser.

## Las casas astrológicas

Las 12 casas representan áreas de la vida: identidad, dinero, comunicación, hogar, creatividad, salud, relaciones, transformación, filosofía, carrera, comunidad y espiritualidad. Un planeta en una casa determinada concentra su energía en esa área.

## Por qué la hora de nacimiento importa tanto

Sin la hora exacta no se puede calcular el Ascendente ni las cúspides de las casas. Con un error de 30 minutos el Ascendente puede cambiar de signo, y todas las casas se desplazan. Si tienes dudas sobre tu hora de nacimiento, consulta tu partida de nacimiento o pregunta a tus padres.
    `,
  },
};

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE}/blog/${slug}/`,
      publishedTime: post.date,
      section: post.category,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = CONTENT[slug];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE}/blog/${slug}/#article`,
    headline: post.title,
    description: post.excerpt,
    url: `${SITE}/blog/${slug}/`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'es',
    articleSection: post.category,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Cosmyastral',
      url: SITE,
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE}/blog/#blog`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}/blog/${slug}/`,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <Breadcrumb
        crumbs={[
          { label: 'Blog', href: '/blog/' },
          { label: post.title },
        ]}
      />

      {/* ARTICLE HEADER */}
      <header style={{ background: 'var(--bg)', padding: 'clamp(40px,6vw,72px) 32px 0', textAlign: 'center', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>
              {post.category}
            </span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <time
              dateTime={post.date}
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'var(--ink-mute)' }}
            >
              {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {content && (
              <>
                <span style={{ color: 'var(--line)' }}>·</span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'var(--ink-mute)' }}>
                  {content.readingTime} lectura
                </span>
              </>
            )}
          </div>
          <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.9rem,4vw,3rem)', lineHeight: 1.2, color: 'var(--ink)', marginBottom: '20px' }}>
            {post.title}
          </h1>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.15rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '32px' }}>
            {post.excerpt}
          </p>
        </div>
        {/* Hero image placeholder */}
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'var(--bg-warm)', borderRadius: '8px 8px 0 0', aspectRatio: '21/9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line)', borderBottom: 'none' }}>
          <span style={{ fontFamily: 'var(--font-italianno)', fontSize: '4rem', color: 'var(--gold)', opacity: 0.3 }}>✦</span>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <article style={{ background: 'var(--bg)', padding: 'clamp(48px,6vw,80px) 32px' }}>
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            fontFamily: 'var(--font-garamond)',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: 'var(--ink-soft)',
          }}
        >
          {content ? (
            content.body.trim().split('\n\n').map((block, i) => {
              if (block.startsWith('## ')) {
                return (
                  <h2 key={i} style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: '1.6rem', color: 'var(--ink)', marginTop: '48px', marginBottom: '16px', lineHeight: 1.25 }}>
                    {block.replace('## ', '')}
                  </h2>
                );
              }
              return (
                <p key={i} style={{ marginBottom: '20px' }} dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
              );
            })
          ) : (
            <p style={{ fontStyle: 'italic', color: 'var(--ink-mute)' }}>
              Contenido del artículo próximamente.
            </p>
          )}
        </div>
      </article>

      {/* CTA BOTTOM */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(48px,6vw,72px) 32px', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">Calcula el tuyo gratis</span>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--ink)', marginBottom: '16px' }}>
            ¿Tienes curiosidad por la tuya?
          </h2>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.05rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '28px' }}>
            Calculadora gratuita. Sin registro. Resultado inmediato.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/carta-natal/" className="btn btn-accent btn-lg">Calcular carta natal gratis →</Link>
            <Link href="/precios/" className="btn btn-ghost btn-lg">Ver estudios PDF</Link>
          </div>
        </div>
      </section>

      {/* MORE POSTS */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,6vw,72px) 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: '1.6rem', color: 'var(--ink)', marginBottom: '24px' }}>
            Más artículos
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {POSTS.filter((p) => p.slug !== slug).slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} style={{ background: 'var(--bg-warm)', border: '1px solid var(--line)', borderRadius: '8px', padding: '20px', textDecoration: 'none' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>{p.category}</span>
                <h4 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.35 }}>{p.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
