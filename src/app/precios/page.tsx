import { headers } from 'next/headers';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

const SITE = 'https://cosmyastral.com';

const LATAM_COUNTRIES = new Set(['AR','MX','CO','CL','PE','VE','BO','EC','PY','UY','CR','GT','HN','SV','NI','PA','DO','CU','PR']);

export const metadata: Metadata = {
  title: 'Estudios Personalizados de Astrología y Numerología — Cosmyastral',
  description:
    'Carta natal interpretada desde 29 €, estudio numerológico desde 19 €, pack completo desde 39 €. Interpretación narrativa personalizada en PDF. Swiss Ephemeris, 7 días de garantía.',
  alternates: { canonical: '/precios/' },
};

const ESTUDIOS = [
  {
    id: 'numerologia',
    name: 'Estudio numerológico completo',
    price_es: 19,
    price_latam: 9,
    pages: 'Interpretación narrativa personalizada',
    items: [
      'Camino de Vida con interpretación extendida',
      'Número de Expresión (nombre completo)',
      'Alma (vocales) y Personalidad (consonantes)',
      'Número de Destino',
      '3 Ciclos de Vida y 4 Pináculos',
      'Año Personal del año en curso',
      'Números ausentes y kármicos',
      'PDF descargable · Entrega en 24-48 horas',
    ],
    schema_desc: 'Interpretación pitagórica personalizada: Camino de Vida, Expresión, Alma, Personalidad, Destino, Ciclos, Pináculos, Año Personal, lecciones kármicas.',
  },
  {
    id: 'carta-natal',
    name: 'Carta natal interpretada',
    price_es: 29,
    price_latam: 14,
    pages: 'Interpretación narrativa personalizada',
    featured: true,
    items: [
      'Big Three: Sol, Luna, Ascendente',
      'Planetas personales (Mercurio, Venus, Marte)',
      'Planetas sociales y transpersonales',
      'Casas astrológicas y aspectos clave',
      'Quirón y Nodos lunares (eje evolutivo)',
      'Configuraciones especiales y síntesis',
      'Rueda zodiacal SVG incluida',
      'PDF descargable · Entrega en 24-48 horas',
    ],
    schema_desc: 'Interpretación astrológica personalizada: Sol, Luna, Ascendente, planetas, casas, aspectos, Quirón, Nodos, síntesis.',
  },
  {
    id: 'pack',
    name: 'Pack completo',
    price_es: 39,
    price_latam: 19,
    pages: 'Doble guía personalizada integrada',
    items: [
      'Carta natal interpretada completa',
      'Estudio numerológico completo',
      'Diálogo astrología–numerología',
      'Cómo se refuerzan ambos sistemas',
      'Síntesis final integrada',
      'Rueda zodiacal SVG incluida',
      'PDF descargable · Entrega en 24-48 horas',
      'Ahorro respecto a comprar por separado',
    ],
    schema_desc: 'Carta natal interpretada + estudio numerológico completo + diálogo entre ambas disciplinas y síntesis final integrada.',
  },
];

