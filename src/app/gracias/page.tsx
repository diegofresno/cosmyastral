import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pedido recibido — Cosmyastral',
  robots: { index: false },
};

export default function GraciasPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(48px,8vw,96px) 24px' }}>
      <div style={{ maxWidth: '520px', textAlign: 'center' }}>

        <span style={{ display: 'block', fontSize: '3rem', marginBottom: '24px', color: 'var(--gold)' }}>✦</span>

        <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--ink)', lineHeight: 1.2, marginBottom: '20px' }}>
          Tu pedido ha llegado
        </h1>

        <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '12px' }}>
          Hemos recibido tu pedido y estamos preparando tu estudio personalizado. Lo recibirás en el correo electrónico que nos indicaste en un plazo de 24 a 48 horas.
        </p>

        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'var(--ink-mute)', lineHeight: 1.6, marginBottom: '40px' }}>
          Revisa también tu carpeta de spam por si el correo acaba ahí.
          <br />Si pasadas 48 horas no te ha llegado nada, escríbenos.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <Link href="/" className="btn">
            Volver al inicio
          </Link>
          <Link href="/blog/" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)', textDecoration: 'none' }}>
            Mientras esperas, lee nuestro blog →
          </Link>
        </div>

      </div>
    </div>
  );
}
