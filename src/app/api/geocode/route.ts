import { NextResponse } from 'next/server';

// Module-level cache — survives across requests within the same server process.
// Prevents Nominatim from returning slightly different coordinates on repeated calls,
// which would cause the ascendant to flip sign near cusps.
type GeoResult = { lat: number; lng: number; timezone: string; shortName: string; displayName: string };
const geoCache = new Map<string, GeoResult>();

// Country → IANA timezone (covers Spain + LATAM + main EU countries)
const COUNTRY_TZ: Record<string, string> = {
  es: 'Europe/Madrid',
  ar: 'America/Argentina/Buenos_Aires',
  co: 'America/Bogota',
  cl: 'America/Santiago',
  pe: 'America/Lima',
  ve: 'America/Caracas',
  bo: 'America/La_Paz',
  ec: 'America/Guayaquil',
  py: 'America/Asuncion',
  uy: 'America/Montevideo',
  cr: 'America/Costa_Rica',
  gt: 'America/Guatemala',
  hn: 'America/Tegucigalpa',
  sv: 'America/El_Salvador',
  ni: 'America/Managua',
  pa: 'America/Panama',
  do: 'America/Santo_Domingo',
  cu: 'America/Havana',
  pr: 'America/Puerto_Rico',
  gb: 'Europe/London',
  fr: 'Europe/Paris',
  de: 'Europe/Berlin',
  it: 'Europe/Rome',
  pt: 'Europe/Lisbon',
  nl: 'Europe/Amsterdam',
  be: 'Europe/Brussels',
  ch: 'Europe/Zurich',
  at: 'Europe/Vienna',
  pl: 'Europe/Warsaw',
};

function getMXTimezone(lng: number): string {
  if (lng > -97)  return 'America/Merida';
  if (lng > -104) return 'America/Mexico_City';
  if (lng > -111) return 'America/Hermosillo';
  return 'America/Tijuana';
}

function getBRTimezone(lng: number): string {
  if (lng > -44) return 'America/Sao_Paulo';
  if (lng > -53) return 'America/Manaus';
  return 'America/Manaus';
}

function getUSTimezone(lng: number): string {
  if (lng > -85)  return 'America/New_York';
  if (lng > -100) return 'America/Chicago';
  if (lng > -115) return 'America/Denver';
  return 'America/Los_Angeles';
}

function getCATimezone(lng: number): string {
  if (lng > -75)  return 'America/Toronto';
  if (lng > -90)  return 'America/Winnipeg';
  if (lng > -105) return 'America/Edmonton';
  return 'America/Vancouver';
}

function guessTimezone(countryCode: string, lat: number, lng: number): string {
  const cc = countryCode.toLowerCase();
  if (cc === 'mx') return getMXTimezone(lng);
  if (cc === 'br') return getBRTimezone(lng);
  if (cc === 'us') return getUSTimezone(lng);
  if (cc === 'ca') return getCATimezone(lng);
  return COUNTRY_TZ[cc] ?? 'UTC';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();
  if (!q) return NextResponse.json({ error: 'Parámetro q requerido' }, { status: 400 });

  // Return cached result if available — prevents any Nominatim variance affecting the ascendant
  const cacheKey = q.toLowerCase();
  const cached = geoCache.get(cacheKey);
  if (cached) return NextResponse.json(cached);

  const nominatimUrl =
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1&addressdetails=1`;

  let nominatimData: {
    lat: string; lon: string; display_name: string;
    address: { country_code?: string; city?: string; town?: string; village?: string; county?: string; state?: string; country?: string };
  }[];

  try {
    const res = await fetch(nominatimUrl, {
      headers: { 'User-Agent': 'Cosmyastral/1.0 (cosmyastral.com)' },
      next: { revalidate: 86400 },
    });
    nominatimData = await res.json();
  } catch {
    return NextResponse.json({ error: 'Error conectando con el servicio de geocodificación' }, { status: 502 });
  }

  if (!nominatimData.length) {
    return NextResponse.json({ error: 'Ciudad no encontrada. Prueba con un formato diferente, p.ej. "Madrid, España" o "Buenos Aires, Argentina".' }, { status: 404 });
  }

  const { lat: latStr, lon: lngStr, display_name, address } = nominatimData[0];
  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);
  const countryCode = address.country_code ?? 'zz';
  const timezone = guessTimezone(countryCode, lat, lng);

  // Build a short display name: first city-like field + country
  const city = address.city ?? address.town ?? address.village ?? address.county ?? address.state ?? '';
  const country = address.country ?? '';
  const shortName = [city, country].filter(Boolean).join(', ') || display_name.split(',')[0];

  const result: GeoResult = { lat, lng, timezone, shortName, displayName: display_name };
  geoCache.set(cacheKey, result);

  return NextResponse.json(result);
}
