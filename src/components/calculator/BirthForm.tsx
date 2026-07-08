'use client';

import { useState, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { calcChart, localToUTC } from '@/lib/astro';
import type { ZodiacSign, SignPos } from '@/lib/astro';
import { calcNumerology } from '@/lib/numerologia';
import type { NumerologyResult } from '@/lib/numerologia';
import {
  SUN_DESC, MOON_DESC, ASC_DESC,
  NUM_DESC, YEAR_DESC,
  SIGN_ELEMENT, SIGN_MODALITY,
  buildSynthesis,
} from '@/lib/interpretations';
import { getPlanetSignTeaser, toKerykeionPlanetKey } from '@/data/planetSignTexts';

// ── GA4 helper ────────────────────────────────────────────────────────────────

declare global { interface Window { gtag?: (...args: unknown[]) => void; } }
function trackCalculatorCompleted(calculatorType: 'carta_natal' | 'ascendente' | 'numerologia') {
  window.gtag?.('event', 'calculator_completed', { calculator_type: calculatorType });
}
function trackEmailCaptured(source: 'popup_submit' | 'popup_dismiss') {
  window.gtag?.('event', 'email_captured', { source });
}

// ── Kerykeion types ────────────────────────────────────────────────────────────

interface KPlanet {
  key: string;
  name_es: string;
  sign: string;
  sign_es: string;
  position: number;
  retrograde: boolean;
  house: string;
}

interface KChart {
  ascendant: KPlanet;
  planets: Record<string, KPlanet>;
}

// ── Result types ──────────────────────────────────────────────────────────────

interface Props {
  type: 'natal' | 'numerologia' | 'ascendente';
}

type NatalRes = {
  type: 'natal';
  sun: SignPos; moon: SignPos; ascendant: SignPos;
  city: string; timezone: string; utcTime: string;
  kerykeion?: KChart;
};
type AscRes = {
  type: 'ascendente';
  ascendant: SignPos;
  city: string; timezone: string; utcTime: string;
};
type NumRes = { type: 'numerologia'; nombre: string } & NumerologyResult;

type CalcResult = NatalRes | AscRes | NumRes;

type State =
  | { status: 'idle' }
  | { status: 'loading'; msg: string }
  | { status: 'error'; msg: string }
  | { status: 'ok'; result: CalcResult };

// ── Numerology rows ───────────────────────────────────────────────────────────

const NUM_ROWS: { key: keyof NumerologyResult & string; label: string; sub: string; useYearDesc?: boolean }[] = [
  { key: 'lifePath',     label: 'Camino de Vida',         sub: 'Tu propósito y lecciones fundamentales en esta vida' },
  { key: 'expression',   label: 'Número de Expresión',    sub: 'Tus talentos naturales y cómo los manifiestas en el mundo' },
  { key: 'soul',         label: 'Número del Alma',        sub: 'Tus deseos más profundos, lo que te mueve desde dentro' },
  { key: 'personality',  label: 'Número de Personalidad', sub: 'La imagen que proyectas y cómo te perciben los demás' },
  { key: 'personalYear', label: 'Año Personal',           sub: 'La energía y el foco del año en curso en tu ciclo vital', useYearDesc: true },
  { key: 'destiny',      label: 'Número de Destino',      sub: 'La misión que integra tus dones con tu historia de vida' },
];

// ── Planet catalog for locked display ─────────────────────────────────────────

const PLANET_INFO: Record<string, { glyph: string; label: string; sub: string }> = {
  mercury: { glyph: '☿', label: 'Mercurio', sub: 'tu mente, comunicación y forma de procesar información' },
  venus:   { glyph: '♀', label: 'Venus',    sub: 'tus valores, estética, atracción y forma de amar' },
  mars:    { glyph: '♂', label: 'Marte',    sub: 'tu energía, deseo, acción y forma de afrontar conflictos' },
  jupiter: { glyph: '♃', label: 'Júpiter',  sub: 'tu expansión, filosofía de vida y áreas de abundancia' },
  saturn:  { glyph: '♄', label: 'Saturno',  sub: 'tu disciplina, límites y lecciones kármicas principales' },
  uranus:  { glyph: '⛢', label: 'Urano',    sub: 'tu originalidad, ruptura y necesidad de libertad' },
  neptune: { glyph: '♆', label: 'Neptuno',  sub: 'tu espiritualidad, intuición y capacidad de disolución' },
  pluto:   { glyph: '♇', label: 'Plutón',   sub: 'tu transformación profunda, poder y regeneración' },
  chiron:  { glyph: '⚷', label: 'Quirón',   sub: 'tu herida principal y el camino hacia la sanación' },
};

const PERSONAL_PLANETS  = ['mercury', 'venus', 'mars'];
const OUTER_PLANETS     = ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'chiron'];

