import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import BlogPosts from '@/components/blog/BlogPosts';

const SITE = 'https://cosmyastral.com';

export const metadata: Metadata = {
  title: 'Blog de Astrología y Numerología — Cosmyastral',
  description:
    'Guías, explicaciones y lecturas honestas sobre astrología y numerología. Sin predicciones mágicas — solo lo que los sistemas dicen realmente y por qué puede ser útil.',
  alternates: { canonical: '/blog/' },
};

export const POSTS = [
  {
    slug: 'venus-en-piscis',
    title: 'Venus en Piscis en la carta natal: el amor como devoción y fusión',
    excerpt: 'Venus en Piscis está en exaltación — la posición más espiritual y devota de Venus en el zodiaco. Ama sin reservas, con una empatía que pocas Venus igualan, y cuya sombra es la idealización que ciega ante la realidad del otro. Famosos verificados: Kurt Cobain, Drew Barrymore, Jon Bon Jovi.',
    category: 'Astrología',
    date: '2026-07-17',
  },
  {
    slug: 'venus-en-acuario',
    title: 'Venus en Acuario en la carta natal: el amor entre iguales',
    excerpt: 'Venus en Acuario ama desde la amistad, la originalidad y una independencia que no negocia. Busca relaciones entre iguales que te hagan más tú mismo — y su sombra es la distancia emocional que evita la vulnerabilidad real. Famosos verificados: Oprah Winfrey, Mozart, Harry Styles.',
    category: 'Astrología',
    date: '2026-07-17',
  },
  {
    slug: 'venus-en-sagitario',
    title: 'Venus en Sagitario en la carta natal: el amor como aventura compartida',
    excerpt: 'Venus en Sagitario ama con generosidad, entusiasmo y libertad. Convierte el amor en una expedición compartida — y su sombra son las promesas que el impulso hace y que la constancia luego no siempre cumple. Famosos verificados: Tina Turner, Jimi Hendrix, Jay-Z.',
    category: 'Astrología',
    date: '2026-07-17',
  },
  {
    slug: 'venus-en-libra',
    title: 'Venus en Libra en la carta natal: el amor como arte de la reciprocidad',
    excerpt: 'Venus en Libra está en domicilio — ama con elegancia, busca el equilibrio en todos sus vínculos y convierte la relación en una obra de arte. Su sombra es la incapacidad para sostener el conflicto necesario. Famosos verificados: Beyoncé, Oscar Wilde, Ryan Gosling, Will Smith.',
    category: 'Astrología',
    date: '2026-07-17',
  },
  {
    slug: 'venus-en-cancer',
    title: 'Venus en Cáncer en la carta natal: el amor como refugio',
    excerpt: 'Venus en Cáncer ama a través del cuidado, la memoria y la creación de un hogar emocional. Su forma de querer es profunda y nutritiva — y su sombra es el apego y la dificultad para soltar. Famosos verificados: Meryl Streep, Barack Obama, Ben Affleck.',
    category: 'Astrología',
    date: '2026-07-17',
  },
  {
    slug: 'venus-en-tauro',
    title: 'Venus en Tauro en la carta natal: el amor que construye y persiste',
    excerpt: 'Venus en Tauro está en su domicilio — ama con lealtad, con presencia física y con la intención de que lo que empieza no se rompa. Lenguaje del amor, la sombra de la posesividad, mujer y hombre, tabla de compatibilidad con todos los Venus, el tránsito anual y famosos verificados: Prince, Salvador Dalí, Marlon Brando, Johnny Depp, Jessica Alba y Karl Marx.',
    category: 'Astrología',
    date: '2026-07-17',
  },
  {
    slug: 'venus-en-leo',
    title: 'Venus en Leo en la carta natal: el amor que quiere ser visto',
    excerpt: 'Venus en Leo no ama en silencio. Ama con fanfarria, con gestos memorables y con la disposición de convertir el romance en algo que merezca ser recordado. Lenguaje del amor, la sombra del reconocimiento, mujer y hombre, tabla de compatibilidad con todos los Venus, tránsito de 2026 y famosos verificados: Madonna, Whitney Houston, Michael Jackson, Coco Chanel, Jennifer Lawrence y Pamela Anderson.',
    category: 'Astrología',
    date: '2026-07-15',
  },
  {
    slug: 'venus-en-capricornio',
    title: 'Venus en Capricornio en la carta natal: el amor que construye',
    excerpt: 'Venus en Capricornio no enamora con palabras — enamora con consistencia. Aparece cuando hace falta, cumple lo que promete y construye vínculos que duran. Lenguaje del amor, la sombra de la coraza, mujer y hombre, tabla de compatibilidad con todos los Venus, evolución antes y después de los 30, y famosos verificados: Elvis, Dolly Parton, Miley Cyrus, Brad Pitt, Diane Keaton y Jim Carrey.',
    category: 'Astrología',
    date: '2026-07-13',
  },
  {
    slug: 'venus-en-geminis',
    title: 'Venus en Géminis en la carta natal: el amor que necesita palabras',
    excerpt: 'Venus en Géminis ama con la mente: se enamora de quien le hace pensar, le sorprende y le hace reír. La conversación es su mayor afrodisíaco. Infidelidad emocional, patrones de infancia, compatibilidad con todos los Venus y famosos verificados: Dylan, Pacino, Cher, Campbell y Harrison Ford.',
    category: 'Astrología',
    date: '2026-07-10',
  },
  {
    slug: 'venus-en-aries',
    title: 'Venus en Aries en la carta natal: el amor que actúa, no espera',
    excerpt: 'Venus en detrimento en Aries no espera señales ni calcula tiempos. Ama rápido, conquista con franqueza y necesita aprender que el compromiso sostenido no apaga la llama — puede ser lo que la hace más real. Famosos verificados, patrones de infancia, mujer y hombre, tabla de compatibilidad.',
    category: 'Astrología',
    date: '2026-07-08',
  },
  {
    slug: 'venus-en-escorpio',
    title: 'Venus en Escorpio en la carta natal: el amor o nada',
    excerpt: 'Venus en detrimento en Escorpio no es Venus roto —es Venus que ama con una intensidad que la mayor parte del mundo no está preparada para sostener. Significado natal, la sombra de los celos, patrones de infancia y famosos con esta posición.',
    category: 'Astrología',
    date: '2026-07-06',
  },
  {
    slug: 'venus-en-virgo',
    title: 'Venus en Virgo en la carta natal: el amor que se construye',
    excerpt: 'Venus en caída en Virgo no es Venus debilitado —es Venus que aprendió que el amor no se declara, se hace. Significado natal, el lenguaje único de la crítica como cuidado, patrones de infancia y cómo afecta el tránsito de julio a agosto 2026.',
    category: 'Astrología',
    date: '2026-07-03',
  },
  {
    slug: 'ascendente-en-escorpio',
    title: 'Ascendente en Escorpio: significado, personalidad y propósito de vida',
    excerpt: 'El Ascendente en Escorpio llega al mundo con una presencia magnética que no necesita esfuerzo. Cómo te perciben, qué atrae el Descendente en Tauro, por qué el MC en Leo marca la vocación y los patrones de infancia que explican la desconfianza escorpiana.',
    category: 'Astrología',
    date: '2026-07-01',
  },
  {
    slug: 'ascendente-en-virgo',
    title: 'Ascendente en Virgo: significado, personalidad y propósito de vida',
    excerpt: 'El Ascendente en Virgo llega al mundo con calma, precisión y servicio. Cómo te perciben los demás, por qué Mercurio lo rige todo, qué atrae el Descendente en Piscis y cuál es el propósito de vida de este ascendente.',
    category: 'Astrología',
    date: '2026-06-29',
  },
  {
    slug: 'luna-en-piscis',
    title: 'Luna en Piscis en la carta natal: empatía sin límites y creatividad profunda',
    excerpt: 'La Luna en Piscis es la posición lunar de la empatía sin fronteras. Siente el mundo entero como propio, crea desde la intuición y necesita aprender a distinguir lo suyo de lo ajeno. Qué significa en tu carta.',
    category: 'Astrología',
    date: '2026-06-26',
  },
  {
    slug: 'luna-en-sagitario',
    title: 'Luna en Sagitario en la carta natal: optimismo, libertad y la huida del dolor',
    excerpt: 'La Luna en Sagitario necesita espacio, aventura y significado para sentirse viva. El optimismo es genuino —y a veces también un mecanismo para no quedarse con lo que duele. Qué significa en tu carta.',
    category: 'Astrología',
    date: '2026-06-26',
  },
  {
    slug: 'hora-espejo-11-11',
    title: 'Hora espejo 11:11: qué son las horas espejo y las 24 que existen',
    excerpt: 'Ver el 11:11, el 22:22 o el 01:01 en el reloj no es casualidad —al menos no del todo. Qué son las horas espejo, cuántas hay, qué dice la numerología de cada una y por qué el 11:11 encabeza la lista.',
    category: 'Numerología',
    date: '2026-06-19',
    featured: false,
  },
  {
    slug: 'luna-llena-julio-2026',
    title: 'Luna llena de julio 2026 en Acuario: el yo frente al colectivo',
    excerpt: 'El 29 de julio de 2026 la Luna llena ocurre en Acuario mientras el Sol transita Leo. Fecha exacta, hora, qué activa en cada Ascendente y cómo conecta con lo que sembraste en enero.',
    category: 'Ciclos lunares',
    date: '2026-06-17',
    featured: false,
  },
  {
    slug: 'carta-natal-gratis-explicada',
    title: 'Carta natal gratis: qué es, cómo leerla y qué te dice realmente',
    excerpt: 'Entender tu carta natal más allá del signo solar. Te explicamos qué es cada elemento, cómo interpretar los planetas en los signos y por qué la hora de nacimiento importa.',
    category: 'Astrología',
    date: '2026-06-01',
    featured: true,
  },
  {
    slug: 'luna-llena-significado-astrologico',
    title: 'Luna llena: significado astrológico, rituales y fechas 2026',
    excerpt: 'La luna llena marca el clímax del ciclo lunar. Te explicamos qué significa astrológicamente, cómo afecta emocionalmente y cuándo caen las lunas llenas de 2026.',
    category: 'Ciclos lunares',
    date: '2026-05-15',
  },
  {
    slug: 'luna-nueva-julio-2026',
    title: 'Luna nueva de julio 2026 en Cáncer: semilla emocional en el domicilio de la Luna',
    excerpt: 'El 14 de julio de 2026 la Luna nueva ocurre en Cáncer a las 12:45h hora España. Es la luna nueva más poderosa del año para intenciones emocionales: la Luna está en su propio domicilio.',
    category: 'Ciclos lunares',
    date: '2026-06-24',
  },
  {
    slug: 'luna-en-capricornio-carta-natal',
    title: 'Luna en Capricornio en la carta natal: estructura emocional y el poder del tiempo',
    excerpt: 'La Luna en Capricornio convierte la emoción en responsabilidad. Disciplina interior, dificultad con la vulnerabilidad y una lealtad sólida como la roca. Qué significa en tu carta.',
    category: 'Astrología',
    date: '2026-06-22',
  },
  {
    slug: 'luna-en-escorpio-carta-natal',
    title: 'Luna en Escorpio en la carta natal: intensidad emocional y regeneración',
    excerpt: 'La Luna en Escorpio es una de las posiciones lunares más intensas. Profundidad emocional, necesidad de transformación y dificultad para soltar. Qué significa en tu carta.',
    category: 'Astrología',
    date: '2026-05-08',
  },
  {
    slug: 'que-significa-11-11',
    title: 'Qué significa 11:11: amor, ángeles y llamas gemelas',
    excerpt: 'El número espejo más buscado del mundo, explicado desde la numerología, la tradición angelical y el amor. Qué dice cada perspectiva —y cuál se acerca más a lo que realmente ocurre.',
    category: 'Numerología',
    date: '2026-06-15',
  },
  {
    slug: '11-11-significado-espiritual',
    title: '11:11 significado: ¿qué hay detrás del número espejo más popular?',
    excerpt: 'El 11:11 se ha convertido en un fenómeno viral. Te explicamos qué dice la numerología sobre los números espejo, el 11 como número maestro y por qué lo vemos tanto.',
    category: 'Numerología',
    date: '2026-04-28',
  },
  {
    slug: 'camino-de-vida-11-numero-maestro',
    title: 'Camino de Vida 11: el número maestro de la intuición',
    excerpt: 'El Camino de Vida 11 es el más sensible e intuitivo de los números maestros. No se reduce a 2. Te explicamos qué implica, sus desafíos y su potencial de vida.',
    category: 'Numerología',
    date: '2026-04-10',
  },
  {
    slug: 'revolucion-solar-que-es-como-calcularla',
    title: 'Revolución solar: qué es, cómo se calcula y para qué sirve',
    excerpt: 'La revolución solar es la carta natal de tu año. Se calcula en el momento exacto en que el Sol vuelve al grado preciso donde estaba cuando naciste. Guía completa.',
    category: 'Astrología',
    date: '2026-03-22',
  },
];

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE}/blog/#blog`,
  name: 'Blog de Cosmyastral',
  url: `${SITE}/blog/`,
  description: 'Guías, explicaciones y lecturas honestas sobre astrología y numerología en español.',
  inLanguage: 'es',
  publisher: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Cosmyastral' },
  blogPost: POSTS.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `${SITE}/blog/${p.slug}/`,
    datePublished: p.date,
    description: p.excerpt,
    articleSection: p.category,
  })),
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogSchema} />
      <Breadcrumb crumbs={[{ label: 'Blog', href: '/blog/' }]} />

      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,80px) 32px', textAlign: 'center', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p className="eyebrow">Astrología · Numerología · Ciclos</p>
          <h1 style={{ fontFamily: 'var(--font-garamond)', fontWeight: 400, fontSize: 'clamp(2.2rem,4.5vw,3.6rem)', lineHeight: 1.12, color: 'var(--ink)', marginBottom: '20px' }}>
            Blog
          </h1>
          <p style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.15rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
            Guías y explicaciones honestas sobre astrología y numerología. Sin predicciones mágicas ni fórmulas esotéricas vacías.
          </p>
        </div>
      </section>

      <BlogPosts posts={POSTS} />
    </>
  );
}
