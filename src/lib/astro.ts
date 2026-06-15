// Astronomical calculations — Jean Meeus simplified formulas
// Accuracy: Sun ~0.01°, Moon ~1°, Ascendant ~0.2° — sufficient for sign determination (30° per sign)

export type ZodiacSign =
  | 'Aries' | 'Tauro' | 'Géminis' | 'Cáncer' | 'Leo' | 'Virgo'
  | 'Libra' | 'Escorpio' | 'Sagitario' | 'Capricornio' | 'Acuario' | 'Piscis';

const SIGNS: ZodiacSign[] = [
  'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
  'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis',
];

export const SIGN_SYMBOLS: Record<ZodiacSign, string> = {
  'Aries': '♈', 'Tauro': '♉', 'Géminis': '♊', 'Cáncer': '♋',
  'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Escorpio': '♏',
  'Sagitario': '♐', 'Capricornio': '♑', 'Acuario': '♒', 'Piscis': '♓',
};

export interface SignPos {
  sign: ZodiacSign;
  symbol: string;
  degree: number;
}

export interface NatalChart {
  sun: SignPos;
  moon: SignPos;
  ascendant: SignPos;
}

function norm(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function toRad(deg: number): number { return (deg * Math.PI) / 180; }
function toDeg(rad: number): number { return (rad * 180) / Math.PI; }

function toSignPos(eclipticLon: number): SignPos {
  const lon = norm(eclipticLon);
  const idx = Math.floor(lon / 30);
  const sign = SIGNS[idx];
  return { sign, symbol: SIGN_SYMBOLS[sign], degree: Math.floor(lon % 30) };
}

export function julianDay(
  year: number, month: number, day: number, hour: number, minute: number
): number {
  let Y = year, M = month;
  if (M <= 2) { Y--; M += 12; }
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (Y + 4716)) +
    Math.floor(30.6001 * (M + 1)) +
    day + B - 1524.5 +
    (hour + minute / 60) / 24
  );
}

function greenwichSiderealTime(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return norm(
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000
  );
}

function sunLongitude(jd: number): number {
  const d = jd - 2451545.0;
  const L = norm(280.460 + 0.9856474 * d);
  const g = toRad(norm(357.528 + 0.9856003 * d));
  return norm(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
}

function moonLongitude(jd: number): number {
  const d = jd - 2451545.0;
  const L  = norm(218.316 + 13.176396 * d);
  const M  = toRad(norm(134.963 + 13.064993 * d));
  const F  = toRad(norm(93.272  + 13.229350 * d));
  const Ms = toRad(norm(357.528 +  0.9856003 * d));
  return norm(
    L +
    6.289 * Math.sin(M) -
    1.274 * Math.sin(2 * Ms - M) +
    0.658 * Math.sin(2 * F) -
    0.186 * Math.sin(Ms) -
    0.059 * Math.sin(2 * M - 2 * F) -
    0.057 * Math.sin(2 * Ms - 2 * M) +
    0.053 * Math.sin(2 * M + 2 * F) +
    0.046 * Math.sin(2 * Ms - 2 * F)
  );
}

function ascendantLongitude(jd: number, latDeg: number, lngDeg: number): number {
  const eps  = toRad(23.439 - 0.0000004 * (jd - 2451545.0));
  const RAMC = toRad(norm(greenwichSiderealTime(jd) + lngDeg));
  const lat  = toRad(latDeg);
  const y = -Math.cos(RAMC);
  const x =  Math.sin(RAMC) * Math.cos(eps) + Math.tan(lat) * Math.sin(eps);
  // When x < 0 the formula lands on the Descendant (wrong root). Add 180° to flip to Ascendant.
  return norm(toDeg(Math.atan2(y, x)) + (x < 0 ? 180 : 0));
}

export function calcChart(
  year: number, month: number, day: number,
  hourUTC: number, minuteUTC: number,
  latDeg: number, lngDeg: number
): NatalChart {
  const jd = julianDay(year, month, day, hourUTC, minuteUTC);
  return {
    sun:       toSignPos(sunLongitude(jd)),
    moon:      toSignPos(moonLongitude(jd)),
    ascendant: toSignPos(ascendantLongitude(jd, latDeg, lngDeg)),
  };
}

// Convert local birth datetime (dateStr='YYYY-MM-DD', timeStr='HH:MM') to UTC Date
// Uses Intl.DateTimeFormat which handles DST and historical timezone rules correctly
export function localToUTC(dateStr: string, timeStr: string, timezone: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute]     = timeStr.split(':').map(Number);

  // Step 1: treat local time as if UTC (naive guess)
  const naiveUTC = new Date(Date.UTC(year, month - 1, day, hour, minute));

  // Step 2: ask what that UTC instant looks like in the target timezone
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(naiveUTC);
  const p: Record<string, string> = {};
  for (const part of parts) p[part.type] = part.value;

  let h = parseInt(p.hour, 10);
  if (h === 24) h = 0; // midnight edge case in some implementations

  const shownMs = Date.UTC(
    parseInt(p.year, 10),
    parseInt(p.month, 10) - 1,
    parseInt(p.day, 10),
    h,
    parseInt(p.minute, 10)
  );

  // Step 3: offset = naiveUTC - shownLocal (the timezone offset in ms)
  const offsetMs  = naiveUTC.getTime() - shownMs;
  const wantedMs  = Date.UTC(year, month - 1, day, hour, minute);
  return new Date(wantedMs + offsetMs);
}