interface BirthPayloadForEmail {
  year: number; month: number; day: number;
  hour: number; minute: number;
  lat: number; lng: number; tz: string; city: string;
  sunSign: string; moonSign: string; ascSign: string;
}

// ── Style constants ───────────────────────────────────────────────────────────

const CARD: React.CSSProperties = {
  background: 'var(--bg)',
  border: '1px solid var(--line)',
  borderRadius: '8px',
  padding: '32px 28px',
};

const EYEBROW: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '0.72rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--ink-mute)',
  marginBottom: '24px',
};

const LABEL: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-inter)',
  fontSize: '0.72rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--ink-mute)',
  marginBottom: '4px',
};

const BADGE_BASE: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: 'var(--font-inter)',
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '2px 8px',
  borderRadius: '4px',
  marginRight: '6px',
};

const ELEMENT_COLORS: Record<string, React.CSSProperties> = {
  'Fuego':  { background: '#fef3e2', color: '#92400e' },
  'Tierra': { background: '#f0fdf4', color: '#14532d' },
  'Aire':   { background: '#eff6ff', color: '#1e3a5f' },
  'Agua':   { background: '#f0f9ff', color: '#0c4a6e' },
};
const MODALITY_COLORS: React.CSSProperties = { background: 'var(--bg-warm)', color: 'var(--ink-mute)' };

// ── Main component ────────────────────────────────────────────────────────────

type GeoResult = { lat: number; lng: number; timezone: string; shortName: string; displayName: string };

