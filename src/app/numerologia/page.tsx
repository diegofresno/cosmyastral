import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import BirthForm from '@/components/calculator/BirthForm';

const SITE = 'https://cosmyastral.com';

export const metadata: Metadata = {
  title: 'Calculadora de Numerología Gratis — Cosmyastral',
  description:
    'Calcula tu numerología pitagórica: Camino de Vida, número de Expresión, Alma, Personalidad y Destino. Gratis, sin registro. España y LATAM.',
  alternates: { canonical: '/numerologia/' },
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE}/numerologia/#app`,
  name: 'Calculadora de Numerología Pitagórica Cosmyastral',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  url: `${SITE}/numerologia/`,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Calculadora gratuita de numerología pitagórica. Calcula Camino de Vida, Expresión, Alma, Personalidad, Destino, Ciclos y Año Personal.',
  inLanguage: 'es',
};

const NUMEROS = [
  { num: '1', name: 'Camino de Vida',   desc: 'El número más importante. Revela tu propósito de vida y los desafíos principales de tu encarnación.' },
  { num: '2', name: 'Expresión',        desc: 'Calculado con las letras de tu nombre completo. Describe tus talentos naturales y forma de expresarte.' },
  { num: '3', name: 'Alma',             desc: 'Solo las vocales de tu nombre. Representa tus deseos más profundos, motivaciones internas y anhelos del alma.' },
  { num: '4', name: 'Personalidad',     desc: 'Las consonantes de tu nombre. Cómo te perciben los demás antes de conocerte en profundidad.' },
  { num: '5', name: 'Número de Destino', desc: 'La suma de fecha + nombre completo. El propósito combinado de tu ser y tu encarnación.' },
  { num: '6', name: 'Año Personal',     desc: 'Cambia cada año. Indica el tema y las energías dominantes en el ciclo de 9 años en el que te encuentras.' },
];

const MAESTROS = [
  { num: '11', desc: 'Intuición elevada, misión espiritual. El más sensible de los números maestros.' },
  { num: '22', desc: 'El constructor maestro. Capacidad para materializar visiones a gran escala.' },
  { num: '33', desc: 'El maestro sanador. Entrega completa al servicio y la compasión universal.' },
];

const FAQS = [
  { q: '¿Qué es la numerología pitagórica?', a: 'Es el sistema numérico occidental más extendido, atribuido a Pitágoras. Asigna valores del 1 al 9 a cada letra del alfabeto (A=1, B=2… Z=8) y trabaja con las sumas reducidas de nombre y fecha de nacimiento para revelar patrones de personalidad y propósito.' },
  { q: '¿Qué diferencia hay entre Camino de Vida y número de Expresión?', a: 'El Camino de Vida se calcula solo con la fecha de nacimiento y representa tu propósito central. El número de Expresión usa el nombre completo de nacimiento y revela tus talentos y formas naturales de manifestarte en el mundo.' },
  { q: '¿Qué son los números maestros 11, 22 y 33?', a: 'Son números que NO se reducen en la numerología pitagórica. Contienen la frecuencia vibratoria doble del número base (11 = 2, 22 = 4, 33 = 6) pero con una intensidad y misión muy distintas. No son "mejores", sino más exigentes.' },
  { q: '¿Qué son los números kármicos 13, 14, 16 y 19?', a: 'Son deudas kármicas que aparecen antes de reducir a número final. Indican lecciones específicas que el alma viene a aprender en esta vida. Cada uno tiene un patrón de desafíos muy definido.' },
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

export default function NumerologiaPage() {
  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb crumbs={[{ label: 'Numerología', href: '/numerologia/' }]} />

      {/* HERO */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,80px) 32px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p className="eyebrow">Calculadora gratuita · Numerología pitagórica</p>
          <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(2rem,4.5vw,3.4rem)', lineHeight: 1.15, color: 'var(--ink)', marginBottom: '20px' }}>
            Los números detrás de tu nombre y tu fecha de nacimiento
          </h1>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.15rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '40px' }}>
            Camino de Vida, Expresión, Alma, Personalidad y Año Personal. Calculados con el sistema pitagórico clásico.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section style={{ background: 'var(--bg)', padding: '32px 32px clamp(64px,8vw,96px)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <BirthForm type="numerologia" />
        </div>
      </section>

      {/* NUMEROS */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(64px,8vw,96px) 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="section-head">
            <span className="eyebrow">Qué calculamos</span>
            <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--ink)' }}>
              Seis números, una vida
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {NUMEROS.map(({ num, name, desc }) => (
              <div key={name} style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '8px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-italianno)', fontSize: '2.2rem', color: 'var(--gold)', lineHeight: 1 }}>{num}</span>
                  <strong style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.05rem', color: 'var(--ink)' }}>{name}</strong>
                </div>
                <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.97rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Números maestros */}
          <div style={{ marginTop: '48px' }}>
            <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '20px', textAlign: 'center' }}>
              Números maestros
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {MAESTROS.map(({ num, desc }) => (
                <div key={num} style={{ background: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '2rem', color: 'var(--gold-soft)', marginBottom: '8px' }}>{num}</span>
                  <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.95rem', color: 'rgba(247,238,219,.8)', lineHeight: 1.55 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM CTA */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(64px,8vw,96px) 32px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">Estudio premium</span>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--ink)', marginBottom: '16px' }}>
            Los números calculados son el principio
          </h2>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '36px' }}>
            El estudio premium son 52–60 páginas de interpretación narrativa completa: qué significa cada número para ti, cómo interactúan entre sí y qué ciclos vitales te acompañan.
          </p>
          <Link href="/precios/" className="btn btn-accent btn-lg">Ver estudio numerológico · 19 €</Link>
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
