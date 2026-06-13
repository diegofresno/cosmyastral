import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import BirthForm from '@/components/calculator/BirthForm';

const SITE = 'https://cosmyastral.com';

export const metadata: Metadata = {
  title: 'Calcular Ascendente Gratis — Cosmyastral',
  description:
    'Calcula tu signo ascendente gratis. Solo necesitas fecha, hora exacta y ciudad de nacimiento. El ascendente cambia cada dos horas — descubre el tuyo.',
  alternates: { canonical: '/ascendente/' },
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE}/ascendente/#app`,
  name: 'Calculadora de Ascendente Cosmyastral',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  url: `${SITE}/ascendente/`,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Calculadora gratuita del signo ascendente. Requiere hora exacta de nacimiento. Cálculo con Swiss Ephemeris para máxima precisión.',
  inLanguage: 'es',
};

const SIGNOS = [
  { sym: '♈', name: 'Aries',       rasg: 'Directo, impulsivo, pionero. Proyección frontal y enérgica.' },
  { sym: '♉', name: 'Tauro',       rasg: 'Sereno, sensorial, constante. Presencia tranquila y fiable.' },
  { sym: '♊', name: 'Géminis',     rasg: 'Curioso, comunicativo, ágil. Primera impresión vivaz e intelectual.' },
  { sym: '♋', name: 'Cáncer',      rasg: 'Receptivo, protector, intuitivo. Aura cálida y empática.' },
  { sym: '♌', name: 'Leo',         rasg: 'Magnético, generoso, confiado. Presencia que atrae miradas.' },
  { sym: '♍', name: 'Virgo',       rasg: 'Preciso, analítico, servicial. Imagen cuidada y discreta.' },
  { sym: '♎', name: 'Libra',       rasg: 'Equilibrado, elegante, diplomático. Primera impresión armoniosa.' },
  { sym: '♏', name: 'Escorpio',    rasg: 'Intenso, reservado, magnético. Mirada profunda y presencia densa.' },
  { sym: '♐', name: 'Sagitario',   rasg: 'Expansivo, optimista, directo. Energía jovial y aventurera.' },
  { sym: '♑', name: 'Capricornio', rasg: 'Serio, ambicioso, estructurado. Imagen de autoridad y solidez.' },
  { sym: '♒', name: 'Acuario',     rasg: 'Original, independiente, visionario. Aura de singularidad.' },
  { sym: '♓', name: 'Piscis',      rasg: 'Sensible, adaptable, soñador. Presencia fluida y etérea.' },
];

const FAQS = [
  { q: '¿Por qué necesito la hora exacta de nacimiento?', a: 'El Ascendente es el signo que estaba saliendo por el horizonte en el momento preciso en que naciste. Como el zodíaco completa un ciclo en 24 horas, el Ascendente cambia de signo cada 2 horas aproximadamente. Un error de 30 minutos puede darte un ascendente diferente.' },
  { q: '¿Y si no sé mi hora de nacimiento?', a: 'Puedes consultar tu partida de nacimiento (especialmente en países como España o Argentina donde se registra la hora), o preguntar a tus padres. Si es imposible saberlo, la técnica de rectificación natal puede aproximarla estudiando eventos vitales importantes.' },
  { q: '¿Qué diferencia hay entre el Ascendente, el Sol y la Luna?', a: 'El Sol es tu esencia e identidad central. La Luna es tu mundo emocional. El Ascendente es tu máscara social: cómo te percibes a ti mismo y cómo te perciben los demás en el primer encuentro. Juntos forman el Big Three de tu carta natal.' },
  { q: '¿Puede cambiar mi Ascendente de signo según dónde nací?', a: 'Sí. La hora local y las coordenadas geográficas de tu lugar de nacimiento afectan directamente al Ascendente. Por eso la ciudad de nacimiento es un dato imprescindible.' },
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

export default function AscendentePage() {
  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb crumbs={[{ label: 'Ascendente', href: '/ascendente/' }]} />

      {/* HERO */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,80px) 32px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p className="eyebrow">Calculadora gratuita · Requiere hora exacta</p>
          <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(2rem,4.5vw,3.4rem)', lineHeight: 1.15, color: 'var(--ink)', marginBottom: '20px' }}>
            Tu signo ascendente: la primera impresión que das al mundo
          </h1>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.15rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '40px' }}>
            El ascendente cambia cada dos horas. Necesitas fecha, <strong>hora exacta</strong> y ciudad de nacimiento para calcularlo correctamente.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section style={{ background: 'var(--bg)', padding: '32px 32px clamp(64px,8vw,96px)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <BirthForm type="ascendente" />
        </div>
      </section>

      {/* 12 ASCENDENTES */}
      <section style={{ background: 'var(--bg-warm)', padding: 'clamp(64px,8vw,96px) 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <div className="section-head">
            <span className="eyebrow">Los 12 ascendentes</span>
            <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--ink)' }}>
              ¿Cuál es tu máscara social?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
            {SIGNOS.map(({ sym, name, rasg }) => (
              <div key={name} style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '8px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>{sym}</span>
                  <strong style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1rem', color: 'var(--ink)' }}>{name}</strong>
                </div>
                <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.92rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{rasg}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM CTA */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(64px,8vw,96px) 32px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">Carta natal completa</span>
          <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--ink)', marginBottom: '16px' }}>
            El Ascendente es solo una pieza del puzzle
          </h2>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '36px' }}>
            El Big Three (Sol, Luna, Ascendente) es el punto de partida. El estudio completo de carta natal incluye todos los planetas, las casas y cómo todo interactúa. 10.000–15.000 palabras en PDF.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/carta-natal/" className="btn btn-accent btn-lg">Calcular carta natal completa gratis</Link>
            <Link href="/precios/" className="btn btn-ghost btn-lg">Ver estudio premium · 29 €</Link>
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
