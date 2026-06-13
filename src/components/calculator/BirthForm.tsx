'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Props {
  type: 'natal' | 'numerologia' | 'ascendente';
}

export default function BirthForm({ type }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const isNatal = type === 'natal' || type === 'ascendente';

  if (submitted) {
    return (
      <div
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--line)',
          borderRadius: '8px',
          padding: '40px 36px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '2rem', color: 'var(--gold)' }}>✦</span>
        <h3
          style={{
            fontFamily: 'var(--font-garamond)',
            fontWeight: 500,
            fontSize: '1.4rem',
            color: 'var(--ink)',
          }}
        >
          La calculadora llega pronto
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: '1rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.65,
            maxWidth: '440px',
          }}
        >
          Mientras tanto puedes pedir tu estudio completo directamente. Lo
          recibes en menos de 10 minutos en tu correo.
        </p>
        <Link href="/precios/" className="btn btn-accent btn-lg">
          Ver estudios PDF →
        </Link>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.85rem',
            color: 'var(--ink-mute)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          ← Volver
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
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
      {isNatal ? (
        <>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
            <Field label="Fecha de nacimiento" type="date" required />
            <Field label="Hora de nacimiento" type="time" required />
          </div>
          <Field label="Ciudad de nacimiento" type="text" placeholder="p.ej. Madrid, España" required />
        </>
      ) : (
        <>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
            <Field label="Nombre" type="text" placeholder="p.ej. María" required />
            <Field label="Apellidos" type="text" placeholder="p.ej. García López" required />
          </div>
          <Field label="Fecha de nacimiento" type="date" required />
        </>
      )}

      <button type="submit" className="btn btn-accent btn-block">
        {type === 'natal' ? 'Calcular carta natal gratis →' : type === 'ascendente' ? 'Calcular ascendente gratis →' : 'Calcular numerología gratis →'}
      </button>
      <p
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-garamond)',
          fontSize: '0.9rem',
          color: 'var(--ink-mute)',
        }}
      >
        Sin registro · Sin pago · Resultado inmediato
      </p>
    </form>
  );
}

function Field({
  label,
  type,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.78rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--ink-mute)',
        }}
      >
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        style={{
          fontFamily: 'var(--font-garamond)',
          fontSize: '1rem',
          padding: '11px 14px',
          border: '1px solid var(--line)',
          borderRadius: '4px',
          background: 'var(--bg)',
          color: 'var(--ink)',
          outline: 'none',
          transition: 'border-color .2s',
          width: '100%',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--line)')}
      />
    </label>
  );
}
