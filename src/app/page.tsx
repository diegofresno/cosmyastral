import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Cosmyastral · Carta natal y numerología narradas con cuidado',
  alternates: { canonical: '/' },
};

const FEATURES = [
  {
    icon: '☽',
    title: 'Carta natal completa',
    body: 'Sol, Luna, Ascendente y los 10 planetas con sus casas y aspectos. Narrativa de 10.000+ palabras.',
    href: '/carta-natal/',
    cta: 'Calcular gratis',
  },
  {
    icon: '✦',
    title: 'Numerología personal',
    body: 'Camino de vida, expresión, alma y destino según la numerología pitagórica clásica.',
    href: '/numerologia/',
    cta: 'Descubrir tus números',
  },
  {
    icon: '↑',
    title: 'Signo ascendente',
    body: 'El punto exacto del zodíaco que salía por el horizonte cuando naciste. Cambia cada dos horas.',
    href: '/ascendente/',
    cta: 'Calcular ascendente',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Introduces tu fecha, hora y lugar de nacimiento',
    body: 'Solo esos tres datos. El lugar se geolocaliza con coordenadas precisas para calcular el Ascendente y las casas.',
  },
  {
    step: '02',
    title: 'Swiss Ephemeris calcula las posiciones planetarias',
    body: 'La misma librería astronómica que usan los software de astrología profesional. Exactitud de segundos de arco.',
  },
  {
    step: '03',
    title: 'Recibes tu estudio en PDF con interpretación narrativa',
    body: 'No tablas ni listas. Una lectura continua, escrita para ti, de 10.000 a 15.000 palabras.',
  },
];