const PRODUCT_IMAGES: Record<string, string> = {
  numerologia:   `${SITE}/blog/blog-camino-11.png`,
  'carta-natal': `${SITE}/blog/blog-carta-natal.png`,
  pack:          `${SITE}/blog/blog-luna-llena.png`,
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

const FAQS = [
  {
    q: '¿Cómo recibo el PDF?',
    a: 'Tras el pago, te enviaremos un correo para confirmar tus datos de nacimiento. En un plazo de 24 a 48 horas recibirás tu estudio personalizado en PDF, listo para descargar y releer cuando quieras.',
  },
  {
    q: '¿Necesito saber mi hora de nacimiento?',
    a: 'Para la carta natal sí — la hora es fundamental para calcular el Ascendente y las casas astrológicas. Te recomendamos buscarla en tu partida de nacimiento o preguntar a familiares. Para el estudio numerológico solo necesitamos tu nombre completo y fecha de nacimiento.',
  },
  {
    q: '¿Cuál es la diferencia entre carta natal y numerología?',
    a: 'La carta natal es astrológica: trabaja con la posición exacta de los planetas en el momento de tu nacimiento. La numerología es vibracional: trabaja con el valor numérico de tu nombre y fecha de nacimiento. Son sistemas distintos que se complementan — por eso el pack incluye un diálogo entre ambas disciplinas.',
  },
  {
    q: '¿Los precios son los mismos para todos los países?',
    a: 'No. Hay precios adaptados para España y para Latinoamérica. Los precios LATAM son aproximadamente la mitad. Se aplican automáticamente según tu ubicación al entrar en la web.',
  },
  {
    q: '¿Puedo pedir el estudio para otra persona?',
    a: 'Sí. Durante el proceso de pedido puedes indicar que es para otra persona e introducir sus datos de nacimiento.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos tarjeta de crédito y débito, y otros métodos según tu país a través de la plataforma de pago.',
  },
  {
    q: '¿Hay garantía de devolución?',
    a: 'Sí. Si el estudio no te convence por cualquier motivo, tienes 7 días desde la entrega para solicitar el reembolso completo. Sin preguntas.',
  },
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

// Sustituir por testimonios reales de los beta testers
const TESTIMONIALS = [
  {
    text: 'Calculé mi carta hace años en varias webs y nunca entendí bien qué significaba todo. Este estudio fue la primera vez que realmente conecté con lo que la astrología me decía sobre mí misma. Me lo he leído tres veces.',
    author: 'Laura M.',
    location: 'Madrid',
    product: 'Carta natal interpretada',
  },
  {
    text: 'Empecé por la numerología porque me parecía lo más sencillo y acabé pidiendo la carta natal también. La forma en que está escrito es completamente diferente a lo que había leído en otras apps. Cercano, pero profundo.',
    author: 'Carolina R.',
    location: 'Buenos Aires',
    product: 'Pack completo',
  },
  {
    text: 'Lo que más me sorprendió fue el análisis del Camino de Vida. Describía patrones de mi vida que yo nunca había verbalizado. Se lo recomendé a mi hermana al día siguiente.',
    author: 'Inés P.',
    location: 'México D.F.',
    product: 'Estudio numerológico',
  },
];

const TRUST = ['✦ Pago 100% seguro', '✦ Entrega en 24-48 horas', '✦ 7 días de garantía'];

const PAIN_ITEMS = [
  'Sabes tu signo solar pero quieres entender todos los demás planetas',
  'Sientes que algo en ti está cambiando y la astrología puede darte contexto',
  'Usas apps de carta natal pero el resultado siempre se queda corto',
  'Quieres algo profundo y narrativo, no una lista de atributos genéricos',
  'Llevas tiempo queriendo conocerte mejor y esto podría ser la herramienta',
  'Quieres un material que puedas releer cada vez que lo necesites',
];

const SI_ITEMS = [
  'Quiero entender mi carta natal sin estudiar años de astrología',
  'Estoy en un momento de cambio y busco claridad interna',
  'Me gusta leer, subrayar y volver al material',
  'Busco autoconocimiento, no predicciones de la suerte',
  'Me conmueve cuando un texto me describe mejor que yo mismo/a',
  'Quiero algo que pueda releer cada vez que lo necesite',
];

const NO_ITEMS = [
  'Busco que me digan si voy a encontrar el amor o ganar dinero',
  'Quiero respuestas de "sí o no" para decisiones concretas',
  'Espero un libro impreso enviado a domicilio (es un PDF digital)',
  'No tengo idea de mi hora de nacimiento (la necesito para la carta natal)',
  'Prefiero una consulta en directo con un astrólogo en tiempo real',
];

const STEPS = [
  {
    num: '01',
    title: 'Elige tu estudio',
    desc: 'Selecciona la carta natal, la numerología o el pack completo. Completa el proceso de pago de forma segura.',
  },
  {
    num: '02',
    title: 'Nos envías tus datos',
    desc: 'Recibirás un email para confirmar tu fecha, hora y lugar de nacimiento (y nombre completo para la numerología).',
  },
  {
    num: '03',
    title: 'Recibes tu PDF',
    desc: 'En un plazo de 24 a 48 horas, tu estudio personalizado llegará a tu correo. Para guardar y releer cuando lo necesites.',
  },
];

export default async function PreciosPage() {
  const hdrs = await headers();
  const country = (hdrs.get('x-vercel-ip-country') ?? 'ES').toUpperCase();
  const isLatam = LATAM_COUNTRIES.has(country);

  return (
    <>
      <JsonLd data={itemListSchema} />
      {productSchemas.map((s) => <JsonLd key={s['@id']} data={s} />)}
      <JsonLd data={faqSchema} />
      <Breadcrumb crumbs={[{ label: 'Estudios PDF', href: '/precios/' }]} />

      {/* ── HERO ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(56px,8vw,96px) 32px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p className="eyebrow">✦ Estudios personalizados en PDF ✦</p>
          <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(2.2rem,5vw,3.8rem)', lineHeight: 1.12, color: 'var(--ink)', marginBottom: '22px', letterSpacing: '-.01em' }}>
            Tu carta natal, explicada como nunca te la contaron
          </h1>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.18rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '580px', margin: '0 auto 32px' }}>
            Un estudio personalizado en PDF que transforma los datos de tu carta en una interpretación narrativa que realmente puedes leer, entender y aplicar.
          </p>
          <Link href="#estudios" className="btn btn-accent btn-lg">
            Ver estudios →
          </Link>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px', flexWrap: 'wrap' }}>
            {TRUST.map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)', letterSpacing: '.02em' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN / EMPATÍA ── */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(56px,7vw,80px) 32px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Quizás te pasó esto</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.8vw,3rem)', lineHeight: 1.18, color: 'var(--ink)', marginBottom: '24px', textAlign: 'center' }}>
            ¿Calculaste tu carta natal y no supiste qué hacer con ella?
          </h2>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '36px', textAlign: 'center' }}>
            Viste los planetas, los signos, las casas. Quizás alguien te dijo tu Sol y tu Luna. Pero ¿qué significa eso para tu vida real? ¿Qué te dice sobre cómo amas, qué temes o qué viniste a aprender?
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {PAIN_ITEMS.map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontFamily: 'var(--font-garamond)', fontSize: '1.08rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }}>✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ES PARA MÍ / NO ES PARA MÍ ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(56px,7vw,80px) 32px' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Sinceridad ante todo</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.18, color: 'var(--ink)', marginBottom: '40px', textAlign: 'center' }}>
            ¿Cómo saber si es para mí?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'var(--bg-warm)', border: '1px solid var(--line)', borderRadius: '10px', padding: '32px 28px' }}>
              <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '20px' }}>
                Es para mí si…
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {SI_ITEMS.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0, fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'var(--bg-warm)', border: '1px solid var(--line)', borderRadius: '10px', padding: '32px 28px' }}>
              <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '20px' }}>
                No es para mí si…
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {NO_ITEMS.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0, fontWeight: 700 }}>×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(56px,7vw,80px) 32px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Cómo lo recibes</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.18, color: 'var(--ink)', marginBottom: '48px', textAlign: 'center' }}>
            Tener tu estudio nunca fue tan sencillo.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '10px', padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-garamond)', fontSize: '2.6rem', fontWeight: 400, color: 'var(--gold)', lineHeight: 1, marginBottom: '18px', opacity: 0.55 }}>{num}</div>
                <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '12px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section id="estudios" style={{ background: 'var(--bg)', padding: 'clamp(56px,7vw,88px) 32px' }}>
        <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Elige tu estudio</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.18, color: 'var(--ink)', marginBottom: isLatam ? '12px' : '40px', textAlign: 'center' }}>
            Esto es todo lo que te llevas.
          </h2>
          {isLatam && (
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)', marginBottom: '40px' }}>
              Precios adaptados para Latinoamérica
            </p>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {ESTUDIOS.map((e) => {
              const price    = isLatam ? e.price_latam : e.price_es;
              const altPrice = isLatam ? e.price_es    : e.price_latam;
              const altLabel = isLatam ? 'en España'   : 'en LATAM';

              return (
                <div
                  key={e.id}
                  id={e.id}
                  style={{
                    background: e.featured ? 'var(--accent)' : 'var(--bg-warm)',
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
                      <span style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '2.8rem', lineHeight: 1, color: e.featured ? 'var(--bg)' : 'var(--ink)' }}>
                        {price} €
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: e.featured ? 'rgba(247,238,219,.5)' : 'var(--ink-mute)', marginTop: '4px' }}>
                      {altPrice} € {altLabel} · {e.pages}
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
                    href={`/pedir/${e.id}/`}
                    className={`btn ${e.featured ? 'btn-gold' : 'btn-outline'}`}
                    style={{ textAlign: 'center' }}
                  >
                    Pedir este estudio
                  </Link>
                </div>
              );
            })}
          </div>
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)', marginTop: '28px' }}>
            Pago seguro · 7 días de garantía · Entrega en 24-48 horas
          </p>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(56px,7vw,80px) 32px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Lo que cuentan quienes ya lo recibieron</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.18, color: 'var(--ink)', marginBottom: '48px', textAlign: 'center' }}>
            En sus propias palabras.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {TESTIMONIALS.map(({ text, author, location, product }) => (
              <figure key={author} style={{ margin: 0, background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '10px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ color: 'var(--gold)', fontSize: '1rem', letterSpacing: '3px' }}>★★★★★</div>
                <blockquote style={{ margin: 0, fontFamily: 'var(--font-garamond)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.65 }}>
                  &ldquo;{text}&rdquo;
                </blockquote>
                <figcaption style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--line-soft)' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink)' }}>{author}</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)' }}> · {location} · {product}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(56px,7vw,80px) 32px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Resolvemos tus dudas</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'var(--ink)', marginBottom: '40px', textAlign: 'center' }}>
            Preguntas frecuentes.
          </h2>
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

      {/* ── CLOSING CTA ── */}
      <section style={{ background: 'var(--ink)', padding: 'clamp(72px,10vw,120px) 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>Última llamada</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(2rem,4.5vw,3.6rem)', lineHeight: 1.12, color: 'var(--bg)', marginBottom: '18px' }}>
            Tu carta ya está escrita en el cielo.
          </h2>
          <p style={{ fontFamily: 'var(--font-garamond)', fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(247,238,219,.75)', marginBottom: '36px', lineHeight: 1.6 }}>
            Solo falta que la leas.
          </p>
          <Link href="#estudios" className="btn btn-gold btn-xl">
            Elegir mi estudio →
          </Link>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'rgba(247,238,219,.4)', marginTop: '20px' }}>
            Pago seguro · Entrega en 24-48 horas · 7 días de garantía
          </p>
        </div>
      </section>
    </>
  );
}