export default function BirthForm({ type }: Props) {
  const [fecha,     setFecha]     = useState('');
  const [hora,      setHora]      = useState('12:00');
  const [ciudad,    setCiudad]    = useState('');
  const [nombre,    setNombre]    = useState('');
  const [apellidos, setApellidos] = useState('');
  const [state,     setState]     = useState<State>({ status: 'idle' });
  const [geoStatus, setGeoStatus] = useState<'idle' | 'searching' | 'ok' | 'error'>('idle');
  const [geoResult, setGeoResult] = useState<GeoResult | null>(null);
  const [popupDone,    setPopupDone]    = useState(false);
  const [birthPayload, setBirthPayload] = useState<BirthPayloadForEmail | null>(null);
  const geoTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const isAstro = type === 'natal' || type === 'ascendente';

  function handleCiudadChange(val: string) {
    setCiudad(val);
    setGeoResult(null);
    setGeoStatus('idle');
    if (geoTimer.current) clearTimeout(geoTimer.current);
    if (val.trim().length < 3) return;
    geoTimer.current = setTimeout(() => geocodeCity(val.trim()), 700);
  }

  async function geocodeCity(q: string) {
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

  function dismissPopup() {
    setPopupDone(true);
    trackEmailCaptured('popup_dismiss');
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  function submitPopup() {
    setPopupDone(true);
    trackEmailCaptured('popup_submit');
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  function handleReset() {
    setState({ status: 'idle' });
    setPopupDone(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState({ status: 'loading', msg: 'Calculando...' });

    try {
      if (type === 'numerologia') {
        const [y, m, d] = fecha.split('-').map(Number);
        const result = calcNumerology(nombre, apellidos, y, m, d, new Date().getUTCFullYear());
        trackCalculatorCompleted('numerologia');
        setState({ status: 'ok', result: { type: 'numerologia', nombre: `${nombre} ${apellidos}`, ...result } });
        return;
      }

      // ── Geocode ──────────────────────────────────────────────────────────────
      let geo = geoResult;
      if (!geo) {
        setState({ status: 'loading', msg: 'Buscando coordenadas de la ciudad...' });
        const geoRes = await fetch(`/api/geocode?q=${encodeURIComponent(ciudad)}`);
        if (!geoRes.ok) {
          const err = await geoRes.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error ?? 'Ciudad no encontrada.');
        }
        geo = await geoRes.json() as GeoResult;
      }

      setState({ status: 'loading', msg: 'Calculando posiciones astronómicas...' });

      // ── Kerykeion (full chart) ────────────────────────────────────────────────
      let kerykeion: KChart | undefined;
      if (type === 'natal') {
        try {
          const [y, m, d] = fecha.split('-').map(Number);
          const [hh, mm]  = hora.split(':').map(Number);
          const kRes = await fetch('/api/chart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Consulta', year: y, month: m, day: d, hour: hh, minute: mm, lat: geo.lat, lng: geo.lng, tz: geo.timezone }),
            signal: AbortSignal.timeout(12000),
          });
          if (kRes.ok) kerykeion = await kRes.json();
        } catch { /* kerykeion no disponible — usa fallback JS */ }
      }

      // ── JS fallback (Big Three) ───────────────────────────────────────────────
      const utcDate = localToUTC(fecha, hora, geo.timezone);
      const chart   = calcChart(
        utcDate.getUTCFullYear(), utcDate.getUTCMonth() + 1, utcDate.getUTCDate(),
        utcDate.getUTCHours(), utcDate.getUTCMinutes(),
        geo.lat, geo.lng
      );
      const utcTime = `${String(utcDate.getUTCHours()).padStart(2, '0')}:${String(utcDate.getUTCMinutes()).padStart(2, '0')} UTC`;

      if (type === 'natal') {
        const [y2, m2, d2] = fecha.split('-').map(Number);
        const [hh2, mm2]   = hora.split(':').map(Number);
        setBirthPayload({
          year: y2, month: m2, day: d2,
          hour: hh2, minute: mm2,
          lat: geo!.lat, lng: geo!.lng, tz: geo!.timezone, city: geo!.shortName,
          sunSign:  chart.sun.sign,
          moonSign: chart.moon.sign,
          ascSign:  chart.ascendant.sign,
        });
        trackCalculatorCompleted('carta_natal');
        setState({ status: 'ok', result: { type: 'natal', ...chart, city: geo.shortName, timezone: geo.timezone, utcTime, kerykeion } });
      } else {
        trackCalculatorCompleted('ascendente');
        setState({ status: 'ok', result: { type: 'ascendente', ascendant: chart.ascendant, city: geo.shortName, timezone: geo.timezone, utcTime } });
      }
    } catch (err) {
      setState({ status: 'error', msg: err instanceof Error ? err.message : 'Error al calcular. Inténtalo de nuevo.' });
    }
  }

  // ── Render results ────────────────────────────────────────────────────────────

  if (state.status === 'ok') {
    const showPopup = !popupDone && state.result.type === 'natal';
    return (
      <>
        {showPopup && <EmailPopup onSubmit={submitPopup} onDismiss={dismissPopup} birthPayload={birthPayload} />}
        <div ref={resultsRef}>
          <ResultsPanel result={state.result} onReset={handleReset} />
        </div>
      </>
    );
  }

  const isLoading = state.status === 'loading';
  const btnLabel  =
    type === 'natal'      ? 'Calcular carta natal gratis →' :
    type === 'ascendente' ? 'Calcular ascendente gratis →'  :
                            'Calcular numerología gratis →';

  return (
    <div>
      {state.status === 'error' && (
        <div style={{ background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: '8px', padding: '14px 18px', marginBottom: '20px', fontFamily: 'var(--font-garamond)', fontSize: '0.95rem', color: '#991b1b' }}>
          {state.msg}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '8px', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        {isAstro ? (
          <>
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
              <Field label="Fecha de nacimiento" type="date" value={fecha} onChange={setFecha} required />
              <Field label="Hora de nacimiento"  type="time" value={hora}  onChange={setHora}  required />
            </div>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)' }}>
                Ciudad de nacimiento
              </span>
              <input
                type="text"
                value={ciudad}
                onChange={e => handleCiudadChange(e.target.value)}
                placeholder="p.ej. Madrid, España"
                required
                style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', padding: '11px 14px', border: `1px solid ${geoStatus === 'error' ? '#fca5a5' : geoStatus === 'ok' ? '#86efac' : 'var(--line)'}`, borderRadius: '4px', background: 'var(--bg)', color: 'var(--ink)', outline: 'none', width: '100%', transition: 'border-color .2s' }}
                onFocus={e => { if (geoStatus === 'idle') e.target.style.borderColor = 'var(--accent)'; }}
                onBlur={e  => { if (geoStatus === 'idle') e.target.style.borderColor = 'var(--line)'; }}
              />
              {geoStatus === 'searching' && <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--ink-mute)' }}>Buscando ciudad…</span>}
              {geoStatus === 'ok' && geoResult && <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: '#16a34a' }}>✓ {geoResult.displayName}</span>}
              {geoStatus === 'error' && <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: '#dc2626' }}>Ciudad no encontrada. Prueba con el nombre en inglés o añade el país.</span>}
            </label>
            <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.85rem', color: 'var(--ink-mute)', margin: '-8px 0 0', lineHeight: 1.5 }}>
              El ascendente cambia cada ~2 horas. Introduce la hora lo más exacta posible.
            </p>
          </>
        ) : (
          <>
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
              <Field label="Nombre"    type="text" value={nombre}    onChange={setNombre}    placeholder="p.ej. María"        required />
              <Field label="Apellidos" type="text" value={apellidos} onChange={setApellidos} placeholder="p.ej. García López" required />
            </div>
            <Field label="Fecha de nacimiento" type="date" value={fecha} onChange={setFecha} required />
          </>
        )}

        <button type="submit" className="btn btn-accent btn-block" disabled={isLoading} style={{ opacity: isLoading ? 0.7 : 1 }}>
          {isLoading ? state.msg : btnLabel}
        </button>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-garamond)', fontSize: '0.9rem', color: 'var(--ink-mute)', margin: 0 }}>
          Sin registro · Sin pago · Resultado inmediato
        </p>
      </form>
    </div>
  );
}

