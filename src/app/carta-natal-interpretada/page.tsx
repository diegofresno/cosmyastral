import { headers } from 'next/headers';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

const SITE = 'https://cosmyastral.com';
const LATAM = new Set(['AR','MX','CO','CL','PE','VE','BO','EC','PY','UY','CR','GT','HN','SV','NI','PA','DO','CU','PR']);

export const metadata: Metadata = {
  title: 'Carta Natal Interpretada — Estudio Personalizado en PDF',
  description:
    'Tu carta natal interpretada en profundidad: Sol, Luna, Ascendente, planetas, casas y Quirón. Más de 10.000 palabras de interpretación narrativa. PDF personalizado. Entrega en 24-48 horas.',
  alternates: { canonical: '/carta-natal-interpretada/' },
  openGraph: {
    title: 'Carta Natal Interpretada — Cosmyastral',
    description: 'Más de 10.000 palabras de interpretación narrativa personalizada. Cálculo con Swiss Ephemeris. PDF entregado en 24-48 horas.',
    images: [{ url: `${SITE}/blog/blog-carta-natal.png`, width: 1200, height: 630 }],
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Carta natal interpretada',
  description: 'Interpretación astrológica personalizada: Sol, Luna, Ascendente, planetas, casas, aspectos, Quirón, Nodos, síntesis. Más de 10.000 palabras en PDF.',
  url: `${SITE}/carta-natal-interpretada/`,
  image: `${SITE}/blog/blog-carta-natal.png`,
  brand: { '@type': 'Brand', name: 'Cosmyastral' },
  offers: [
    {
      '@type': 'Offer',
      name: 'España',
      price: '29',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE}/carta-natal-interpretada/`,
      eligibleRegion: { '@type': 'Country', name: 'España' },
    },
    {
      '@type': 'Offer',
      name: 'Latinoamérica',
      price: '14',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE}/carta-natal-interpretada/`,
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Qué es exactamente lo que voy a recibir?', acceptedAnswer: { '@type': 'Answer', text: 'Un PDF personalizado con más de 10.000 palabras de interpretación narrativa de tu carta natal, calculada con Swiss Ephemeris. Incluye Big Three (Sol, Luna, Ascendente), planetas personales y transpersonales, casas astrológicas, Quirón, Nodos lunares, aspectos clave y síntesis final. También incluye la rueda zodiacal SVG de tu carta.' } },
    { '@type': 'Question', name: '¿Necesito saber astrología para entenderlo?', acceptedAnswer: { '@type': 'Answer', text: 'No. El informe está escrito en un español cuidado y comprensible para cualquier persona, sin tecnicismos. Si es la primera vez que te acercas a la astrología, encontrarás el contexto necesario para entender cada sección.' } },
    { '@type': 'Question', name: '¿Necesito saber mi hora de nacimiento?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, la hora es fundamental para calcular el Ascendente y las casas astrológicas. Te recomendamos buscarla en tu partida de nacimiento o consultar con familiares. Si solo tienes una hora aproximada, escríbenos y evaluamos qué se puede hacer.' } },
    { '@type': 'Question', name: '¿En cuánto tiempo lo recibo?', acceptedAnswer: { '@type': 'Answer', text: 'En un plazo de 24 a 48 horas desde que nos envías tus datos de nacimiento. Te llega directamente a tu correo electrónico en formato PDF.' } },
    { '@type': 'Question', name: '¿Puedo pedirlo para otra persona?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Durante el proceso de pedido puedes indicar que es un regalo e introducir los datos de nacimiento de la otra persona.' } },
    { '@type': 'Question', name: '¿Qué métodos de pago aceptáis?', acceptedAnswer: { '@type': 'Answer', text: 'Tarjeta de crédito y débito, y otros métodos disponibles según tu país.' } },
    { '@type': 'Question', name: '¿Hay garantía de devolución?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Si el estudio no te convence por cualquier motivo, tienes 7 días desde la entrega para solicitar el reembolso completo. Sin preguntas.' } },
  ],
};

