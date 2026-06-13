import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import BirthForm from '@/components/calculator/BirthForm';

const SITE = 'https://cosmyastral.com';

export const metadata: Metadata = {
  title: 'Calculadora de Carta Natal Gratis — Cosmyastral',
  description:
    'Calcula tu carta natal gratis con Swiss Ephemeris: posiciones planetarias exactas, casas astrológicas, Ascendente y aspectos. Sin registro. España y LATAM.',
  alternates: { canonical: '/carta-natal/' },
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE}/carta-natal/#app`,
  name: 'Calculadora de Carta Natal Cosmyastral',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  url: `${SITE}/carta-natal/`,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Calculadora gratuita de carta natal astrológica con Swiss Ephemeris. Posiciones planetarias, casas, Ascendente y aspectos para cualquier fecha, hora y lugar del mundo.',
  inLanguage: 'es',
};

const PLANETS = [
  { sym: '☉', name: 'Sol',      desc: 'Tu esencia, identidad central y propósito vital.' },
  { sym: '☽', name: 'Luna',     desc: 'Tu mundo emocional, instintos y necesidades internas.' },
  { sym: '↑',  name: 'Ascendente', desc: 'Cómo te percibes a ti mismo y cómo te perciben los demás.' },
  { sym: '☿', name: 'Mercurio', desc: 'Tu mente, comunicación y forma de procesar información.' },
  { sym: '♀', name: 'Venus',    desc: 'Tus valores, estética, atracción y forma de amar.' },
  { sym: '♂', name: 'Marte',   desc: 'Tu energía, acción, deseo y forma de afrontar conflictos.' },
  { sym: '♃', name: 'Júpiter',  desc: 'Tu expansión, filosofía de vida y áreas de abundancia.' },
  { sym: '♄', name: 'Saturno',  desc: 'Tu disciplina, límites y lecciones kármicas principales.' },
  { sym: '⛢', name: 'Urano',   desc: 'Tu originalidad, ruptura y necesidad de libertad.' },
  { sym: '♆', name: 'Neptuno',  desc: 'Tu espiritualidad, intuición y capacidad de disolución.' },
  { sym: '♇', name: 'Plutón',   desc: 'Tu transformación profunda, poder y regeneración.' },
  { sym: '⚷', name: 'Quirón',   desc: 'Tu herida principal y el camino hacia la sanación.' },
];

const FAQS = [
  { q: '¿Qué necesito para calcular mi carta natal?', a: 'Solo tu fecha de nacimiento, hora (lo más exacta posible) y ciudad de nacimiento. La hora es especialmente importante para el Ascendente y las casas astrológicas, que cambian cada dos horas.' },
  { q: '¿Qué diferencia hay entre la calculadora gratis y el estudio premium?', a: 'La calculadora te da las posiciones planetarias y un resumen básico. El estudio premium es una interpretación narrativa completa de 10.000 a 15.000 palabras que explica qué significa cada posición para ti específicamente.' },
  { q: '¿Con qué software se calculan las posiciones?', a: 'Usamos Swiss Ephemeris, la librería astronómica de referencia que usan Astrodienst (astro.com) y la mayoría de software astrológico profesional. Las posiciones son exactas hasta el segundo de arco.' },
  { q: '¿Qué es el sistema de casas Placidus?', a: 'Es el sistema de división del horóscopo en 12 casas más usado en astrología occidental. Las casas representan áreas de la vida (trabajo, amor, familia…) y su posición exacta depende de la hora y lugar de nacimiento.' },
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

export default function CartaNatalPage() {
  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb crumbs={[{ label: 'Carta natal', href: '/carta-natal/' }]} />

      {/* HERO */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,80px) 32px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p className="eyebrow">Calculadora gratuita · Swiss Ephemeris</p>
          <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(2rem,4.5vw,3.4rem)', lineHeight: 1.15, color: 'var(--ink)', marginBottom: '20px' }}>
            Tu carta natal, calculada con precisión astronómica
          </h1>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.15rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '40px' }}>
            Sol, Luna, Ascendente y los 10 planetas en sus casas exactas. Sin registro, sin pago.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section style={{ background: 'var(--bg)', padding: '32px 32px clamp(64px,8vw,96px)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <BirthForm type="natal" />
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(64px,8vw,96px) 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="section-head">
            <span className="eyebrow">Qué incluye</span>
            <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--ink)' }}>
              12 factores de tu carta natal
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {PLANETS.map(({ sym, name, desc }) => (
              <div key={name} style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.3rem', color: 'var(--gold)', width: '28px', textAlign: 'center' }}>{sym}</span>
                  <strong style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1rem', color: 'var(--ink)' }}>{name}</strong>
                </div>
                <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.55 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM CTA */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(64px,8vw,96px) 32px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">Estudio premium</span>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--ink)', marginBottom: '16px' }}>
            ¿Quieres que alguien te lo explique?
          </h2>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '36px' }}>
            La calculadora te da los datos crudos. El estudio premium los convierte en 10.000–15.000 palabras de interpretación narrativa personalizada, en PDF.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/precios/" className="btn btn-accent btn-lg">Ver estudio de carta natal · 29 €</Link>
            <Link href="/precios/" className="btn btn-ghost btn-lg">Ver todos los estudios</Link>
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
                <summary style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.05rem', color: 'var(--ink)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                  {q}<span style={{ color: 'var(--gold)', flexShrink: 0 }}>+</span>
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
