import Link from 'next/link';

const TOOLS = [
  { href: '/carta-natal/',  label: 'Calculadora carta natal' },
  { href: '/numerologia/',  label: 'Calculadora numerología' },
  { href: '/ascendente/',   label: 'Calcular ascendente' },
];

const LEARN = [
  { href: '/blog/luna-llena-significado-astrologico/',   label: 'Luna llena' },
  { href: '/blog/luna-en-escorpio-carta-natal/',         label: 'Luna en Escorpio' },
  { href: '/blog/11-11-significado-espiritual/',         label: 'Qué significa 11:11' },
  { href: '/blog/camino-de-vida-11-numero-maestro/',     label: 'Camino de Vida 11' },
];

const LEGAL = [
  { href: '/sobre-nosotros/', label: 'Sobre nosotros' },
  { href: '/privacidad/',     label: 'Privacidad' },
  { href: '/terminos/',       label: 'Términos' },
  { href: '/contacto/',       label: 'Contacto' },
];

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.72rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--ink)',
          marginBottom: '16px',
        }}
      >
        {title}
      </p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: '1rem',
              color: 'var(--ink-soft)',
              textDecoration: 'none',
              transition: 'color .2s',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)', marginTop: 'auto' }}>
      {/* Grid */}
      <div
        style={{
          maxWidth: 'var(--max)',
          margin: '0 auto',
          padding: '64px 32px 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px',
        }}
      >
        {/* Brand block */}
        <div style={{ gridColumn: 'span 1' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-garamond)',
              fontWeight: 500,
              fontSize: '1.5rem',
              letterSpacing: '0.08em',
              color: 'var(--ink)',
              textDecoration: 'none',
              marginBottom: '12px',
            }}
          >
            Cosmyastral
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: '0.98rem',
              color: 'var(--ink-soft)',
              lineHeight: 1.65,
              maxWidth: '260px',
            }}
          >
            Astrología y numerología en español, con cabeza y con cuidado.
            España y LATAM.
          </p>
        </div>

        <FooterCol title="Herramientas" links={TOOLS} />
        <FooterCol title="Aprender"     links={LEARN} />
        <FooterCol title="Legal"        links={LEGAL} />
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--line)',
          maxWidth: 'var(--max)',
          margin: '0 auto',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.78rem',
          color: 'var(--ink-mute)',
        }}
      >
        <span>© 2026 Cosmyastral · cosmyastral.com</span>
        <span>Cálculo con Swiss Ephemeris · Interpretación con supervisión humana.</span>
      </div>
    </footer>
  );
}
