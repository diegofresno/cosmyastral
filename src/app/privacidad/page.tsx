import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Política de privacidad — Cosmyastral',
  description: 'Política de privacidad y protección de datos de Cosmyastral.',
  alternates: { canonical: '/privacidad/' },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    h2: 'Responsable del tratamiento',
    p: 'Cosmyastral es el responsable del tratamiento de los datos personales recabados a través de este sitio web.',
  },
  {
    h2: 'Datos que recogemos',
    p: 'Al solicitar un estudio personalizado recogemos los datos que introduces en el formulario: nombre, fecha, hora y lugar de nacimiento, y dirección de correo electrónico para la entrega. No recogemos más datos de los estrictamente necesarios para prestar el servicio.',
  },
  {
    h2: 'Finalidad del tratamiento',
    p: 'Los datos se usan exclusivamente para generar y entregar el estudio PDF solicitado, y para responder a consultas relacionadas con el mismo. No se usan para marketing sin consentimiento explícito.',
  },
  {
    h2: 'Conservación',
    p: 'Los datos se conservan durante el tiempo necesario para prestar el servicio y atender posibles reclamaciones. Una vez finalizada la relación, se eliminan o anonimzan.',
  },
  {
    h2: 'Cesión a terceros',
    p: 'No cedemos datos personales a terceros salvo obligación legal. Usamos proveedores de pago (Stripe) y correo electrónico (servicios estándar de la industria) que actúan como encargados del tratamiento bajo sus propias políticas de privacidad.',
  },
  {
    h2: 'Tus derechos',
    p: 'Tienes derecho a acceder, rectificar, suprimir, oponerte al tratamiento y solicitar la portabilidad de tus datos. Para ejercerlos, escríbenos a través del formulario de contacto del sitio.',
  },
  {
    h2: 'Cookies',
    p: 'Este sitio usa Google Analytics 4 para estadísticas agregadas de visitas. Las cookies de GA4 no se usan para publicidad personalizada. Puedes desactivarlas en la configuración de tu navegador.',
  },
  {
    h2: 'Cambios en esta política',
    p: 'Podemos actualizar esta política. La versión vigente siempre estará disponible en esta URL. La fecha de la última actualización aparece al pie de esta página.',
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <Breadcrumb crumbs={[{ label: 'Privacidad', href: '/privacidad/' }]} />
      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,80px) 32px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-garamond)',
              fontWeight: 400,
              fontSize: 'clamp(1.8rem,4vw,2.8rem)',
              color: 'var(--ink)',
              marginBottom: '12px',
            }}
          >
            Política de privacidad
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.82rem',
              color: 'var(--ink-mute)',
              marginBottom: '48px',
            }}
          >
            Última actualización: junio de 2026
          </p>

          {SECTIONS.map(({ h2, p }) => (
            <div key={h2} style={{ marginBottom: '36px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-garamond)',
                  fontWeight: 500,
                  fontSize: '1.25rem',
                  color: 'var(--ink)',
                  marginBottom: '10px',
                }}
              >
                {h2}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-garamond)',
                  fontSize: '1.05rem',
                  color: 'var(--ink-soft)',
                  lineHeight: 1.7,
                }}
              >
                {p}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
