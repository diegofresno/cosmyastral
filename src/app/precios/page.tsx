import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';

const SITE = 'https://cosmyastral.com';

export const metadata: Metadata = {
  title: 'Estudios Personalizados de Astrología y Numerología — Cosmyastral',
  description:
    'Carta natal interpretada desde 29 €, estudio numerológico desde 19 €, pack completo desde 39 €. Entrega en menos de 10 minutos, Swiss Ephemeris, 7 días de garantía.',
  alternates: { canonical: '/precios/' },
};

const ESTUDIOS = [
  {
    id: 'numerologia',
    name: 'Estudio numerológico completo',
    price_es: 19,
    price_latam: 9,
    pages: '52–60 páginas',
    items: [
      'Camino de Vida con interpretación extendida',
      'Número de Expresión (nombre completo)',
      'Alma (vocales) y Personalidad (consonantes)',
      'Número de Destino',
      '3 Ciclos de Vida y 4 Pináculos',
      'Año Personal del año en curso',
      'Números ausentes y kármicos',
      'PDF descargable · Entrega inmediata',
    ],
    schema_desc: '52–60 páginas de interpretación pitagórica: Camino de Vida, Expresión, Alma, Personalidad, Destino, Ciclos, Pináculos, Año Personal, lecciones kármicas.',
  },
  {
    id: 'carta-natal',
    name: 'Carta natal interpretada',
    price_es: 29,
    price_latam: 14,
    pages: '45–60 páginas',
    featured: true,
    items: [
      'Big Three: Sol, Luna, Ascendente',
      'Planetas personales (Mercurio, Venus, Marte)',
      'Planetas sociales y transpersonales',
      'Casas astrológicas y aspectos clave',
      'Quirón y Nodos lunares (eje evolutivo)',
      'Configuraciones especiales y síntesis',
      'Rueda zodiacal SVG incluida',
      'PDF descargable · Entrega inmediata',
    ],
    schema_desc: '45–60 páginas de interpretación: Sol, Luna, Ascendente, planetas, casas, aspectos, Quirón, Nodos, síntesis.',
  },
  {
    id: 'pack',
    name: 'Pack completo',
    price_es: 39,
    price_latam: 19,
    pages: '90–120 páginas',
    items: [
      'Carta natal interpretada completa',
      'Estudio numerológico completo',
      'Diálogo astrología–numerología',
      'Cómo se refuerzan ambos sistemas',
      'Síntesis final integrada',
      'Rueda zodiacal SVG incluida',
      'PDF descargable · Entrega inmediata',
      'Ahorro de 9 € respecto a por separado',
    ],
    schema_desc: 'Carta natal + numerología completa + diálogo entre ambas. 90–120 páginas.',
  },
];

const PRODUCT_IMAGES: Record<string, string> = {
  numerologia:  `${SITE}/blog/blog-camino-11.png`,
  'carta-natal': `${SITE}/blog/blog-carta-natal.png`,
  pack:         `${SITE}/blog/blog-luna-llena.png`,
};

const productSchemas = ESTUDIOS.map((e) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${SITE}/precios/#${e.id}`,
  name: e.name,
  description: e.schema_desc,
  url: `${SITE}/precios/`,
  image: PRODUCT_IMAGES[e.id],
  brand: { '@type': 'Brand', name: 'Cosmyastral' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Precio España',
      price: String(e.price_es),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE}/precios/`,
      eligibleRegion: { '@type': 'Country', name: 'España' },
    },
    {
      '@type': 'Offer',
      name: 'Precio LATAM',
      price: String(e.price_latam),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE}/precios/`,
    },
  ],
}));

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Estudios personalizados Cosmyastral',
  url: `${SITE}/precios/`,
  numberOfItems: ESTUDIOS.length,
  itemListElement: ESTUDIOS.map((e, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@id': `${SITE}/precios/#${e.id}` },
  })),
};

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true" style={{ margin: '0 auto' }}>
    <path d="M13 2L3 14h8v8l10-12h-8z" />
  </svg>
);

const GARANTIAS: { icon: ReactNode; title: string; desc: string }[] = [
  { icon: <BoltIcon />, title: 'Entrega en menos de 10 minutos', desc: 'Recibes el PDF en tu correo inmediatamente tras el pago. Sin esperas.' },
  { icon: '✦', title: 'Cálculo con Swiss Ephemeris', desc: 'El mismo software astronómico que usa astro.com. Posiciones exactas al segundo de arco.' },
  { icon: '↩', title: '7 días de garantía', desc: 'Si el estudio no te convence por cualquier motivo, te devolvemos el dinero.' },
  { icon: '☽', title: 'Interpretación narrativa', desc: 'No tablas ni listas. Texto continuo, escrito en un español cuidado y comprensible.' },
];

