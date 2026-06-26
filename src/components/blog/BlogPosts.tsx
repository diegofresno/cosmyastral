'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  featured?: boolean;
}

const CATS = ['Todos', 'Astrología', 'Numerología', 'Ciclos lunares'];

const HERO_IMAGES: Record<string, string> = {
  'carta-natal-gratis-explicada':            '/blog/blog-carta-natal.png',
  'luna-llena-significado-astrologico':      '/blog/blog-luna-llena.png',
  'luna-en-escorpio-carta-natal':            '/blog/blog-luna-escorpio.png',
  'que-significa-11-11':                     '/blog/blog-11-11.png',
  '11-11-significado-espiritual':            '/blog/blog-11-11.png',
  'camino-de-vida-11-numero-maestro':        '/blog/blog-camino-11.png',
  'revolucion-solar-que-es-como-calcularla': '/blog/blog-revolucion-solar.png',
  'luna-llena-julio-2026':                   '/blog/blog-luna-julio-2026.png',
  'luna-nueva-julio-2026':                   '/blog/blog-luna-julio-2026.png',
  'luna-en-capricornio-carta-natal':         '/blog/blog-luna-capricornio.png',
  'luna-en-piscis-carta-natal':              '/blog/blog-luna-piscis.png',
  'luna-en-sagitario-carta-natal':           '/blog/blog-luna-sagitario.png',
  'hora-espejo-11-11':                       '/blog/blog-hora-espejo-1111.png',
};

function PostImage({ slug, title, size = 'grid' }: { slug: string; title: string; size?: 'featured' | 'grid' }) {
  const src = HERO_IMAGES[slug];
  const radius = size === 'featured' ? '6px' : '0';
  if (!src) return null;
  return (
    <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: radius, flexShrink: 0, overflow: 'hidden' }}>
      <Image
        src={src}
        alt={title}
        fill
        sizes={size === 'featured' ? '(max-width:768px) 100vw, 50vw' : '(max-width:768px) 100vw, 33vw'}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
    </div>
  );
}

export default function BlogPosts({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState('Todos');

  const filtered = active === 'Todos'
    ? posts
    : posts.filter((p) => p.category === active);

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* ── FILTROS ── */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)', padding: '0 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', display: 'flex', gap: '8px', padding: '16px 0', flexWrap: 'wrap' }}>
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.82rem',
                fontWeight: cat === active ? 600 : 400,
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid var(--line)',
                color: cat === active ? 'var(--bg)' : 'var(--ink-soft)',
                background: cat === active ? 'var(--accent)' : 'transparent',
                cursor: 'pointer',
                transition: 'all .2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── POSTS ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,6vw,80px) 32px' }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>

          {!featured && (
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-garamond)', color: 'var(--ink-mute)', fontSize: '1.1rem', padding: '40px 0' }}>
              No hay artículos en esta categoría todavía.
            </p>
          )}

          {featured && (
            <Link
              href={`/blog/${featured.slug}/`}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                background: 'var(--bg-warm)',
                border: '1px solid var(--line)',
                borderRadius: '10px',
                padding: '40px',
                textDecoration: 'none',
                marginBottom: '32px',
              }}
              className="featured-post"
            >
              <PostImage slug={featured.slug} title={featured.title} size="featured" />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>
                    {featured.category}
                  </span>
                  <span style={{ color: 'var(--line)', fontSize: '0.8rem' }}>·</span>
                  <time style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'var(--ink-mute)' }}>
                    {new Date(featured.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
                <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--ink)', lineHeight: 1.25 }}>
                  {featured.title}
                </h2>
                <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
                  {featured.excerpt}
                </p>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.88rem', fontWeight: 500, color: 'var(--accent)' }}>
                  Leer artículo →
                </span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  style={{
                    background: 'var(--bg-warm)',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all .2s',
                  }}
                >
                  <PostImage slug={post.slug} title={post.title} size="grid" />
                  <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>
                        {post.category}
                      </span>
                      <span style={{ color: 'var(--line)' }}>·</span>
                      <time style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--ink-mute)' }}>
                        {new Date(post.date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                      </time>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: '1.2rem', color: 'var(--ink)', lineHeight: 1.3, flex: 1 }}>
                      {post.title}
                    </h2>
                    <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.92rem', color: 'var(--ink-soft)', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', fontWeight: 500, color: 'var(--accent)', marginTop: '4px' }}>
                      Leer →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