const SECTIONS = [
  { glyph: '☉', title: 'Big Three: Sol, Luna, Ascendente', desc: 'Tu esencia, tu mundo emocional y la máscara que presentas al mundo. Los tres pilares de tu carta y cómo se relacionan entre sí.' },
  { glyph: '☿', title: 'Planetas personales', desc: 'Mercurio (comunicación y mente), Venus (afectos y valores), Marte (acción y deseo). Cómo piensas, cómo amas, cómo actúas.' },
  { glyph: '♃', title: 'Planetas sociales y transpersonales', desc: 'Júpiter, Saturno, Urano, Neptuno y Plutón. Tus patrones generacionales, tus mayores retos y tu potencial de transformación.' },
  { glyph: '⌂', title: 'Casas astrológicas', desc: 'Las 12 áreas de la vida y qué planetas las habitan. Trabajo, amor, familia, dinero, propósito — cada casa tiene algo que decirte.' },
  { glyph: '⚷', title: 'Quirón y Nodos lunares', desc: 'Tu herida sanadora y tu eje evolutivo. Qué viniste a aprender y qué patrones del pasado estás aquí para trascender.' },
  { glyph: '✦', title: 'Aspectos clave y síntesis final', desc: 'Las configuraciones más importantes de tu carta y una síntesis integradora que conecta todos los elementos en una lectura coherente.' },
];

const CONTENIDO_ITEMS = [
  { label: 'Interpretación narrativa del Big Three', sub: 'Sol, Luna y Ascendente con profundidad' },
  { label: 'Todos los planetas por signo y casa', sub: 'Con su significado psicológico' },
  { label: 'Quirón y Nodos lunares', sub: 'El eje evolutivo de tu carta' },
  { label: 'Aspectos y configuraciones especiales', sub: 'Los patrones más relevantes' },
  { label: 'Síntesis final integradora', sub: 'Todo conectado en una lectura coherente' },
  { label: 'Rueda zodiacal SVG de tu carta', sub: 'El gráfico de tus posiciones exactas' },
];

const COMO_ITEMS = [
  { label: 'Calculado con Swiss Ephemeris', sub: 'El software astronómico de referencia' },
  { label: 'Escrito en español cuidado', sub: 'Sin tecnicismos, sin jerga imposible' },
  { label: 'Astrología no predictiva', sub: 'Describe climas y potenciales, no dicta destinos' },
  { label: 'PDF para descargar y releer', sub: 'Desde cualquier dispositivo, para siempre' },
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
  'No tengo ni idea de mi hora de nacimiento (es necesaria)',
  'Prefiero una consulta oral en directo con un astrólogo',
];

const STEPS = [
  { num: '01', title: 'Completa el pedido', desc: 'Elige el estudio y completa el proceso de pago de forma segura. Solo tarda un par de minutos.' },
  { num: '02', title: 'Nos envías tus datos', desc: 'Te llegará un email para confirmar tu fecha, hora y lugar exacto de nacimiento.' },
  { num: '03', title: 'Recibes tu PDF', desc: 'En un plazo de 24 a 48 horas tu carta natal interpretada llega a tu correo, lista para descargar.' },
];