// ── Controlled field ──────────────────────────────────────────────────────────

function Field({ label, type, value, onChange, placeholder, required }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)' }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--ink)', outline: 'none', width: '100%', transition: 'border-color .2s' }}
        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={e  => (e.target.style.borderColor = 'var(--line)')}
      />
    </label>
  );
}

// ── Email popup ───────────────────────────────────────────────────────────────

function EmailPopup({ onSubmit, onDismiss, birthPayload }: {
  onSubmit: () => void;
  onDismiss: () => void;
  birthPayload: BirthPayloadForEmail | null;
}) {
  const [email,      setEmail]      = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent,       setSent]       = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/deliver-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          birth: birthPayload,
          moonSign: birthPayload?.moonSign,
          ascSign:  birthPayload?.ascSign,
        }),
      });
      setSent(true);
      setTimeout(onSubmit, 1400);
    } catch {
      onSubmit();
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(10,10,20,0.72)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '20px',
      backdropFilter: 'blur(2px)',
    }}>
      <div style={{
        background: 'var(--bg)',
        borderRadius: '12px',
        padding: 'clamp(32px,5vw,48px)',
        maxWidth: '460px', width: '100%',
        boxShadow: '0 24px 64px rgba(0,0,0,0.28)',
      }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <p style={{ fontSize: '2rem', marginBottom: '12px' }}>✨</p>
            <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: '1.6rem', color: 'var(--ink)', marginBottom: '10px' }}>
              En camino
            </h2>
            <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Te enviamos la carta en unos minutos. Revisa también el spam.
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: '10px' }}>
              Tu carta natal está lista
            </p>
            <h2 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.5rem,4vw,1.9rem)', color: 'var(--ink)', marginBottom: '10px', lineHeight: 1.2 }}>
              Recíbela en PDF, gratis
            </h2>
            <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '24px' }}>
              Te enviamos la carta técnica a tu correo en menos de 2 minutos. Sin spam, sin compromiso.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                autoFocus
                style={{
                  fontFamily: 'var(--font-garamond)', fontSize: '1rem',
                  padding: '12px 16px',
                  border: '1px solid var(--line)', borderRadius: '6px',
                  background: 'var(--bg)', color: 'var(--ink)', outline: 'none', width: '100%',
                  transition: 'border-color .2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--line)')}
              />
              <button type="submit" className="btn btn-accent btn-block" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Recibir mi carta en PDF →'}
              </button>
            </form>
            <button
              onClick={onDismiss}
              style={{
                display: 'block', width: '100%', marginTop: '14px',
                background: 'none', border: 'none',
                fontFamily: 'var(--font-garamond)', fontSize: '0.92rem',
                color: 'var(--ink-mute)', cursor: 'pointer', padding: '6px',
                textAlign: 'center', textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              No, prefiero ver los resultados aquí
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Results dispatcher ────────────────────────────────────────────────────────

function ResultsPanel({ result, onReset }: { result: CalcResult; onReset: () => void }) {
  if (result.type === 'natal')      return <NatalPanel     result={result} onReset={onReset} />;
  if (result.type === 'ascendente') return <AscPanel       result={result} onReset={onReset} />;
  return                                   <NumPanel       result={result} onReset={onReset} />;
}

function ResetBtn({ onReset }: { onReset: () => void }) {
  return (
    <button
      onClick={onReset}
      style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'block', marginTop: '4px' }}
    >
      ← Calcular de nuevo
    </button>
  );
}

