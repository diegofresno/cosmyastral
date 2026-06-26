import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import CheckoutForm, { type ProductId } from '@/components/checkout/CheckoutForm';

const VALID: ProductId[] = ['numerologia', 'carta-natal', 'pack'];

const LATAM = new Set(['AR','MX','CO','CL','PE','VE','BO','EC','PY','UY','CR','GT','HN','SV','NI','PA','DO','CU','PR']);

const META: Record<ProductId, { title: string; desc: string }> = {
  'numerologia': {
    title: 'Pedir estudio numerológico — Cosmyastral',
    desc: 'Rellena tus datos de nacimiento y obtén tu estudio numerológico completo en PDF.',
  },
  'carta-natal': {
    title: 'Pedir carta natal interpretada — Cosmyastral',
    desc: 'Rellena tus datos de nacimiento y obtén tu carta natal interpretada en PDF.',
  },
  'pack': {
    title: 'Pedir pack completo — Cosmyastral',
    desc: 'Rellena tus datos de nacimiento y obtén el pack carta natal + numerología en PDF.',
  },
};

interface Props { params: Promise<{ producto: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { producto } = await params;
  if (!VALID.includes(producto as ProductId)) return {};
  const m = META[producto as ProductId];
  return {
    title: m.title,
    description: m.desc,
    robots: { index: false },
  };
}

export default async function PedirPage({ params }: Props) {
  const { producto } = await params;
  if (!VALID.includes(producto as ProductId)) notFound();

  const hdrs = await headers();
  const country = (hdrs.get('x-vercel-ip-country') ?? 'ES').toUpperCase();
  const region: 'es' | 'latam' = LATAM.has(country) ? 'latam' : 'es';

  return <CheckoutForm producto={producto as ProductId} region={region} />;
}
