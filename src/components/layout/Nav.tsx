'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/carta-natal/',  label: 'Carta natal' },
  { href: '/numerologia/',  label: 'Numerología' },
  { href: '/ascendente/',   label: 'Ascendente' },
  { href: '/blog/',         label: 'Blog' },
  { href: '/precios/',      label: 'Estudios PDF' },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      {/* ── Main header ── */}
      <header
        className="sticky top-0 z-30"
        style={{
          background: 'rgba(247,238,219,.92)',
          backdropFilter: 'blur(14px) saturate(180%)',
          WebkitBackdropFilter: 'blur(14px) saturate(180%)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max)',
            margin: '0 auto',
            padding: '18px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--ink)',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <BrandMark />
            <span
              style={{
                fontFamily: 'var(--font-garamond)',
                fontWeight: 500,
                fontSize: '1.7rem',
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}
            >
              Cosmyastral
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            className="hidden md:flex"
            style={{ gap: '32px', fontFamily: 'var(--font-garamond)', fontSize: '1.05rem' }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: pathname.startsWith(href.replace(/\/$/, '')) ? 'var(--accent)' : 'var(--ink-soft)',
                  textDecoration: 'none',
                  transition: 'color .2s',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/carta-natal/"
            className="btn btn-accent btn-sm hidden md:inline-flex"
            style={{ flexShrink: 0 }}
          >
            Empezar gratis
          </Link>

          {/* Burger */}
          <button
            className="flex md:hidden"
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              width: '40px',
              height: '40px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              position: 'relative',
              zIndex: 31,
              flexShrink: 0,
            }}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            {[
              isOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              undefined,
              isOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            ].map((transform, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: 'var(--ink)',
                  borderRadius: '2px',
                  transition: 'transform .3s ease, opacity .2s ease',
                  transform: transform ?? 'none',
                  opacity: i === 1 && isOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* ── Mobile overlay (sibling of header, NOT inside it) ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 29,
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '48px',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity .25s ease',
        }}
        aria-hidden={!isOpen}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              style={{
                fontFamily: 'var(--font-garamond)',
                fontSize: '2rem',
                fontWeight: 400,
                color: pathname.startsWith(href.replace(/\/$/, '')) ? 'var(--accent)' : 'var(--ink-soft)',
                padding: '10px 32px',
                display: 'block',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'color .2s',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/carta-natal/"
          onClick={close}
          className="btn btn-accent btn-lg"
        >
          Empezar gratis →
        </Link>
      </div>
    </>
  );
}

function BrandMark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 22 22"
      aria-hidden="true"
      style={{ color: 'var(--accent)', flexShrink: 0 }}
    >
      <circle cx="11" cy="11" r="9"   stroke="currentColor" strokeWidth="0.7" fill="none" />
      <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <g stroke="currentColor" strokeWidth="0.5">
        <line x1="11" y1="5"      x2="11"    y2="2"      />
        <line x1="14" y1="5.804"  x2="15.5"  y2="3.206"  />
        <line x1="16.196" y1="8"  x2="18.794" y2="6.5"   />
        <line x1="17"  y1="11"    x2="20"    y2="11"      />
        <line x1="16.196" y1="14" x2="18.794" y2="15.5"  />
        <line x1="14"  y1="16.196" x2="15.5" y2="18.794" />
        <line x1="11"  y1="17"    x2="11"    y2="20"      />
        <line x1="8"   y1="16.196" x2="6.5"  y2="18.794" />
        <line x1="5.804" y1="14"  x2="3.206" y2="15.5"   />
        <line x1="5"   y1="11"    x2="2"     y2="11"      />
        <line x1="5.804" y1="8"   x2="3.206" y2="6.5"    />
        <line x1="8"   y1="5.804" x2="6.5"   y2="3.206"  />
      </g>
      <path
        d="M11,9.5 L11.21,10.79 L12.5,11 L11.21,11.21 L11,12.5 L10.79,11.21 L9.5,11 L10.79,10.79 Z"
        fill="currentColor"
      />
    </svg>
  );
}
