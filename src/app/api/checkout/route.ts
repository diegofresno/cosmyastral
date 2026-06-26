import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured');
  return new Stripe(key);
}

type ProductId = 'numerologia' | 'carta-natal' | 'pack';

const LATAM_COUNTRIES = new Set(['AR','MX','CO','CL','PE','VE','BO','EC','PY','UY','CR','GT','HN','SV','NI','PA','DO','CU','PR']);

const PRICES: Record<ProductId, { es: string; latam: string }> = {
  'numerologia': { es: process.env.STRIPE_PRICE_NUMEROLOGIA_ES!, latam: process.env.STRIPE_PRICE_NUMEROLOGIA_LATAM! },
  'carta-natal': { es: process.env.STRIPE_PRICE_CARTA_NATAL_ES!, latam: process.env.STRIPE_PRICE_CARTA_NATAL_LATAM! },
  'pack':        { es: process.env.STRIPE_PRICE_PACK_ES!,         latam: process.env.STRIPE_PRICE_PACK_LATAM! },
};

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function POST(req: NextRequest) {
  let body: {
    producto: string;
    nombre: string;
    email: string;
    fecha_nac: string;
    hora_nac?: string;
    lugar_nac?: string;
    lat?: number | null;
    lng?: number | null;
    timezone?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const { producto, nombre, email, fecha_nac, hora_nac, lugar_nac, lat, lng, timezone } = body;

  if (!PRICES[producto as ProductId]) {
    return NextResponse.json({ error: 'Producto no válido' }, { status: 400 });
  }
  if (!nombre?.trim() || !email?.trim() || !fecha_nac) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const country = (req.headers.get('x-vercel-ip-country') ?? 'ES').toUpperCase();
  const isLatam = LATAM_COUNTRIES.has(country);
  const priceId = isLatam
    ? PRICES[producto as ProductId].latam
    : PRICES[producto as ProductId].es;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email.trim(),
      metadata: {
        producto,
        nombre:    nombre.trim().slice(0, 200),
        fecha_nac,
        hora_nac:  hora_nac  || 'desconocida',
        lugar_nac: (lugar_nac || '').slice(0, 200),
        lat:       lat  != null ? String(lat)  : '',
        lng:       lng  != null ? String(lng)  : '',
        timezone:  (timezone || '').slice(0, 50),
        region:    isLatam ? 'latam' : 'es',
      },
      success_url: `${SITE}/gracias/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${SITE}/precios/`,
      locale: 'es',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[checkout]', msg);
    return NextResponse.json({ error: 'Error al crear la sesión de pago.' }, { status: 500 });
  }
}