const FAQS = [
  { q: '¿Cómo recibo el PDF?', a: 'Lo recibes en tu correo electrónico en menos de 10 minutos tras el pago. También queda guardado en tu cuenta por si necesitas descargarlo de nuevo.' },
  { q: '¿Necesito saber mi hora de nacimiento?', a: 'Para la carta natal sí, es fundamental (la precisamos para el Ascendente y las casas). Para el estudio numerológico solo necesitamos tu fecha de nacimiento y nombre completo.' },
  { q: '¿Los precios para LATAM son los mismos?', a: 'No. Hay precios adaptados para España (€) y para Latinoamérica. Los precios LATAM son aproximadamente la mitad. Se aplican automáticamente según tu ubicación.' },
  { q: '¿Qué pasa si tengo alguna duda sobre el estudio?', a: 'Puedes escribirnos a través del formulario de contacto. Respondemos en 48 horas.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function PreciosPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      {productSchemas.map((s) => <JsonLd key={s['@id']} data={s} />)}
      <JsonLd data={faqSchema} />
      <Breadcrumb crumbs={[{ label: 'Estudios PDF', href: '/precios/' }]} />

      {/* HERO */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,80px) 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p className="eyebrow">Estudios personalizados</p>
          <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(2rem,4.5vw,3.4rem)', lineHeight: 1.15, color: 'var(--ink)', marginBottom: '20px' }}>
            Más que datos: una lectura que puedes leer
          </h1>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.15rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
            Los estudios gratuitos te dan las posiciones. Los estudios premium te explican qué significan. 45–120 páginas de interpretación narrativa en PDF, entregadas en menos de 10 minutos.
          </p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(48px,6vw,72px) 32px clamp(80px,10vw,120px)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {ESTUDIOS.map((e) => (
            <div
              key={e.id}
              id={e.id}
              style={{
                background: e.featured ? 'var(--accent)' : 'var(--bg)',
                border: `1px solid ${e.featured ? 'var(--accent)' : 'var(--line)'}`,
                borderRadius: '10px',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                position: 'relative',
                ...(e.featured ? { transform: 'translateY(-12px)', boxShadow: '0 24px 48px -16px rgba(107,31,42,.4)' } : {}),
              }}
            >
              {e.featured && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'var(--ink)', fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 12px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                  Más popular
                </div>
              )}
              <div>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: e.featured ? 'rgba(247,238,219,.6)' : 'var(--ink-mute)', marginBottom: '10px' }}>
                  {e.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '2.8rem', lineHeight: 1, color: e.featured ? 'var(--bg)' : 'var(--ink)' }}>{e.price_es} €</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: e.featured ? 'rgba(247,238,219,.5)' : 'var(--ink-mute)' }}>ES</span>
                </div>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: e.featured ? 'rgba(247,238,219,.5)' : 'var(--ink-mute)', marginTop: '4px' }}>
                  {e.price_latam} € para LATAM · {e.pages}
                </p>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {e.items.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'var(--font-garamond)', fontSize: '0.98rem', color: e.featured ? 'rgba(247,238,219,.85)' : 'var(--ink-soft)', lineHeight: 1.4 }}>
                    <span style={{ color: e.featured ? 'var(--gold-soft)' : 'var(--gold)', fontSize: '0.75rem', marginTop: '4px', flexShrink: 0 }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/carta-natal/"
                className={`btn ${e.featured ? 'btn-gold' : 'btn-outline'}`}
                style={{ textAlign: 'center' }}
              >
                Pedir este estudio
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* GARANTIAS */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(64px,8vw,96px) 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="section-head">
            <span className="eyebrow">Por qué Cosmyastral</span>
            <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--ink)' }}>
              Lo que nos diferencia
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {GARANTIAS.map(({ icon, title, desc }) => (
              <div key={title} style={{ textAlign: 'center', padding: '32px 20px' }}>
                <span style={{ display: 'block', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '14px' }}>{icon}</span>
                <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.97rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(64px,8vw,96px) 32px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="section-head">
            <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--ink)' }}>Preguntas frecuentes</h2>
          </div>
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {FAQS.map(({ q, a }) => (
              <details key={q} style={{ borderBottom: '1px solid var(--line)', padding: '22px 0' }}>
                <summary style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.05rem', color: 'var(--ink)', cursor: 'pointer', listStyle: 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
                    <span>{q}</span>
                    <span className="faq-icon" style={{ color: 'var(--gold)', flexShrink: 0, fontSize: '1.3rem', lineHeight: 1 }}>+</span>
                  </div>
                </summary>
                <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.7, marginTop: '14px', paddingRight: '24px' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
