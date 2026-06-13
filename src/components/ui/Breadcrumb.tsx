import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

const SITE = 'https://cosmyastral.com';

interface Crumb { label: string; href?: string }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
      ...crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.label,
        ...(c.href ? { item: `${SITE}${c.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav
        aria-label="Ruta de navegación"
        style={{
          maxWidth: 'var(--max)',
          margin: '0 auto',
          padding: '12px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.82rem',
          color: 'var(--ink-mute)',
        }}
      >
        <Link href="/" style={{ color: 'var(--ink-mute)', transition: 'color .15s' }}>
          Inicio
        </Link>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>›</span>
            {c.href && i < crumbs.length - 1 ? (
              <Link href={c.href} style={{ color: 'var(--ink-mute)', transition: 'color .15s' }}>
                {c.label}
              </Link>
            ) : (
              <span style={{ color: 'var(--ink-soft)' }}>{c.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