// ── Elemento / modalidad badges ───────────────────────────────────────────────

function SignBadges({ sign }: { sign: ZodiacSign }) {
  const element  = SIGN_ELEMENT[sign];
  const modality = SIGN_MODALITY[sign];
  return (
    <div style={{ marginBottom: '12px' }}>
      <span style={{ ...BADGE_BASE, ...ELEMENT_COLORS[element] }}>{element}</span>
      <span style={{ ...BADGE_BASE, ...MODALITY_COLORS }}>{modality}</span>
    </div>
  );
}

// ── Planet row (unlocked) ─────────────────────────────────────────────────────

function PlanetRow({ glyph, label, pos, descMap }: {
  glyph: string; label: string; pos: SignPos;
  descMap: Record<ZodiacSign, string>;
}) {
  return (
    <div style={{ paddingBottom: '28px', marginBottom: '28px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '1.4rem', color: 'var(--gold)', width: '32px', flexShrink: 0, lineHeight: 1.3, textAlign: 'center', paddingTop: '2px' }}>
          {glyph}
        </span>
        <div style={{ flex: 1 }}>
          <span style={LABEL}>{label}</span>
          <p style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.35rem', color: 'var(--ink)', marginBottom: '10px' }}>
            {pos.symbol} {pos.sign}{' '}
            <span style={{ fontWeight: 400, fontSize: '0.9rem', color: 'var(--ink-mute)' }}>{pos.degree}°</span>
          </p>
          <SignBadges sign={pos.sign} />
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.7, margin: 0 }}>
            {descMap[pos.sign]}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Planet row (locked) ───────────────────────────────────────────────────────

function LockedPlanetRow({ glyph, label, sub, signEs, retrograde, teaser }: {
  glyph: string; label: string; sub: string; signEs: string; retrograde: boolean; teaser?: string | null;
}) {
  return (
    <div style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '1.3rem', color: 'var(--gold)', width: '32px', flexShrink: 0, textAlign: 'center', opacity: 0.7, paddingTop: '2px' }}>
          {glyph}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: '1.05rem', color: 'var(--ink)', margin: '0 0 6px' }}>
            {label} en {signEs}{retrograde ? ' Rx' : ''}
          </p>
          {teaser ? (
            <div style={{ position: 'relative', maxHeight: '72px', overflow: 'hidden' }}>
              <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>
                {teaser}
              </p>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '52px',
                background: 'linear-gradient(to bottom, transparent, var(--bg))',
                pointerEvents: 'none',
              }} />
            </div>
          ) : (
            <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '0.82rem', color: 'var(--ink-mute)', margin: 0, lineHeight: 1.4 }}>
              {sub}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0, paddingTop: '2px' }}>
          <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>🔒</span>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.62rem', fontWeight: 600, color: 'var(--ink-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Premium
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{
      fontFamily: 'var(--font-inter)', fontSize: '0.68rem', fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)',
      margin: '28px 0 4px', paddingBottom: '8px', borderBottom: '1px solid var(--line)',
    }}>
      {children}
    </p>
  );
}

// ── Timezone note ─────────────────────────────────────────────────────────────

function TzNote({ timezone, utcTime }: { timezone: string; utcTime: string }) {
  return (
    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', color: 'var(--ink-mute)', marginTop: '6px', marginBottom: '0', letterSpacing: '0.02em' }}>
      Zona horaria: {timezone.replace('_', ' ')} · {utcTime}
    </p>
  );
}

// ── Upsell block ──────────────────────────────────────────────────────────────

