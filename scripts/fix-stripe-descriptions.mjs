/**
 * Actualiza las descripciones de los productos en Stripe (quita los recuentos de páginas).
 * node --env-file=.env.local scripts/fix-stripe-descriptions.mjs
 */
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const NEW_DESCRIPTIONS = {
  numerologia: 'Interpretación pitagórica personalizada en PDF: Camino de Vida, Expresión, Alma, Personalidad, Destino, Ciclos, Pináculos, Año Personal y lecciones kármicas. Entrega en menos de 10 minutos.',
  'carta-natal': 'Interpretación astrológica personalizada en PDF: Big Three, planetas personales y transpersonales, casas, aspectos, Quirón, Nodos lunares y rueda zodiacal SVG. Entrega en menos de 10 minutos.',
  pack: 'Carta natal interpretada + estudio numerológico completo + diálogo entre ambos sistemas y síntesis final integrada, en PDF. Entrega en menos de 10 minutos.',
};

const products = await stripe.products.list({ limit: 20, active: true });

for (const prod of products.data) {
  const id = prod.metadata?.cosmyastral_id;
  if (!id || !NEW_DESCRIPTIONS[id]) continue;
  await stripe.products.update(prod.id, { description: NEW_DESCRIPTIONS[id] });
  console.log(`✓ ${prod.name}`);
  console.log(`  → ${NEW_DESCRIPTIONS[id]}`);
}

console.log('\nListo.');
