import Stripe from 'stripe';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured');
  return new Stripe(key);
}

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY not configured');
  return new Resend(key);
}

const PRODUCT_NAMES: Record<string, string> = {
  'numerologia': 'Estudio numerológico completo',
  'carta-natal': 'Carta natal interpretada',
  'pack':        'Pack completo',
};

async function sendOrderEmail(session: Stripe.Checkout.Session) {
  const resend = getResend();
  const to     = process.env.NOTIFICATION_EMAIL ?? 'hola@diegofresno.com';
  const m      = session.metadata ?? {};

  const amount  = ((session.amount_total ?? 0) / 100).toFixed(2);
  const currency = (session.currency ?? 'eur').toUpperCase();
  const product  = PRODUCT_NAMES[m.producto] ?? m.producto ?? '?';

  const rows = [
    ['Producto',       product],
    ['Importe',        `${amount} ${currency}`],
    ['Nombre',         m.nombre ?? ''],
    ['Email cliente',  session.customer_email ?? ''],
    ['Fecha nac.',     m.fecha_nac ?? ''],
    ['Hora nac.',      m.hora_nac ?? ''],
    ...(m.lugar_nac ? [['Lugar nac.', m.lugar_nac]] : []),
    ...(m.lat        ? [['Coordenadas', `${m.lat}, ${m.lng} (${m.timezone})`]] : []),
    ['Región',         m.region === 'latam' ? 'LATAM' : 'España'],
    ['Session ID',     session.id],
  ] as [string, string][];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
      <h2 style="color:#2a1c10;margin-bottom:24px">Nuevo pedido — Cosmyastral</h2>
      <table style="width:100%;border-collapse:collapse">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:8px 12px;background:#f5f0e8;font-weight:600;width:140px;border-bottom:1px solid #e0d5c5">${k}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e0d5c5">${v}</td>
          </tr>`).join('')}
      </table>
      <p style="margin-top:24px;font-size:13px;color:#888">
        Genera el PDF con el script Python y envíalo a <strong>${session.customer_email}</strong>.
      </p>
    </div>
  `;

  await resend.emails.send({
    from:    'onboarding@resend.dev',
    to,
    subject: `Nuevo pedido — ${product} (${amount} ${currency})`,
    html,
  });
}

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig     = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Falta stripe-signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'error';
    console.error('[webhook] signature check failed:', msg);
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await sendOrderEmail(session);
    } catch (err) {
      console.error('[webhook] email error:', err);
    }
  }

  return NextResponse.json({ received: true });
}
