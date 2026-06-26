'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export type ProductId = 'numerologia' | 'carta-natal' | 'pack';

const PRODUCT_INFO: Record<ProductId, { name: string; price_es: number; price_latam: number; needsPlace: boolean }> = {
  'numerologia': { name: 'Estudio numerológico completo', price_es: 19, price_latam:  9, needsPlace: false },
  'carta-natal': { name: 'Carta natal interpretada',      price_es: 29, price_latam: 14, needsPlace: true  },
  'pack':        { name: 'Pack completo',                 price_es: 39, price_latam: 19, needsPlace: true  },
};

type GeoResult = { lat: number; lng: number; timezone: string; shortName: string; displayName: string };

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  fontFamily: 'var(--font-inter)',
  fontSize: '0.95rem',
  color: 'var(--ink)',
  background: '#fff',
  border: '1px solid var(--line)',
  borderRadius: '6px',
  outline: 'none',
  boxSizing: 'border-box',
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--ink)' }}>
        {label}
      </label>
      {hint && (
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'var(--ink-mute)', margin: 0, lineHeight: 1.5 }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

export default function CheckoutForm({ producto, region }: { producto: ProductId; region: 'es' | 'latam' }) {
  const prod  = PRODUCT_INFO[producto];
  const price = region === 'latam' ? prod.price_latam : prod.price_es;

  const [nombre,           setNombre]           = useState('');
  const [email,            setEmail]            = useState('');
  const [fechaNac,         setFechaNac]         = useState('');
  const [horaNac,          setHoraNac]          = useState('');
  const [horaDesconocida,  setHoraDesconocida]  = useState(false);
  const [lugar,            setLugar]            = useState('');
  const [geoResult,        setGeoResult]        = useState<GeoResult | null>(null);
  const [geoStatus,        setGeoStatus]        = useState<'idle' | 'searching' | 'ok' | 'error'>('idle');
  const [submitting,       setSubmitting]       = useState(false);
  const [formError,        setFormError]        = useState('');

  const geoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleLugarChange(val: string) {
    setLugar(val);
    setGeoResult(null);
    setGeoStatus('idle');
    if (geoTimer.current) clearTimeout(geoTimer.current);
    if (val.trim().length < 3) return;
    geoTimer.current = setTimeout(() => geocodePlace(val.trim()), 700);
  }

  async function geocodePlace(q: string) {
    setGeoStatus('searching');
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      if (!res.ok) { setGeoStatus('error'); return; }
      const data: GeoResult = await res.json();
      setGeoResult(data);
      setGeoStatus('ok');
    } catch {
      setGeoStatus('error');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');

    if (prod.needsPlace && !horaDesconocida && !horaNac) {
      setFormError('Indica tu hora de nacimiento o marca "No la sé" para continuar.');
      return;
    }
    if (prod.needsPlace && geoStatus !== 'ok') {
      setFormError('Por favor, espera a que confirmemos tu lugar de nacimiento antes de continuar.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          producto,
          nombre: nombre.trim(),
          email:  email.trim(),
          fecha_nac: fechaNac,
          hora_nac:  horaDesconocida ? 'desconocida' : horaNac,
          lugar_nac: geoResult?.shortName ?? '',
          lat:      geoResult?.lat      ?? null,
          lng:      geoResult?.lng      ?? null,
          timezone: geoResult?.timezone ?? '',
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setFormError(data.error ?? 'Error al preparar el pago. Inténtalo de nuevo.');
        setSubmitting(false);
      }
    } catch {
      setFormError('Error de conexión. Inténtalo de nuevo.');
      setSubmitting(false);
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: 'clamp(40px,6vw,72px) 24px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>

        <Link href="/precios/" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)', textDecoration: 'none', display: 'inline-block', marginBottom: '32px' }}>
          ← Volver a precios
        </Link>

        {/* Cabecera del pedido */}
        <div style={{ marginBottom: '36px', paddingBottom: '24px', borderBottom: '1px solid var(--line)' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)', marginBottom: '8px' }}>
            Tu pedido
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
            <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--ink)', lineHeight: 1.2, margin: 0 }}>
              {prod.name}
            </h1>
            <span style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.5rem', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
              {price} €
            </span>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <Field label="Nombre completo" hint="Tal como aparece en tu documento de identidad">
            <input
              type="text"
              required
              autoComplete="name"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Ej.: María García López"
              style={inputStyle}
            />
          </Field>

          <Field label="Email" hint="Aquí recibirás tu estudio en PDF">
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={inputStyle}
            />
          </Field>

          <Field label="Fecha de nacimiento">
            <input
              type="date"
              required
              value={fechaNac}
              max={today}
              min="1900-01-01"
              onChange={e => setFechaNac(e.target.value)}
              style={inputStyle}
            />
          </Field>

          {prod.needsPlace && (
            <>
              <Field
                label="Hora de nacimiento"
                hint={horaDesconocida ? undefined : 'La encontrarás en tu partida de nacimiento o en el certificado del hospital'}
              >
                {!horaDesconocida && (
                  <input
                    type="time"
                    value={horaNac}
                    onChange={e => setHoraNac(e.target.value)}
                    style={inputStyle}
                  />
                )}
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: horaDesconocida ? '0' : '10px' }}>
                  <input
                    type="checkbox"
                    checked={horaDesconocida}
                    onChange={e => { setHoraDesconocida(e.target.checked); setHoraNac(''); }}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--accent)', cursor: 'pointer', flexShrink: 0 }}
                  />
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                    No sé mi hora exacta
                  </span>
                </label>
                {horaDesconocida && (
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: 'var(--ink-mute)', lineHeight: 1.55, marginTop: '6px' }}>
                    Calcularemos la carta sin Ascendente ni casas. Los planetas, aspectos y toda la interpretación narrativa siguen siendo completos.
                  </p>
                )}
              </Field>

              <Field label="Lugar de nacimiento" hint="Ciudad donde naciste — escribe y espera la confirmación">
                <input
                  type="text"
                  required
                  value={lugar}
                  onChange={e => handleLugarChange(e.target.value)}
                  placeholder="Ej.: Madrid, Buenos Aires, México D.F."
                  style={{
                    ...inputStyle,
                    borderColor: geoStatus === 'ok' ? '#4a7c59' : geoStatus === 'error' ? '#c0392b' : 'var(--line)',
                  }}
                />
                {geoStatus === 'searching' && (
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: 'var(--ink-mute)', marginTop: '6px' }}>
                    Buscando…
                  </p>
                )}
                {geoStatus === 'ok' && geoResult && (
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: '#4a7c59', marginTop: '6px' }}>
                    ✓ {geoResult.displayName.split(',').slice(0, 3).join(',')}
                  </p>
                )}
                {geoStatus === 'error' && (
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#c0392b', marginTop: '6px' }}>
                    Ciudad no encontrada. Prueba con formato "Madrid, España" o "Buenos Aires, Argentina".
                  </p>
                )}
              </Field>
            </>
          )}

          {formError && (
            <div style={{ background: '#fdf3f3', border: '1px solid #e8c9c9', borderRadius: '6px', padding: '12px 16px' }}>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.87rem', color: '#c0392b', margin: 0 }}>
                {formError}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn"
            style={{ marginTop: '8px', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
          >
            {submitting ? 'Preparando el pago…' : 'Continuar al pago →'}
          </button>

          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--ink-mute)', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
            Pago seguro con Stripe · No almacenamos datos de tarjeta
            <br />7 días de garantía de devolución
          </p>

        </form>
      </div>
    </div>
  );
}
