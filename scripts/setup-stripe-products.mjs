/**
 * Crea los 3 productos de Cosmyastral en Stripe con sus precios ES y LATAM.
 * Ejecutar UNA SOLA VEZ en modo test, luego otra vez en modo live con las claves live.
 *
 * Uso:
 *   node --env-file=.env.local scripts/setup-stripe-products.mjs
 */

import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error('ERROR: STRIPE_SECRET_KEY no encontrada en .env.local');
  process.exit(1);
}

const stripe = new Stripe(key);

const PRODUCTS = [
  {
    id: 'numerologia',
    name: 'Estudio numerológico completo',
    description: '52–60 páginas de interpretación pitagórica personalizada: Camino de Vida, Expresión, Alma, Personalidad, Destino, Ciclos, Pináculos, Año Personal y lecciones kármicas.',
    price_es: 1900,    // céntimos
    price_latam: 900,
  },
  {
    id: 'carta-natal',
    name: 'Carta natal interpretada',
    description: '45–60 páginas de interpretación astrológica: Big Three, planetas personales y transpersonales, casas, aspectos, Quirón, Nodos lunares y rueda zodiacal SVG.',
    price_es: 2900,
    price_latam: 1400,
  },
  {
    id: 'pack',
    name: 'Pack completo — Carta natal + Numerología',
    description: '90–120 páginas: carta natal interpretada + estudio numerológico completo + diálogo entre ambos sistemas y síntesis final integrada.',
    price_es: 3900,
    price_latam: 1900,
  },
];

const results = {};

for (const prod of PRODUCTS) {
  console.log(`\nCreando producto: ${prod.name}`);

  const product = await stripe.products.create({
    name: prod.name,
    description: prod.description,
    metadata: { cosmyastral_id: prod.id },
  });

  const priceEs = await stripe.prices.create({
    product: product.id,
    unit_amount: prod.price_es,
    currency: 'eur',
    metadata: { region: 'es', cosmyastral_id: prod.id },
  });

  const priceLatam = await stripe.prices.create({
    product: product.id,
    unit_amount: prod.price_latam,
    currency: 'eur',
    metadata: { region: 'latam', cosmyastral_id: prod.id },
  });

  results[prod.id] = {
    product_id: product.id,
    price_es: priceEs.id,
    price_latam: priceLatam.id,
  };

  console.log(`  ✓ product_id : ${product.id}`);
  console.log(`  ✓ price_es   : ${priceEs.id}  (${prod.price_es / 100} €)`);
  console.log(`  ✓ price_latam: ${priceLatam.id}  (${prod.price_latam / 100} €)`);
}

console.log('\n\n=== COPIA ESTO EN .env.local ===\n');
for (const [id, val] of Object.entries(results)) {
  const key = id.replace(/-/g, '_').toUpperCase();
  console.log(`STRIPE_PRICE_${key}_ES=${val.price_es}`);
  console.log(`STRIPE_PRICE_${key}_LATAM=${val.price_latam}`);
}
console.log('\n================================\n');