function UpsellBlock() {
  return (
    <div style={{
      background: '#12111a',
      borderRadius: '10px',
      padding: 'clamp(28px,5vw,40px) clamp(24px,4vw,36px)',
      textAlign: 'center',
      marginTop: '12px',
    }}>
      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#c9b88a', marginBottom: '12px' }}>
        Estudio completo · PDF personalizado
      </p>
      <h3 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(1.4rem,3.5vw,1.9rem)', color: '#f0ead6', marginBottom: '14px', lineHeight: 1.25 }}>
        Desbloquea tu carta natal completa
      </h3>
      <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: '#b8b0a4', lineHeight: 1.65, marginBottom: '26px', maxWidth: '400px', margin: '0 auto 26px' }}>
        Los 10 planetas, las 12 casas, Quirón, Nodos lunares, aspectos principales y
        10.000–15.000 palabras de interpretación narrativa. Listo en menos de 20 minutos.
      </p>
      <Link
        href="/precios/"
        style={{
          display: 'inline-block',
          background: '#c9b88a', color: '#12111a',
          fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '0.9rem',
          padding: '14px 32px', borderRadius: '6px', textDecoration: 'none',
          letterSpacing: '0.04em', transition: 'opacity .2s',
        }}
      >
        Ver estudio de carta natal · 29 €
      </Link>
      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', color: '#6b6560', marginTop: '14px', letterSpacing: '0.02em' }}>
        Entrega por email · IVA incluido · Pago seguro
      </p>
    </div>
  );
}

// ── Carta natal ───────────────────────────────────────────────────────────────

function NatalPanel({ result, onReset }: { result: NatalRes; onReset: () => void }) {
  const synthesis  = buildSynthesis(result.sun, result.moon, result.ascendant);
  const kp         = result.kerykeion?.planets;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={CARD}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ ...EYEBROW, marginBottom: '4px' }}>Tu carta natal · {result.city}</p>
          <TzNote timezone={result.timezone} utcTime={result.utcTime} />
        </div>

        {/* ── Big Three ── */}
        <SectionLabel>Tu Big Three · desbloqueado</SectionLabel>

        <PlanetRow glyph="☉" label="Sol — tu esencia"         pos={result.sun}       descMap={SUN_DESC}  />
        <PlanetRow glyph="☽" label="Luna — tu mundo interior" pos={result.moon}      descMap={MOON_DESC} />
        <PlanetRow glyph="↑" label="Ascendente — tu máscara"  pos={result.ascendant} descMap={ASC_DESC}  />

        {/* Synthesis */}
        <div style={{ background: 'var(--bg-warm)', borderRadius: '6px', padding: '22px', marginBottom: '8px' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)', marginBottom: '12px' }}>
            Tu Big Three en síntesis
          </p>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.75, margin: 0 }}>
            {synthesis}
          </p>
        </div>

        {/* ── Planetas con kerykeion ── */}
        {kp && (
          <>
            <SectionLabel>Planetas personales</SectionLabel>
            {PERSONAL_PLANETS.map(key => {
              const info      = PLANET_INFO[key];
              const p         = kp[key];
              if (!info || !p) return null;
              const planetKey = toKerykeionPlanetKey(key);
              const teaser    = planetKey ? getPlanetSignTeaser(planetKey, p.sign_es) : null;
              return (
                <LockedPlanetRow
                  key={key}
                  glyph={info.glyph}
                  label={info.label}
                  sub={info.sub}
                  signEs={p.sign_es}
                  retrograde={p.retrograde}
                  teaser={teaser}
                />
              );
            })}

            <SectionLabel>Planetas sociales y transpersonales</SectionLabel>
            {OUTER_PLANETS.map(key => {
              const info      = PLANET_INFO[key];
              const p         = kp[key];
              if (!info || !p) return null;
              const planetKey = toKerykeionPlanetKey(key);
              const teaser    = planetKey ? getPlanetSignTeaser(planetKey, p.sign_es) : null;
              return (
                <LockedPlanetRow
                  key={key}
                  glyph={info.glyph}
                  label={info.label}
                  sub={info.sub}
                  signEs={p.sign_es}
                  retrograde={p.retrograde}
                  teaser={teaser}
                />
              );
            })}
          </>
        )}
      </div>

      {/* ── Upsell ── */}
      <UpsellBlock />

      <ResetBtn onReset={onReset} />
    </div>
  );
}

// ── Ascendente ────────────────────────────────────────────────────────────────