const FAQS = [
  {
    q: '¿Es realmente gratis la calculadora?',
    a: 'Sí. La calculadora y el resumen básico son completamente gratuitos. Los estudios completos en PDF son de pago.',
  },
  {
    q: '¿Con qué precisión se calculan las posiciones?',
    a: 'Usamos Swiss Ephemeris, el estándar astronómico de la astrología profesional. Solo necesitas la hora con un margen de ±10 minutos para tener el Ascendente correcto.',
  },
  {
    q: '¿Qué incluye el estudio premium?',
    a: 'Entre 10.000 y 15.000 palabras interpretando tu carta natal completa: Big Three, planetas personales, casas, aspectos clave, Quirón, Nodos lunares y síntesis final. En PDF descargable.',
  },
  {
    q: '¿Cuánto tarda en llegar el PDF?',
    a: 'Menos de 10 minutos tras el pago. Lo recibes en tu correo y queda disponible en tu cuenta.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      {/* ── HERO ── */}
      <section
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
          padding: 'clamp(80px, 10vw, 140px) 32px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <p className="eyebrow">Astrología · Numerología · España y LATAM</p>
          <h1
            style={{
              fontFamily: 'var(--font-garamond)',
              fontWeight: 400,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              lineHeight: 1.12,
              color: 'var(--ink)',
              marginBottom: '28px',
              letterSpacing: '-0.01em',
            }}
          >
            Lo que el cielo escribió{' '}
            <br />
            el día que naciste,{' '}
            <em style={{ color: 'var(--accent)' }}>narrado con cuidado.</em>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              color: 'var(--ink-soft)',
              lineHeight: 1.65,
              marginBottom: '44px',
              maxWidth: '600px',
              margin: '0 auto 44px',
            }}
          >
            Calculadora gratuita de carta natal y numerología. Estudios
            personalizados en PDF con cálculo astronómico profesional e
            interpretación narrativa.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/carta-natal/" className="btn btn-accent btn-xl">
              Calcular mi carta natal gratis →
            </Link>
            <Link href="/precios/" className="btn btn-ghost btn-xl">
              Ver estudios PDF
            </Link>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR PREVIEW ── */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(64px, 8vw, 96px) 32px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div className="section-head">
            <span className="eyebrow">Calculadora gratuita</span>
            <h2
              style={{
                fontFamily: 'var(--font-garamond)',
                fontWeight: 400,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: 'var(--ink)',
                lineHeight: 1.2,
              }}
            >
              Empieza ahora. Solo tres datos.
            </h2>
          </div>

          {/* Form mock */}
          <div
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: '1fr 1fr' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)' }}>Fecha de nacimiento</span>
                <input
                  type="date"
                  disabled
                  placeholder="DD/MM/AAAA"
                  style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--ink-soft)', cursor: 'not-allowed', opacity: 0.7 }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)' }}>Hora de nacimiento</span>
                <input
                  type="time"
                  disabled
                  placeholder="HH:MM"
                  style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--ink-soft)', cursor: 'not-allowed', opacity: 0.7 }}
                />
              </label>
            </div>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)' }}>Ciudad de nacimiento</span>
              <input
                type="text"
                disabled
                placeholder="p.ej. Madrid, España"
                style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--ink-soft)', cursor: 'not-allowed', opacity: 0.7 }}
              />
            </label>
            <Link href="/carta-natal/" className="btn btn-accent btn-block" style={{ textAlign: 'center' }}>
              Calcular carta natal gratis →
            </Link>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-garamond)', fontSize: '0.9rem', color: 'var(--ink-mute)' }}>
              Sin registro · Sin pago · Resultado inmediato
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(64px, 8vw, 96px) 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="section-head">
            <span className="eyebrow">Herramientas</span>
            <h2
              style={{
                fontFamily: 'var(--font-garamond)',
                fontWeight: 400,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: 'var(--ink)',
              }}
            >
              Todo lo que quieres saber sobre tu carta natal
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {FEATURES.map(({ icon, title, body, href, cta }) => (
              <div
                key={href}
                style={{
                  background: 'var(--bg-warm)',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span style={{ fontSize: '1.6rem', color: 'var(--gold)' }}>{icon}</span>
                <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.4rem', color: 'var(--ink)' }}>
                  {title}
                </h3>
                <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.6, flex: 1 }}>
                  {body}
                </p>
                <Link href={href} className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM ── */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(64px, 8vw, 96px) 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="section-head">
            <span className="eyebrow">Estudios premium</span>
            <h2
              style={{
                fontFamily: 'var(--font-garamond)',
                fontWeight: 400,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: 'var(--ink)',
                marginBottom: '16px',
              }}
            >
              Más que un resumen: una lectura completa
            </h2>
            <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.1rem', color: 'var(--ink-soft)', maxWidth: '600px', margin: '0 auto' }}>
              Los estudios gratuitos te dan los datos. Los estudios premium te explican
              qué significan para ti, con 10.000–15.000 palabras de interpretación narrativa.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { title: 'Numerología completa', price: '19 €', items: ['Camino de vida', 'Número de expresión', 'Alma y sombra', 'Ciclos y pináculos', 'Año personal'] },
              { title: 'Carta natal interpretada', price: '29 €', items: ['Big Three', 'Planetas personales', 'Casas y aspectos', 'Quirón + Nodos', 'Síntesis narrativa'], featured: true },
              { title: 'Pack completo', price: '39 €', items: ['Todo lo anterior', 'Diálogo astro-numerológico', 'PDF de 20.000+ palabras', 'Descarga inmediata', '—'] },
            ].map(({ title, price, items, featured }) => (
              <div
                key={title}
                style={{
                  background: featured ? 'var(--accent)' : 'var(--bg)',
                  border: `1px solid ${featured ? 'var(--accent)' : 'var(--line)'}`,
                  borderRadius: '8px',
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: featured ? 'rgba(247,238,219,.6)' : 'var(--ink-mute)', marginBottom: '8px' }}>
                    {title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '2.2rem', color: featured ? 'var(--bg)' : 'var(--ink)', lineHeight: 1 }}>
                    {price}
                    <span style={{ fontSize: '1rem', fontWeight: 400, marginLeft: '4px', opacity: 0.7 }}>ES</span>
                  </p>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  {items.map((item) => (
                    <li key={item} style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: featured ? 'rgba(247,238,219,.85)' : 'var(--ink-soft)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: featured ? 'var(--gold-soft)' : 'var(--gold)', fontSize: '0.8rem' }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/precios/"
                  className={`btn ${featured ? 'btn-gold' : 'btn-outline'}`}
                  style={{ textAlign: 'center' }}
                >
                  Ver detalles
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(64px, 8vw, 96px) 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="section-head">
            <span className="eyebrow">Cómo funciona</span>
            <h2
              style={{
                fontFamily: 'var(--font-garamond)',
                fontWeight: 400,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: 'var(--ink)',
              }}
            >
              Precisión astronómica, lenguaje humano
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {HOW_IT_WORKS.map(({ step, title, body }) => (
              <div key={step} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-italianno)',
                    fontSize: '3rem',
                    color: 'var(--gold)',
                    lineHeight: 1,
                    flexShrink: 0,
                    width: '56px',
                    textAlign: 'center',
                  }}
                >
                  {step}
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '8px' }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (placeholder) ── */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(64px, 8vw, 96px) 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="section-head">
            <span className="eyebrow">Lo que dicen</span>
            <h2
              style={{
                fontFamily: 'var(--font-garamond)',
                fontWeight: 400,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: 'var(--ink)',
              }}
            >
              Más de 14 estudios entregados
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Sara M.', city: 'Madrid', text: 'Es la primera vez que un estudio astrológico me dice algo que me resuena de verdad. No son generalidades, es específico y profundo.' },
              { name: 'Diego I.', city: 'Buenos Aires', text: 'La carta natal me la había calculado mil veces en otros sitios. Nunca había leído una interpretación tan completa y tan bien escrita.' },
              { name: 'Lucía R.', city: 'Ciudad de México', text: 'El estudio numerológico llegó en menos de 10 minutos y tiene más páginas de las que esperaba. Cada sección tiene mucho contenido.' },
            ].map(({ name, city, text }) => (
              <div
                key={name}
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  padding: '28px 24px',
                }}
              >
                <p style={{ fontFamily: 'var(--font-garamond)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '20px' }}>
                  &ldquo;{text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-warm)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)' }}>
                      {name[0]}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 500, fontSize: '0.85rem', color: 'var(--ink)' }}>{name}</p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'var(--ink-mute)' }}>{city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(64px, 8vw, 96px) 32px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="section-head">
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2
              style={{
                fontFamily: 'var(--font-garamond)',
                fontWeight: 400,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: 'var(--ink)',
              }}
            >
              Resolvemos tus dudas
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderTop: '1px solid var(--line)' }}>
            {FAQS.map(({ q, a }) => (
              <details key={q} style={{ borderBottom: '1px solid var(--line)', padding: '24px 0' }}>
                <summary
                  style={{
                    fontFamily: 'var(--font-garamond)',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  {q}
                  <span style={{ color: 'var(--gold)', fontSize: '1.2rem', flexShrink: 0 }}>+</span>
                </summary>
                <p
                  style={{
                    fontFamily: 'var(--font-garamond)',
                    fontSize: '1rem',
                    color: 'var(--ink-soft)',
                    lineHeight: 1.7,
                    marginTop: '16px',
                    paddingRight: '32px',
                  }}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section
        style={{
          background: 'var(--accent)',
          padding: 'clamp(64px, 8vw, 96px) 32px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-italianno)',
              fontSize: '1.3rem',
              color: 'rgba(247,238,219,.6)',
              letterSpacing: '0.12em',
              marginBottom: '16px',
            }}
          >
            Cosmyastral
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-garamond)',
              fontWeight: 400,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: 'var(--bg)',
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            Empieza por lo gratuito.
            <br />
            <em>Decide después.</em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: '1.1rem',
              color: 'rgba(247,238,219,.75)',
              marginBottom: '36px',
              lineHeight: 1.6,
            }}
          >
            La calculadora es gratis para siempre. El estudio premium, solo si
            quieres profundizar.
          </p>
          <Link href="/carta-natal/" className="btn btn-gold btn-xl">
            Calcular mi carta natal gratis →
          </Link>
        </div>
      </section>
    </>
  );
}
