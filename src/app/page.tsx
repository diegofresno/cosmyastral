import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { WheelSvg, SunSvg, MoonSvg, StarSvg, OrnamentSvg } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Cosmyastral · Carta natal y numerología narradas con cuidado',
  description:
    'Calculadora de carta natal gratuita y estudios personalizados de astrología y numerología. Cálculo con Swiss Ephemeris, interpretación narrativa con revisión humana en cada entrega.',
  alternates: { canonical: '/' },
};

const FAQS = [
  {
    q: '¿Necesito saber la hora exacta de mi nacimiento?',
    a: 'Para la carta natal sí: el Ascendente y las casas astrológicas dependen de la hora con bastante precisión. Si no la sabes, calculamos el estudio omitiendo casas y Ascendente, indicándolo. La numerología no necesita la hora.',
  },
  {
    q: '¿Cuánto tarda en llegar mi estudio?',
    a: 'Entre 24 y 48 horas. Cada documento pasa por revisión humana antes del envío. Llega en PDF a tu correo, sin marcas de agua.',
  },
  {
    q: '¿En qué se diferencia de las cartas natales gratuitas que hay por internet?',
    a: 'Las gratuitas te dan datos crudos: "Sol en Tauro, casa 7". Nuestros estudios convierten esos datos en una lectura narrativa de 50–70 páginas, escrita en lenguaje claro, sobre quién eres tú concretamente.',
  },
  {
    q: '¿Sirve si vivo en LATAM?',
    a: 'Sí. Calculamos correctamente cualquier ciudad del mundo con su zona horaria histórica. Tenemos precios adaptados para Argentina, México, Colombia, Chile y resto de LATAM — un 50% más bajos que España.',
  },
  {
    q: '¿Y si no me convence?',
    a: 'En los primeros siete días, si nos escribes contándonos qué no te ha encajado, te devolvemos el dinero. Sin formularios, sin preguntas.',
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      {/* ── HERO ── */}
      <section className="hero">
        <WheelSvg className="hero__wheel" aria-hidden={true} />
        <div className="hero__content">
          <div className="hero__ornament">
            <OrnamentSvg />
            <span>Swiss Ephemeris · Interpretación supervisada · España y LATAM</span>
            <OrnamentSvg />
          </div>
          <h1 className="hero__title">
            <span className="hero__pre">Lo que el cielo escribió</span>
            <span className="hero__main">el día que naciste,</span>
            <span className="hero__post"><em>narrado con cuidado.</em></span>
          </h1>
          <p className="hero__lead">
            Calculamos tu carta natal con la misma precisión astronómica que usan los observatorios.
            Después la traducimos a un estudio narrado de sesenta páginas, con revisión humana
            antes de cada entrega. Sin esoterismo vacío, sin frases prefabricadas.
          </p>
          <div className="hero__ctas">
            <Link href="/carta-natal/" className="btn btn-accent btn-lg">
              Calcular mi carta natal gratis
            </Link>
            <Link href="/precios/" className="btn btn-ghost btn-lg">
              Ver estudios premium
            </Link>
          </div>
          <div className="hero__meta">
            <div>
              <SunSvg />
              <span>Swiss Ephemeris — precisión de segundos de arco</span>
            </div>
            <div>
              <MoonSvg />
              <span>Revisión humana en cada estudio</span>
            </div>
            <div>
              <StarSvg />
              <span>52 — 140 páginas de lectura personalizada</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <div className="highlights">
        <div className="highlight">
          <div className="highlight__num">14</div>
          <div className="highlight__label">Estudios entregados</div>
        </div>
        <div className="highlight">
          <div className="highlight__num">50+</div>
          <div className="highlight__label">Páginas por estudio</div>
        </div>
        <div className="highlight">
          <div className="highlight__num">7</div>
          <div className="highlight__label">Días de garantía</div>
        </div>
        <div className="highlight">
          <div className="highlight__num">48h</div>
          <div className="highlight__label">Tiempo de entrega</div>
        </div>
      </div>

      {/* ── CALCULADORA ── */}
      <section className="calc" id="calculadora">
        <div className="calc__inner">
          <div className="section-head">
            <div className="ornament-line">
              <StarSvg />
            </div>
            <span className="eyebrow">I · Empieza por aquí</span>
            <h2>Tu carta natal, en treinta segundos.</h2>
            <p className="lead">Gratis. Sin registro. Sin email. Los datos se borran al cerrar el navegador.</p>
          </div>
          <div className="calc__form">
            <div className="calc__field">
              <label htmlFor="calc-name">Tu nombre completo</label>
              <input id="calc-name" type="text" placeholder="Lucía Martínez García" readOnly />
              <span className="calc__hint">Lo usamos solo para personalizar tu carta.</span>
            </div>
            <div className="calc__row">
              <div className="calc__field">
                <label htmlFor="calc-date">Fecha de nacimiento</label>
                <input id="calc-date" type="text" placeholder="DD / MM / AAAA" readOnly />
              </div>
              <div className="calc__field">
                <label htmlFor="calc-time">Hora exacta</label>
                <input id="calc-time" type="text" placeholder="HH : MM" readOnly />
              </div>
            </div>
            <span className="calc__hint">Si no sabes la hora, dejaremos el Ascendente abierto.</span>
            <div className="calc__field">
              <label htmlFor="calc-place">Lugar de nacimiento</label>
              <input id="calc-place" type="text" placeholder="Ciudad, país" readOnly />
            </div>
            <Link href="/carta-natal/" className="btn btn-accent btn-block btn-lg">
              Calcular mi carta natal →
            </Link>
            <p className="calc__legal">
              Al continuar aceptas nuestra{' '}
              <Link href="/privacidad/">política de privacidad</Link>.
              No vendemos tus datos a nadie, nunca.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="products" id="estudios">
        <div className="section-head">
          <div className="ornament-line">
            <StarSvg />
          </div>
          <span className="eyebrow">II · Estudios premium</span>
          <h2>Tres formas de leerte por dentro.</h2>
          <p className="lead">
            Documentos personalizados, escritos desde cero a partir de tus datos.
            En PDF a tu correo, sin marcas de agua, tuyos para siempre.
          </p>
        </div>
        <div className="products__grid">
          <article className="product">
            <div className="product__icon">
              <StarSvg />
            </div>
            <span className="product__type">Numerología pitagórica</span>
            <h3>Estudio Numerológico</h3>
            <p className="product__desc">
              Camino de Vida, Expresión, Alma, Personalidad, Destino. Ciclos vitales,
              pináculos, año personal, lecciones kármicas. La lectura íntegra de tu nombre y tu fecha.
            </p>
            <ul className="product__list">
              <li>52 – 60 páginas</li>
              <li>15.000 palabras de narrativa</li>
              <li>PDF + versión web personal</li>
            </ul>
            <div className="product__foot">
              <span className="product__price">
                <span className="amt">19€</span>
                <span className="cur">España · 9€ LATAM</span>
              </span>
              <Link href="/precios/" className="btn btn-ink btn-sm">Encargar</Link>
            </div>
          </article>

          <article className="product product--featured">
            <span className="product__badge">★ El más pedido</span>
            <div className="product__icon">
              <WheelSvg />
            </div>
            <span className="product__type">Pack completo</span>
            <h3>Carta Natal + Numerología</h3>
            <p className="product__desc">
              Tu cielo astronómico interpretado en profundidad, tu numerología pitagórica entera,
              y un capítulo final donde ambos sistemas dialogan entre sí.
            </p>
            <ul className="product__list">
              <li>120 – 140 páginas</li>
              <li>Diálogo astro-numerológico</li>
              <li>Rueda zodiacal SVG personalizada</li>
            </ul>
            <div className="product__foot">
              <span className="product__price">
                <span className="amt">39€</span>
                <span className="cur">España · 19€ LATAM</span>
              </span>
              <Link href="/precios/" className="btn btn-accent btn-sm">Encargar →</Link>
            </div>
          </article>

          <article className="product">
            <div className="product__icon">
              <SunSvg />
            </div>
            <span className="product__type">Astrología psicológica</span>
            <h3>Carta Natal Interpretada</h3>
            <p className="product__desc">
              Big Three, planetas personales y transpersonales, Quirón, Nodos, casas,
              configuraciones especiales. Lenguaje psicológico contemporáneo, alejado del esoterismo vacío.
            </p>
            <ul className="product__list">
              <li>60 – 70 páginas</li>
              <li>10.000+ palabras de interpretación</li>
              <li>Rueda zodiacal SVG incluida</li>
            </ul>
            <div className="product__foot">
              <span className="product__price">
                <span className="amt">29€</span>
                <span className="cur">España · 14€ LATAM</span>
              </span>
              <Link href="/precios/" className="btn btn-ink btn-sm">Encargar</Link>
            </div>
          </article>
        </div>
      </section>

      {/* ── METHOD ── */}
      <section className="method" id="metodo">
        <div className="section-head">
          <div className="ornament-line">
            <StarSvg />
          </div>
          <span className="eyebrow">III · El proceso</span>
          <h2>Cuatro pasos desde tus datos hasta tu correo.</h2>
          <p className="lead">Transparencia total sobre cómo se hace un estudio de verdad.</p>
        </div>
        <div className="method__grid">
          <article className="step">
            <div className="step__icon">
              <SunSvg />
            </div>
            <span className="step__num">Paso 01</span>
            <h3>Cálculos astronómicos exactos</h3>
            <p>
              Usamos <strong>Swiss Ephemeris</strong>, la librería de cálculo planetario de referencia.
              Precisión de segundos de arco para cualquier fecha y lugar del último milenio.
            </p>
          </article>
          <article className="step">
            <div className="step__icon">
              <StarSvg />
            </div>
            <span className="step__num">Paso 02</span>
            <h3>Interpretación narrativa</h3>
            <p>
              La narrativa se genera con IA entrenada en obras de referencia: Sasportas, Liz Greene,
              Stephen Arroyo. Sin frases plantilla; cada párrafo nace de tus configuraciones reales.
            </p>
          </article>
          <article className="step">
            <div className="step__icon">
              <MoonSvg />
            </div>
            <span className="step__num">Paso 03</span>
            <h3>Supervisión humana</h3>
            <p>
              Antes de enviarte el PDF, cada documento pasa por revisión humana. Si algo no encaja
              con tus datos, se ajusta a mano. Por eso tardamos 24–48 horas y no diez segundos.
            </p>
          </article>
          <article className="step">
            <div className="step__icon">
              <WheelSvg />
            </div>
            <span className="step__num">Paso 04</span>
            <h3>Entrega y propiedad</h3>
            <p>
              Recibes el PDF por correo, sin marcas de agua. Es tuyo para siempre: imprímelo,
              regálalo, reléelo en diez años. Guardamos una copia cifrada por si lo pierdes.
            </p>
          </article>
        </div>
      </section>

      {/* ── QUOTES ── */}
      <section className="quotes">
        <div className="section-head">
          <div className="ornament-line">
            <StarSvg />
          </div>
          <span className="eyebrow">IV · Lo que dicen</span>
          <h2>Catorce primeras lectoras nos escribieron esto.</h2>
        </div>
        <div className="quotes__grid">
          <blockquote className="quote">
            <p>
              Lo leí entero del tirón. Me reconocí en partes que llevaba años sin saber poner
              en palabras. La parte del Quirón en Géminis me hizo llorar.
            </p>
            <footer>— Ana, 34 · Madrid</footer>
          </blockquote>
          <blockquote className="quote">
            <p>
              Llevo veinte años leyendo libros de astrología y esto es lo más fino que he leído
              sobre mí misma en mi vida. Recomendado a mis tres hermanas.
            </p>
            <footer>— Verónica, 51 · Buenos Aires</footer>
          </blockquote>
          <blockquote className="quote">
            <p>
              Esperaba el típico horóscopo y me llegó un libro. La parte de numerología
              pitagórica explicada con mi nombre completo es brutal.
            </p>
            <footer>— Daniel, 28 · Ciudad de México</footer>
          </blockquote>
          <blockquote className="quote">
            <p>
              No creía nada en estas cosas. Mi pareja me lo regaló. Me ha cambiado
              conversaciones enteras con mi madre.
            </p>
            <footer>— Marta, 42 · Barcelona</footer>
          </blockquote>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq">
        <div className="section-head">
          <div className="ornament-line">
            <StarSvg />
          </div>
          <span className="eyebrow">VI · Preguntas frecuentes</span>
          <h2>Lo que nos preguntáis a menudo.</h2>
        </div>
        <div className="faq__list">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="faq__item">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="cta-final">
        <div className="cta-final__inner">
          <WheelSvg className="cta-final__wheel" aria-hidden={true} />
          <h2>¿Empezamos por algo gratis?</h2>
          <p>
            Tu carta natal calculada con precisión astronómica, sin pagar, sin registro.
            Si te gusta, vuelves a por el estudio largo.
          </p>
          <Link href="/carta-natal/" className="btn btn-gold btn-xl">
            Calcular mi carta natal →
          </Link>
        </div>
      </section>
    </>
  );
}