const FAQS = [
  { q: '¿Qué es exactamente lo que voy a recibir?', a: 'Un PDF personalizado con más de 10.000 palabras de interpretación narrativa de tu carta natal, calculada con Swiss Ephemeris. Incluye Big Three, planetas personales y transpersonales, casas, Quirón, Nodos lunares, aspectos clave, síntesis final y la rueda zodiacal SVG de tu carta.' },
  { q: '¿Necesito saber astrología para entenderlo?', a: 'No. El informe está escrito en un español cuidado y comprensible para cualquier persona. Si es la primera vez que te acercas a la astrología, encontrarás el contexto necesario para entender cada sección sin tecnicismos.' },
  { q: '¿Necesito saber mi hora de nacimiento?', a: 'Sí, la hora es fundamental para calcular el Ascendente y las casas astrológicas. Te recomendamos buscarla en tu partida de nacimiento o consultar con familiares. Si solo tienes una hora aproximada, escríbenos y evaluamos qué se puede hacer.' },
  { q: '¿En cuánto tiempo lo recibo?', a: 'En un plazo de 24 a 48 horas desde que nos envías tus datos de nacimiento. Te llega directamente a tu correo electrónico en formato PDF, listo para descargar.' },
  { q: '¿Puedo pedirlo para otra persona?', a: 'Sí. Durante el proceso de pedido puedes indicar que es un regalo e introducir los datos de nacimiento de la otra persona.' },
  { q: '¿Qué métodos de pago aceptáis?', a: 'Tarjeta de crédito y débito, y otros métodos disponibles según tu país a través de la plataforma de pago.' },
  { q: '¿Hay garantía de devolución?', a: 'Sí. Si el estudio no te convence por cualquier motivo, tienes 7 días desde la entrega para solicitar el reembolso completo. Sin preguntas.' },
];

// Sustituir por testimonios reales de beta testers
const TESTIMONIALS = [
  {
    text: 'Calculé mi carta hace años en varias webs y nunca entendí bien qué significaba todo. Este estudio fue la primera vez que realmente conecté con lo que la astrología me decía sobre mí misma. Me lo he leído tres veces.',
    author: 'Laura M.',
    location: 'Madrid',
  },
  {
    text: 'El análisis del Ascendente y los Nodos lunares me dejó sin palabras. Describía exactamente los patrones que llevo trabajando en terapia estos últimos años, pero desde una perspectiva completamente diferente.',
    author: 'Valentina S.',
    location: 'Buenos Aires',
  },
  {
    text: 'Esperaba algo genérico y recibí algo que parecía escrito solo para mí. La sección de Venus en mi carta me hizo entender por qué tengo ciertos patrones en las relaciones que no podía explicarme.',
    author: 'Claudia R.',
    location: 'México D.F.',
  },
];

const STATS = [
  { num: '+10.000', label: 'palabras de interpretación' },
  { num: '12', label: 'secciones temáticas' },
  { num: 'Swiss Ephemeris', label: 'cálculo astronómico' },
  { num: '7 días', label: 'de garantía de devolución' },
];