function AscPanel({ result, onReset }: { result: AscRes; onReset: () => void }) {
  const sign    = result.ascendant.sign;
  const element  = SIGN_ELEMENT[sign];
  const modality = SIGN_MODALITY[sign];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ ...CARD }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ ...EYEBROW, marginBottom: '4px' }}>Tu ascendente · {result.city}</p>
          <TzNote timezone={result.timezone} utcTime={result.utcTime} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ display: 'block', fontSize: '3.5rem', marginBottom: '6px' }}>
            {result.ascendant.symbol}
          </span>
          <p style={{ fontFamily: 'var(--font-garamond)', fontWeight: 500, fontSize: 'clamp(2rem,5vw,2.8rem)', color: 'var(--ink)', margin: '0 0 6px' }}>
            {result.ascendant.sign}
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'var(--ink-mute)', margin: '0 0 14px' }}>
            {result.ascendant.degree}° en {result.ascendant.sign}
          </p>
          <div style={{ justifyContent: 'center', display: 'flex', gap: '8px', marginBottom: '28px' }}>
            <span style={{ ...BADGE_BASE, ...ELEMENT_COLORS[element] }}>{element}</span>
            <span style={{ ...BADGE_BASE, ...MODALITY_COLORS }}>{modality}</span>
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.05rem', color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '28px' }}>
          {ASC_DESC[sign]}
        </p>

        <div style={{ background: 'var(--bg-warm)', borderRadius: '6px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)', marginBottom: '10px' }}>
            ¿Qué significa el Ascendente?
          </p>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.7, margin: 0 }}>
            El Ascendente es el signo que estaba saliendo por el horizonte este en el momento exacto de tu nacimiento. Es tu máscara social — la primera impresión que das, el cuerpo que habitas, la manera en que te aproximas al mundo antes de que nadie te conozca de verdad. Mientras el Sol describe tu esencia y la Luna tu mundo emocional, el Ascendente es la envoltura visible que ambos usan para relacionarse con el exterior.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', marginBottom: '16px', lineHeight: 1.65 }}>
            Para ver cómo interactúa tu Ascendente con tu Sol y tu Luna, calcula la carta natal completa.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/carta-natal/" className="btn btn-accent">Calcular carta natal gratis</Link>
            <Link href="/precios/"    className="btn btn-ghost">Estudio premium · 29 €</Link>
          </div>
        </div>
      </div>
      <ResetBtn onReset={onReset} />
    </div>
  );
}

// ── Numerología ───────────────────────────────────────────────────────────────

function NumPanel({ result, onReset }: { result: NumRes; onReset: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={CARD}>
        <p style={EYEBROW}>
          Numerología · {result.nombre}
          {result.isMaster && <span style={{ marginLeft: '10px', color: 'var(--gold)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>Número Maestro</span>}
          {result.isKarmic && <span style={{ marginLeft: '10px', color: 'var(--gold)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>Deuda Kármica</span>}
        </p>

        {NUM_ROWS.map(({ key, label, sub, useYearDesc }) => {
          const value = result[key as keyof NumerologyResult] as number;
          const desc  = useYearDesc ? (YEAR_DESC[value] ?? NUM_DESC[value]) : NUM_DESC[value];
          const isMasterNum = [11, 22, 33].includes(value);
          return (
            <div key={key} style={{ paddingBottom: '24px', marginBottom: '24px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'center', flexShrink: 0, width: '52px' }}>
                  <span style={{ fontFamily: 'var(--font-garamond)', fontSize: '2.2rem', color: isMasterNum ? 'var(--gold)' : 'var(--ink)', fontWeight: 500, lineHeight: 1 }}>
                    {value}
                  </span>
                  {isMasterNum && (
                    <span style={{ display: 'block', fontFamily: 'var(--font-inter)', fontSize: '0.55rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
                      Maestro
                    </span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={LABEL}>{label}</span>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: 'var(--ink-mute)', marginBottom: '10px', lineHeight: 1.4 }}>
                    {sub}
                  </p>
                  <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.72, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ background: 'var(--bg-warm)', borderRadius: '6px', padding: '20px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1rem', color: 'var(--ink-soft)', marginBottom: '16px', lineHeight: 1.65 }}>
            Esto es un resumen de los 6 números base. El estudio completo son 50–60 páginas de interpretación narrativa que incluyen los 3 Ciclos de Vida, los 4 Pináculos, los números ausentes (lecciones kármicas), el diálogo entre la numerología y tu carta natal, y la proyección de los próximos años personales.
          </p>
          <Link href="/precios/" className="btn btn-accent">Ver estudio numerológico · 19 €</Link>
        </div>
      </div>
      <ResetBtn onReset={onReset} />
    </div>
  );
}