export default async function CartaNatalInterpretadaPage() {
  const hdrs = await headers();
  const country = (hdrs.get('x-vercel-ip-country') ?? 'ES').toUpperCase();
  const isLatam = LATAM.has(country);
  const price = isLatam ? 14 : 29;

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb crumbs={[
        { label: 'Estudios PDF', href: '/precios/' },
        { label: 'Carta natal interpretada', href: '/carta-natal-interpretada/' },
      ]} />

      {/* ── HERO ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,80px) 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <p className="eyebrow">✦ Estudio personalizado en PDF ✦</p>
            <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(2.4rem,5vw,3.8rem)', lineHeight: 1.08, color: 'var(--ink)', marginBottom: '24px', letterSpacing: '-.015em' }}>
              Tu carta natal,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--brown)' }}>interpretada en profundidad</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.15rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '36px', maxWidth: '480px' }}>
              Más de 10.000 palabras de interpretación narrativa personalizada. Tu Sol, Luna, Ascendente y todos los planetas explicados en un español cuidado, en PDF, para leer y releer.
            </p>
            <Link href="/pedir/carta-natal/" className="btn btn-accent btn-xl">
              Quiero mi carta natal →
            </Link>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
              {['✦ Pago 100% seguro', '✦ Entrega en 24-48 horas', '✦ 7 días de garantía'].map(t => (
                <span key={t} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)' }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(61,43,31,.18)' }}>
            <Image
              src="/landing-carta-natal-hero.png"
              alt="Manos sosteniendo una rueda zodiacal iluminada con los signos del zodiaco"
              width={2560}
              height={1664}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* ── PAIN ── */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(56px,7vw,80px) 32px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Quizás te pasó esto</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.8vw,3rem)', lineHeight: 1.18, color: 'var(--ink)', marginBottom: '24px', textAlign: 'center' }}>
            ¿Calculaste tu carta natal y no supiste qué hacer con ella?
          </h2>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '36px', textAlign: 'center' }}>
            Viste los planetas, los signos, las casas. Quizás alguien te dijo que eres Sol en Tauro con Luna en Virgo. Pero ¿qué significa eso para tu vida real? ¿Qué te dice sobre cómo amas, qué temes o qué viniste a aprender?
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              'Sabes tu signo solar pero quieres entender todos los demás planetas',
              'Sientes que algo en ti está cambiando y la astrología puede darte contexto',
              'Usas apps de carta natal pero el resultado siempre se queda corto',
              'Quieres algo profundo y narrativo, no una lista de atributos genéricos',
              'Llevas tiempo queriendo conocerte mejor y esto podría ser la herramienta',
              'Quieres un material que puedas releer cada vez que lo necesites',
            ].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontFamily: 'var(--font-garamond)', fontSize: '1.08rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }}>✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── LO QUE VAS A LEER ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(56px,7vw,80px) 32px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Lo que vas a leer</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.18, color: 'var(--ink)', marginBottom: '16px', textAlign: 'center' }}>
            El informe cubre cada dimensión de tu carta.
          </h2>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: 1.65, textAlign: 'center', maxWidth: '580px', margin: '0 auto 48px' }}>
            No es un resumen de cuatro líneas. Son más de 10.000 palabras organizadas en secciones que se leen de forma independiente o de principio a fin.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {SECTIONS.map(({ glyph, title, desc }) => (
              <div key={title} style={{ background: 'var(--bg-warm)', border: '1px solid var(--line)', borderRadius: '10px', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.8rem', color: 'var(--gold)', lineHeight: 1 }}>{glyph}</div>
                <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.1rem', color: 'var(--ink)', margin: 0, lineHeight: 1.3 }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.97rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TODO INCLUIDO ── */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(56px,7vw,80px) 32px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Todo incluido</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.18, color: 'var(--ink)', marginBottom: '48px', textAlign: 'center' }}>
            Un PDF completo, personalizado.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '10px', padding: '32px 28px' }}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: '20px' }}>El informe incluye</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {CONTENIDO_ITEMS.map(({ label, sub }) => (
                  <li key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px', fontSize: '0.8rem' }}>✦</span>
                    <div>
                      <span style={{ fontFamily: 'var(--font-garamond)', fontWeight: 600, fontSize: '1rem', color: 'var(--ink)' }}>{label}</span>
                      <br />
                      <span style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.92rem', color: 'var(--ink-mute)' }}>{sub}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '10px', padding: '32px 28px' }}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: '20px' }}>Cómo está hecho</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {COMO_ITEMS.map(({ label, sub }) => (
                  <li key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px', fontSize: '0.8rem' }}>✦</span>
                    <div>
                      <span style={{ fontFamily: 'var(--font-garamond)', fontWeight: 600, fontSize: '1rem', color: 'var(--ink)' }}>{label}</span>
                      <br />
                      <span style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.92rem', color: 'var(--ink-mute)' }}>{sub}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
              <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '20px' }}>Es para mí si…</h3>
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
              <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '20px' }}>No es para mí si…</h3>
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
          <p className="eyebrow" style={{ textAlign: 'center' }}>El proceso</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.18, color: 'var(--ink)', marginBottom: '48px', textAlign: 'center' }}>
            Recibir tu carta nunca fue tan sencillo.
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

      {/* ── CAJA DE PRECIO ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(56px,7vw,80px) 32px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>Resumen de la oferta</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.18, color: 'var(--ink)', marginBottom: '32px', textAlign: 'center' }}>
            Esto es todo lo que te llevas.
          </h2>
          <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(61,43,31,.15)', marginBottom: '28px' }}>
            <Image
              src="/landing-carta-natal-mockup.png"
              alt="Estudio de carta natal impreso sobre una mesa de madera oscura con esfera de cristal y flores secas"
              width={2432}
              height={1792}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div style={{ background: 'var(--bg-warm)', border: '1px solid var(--line)', borderRadius: '12px', padding: '36px 32px' }}>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {[
                ['Interpretación narrativa del Big Three', 'Sol, Luna y Ascendente'],
                ['Todos los planetas por signo y casa', 'Con significado psicológico'],
                ['Quirón y Nodos lunares', 'Tu eje evolutivo'],
                ['Aspectos clave y síntesis final', 'Todo conectado'],
                ['Rueda zodiacal SVG', 'El gráfico de tu carta'],
              ].map(([label, sub]) => (
                <li key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--line-soft)' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink)', fontWeight: 500 }}>{label}</span>
                    <br />
                    <span style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.9rem', color: 'var(--ink-mute)' }}>{sub}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, whiteSpace: 'nowrap' }}>incluido</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: '6px' }}>Carta natal interpretada</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)', margin: 0 }}>{isLatam ? 'Precio LATAM' : 'Precio España'}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '3rem', color: 'var(--ink)', lineHeight: 1 }}>{price} €</span>
              </div>
            </div>
            <Link href="/pedir/carta-natal/" className="btn btn-accent btn-xl btn-block">
              Quiero mi carta natal →
            </Link>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: 'var(--ink-mute)', marginTop: '14px' }}>
              Pago seguro · Entrega en 24-48 horas · 7 días de garantía
            </p>
          </div>
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
            {TESTIMONIALS.map(({ text, author, location }) => (
              <figure key={author} style={{ margin: 0, background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '10px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ color: 'var(--gold)', fontSize: '1rem', letterSpacing: '3px' }}>★★★★★</div>
                <blockquote style={{ margin: 0, fontFamily: 'var(--font-garamond)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.65 }}>
                  &ldquo;{text}&rdquo;
                </blockquote>
                <figcaption style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--line-soft)' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink)' }}>{author}</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)' }}> · {location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {STATS.map(({ num, label }) => (
            <div key={label} style={{ padding: '28px 24px', textAlign: 'center', borderRight: '1px solid var(--line)' }}
              className="stat-cell">
              <div style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', color: 'var(--accent)', lineHeight: 1.1, marginBottom: '6px' }}>{num}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'var(--ink-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(56px,7vw,80px) 32px' }}>
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

      {/* ── CTA CIERRE ── */}
      <section style={{ position: 'relative', padding: 'clamp(80px,11vw,140px) 32px', textAlign: 'center', overflow: 'hidden' }}>
        {/* fondo */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/landing-carta-natal-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center 40%', zIndex: 0 }} />
        {/* overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,7,3,.82) 0%, rgba(14,7,3,.90) 100%)', zIndex: 1 }} />
        {/* contenido */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>Una última cosa</p>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(2rem,4.5vw,3.6rem)', lineHeight: 1.12, color: 'var(--bg)', marginBottom: '20px' }}>
            Naciste con un mapa.<br />La mayoría nunca llega a leerlo.
          </h2>
          <p style={{ fontFamily: 'var(--font-garamond)', fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(247,238,219,.72)', marginBottom: '40px', lineHeight: 1.65 }}>
            El tuyo tiene más de 10.000 palabras escritas sobre el segundo exacto en que llegaste al mundo. Está a 48 horas de distancia.
          </p>
          <Link href="/pedir/carta-natal/" className="btn btn-gold btn-xl">
            Pedir mi carta natal →
          </Link>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'rgba(247,238,219,.35)', marginTop: '20px' }}>
            Pago seguro · Entrega en 24-48 horas · 7 días de garantía
          </p>
        </div>
      </section>
    </>
  );
}
