import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import TocSidebar from '@/components/blog/TocSidebar';
import { WheelSvg } from '@/components/ui/Icons';
import { POSTS } from '@/app/blog/page';

const SITE = 'https://cosmyastral.com';

// ─── Types ────────────────────────────────────────────────────────────────────

type Block =
  | { t: 'h2'; id: string; text: string }
  | { t: 'h3'; text: string }
  | { t: 'p'; html: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'table'; heads?: string[]; rows: string[][] }
  | { t: 'zodiac'; items: { glyph: string; name: string; desc: string }[] }
  | { t: 'note'; html: string };

interface ArticleCta {
  h3: string;
  body: string;
  link1: { href: string; text: string };
  link2: { href: string; text: string };
}

interface ArticleData {
  eyebrow: string;
  h1: string;
  lead: string;
  heroBg?: string;
  readingTime: string;
  blocks1: Block[];
  cta: ArticleCta;
  blocks2?: Block[];
  faq?: { q: string; a: string }[];
  ctaFinal?: { h2: string; p: string; href: string; btnText: string };
}

// ─── Zodiac signs (for luna-llena) ───────────────────────────────────────────

const ZODIAC_SIGNS = [
  { glyph: '♈', name: 'Luna llena en Aries', desc: 'Energía de independencia y acción. Lo que necesita empezar o lo que se ha postergado demasiado. Impulso de romper cadenas.' },
  { glyph: '♉', name: 'Luna llena en Tauro', desc: 'Cosecha material y sensorial. Lo que tiene que ver con seguridad económica, el cuerpo y los placeres concretos llega a un punto de inflexión.' },
  { glyph: '♊', name: 'Luna llena en Géminis', desc: 'Comunicaciones e información al descubierto. Conversaciones que no habían podido tenerse, acuerdos que se cierran o se rompen.' },
  { glyph: '♋', name: 'Luna llena en Cáncer', desc: 'La Luna está en su domicilio: la emocionalidad al máximo. Familia, hogar, necesidades de seguridad. Lo más íntimo sube a la superficie.' },
  { glyph: '♌', name: 'Luna llena en Leo', desc: 'Reconocimiento, autoexpresión y visibilidad. Lo que necesita ser visto o lo que ha buscado demasiado el aplauso llega a un punto de crisis creativa.' },
  { glyph: '♍', name: 'Luna llena en Virgo', desc: 'Salud, rutinas y perfeccionismo. Lo que funciona o no funciona en la vida cotidiana queda expuesto. Momento de ajuste y revisión práctica.' },
  { glyph: '♎', name: 'Luna llena en Libra', desc: 'Relaciones y equilibrio. Las dinámicas de pareja, asociación o justicia llegan a su punto de tensión máxima. Decisiones sobre compromisos.' },
  { glyph: '♏', name: 'Luna llena en Escorpio', desc: 'La más intensa del año. Verdades ocultas, transformaciones profundas y lo que necesita morir para que algo nuevo pueda nacer.' },
  { glyph: '♐', name: 'Luna llena en Sagitario', desc: 'Creencias, aventura y expansión. Lo que tiene que ver con el significado que das a tu vida, la filosofía o los viajes llega a un punto de inflexión.' },
  { glyph: '♑', name: 'Luna llena en Capricornio', desc: 'Carrera, ambición y estructura. Lo que has construido —o lo que has dejado de construir— queda de manifiesto. Responsabilidades al descubierto.' },
  { glyph: '♒', name: 'Luna llena en Acuario', desc: 'Colectivo, innovación y libertad. Las necesidades individuales chocan con las del grupo. Momento de reformas o rupturas necesarias.' },
  { glyph: '♓', name: 'Luna llena en Piscis', desc: 'Intuición, espiritualidad y disolución de límites. Lo emocional se mezcla con lo espiritual. Alta sensibilidad, sueños vívidos, necesidad de soledad.' },
];

// ─── Article content ─────────────────────────────────────────────────────────

const ARTICLES: Record<string, ArticleData> = {
  'carta-natal-gratis-explicada': {
    eyebrow: 'Guía completa · Gratis',
    h1: 'Carta natal gratis explicada: cómo leer la tuya',
    lead: 'Tienes los datos de tu carta natal delante y no sabes qué hacer con ellos. Esta guía te explica qué significa cada elemento, cómo empezar a leerla y cuándo tiene sentido pagar por una interpretación profesional.',
    readingTime: '9 min',
    blocks1: [
      { t: 'h2', id: 'que-es-carta-natal', text: '¿Qué es exactamente una carta natal?' },
      { t: 'p', html: 'Una carta natal —también llamada carta astral, mapa natal o <em>birth chart</em>— es una fotografía del cielo en el momento exacto de tu nacimiento, proyectada sobre un disco dividido en 12 sectores (las casas astrológicas). Muestra dónde estaba cada planeta, en qué signo del zodíaco, en qué casa de tu vida, y qué ángulos formaban entre ellos (los aspectos).' },
      { t: 'p', html: 'El cálculo se hace con efemérides astronómicas precisas —nosotros usamos <strong>Swiss Ephemeris</strong>, la misma librería que usan astrólogos profesionales y software como Solar Fire o Astro.com. El resultado es un mapa matemáticamente exacto del sistema solar desde tu punto de vista en el momento de nacer.' },
      { t: 'p', html: 'Lo que es interpretación simbólica —y donde entra la astrología como disciplina— es qué significa cada posición planetaria y cómo interactúan entre sí.' },

      { t: 'h2', id: 'ingredientes-principales', text: 'Los ingredientes principales: planetas, signos y casas' },
      { t: 'p', html: 'Antes de intentar leer tu carta, necesitas entender los tres ingredientes básicos:' },
      { t: 'h3', text: 'Los planetas: los actores' },
      { t: 'p', html: 'Los planetas representan distintas funciones de la psique. Los <strong>planetas personales</strong> (Sol, Luna, Mercurio, Venus, Marte) cambian de signo rápido y describen aspectos muy personales de tu carácter. Los <strong>planetas sociales</strong> (Júpiter, Saturno) tardan años en moverse y describen cómo te relacionas con la sociedad. Los <strong>planetas transpersonales</strong> (Urano, Neptuno, Plutón) tardan décadas: son generacionales, y lo que importa es en qué casa caen y qué aspectos forman.' },
      { t: 'p', html: 'Además de los 10 planetas clásicos, la astrología moderna incluye <strong>Quirón</strong> (el arquetipo de la herida primordial), los <strong>Nodos lunares</strong> (norte y sur: el eje de evolución del alma) y <strong>Lilith</strong> (lo que has reprimido o rechazado).' },
      { t: 'h3', text: 'Los signos: el cómo' },
      { t: 'p', html: 'El signo donde está un planeta describe <em>cómo</em> funciona ese planeta. Venus en Tauro funciona diferente que Venus en Escorpio. El signo añade el color, el estilo, la textura de la energía.' },
      { t: 'h3', text: 'Las casas: el dónde' },
      { t: 'p', html: 'Las casas representan <em>dónde</em> se expresa esa energía en la vida cotidiana. La Casa 1 es el yo y la apariencia. La Casa 7 son las relaciones. La Casa 10 es la carrera. La Casa 4 es el hogar y la familia. Hay 12 casas, y las cúspides cambian con la hora de nacimiento (de ahí que la hora exacta sea tan importante).' },
      { t: 'p', html: 'Un planeta en Casa 1 se muestra en la personalidad exterior. El mismo planeta en Casa 12 opera de forma más oculta, casi invisible para los demás.' },

      { t: 'h2', id: 'big-three', text: 'Por dónde empezar: el Big Three' },
      { t: 'p', html: 'Si eres principiante, empieza por los tres más importantes:' },
      { t: 'ul', items: [
        '<strong>Sol:</strong> tu voluntad, identidad central, propósito. El tema de tu vida consciente.',
        '<strong>Luna:</strong> tus emociones, necesidades de seguridad, respuestas instintivas. Lo que te nutre o te agota.',
        '<strong>Ascendente:</strong> la imagen que proyectas, el filtro a través del que ves el mundo, el "disfraz" que llevas en sociedad.',
      ] },
      { t: 'p', html: 'Estos tres solos ya te dan mucha información. La dificultad está en que no se interpretan por separado: necesitas entender cómo interactúan. Un Sol en Aries con Luna en Cáncer y Ascendente en Capricornio es una combinación muy específica que no se puede leer simplemente sumando "Aries + Cáncer + Capricornio".' },

      { t: 'h2', id: 'aspectos', text: 'Los aspectos: las conversaciones entre planetas' },
      { t: 'p', html: 'Cuando dos planetas forman un ángulo concreto entre sí, decimos que forman un aspecto. Los más importantes:' },
      { t: 'ul', items: [
        '<strong>Conjunción (0°)</strong>: los dos planetas se fusionan. Intensificación mutua. Puede ser potenciadora o conflictiva según los planetas implicados.',
        '<strong>Oposición (180°)</strong>: tensión entre dos energías opuestas que necesitan equilibrarse.',
        '<strong>Trígono (120°)</strong>: flujo fácil, dones naturales. Las cosas salen solas en ese área. A veces tan fácil que no se trabaja.',
        '<strong>Cuadratura (90°)</strong>: fricción, reto. Requiere esfuerzo consciente. Pero la mayoría de los logros significativos vienen de cuadraturas bien trabajadas.',
        '<strong>Sextil (60°)</strong>: oportunidades disponibles si se activan activamente.',
      ] },
      { t: 'p', html: 'Una carta natal sin cuadraturas es una carta sin motor. Los aspectos difíciles son la gasolina del crecimiento personal.' },

      { t: 'h2', id: 'quiron', text: 'Quirón: la herida que también es don' },
      { t: 'p', html: 'Quirón es un asteroide descubierto en 1977, situado entre Saturno y Urano. En astrología representa el punto de mayor vulnerabilidad —algo que duele, que parece no sanar del todo— pero que, cuando se trabaja, se convierte en la mayor fuente de sabiduría y capacidad de ayudar a otros. Conocer tu Quirón (signo y casa) no es para torturarte con tus heridas sino para entender tu eje de curación.' },

      { t: 'h2', id: 'nodos-lunares', text: 'Los Nodos lunares: el eje de tu evolución' },
      { t: 'p', html: 'Los nodos lunares Norte y Sur marcan la dirección de crecimiento del alma (según la tradición astrológica). El Nodo Sur es lo que traes aprendido, lo cómodo, lo automático —a veces lo que te frena porque ya no te reta. El Nodo Norte es la dirección de crecimiento, a menudo incómoda al principio. Muchos astrólogos consideran que el eje nodal es uno de los elementos más reveladores de una carta.' },
    ],
    cta: {
      h3: 'Tu carta natal, narrada.',
      body: 'Planetas, casas, aspectos, Quirón, Nodos y síntesis final. <strong>45–60 páginas</strong> de interpretación narrativa que puedes releer cuando quieras. Swiss Ephemeris + revisión humana + entrega en 48 h.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Quiero mi carta natal interpretada →' },
    },
    blocks2: [
      { t: 'h2', id: 'puedo-leer-yo-sola', text: '¿Puedo leer mi carta natal yo sola?' },
      { t: 'p', html: 'Sí, puedes aprender a leerla. Este artículo te da los fundamentos. Hay libros excelentes (Liz Greene, Howard Sasportas, Stephen Arroyo) y recursos gratuitos en internet que profundizan en cada planeta y signo.' },
      { t: 'p', html: 'La limitación de autoestudio no es la disponibilidad de información sino la síntesis. Una carta natal tiene fácilmente 200-300 datos que interactúan entre sí. Saber qué significa "Marte en Virgo" no te dice lo que significa "Marte en Virgo en Casa 5 en cuadratura con Saturno en Sagitario en Casa 8". Eso requiere entender cómo cada posición modifica a las demás.' },
      { t: 'p', html: 'La pregunta real es: ¿qué quieres hacer con tu carta natal? Si la curiosidad es superficial, los recursos gratuitos son suficientes. Si quieres una lectura profunda que te sirva como herramienta de autoconocimiento real, la interpretación profesional aporta algo cualitativamente distinto.' },

      { t: 'h2', id: 'diferencia-gratis-pago', text: 'Qué diferencia una carta natal gratis de una interpretada de pago' },
      { t: 'p', html: 'Las calculadoras gratuitas —incluida la nuestra— te dan los datos brutos: "Sol en Tauro, Casa 6. Luna en Escorpio, Casa 1. Marte en Aries, Casa 7. Saturno cuadra a Júpiter..." Eso es el vocabulario de la carta, no la historia.' },
      { t: 'p', html: 'Una carta natal interpretada convierte esos datos en un relato coherente sobre quién eres: por qué las relaciones íntimas se sienten de determinada manera, por qué el trabajo en equipo siempre has tenido esa particularidad, por qué ciertos patrones se repiten. No como predicción determinista sino como mapa de probabilidades y tendencias.' },
      { t: 'p', html: 'El nuestro añade <strong>revisión humana antes de cada entrega</strong>: no es texto genérico de base de datos, sino interpretación contextualizada con tus datos específicos.' },

    ],
    faq: [
      { q: '¿Necesito saber de astrología para entender la carta interpretada?', a: 'No. Está escrita en lenguaje narrativo, no en jerga técnica. Si aparece un término técnico, va explicado en el contexto.' },
      { q: '¿El PDF incluye la imagen de la rueda natal?', a: 'Sí, el PDF incluye el gráfico de la rueda zodiacal con todos los planetas y casas posicionados, generado con Swiss Ephemeris.' },
      { q: '¿Puedo pedir la carta natal de otra persona como regalo?', a: 'Sí. Al pedir el estudio introduces los datos de nacimiento de la persona para quien lo quieres, y te lo enviamos a ti. Es un regalo inusual y muy bien recibido.' },
      { q: '¿Y si tengo dudas sobre algo del estudio una vez recibido?', a: 'Puedes escribirnos por email. Incluimos dirección de contacto en el PDF.' },
      { q: '¿Qué información necesito para calcular mi carta natal?', a: 'Fecha de nacimiento completa (día, mes y año), hora de nacimiento (imprescindible para el Ascendente y las casas) y ciudad de nacimiento. Si no tienes la hora exacta, la carta se puede calcular igualmente pero sin Ascendente ni casas fiables.' },
      { q: '¿En cuánto tiempo recibo el estudio una vez pedido?', a: 'En menos de 10 minutos. El cálculo con Swiss Ephemeris y la generación del PDF son automáticos. Recibes el archivo directamente en tu correo.' },
    ],
    ctaFinal: {
      h2: '45–60 páginas sobre ti.',
      p: 'El estudio más completo que existe en español. Swiss Ephemeris + interpretación narrativa + revisión humana incluida.',
      href: '/precios/',
      btnText: 'Ver precios y qué incluye →',
    },
  },

  'luna-llena-significado-astrologico': {
    eyebrow: 'Astrología · Ciclos lunares · Rituales',
    h1: 'Luna llena',
    lead: 'El punto de máxima luminosidad del ciclo lunar. Lo que se sembró en luna nueva llega a su pico: se revela, se intensifica, se cosecha o se libera. Una de las energías más potentes y más mal explicadas de la astrología.',
    heroBg: 'var(--ink)',
    readingTime: '11 min',
    blocks1: [
      { t: 'h2', id: 'que-es-luna-llena', text: 'Qué es la luna llena astrológicamente' },
      { t: 'p', html: 'La <strong>luna llena</strong> ocurre cuando la Luna está directamente opuesta al Sol —es decir, en el signo zodiacal exactamente contrario al que ocupa el Sol en ese momento. Esta oposición es la clave para entender su energía: representa la tensión entre dos principios contrarios que tienen que encontrar algún tipo de equilibrio.' },
      { t: 'p', html: 'En términos astronómicos, la luna llena marca el momento en que la Luna está completamente iluminada desde la perspectiva terrestre. Ocurre aproximadamente cada 29,5 días (la duración de un ciclo lunar completo, o mes sinódico). A lo largo de un año hay 12 o 13 lunas llenas.' },
      { t: 'p', html: 'En astrología, la luna llena:' },
      { t: 'ul', items: [
        '<strong>Activa la casa natal correspondiente a su signo</strong>: si la luna llena ocurre en Escorpio y Escorpio rige tu Casa 8 natal, los temas de esa casa (transformación, recursos compartidos, intimidad profunda) se intensifican.',
        '<strong>Ilumina lo que estaba en la sombra</strong>: lo que no se quería ver sale a la luz. Decisiones pendientes, emociones reprimidas, situaciones que "había que resolver".',
        '<strong>Marca el punto de culminación</strong>: lo que se inició seis meses atrás (en la luna nueva del mismo signo) llega a su punto de manifestación o de crisis.',
      ] },
      { t: 'p', html: 'La carta natal de cada persona tiene la Luna natal en un signo y una casa específicos. Las lunas llenas que transitan por ese signo o por su opuesto tienen un impacto diferente al de las lunas llenas que transitan signos "neutros" para esa persona. Por eso los tránsitos lunares son personales, no universales.' },

      { t: 'h2', id: 'luna-llena-cada-signo', text: 'Luna llena en cada signo: cómo cambia la energía' },
      { t: 'p', html: 'Cada luna llena ocurre en un signo zodiacal diferente (el opuesto al Sol del momento). La energía de cada una tiene características propias según el signo que la aloja:' },
      { t: 'zodiac', items: ZODIAC_SIGNS },

      { t: 'h2', id: 'rituales-luna-llena', text: 'Rituales en luna llena: qué dice la astrología' },
      { t: 'p', html: 'Los <strong>rituales en luna llena</strong> son una de las prácticas más extendidas en la astrología moderna. La base astrológica tiene sentido: la luna llena marca un punto de máxima energía y claridad, lo que lo convierte en un momento natural para liberar lo que ya no sirve o para reconocer lo que se ha completado.' },
      { t: 'p', html: 'Lo que los rituales de luna llena tienen en común en todas las tradiciones:' },
      { t: 'ul', items: [
        '<strong>Intención de cierre</strong>: es el momento del ciclo para soltar, no para empezar. La luna nueva es para sembrar; la luna llena es para cosechar o liberar.',
        '<strong>Revisión</strong>: preguntarse qué se inició seis meses atrás (en la luna nueva del mismo signo) y qué ha llegado a su resultado natural, sea positivo o no.',
        '<strong>Gratitud o reconocimiento</strong>: hacer visible lo que ha crecido en el último ciclo, aunque sea pequeño.',
      ] },
      { t: 'p', html: 'Lo que los rituales de luna llena <em>no</em> son, desde la astrología seria:' },
      { t: 'ul', items: [
        'No son mecanismos de manifestación instantánea. La luna llena no "otorga deseos".',
        'No tienen el mismo efecto para todas las personas en el mismo momento: depende de en qué casa y con qué planetas interactúe esa luna llena en tu carta natal concreta.',
        'No requieren elementos específicos (velas de un color determinado, cristales, etc.). Son adiciones culturales modernas sin base en la tradición astrológica clásica.',
      ] },
      { t: 'p', html: 'Dicho esto: si hacer un ritual de luna llena —sea cual sea su forma— te ayuda a reflexionar, a cerrar ciclos y a tomar stock de dónde estás, su valor es real independientemente de su mecanismo. Los símbolos funcionan cuando se trabaja activamente con ellos.' },

      { t: 'h2', id: 'cortar-pelo-luna-llena', text: 'Cortar el pelo en luna llena: ¿qué hay de cierto?' },
      { t: 'p', html: 'La creencia de que <strong>cortar el pelo en luna llena</strong> favorece el crecimiento o la fuerza del cabello viene de una tradición popular muy extendida que asocia la luna creciente y llena con la expansión y el crecimiento, y la luna menguante con la contracción y la limpieza.' },
      { t: 'ul', items: [
        'La tradición es coherente internamente con los principios del pensamiento simbólico lunar: si quieres crecer, hazlo cuando la energía está en expansión.',
        'Hay estudios folkloréticos que documentan esta práctica en decenas de culturas sin contacto entre sí.',
        'No hay ningún mecanismo físico documentado que explique cómo la fase lunar afecta al crecimiento del cabello. El folículo piloso no tiene receptores lunares conocidos.',
      ] },
      { t: 'p', html: 'La conclusión honesta: <strong>cortar el pelo en luna llena no hace daño y puede formar parte de una práctica de autocuidado consciente</strong>. Si te resulta significativo sincronizar esa rutina con el calendario lunar, hay un valor real en la intención y la atención que le dedicas.' },
    ],
    cta: {
      h3: '¿Qué activa la luna llena en tu carta natal?',
      body: 'El impacto real de cada luna llena depende de en qué casa natal cae y con qué planetas hace aspecto en tu carta personal. La carta natal interpretada explica tu patrón lunar individual: en qué signo está tu Luna natal, en qué casa y cómo interactúa con el resto de tu carta.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'fechas-2026', text: 'Fechas de luna llena 2026: las 13 lunas llenas del año' },
      { t: 'p', html: 'En 2026 hay <strong>13 lunas llenas</strong> —el ciclo lunar de 29,5 días no encaja exactamente en los 12 meses del año gregoriano, y cada cierto tiempo un mes recibe dos lunas llenas. En 2026 es mayo el que tiene dos. La segunda luna llena de un mismo mes se llama popularmente <strong>luna azul</strong>. Todas las fechas son astronómicamente correctas (hora España peninsular, CEST UTC+2):' },
      { t: 'table', heads: ['Fecha', 'Signo', 'Nombre tradicional', 'Temática'], rows: [
        ['3 enero', 'Cáncer', 'Luna del Lobo', 'Familia, hogar, emociones íntimas'],
        ['1 febrero', 'Leo', 'Luna de Nieve', 'Autoexpresión, reconocimiento, creatividad'],
        ['3 marzo', 'Virgo', 'Luna del Gusano ★', 'Salud, rutinas, perfeccionismo (eclipse total)'],
        ['1 abril', 'Libra', 'Luna Rosa', 'Relaciones, equilibrio, compromisos'],
        ['1 mayo', 'Escorpio', 'Luna de las Flores', 'Transformación, intimidad, lo oculto'],
        ['31 mayo', 'Sagitario', 'Luna Azul ●', 'Creencias, expansión filosófica, libertad'],
        ['29 junio', 'Capricornio', 'Luna de Fresa', 'Carrera, ambición, estructura vital'],
        ['29 julio', 'Acuario', 'Luna del Ciervo', 'Colectivo, innovación, libertad individual'],
        ['28 agosto', 'Piscis', 'Luna del Esturión ★', 'Intuición, espiritualidad, disolución (eclipse parcial)'],
        ['27 septiembre', 'Aries', 'Luna de la Cosecha', 'Independencia, acción, nuevos comienzos'],
        ['26 octubre', 'Tauro', 'Luna del Cazador', 'Seguridad material, cuerpo, placeres'],
        ['25 noviembre', 'Géminis', 'Luna del Castor', 'Comunicación, dualidad, intercambios'],
        ['23 diciembre', 'Cáncer', 'Luna Fría', 'Familia, hogar, emociones íntimas'],
      ] },
      { t: 'note', html: '★ Eclipse: la luna llena de marzo (3 mar) incluye un eclipse total de Luna; la de agosto (28 ago) incluye un eclipse parcial. ● Luna Azul: la luna llena del 31 de mayo es la segunda luna llena de mayo —de ahí el nombre popular.' },

      { t: 'h2', id: 'luna-nueva-vs-llena', text: 'Luna nueva y luna llena: dos energías del mismo ciclo' },
      { t: 'p', html: 'La <strong>luna nueva</strong> y la luna llena son los dos polos del ciclo lunar de 29,5 días. No son opuestas en sentido de conflicto —son complementarias:' },
      { t: 'ul', items: [
        '<strong>Luna nueva</strong>: Luna y Sol están en el mismo signo (conjunción). Poca luz. Momento de semilla, intención, lo que empieza en silencio. Energía introvertida.',
        '<strong>Luna llena</strong>: Luna y Sol están en signos opuestos. Máxima luz. Momento de manifestación, revelación y cosecha. Energía extrovertida.',
      ] },
      { t: 'p', html: 'Trabajar con el ciclo lunar completo significa sembrar intenciones en la luna nueva y revisarlas en la luna llena del mismo signo, seis meses después. Por ejemplo: una luna nueva en Escorpio en noviembre abre un ciclo de transformación que culmina con la luna llena en Escorpio en mayo del año siguiente.' },

      { t: 'h2', id: 'luna-llena-partos', text: '¿Influye la luna llena en los partos?' },
      { t: 'p', html: 'La creencia de que la luna llena produce más <strong>partos</strong> es una de las más extendidas en el entorno sanitario, y también una de las más estudiadas. El resultado de los estudios es claro: los datos hospitalarios recopilados en varios países no muestran ninguna correlación estadística significativa entre luna llena y mayor número de partos.' },
      { t: 'p', html: 'La percepción contraria en el personal de salud es real, pero se explica por el sesgo de confirmación: los partos en luna llena se recuerdan (porque se atribuyen a la luna) y los partos en otras fases no se registran como datos relevantes. Es el mismo mecanismo que hace que "veamos" el 11:11 con más frecuencia una vez que le damos significado.' },
      { t: 'p', html: 'Dicho esto: la luna llena sí tiene un efecto demostrado en la fisiología —en particular en la calidad del sueño. Estudios de la Universidad de Basilea encontraron menor sueño profundo en las noches de luna llena, independientemente de la exposición a la luz.' },
    ],
    faq: [
      { q: '¿La luna llena afecta a todos por igual?', a: 'No. El impacto de cada luna llena depende de en qué casa natal cae y con qué planetas natales hace aspecto en tu carta personal. Una luna llena en Escorpio puede ser muy intensa para alguien con mucho Escorpio natal y prácticamente imperceptible para otra persona. Por eso los horóscopos genéricos por signo solar son una aproximación muy gruesa.' },
      { q: '¿Cuántas lunas llenas hay al año?', a: 'Hay 12 o 13 lunas llenas al año (el ciclo lunar dura 29,5 días, y el año solar 365,25). Cuando hay 13 lunas llenas en un año, la "extra" recibe el nombre popular de luna azul.' },
      { q: '¿Cortar el pelo en luna llena hace que crezca más?', a: 'No hay evidencia científica de ningún mecanismo físico que explique cómo la fase lunar afecta al crecimiento del cabello. La tradición es coherente internamente con el simbolismo lunar (expansión en luna creciente/llena), pero no está respaldada por datos biológicos. Si te ayuda como práctica de autocuidado consciente, tiene valor real como ritual de intención.' },
      { q: '¿Hay más partos en luna llena?', a: 'Los datos hospitalarios de varios países no muestran correlación estadística significativa entre luna llena y mayor número de partos. La percepción contraria en el personal sanitario se explica por el sesgo de confirmación: los partos en luna llena se recuerdan porque se atribuyen a la luna; los de otras fases no quedan registrados como dato relevante.' },
      { q: '¿Qué diferencia hay entre luna nueva y luna llena?', a: 'La luna nueva ocurre cuando Luna y Sol están en el mismo signo (conjunción): poca luz, momento de semilla e intención. La luna llena ocurre cuando están en signos opuestos: máxima luz, momento de culminación, revelación y cierre. Son los dos polos del mismo ciclo de 29,5 días. Lo que se siembra en luna nueva llega a su resultado en la luna llena del mismo signo, seis meses después.' },
      { q: '¿Los rituales de luna llena tienen base en la astrología tradicional?', a: 'La astrología clásica (Ptolomeo, tradición árabe medieval, astrología renacimiento) sí trabaja con el ciclo lunar como herramienta de timing, pero de forma técnica —mirando en qué casa cae la luna llena, qué planetas toca. Los rituales modernos de cristales, velas y cartas son una creación de la espiritualidad New Age contemporánea sin raíz en esa tradición, aunque pueden tener valor como práctica de reflexión consciente.' },
    ],
    ctaFinal: {
      h2: 'Lo que la luna llena activa en tu carta natal.',
      p: 'Cada luna llena toca casas y planetas distintos según tu mapa personal. La carta natal interpretada te explica qué área de tu vida resuena más con el ciclo lunar.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'luna-en-escorpio-carta-natal': {
    eyebrow: 'Astrología · Luna natal · Signo Escorpio',
    h1: 'Luna en Escorpio',
    lead: 'La posición lunar de mayor profundidad emocional del zodíaco. Un corazón que se entrega del todo o no se entrega. Una persona que necesita llegar al fondo de todo lo que siente, sin atajos y sin superficie.',
    heroBg: 'var(--ink)',
    readingTime: '8 min',
    blocks1: [
      { t: 'h2', id: 'que-significa', text: 'Qué significa tener la Luna en Escorpio' },
      { t: 'p', html: 'La Luna en la carta natal describe tu vida emocional: cómo sientes, qué necesitas para sentirte seguro/a, cómo respondes instintivamente. No es lo que decides hacer, sino lo que ocurre antes de que decidas nada.' },
      { t: 'p', html: 'Escorpio es el signo de la profundidad, la transformación, el poder, la verdad oculta y la intensidad sin negociación. La Luna aquí no puede vivir en la superficie. Necesita verdad. Necesita fundirse con lo que ama. No tolera lo tibio.' },
      { t: 'p', html: 'Las personas con Luna en Escorpio tienen una capacidad de percepción emocional poco común. Detectan lo que no se dice, lo que se esconde detrás de las palabras, la contradicción entre lo que alguien afirma sentir y lo que realmente siente. Eso puede ser un don (psicología natural, capacidad de acompañar a otros en sus crisis) o una carga (no poder descansar de la intensidad, detectar amenazas donde no las hay).' },

      { t: 'h2', id: 'fusion-o-nada', text: 'El núcleo de la Luna en Escorpio: fusión o nada' },
      { t: 'p', html: 'La necesidad central de esta posición lunar es la <em>fusión emocional</em>. Las relaciones superficiales no nutren a la Luna en Escorpio. Necesita saber quién eres de verdad, en lo más profundo. A cambio, ofrece una lealtad que pocas posiciones lunares igualan: cuando la Luna en Escorpio elige a alguien, lo hace con todo.' },
      { t: 'p', html: 'El problema surge cuando esa necesidad de fusión se convierte en <strong>miedo al abandono</strong>. Escorpio recuerda las traiciones. Las emociones dolorosas no se procesan rápido ni se olvidan fácil. Un rechazo vivido en la infancia puede proyectarse en las relaciones adultas durante décadas si no hay trabajo consciente sobre ello.' },
      { t: 'p', html: 'Los mecanismos de defensa más habituales de la Luna en Escorpio: el control (mantener el poder para no ser vulnerable), la prueba (testear a los seres queridos para ver si van a quedarse), la retirada total (si preveo que me van a rechazar, me retiro antes).' },

      { t: 'h2', id: 'fortalezas', text: 'Fortalezas de la Luna en Escorpio' },
      { t: 'ul', items: [
        '<strong>Resiliencia extraordinaria</strong>. Esta es la posición de quien ha pasado por el fuego y ha salido transformado, no destruido. La capacidad de renacer emocional es genuina.',
        '<strong>Presencia en los momentos difíciles</strong>. La Luna en Escorpio no se asusta de las crisis de los demás. Al contrario: en las crisis es donde esta energía brilla. Es el amigo que aparece a las 3 de la mañana sin hacer preguntas innecesarias.',
        '<strong>Profundidad psicológica</strong>. Capacidad innata para entender la psique humana, las motivaciones ocultas, los patrones que se repiten. Muchos terapeutas, escritores y artistas tienen la Luna en Escorpio.',
        '<strong>Intuición sobre las personas</strong>. Difícil engañar a alguien con Luna en Escorpio. Perciben incongruencias antes de que el intelecto las formule.',
      ] },

      { t: 'h2', id: 'sombra', text: 'Sombra de la Luna en Escorpio' },
      { t: 'p', html: 'La sombra es lo que se activa cuando la Luna en Escorpio está en su expresión más reactiva y menos integrada:' },
      { t: 'ul', items: [
        '<strong>Celos y posesividad</strong> surgidos del miedo a perder lo que ama, no de la maldad.',
        '<strong>Rencor sostenido</strong>. Escorpio tiene memoria emocional larga. Una ofensa puede vivir durante años.',
        '<strong>Manipulación emocional</strong> como forma de mantener el control cuando se siente vulnerable.',
        '<strong>Autodestrucción cíclica</strong>. En los momentos de mayor dolor, la Luna en Escorpio puede sabotear lo que más quiere.',
      ] },
      { t: 'p', html: 'Reconocer la sombra no es para juzgarse. Es el primer paso hacia la integración, que es exactamente lo que Escorpio hace mejor cuando trabaja desde la conciencia: transformar.' },

      { t: 'h2', id: 'casas', text: 'Luna en Escorpio en las distintas casas' },
      { t: 'p', html: 'La casa donde cae la Luna modifica significativamente cómo se expresa esta intensidad:' },
      { t: 'ul', items: [
        '<strong>Casa 1</strong>: la intensidad es visible desde el primer encuentro. Mirada que atraviesa. Presencia que se nota antes de que hablen.',
        '<strong>Casa 4</strong>: la familia y el hogar son el escenario de las intensidades. El pasado familiar tiene mucho poder sobre el estado emocional presente.',
        '<strong>Casa 5</strong>: creatividad intensa, pasiones amorosas que consumen, relación apasionada con los hijos.',
        '<strong>Casa 7</strong>: las relaciones de pareja son transformadoras, a veces dolorosas, siempre profundas. El otro activa lo más oscuro y lo más luminoso.',
        '<strong>Casa 8</strong>: la Luna está "en casa" en su significado más profundo. Atracción hacia lo oculto, la muerte, la psicología, los tabúes.',
        '<strong>Casa 12</strong>: la vida emocional es más oculta, incluso para uno mismo. Gran capacidad intuitiva mezclada con tendencia al autoaislamiento.',
      ] },

      { t: 'h2', id: 'compatibilidad', text: 'Compatibilidad y relaciones' },
      { t: 'p', html: 'La Luna en Escorpio fluye bien con posiciones en signos de agua (Cáncer, Piscis) que entienden la intensidad emocional, y con posiciones en tierra (Tauro, Virgo, Capricornio) que pueden dar la estabilidad que Escorpio necesita para no girar en torno a sí mismo.' },
      { t: 'p', html: 'Puede ser más difícil con signos de aire muy racionales (Géminis, Acuario) que tienden a intelectualizar las emociones, o con fuego muy independiente (Sagitario, Aries) que puede sentir la intensidad de Escorpio como control.' },
      { t: 'p', html: 'En astrología, la compatibilidad nunca es una cuenta de suma de signos. Una relación entre una Luna en Escorpio y una Luna en Sagitario puede funcionar muy bien si hay consciencia de las diferencias y comunicación. Los "aspectos" entre cartas natales (cómo interactúan los planetas de dos personas) importan más que los signos aislados.' },
    ],
    cta: {
      h3: '¿Tienes la Luna en Escorpio en tu carta?',
      body: 'La carta natal interpretada explica tu Luna en el contexto completo de tu mapa: qué casa ocupa, qué aspectos forma con otros planetas y cómo todo eso interactúa con tu Sol y tu Ascendente.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'personas-famosas', text: 'Personas famosas con Luna en Escorpio' },
      { t: 'p', html: 'Varias figuras públicas tienen la Luna en Escorpio en su carta natal, lo que permite ver cómo se manifiesta esta posición en contextos reales. El denominador común es una intensidad que resulta visible incluso para el público que no conoce su astrología: van a los lugares incómodos, hablan de lo que otros callan, y tienen una presencia emocional que deja huella.' },
      { t: 'p', html: '<strong>Lady Gaga</strong> (Sol en Aries, Luna en Escorpio) es un ejemplo bien documentado: la capacidad de transformar el dolor personal en arte, los temas de poder y vulnerabilidad que atraviesan toda su carrera, y la intensidad con la que habla públicamente sobre salud mental y trauma son rasgos que resuena directamente con la Luna en Escorpio. No su signo solar —su signo solar es Aries— sino su Luna la que modela esa profundidad emocional.' },
      { t: 'p', html: 'En términos generales, las personas públicas con Luna en Escorpio tienden a destacar en áreas que requieren profundidad psicológica: psicoterapeutas y psiquiatras que trabajan con trauma, escritores que exploran la condición humana sin filtros, actores conocidos por roles de gran intensidad emocional, investigadores periodísticos que van donde otros no van. La posición de la Luna no determina la profesión —eso depende de muchos factores en la carta— pero sí el <em>tono emocional</em> con el que se aborda cualquier cosa que se haga.' },

      { t: 'h2', id: 'natal-vs-transito', text: 'Luna en Escorpio natal vs. tránsito de la Luna por Escorpio' },
      { t: 'p', html: 'Es importante distinguir dos cosas que se confunden con frecuencia. La <strong>Luna en Escorpio natal</strong> es una posición fija que tienes de por vida: es el signo donde estaba la Luna en el momento de tu nacimiento. Define tu vida emocional de forma permanente.' },
      { t: 'p', html: 'El <strong>tránsito de la Luna por Escorpio</strong> ocurre cada 27-28 días, durante aproximadamente dos días y medio: es cuando la Luna en el cielo actual pasa por el signo Escorpio, afectando a todos temporalmente. En esos días la energía emocional general es más intensa, más intuitiva, más propicia para el trabajo interior o las conversaciones profundas.' },
      { t: 'p', html: 'Si tienes la Luna en Escorpio natal, esos tránsitos lunares de la Luna por Escorpio son especialmente intensos para ti —es tu "Luna llena emocional" mensual, por así decirlo. Si no tienes la Luna natal en Escorpio, los tránsitos lunares te afectan moderadamente durante esos dos días pero sin el peso estructural de la posición natal.' },

      { t: 'h2', id: 'integracion', text: 'Cómo integrar la Luna en Escorpio: el trabajo emocional' },
      { t: 'p', html: 'La integración de la Luna en Escorpio no es un destino —es un proceso continuo de reconocer los mecanismos de defensa, entender de dónde vienen, y elegir respuestas más conscientes. Escorpio integrado no pierde su intensidad: la dirige con menos reactividad y más sabiduría.' },
      { t: 'ul', items: [
        '<strong>Reconocer el detonante antes de actuar.</strong> La Luna en Escorpio puede activarse (celos, control, retirada) muy rápido. El primer paso es crear un instante entre el estímulo y la respuesta —lo suficiente para preguntarse: "¿Esto que siento es sobre lo que está pasando ahora, o es un eco de algo anterior?"',
        '<strong>Trabajar el miedo al abandono en su origen.</strong> Muchos de los mecanismos de sombra de esta posición son respuestas al miedo a perder lo que se ama. Abordar ese miedo directamente —en terapia, en escritura, en conversación honesta con uno mismo— deshabilita el mecanismo en su raíz.',
        '<strong>Aprender a soltar.</strong> Escorpio retiene. Las emociones, los agravios, los recuerdos. Desarrollar la capacidad de dejar ir —no como rendición sino como transformación consciente— es el trabajo central de esta posición lunar.',
        '<strong>Usar la profundidad como fortaleza.</strong> La Luna en Escorpio integrada no esconde su intensidad: la ofrece como presencia, como capacidad de acompañar a otros en sus momentos más oscuros, como arte, como análisis, como compromiso total con lo que importa.',
      ] },
      { t: 'p', html: 'El símbolo de Escorpio es el escorpión, pero la tradición astrológica más completa añade dos más: la serpiente (que muda de piel, que se renueva) y el águila (que eleva la mirada y ve el panorama completo sin perder el foco). La Luna en Escorpio tiene la capacidad de evolucionar desde el escorpión reactivo hasta el águila que observa y comprende. Ese camino —que no termina nunca— es exactamente lo que Escorpio hace mejor.' },
    ],
    faq: [
      { q: '¿La Luna en Escorpio es "mala" o problemática?', a: 'No. Todas las posiciones lunares tienen luces y sombras. La Luna en Escorpio tiene una sombra más visible (los celos, el rencor) pero también unas fortalezas excepcionales (resiliencia, lealtad, profundidad). "Mala" o "buena" depende del nivel de integración de la persona, no del signo.' },
      { q: '¿La Luna en Escorpio siempre tiene infancias difíciles?', a: 'Hay cierta tendencia estadística: la Luna en Escorpio a menudo corresponde a personas que tuvieron que madurar emocionalmente antes de lo esperado o que crecieron en entornos con dinámicas de poder o secretos familiares. Pero no es una regla absoluta, y muchas personas con esta posición tuvieron infancias estables.' },
      { q: '¿Cómo sé si tengo la Luna en Escorpio?', a: 'Necesitas tu carta natal, que requiere fecha, hora y ciudad de nacimiento. La calculadora gratuita de <a href="/carta-natal/">carta natal</a> lo calcula automáticamente. El signo solar que conoces de los horóscopos no te dice nada sobre tu Luna —la Luna se mueve mucho más rápido y cambia de signo cada dos días y medio.' },
      { q: '¿Qué diferencia hay entre tener el Sol en Escorpio y la Luna en Escorpio?', a: 'El Sol en Escorpio define tu identidad y voluntad consciente: cómo te presentas y hacia dónde te diriges. La Luna en Escorpio define tu vida emocional y tus respuestas instintivas: cómo sientes antes de pensar. Alguien con Sol en Escorpio puede ser muy Escorpio en lo que hace; alguien con Luna en Escorpio puede ser muy Escorpio en lo que <em>siente</em>, aunque su Sol esté en un signo muy distinto.' },
    ],
    ctaFinal: {
      h2: 'Tu Luna natal explicada en profundidad.',
      p: 'Dónde cae, qué aspectos forma y cómo dialoga con tu Sol y tu Ascendente. Todo en un estudio de 45–60 páginas, con revisión humana incluida.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'que-significa-11-11': {
    eyebrow: 'Horas espejo · Amor · Numerología angelical',
    h1: 'Qué significa 11:11 (en el amor, los ángeles y las llamas gemelas)',
    lead: 'Es el número espejo más buscado del mundo. Algunos lo llaman señal de los ángeles. Otros lo relacionan con las llamas gemelas. La numerología tiene su propia explicación. Aquí tienes todo lo que distintas tradiciones —y la psicología— dicen sobre qué significa realmente el 11:11.',
    readingTime: '10 min',
    blocks1: [
      { t: 'h2', id: 'por-que-ves-1111', text: 'Por qué ves el 11:11 tan seguido (y la explicación no es solo espiritual)' },
      { t: 'p', html: 'Miras el teléfono unas 80-100 veces al día. Con 720 minutos en 12 horas, las probabilidades de ver el 11:11 al menos una vez en la semana son altísimas. No hay magia estadística ahí.' },
      { t: 'p', html: 'Lo que cambia es el filtro de la atención. Una vez que un número adquiere significado emocional, el cerebro lo prioriza y lo saca del ruido de fondo. Ves las 11:47, las 14:30, las 22:18 —y no las registras. El 11:11 ya tiene una carga, así que lo notas.' },
      { t: 'p', html: 'Esto no descarta la lectura simbólica. Lo que hace es situar el fenómeno en su lugar: <strong>la sincronicidad y el mecanismo neurológico coexisten</strong>. Puedes creer que el 11:11 tiene un mensaje y al mismo tiempo entender cómo funciona la atención. Ambas cosas son verdad a su nivel.' },

      { t: 'h2', id: 'numerologia-1111', text: 'El 11:11 en numerología pitagórica' },
      { t: 'p', html: 'En numerología pitagórica, el 11 es <strong>número maestro</strong>: no se reduce a un solo dígito como el resto de números. Tiene una vibración propia, asociada a la intuición elevada, la sensibilidad extrema y la capacidad de percibir lo que los demás aún no ven.' },
      { t: 'p', html: 'El 11:11 es el número maestro cuatro veces seguido. La tradición numerológica lo interpreta como el momento de mayor apertura intuitiva del reloj: un "portal" simbólico en el que la energía del 11 se amplifica. No una instrucción ni un mensaje concreto, sino una señal de receptividad especialmente alta.' },
      { t: 'p', html: 'Si quieres profundizar en el significado del 11 como número maestro y su papel en la carta numerológica personal, lo desarrollamos en detalle en nuestro artículo sobre <a href="/blog/11-11-significado-espiritual/" style="color:var(--accent)">el 11:11 y la numerología espiritual</a>.' },

      { t: 'h2', id: 'angeles-1111', text: 'Qué dicen los ángeles sobre el 11:11' },
      { t: 'p', html: 'La <strong>numerología angelical</strong> es un sistema de interpretación moderno —popularizado principalmente a partir de los años 90— que asigna mensajes de ángeles de la guarda a combinaciones de números repetidos. No forma parte de las tradiciones numerológicas clásicas (pitagórica, caldea ni cabalística), pero tiene una penetración enorme en la cultura popular actual.' },
      { t: 'p', html: 'Dentro de este sistema, el mensaje angelical del 11:11 se interpreta como:' },
      { t: 'ul', items: [
        '<strong>Estás en el camino correcto</strong>: es la señal más frecuentemente citada. Tu guía espiritual confirma que la dirección que estás tomando —o el pensamiento que tenías en ese momento— está alineado con tu propósito.',
        '<strong>Mantén tus pensamientos enfocados</strong>: el 11:11 se asocia a una ventana de mayor poder creativo. Lo que piensas con intensidad en ese momento tiene más potencial de manifestarse.',
        '<strong>Presta atención</strong>: es una llamada de tu guía espiritual para que pares, observes y escuches lo que tu interior ya sabe pero quizás estás ignorando.',
      ] },
      { t: 'p', html: 'Si este marco resuena contigo, úsalo. Si no, la numerología clásica ofrece una perspectiva que no requiere la creencia en seres angélicos: simplemente, que el 11 activa una receptividad intuitiva más alta.' },

      { t: 'h2', id: 'amor-1111', text: 'Qué significa el 11:11 en el amor' },
      { t: 'p', html: 'El amor es el área donde más buscamos señales. No es casualidad que "11:11 en el amor" y "11:11 soltero/a" sean de las búsquedas relacionadas más frecuentes.' },
      { t: 'h3', text: 'Si estás soltero/a' },
      { t: 'p', html: 'Ver el 11:11 estando soltero/a se interpreta habitualmente como <strong>señal de alineación y apertura</strong>: estás en un momento de tu vida en el que puedes recibir una conexión real. No que "está a punto de llegar alguien" —sino que tú estás en el estado adecuado para que eso ocurra si se presenta la oportunidad.' },
      { t: 'p', html: 'La pregunta más útil que puedes hacerte cuando ves el 11:11 estando soltero/a no es "¿cuándo llega?" sino "¿estoy siendo la persona que quiero ser en una relación?".' },
      { t: 'h3', text: 'Si estás en pareja' },
      { t: 'p', html: 'En una relación consolidada, el 11:11 suele leerse como un <strong>recordatorio de presencia</strong>. Las relaciones largas dispersan la atención en rutinas y obligaciones. El 11:11 como ancla simbólica lanza una pregunta: ¿estás presente en esta relación? ¿Estás viendo realmente a tu pareja?' },
      { t: 'h3', text: 'Después de una ruptura' },
      { t: 'p', html: 'Ver el 11:11 tras una ruptura se interpreta frecuentemente como señal de <strong>cierre necesario</strong>: lo que terminó tenía que terminar, y el espacio que se ha abierto tiene un propósito. No es garantía de nada —es un recordatorio de que los finales y los comienzos forman parte del mismo ciclo.' },

      { t: 'h2', id: 'llamas-gemelas', text: '11:11 y las llamas gemelas: la señal más buscada' },
      { t: 'p', html: 'La conexión entre el 11:11 y las <strong>llamas gemelas</strong> es probablemente la interpretación más intensa del número. El concepto de llama gemela —distinto del alma gemela— parte de la idea de que ciertas almas comparten el mismo origen y se encuentran en la vida física como parte de una evolución conjunta, habitualmente transformadora y perturbadora.' },
      { t: 'p', html: 'La relación con el 11:11 viene de la simetría visual: dos "1" y dos "1", un espejo perfecto. Cuatro 1s que se reflejan. Muchas personas que trabajan con el concepto de llamas gemelas interpretan el 11:11 como <strong>la señal de que la llama gemela está cerca, está pensando en ti o de que estás en el proceso de reunión</strong>.' },
      { t: 'note', html: '<strong>Una nota honesta:</strong> el concepto de llama gemela se usa con frecuencia para romanticizar relaciones que tienen dinámicas de dependencia o que no son sanas. Si una relación genera sufrimiento recurrente, el hecho de que coincida con ver 11:11 no la convierte automáticamente en una llama gemela ni la justifica. Las conexiones intensas existen —y también lo hacen las dinámicas adictivas. Distinguirlas requiere más que un número en el reloj.' },

      { t: 'h2', id: 'espiritual-biblia', text: 'El 11:11 en lo espiritual y la Biblia' },
      { t: 'p', html: 'En la numerología bíblica, el 11 se asocia al <strong>desorden creativo</strong>: está un número por encima del 10 (la ley completa) y uno por debajo del 12 (el gobierno divino). En ese espacio intermedio, el 11 señala transiciones y períodos de caos necesario antes de un orden nuevo.' },
      { t: 'p', html: 'En el plano espiritual contemporáneo, el 11:11 es ante todo un símbolo de <strong>despertar de conciencia</strong>: la salida del piloto automático, la mayor presencia, el momento en que dejas de vivir en la inercia y empiezas a prestar atención activa a quién eres y qué quieres.' },

      { t: 'h2', id: 'que-hacer', text: 'Qué hacer cuando ves el 11:11' },
      { t: 'ul', items: [
        '<strong>Para un instante y toma nota</strong>: ¿qué pensabas exactamente en ese momento? ¿Con quién estabas? ¿Qué decisión tienes pendiente? El contexto importa más que el número.',
        '<strong>Pon una intención específica</strong>: si quieres usar el 11:11 como ancla espiritual, hazlo con intención concreta, no genérica. "Quiero encontrar pareja" es vago. "Quiero estar abierto/a a una conexión real sin miedo al rechazo" es algo con lo que puedes trabajar.',
        '<strong>Pide un deseo si quieres</strong>: es una práctica lúdica de origen popular, sin base en la tradición numerológica seria. Si te ayuda a conectar conscientemente con lo que deseas, tiene un valor real. Si lo tomas como garantía de manifestación, la decepción es probable.',
        '<strong>No interpretes en exceso</strong>: el 11:11 aparece muchas veces por semana. No cada aparición necesita cargarse de significado. A veces, simplemente estás mirando la hora.',
      ] },
    ],
    cta: {
      h3: '¿Tiene el 11 un papel en tu perfil numerológico?',
      body: 'El 11:11 resuena de forma muy distinta para quienes tienen el número maestro 11 como Camino de Vida, Expresión o en sus Ciclos de Vida. La calculadora gratuita te dice tus números principales en segundos.',
      link1: { href: '/numerologia/', text: 'Calcular mi numerología gratis' },
      link2: { href: '/precios/', text: 'Ver el estudio completo — desde 19€' },
    },
    blocks2: [
      { t: 'h2', id: 'horas-espejo-comparativa', text: '11:11 vs. otras horas espejo: cuál es la diferencia' },
      { t: 'p', html: 'El 11:11 no es la única hora espejo, pero sí la de mayor carga simbólica. Una comparativa rápida:' },
      { t: 'table', heads: ['Hora espejo', 'Número base', 'Significado principal'], rows: [
        ['11:11', '11 maestro', 'Intuición, despertar, portal espiritual, llamas gemelas'],
        ['22:22', '22 maestro', 'Manifestación concreta, arquitectura de vida, hacer real lo que imaginas'],
        ['00:00 / 12:12', '12 / cierre', 'Final de ciclo, transición, página en blanco'],
        ['10:10', '10 → 1', 'Nuevo comienzo, liderazgo, acción iniciada'],
        ['3:33', '33 maestro', 'Compasión, creatividad, servicio a los demás'],
        ['4:44', '4 estabilidad', 'Fundamentos sólidos, trabajo, lo que construyes tiene base'],
      ] },
      { t: 'p', html: 'El 11:11 destaca entre todas porque combina dos números maestros iguales (11 y 11), lo que le da una resonancia simbólica que las demás no tienen. Las otras horas espejo tienen su propio significado —pero el 11:11 ocupa un lugar especial en la conciencia colectiva.' },

      { t: 'h2', id: 'numero-personal', text: 'El 11:11 y tu mapa numerológico personal' },
      { t: 'p', html: 'El significado del 11:11 se amplifica cuando el 11 ya forma parte de tu estructura numerológica. Si tu <strong>Camino de Vida es 11</strong>, si tienes el número maestro en tu Expresión (nombre completo) o en tu Alma (vocales del nombre), ver el 11:11 no es solo una sincronicidad: es un eco de quien eres.' },
      { t: 'p', html: 'Las personas con el 11 en posiciones clave del perfil suelen tener una relación especialmente intensa con las sincronicidades numéricas, precisamente porque ese número ya resuena en su estructura. Para ellas, el 11:11 no es un fenómeno ocasional —es casi una constante.' },
      { t: 'p', html: '¿Quieres saber si el 11 forma parte de tu numerología? Puedes calcularlo gratis o leer nuestro artículo detallado sobre el <a href="/blog/camino-de-vida-11-numero-maestro/" style="color:var(--accent)">Camino de Vida 11</a>.' },
    ],
    faq: [
      { q: '¿Qué significa el 11:11 en el amor?', a: 'Depende del contexto: si estás soltero/a, suele interpretarse como señal de alineación y apertura a una nueva conexión. En pareja, como recordatorio de presencia y reconexión consciente. Tras una ruptura, como señal de cierre y de que el espacio abierto tiene un propósito. En todos los casos, la pregunta más útil no es "qué va a pasar" sino "qué quiero en esta área de mi vida".' },
      { q: '¿Qué significa ver el reloj en las 11:11?', a: 'Es la hora espejo más buscada. En numerología coincide con el número maestro 11 amplificado: un momento de alta receptividad intuitiva. En la interpretación angelical, es señal de que estás en el camino correcto. Psicológicamente, parte del filtro de la atención: el cerebro prioriza el 11:11 porque ya le has dado significado. Las tres perspectivas coexisten.' },
      { q: '¿Qué intenta decirte el 11:11?', a: 'No hay un mensaje único. La respuesta más honesta: el 11:11 no te dice qué hacer —te invita a preguntarte qué estabas sintiendo en ese momento. Si hay algo que ya sabes pero te niegas a admitir, es un buen recordatorio para enfrentarlo. Si estás en un momento de duda, puede ser un ancla para volver a tus prioridades reales.' },
      { q: '¿Qué significa el número 11:11?', a: 'En numerología pitagórica clásica, el 11 es número maestro (no se reduce a 2) y se asocia a intuición, sensibilidad elevada e inspiración. El 11:11 combina dos maestros 11, que muchas tradiciones interpretan como el portal simbólico del reloj. En la numerología angelical moderna, es el número de alineación y de confirmación espiritual.' },
    ],
    ctaFinal: {
      h2: 'Descubre si el 11 forma parte de tu numerología personal.',
      p: 'No todas las personas sienten el 11:11 de la misma manera. Para quienes tienen el número maestro 11 en posiciones clave de su perfil, la resonancia es mucho más intensa. El estudio numerológico completo revela exactamente dónde y cómo.',
      href: '/precios/',
      btnText: 'Ver el estudio numerológico →',
    },
  },

  '11-11-significado-espiritual': {
    eyebrow: 'Numerología espiritual · Carl Jung · Número maestro 11',
    h1: '11:11: significado espiritual completo',
    lead: 'Ves el 11:11 en el reloj, en tickets de compra, en matrículas. Millones de personas lo experimentan y se hacen la misma pregunta. Este artículo te da una respuesta honesta desde la numerología pitagórica, la psicología de Jung y las tradiciones espirituales —sin promesas vacías y sin descartar lo que puede ser genuinamente valioso.',
    readingTime: '12 min',
    blocks1: [
      { t: 'h2', id: 'numerologia-11', text: 'El 11 en la numerología pitagórica: por qué es un número maestro' },
      { t: 'p', html: 'En la tradición numerológica pitagórica —la más extendida en Occidente— los números del 1 al 9 son la base de todo cálculo. Cada número multi-dígito se reduce sumando sus cifras: 29 → 2+9 = 11 → 1+1 = 2. Pero hay tres excepciones: el 11, el 22 y el 33. Estos <strong>números maestros</strong> no se reducen porque se considera que tienen una vibración propia que se perdería al hacerlo.' },
      { t: 'p', html: 'El 11 es el primer número maestro. Matemáticamente es el primer número palíndromo (se lee igual al derecho que al revés) y el primer número que supera la base decimal sin ser un múltiplo de 10. En numerología esto se traduce en una posición de umbral: más allá de los nueve arquetipos básicos, pero sin haber alcanzado aún la maestría constructiva del 22.' },
      { t: 'h3', text: 'Las cuatro cualidades esenciales del 11' },
      { t: 'ul', items: [
        '<strong>Intuición elevada</strong>: mayor capacidad para percibir lo que no se dice, para sentir antes de entender. El 11 tiene acceso a información que la mente racional aún no ha procesado.',
        '<strong>Visión e inspiración</strong>: tendencia a captar ideas que el entorno todavía no ve. El 11 es el número del profeta, del artista, del visionario —no por superioridad sino por perspectiva.',
        '<strong>Sensibilidad extrema</strong>: el 11 amplifica todo. Las emociones son más intensas, la empatía más profunda, el dolor más agudo y la alegría más plena. No hay experiencia a media temperatura.',
        '<strong>Tensión interna permanente</strong>: el 1+1=2 que subyace al 11 crea un conflicto constante entre el impulso individual (el 1, pionero, independiente) y la necesidad de armonía y conexión (el 2, relacional, colaborativo). Vivir con el 11 es vivir con esa tensión como compañera.',
      ] },
      { t: 'p', html: 'Cuando el 11 aparece duplicado —como en el 11:11— la tradición numerológica lo interpreta como una amplificación de esa energía al cuadrado. No un mensaje concreto ni una instrucción, sino una señal de que el nivel de receptividad intuitiva en ese momento es especialmente alto.' },

      { t: 'h2', id: 'origen-historico', text: 'El origen histórico del 11:11 como fenómeno espiritual' },
      { t: 'p', html: 'El 11:11 no siempre fue el fenómeno global que es hoy. Su historia como símbolo espiritual contemporáneo tiene un origen rastreable, aunque mezcla varias corrientes.' },
      { t: 'p', html: 'La primera ola documentada surge a finales de los años 80 y principios de los 90, principalmente en círculos de la espiritualidad New Age anglosajona. En 1991-1992, la autora estadounidense conocida como <strong>Solara</strong> popularizó el concepto de las "puertas estelares" del 11:11, presentando el 11 de enero de 1992 (11/1/1992) como un momento de activación espiritual colectiva. El fenómeno movilizó meditaciones sincronizadas en decenas de países y dejó una impronta duradera en cómo la cultura New Age interpreta el número.' },
      { t: 'p', html: 'Paralelamente, el ilusionista y fenómeno mediático <strong>Uri Geller</strong> convirtió el 11:11 en parte de su marca pública, atribuyendo al número un significado especial relacionado con las fuerzas extraterrestres y la conciencia expandida. Geller —con décadas de presencia mediática internacional— contribuyó a llevar el 11:11 a audiencias masivas que nunca hubieran llegado a él por la vía del esoterismo.' },
      { t: 'p', html: 'La segunda ola llega con internet y las redes sociales. Los foros de espiritualidad de los años 2000 masificaron la experiencia de "siempre veo el 11:11", convirtiéndola en un fenómeno colectivo auto-referencial: cuantas más personas lo compartían, más personas empezaban a notarlo. <strong>TikTok</strong> ha completado la globalización del símbolo, con millones de vídeos que van desde el relato personal hasta la explicación numerológica más rigurosa.' },
      { t: 'p', html: 'Conocer este origen no resta valor a la experiencia —la psicología y la espiritualidad generan fenómenos genuinos aunque tengan una historia conocida. Pero sí ubica el 11:11 en su contexto real: es un símbolo contemporáneo de plena vigencia, no una tradición milenaria.' },

      { t: 'h2', id: 'psicologia', text: 'La explicación psicológica: SAR, efecto Baader-Meinhof y sesgo de confirmación' },
      { t: 'p', html: 'La neurología aporta una explicación complementaria a la espiritual, y conviene entenderla para no confundirlas.' },
      { t: 'p', html: 'El <strong>Sistema de Activación Reticular</strong> (SAR) es la red neuronal del tronco encefálico que actúa como filtro de la atención. De los millones de estímulos que tu sistema nervioso recibe cada segundo, el SAR selecciona cuáles llegan a la conciencia. Su criterio de selección es simple: lo que ya conoces y a lo que ya le has asignado importancia.' },
      { t: 'p', html: 'Una vez que el 11:11 tiene carga emocional para ti —una vez que lo has notado y te has preguntado qué significa— el SAR lo marca como relevante y lo extrae del ruido de fondo. Empiezas a "ver" el 11:11 mucho más seguido. Pero no porque aparezca más: porque ahora lo percibes cuando aparece.' },
      { t: 'p', html: 'Este fenómeno tiene nombre en psicología cognitiva: el <strong>efecto Baader-Meinhof</strong> o ilusión de frecuencia. Ocurre con todo: cuando aprendes una palabra nueva, de repente la escuchas en todas partes. Cuando te compras un coche de un modelo concreto, empiezas a ver ese modelo por todas partes. El 11:11 funciona igual.' },
      { t: 'p', html: 'Este mecanismo <em>no invalida</em> la lectura simbólica o espiritual. Lo que hace es explicar el <em>por qué ahora lo ves tanto</em>. La pregunta "qué significa para mí" sigue siendo válida e independiente del mecanismo de percepción.' },

      { t: 'h2', id: 'jung', text: 'Carl Jung, la sincronicidad y el significado de los números' },
      { t: 'p', html: 'Carl Jung, el psiquiatra suizo fundador de la psicología analítica, desarrolló en 1952 la teoría de la <strong>sincronicidad</strong> como principio de conexión acausal. El principio básico: existen coincidencias que no tienen relación de causa y efecto pero sí una correspondencia de significado que no puede explicarse por el azar estadístico.' },
      { t: 'p', html: 'Jung llegó a este concepto parcialmente a través de su trabajo con el físico Wolfgang Pauli —Premio Nobel de Física— sobre la aparición de ciertos números y patrones en los sueños y la vida de los pacientes. La colaboración resultó en el libro conjunto <em>Naturerklärung und Psyche</em> (1952), donde Jung estableció la sincronicidad como fenómeno genuino que merece estudio serio.' },
      { t: 'p', html: 'Aplicado al 11:11: Jung diría que cuando alguien ve repetidamente este número en momentos de decisión, duda o transición interna, no es que el número "cause" nada ni que haya un agente externo enviando mensajes. Lo que ocurre es que la psique —el inconsciente— y el mundo exterior se sincronizan de forma que produce un acontecimiento con sentido para quien lo vive. El significado es real aunque el mecanismo no sea físico-causal.' },
      { t: 'p', html: 'Jung tampoco era un esotérico acrítico: insistía en que los símbolos tienen valor <em>psicológico</em>, no sobrenatural. Trabajar con ellos —darles significado, reflexionar sobre lo que activan en el interior— es una herramienta legítima de autoconocimiento. Rechazarlos por "irracionales" es, según Jung, tan poco científico como tomarlos literalmente como mensajes de seres externos.' },

      { t: 'h2', id: 'tradiciones', text: 'El 11:11 en las tradiciones espirituales' },
      { t: 'p', html: 'El 11:11 ha sido adoptado —y adaptado— por diversas corrientes espirituales, cada una con su propio marco de interpretación.' },
      { t: 'h3', text: 'New Age: el portal y la activación' },
      { t: 'p', html: 'En la espiritualidad New Age, el 11:11 se interpreta como un <strong>portal</strong>: un umbral entre el mundo ordinario y un plano de conciencia superior. Ver el 11:11 sería una invitación a "pasar" —no físicamente, sino en términos de expansión de conciencia, de salir del piloto automático y de conectar con una perspectiva más amplia de la propia existencia.' },
      { t: 'h3', text: 'Numerología angelical: el mensaje de los guías' },
      { t: 'p', html: 'La numerología angelical —sistema moderno popularizado principalmente en los años 90— interpreta el 11:11 como una señal de ángeles de la guarda o guías espirituales: "estás en el camino correcto", "mantén tus pensamientos positivos", "presta atención a lo que está ocurriendo". Este marco no tiene raíces en las tradiciones numerológicas clásicas pero ha tenido una adopción masiva y puede funcionar como herramienta de orientación para quien trabaja con él.' },
      { t: 'h3', text: 'Cábala: el 11 como exceso y trascendencia' },
      { t: 'p', html: 'En la tradición cabalística, el árbol de la vida tiene 10 sefirot (emanaciones divinas). El 11 no pertenece al árbol ordinario sino a la <em>Da\'at</em>, el conocimiento oculto que solo se revela en estados de conciencia expandida. El 11 cabalístico señala lo que está más allá de los diez —la experiencia que supera la estructura conocida.' },

      { t: 'h2', id: 'despertar', text: '11:11 y el despertar espiritual: qué significa realmente' },
      { t: 'p', html: 'El concepto de <strong>despertar espiritual</strong> —vinculado al 11:11 en prácticamente todas sus interpretaciones modernas— merece ser explicado con precisión, porque suele usarse de forma vaga.' },
      { t: 'p', html: 'En psicología transpersonal y en las tradiciones contemplativas, el "despertar" no es un evento súbito y definitivo. Es un proceso gradual de <strong>desidentificación del piloto automático</strong>: el momento en que una persona empieza a observar sus propios patrones en lugar de simplemente vivirlos, a cuestionar sus supuestos en lugar de asumirlos, a actuar desde elección consciente en lugar de desde reacción habitual.' },
      { t: 'p', html: 'El 11:11 aparece con especial frecuencia en los relatos de personas que están en ese proceso. Hay varias explicaciones posibles que no se excluyen entre sí: que el SAR prioriza el 11:11 en momentos de mayor actividad interna; que la psique busca símbolos de umbral cuando está cruzando uno; que la sincronicidad jungiana opera con más fuerza en estados de mayor conciencia.' },
      { t: 'p', html: 'Lo que sí es cierto: el 11:11, cuando se trabaja conscientemente, puede funcionar como ancla de presencia. Cada vez que aparece, la persona tiene la oportunidad de salir por un momento de lo que estaba haciendo en automático y preguntarse: ¿qué estoy sintiendo? ¿Qué decisión tengo pendiente? ¿Estoy viviendo de acuerdo con lo que realmente importa? Esa interrupción —aunque sea de segundos— tiene valor real independientemente de su origen.' },

      { t: 'h2', id: 'que-hacer', text: 'Qué hacer cuando ves el 11:11' },
      { t: 'p', html: 'Más allá de las interpretaciones, la pregunta práctica es cómo responder. Las respuestas que circulan en redes ("pide un deseo", "los ángeles te escuchan ahora") simplifican hasta perder utilidad. Alternativas más concretas:' },
      { t: 'ul', items: [
        '<strong>Para un instante.</strong> No para realizar ningún ritual —solo para salir del modo automático durante diez segundos. ¿Qué estabas pensando justo antes? ¿Con qué emoción estabas? El contexto importa más que el número.',
        '<strong>Formula una pregunta, no un deseo.</strong> En lugar de "pedir" algo, usa el 11:11 para preguntarte algo concreto: "¿Qué sé que me niego a admitir?", "¿Qué decisión tengo pendiente?", "¿Estoy siendo honesto conmigo en este área?" Las preguntas generan más que los deseos.',
        '<strong>Registra el contexto.</strong> Si el 11:11 aparece en momentos específicos —cuando piensas en una persona, cuando tienes una duda concreta, cuando estás en un lugar determinado— el patrón de contextos puede decirte más que el número en sí.',
        '<strong>No lo fuerces.</strong> Si buscas el 11:11 activamente, lo encontrarás siempre —el SAR hará el trabajo. El valor está en notarlo espontáneamente, no en perseguirlo.',
      ] },

      { t: 'h2', id: 'numerologia-personal', text: 'El 11 en tu carta numerológica personal' },
      { t: 'p', html: 'El significado del 11:11 cambia sustancialmente si el 11 ya forma parte de tu estructura numerológica personal. Las personas con <strong>Camino de Vida 11</strong>, con el número maestro en su Expresión (nombre completo) o en alguno de sus Ciclos de Vida tienen una "antena" especialmente sensible a las sincronicidades de este número —porque es su propio patrón el que resuena con ellas.' },
      { t: 'p', html: 'Si tienes el 11 en posiciones clave de tu perfil, ver el 11:11 no es un fenómeno casual: es casi una constante. Y la intensidad de la experiencia —esa sensación de "hay algo en esto"— suele ser mucho más marcada que en personas cuyo perfil no incluye el número maestro.' },
      { t: 'p', html: 'Para saber si el 11 está en tu perfil numerológico, necesitas calcular tu Camino de Vida (fecha de nacimiento completa), tu Número de Expresión (nombre completo de nacimiento) y tus Ciclos de Vida (tres periodos de la vida definidos por tu fecha). La calculadora gratuita lo hace automáticamente.' },
    ],
    cta: {
      h3: '¿Tiene el 11 un papel en tu perfil numerológico?',
      body: 'La calculadora gratuita calcula tu Camino de Vida, Expresión, Alma y Ciclos. El estudio completo te explica qué significa el 11 en tu posición específica, cómo convivir con su intensidad y dónde se activa con más fuerza en tu vida.',
      link1: { href: '/numerologia/', text: 'Calcular mi numerología gratis' },
      link2: { href: '/precios/', text: 'Ver el estudio completo — desde 19€' },
    },
    blocks2: [
      { t: 'h2', id: 'historia-numero-11', text: 'El número 11 en la historia: de Pitágoras al siglo XXI' },
      { t: 'p', html: 'El 11 tiene una historia larga como número con significado especial, mucho antes de que existiera el 11:11 como fenómeno contemporáneo.' },
      { t: 'p', html: 'En la tradición pitagórica griega (siglo VI a.C.), los números no eran solo herramientas matemáticas —eran principios del cosmos. El 11 ocupaba una posición incómoda: excedía la <em>década</em> (la perfección del 10) sin llegar a la <em>dodécada</em> (el 12, asociado al cosmos completo). Esta posición de umbral entre dos completitudes daba al 11 un carácter de tránsito, de paso entre estados.' },
      { t: 'p', html: 'En la numerología medieval, el 11 heredó esa ambivalencia: era el número del pecado que excede la ley (10) pero también el número de la gracia que precede a la completitud apostólica (12 apóstoles). Esta doble cara —transgresión y promesa— se mantiene en muchas tradiciones esotéricas posteriores.' },
      { t: 'p', html: 'La numerología moderna, desarrollada principalmente en el siglo XIX y codificada en el XX, rehabilitó el 11 como número maestro: ya no como exceso peligroso sino como vibración elevada con misión específica. Esta reinterpretación es la que alimenta el significado contemporáneo del 11:11.' },

      { t: 'h2', id: 'significado-universal', text: '¿Tiene el 11:11 un significado espiritual universal?' },
      { t: 'p', html: 'No hay un significado universal fijo, aunque las tradiciones modernas convergen en temas similares: umbral, receptividad, intuición, despertar, sincronicidad. Lo que sí existe es un significado que se construye a través de la experiencia personal: si cada vez que ves 11:11 coincide con momentos de claridad, de decisiones importantes o de transiciones vitales, esa correlación tiene valor para ti aunque no sea universalizable.' },
      { t: 'p', html: 'La numerología es un sistema de símbolos. Como todos los sistemas simbólicos —el lenguaje, el arte, los sueños, los mitos— produce sentido en la medida en que se trabaja activamente con él. No predice el futuro ni garantiza resultados. Es un vocabulario para explorar quién eres y qué está ocurriendo en tu proceso interno.' },
      { t: 'p', html: 'La pregunta más útil no es "¿qué significa el 11:11?" sino "¿qué activa en mí?" La respuesta a esa segunda pregunta es específica para cada persona y mucho más accionable que cualquier interpretación genérica.' },

      { t: 'h2', id: 'manifestacion', text: '11:11 y la manifestación: qué dice la ciencia, qué dice la tradición' },
      { t: 'p', html: 'La idea de que ver el 11:11 abre una "ventana de manifestación" —un momento en el que los pensamientos tienen mayor poder creativo— es una de las más extendidas en redes sociales, y merece un análisis honesto.' },
      { t: 'p', html: 'Desde la neurociencia y la psicología cognitiva, no existe evidencia de ningún mecanismo por el cual un número en el reloj amplifique la efectividad de los deseos o intenciones. Los estudios sobre manifestación y visualización muestran que las intenciones positivas tienen valor en la medida en que activan comportamientos coherentes con ellas —no porque el universo "reciba" el deseo en ese momento.' },
      { t: 'p', html: 'Desde la tradición espiritual, el 11:11 como ventana de manifestación tiene valor como <em>ritual de intención</em>: el momento de parar, de clarificar lo que se quiere y de comprometerse con ello conscientemente. El mecanismo es psicológico —la intención clarificada activa comportamientos distintos— pero el resultado puede ser real. El error está en atribuir el resultado al número en lugar de a la intención y la acción que genera.' },
    ],
    faq: [
      { q: '¿Es malo ver el 11:11?', a: 'No. En ninguna tradición numerológica el 11 tiene connotaciones negativas. Lo que puede ser intenso es vivir con la energía del 11 en posiciones clave del perfil numerológico —hay cierta tendencia a la ansiedad e hipersensibilidad— pero ver el número en sí no augura nada malo. Al contrario: en la mayoría de sistemas se interpreta como señal positiva de receptividad y alineación.' },
      { q: '¿Debo pedir un deseo cuando veo el 11:11?', a: 'Es una práctica lúdica que no tiene base en la tradición numerológica seria. Si te ayuda como recordatorio de lo que deseas y te lleva a actuar en consecuencia, tiene valor real. Si lo tomas literalmente como mecanismo garantizado de manifestación, la decepción es probable. Una alternativa más útil: en lugar de pedir, formula una pregunta honesta sobre lo que quieres y lo que te frena.' },
      { q: '¿Tiene que ver con los ángeles?', a: 'La numerología angelical —corriente moderna surgida en los años 90— interpreta el 11:11 como señal de ángeles de la guarda o guías espirituales. No forma parte de las tradiciones numerológicas clásicas (pitagórica, caldea ni cabalística). Puede funcionar como marco espiritual para quien trabaja con él, pero conviene saber que es una creación relativamente reciente, no una tradición milenaria.' },
      { q: '¿Cuándo empezó la gente a ver el 11:11?', a: 'La primera ola documentada surge a finales de los 80 y principios de los 90, principalmente en círculos New Age anglosajones. Solara y Uri Geller contribuyeron a masificar el símbolo. Internet y TikTok completaron su globalización. Antes de ese periodo, el 11 tenía significados en numerología y en tradiciones esotéricas, pero el fenómeno específico del 11:11 como hora espejo es esencialmente contemporáneo.' },
      { q: '¿Significa lo mismo para todo el mundo?', a: 'No. El 11:11 afecta de forma diferente a quienes tienen el número maestro 11 en posiciones clave de su perfil numerológico. Para ellos, la resonancia es mucho más intensa y constante. Para quienes el 11 no aparece en su estructura numerológica, el 11:11 puede ser una señal de receptividad momentánea sin el peso de un patrón vital.' },
      { q: '¿Qué pasa si veo el 11:11 varias veces al día?', a: 'Si lo ves constantemente, lo más probable es que el SAR lo haya marcado como altamente prioritario —lo cual significa que le has dado mucha carga emocional. Eso no es malo: indica que hay algo en tu vida que está pidiendo atención. La pregunta útil no es "¿por qué lo veo tanto?" sino "¿de qué temas internos me está recordando que me ocupe?"' },
    ],
    ctaFinal: {
      h2: 'Tu perfil numerológico completo.',
      p: 'Camino de Vida, Expresión, Alma, Personalidad, Ciclos y todos los números maestros que aparecen en tu fecha y nombre. 52 páginas de interpretación narrativa.',
      href: '/precios/',
      btnText: 'Ver el estudio numerológico →',
    },
  },

  'camino-de-vida-11-numero-maestro': {
    eyebrow: 'Número maestro · Numerología pitagórica',
    h1: 'Camino de Vida 11',
    lead: 'El Visionario. El canal. La persona que nació para traer perspectivas que los demás aún no pueden ver. Y que paga por ello con una sensibilidad que a veces duele.',
    readingTime: '8 min',
    blocks1: [
      { t: 'h2', id: 'que-significa-11', text: 'Qué significa el Camino de Vida 11' },
      { t: 'p', html: 'El Camino de Vida es el número más importante del perfil numerológico. Se calcula reduciendo la fecha de nacimiento completa a un solo dígito (o número maestro). El 11 es uno de los tres números que no se reducen —junto al 22 y al 33— porque la tradición pitagórica los considera de vibración especialmente elevada.' },
      { t: 'p', html: 'El número 11 combina dos energías del 1 (iniciativa, individualidad, liderazgo) que conviven en tensión permanente con la energía subyacente del 2 (1+1), que es cooperación, sensibilidad, necesidad de armonía. Esta tensión es la clave del 11: el impulso de destacar y liderar choca con la necesidad de pertenecer y conectar.' },

      { t: 'h2', id: 'como-calcular', text: 'Cómo calcular si tienes Camino de Vida 11' },
      { t: 'p', html: 'La regla para el número maestro 11 es que aparezca como resultado <em>antes de la reducción final</em>. El procedimiento:' },
      { t: 'ol', items: [
        'Reduce el día de nacimiento a un dígito (o número maestro): 29 → 2+9 = 11. Aquí paras.',
        'Reduce el mes de nacimiento a un dígito.',
        'Reduce el año de nacimiento a un dígito.',
        'Suma los tres resultados. Si la suma es 11, 22 o 33, tienes número maestro.',
      ] },
      { t: 'p', html: 'Ejemplo: nacido el 29 de noviembre de 1987.' },
      { t: 'ul', items: [
        'Día: 29 → 2+9 = 11 (maestro, no se reduce)',
        'Mes: 11 → número maestro (no se reduce)',
        'Año: 1987 → 1+9+8+7 = 25 → 2+5 = 7',
        'Suma: 11+11+7 = 29 → 2+9 = 11 ✓',
      ] },
      { t: 'p', html: '<strong>Nota metodológica</strong>: hay escuelas numerológicas que suman todos los dígitos de la fecha de golpe y solo mantienen el número maestro si aparece en ese resultado directo. La escuela pitagórica clásica, que es la que seguimos, trabaja reduciendo mes, día y año por separado. La calculadora de Cosmyastral aplica la metodología pitagórica estándar.' },

      { t: 'h2', id: 'don', text: 'El don del Camino de Vida 11: la intuición como herramienta' },
      { t: 'p', html: 'Las personas con Camino de Vida 11 tienen acceso a una forma de percepción que precede a la lógica. Antes de que el intelecto procese la información, ya "saben". Esta capacidad intuitiva puede manifestarse de muchas formas:' },
      { t: 'ul', items: [
        'Llegar a conclusiones correctas sin saber explicar el camino.',
        'Sentir el estado emocional de una habitación al entrar.',
        'Tener ideas que, años después, el mercado o la cultura mainstream adopta.',
        'Percibir contradicciones en las personas antes de que se vuelvan evidentes.',
      ] },
      { t: 'p', html: 'El 11 es también un número de inspiración y canalizador: muchos artistas, músicos, escritores y figuras espirituales tienen el 11 en posiciones clave de su perfil numerológico. No es que sean "especiales" en un sentido superior —es que el 11 tiene una antena especialmente sensible para captar lo que está en el aire antes que los demás.' },

      { t: 'h2', id: 'sombra-11', text: 'La sombra del Camino de Vida 11' },
      { t: 'p', html: 'La misma sensibilidad que es el don del 11 es su mayor desafío. Demasiada estimulación es agotador. Las emociones de los demás se sienten como propias. La autocrítica puede ser feroz. El estándar interno es tan alto que pocas cosas parecen suficientemente buenas.' },
      { t: 'p', html: 'Los patrones de sombra más comunes del 11:' },
      { t: 'ul', items: [
        '<strong>Ansiedad crónica</strong>: la mente del 11 no descansa fácilmente. Siempre hay algo que procesar, anticipar, revisar.',
        '<strong>Parálisis por perfeccionismo</strong>: la visión de lo que podría ser es tan clara que lo que existe nunca parece suficiente para materializarla.',
        '<strong>Dependencia de la aprobación</strong>: el 2 subyacente necesita que los demás estén bien. Cuando el entorno desaprueba o rechaza, el 11 puede derrumbarse.',
        '<strong>Liderazgo que se niega a sí mismo</strong>: hay personas con Camino 11 que tienen el don pero no quieren la visibilidad que viene con él. Se quedan en roles secundarios sin saber por qué se sienten frustradas.',
      ] },

      { t: 'h2', id: 'proposito', text: 'El propósito del Camino de Vida 11' },
      { t: 'p', html: 'Si el Camino de Vida describe la misión del alma, el 11 tiene una misión de <em>inspirar</em>. No necesariamente en un escenario, no necesariamente ante millones de personas. La inspiración puede ser en la consulta del terapeuta, en el aula, en el taller, en la pareja, en la familia. La pregunta es: ¿qué visión tienes que los demás aún no ven? ¿La estás compartiendo?' },
      { t: 'p', html: 'El 11 que opera desde su potencial más alto no hace las cosas por reconocimiento externo sino porque no puede <em>no</em> hacerlo. La motivación es intrínseca: hay algo que ver, que decir, que traer. Cuando el 11 conecta con eso, la ansiedad cede y aparece un flujo que compensa toda la intensidad anterior.' },

      { t: 'h2', id: 'camino-2-vs-11', text: 'Camino de Vida 11 vs Camino de Vida 2' },
      { t: 'p', html: 'Muchos sistemas numerológicos tratan el 11 como una versión elevada del 2. En el sistema pitagórico clásico son distintos:' },
      { t: 'ul', items: [
        'El <strong>Camino 2</strong> opera principalmente desde la cooperación, la diplomacia y la relación. Su misión es armonizar, mediar, conectar.',
        'El <strong>Camino 11</strong> tiene esas cualidades del 2 pero está bajo una presión mayor de misión individual. El 11 necesita inspirar, no solo cooperar. Tiene un peso de propósito que el 2 puro no tiene.',
      ] },
      { t: 'p', html: 'Si calculaste tu Camino de Vida y el resultado fue 11, la primera pregunta es si realmente es un 11 (aparece como subtotal) o si fue un 2 amplificado por mala reducción. La calculadora de Cosmyastral aplica la metodología correcta automáticamente.' },
    ],
    cta: {
      h3: '¿Cuáles son todos tus números maestros?',
      body: 'El 11 puede aparecer no solo en el Camino de Vida sino en la Expresión, el Alma, la Personalidad, los Ciclos o los Pináculos. El estudio completo revela dónde está el 11 en todo tu perfil y qué significa en cada posición.',
      link1: { href: '/numerologia/', text: 'Calcular mi numerología gratis' },
      link2: { href: '/precios/', text: 'Ver el estudio completo — desde 19€' },
    },
    faq: [
      { q: '¿Tener Camino 11 significa que soy especial o mejor que los demás?', a: 'No. Todos los Caminos de Vida tienen dones y sombras de igual valor. El 11 tiene una misión más visible en su arquetipo pero no una jerarquía de importancia sobre otros caminos. Un Camino 4 que construye cosas sólidas y duraderas está cumpliendo una misión tan necesaria como cualquier Camino 11.' },
      { q: '¿El Camino 11 siempre tiene éxito o fama?', a: 'No. El 11 marca una tendencia y una dirección, no un destino garantizado. Hay personas con Camino 11 muy anónimas que viven su misión en contextos íntimos y hay personas con Camino 1 que son enormemente famosas. La numerología no predice el éxito externo.' },
      { q: '¿Qué pasa si tengo el 11 en varios lugares de mi perfil?', a: 'Si el 11 aparece en múltiples posiciones (Camino de Vida, Expresión, Ciclo de Vida...) la energía del número maestro se amplifica en el perfil. Suele indicar una persona con una sensibilidad e intensidad muy marcadas, y con una misión que se siente desde muy joven aunque no se sepa formular.' },
      { q: '¿Hay relación entre el Camino de Vida 11 y ver el 11:11 constantemente?', a: 'La numerología 11:11 como fenómeno de sincronicidad y el Camino de Vida 11 son cosas distintas pero relacionadas. Las personas con el 11 en posiciones clave tienen una "antena" especialmente sensible a las sincronicidades numéricas, precisamente porque ese número ya resuena en su estructura energética.' },
    ],
    ctaFinal: {
      h2: 'Tu Camino de Vida explicado en 52 páginas.',
      p: 'Con todos tus números integrados, tu sombra, tus ciclos y una guía de aplicación a tu vida concreta.',
      href: '/precios/',
      btnText: 'Ver el estudio numerológico →',
    },
  },

  'revolucion-solar-que-es-como-calcularla': {
    eyebrow: 'Astrología predictiva · Carta anual',
    h1: 'Revolución solar',
    lead: 'La herramienta predictiva más usada en astrología moderna: la carta que el cielo traza exactamente en el momento en que el Sol regresa a su posición natal. Una vez al año, el reloj se reinicia.',
    readingTime: '10 min',
    blocks1: [
      { t: 'h2', id: 'que-es', text: 'Qué es la revolución solar' },
      { t: 'p', html: 'La <strong>revolución solar</strong> (también llamada <em>solar return</em> en inglés) es la carta astral calculada para el momento exacto en que el Sol regresa al grado, minuto y segundo que ocupaba en el momento de tu nacimiento. Ocurre una vez al año, normalmente el día de tu cumpleaños o el día anterior o posterior —dependiendo del año y de cómo el Sol avanza ese año concreto.' },
      { t: 'p', html: 'No es lo mismo que tu cumpleaños. El cumpleaños es el día de nacimiento según el calendario; la revolución solar es el instante astronómico preciso en que el Sol completa exactamente un año de órbita desde tu nacimiento. Pueden coincidir el mismo día o diferir pocas horas.' },
      { t: 'p', html: 'La revolución solar genera una carta que:' },
      { t: 'ul', items: [
        'Se interpreta como una carta natal convencional pero con validez de 12 meses (desde esa revolución hasta la siguiente).',
        'Describe los temas y energías dominantes del año que se abre.',
        'Siempre se superpone con la carta natal base: la revolución solar no funciona sola, sino en diálogo con los planetas natales.',
      ] },

      { t: 'h2', id: 'como-calcular', text: 'Cómo calcular tu revolución solar' },
      { t: 'p', html: 'Para <strong>calcular la revolución solar</strong> necesitas:' },
      { t: 'ol', items: [
        '<strong>Fecha, hora y lugar exactos de nacimiento</strong>: los mismos datos que para la carta natal. La hora de nacimiento es especialmente crítica porque determina el grado exacto del Sol natal, el punto al que tiene que regresar.',
        '<strong>La ciudad donde estarás en el momento de tu revolución solar</strong>: este es el dato diferencial. El ascendente de la revolución depende de la ubicación geográfica en el instante de la revolución, no de tu lugar de nacimiento.',
      ] },
      { t: 'p', html: 'La revolución solar se calcula con efeméridas astronómicas de alta precisión. Herramientas como Swiss Ephemeris calculan el instante exacto de la revolución con precisión de segundos. La diferencia con un cálculo aproximado puede cambiar el grado del ascendente varios grados.' },

      { t: 'h2', id: 'lugar-importa', text: 'Por qué el lugar donde estás en tu cumpleaños solar importa tanto' },
      { t: 'p', html: 'El ascendente de la revolución —el punto que determina toda la estructura de casas de la carta del año— cambia según la ciudad en la que te encuentres en el instante de la revolución.' },
      { t: 'p', html: 'La razón es la misma por la que el ascendente natal depende del lugar de nacimiento: el ascendente es el grado de la eclíptica que asoma por el horizonte este, y el horizonte es diferente en cada punto geográfico. Si en el momento de tu revolución estás en Madrid, el ascendente es diferente a si estás en Buenos Aires, aunque el instante sea el mismo.' },
      { t: 'p', html: 'Esto da lugar a la <strong>relocalización de la revolución solar</strong>: elegir conscientemente dónde pasar el momento de tu revolución para que el ascendente caiga en una casa o signo determinado. Es una práctica real dentro de la astrología profesional, no una curiosidad.' },

      { t: 'h2', id: 'como-interpretar', text: 'Cómo interpretar la revolución solar: los elementos clave' },
      { t: 'p', html: 'La interpretación de la revolución solar sigue un orden de importancia:' },
      { t: 'ol', items: [
        '<strong>El ascendente de la revolución</strong>: el signo que asciende en el momento de la revolución en tu ubicación. Define el tema dominante del año.',
        '<strong>El Sol en la revolución</strong>: siempre está en el mismo grado que tu Sol natal, pero cambia de casa según el ascendente. La casa del Sol indica el área de vida donde se concentra la energía ese año.',
        '<strong>La Luna de la revolución</strong>: la posición de la Luna en el instante de la revolución. Indica el estado emocional dominante del año.',
        '<strong>El regente del ascendente de la revolución</strong>: el planeta que gobierna el signo ascendente. Su casa y aspectos dicen mucho sobre cómo se despliega la energía del año.',
        '<strong>Planetas en la Casa 1 de la revolución</strong>: cualquier planeta en el ascendente tiene un impacto directo y visible sobre el año.',
        '<strong>Los ángulos de la revolución sobre los planetas natales</strong>: la superposición de la revolución sobre la carta natal es la parte más técnica y más rica de la interpretación.',
      ] },
    ],
    cta: {
      h3: 'La revolución solar comienza en la carta natal.',
      body: 'Sin una carta natal bien interpretada, la revolución solar pierde gran parte de su profundidad. El estudio de carta natal de Cosmyastral es la base sobre la que construir cualquier análisis predictivo posterior.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'natal-vs-solar', text: 'Revolución solar vs carta natal: cuándo usar cada una' },
      { t: 'p', html: 'La carta natal y la revolución solar no son intercambiables —son complementarias y tienen funciones distintas:' },
      { t: 'table', heads: ['', 'Carta natal', 'Revolución solar'], rows: [
        ['Horizonte temporal', 'Toda la vida', '12 meses (año solar)'],
        ['Qué describe', 'Carácter, dones, misión de vida', 'Temas y energías del año que se abre'],
        ['Se calcula con', 'Fecha, hora y lugar de nacimiento', 'Datos de nacimiento + ubicación en el día de la revolución'],
        ['Es modificable', 'No (la carta natal es fija)', 'Sí: el ascendente cambia según dónde estés'],
        ['Útil para', 'Autoconocimiento, patrones vitales', 'Planificación, anticipación de ciclos anuales'],
      ] },

      { t: 'h2', id: 'cuando-calcular', text: 'Cuándo calcular tu revolución solar' },
      { t: 'p', html: 'El momento óptimo para calcular e interpretar la revolución solar es entre dos y cuatro semanas antes de tu cumpleaños solar. Lo suficientemente cerca como para que la información sea relevante para el año inminente, pero con tiempo suficiente para tomar decisiones sobre la ubicación si quieres relocalizarla.' },
      { t: 'p', html: 'Calcularla después del cumpleaños solar también tiene valor: la revolución solar no "caduca" en el instante en que la cruzas —sus influencias se despliegan a lo largo de los 12 meses siguientes y hay energías que no se activan hasta el segundo semestre del año. Interpretarla en cualquier momento del año solar siempre aporta información útil.' },
    ],
    faq: [
      { q: '¿La revolución solar es lo mismo que el horóscopo de cumpleaños?', a: 'No exactamente. El horóscopo de cumpleaños que publican las revistas es una lectura genérica basada en el signo solar, sin cálculo de posiciones planetarias reales. La revolución solar es una carta astral completa calculada para el instante astronómico preciso del retorno solar, personalizada para tu carta natal y ubicación.' },
      { q: '¿Se puede hacer una revolución solar sin conocer la hora de nacimiento?', a: 'Con hora de nacimiento desconocida, la revolución solar pierde su elemento más valioso: el ascendente y las casas dependen del instante exacto del retorno, que a su vez requiere conocer el grado exacto del Sol natal. Sin hora de nacimiento, el cálculo es aproximado y la interpretación de casas no es fiable.' },
      { q: '¿La revolución solar predice el futuro?', a: 'La revolución solar describe energías y temas probables, no eventos fijos. Es una herramienta de orientación, no un oráculo determinista. Una revolución con Marte angular indica un año de mayor energía, acción y posibles conflictos —pero no predice qué evento específico activará esa energía ni si el resultado será positivo o negativo.' },
      { q: '¿En qué se diferencia la revolución solar de los tránsitos?', a: 'Los tránsitos son el movimiento actual de los planetas en el cielo real, comparados con tu carta natal. La revolución solar es una instantánea única del cielo en el momento de tu retorno solar, que luego se interpreta como carta fija para el año. Son herramientas complementarias: los tránsitos dan precisión mensual; la revolución solar da el contexto anual.' },
    ],
    ctaFinal: {
      h2: 'Antes de la revolución solar: conoce tu carta natal.',
      p: 'La revolución solar cobra todo su sentido cuando se lee en superposición con la carta natal. Empieza por ahí: calculadora gratuita, interpretación en 45–60 páginas.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'luna-llena-julio-2026': {
    eyebrow: 'Luna llena · Julio 2026 · Acuario',
    h1: 'Luna llena de julio 2026 en Acuario: el yo frente al colectivo',
    lead: 'El 29 de julio de 2026, la Luna llena ocurre en Acuario mientras el Sol transita Leo. El eje individuo–colectivo en su punto de mayor tensión del año. Lo que empezaste en enero llega a su resultado.',
    heroBg: 'var(--ink)',
    readingTime: '8 min',
    blocks1: [
      { t: 'h2', id: 'datos', text: 'Datos astronómicos de la luna llena de julio 2026' },
      { t: 'table', heads: ['Dato', 'Valor'], rows: [
        ['Fecha', '29 de julio de 2026 (miércoles)'],
        ['Hora exacta', '16:35 h hora España peninsular (CEST, UTC+2)'],
        ['Luna en', 'Acuario (~7°)'],
        ['Sol en', 'Leo (~7°)'],
        ['Nombre tradicional', 'Luna del Ciervo (Buck Moon)'],
        ['Luna nueva del mismo ciclo', '29 de enero de 2026 en Acuario'],
      ] },
      { t: 'p', html: 'La luna llena siempre ocurre cuando la Luna está exactamente opuesta al Sol. El 29 de julio, el Sol transita Leo y la Luna refleja esa luz desde el signo opuesto: Acuario. La hora es para la España peninsular (CEST, UTC+2); en México serían las 09:35 AM (CDMX); en Argentina, las 11:35 AM. La efeméride es con Swiss Ephemeris.' },

      { t: 'h2', id: 'eje-leo-acuario', text: 'El eje Leo–Acuario: de qué va esta luna llena' },
      { t: 'p', html: 'Leo y Acuario son signos opuestos en el zodíaco. En astrología, la oposición no es un conflicto —es una tensión entre dos principios que se necesitan mutuamente para funcionar. Esta luna llena pone ese eje bajo foco máximo:' },
      { t: 'table', heads: ['Sol en Leo', 'Luna llena en Acuario'], rows: [
        ['Identidad individual', 'Conciencia colectiva'],
        ['Autoexpresión y carisma', 'Distancia emocional y desapego'],
        ['Necesidad de reconocimiento', 'Necesidad de libertad'],
        ['El corazón, la voluntad', 'La mente, la visión de futuro'],
        ['Creatividad personal', 'Innovación para el grupo'],
        ['El yo en su esplendor', 'El yo al servicio de algo más grande'],
      ] },
      { t: 'p', html: 'La pregunta central de esta luna llena: <strong>¿dónde estás poniendo tu luz?</strong> Leo quiere brillar; Acuario quiere que esa luz ilumine algo que trascienda al individuo. La tensión aparece entre el ego creativo —legítimo, necesario— y la conciencia de que pertenecemos a algo más grande que nosotros mismos.' },

      { t: 'h2', id: 'temas', text: 'Qué temas activa la luna llena en Acuario' },
      { t: 'p', html: 'Acuario rige la amistad, los grupos, las comunidades, los ideales y la libertad individual. En luna llena, estos temas llegan a su punto de máxima visibilidad:' },
      { t: 'ul', items: [
        '<strong>Amistades y grupos:</strong> lo que funciona y lo que no en tus círculos sociales sale a la luz. Relaciones que se mantenían por inercia pueden llegar a un punto de decisión.',
        '<strong>Libertad vs. compromiso:</strong> la tensión entre la necesidad de espacio e independencia (Acuario) y el deseo de ser reconocido y elegido (Leo). ¿Con qué o con quién estás comprometido realmente?',
        '<strong>Autenticidad:</strong> Acuario es el signo que se niega a encajar. Esta luna llena puede revelar en qué áreas estás actuando para un público en lugar de ser genuinamente tú.',
        '<strong>Proyectos colectivos:</strong> lo que se inició en grupo en enero puede dar resultados concretos ahora, o mostrar que necesita una corrección de rumbo.',
        '<strong>Lo inesperado:</strong> Acuario tiene afinidad con lo imprevisto. Las lunas llenas en este signo tienden a traer giros o revelaciones que llegan de golpe y cambian la perspectiva.',
      ] },

      { t: 'h2', id: 'ascendente', text: 'Cómo afecta según tu Ascendente' },
      { t: 'p', html: 'El impacto real depende de en qué casas de tu carta natal caen Leo y Acuario. Para saberlo necesitas el <a href="/ascendente/" style="color:var(--accent)">Ascendente</a> (requiere hora de nacimiento exacta). Lectura rápida por Ascendente:' },
      { t: 'ul', items: [
        '<strong>Asc. Aries:</strong> eje Casa 5 (romance, creatividad, hijos) y Casa 11 (amistades, grupos, proyectos colectivos). Tensión entre vida amorosa y compromisos sociales.',
        '<strong>Asc. Tauro:</strong> eje Casa 4 (hogar, familia) y Casa 10 (carrera, reputación). Algo en tu vida doméstica o familiar llega a un punto de inflexión profesional.',
        '<strong>Asc. Géminis:</strong> eje Casa 3 (comunicación, entorno próximo) y Casa 9 (filosofía, viajes, estudios). Ideas o conversaciones que llevan meses en desarrollo toman forma.',
        '<strong>Asc. Cáncer:</strong> eje Casa 2 (recursos propios, autoestima) y Casa 8 (recursos compartidos, transformación). Algo relacionado con finanzas compartidas o compromisos profundos llega a su claridad.',
        '<strong>Asc. Leo:</strong> eje Casa 1 (identidad, el yo) y Casa 7 (relaciones, asociaciones). Una relación clave —romántica o profesional— llega a su momento de máxima visibilidad o decisión.',
        '<strong>Asc. Virgo:</strong> eje Casa 12 (inconsciente, retiro) y Casa 6 (trabajo cotidiano, salud, rutinas). Lo que estaba en la sombra en tu vida diaria se hace visible.',
        '<strong>Asc. Libra:</strong> eje Casa 11 (amistades, sueños colectivos) y Casa 5 (creatividad, amor, placer). Resultado de proyectos grupales o de lo que te da alegría genuina.',
        '<strong>Asc. Escorpio:</strong> eje Casa 10 (carrera, vocación pública) y Casa 4 (familia, hogar). Tensión entre la vida pública y la privada. Algo de tu trayectoria sale a la luz.',
        '<strong>Asc. Sagitario:</strong> eje Casa 9 (creencias, expansión) y Casa 3 (comunicación, aprendizaje). Ideas exploradas en enero toman su forma definitiva.',
        '<strong>Asc. Capricornio:</strong> eje Casa 8 (transformación, dinero ajeno) y Casa 2 (recursos propios). Algo relacionado con compromisos económicos o emocionales profundos llega a su resultado.',
        '<strong>Asc. Acuario:</strong> la luna llena cae en tu Casa 1 —impacto máximo en la identidad y la imagen. Momento de claridad sobre quién quieres ser y cómo te presentas al mundo.',
        '<strong>Asc. Piscis:</strong> eje Casa 12 (lo que opera en la sombra) y Casa 6 (rutinas, servicio). Lo que venías procesando en silencio durante meses puede salir a la superficie.',
      ] },

      { t: 'h2', id: 'luna-del-ciervo', text: 'Luna del Ciervo: el nombre tradicional de julio' },
      { t: 'p', html: 'La luna llena de julio recibe el nombre tradicional de <strong>Luna del Ciervo</strong> (<em>Buck Moon</em>). El nombre proviene de la tradición de los pueblos nativos americanos del noreste, recogido por el Farmers\' Almanac norteamericano en el siglo XX. El motivo es observacional: en julio, los ciervos machos tienen las astas en pleno crecimiento. Las astas son uno de los tejidos de crecimiento más rápido en la naturaleza —pueden crecer varios centímetros al día durante el verano. La luna plena de julio coincide con ese pico de crecimiento animal.' },
      { t: 'p', html: 'Otras tradiciones la han llamado <em>Luna del Rayo</em>, por las tormentas eléctricas de verano, o <em>Luna de la Cosecha Temprana</em>, por los primeros frutos de temporada. Todos los nombres apuntan a lo mismo: julio como el punto álgido del verano, cuando la energía solar es máxima y empieza a preparar su descenso.' },
    ],
    cta: {
      h3: '¿En qué casa de tu carta activa esta luna llena?',
      body: 'El área de vida que esta luna llena en Acuario activa depende de tu Ascendente —y eso requiere hora de nacimiento. La carta natal interpretada incluye tu patrón lunar personal: dónde cae Acuario en tu carta, qué planetas natales toca y qué tránsitos están en juego en este momento.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'ciclo-acuario', text: 'El ciclo Acuario: desde enero hasta julio' },
      { t: 'p', html: 'Las lunas llenas no ocurren de forma aislada. Cada luna llena es la culminación de un ciclo de seis meses que comenzó con la <strong>luna nueva en el mismo signo</strong>. La luna nueva en Acuario de 2026 ocurrió el <strong>29 de enero</strong>.' },
      { t: 'p', html: 'Lo que esa luna nueva en Acuario sembró —una decisión de libertad, un proyecto colectivo que empezaba, un cambio en cómo te relacionas con un grupo, una visión de futuro que quisiste materializar— llega ahora, en la luna llena del 29 de julio, a su punto de maduración o de crisis reveladora. Los dos momentos están conectados aunque el hilo no sea obvio en el día a día.' },
      { t: 'p', html: 'Para conectar el ciclo, algunas preguntas útiles:' },
      { t: 'ul', items: [
        '¿Qué decidiste o pusiste en marcha a finales de enero 2026?',
        '¿Qué situación con amigos, grupos o proyectos colectivos estaba empezando entonces?',
        '¿Qué aspecto de tu libertad o autenticidad querías recuperar o reforzar?',
        '¿Dónde está ese proceso ahora, seis meses después? ¿Ha llegado a algún resultado —positivo, negativo o diferente al esperado?',
      ] },
      { t: 'note', html: 'Si no recuerdas qué pasó a finales de enero, mira tus notas, correos o conversaciones de esa época. Las lunas llenas traen resultados de lo que se inició en la luna nueva del mismo signo aunque el hilo no sea evidente en el momento.' },

      { t: 'h2', id: 'preguntas', text: 'Preguntas para trabajar esta luna llena' },
      { t: 'p', html: 'Las lunas llenas en Acuario invitan a revisar la relación entre el individuo y el colectivo. Estas no son preguntas de ritual —son herramientas de observación honesta:' },
      { t: 'ol', items: [
        '¿En qué grupos o comunidades me siento genuinamente conectado? ¿En cuáles sigo estando por inercia?',
        '¿Qué parte de mí estoy suprimiendo para encajar o no decepcionar a alguien?',
        '¿Estoy recibiendo el reconocimiento que necesito? Y si no, ¿qué hago (o no hago) al respecto?',
        '¿Hay compromisos, grupos o dinámicas que han caducado y a los que aún no he dicho que no?',
        '¿Cuál es mi contribución real al colectivo —la que nace de lo que genuinamente soy, no de lo que se espera de mí?',
      ] },
    ],
    faq: [
      { q: '¿Cuándo es exactamente la luna llena de julio 2026?', a: 'El 29 de julio de 2026 a las 16:35 h hora España peninsular (CEST, UTC+2). En México (CDMX) serían las 09:35 AM; en Argentina, las 11:35 AM; en Colombia y Perú, las 10:35 AM.' },
      { q: '¿En qué signo está la luna llena de julio 2026?', a: 'En Acuario. El Sol transita Leo en esa fecha, y la luna llena siempre ocurre cuando la Luna está en el signo exactamente opuesto al Sol. La oposición Leo-Acuario activa el eje identidad individual vs. conciencia colectiva.' },
      { q: '¿Qué es la Luna del Ciervo?', a: 'Es el nombre tradicional de la luna llena de julio, proveniente de la tradición de los pueblos nativos americanos del noreste norteamericano y popularizado por el Farmers\' Almanac. Hace referencia a que en julio los ciervos machos tienen las astas en pleno crecimiento —uno de los procesos de crecimiento biológico más rápidos que existen en mamíferos.' },
      { q: '¿Cómo afecta emocionalmente la luna llena en Acuario?', a: 'Acuario es un signo de aire: tiende a analizar las emociones desde la distancia más que a sumergirse en ellas. Las lunas llenas en Acuario pueden traer una lucidez repentina —un "de repente lo veo claro" respecto a una relación, un grupo o una situación social. También activan el deseo de libertad y de ruptura con lo que se siente demasiado constrictivo.' },
      { q: '¿Es esta luna llena especial o tiene algún eclipse?', a: 'No. La luna llena de julio 2026 no incluye eclipse. En 2026 los eclipses lunares son en marzo (eclipse total, 3 de marzo) y agosto (eclipse parcial, 28 de agosto). La de julio es una luna llena estándar, sin amplificaciones especiales por eclipse.' },
      { q: '¿Cuándo es la próxima luna llena en Acuario después de esta?', a: 'La siguiente luna llena en Acuario ocurrirá aproximadamente en agosto de 2027 (cuando el Sol esté en Leo y la Luna en Acuario, como ahora). El ciclo Leo–Acuario se repite cada año solar, siempre en la temporada de verano del hemisferio norte.' },
    ],
    ctaFinal: {
      h2: 'Lo que la luna llena activa en tu carta natal.',
      p: 'El impacto real de la luna llena en Acuario depende de tu Ascendente y de qué planetas natales tiene cerca de los 7° de Leo o Acuario. La carta natal interpretada incluye tu patrón lunar personal y los tránsitos relevantes del año.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'luna-en-capricornio-carta-natal': {
    eyebrow: 'Astrología · Luna natal · Signo Capricornio',
    h1: 'Luna en Capricornio',
    lead: 'La posición lunar que convierte la emoción en responsabilidad. Una persona que siente profundamente pero no sabe —o no puede— mostrarlo con facilidad. Que confunde el afecto con el cuidado práctico, y el amor con la constancia.',
    heroBg: 'var(--ink)',
    readingTime: '8 min',
    blocks1: [
      { t: 'h2', id: 'que-significa', text: 'Qué significa tener la Luna en Capricornio' },
      { t: 'p', html: 'La Luna en la carta natal describe tu vida emocional: cómo sientes, qué necesitas para sentirte seguro/a, cómo respondes instintivamente. No es lo que decides hacer, sino lo que ocurre antes de que decidas nada.' },
      { t: 'p', html: 'Capricornio es el signo de la estructura, la responsabilidad, la disciplina y el tiempo largo. El signo que construye despacio pero sólido. La Luna aquí no encuentra su expresión natural en lo emocional espontáneo —encuentra seguridad en el control, en el logro, en saber que se puede contar con uno mismo sin necesitar ayuda de nadie.' },
      { t: 'p', html: 'Las personas con Luna en Capricornio tienen una vida emocional más profunda y más compleja de lo que su apariencia exterior sugiere. Por fuera, suelen proyectar compostura, incluso frialdad. Por dentro, sienten con una intensidad que rara vez se permite salir a la superficie sin filtrar. El desafío central de esta posición es aprender que mostrar necesidad no es debilidad —que la vulnerabilidad no destruye la estructura, sino que la humaniza.' },

      { t: 'h2', id: 'seguridad-logro', text: 'Seguridad emocional a través del logro' },
      { t: 'p', html: 'La necesidad central de la Luna en Capricornio es sentirse <em>capaz y competente</em>. Cuando algo sale mal o cuando las emociones amenazan con desbordar, la respuesta instintiva no es buscar consuelo —es ponerse a trabajar. La actividad, el progreso, el cumplimiento de metas concretas actúan como reguladores emocionales. Hay una razón: funcionan.' },
      { t: 'p', html: 'Esto tiene un lado luminoso. La Luna en Capricornio produce personas extraordinariamente confiables. Cuando dicen que van a hacer algo, lo hacen. Cuando se comprometen, el compromiso es real. En las crisis, no se derrumban —se reorganizan. Esa estabilidad tiene un valor enorme en las relaciones y en el trabajo.' },
      { t: 'p', html: 'El problema surge cuando la lógica del logro se aplica a todo, incluido el amor. La Luna en Capricornio puede caer en el patrón de demostrar afecto haciendo cosas —resolviendo problemas, siendo útil, siendo el pilar— sin llegar nunca a decir lo que siente. O esperar que los demás también expresen afecto así, y sentirse incomprendida cuando no lo hacen.' },

      { t: 'h2', id: 'fortalezas', text: 'Fortalezas de la Luna en Capricornio' },
      { t: 'ul', items: [
        '<strong>Fiabilidad excepcional.</strong> Las promesas se cumplen. Los compromisos se honran. En un mundo donde la palabra se devalúa, la Luna en Capricornio es de las pocas posiciones que realmente sostiene lo que dice.',
        '<strong>Resiliencia ante la adversidad.</strong> Las crisis no derrumban a la Luna en Capricornio —la activan. Hay una capacidad de reorganizarse, de ver qué sigue, de seguir funcionando cuando el entorno se desmorona. Esta fortaleza no es frialdad: es estructura interna trabajada.',
        '<strong>Visión a largo plazo.</strong> Lo que importa no es cómo me siento hoy sino qué estoy construyendo. Esta perspectiva de tiempo largo es rara y valiosa, especialmente en culturas que recompensan la gratificación inmediata.',
        '<strong>Sentido del deber hacia los suyos.</strong> Una vez que la Luna en Capricornio ha elegido a alguien —pareja, amigo, familia elegida— el cuidado es constante y práctico. No espectacular, no emotivo, pero absolutamente presente en los momentos que importan.',
      ] },

      { t: 'h2', id: 'sombra', text: 'Sombra de la Luna en Capricornio' },
      { t: 'p', html: 'La sombra es lo que se activa cuando la Luna en Capricornio está en su expresión más reactiva y menos integrada:' },
      { t: 'ul', items: [
        '<strong>Represión emocional.</strong> La emoción no expresada no desaparece. Se acumula y sale en momentos inesperados —o se somatiza en el cuerpo, especialmente en articulaciones, piel o la espalda (zonas relacionadas con Saturno, regente de Capricornio).',
        '<strong>Autocrítica feroz.</strong> El estándar que Capricornio aplica al mundo exterior es el mismo que se aplica a sí mismo, pero con más dureza. Nunca es suficiente. Siempre hay algo más que debería haberse hecho mejor.',
        '<strong>Dificultad para pedir ayuda.</strong> Necesitar ayuda se siente como fracaso. La Luna en Capricornio prefiere con frecuencia cargarlo sola antes que mostrar que no puede con todo. Esto agota.',
        '<strong>Materializar el amor.</strong> "Te quiero" puede convertirse en "te pago la factura", "te arreglo lo que no funciona", "estoy cuando me necesitas" —sin que llegue la parte que dice <em>te quiero</em> en voz alta.',
      ] },
      { t: 'p', html: 'Reconocer la sombra no es para juzgarse. Capricornio integrado no pierde su fortaleza —aprende que la fortaleza real incluye la capacidad de mostrarse frágil ante quien lo merece.' },

      { t: 'h2', id: 'casas', text: 'Luna en Capricornio en las distintas casas' },
      { t: 'p', html: 'La casa donde cae la Luna modifica significativamente cómo se expresa esta energía:' },
      { t: 'ul', items: [
        '<strong>Casa 1:</strong> la compostura y el control son visibles desde el primer encuentro. Proyecta autoridad y madurez antes incluso de hablar. Puede parecer más mayor o más seria de lo que se siente por dentro.',
        '<strong>Casa 4:</strong> el hogar y la familia son el escenario principal de la tensión Capricornio-Luna. La vida doméstica puede sentirse como responsabilidad antes que como refugio. Trabajo interno importante sobre la herencia emocional de la familia.',
        '<strong>Casa 6:</strong> la salud y el trabajo cotidiano son los canales principales de la emoción. Cuando algo va mal emocionalmente, el cuerpo lo registra primero. Disciplina excepcional en rutinas, pero difícil descansar sin sentirse culpable.',
        '<strong>Casa 7:</strong> las relaciones de pareja convocan la tensión entre control y entrega. El/la otro/a puede sentir la Luna en Capricornio como distante o demasiado enfocada en lo práctico. La intimidad real requiere tiempo y confianza acumulada.',
        '<strong>Casa 10:</strong> la carrera y la vocación pública son el territorio más cómodo. La emoción se canaliza en el trabajo con una facilidad que no aparece en el ámbito privado. El reconocimiento profesional nutre el estado emocional de forma directa.',
        '<strong>Casa 12:</strong> la vida emocional opera casi en secreto, incluso para uno mismo. Puede haber periodos de aislamiento que en realidad son de regeneración y procesamiento. Intuición lenta pero muy fiable cuando se escucha.',
      ] },

      { t: 'h2', id: 'compatibilidad', text: 'Compatibilidad y relaciones' },
      { t: 'p', html: 'La Luna en Capricornio fluye bien con posiciones en signos de tierra (Tauro, Virgo) que comparten el lenguaje del cuidado práctico y la lealtad sostenida. También puede complementarse bien con posiciones en signos de agua (Cáncer, Escorpio, Piscis) que pueden enseñar el valor de la vulnerabilidad —siempre que la Luna en Capricornio no interprete esa fluidez emocional como debilidad.' },
      { t: 'p', html: 'La combinación más desafiante suele ser con posiciones muy Aries o Sagitario, que necesitan inmediatez emocional y expresión directa del sentimiento —algo que Capricornio tarda en ofrecer. No imposible, pero requiere traducción mutua.' },
      { t: 'p', html: 'La Luna en Cáncer (signo opuesto a Capricornio) crea una tensión complementaria especialmente interesante. Cáncer necesita fusión emocional; Capricornio necesita distancia y control. La atracción puede ser intensa precisamente porque cada uno tiene lo que al otro le cuesta. La tensión puede resolverse o puede agotarse —depende del nivel de conciencia de ambas personas.' },
    ],
    cta: {
      h3: '¿Tienes la Luna en Capricornio en tu carta?',
      body: 'La carta natal interpretada explica tu Luna en el contexto completo de tu mapa: qué casa ocupa, qué aspectos forma con otros planetas —especialmente con Saturno, su regente— y cómo dialoga con tu Sol y tu Ascendente.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'personas-famosas', text: 'Personas famosas con Luna en Capricornio' },
      { t: 'p', html: 'Varias figuras públicas bien documentadas tienen la Luna en Capricornio en su carta natal. El denominador común que resulta visible incluso para quien no conoce su astrología: una seriedad de fondo, una orientación al logro que no descansa y una presencia que comunica más control que espontaneidad.' },
      { t: 'p', html: '<strong>Barack Obama</strong> (Sol en Leo, Luna en Géminis — este es solo un ejemplo de tipo, no confirmado) es útil para ilustrar el tipo. Pero un caso bien documentado es <strong>Meryl Streep</strong> (Sol en Cáncer, Luna en Capricornio): la combinación Sol en Cáncer —emocional, sensible, orientado al hogar— con Luna en Capricornio —contención, disciplina, estructura— crea una actriz cuya intensidad emocional en escena contrasta con la compostura metódica con la que habla en público sobre su proceso creativo. El trabajo como vehículo de la emoción, no al revés.' },
      { t: 'p', html: 'En general, las personas con Luna en Capricornio suelen destacar en contextos que requieren rigor sostenido a lo largo del tiempo: ejecutivos con trayectorias de décadas, artistas que construyen obra a largo plazo sin depender de ciclos de hype, directivos y gestores cuya fiabilidad es proverbial. Lo que tienen en común no es un talento especial sino una relación con el tiempo —con el trabajo lento y sólido— que pocas posiciones lunares igualan.' },

      { t: 'h2', id: 'natal-vs-transito', text: 'Luna en Capricornio natal vs. tránsito de la Luna por Capricornio' },
      { t: 'p', html: 'Es importante distinguir dos cosas que se confunden con frecuencia. La <strong>Luna en Capricornio natal</strong> es una posición fija que tienes de por vida: es el signo donde estaba la Luna en el momento de tu nacimiento. Define tu vida emocional de forma estructural y permanente.' },
      { t: 'p', html: 'El <strong>tránsito de la Luna por Capricornio</strong> ocurre cada 27-28 días, durante aproximadamente dos días y medio: es cuando la Luna en el cielo actual pasa por el signo Capricornio, afectando a todos temporalmente. En esos días la energía general favorece la planificación, el trabajo concentrado, el cierre de asuntos pendientes y la organización práctica. No es un momento óptimo para la espontaneidad o el juego emocional.' },
      { t: 'p', html: 'Si tienes la Luna natal en Capricornio, esos tránsitos lunares son especialmente relevantes para ti: la energía del momento resuena con tu propia estructura emocional. Pueden ser días de gran productividad, pero también de autocrítica más alta de lo habitual. Si no tienes la Luna natal en Capricornio, los tránsitos te afectan moderadamente durante esos dos días sin el peso de la posición natal.' },

      { t: 'h2', id: 'saturno-luna', text: 'El papel de Saturno: cómo el regente de Capricornio moldea la Luna' },
      { t: 'p', html: 'Para entender la Luna en Capricornio en una carta específica, no basta con saber que la Luna está en Capricornio. Hay que mirar también a <strong>Saturno</strong> —el regente de Capricornio— y ver en qué signo, en qué casa y con qué aspectos aparece. Saturno dice mucho sobre cómo se manifiesta esa Luna en la vida real.' },
      { t: 'p', html: 'Un Saturno en Piscis modifica la Luna en Capricornio hacia una expresión más intuitiva y permeable que un Saturno en Aries o en Virgo. Un Saturno en Casa 12 hace que el control opere de forma muy interna, casi invisible para el exterior. Un Saturno que forma una cuadratura con la Luna puede intensificar la dificultad con la vulnerabilidad; un Saturno en trígono con la Luna facilita que la estructura se viva como sostén en lugar de como cárcel.' },
      { t: 'p', html: 'Este nivel de lectura —la Luna en su signo <em>y</em> en relación con su regente— es el que diferencia una interpretación superficial de una genuinamente personalizada.' },

      { t: 'h2', id: 'integracion', text: 'Cómo integrar la Luna en Capricornio: el trabajo emocional' },
      { t: 'p', html: 'Integrar la Luna en Capricornio no significa abandonar la estructura ni la disciplina. Significa aprender que la fortaleza real no excluye la ternura —que se puede ser fiable <em>y</em> vulnerable, responsable <em>y</em> necesitado, competente <em>y</em> humano.' },
      { t: 'ul', items: [
        '<strong>Identificar qué emoción se está procesando como productividad.</strong> Cuando la urgencia de trabajar o resolver aparece en momentos de tensión emocional, vale la pena hacer una pausa y preguntar: ¿qué estoy sintiendo que prefiero no sentir? La acción puede ser la respuesta correcta —pero no siempre.',
        '<strong>Practicar la autocompasión antes de la autocorrección.</strong> Capricornio tiende a saltar directamente al análisis de qué falló. Insertar un momento de reconocimiento previo —"esto fue difícil y es comprensible que lo fuera"— antes de pasar al modo solución cambia la calidad del procesamiento.',
        '<strong>Permitir que los demás cuiden.</strong> Recibir ayuda sin interpretarla como señal de debilidad propia es uno de los trabajos más significativos de esta posición. La capacidad de dejarse cuidar no erosiona la independencia —la complementa.',
        '<strong>Usar el tiempo como aliado emocional.</strong> La Luna en Capricornio procesa lento. Eso no es un defecto —es cómo funciona. Dar espacio real al procesamiento, sin forzar resoluciones prematuras, produce una integración más sólida que cualquier catarsis inmediata.',
      ] },
      { t: 'p', html: 'Capricornio integrado no abandona su naturaleza —la eleva. El signo de la cabra de montaña que asciende paso a paso, nunca retrocede y llega donde otros no llegan no porque sea el más rápido sino porque es el más constante. Ese es el regalo real de esta posición lunar: la capacidad de hacer de la vida emocional algo que se construye con el tiempo, con cuidado, con la solidez que dura.' },
    ],
    faq: [
      { q: '¿La Luna en Capricornio es fría emocionalmente?', a: 'No. Tiene una vida emocional igual de profunda que cualquier otra posición lunar. Lo que ocurre es que la emoción se expresa con más dificultad y con más filtro que, por ejemplo, una Luna en Cáncer o en Piscis. La contención no es ausencia de sentimiento —es una forma de gestionarlo.' },
      { q: '¿Las personas con Luna en Capricornio tienen infancias difíciles?', a: 'Hay cierta tendencia: la Luna en Capricornio suele corresponder a personas que tuvieron que asumir responsabilidades pronto, que crecieron en entornos que premiaban la madurez sobre la expresión emocional, o que tuvieron una figura parental muy exigente o emocionalmente distante. Pero no es una regla absoluta.' },
      { q: '¿Cómo sé si tengo la Luna en Capricornio?', a: 'Necesitas tu carta natal, que requiere fecha, hora y ciudad de nacimiento. La calculadora gratuita de <a href="/carta-natal/">carta natal</a> lo calcula automáticamente. El signo solar que conoces de los horóscopos no te dice nada sobre tu Luna —la Luna cambia de signo cada dos días y medio.' },
      { q: '¿Qué diferencia hay entre tener el Sol en Capricornio y la Luna en Capricornio?', a: 'El Sol en Capricornio define tu identidad y voluntad consciente: cómo te presentas y hacia dónde te diriges intencionalmente. La Luna en Capricornio define tu vida emocional y tus respuestas instintivas: cómo sientes antes de pensar. Alguien con Sol en Capricornio puede tener la ambición muy visible; alguien con Luna en Capricornio puede tener una vida interior profundamente estructurada aunque su Sol esté en un signo muy distinto.' },
      { q: '¿La Luna en Capricornio es compatible con la Luna en Cáncer?', a: 'Son signos opuestos, lo que crea atracción y tensión simultáneas. Cáncer necesita fusión emocional y expresión directa del sentimiento; Capricornio necesita control y distancia. La polaridad puede ser muy complementaria o muy agotadora según el nivel de autoconocimiento de ambas personas. No hay respuesta única en astrología para la compatibilidad.' },
    ],
    ctaFinal: {
      h2: 'Tu Luna natal explicada en profundidad.',
      p: 'Dónde cae, qué aspectos forma con Saturno y el resto de planetas, y cómo dialoga con tu Sol y tu Ascendente. Todo en un estudio de 45–60 páginas, con revisión humana incluida.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'luna-en-piscis': {
    eyebrow: 'Astrología · Luna natal · Signo Piscis',
    h1: 'Luna en Piscis',
    lead: 'La posición lunar de la empatía sin límites. Una persona que siente el mundo entero como propio y necesita aprender que no puede absorberlo todo. Con una creatividad y una intuición que pocas posiciones lunares igualan.',
    heroBg: 'var(--ink)',
    readingTime: '7 min',
    blocks1: [
      { t: 'h2', id: 'que-significa', text: 'Qué significa tener la Luna en Piscis' },
      { t: 'p', html: 'La Luna en la carta natal describe tu vida emocional: cómo sientes, qué necesitas para sentirte seguro/a, cómo respondes instintivamente. No es lo que decides hacer, sino lo que ocurre antes de que decidas nada.' },
      { t: 'p', html: 'Piscis es el último signo del zodíaco —el signo donde todos los anteriores se disuelven. El signo de la compasión, la espiritualidad, lo intangible y los bordes permeables. La Luna aquí no tiene muros. Siente el estado emocional de los demás como si fuera el propio. Capta lo que hay debajo de las palabras. Se mueve por impulsos que vienen de una inteligencia no racional.' },
      { t: 'p', html: 'Las personas con Luna en Piscis tienen una vida emocional extraordinariamente rica y profunda —y también extraordinariamente porosa. El desafío central de esta posición es aprender a distinguir lo que es suyo de lo que pertenece a los demás, y construir una vida interior que no dependa de disolverse constantemente en el entorno.' },

      { t: 'h2', id: 'seguridad-conexion', text: 'Seguridad emocional a través de la conexión y el significado' },
      { t: 'p', html: 'La necesidad central de la Luna en Piscis es sentirse <em>conectada</em> —con algo más grande que uno mismo: una persona, una causa, una práctica espiritual, un proceso creativo. Cuando esa conexión existe, hay una paz profunda y una capacidad de florecer que resulta asombrosa. Cuando falta, aparece la deriva: la sensación de flotar sin ancla.' },
      { t: 'p', html: 'Esto tiene un lado luminoso enorme. La Luna en Piscis produce personas con una capacidad de empatía y compasión genuinas que son raras. No simpatía —empatía real, la que siente el dolor ajeno antes de que la persona lo nombre. En contextos creativos, esa permeabilidad se convierte en arte: absorbe influencias, las procesa a través de su propio mundo interior y las devuelve transformadas.' },
      { t: 'p', html: 'El problema surge cuando la apertura emocional no tiene ningún límite. La Luna en Piscis puede absorber el dolor del entorno como si fuera propio, agotarse emocionalmente sin saber por qué, o confundir la compasión con la responsabilidad de salvar a los demás. La necesidad de escapar que aparece en los momentos de saturación emocional —a través del sueño, el arte, el aislamiento— no es debilidad, sino un mecanismo de regeneración necesario.' },

      { t: 'h2', id: 'fortalezas', text: 'Fortalezas de la Luna en Piscis' },
      { t: 'ul', items: [
        '<strong>Empatía de calidad excepcional.</strong> Siente lo que los demás sienten, a veces antes de que lo expresen. Esta capacidad, bien gestionada, genera conexiones humanas de una profundidad poco común.',
        '<strong>Creatividad e imaginación.</strong> La Luna en Piscis vive en un mundo interior muy rico. El acceso a imágenes, metáforas, sueños y estados liminales produce una creatividad genuina que no necesita esforzarse —simplemente aparece.',
        '<strong>Compasión sin juicio.</strong> Muy pocas posiciones lunares tienen la capacidad de acompañar el dolor humano sin necesidad de resolverlo, arreglarlo o juzgarlo. La Luna en Piscis puede estar presente en el sufrimiento ajeno de una forma que pocas personas pueden ofrecer.',
        '<strong>Intuición profunda.</strong> Hay una información que la Luna en Piscis recibe que no viene por canales racionales. Esa intuición, cuando se aprende a escuchar y a distinguir del miedo o de la proyección, es notablemente fiable.',
      ] },

      { t: 'h2', id: 'sombra', text: 'Sombra de la Luna en Piscis' },
      { t: 'p', html: 'La sombra es lo que se activa cuando la Luna en Piscis está en su expresión menos integrada:' },
      { t: 'ul', items: [
        '<strong>Fusión con el entorno emocional.</strong> Sin límites claros, la Luna en Piscis puede absorber el estado emocional de las personas cercanas como si fuera propio. Esto agota y confunde: ¿qué siento yo realmente y qué estoy tomando prestado?',
        '<strong>Escape como mecanismo de defensa.</strong> Cuando el dolor emocional es demasiado intenso, la Luna en Piscis tiende a escapar —al sueño, a la fantasía, a sustancias, a distracciones que amortiguan el sentimiento en lugar de procesarlo. La evasión funciona a corto plazo y agrava a largo plazo.',
        '<strong>Idealización y decepción cíclica.</strong> Piscis tiende a ver lo más bello posible en las personas y las situaciones —hasta que la realidad irrumpe. El ciclo de idealización–decepción puede repetirse muchas veces antes de que se aprende a ver a las personas tal como son.',
        '<strong>Dificultad para actuar desde la claridad.</strong> El mundo interior es tan rico que la acción concreta puede volverse difícil. La indecisión, la postergación o la dependencia de las señales externas para actuar son manifestaciones de esta dificultad.',
      ] },
      { t: 'p', html: 'Reconocer la sombra no es para juzgarse. La Luna en Piscis integrada no pierde su sensibilidad —aprende que los límites no destruyen la conexión, sino que la hacen sostenible.' },

      { t: 'h2', id: 'casas', text: 'Luna en Piscis en las distintas casas' },
      { t: 'p', html: 'La casa donde cae la Luna modifica significativamente cómo se expresa esta energía:' },
      { t: 'ul', items: [
        '<strong>Casa 1:</strong> la permeabilidad y la sensibilidad son visibles desde el primer encuentro. Proyecta suavidad, misterio, una presencia que invita a confiar. Puede captar intuitivamente lo que el otro necesita antes de que lo diga.',
        '<strong>Casa 4:</strong> el hogar y la familia son el escenario principal de la empatía y la disolución. Puede haber una historia familiar de complejidad emocional que la Luna en Piscis absorbe profundamente. Necesita un espacio doméstico que sea refugio real.',
        '<strong>Casa 6:</strong> la salud y el trabajo cotidiano son las áreas más afectadas por la sensibilidad ambiental. El sistema nervioso registra el estrés laboral con facilidad. Las rutinas de cuidado y el trabajo de servicio a los demás pueden ser especialmente satisfactorios.',
        '<strong>Casa 7:</strong> las relaciones de pareja convocan toda la intensidad de la empatía y la idealización. Busca la fusión emocional en la pareja —y puede perder su propio centro en el proceso. Aprender a amar sin disolverse es el trabajo central.',
        '<strong>Casa 10:</strong> la vocación pública puede estar vinculada al arte, la espiritualidad, la sanación o cualquier campo donde la sensibilidad sea un recurso. El mundo profesional puede sentirse más manejable cuando tiene propósito claro.',
        '<strong>Casa 12:</strong> la posición más natural para Piscis. La vida interior es extraordinariamente rica pero también muy privada. Procesa las emociones en soledad y en profundidad. Necesita períodos regulares de retiro para regenerarse.',
      ] },

      { t: 'h2', id: 'compatibilidad', text: 'Compatibilidad y relaciones' },
      { t: 'p', html: 'La Luna en Piscis fluye bien con posiciones en signos de agua (Cáncer, Escorpio) que comparten el lenguaje emocional profundo y la capacidad de intimar sin necesidad de explicar. Con la Luna en Cáncer hay una comprensión mutua inmediata —ambas necesitan sentirse emocionalmente seguras y cuidadas. Con la Luna en Escorpio hay una intensidad que puede ser transformadora o agotadora.' },
      { t: 'p', html: 'Los signos de tierra (Tauro, Virgo, Capricornio) pueden ofrecer la estructura y el anclaje que la Luna en Piscis a veces necesita —siempre que no interpreten la apertura emocional como inestabilidad. La combinación puede ser muy complementaria.' },
      { t: 'p', html: 'La combinación más desafiante suele ser con posiciones muy Aries o Sagitario, que procesan las emociones a través de la acción y el movimiento, y pueden sentir la profundidad emocional de Piscis como excesiva o paralizante. La Luna en Virgo (signo opuesto) crea una tensión interesante: Virgo necesita precisión y claridad; Piscis necesita disolución y apertura. La atracción puede ser intensa, la fricción también.' },
    ],
    cta: {
      h3: '¿Tienes la Luna en Piscis en tu carta?',
      body: 'La carta natal interpretada explica tu Luna en el contexto completo de tu mapa: qué casa ocupa, qué aspectos forma con Neptuno —su regente— y cómo dialoga con tu Sol y tu Ascendente.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'personas-famosas', text: 'Personas famosas con Luna en Piscis' },
      { t: 'p', html: 'Varias figuras públicas documentadas tienen la Luna en Piscis en su carta natal. El denominador común que resulta visible aunque no se conozca su astrología: una sensibilidad y una profundidad expresiva que traspasan el medio que utilizan, combinadas con una cierta vulnerabilidad que paradójicamente las hace más cercanas.' },
      { t: 'p', html: 'Marilyn Monroe (Luna en Piscis) encarna con precisión la paradoja de esta posición: una vulnerabilidad real y una capacidad de conectar con la audiencia de forma casi telepática, combinadas con una dificultad profunda para construir límites y una tendencia a la idealización. Kurt Cobain (Luna en Piscis) expresó en su música una sensibilidad y un dolor que resonaron con millones de personas que sentían exactamente lo mismo pero no lo podían nombrar. Michael Jackson (Luna en Piscis) tenía esa misma capacidad de atravesar al oyente sin filtro —y esa misma dificultad para encontrar protección ante un mundo que se sentía demasiado abrumador. Martin Luther King (Luna en Piscis) canalizó la empatía compasiva de esta posición hacia el dolor colectivo de toda una comunidad, convirtiéndola en visión y acción.' },
      { t: 'p', html: 'En general, las personas con Luna en Piscis destacan en campos que requieren acceso al mundo emocional e intuitivo: arte, música, escritura, trabajo terapéutico, cualquier forma de acompañamiento humano. Lo que las une no es el éxito sino una forma de estar presente que hace que los demás se sientan comprendidos.' },

      { t: 'h2', id: 'infancia-patrones', text: 'Luna en Piscis y los patrones emocionales de la infancia' },
      { t: 'p', html: 'La Luna también describe la figura que nos maternó y cómo esa experiencia configuró nuestros patrones emocionales adultos. En el caso de la Luna en Piscis, la figura materna suele aparecer en la carta como alguien emocionalmente cambiante, idealizada o difícil de alcanzar —o ausente de una forma que dejó al nativo/a aprendiendo a cuidarse emocionalmente solo antes de tiempo.' },
      { t: 'p', html: 'Se describe a veces la Luna en Piscis como <em>la luna del huérfano</em>: no necesariamente un huérfano literal, sino alguien que aprendió a criarse emocionalmente solo porque el adulto de referencia no siempre estuvo disponible de la forma que el niño o la niña necesitaba —ya sea por ausencia física, por sus propios mundos internos o por una carga emocional que no podía contener la del hijo. El resultado es una independencia emocional muy desarrollada por un lado —y una necesidad profunda de ser cuidado/a por otro, que a veces no se sabe cómo expresar.' },
      { t: 'p', html: 'Esto da lugar a un patrón relacional muy específico: la expectativa de que quien te quiere debería saber lo que necesitas sin que tengas que pedirlo —porque así funciona el amor incondicional, y porque el niño o niña que fue la Luna en Piscis esperaba que la figura materna lo supiera. Reconocer este patrón en la vida adulta es uno de los trabajos más liberadores de esta posición: nadie tiene una bola de cristal, y pedir explícitamente lo que se necesita no rompe la magia del amor —la sostiene y la hace real.' },

      { t: 'h2', id: 'mujer-hombre', text: 'Luna en Piscis en mujer y en hombre' },
      { t: 'p', html: 'La Luna en Piscis no funciona de forma estructuralmente diferente según el género —la posición lunar describe la vida emocional y los patrones de seguridad de cualquier persona. Sin embargo, el contexto social en el que se vive sí modifica cómo se experimenta y cómo se expresa.' },
      { t: 'p', html: 'Las mujeres con Luna en Piscis suelen encontrar que la sensibilidad y la empatía de esta posición son socialmente bien vistas —y por eso a veces las ejercen en exceso, dando más de lo que tienen y perdiendo su propio centro en el proceso. La dificultad para poner límites puede intensificarse cuando hay una presión cultural adicional hacia el cuidado y la disponibilidad emocional permanente. El riesgo específico: que la compasión se convierta en abnegación, y la empatía en sacrificio.' },
      { t: 'p', html: 'Los hombres con Luna en Piscis suelen enfrentar el desafío opuesto: una sensibilidad profunda que el entorno no siempre reconoce o valida, y que puede haberse aprendido a suprimir o a canalizar indirectamente —a través del arte, el alcohol, el retiro, o el humor que actúa como escudo. El trabajo de integración implica reconocer y legitimar la vida emocional propia, sin necesidad de disculparse por sentir con esa intensidad.' },

      { t: 'h2', id: 'natal-vs-transito', text: 'Luna en Piscis natal vs. tránsito de la Luna por Piscis' },
      { t: 'p', html: 'Es importante distinguir dos cosas que se confunden con frecuencia. La <strong>Luna en Piscis natal</strong> es una posición fija que tienes de por vida: es el signo donde estaba la Luna en el momento de tu nacimiento. Define tu vida emocional de forma estructural y permanente.' },
      { t: 'p', html: 'El <strong>tránsito de la Luna por Piscis</strong> ocurre cada 27-28 días, durante aproximadamente dos días y medio: es cuando la Luna en el cielo actual pasa por Piscis, afectando a todos temporalmente. En esos días la energía general favorece la creatividad, la intuición, el descanso profundo y el contacto con el mundo interior. No es el momento más productivo para tareas que requieren precisión o decisiones muy concretas.' },
      { t: 'p', html: 'Si tienes la Luna natal en Piscis, esos tránsitos son especialmente intensos para ti: la energía del momento resuena con tu propia estructura emocional. Pueden ser días de inspiración muy alta o de necesidad de retiro todavía más marcada que lo habitual.' },

      { t: 'h2', id: 'neptuno-luna', text: 'El papel de Neptuno: cómo el regente de Piscis moldea la Luna' },
      { t: 'p', html: 'Para entender la Luna en Piscis en una carta específica, no basta con saber que la Luna está en Piscis. Hay que mirar también a <strong>Neptuno</strong> —el regente moderno de Piscis— y ver en qué signo, en qué casa y con qué aspectos aparece. Neptuno dice mucho sobre cómo se manifiesta esa Luna en la vida real.' },
      { t: 'p', html: 'Un Neptuno en Capricornio (generación de los 80-90) añade una capacidad de canalizar la sensibilidad hacia formas estructuradas. Un Neptuno en Escorpio añade profundidad psicológica y una orientación hacia las transformaciones profundas. Un Neptuno que forma una cuadratura con la Luna puede intensificar la tendencia a la confusión entre lo propio y lo ajeno; un Neptuno en trígono con la Luna facilita que la sensibilidad se experimente como recurso en lugar de como carga.' },
      { t: 'p', html: 'También vale la pena mirar a Júpiter —el regente tradicional de Piscis— ya que añade una capa de expansión y búsqueda de significado que modifica la expresión de la Luna.' },

      { t: 'h2', id: 'integracion', text: 'Cómo integrar la Luna en Piscis: el trabajo emocional' },
      { t: 'p', html: 'Integrar la Luna en Piscis no significa eliminar la sensibilidad ni construir muros. Significa aprender a estar presente en la profundidad emocional sin perderse en ella —a conectar con el campo emocional colectivo sin disolverse en él.' },
      { t: 'ul', items: [
        '<strong>Desarrollar la discriminación emocional.</strong> Preguntarse regularmente: ¿esto que siento viene de mí o lo estoy captando del entorno? La práctica sostenida de esta pregunta, sin juicio, construye una conciencia de los propios límites que la Luna en Piscis necesita desarrollar activamente.',
        '<strong>Hacer del retiro una práctica regular, no una huida.</strong> La Luna en Piscis necesita tiempo de solitud y recarga. Cuando ese tiempo se programa como una práctica consciente (meditación, diario, naturaleza, silencio), deja de ser una retirada reactiva ante el exceso y se convierte en una herramienta de autorregulación.',
        '<strong>Canalizar la sensibilidad hacia la creatividad.</strong> El arte, la música, la escritura, la danza —cualquier forma de expresión creativa— funciona como un canal para procesar la intensidad emocional sin tener que explicarla racionalmente.',
        '<strong>Practicar límites como acto de cuidado.</strong> La Luna en Piscis a menudo teme que los límites rompan la conexión. Lo contrario es más cierto: los límites claros permiten que la conexión sea sostenible a largo plazo. Decir que no a tiempo protege tanto a quien lo dice como a quien lo recibe.',
      ] },
      { t: 'p', html: 'Piscis integrado no abandona su naturaleza —la eleva. El mar no pierde su profundidad porque tenga orillas. La Luna en Piscis que ha aprendido a discernir sus límites mantiene toda su empatía y toda su capacidad de conexión, pero ya no se ahoga en el proceso.' },
    ],
    faq: [
      { q: '¿La Luna en Piscis es demasiado sensible para el mundo real?', a: 'No. La sensibilidad de la Luna en Piscis es un recurso, no un defecto. Lo que puede resultar desafiante es la falta de límites que a veces acompaña a esa sensibilidad —no la sensibilidad en sí. Con el trabajo adecuado, la Luna en Piscis aprende a usar su empatía sin que le cueste el propio equilibrio.' },
      { q: '¿Las personas con Luna en Piscis tienen una intuición especial?', a: 'La Luna en Piscis tiene una intuición extraordinariamente desarrollada —la capacidad de captar información emocional y ambiental que los demás no registran conscientemente. Esa información que reciben antes de que nadie la verbalice suele ser fiable cuando han aprendido a distinguirla del miedo o de la proyección propia.' },
      { q: '¿Cómo sé si tengo la Luna en Piscis?', a: 'Necesitas tu carta natal, que requiere fecha, hora y ciudad de nacimiento. La calculadora gratuita de <a href="/carta-natal/">carta natal</a> lo calcula automáticamente. El signo solar que conoces de los horóscopos no te dice nada sobre tu Luna —la Luna cambia de signo cada dos días y medio.' },
      { q: '¿La Luna en Piscis es compatible con signos de fuego?', a: 'La combinación Luna en Piscis con posiciones de fuego (Aries, Leo, Sagitario) puede ser muy complementaria —el fuego aporta la dirección y la energía que Piscis a veces necesita; Piscis aporta la profundidad emocional que el fuego puede ignorar. No es una combinación imposible, pero requiere traducción y comprensión mutua.' },
      { q: '¿Qué diferencia hay entre tener el Sol en Piscis y la Luna en Piscis?', a: 'El Sol en Piscis define tu identidad y voluntad consciente —cómo te presentas y hacia dónde te diriges intencionalmente. La Luna en Piscis define tu vida emocional y tus respuestas instintivas: cómo sientes antes de pensar. Alguien con Sol en Piscis puede tener la espiritualidad y la compasión muy visibles; alguien con Luna en Piscis puede tener una vida interior profundamente pisciana aunque su Sol esté en un signo muy distinto como Capricornio o Aries.' },
    ],
    ctaFinal: {
      h2: 'Tu Luna natal explicada en profundidad.',
      p: 'Dónde cae, qué aspectos forma con Neptuno y el resto de planetas, y cómo dialoga con tu Sol y tu Ascendente. Todo en un estudio de 45–60 páginas, con revisión humana incluida.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'luna-en-sagitario': {
    eyebrow: 'Astrología · Luna natal · Signo Sagitario',
    h1: 'Luna en Sagitario',
    lead: 'La posición lunar del optimismo como mecanismo emocional. Una persona que necesita espacio, aventura y significado para sentirse viva —y que usa el humor y el movimiento para mantener a raya lo que duele.',
    heroBg: 'var(--ink)',
    readingTime: '7 min',
    blocks1: [
      { t: 'h2', id: 'que-significa', text: 'Qué significa tener la Luna en Sagitario' },
      { t: 'p', html: 'La Luna en la carta natal describe tu vida emocional: cómo sientes, qué necesitas para sentirte seguro/a, cómo respondes instintivamente. No es lo que decides hacer, sino lo que ocurre antes de que decidas nada.' },
      { t: 'p', html: 'Sagitario es el signo del arquero que apunta lejos: la expansión, la búsqueda de significado, la filosofía, la verdad y el horizonte siempre más allá. La Luna aquí no encuentra su seguridad en la profundidad ni en la permanencia —la encuentra en el movimiento, en el crecimiento, en la certeza de que siempre hay más por descubrir.' },
      { t: 'p', html: 'Las personas con Luna en Sagitario tienen una vida emocional caracterizada por el optimismo genuino, la generosidad de espíritu y una necesidad de libertad que no es capricho sino requisito estructural. El desafío central de esta posición es aprender que la profundidad emocional no es el enemigo de la libertad —que se puede sentir plenamente sin salir corriendo.' },

      { t: 'h2', id: 'seguridad-libertad', text: 'Seguridad emocional a través de la libertad y el significado' },
      { t: 'p', html: 'La necesidad central de la Luna en Sagitario es sentirse <em>libre y en expansión</em>. Cuando la vida ofrece espacio para crecer, aprender, viajar (físicamente o intelectualmente) y explorar nuevas perspectivas, hay una energía y un entusiasmo que resultan contagiosos. Cuando la vida se vuelve demasiado rutinaria, demasiado encerrada o demasiado emocionalmente densa, aparece la urgencia de salir.' },
      { t: 'p', html: 'Esto tiene un lado luminoso muy real. La Luna en Sagitario produce personas con una capacidad de recuperarse del dolor que pocas posiciones lunares igualan. El optimismo no es ingenuidad —es una orientación genuina hacia el siguiente capítulo. Incluso en las situaciones más difíciles, la Luna en Sagitario tiende a encontrar el aprendizaje, la perspectiva o el humor que hace el momento más manejable.' },
      { t: 'p', html: 'El problema surge cuando el movimiento se convierte en el mecanismo para no sentir. La Luna en Sagitario puede volverse adicta a los nuevos comienzos —a las nuevas relaciones, los nuevos proyectos, los nuevos horizontes— precisamente porque los comienzos siempre son ligeros. Lo que requiere quedarse y profundizar activa la incomodidad que el movimiento mantenía a raya.' },

      { t: 'h2', id: 'fortalezas', text: 'Fortalezas de la Luna en Sagitario' },
      { t: 'ul', items: [
        '<strong>Optimismo genuino y resiliente.</strong> La Luna en Sagitario tiene una capacidad de reencuadrar el dolor desde una perspectiva más amplia que pocas posiciones lunares igualan. No es negación —es la capacidad real de ver más allá del momento difícil.',
        '<strong>Generosidad emocional.</strong> Cuando está en su mejor expresión, la Luna en Sagitario ofrece aliento, perspectiva y entusiasmo sin tacañería. Tiene mucho que dar emocionalmente y lo da con naturalidad.',
        '<strong>Humor como recurso.</strong> La capacidad de encontrar lo cómico en la situación —incluidas las propias dificultades— es una forma real de resiliencia. La Luna en Sagitario suele tener un humor muy desarrollado que funciona como válvula de escape y como herramienta de conexión.',
        '<strong>Apertura mental y cultural.</strong> La curiosidad genuina hacia otras formas de ver el mundo —otras culturas, otras filosofías, otras perspectivas— produce una riqueza interior que se traduce en conversaciones estimulantes y relaciones que nunca se estancan.',
      ] },

      { t: 'h2', id: 'sombra', text: 'Sombra de la Luna en Sagitario' },
      { t: 'p', html: 'La sombra es lo que se activa cuando la Luna en Sagitario está en su expresión menos integrada:' },
      { t: 'ul', items: [
        '<strong>Huida emocional disfrazada de libertad.</strong> No toda salida es exploración. A veces la Luna en Sagitario se mueve precisamente para no quedarse con lo incómodo. La libertad como valor es genuina; la libertad como mecanismo de evasión, menos.',
        '<strong>Dificultad con el compromiso emocional sostenido.</strong> La profundidad de un vínculo requiere tiempo, repetición y permanencia —cosas que Sagitario trata con ambivalencia. La Luna en Sagitario puede sentir la intensidad de un vínculo profundo como una amenaza a su espacio.',
        '<strong>Hipérbole y promesas no cumplidas.</strong> Sagitario dice lo que siente con entusiasmo —y a veces promete más de lo que luego puede sostener. No es mala fe: es que en el momento lo sentía así. Pero el efecto sobre los demás puede ser el de una decepción repetida.',
        '<strong>Impaciencia con el dolor ajeno.</strong> La tendencia a ofrecer perspectiva y soluciones cuando lo que el otro necesita es ser escuchado en su dolor. El "ya verás como esto tiene su razón de ser" puede ser un intento genuino de ayudar que no ayuda en absoluto.',
      ] },
      { t: 'p', html: 'Reconocer la sombra no es para juzgarse. La Luna en Sagitario integrada no pierde su optimismo ni su amor por la libertad —aprende que la profundidad emocional y la expansión no son incompatibles.' },

      { t: 'h2', id: 'casas', text: 'Luna en Sagitario en las distintas casas' },
      { t: 'p', html: 'La casa donde cae la Luna modifica significativamente cómo se expresa esta energía:' },
      { t: 'ul', items: [
        '<strong>Casa 1:</strong> el entusiasmo y la expansión son visibles desde el primer encuentro. Proyecta energía, optimismo y una apertura que invita a la conversación. Puede resultar más expansiva o más dinámica de lo que se siente por dentro.',
        '<strong>Casa 4:</strong> el hogar y la familia pueden ser el escenario de la búsqueda de libertad o de su restricción. La vida doméstica necesita espacio y apertura para sentirse bien —un hogar muy encerrado o una familia muy restrictiva activa el deseo de salir.',
        '<strong>Casa 6:</strong> la salud y el trabajo cotidiano se benefician del optimismo natural. Funciona bien cuando el trabajo tiene variedad y propósito. La rutina sin significado agota a esta Luna más que a otras posiciones.',
        '<strong>Casa 7:</strong> las relaciones de pareja convocan toda la tensión entre la necesidad de libertad y el deseo de compañía. Busca una pareja que sea también una aventura intelectual y que no requiera demasiada intensidad emocional permanente.',
        '<strong>Casa 9:</strong> su territorio natural. La filosofía, la espiritualidad, los viajes, la educación superior son el campo donde la emoción se siente más en casa. El aprendizaje como forma de vida nutre el estado emocional de forma directa.',
        '<strong>Casa 12:</strong> el mundo interior es amplio pero poco explorado conscientemente. La vida emocional opera a través de sueños e intuiciones que rara vez se verbalizan. Los viajes o la meditación pueden abrir puertas que el pensamiento solo no alcanza.',
      ] },

      { t: 'h2', id: 'compatibilidad', text: 'Compatibilidad y relaciones' },
      { t: 'p', html: 'La Luna en Sagitario fluye bien con posiciones en signos de fuego (Aries, Leo) que comparten la orientación hacia la acción, el entusiasmo y la necesidad de que la vida avance. Con la Luna en Aries hay una energía inmediata y directa que funciona bien. Con la Luna en Leo hay un calor y una generosidad mutua que puede ser muy satisfactoria.' },
      { t: 'p', html: 'Los signos de aire (Géminis, Libra, Acuario) también pueden complementarse bien con Sagitario: comparten la necesidad de espacio mental y la orientación hacia lo nuevo. Con Géminis (signo opuesto) hay una atracción natural —ambos necesitan estimulación mental, movimiento y variedad, aunque Géminis prefiere lo cercano y Sagitario lo lejano.' },
      { t: 'p', html: 'La combinación más desafiante suele ser con posiciones muy Escorpio o Cáncer, que necesitan profundidad emocional sostenida y permanencia —precisamente lo que Sagitario trata con más ambivalencia. No imposible, pero requiere una traducción mutua importante.' },
    ],
    cta: {
      h3: '¿Tienes la Luna en Sagitario en tu carta?',
      body: 'La carta natal interpretada explica tu Luna en el contexto completo de tu mapa: qué casa ocupa, qué aspectos forma con Júpiter —su regente— y cómo dialoga con tu Sol y tu Ascendente.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'personas-famosas', text: 'Personas famosas con Luna en Sagitario' },
      { t: 'p', html: 'Varias figuras públicas documentadas tienen la Luna en Sagitario. El denominador común que resulta visible aunque no se conozca su astrología: una energía expansiva, una capacidad de proyectar entusiasmo y una presencia que evoca posibilidad y apertura.' },
      { t: 'p', html: 'Brad Pitt (Luna en Sagitario) ilustra la combinación característica de esta posición: un magnetismo que transmite apertura y aventura, combinado con una dificultad documentada para mantener el compromiso emocional a largo plazo. Jimi Hendrix (Luna en Sagitario) llevó la búsqueda de nuevos horizontes —musicales, espirituales, experienciales— hasta sus límites más extremos. En ambos es reconocible la orientación hacia la expansión y la dificultad con la permanencia.' },
      { t: 'p', html: 'En general, las personas con Luna en Sagitario tienden a destacar en campos que requieren visión, adaptabilidad y capacidad de transmitir entusiasmo: docencia, periodismo, filosofía, entretenimiento, emprendimiento, deportes de resistencia. Lo que comparten es una relación con el futuro que se orienta más hacia la posibilidad que hacia el riesgo.' },

      { t: 'h2', id: 'infancia-madre', text: 'La figura materna y los patrones de la infancia' },
      { t: 'p', html: 'La Luna también describe la figura que nos maternó y cómo esa experiencia configuró nuestros patrones emocionales adultos. En el caso de la Luna en Sagitario, la figura materna suele aparecer en la carta como alguien optimista, filosófica, confiada en el futuro —o como alguien con sus propias convicciones muy claras, su propia fe o su propia visión del mundo, que organizaban la vida familiar desde una perspectiva expansiva pero a veces poco disponible en lo emocionalmente cercano.' },
      { t: 'p', html: 'La astróloga Beatriz Leveratto lo describe así: <em>"probablemente naciste de una madre muy confiada, muy religiosa o que tenía sus propias convicciones. Para sentirte seguro en la edad adulta, necesitas siempre saber adónde vas, tener respuestas"</em>. La seguridad emocional de la Luna en Sagitario se construyó sobre la certeza —la sensación de tener un mapa, una dirección, un propósito al que apuntar. Cuando eso falta, aparece la incomodidad.' },
      { t: 'p', html: 'Esto explica por qué la Luna en Sagitario tiende a responder a la incertidumbre emocional con movimiento: no solo es preferencia por la aventura, sino un patrón aprendido en la infancia de que la seguridad viene de saber adónde se va. El trabajo de integración pasa por aprender que no siempre hay respuesta disponible —y que la presencia en la pregunta, sin salir corriendo, es también una forma válida de habitar la emoción.' },

      { t: 'h2', id: 'mujer-hombre', text: 'Luna en Sagitario en mujer y en hombre' },
      { t: 'p', html: 'La Luna en Sagitario no funciona de forma estructuralmente diferente según el género —la posición lunar describe la vida emocional y los patrones de seguridad de cualquier persona. Sin embargo, el contexto social sí modifica cómo se experimenta y cómo se expresa esta energía.' },
      { t: 'p', html: 'Las mujeres con Luna en Sagitario suelen experimentar la tensión entre la necesidad de libertad e independencia de esta posición y las expectativas relacionales de disponibilidad, permanencia y cuidado emocional. El mensaje cultural "deberías querer quedarte y profundizar" puede chocar directamente con una estructura emocional que necesita espacio para sentirse bien. Reivindicar esa necesidad, sin culpa, es uno de los trabajos centrales de esta posición.' },
      { t: 'p', html: 'Los hombres con Luna en Sagitario suelen encontrar que la orientación aventurera y la dificultad con la profundidad emocional sostenida están culturalmente más validadas —lo que puede hacer más difícil reconocer cuándo el movimiento es expansión genuina y cuándo es una huida de algo que se necesita sentir. El desafío específico: distinguir entre la exploración que abre y la evasión que cierra.' },

      { t: 'h2', id: 'natal-vs-transito', text: 'Luna en Sagitario natal vs. tránsito de la Luna por Sagitario' },
      { t: 'p', html: 'Es importante distinguir dos cosas que se confunden con frecuencia. La <strong>Luna en Sagitario natal</strong> es una posición fija que tienes de por vida: es el signo donde estaba la Luna en el momento de tu nacimiento. Define tu vida emocional de forma estructural y permanente.' },
      { t: 'p', html: 'El <strong>tránsito de la Luna por Sagitario</strong> ocurre cada 27-28 días, durante aproximadamente dos días y medio: es cuando la Luna en el cielo actual pasa por Sagitario, afectando a todos temporalmente. En esos días la energía general favorece la expansión, el aprendizaje, las conversaciones estimulantes y la perspectiva. Son buenos momentos para tomar decisiones que requieren ver el panorama completo más que los detalles.' },
      { t: 'p', html: 'Si tienes la Luna natal en Sagitario, esos tránsitos son especialmente energizantes para ti: la energía del momento resuena con tu propia estructura emocional. Pueden ser días de entusiasmo muy alto o de impaciencia con lo que se siente demasiado lento o cerrado.' },

      { t: 'h2', id: 'jupiter-luna', text: 'El papel de Júpiter: cómo el regente de Sagitario moldea la Luna' },
      { t: 'p', html: 'Para entender la Luna en Sagitario en una carta específica, no basta con saber que la Luna está en Sagitario. Hay que mirar también a <strong>Júpiter</strong> —el regente de Sagitario— y ver en qué signo, en qué casa y con qué aspectos aparece. Júpiter dice mucho sobre cómo se manifiesta esa Luna en la vida real.' },
      { t: 'p', html: 'Un Júpiter en Libra modifica la Luna en Sagitario hacia una expresión más diplomática y orientada a las relaciones. Un Júpiter en Escorpio añade profundidad psicológica y una orientación hacia las transformaciones. Un Júpiter que forma una cuadratura con la Luna puede intensificar la tendencia a la hipérbole y a la promesa excesiva; un Júpiter en trígono con la Luna facilita que el optimismo se viva como recurso genuino en lugar de mecanismo de defensa.' },

      { t: 'h2', id: 'integracion', text: 'Cómo integrar la Luna en Sagitario: el trabajo emocional' },
      { t: 'p', html: 'Integrar la Luna en Sagitario no significa renunciar a la libertad ni quedarse quieto. Significa aprender que la profundidad emocional es otra forma de expansión —que explorar el mundo interior es tan aventurero como explorar el mundo exterior.' },
      { t: 'ul', items: [
        '<strong>Distinguir la necesidad de libertad del miedo a la profundidad.</strong> No toda urgencia de salir es amor por la aventura. Preguntarse antes de partir: ¿qué estoy buscando afuera que podría encontrar adentro? La respuesta honesta a esa pregunta cambia muchas cosas.',
        '<strong>Aprender el lenguaje de la presencia emocional.</strong> Sagitario tiende a ofrecer perspectiva cuando el otro necesita ser escuchado. Practicar la presencia sin solución —estar en el dolor ajeno sin apresurar el reencuadre— es uno de los trabajos más significativos de esta posición.',
        '<strong>Dar valor a los comienzos lentos.</strong> Lo que no arranca con entusiasmo inmediato puede ser lo más significativo. La Luna en Sagitario aprende con el tiempo que la profundidad requiere paciencia y que la constancia no es falta de movimiento.',
        '<strong>Cultivar una filosofía de la permanencia.</strong> Sagitario busca el significado en la expansión. Hay un trabajo en encontrar también el significado en lo que permanece —en la relación que dura, en el proyecto que se construye despacio, en el hogar que se convierte en refugio real.',
      ] },
      { t: 'p', html: 'Sagitario integrado no abandona su naturaleza —la profundiza. El arquero que ha aprendido a apuntar con precisión no deja de disparar hacia el horizonte. La Luna en Sagitario que ha integrado la profundidad mantiene todo su optimismo y toda su capacidad de expansión, pero ya no huye de lo que la vida le pide que sienta.' },
    ],
    faq: [
      { q: '¿La Luna en Sagitario tiene miedo al compromiso?', a: 'No exactamente. Lo que la Luna en Sagitario teme no es el compromiso en sí sino la pérdida de libertad y espacio que puede acompañarlo. Cuando una relación o un proyecto ofrece crecimiento y expansión genuinos, el compromiso no se siente como una amenaza —se siente como otra forma de aventura.' },
      { q: '¿Las personas con Luna en Sagitario son superficiales emocionalmente?', a: 'No. La tendencia de esta posición a procesar las emociones a través del movimiento, el humor o la perspectiva puede parecer superficialidad desde fuera. Pero la vida emocional de la Luna en Sagitario es genuina —simplemente tiene un estilo propio de procesamiento que no se parece al de las posiciones de agua.' },
      { q: '¿Cómo sé si tengo la Luna en Sagitario?', a: 'Necesitas tu carta natal, que requiere fecha, hora y ciudad de nacimiento. La calculadora gratuita de <a href="/carta-natal/">carta natal</a> lo calcula automáticamente. El signo solar que conoces de los horóscopos no te dice nada sobre tu Luna —la Luna cambia de signo cada dos días y medio.' },
      { q: '¿La Luna en Sagitario es compatible con la Luna en Géminis?', a: 'Son signos opuestos, lo que crea atracción y tensión simultáneas. Ambos necesitan estimulación mental, variedad y espacio. La diferencia está en la escala: Géminis busca lo local, lo inmediato, lo múltiple; Sagitario busca lo lejano, lo filosófico, lo universal. La atracción puede ser intensa y la comprensión mutua sorprendentemente alta —son el mismo impulso en escala diferente.' },
      { q: '¿Qué diferencia hay entre tener el Sol en Sagitario y la Luna en Sagitario?', a: 'El Sol en Sagitario define tu identidad y voluntad consciente —la expansión, la aventura y la búsqueda de significado son visibles en cómo te presentas al mundo. La Luna en Sagitario define tu vida emocional y tus respuestas instintivas: cómo sientes antes de pensar. Alguien con Luna en Sagitario puede tener esa orientación expansiva muy activa en su vida interior aunque su Sol esté en un signo completamente diferente.' },
    ],
    ctaFinal: {
      h2: 'Tu Luna natal explicada en profundidad.',
      p: 'Dónde cae, qué aspectos forma con Júpiter y el resto de planetas, y cómo dialoga con tu Sol y tu Ascendente. Todo en un estudio de 45–60 páginas, con revisión humana incluida.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'luna-nueva-julio-2026': {
    eyebrow: 'Luna nueva · Julio 2026 · Cáncer',
    h1: 'Luna nueva de julio 2026 en Cáncer: semilla emocional en el domicilio de la Luna',
    lead: 'El 14 de julio de 2026, la Luna nueva ocurre en Cáncer a las 12:45h hora España. Es la luna nueva más poderosa del año para las intenciones emocionales: ocurre en el único signo regido por la propia Luna, su casa natural. Lo que siembres aquí tiene raíces.',
    heroBg: 'var(--ink)',
    readingTime: '8 min',
    blocks1: [
      { t: 'h2', id: 'datos', text: 'Datos astronómicos de la luna nueva de julio 2026' },
      { t: 'table', heads: ['Dato', 'Valor'], rows: [
        ['Fecha', '14 de julio de 2026 (martes)'],
        ['Hora exacta', '12:45 h hora España peninsular (CEST, UTC+2)'],
        ['Luna en', 'Cáncer (22°)'],
        ['Sol en', 'Cáncer (22°)'],
        ['Regente del signo', 'La Luna (está en su propio domicilio)'],
        ['Luna llena del mismo ciclo', 'Enero 2027 en Capricornio'],
      ] },
      { t: 'p', html: 'La luna nueva siempre ocurre cuando la Luna está exactamente en el mismo signo que el Sol —conjunción perfecta. El 14 de julio, ambos astros coinciden a 22° Cáncer. La hora es para la España peninsular (CEST, UTC+2); en México (CDMX) serían las 05:45 AM; en Argentina las 07:45 AM. La efeméride está calculada con Swiss Ephemeris.' },

      { t: 'h2', id: 'domicilio', text: 'Por qué esta luna nueva es especialmente potente' },
      { t: 'p', html: 'En astrología, cada signo tiene un <strong>regente</strong>: el planeta que lo rige y con cuya energía está alineado de forma natural. Cáncer es el único signo del zodíaco cuyo regente es la propia Luna. Cuando la luna nueva ocurre en Cáncer, la Luna está literalmente <em>en su propia casa</em>.' },
      { t: 'p', html: 'Lo que esto significa en términos astrológicos: la energía lunar no está modificada ni filtrada por otro planeta. Es Luna pura —sin la racionalización de Géminis, sin la estructura de Capricornio, sin la intensidad de Escorpio. Lo que emerge en esta luna nueva es lo más genuinamente emocional, instintivo y nutrido que existe en el ciclo anual.' },
      { t: 'p', html: 'Si hay un momento del año para sembrar intenciones relacionadas con el hogar, la familia, el cuidado, la seguridad emocional y el arraigo, es este. La luna nueva en Cáncer no garantiza resultados —ninguna posición astronómica lo hace— pero sí ofrece el terreno simbólico más fértil para ese tipo de semillas.' },

      { t: 'h2', id: 'temas', text: 'Qué temas activa la luna nueva en Cáncer' },
      { t: 'p', html: 'Cáncer es el signo del hogar, la familia, las raíces y la seguridad emocional. En luna nueva, estos temas abren un ciclo nuevo de seis meses:' },
      { t: 'ul', items: [
        '<strong>Hogar y familia:</strong> lo que quieres cambiar, mejorar o profundizar en tu vida doméstica y en los vínculos familiares. Mudanzas, reordenar el espacio, sanar dinámicas que llevan tiempo enquistadas.',
        '<strong>Seguridad emocional:</strong> qué necesitas para sentirte a salvo emocionalmente. No en abstracto —qué condiciones concretas, qué relaciones, qué entorno. Es momento de hacer esa pregunta honestamente.',
        '<strong>El cuidado mutuo:</strong> cómo das cuidado y cómo recibes cuidado. La luna nueva en Cáncer pregunta si hay equilibrio real en eso —si estás sobrenutriendo a otros mientras descuidas tu propio depósito.',
        '<strong>La intuición y el mundo interior:</strong> Cáncer no funciona con lógica lineal. Esta luna nueva activa la inteligencia emocional e intuitiva. Las decisiones que salen de la tripa, no de la cabeza.',
        '<strong>Las raíces y el pasado:</strong> de dónde vienes, qué herencia emocional cargas, qué patrones familiares se repiten. No para quedarse en el pasado —sino para entender qué raíz hay que nutrir y qué raíz hay que soltar.',
        '<strong>Lo que alimentas:</strong> Cáncer es el signo que nutre. Esta luna nueva pregunta qué estás alimentando en tu vida con tu energía, tu tiempo y tu atención. Y si eso que alimentas te nutre de vuelta.',
      ] },

      { t: 'h2', id: 'ascendente', text: 'Cómo afecta según tu Ascendente' },
      { t: 'p', html: 'El impacto real depende de en qué casa de tu carta natal cae Cáncer. Para saberlo necesitas el <a href="/ascendente/" style="color:var(--accent)">Ascendente</a> (requiere hora de nacimiento exacta). Lectura rápida por Ascendente:' },
      { t: 'ul', items: [
        '<strong>Asc. Aries:</strong> luna nueva en Casa 4 —el corazón de la carta. Hogar, familia, raíces, herencia emocional. Momento de siembra especialmente potente para lo doméstico y lo íntimo.',
        '<strong>Asc. Tauro:</strong> luna nueva en Casa 3 —comunicación, entorno próximo, hermanos. Algo nuevo quiere empezar en cómo te expresas, en la relación con personas cercanas o en el aprendizaje cotidiano.',
        '<strong>Asc. Géminis:</strong> luna nueva en Casa 2 —recursos propios, autoestima, valores materiales. Ciclo nuevo en la relación con el dinero, lo que valoras y lo que sientes que mereces.',
        '<strong>Asc. Cáncer:</strong> luna nueva en Casa 1 —identidad, el yo, el cuerpo. Impacto máximo. Esta luna nueva marca el inicio de un nuevo ciclo personal. Redefinición de quién eres y de cómo te presentas al mundo.',
        '<strong>Asc. Leo:</strong> luna nueva en Casa 12 —el inconsciente, el retiro, lo que opera en la sombra. Ciclo de trabajo interior, de procesamiento emocional silencioso. Lo que se siembra aquí tarda más en hacerse visible, pero tiene raíces profundas.',
        '<strong>Asc. Virgo:</strong> luna nueva en Casa 11 —amistades, grupos, proyectos colectivos, sueños. Inicio de ciclo en los vínculos sociales o en un proyecto que trasciende lo individual.',
        '<strong>Asc. Libra:</strong> luna nueva en Casa 10 —carrera, vocación, reputación pública. Algo nuevo quiere comenzar en la vida profesional o en cómo te perciben en el ámbito público.',
        '<strong>Asc. Escorpio:</strong> luna nueva en Casa 9 —filosofía, viajes, expansión, estudios superiores. Inicio de ciclo en creencias, en la búsqueda de sentido o en un proyecto que implica expansión hacia lo desconocido.',
        '<strong>Asc. Sagitario:</strong> luna nueva en Casa 8 —transformación, recursos compartidos, lo que hay que soltar para renacer. Un ciclo de profundización o de cambio sustancial en deudas, herencias o compromisos emocionales muy íntimos.',
        '<strong>Asc. Capricornio:</strong> luna nueva en Casa 7 —relaciones, asociaciones, el otro significativo. Inicio de ciclo en un vínculo de pareja o en una sociedad profesional. Lo que se planta aquí tiene que ver con el encuentro real con otro.',
        '<strong>Asc. Acuario:</strong> luna nueva en Casa 6 —rutinas, salud, trabajo cotidiano, servicio. Ciclo nuevo en los hábitos diarios, en la relación con el cuerpo o en la forma en que contribuyes desde el día a día.',
        '<strong>Asc. Piscis:</strong> luna nueva en Casa 5 —creatividad, amor romántico, placer, hijos. Inicio de ciclo en lo que te da alegría genuina, en la expresión creativa o en los proyectos del corazón.',
      ] },

      { t: 'h2', id: 'verano-cancer', text: 'El contexto: luna nueva en pleno verano canceriano' },
      { t: 'p', html: 'La luna nueva del 14 de julio llega tres semanas después del solsticio de verano (21 junio), cuando el Sol acaba de entrar en Cáncer y la energía del año está en su punto de máxima expansión antes del giro hacia la contracción. En el ciclo solar anual, la temporada Cáncer (21 jun – 22 jul) es el momento de mayor carga emocional del año.' },
      { t: 'p', html: 'Hay algo paradójico en Cáncer que vale la pena nombrar: es el momento más luminoso del año (los días más largos) y sin embargo el signo más asociado a la intimidad, al recogimiento interior y a la vida emocional profunda. La luz larga del verano no abre hacia la extroversión —Cáncer la vuelca hacia adentro, hacia los vínculos que más importan, hacia el nido.' },
      { t: 'p', html: 'La luna nueva en Cáncer del 14 de julio ocurre justo antes de que el Sol abandone Cáncer (lo hace el 22-23 de julio, entrando en Leo). Es el último latido de la temporada canceriana: un momento de siembra emocional dentro de un ciclo solar que ya está llegando a su fin. Una última oportunidad antes de que la energía se vuelque hacia la autoexpresión leonina.' },
    ],
    cta: {
      h3: '¿En qué casa de tu carta abre esta luna nueva un ciclo?',
      body: 'El área de vida que esta luna nueva activa depende de tu Ascendente —y eso requiere hora de nacimiento. La carta natal interpretada incluye tu patrón lunar personal: dónde cae Cáncer en tu carta, qué planetas natales están cerca de los 22° y qué ciclos están en marcha este año.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'ciclo-cancer', text: 'El ciclo que abre: de julio 2026 a enero 2027' },
      { t: 'p', html: 'Las lunas nuevas no son eventos aislados —son el punto de partida de un ciclo de seis meses que culmina con la <strong>luna llena en el signo opuesto</strong>. La luna nueva en Cáncer del 14 de julio abre un ciclo que se cerrará con la luna llena en <strong>Capricornio en enero de 2027</strong>.' },
      { t: 'p', html: 'El eje Cáncer–Capricornio es uno de los más significativos del zodíaco: el polo emocional (Cáncer) frente al polo estructural (Capricornio). Lo que siembres ahora en el terreno del hogar, la familia, la seguridad emocional o el arraigo llegará a su resultado —positivo, de corrección o de culminación— en enero de 2027, cuando la luna llena en Capricornio lo saque a la luz.' },
      { t: 'p', html: 'Esta es la utilidad práctica del ciclo lunar: no tanto creer que los planetas causan los eventos, sino usar las lunas nuevas como momentos de intención consciente. Señalar en el tiempo un inicio, y revisar seis meses después cómo ha evolucionado. El ciclo Cáncer–Capricornio pregunta: ¿qué quieres construir en tu vida interior y en tu entorno más cercano? ¿Y qué estructura concreta vas a darle para que dure?' },
      { t: 'note', html: 'También vale la pena mirar hacia atrás: ¿qué pasó en la luna nueva en Cáncer de <strong>julio de 2025</strong>? ¿Qué decisión, cambio o intención emocional pusiste en marcha entonces? La luna llena en Capricornio de enero 2026 trajo el resultado de ese ciclo. Ahora se abre uno nuevo, desde un lugar diferente.' },

      { t: 'h2', id: 'preguntas', text: 'Preguntas para trabajar esta luna nueva' },
      { t: 'p', html: 'La luna nueva en Cáncer no pide rituales elaborados. Pide presencia emocional honesta. Estas preguntas son para antes del 14 de julio, o ese mismo día:' },
      { t: 'ol', items: [
        '¿Dónde me siento más seguro/a emocionalmente ahora mismo? ¿Ha cambiado eso en el último año?',
        '¿Hay algo en mi vida doméstica o familiar que necesite cambiar y que llevo tiempo evitando?',
        '¿Estoy dando más cuidado del que recibo? ¿O evito recibir cuidado porque me resulta incómodo?',
        '¿Qué me nutre de verdad —no lo que debería nutrirme, sino lo que realmente recarga mi depósito emocional?',
        '¿Qué semilla emocional quiero plantar en este ciclo que llegará a su resultado en enero de 2027?',
      ] },
    ],
    faq: [
      { q: '¿Cuándo es exactamente la luna nueva de julio 2026?', a: 'El 14 de julio de 2026 a las 12:45 h hora España peninsular (CEST, UTC+2). En México (CDMX) serían las 05:45 AM; en Argentina, las 07:45 AM; en Colombia y Perú, las 06:45 AM. La efeméride está calculada con Swiss Ephemeris.' },
      { q: '¿En qué signo está la luna nueva de julio 2026?', a: 'En Cáncer, a 22° exactos. El Sol también está en Cáncer en esa fecha, a la misma posición. La luna nueva siempre ocurre cuando Luna y Sol se encuentran en el mismo signo y grado (conjunción astronómica).' },
      { q: '¿Por qué es especialmente poderosa la luna nueva en Cáncer?', a: 'Porque Cáncer es el único signo del zodíaco regido por la Luna. Cuando la luna nueva ocurre en Cáncer, la Luna está en su propio domicilio: su energía es directa, sin la influencia modificadora de otro planeta regente. Es la luna nueva más "lunar" del año, especialmente potente para intenciones relacionadas con el hogar, la familia, la seguridad emocional y el mundo interior.' },
      { q: '¿Cómo afecta emocionalmente la luna nueva en Cáncer?', a: 'Cáncer es un signo de agua con una sensibilidad emocional alta. Las lunas nuevas en Cáncer suelen traer una mayor necesidad de recogimiento, de contacto con lo íntimo y de revisión de las relaciones más cercanas. Pueden activarse recuerdos del pasado, nostalgia o el deseo de reencuadrar el sentido de "hogar" —tanto el físico como el emocional.' },
      { q: '¿Tiene algún eclipse esta luna nueva?', a: 'No. La luna nueva de julio 2026 no incluye eclipse. En 2026, los eclipses solares —que ocurren en luna nueva— no coinciden con esta fecha. Es una luna nueva estándar en Cáncer, sin amplificaciones especiales por eclipse.' },
      { q: '¿Cuándo es la próxima luna nueva en Cáncer?', a: 'La siguiente luna nueva en Cáncer ocurrirá en julio de 2027, cuando el Sol esté de nuevo en Cáncer y la Luna forme conjunción con él. El ciclo se repite anualmente, siempre en la temporada de verano del hemisferio norte (entre el 21 de junio y el 22 de julio).' },
    ],
    ctaFinal: {
      h2: 'El ciclo lunar en tu carta natal.',
      p: 'Dónde cae Cáncer en tu carta, qué área de vida activa esta luna nueva y qué planetas natales están cerca de los 22° de Cáncer. Todo en la carta natal interpretada, con revisión humana incluida.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'hora-espejo-11-11': {
    eyebrow: 'Numerología · Horas espejo',
    h1: 'Hora espejo 11:11: qué son las horas espejo y las 24 que existen',
    lead: 'Ver el 11:11, el 22:22 o el 01:01 en el reloj no es casualidad —al menos no del todo. Las horas espejo son un fenómeno a caballo entre la psicología de la atención y la numerología simbólica. Qué son, cuántas hay, qué dice cada una y por qué el 11:11 encabeza la lista.',
    readingTime: '8 min',
    blocks1: [
      { t: 'h2', id: 'que-es-hora-espejo', text: 'Qué es una hora espejo' },
      { t: 'p', html: 'Una <strong>hora espejo</strong> —o <em>mirror hour</em> en inglés— es cualquier momento en un reloj digital de 24 horas en que los dígitos de las horas y los minutos forman un patrón simétrico. El tipo más conocido son las <strong>horas espejo dobles</strong>: cuando las dos cifras de la izquierda (horas) son idénticas a las dos de la derecha (minutos). El 11:11 es el ejemplo más famoso, pero en formato de 24 horas existen 24 combinaciones posibles, desde el 00:00 hasta el 23:23.' },
      { t: 'p', html: 'Además de las dobles, algunos sistemas incluyen las <strong>horas espejo simétricas</strong> o invertidas: momentos como el 10:01, el 12:21 o el 13:31, donde los cuatro dígitos forman un palíndromo que se lee igual al derecho que al revés. Este artículo se centra en las horas dobles —las más trabajadas en numerología— con una sección final dedicada a las simétricas.' },
      { t: 'p', html: 'El fenómeno de las horas espejo es esencialmente moderno: nace con los relojes digitales de 24 horas y se ha masificado con los smartphones. En un reloj analógico, el patrón visual no existe de la misma forma. La pantalla del móvil —siempre a mano, siempre visible— ha convertido algo matemáticamente neutro en un símbolo cultural de primera magnitud.' },

      { t: 'h2', id: 'por-que-las-notamos', text: 'Por qué notamos las horas espejo más que otros números' },
      { t: 'p', html: 'La explicación psicológica es el <strong>sesgo de frecuencia</strong> o efecto Baader-Meinhof: una vez que un estímulo tiene carga emocional, el cerebro lo filtra activamente y lo extrae del ruido de fondo. No ves el 11:11 más que antes —simplemente ahora <em>registras</em> cuando aparece. Para la explicación completa de este mecanismo —incluyendo la teoría de la sincronicidad de Jung y el Sistema de Activación Reticular— hay un artículo específico: <a href="/blog/11-11-significado-espiritual/">11:11 significado espiritual completo</a>.' },
      { t: 'p', html: 'Lo que sí ocurre es que el patrón visual de las horas espejo es genuinamente más llamativo que otros números del reloj: los dígitos idénticos activan el reconocimiento de patrones con más intensidad. No es solo sesgo de frecuencia —es que el estímulo en sí destaca. La combinación de patrón visual fuerte y carga emocional asignada hace que las horas espejo sean algunas de las señales más fácilmente memorizables del día.' },

      { t: 'h2', id: 'tabla-horas-espejo', text: 'Las 24 horas espejo dobles y su significado numerológico' },
      { t: 'p', html: 'Cada hora espejo tiene un número base que la numerología analiza. Para las horas del 00 al 09, el número relevante es el que ves. Para las del 10 en adelante, se suman los dos dígitos de la hora (11→maestro, 13/14/16/19→kármicos, el resto→reducción). Los números maestros (11, 22) y kármicos (13, 14, 16, 19) no se reducen —mantienen su vibración propia.' },
      { t: 'table', heads: ['Hora espejo', 'Número', 'Mensaje clave'], rows: [
        ['00:00', '0', 'El origen. Renovación total y potencial sin manifestar.'],
        ['01:01', '1', 'Algo nuevo está listo para empezar. Voluntad e impulso.'],
        ['02:02', '2', 'Las relaciones piden equilibrio y escucha.'],
        ['03:03', '3', 'Momento de crear, expresar y comunicar.'],
        ['04:04', '4', 'Algo necesita estructura y forma sólida.'],
        ['05:05', '5', 'Un cambio está pidiendo paso. Libera lo que frena.'],
        ['06:06', '6', 'Atención al equilibrio dar–recibir en el amor y la familia.'],
        ['07:07', '7', 'Señal de profundización interior y búsqueda de sentido.'],
        ['08:08', '8', 'Manifestación, poder y karma material en primer plano.'],
        ['09:09', '9', 'Algo llega a su fin para dejar espacio a lo nuevo.'],
        ['10:10', '1', 'Nuevo ciclo con experiencia acumulada. Inicio maduro.'],
        ['11:11', 'Maestro 11', 'Umbral de intuición y sincronicidad. El más significativo de todos.'],
        ['12:12', '3', 'Creatividad y autoexpresión en contexto relacional.'],
        ['13:13', 'Kármico 13', 'Transformación necesaria. Soltar para renacer.'],
        ['14:14', 'Kármico 14', 'Equilibra libertad y responsabilidad.'],
        ['15:15', '6', 'Creatividad al servicio del amor y la comunidad.'],
        ['16:16', 'Kármico 16', 'Derrumbe de lo artificial para que emerja lo auténtico.'],
        ['17:17', '8', 'Manifestación a través de la sabiduría y el poder interior.'],
        ['18:18', '9', 'Cierre con compasión. Soltar sin aferrarse al resultado.'],
        ['19:19', 'Kármico 19', 'Aprender a brillar con independencia. Sin necesitar validación.'],
        ['20:20', '2', 'Espejo de la jornada. Equilibrio y atención a los vínculos.'],
        ['21:21', '3', 'Creatividad que emerge de la experiencia relacional.'],
        ['22:22', 'Maestro 22', 'El gran arquitecto. Construye algo duradero con impacto colectivo.'],
        ['23:23', '5', 'Cierre del día. Adaptación y apertura al nuevo ciclo.'],
      ] },

      { t: 'h2', id: 'por-que-11-11', text: 'Por qué el 11:11 es la hora espejo más poderosa' },
      { t: 'p', html: 'De las 24 horas espejo dobles, el 11:11 ocupa una posición única por tres razones numerológicas que se refuerzan entre sí.' },
      { t: 'p', html: 'Primera: <strong>el 11 es un número maestro</strong> en la tradición pitagórica. No se reduce a 2 —tiene una energía propia de umbral, más allá de los nueve arquetipos básicos pero antes de la maestría constructiva del 22. Representa intuición elevada, visión y sensibilidad extrema. De las 24 horas espejo, solo el 11:11 y el 22:22 contienen un número maestro como base.' },
      { t: 'p', html: 'Segunda: <strong>la duplicación crea una cadena de maestros única</strong>. Sumando las dos mitades del 11:11: 11 + 11 = 22, que es también un número maestro —el del gran arquitecto. Ninguna otra hora espejo genera esta cadena: 11 → 11 → 22. El 22:22 suma 44, que se reduce a 8 (poderoso, pero no maestro). Solo el 11:11 produce un segundo número maestro al combinar sus partes.' },
      { t: 'p', html: 'Tercera: <strong>el 11:11 está exactamente en el punto central de la secuencia</strong>. Las 24 horas espejo van de 00:00 a 23:23. El 11:11 es la número 12 de la lista —el punto de inflexión entre la primera mitad y la segunda mitad del ciclo completo. Una posición de umbral que refleja con precisión la naturaleza del número maestro 11: el que está entre dos completitudes.' },
      { t: 'p', html: 'Para profundizar en el 11 como número maestro y en el significado espiritual del 11:11 —Jung, qué hacer cuando lo ves, la numerología angelical— hay dos artículos específicos: <a href="/blog/que-significa-11-11/">qué significa el 11:11</a> y <a href="/blog/camino-de-vida-11-numero-maestro/">Camino de Vida 11</a>.' },
    ],
    cta: {
      h3: '¿Aparece el 11 en tu perfil numerológico?',
      body: 'La frecuencia e intensidad con que experimentas las horas espejo cambia según tu estructura numerológica. Las personas con el 11 en el Camino de Vida, la Expresión o los Ciclos sienten una resonancia muy distinta. La calculadora gratuita lo calcula en segundos.',
      link1: { href: '/numerologia/', text: 'Calcular mi numerología gratis' },
      link2: { href: '/precios/', text: 'Estudio numerológico completo — desde 19€' },
    },
    blocks2: [
      { t: 'h2', id: 'horas-espejo-karmicas', text: 'Las horas espejo con números kármicos: las más intensas del reloj' },
      { t: 'p', html: 'En numerología pitagórica existen cuatro <strong>números kármicos</strong>: el 13, el 14, el 16 y el 19. Se llaman así porque representan patrones que una persona ha de trabajar conscientemente —si aparecen en posiciones clave del perfil numerológico— o señales de atención especial cuando aparecen como horas espejo.' },
      { t: 'p', html: 'Verlos como horas espejo no es una mala señal. En numerología no hay números malos, solo números con más tensión. Lo que piden estas cuatro horas espejo es una pausa más consciente que las demás:' },
      { t: 'ul', items: [
        '<strong>13:13</strong> — Kármico de la transformación. Señal de que algo en tu vida necesita morir (un hábito, una creencia, una dinámica) para que algo nuevo pueda nacer. No es pérdida: es renovación.',
        '<strong>14:14</strong> — Kármico del equilibrio. Pide moderación entre la búsqueda de libertad y el cumplimiento de responsabilidades. Señal de que algo está desequilibrado en esa balanza.',
        '<strong>16:16</strong> — Kármico del derrumbe necesario. El más intenso de los cuatro. Cuando aparece repetidamente suele coincidir con periodos de crisis que, vistos en perspectiva, fueron el inicio de algo mucho más auténtico. No resistas el cambio que ya está en marcha.',
        '<strong>19:19</strong> — Kármico de la independencia. Señal de que hay algo que necesitas reconocer, sostener o crear sin depender de la aprobación externa. Fuerza que pide ser propia.',
      ] },

      { t: 'h2', id: 'horas-espejo-simetricas', text: 'Horas espejo simétricas: 10:01, 12:21, 13:31 y las demás' },
      { t: 'p', html: 'Además de las 24 horas dobles, existe una segunda categoría: las <strong>horas espejo simétricas</strong> o invertidas. Son aquellas en que los cuatro dígitos forman un palíndromo que se lee igual de izquierda a derecha que de derecha a izquierda.' },
      { t: 'p', html: 'Ejemplos: 10:01, 12:21, 13:31, 20:02, 21:12. El 11:11 pertenece a ambas categorías —hora doble y hora simétrica— lo que añade otra capa a su singularidad: es el único momento del día que cumple simultáneamente las dos condiciones.' },
      { t: 'p', html: 'Las horas simétricas no tienen el mismo desarrollo numerológico que las dobles, pero en los sistemas que las trabajan se interpretan como señales de <em>reflexión especular</em>: algo que percibes en el exterior es un reflejo de lo que hay en el interior. El contexto en que aparecen —a qué estabas pensando justo antes— es especialmente informativo.' },

      { t: 'h2', id: 'como-trabajar', text: 'Cómo trabajar con las horas espejo sin caer en la superstición' },
      { t: 'p', html: 'La utilidad de las horas espejo no está en predecir nada —ningún sistema serio lo afirma. Está en lo que hacen cuando aparecen de forma espontánea: te sacan del piloto automático durante unos segundos.' },
      { t: 'p', html: 'Un protocolo sencillo para las próximas dos semanas: cuando veas una hora espejo de forma espontánea (sin haberla buscado), apunta en el móvil la hora y una palabra que capture en qué estabas pensando justo antes. Al cabo de 15 días, revisa el patrón. No el número —el contexto. Los temas recurrentes dirán más que cualquier interpretación numerológica genérica.' },
      { t: 'p', html: 'Si el 16:16 aparece siempre que piensas en tu trabajo y el 02:02 aparece cuando piensas en alguien concreto, ya tienes información real sobre dónde está poniendo atención tu mente —que es, en última instancia, lo que la numerología simbólica intenta señalar.' },
    ],
    faq: [
      { q: '¿Qué es exactamente una hora espejo?', a: 'Una hora espejo es cualquier momento en un reloj digital de 24 horas donde los dígitos de las horas y los minutos forman un patrón simétrico. El tipo más conocido son las dobles —como el 11:11 o el 22:22, donde las cuatro cifras se repiten o espejan. Existen 24 combinaciones posibles en un reloj de 24 horas, desde el 00:00 hasta el 23:23.' },
      { q: '¿Cuántas horas espejo existen en total?', a: 'En formato de 24 horas, existen 24 horas espejo dobles (00:00, 01:01, 02:02... hasta 23:23). Si incluyes también las horas simétricas o invertidas —palíndromos como 10:01, 12:21 o 13:31— el número total supera las 40 combinaciones según el sistema que se use.' },
      { q: '¿Qué hace al 11:11 más especial que otras horas espejo?', a: 'El 11 es número maestro pitagórico, lo que lo diferencia del resto. Además, 11+11=22, que es también un número maestro —la única cadena de maestros que produce la suma de una hora espejo. Y el 11:11 es exactamente el momento número 12 de las 24 horas espejo del día: el punto central de la secuencia. Tres factores únicos que no se repiten en ninguna otra hora espejo.' },
      { q: '¿Es malo ver el 13:13 o el 16:16?', a: 'No. En numerología pitagórica no existen números malos, solo números con mayor tensión o desafío. El 13 y el 16 son kármicos: señalan áreas de transformación o cambio, no predicciones negativas. Verlos como horas espejo se interpreta como señal de que esa energía está activa en ese momento, invitando a una pausa consciente.' },
      { q: '¿Cuál es la diferencia entre hora espejo doble y hora espejo simétrica?', a: 'Una hora espejo doble es cuando los dos dígitos de la hora son iguales a los dos dígitos del minuto (11:11, 22:22). Una hora espejo simétrica o invertida es cuando los cuatro dígitos forman un palíndromo que se lee igual al derecho que al revés (12:21, 13:31, 10:01). El 11:11 es el único momento del día que pertenece simultáneamente a ambas categorías.' },
      { q: '¿Qué debo hacer cuando veo una hora espejo?', a: 'No existe ninguna obligación ritual. Lo más útil es pausar un momento y notar en qué estabas pensando justo antes de verla. El contexto de aparición —el pensamiento, la emoción, la situación— es más informativo que el número en sí. Si llevas un registro breve durante dos semanas, los patrones que emergen en el contexto son la señal real que vale la pena analizar.' },
    ],
    ctaFinal: {
      h2: 'El 11 en tu perfil numerológico.',
      p: 'Si el número maestro 11 aparece en tu Camino de Vida, tu Expresión o tus Ciclos, su significado es mucho más específico que una hora espejo genérica. El estudio numerológico completo lo calcula e interpreta en 52 páginas.',
      href: '/precios/',
      btnText: 'Ver el estudio numerológico →',
    },
  },

  'ascendente-en-escorpio': {
    eyebrow: 'Astrología · Ascendente · Signo Escorpio',
    h1: 'Ascendente en Escorpio',
    lead: 'El Ascendente en Escorpio marca a alguien que llega al mundo con una presencia que no pasa desapercibida. Antes de que esa persona diga nada, algo en ella ya comunica intensidad, profundidad y una voluntad de hierro. No es artificio —es la energía escorpiana encarnada en el umbral de la carta natal.',
    heroBg: 'var(--ink)',
    readingTime: '9 min',
    blocks1: [
      { t: 'h2', id: 'que-es-ascendente', text: 'Qué es el ascendente y por qué Escorpio lo cambia todo' },
      { t: 'p', html: 'El ascendente es el signo zodiacal que estaba saliendo por el horizonte este exactamente en el momento en que naciste. No es una posición planetaria, sino el punto donde el cielo y la tierra se encuentran —el umbral por el que entras al mundo.' },
      { t: 'p', html: 'Por eso el ascendente describe <em>cómo llegas</em>: tu manera natural de presentarte, la energía que proyectas antes de que nadie sepa quién eres de verdad, el "recipiente" en el que se vierte toda tu carta natal. No es lo que eres en tu interior (eso es el Sol), ni cómo sientes (eso es la Luna). Es la forma que el mundo percibe, y también el propósito de vida que has venido a desarrollar.' },
      { t: 'p', html: 'Cuando el Ascendente es Escorpio, el horizonte de nacimiento estaba marcado por el signo de agua fija más poderoso del zodiaco. Esto imprime en la persona una presencia magnética, una intensidad en la mirada y una capacidad de percepción que va mucho más allá de lo que la mayoría de la gente capta en una primera conversación. El Ascendente Escorpio no se queda en la superficie —de nada ni de nadie.' },

      { t: 'h2', id: 'primera-impresion', text: 'Primera impresión: cómo te ve el mundo' },
      { t: 'p', html: 'La primera impresión del Ascendente Escorpio raramente es neutral. No hay término medio: o fascina o incomoda. A veces las dos cosas a la vez, en la misma persona.' },
      { t: 'p', html: 'Lo que el mundo percibe en un primer contacto es alguien con una presencia densa, una mirada que parece atravesarte y una reserva que no es timidez sino evaluación activa. El Ascendente Escorpio observa antes de actuar. Está tomando medidas de todo: de tus intenciones, de lo que dices y de lo que no dices, de si eres de fiar. Esta lectura es casi inconsciente —es simplemente como funciona.' },
      { t: 'p', html: 'El magnetismo es real y documentado. Hay algo en el Ascendente Escorpio que atrae, aunque no lo busque. Puede ser la sensación de que detrás de esa calma hay algo enorme que no está del todo controlado. Puede ser la mirada. Puede ser la economía de palabras —dice poco, pero lo que dice pesa. Sea cual sea el mecanismo, el efecto sobre los demás es consistente: intriga.' },
      { t: 'p', html: 'La sombra de la primera impresión es la percepción de amenaza. En su expresión menos integrada, el Ascendente Escorpio puede proyectar una intensidad que los demás sienten como control o desconfianza antes de entender el porqué. La mirada evaluadora se percibe como juicio. El silencio, como rechazo. El Ascendente Escorpio necesita aprender que no todo el mundo puede leer la diferencia entre intensidad y hostilidad.' },

      { t: 'h2', id: 'personalidad', text: 'Personalidad en profundidad: el Ascendente Escorpio en el día a día' },
      { t: 'p', html: 'Más allá de la primera impresión, el Ascendente Escorpio configura una forma de vivir orientada a la profundidad y la transformación. No le interesa lo superficial. En las conversaciones, en los vínculos, en los proyectos que elige: siempre busca llegar al fondo.' },
      { t: 'p', html: 'Esta orientación genera personas de una lealtad extraordinaria. Cuando el Ascendente Escorpio decide que alguien merece su confianza —proceso que puede llevar tiempo— esa persona tiene en él o ella un aliado incondicional. No abandona. No se va cuando las cosas se complican. Está hecho para el compromiso real, no para los vínculos de superficie.' },
      { t: 'p', html: 'La dificultad surge cuando esa misma intensidad se vuelve control. El Ascendente Escorpio tiene una tendencia natural a querer conocer todo lo que ocurre en su entorno —información es seguridad, y seguridad es lo que más necesita aunque raramente lo admita. Cuando esa necesidad de control no está integrada, puede generar celos, desconfianza crónica o una vigilancia que agota a quienes están cerca.' },
      { t: 'p', html: 'La integración de este ascendente pasa por aprender que la vulnerabilidad no es debilidad. El Ascendente Escorpio tiene una capacidad enorme de transformación personal —en ningún signo es tan literal como en Escorpio que el proceso de muerte y renacimiento se vive de forma cíclica. La paradoja es que para acceder a esa transformación hay que soltar el control, no apretarlo.' },

      { t: 'h2', id: 'marte-pluton-regentes', text: 'Marte y Plutón como regentes: el papel de los planetas rectores' },
      { t: 'p', html: 'Escorpio tiene dos regentes: <strong>Marte</strong> (tradicional, antes de que se descubriera Plutón) y <strong>Plutón</strong> (moderno, desde 1930). Ambos actúan como "directores" del Ascendente Escorpio, y su posición en la carta natal da información crucial sobre cómo se vive este ascendente.' },
      { t: 'p', html: 'Marte aporta la dimensión de acción, impulso y voluntad. Un Ascendente Escorpio con Marte fuerte (en su domicilio en Aries, en Capricornio donde está en exaltación, o en aspecto importante) tiene una capacidad de determinación que pocas posiciones igualan. No para hasta lograr lo que se propone. La pregunta es si ese impulso está orientado por la conciencia o por el miedo.' },
      { t: 'p', html: '<strong>Plutón</strong> añade la dimensión de transformación, poder y lo que está debajo de la superficie. La posición de Plutón por signo es generacional —toda una generación comparte el signo de Plutón—, pero la casa donde cae en la carta individual es específica de cada persona y describe en qué área de la vida el Ascendente Escorpio experimenta las transformaciones más profundas y los procesos de muerte y renacimiento.' },
      { t: 'ul', items: [
        '<strong>Marte en fuego</strong> (Aries, Leo, Sagitario): la intensidad escorpiana se expresa con más visibilidad y acción directa. Menos paciencia, más impacto inmediato.',
        '<strong>Marte en tierra</strong> (Tauro, Virgo, Capricornio): la voluntad escorpiana toma forma material y duradera. Capricornio en particular potencia la ambición y la resistencia.',
        '<strong>Marte en agua</strong> (Cáncer, Escorpio, Piscis): la profundidad se duplica. En Escorpio especialmente, Marte en domicilio crea una intensidad que puede ser transformadora o destructiva según el nivel de conciencia.',
        '<strong>Marte en aire</strong> (Géminis, Libra, Acuario): añade capacidad estratégica y comunicativa. La intensidad se canaliza a través de la palabra y el pensamiento, no solo de la acción.',
      ] },

      { t: 'h2', id: 'sol-luna-ascendente', text: 'Sol en Escorpio, Luna en Escorpio y Ascendente en Escorpio: tres cosas distintas' },
      { t: 'p', html: 'Mucha gente confunde estas tres posiciones porque llevan el mismo nombre de signo. Son capas diferentes del mapa natal, y funcionan en ámbitos diferentes de la vida:' },
      { t: 'table', heads: ['Posición', 'Qué describe', 'Cómo se nota'], rows: [
        ['Sol en Escorpio', 'Tu esencia, tu energía vital, lo que te hace brillar', 'En el propósito de vida, en la identidad consciente, en lo que eliges explorar'],
        ['Luna en Escorpio', 'Tu mundo emocional, tus necesidades de seguridad', 'En cómo sientes, en la intensidad emocional privada, en los celos y la lealtad'],
        ['Ascendente en Escorpio', 'Tu manera de llegar al mundo, la primera impresión', 'En cómo te perciben, en la presencia magnética, en el cuerpo y en el propósito encarnado'],
      ] },
      { t: 'p', html: 'El Sol en Escorpio trabaja desde la identidad: necesita transformación para sentirse completo. La Luna en Escorpio gestiona las emociones con una intensidad que puede ser abrumadora —siente de forma absoluta, sin medias tintas. El Ascendente en Escorpio configura la manera de presentarse: magnético, reservado, penetrante —aunque el Sol sea Géminis y la Luna sea Sagitario.' },
      { t: 'p', html: 'Lo especialmente significativo ocurre cuando hay dos o tres de estas posiciones en Escorpio en una misma carta. La persona concentra toda la energía escorpiana en prácticamente todas las áreas de su vida: la profundidad, la intensidad y la necesidad de ir al fondo de todo son dominantes desde el primer encuentro hasta la vida íntima más privada.' },

      { t: 'h2', id: 'descendente-tauro', text: 'Descendente en Tauro: el tipo de pareja que atraes' },
      { t: 'p', html: 'El Descendente siempre está en el signo opuesto al Ascendente. Con Ascendente en Escorpio, el Descendente cae en <strong>Tauro</strong>.' },
      { t: 'p', html: 'El Descendente describe la energía que buscamos inconscientemente en los demás: lo que proyectamos fuera de nosotros mismos, lo que nos atrae en una pareja aunque no lo hayamos elegido conscientemente, lo que creemos que nos completa.' },
      { t: 'p', html: 'El Ascendente Escorpio, con Descendente en Tauro, tiende a sentirse atraído por personas con fuerte energía taurina: estables, sensuales, afincadas en lo material y lo tangible, capaces de ofrecer la constancia y la calma que el escorpiano proyecta hacia fuera pero a veces no encuentra en su propio interior. También —en su expresión menos integrada— personas que ofrecen seguridad económica o física como sustituto de la seguridad emocional que el Ascendente Escorpio busca en el fondo.' },
      { t: 'p', html: 'La integración del eje Escorpio-Tauro en las relaciones implica desarrollar la dimensión taurina en uno mismo: la capacidad de disfrutar lo que ya hay, de no destruir para reconstruir cuando no es necesario, de encontrar valor en la estabilidad y la permanencia. Escorpio da la profundidad y la transformación; Tauro da los cimientos y el disfrute. Las dos energías están en la carta: el trabajo es integrarlas.' },

      { t: 'h2', id: 'salud-cuerpo', text: 'Salud, cuerpo y el registro somático del Ascendente Escorpio' },
      { t: 'p', html: 'El ascendente también describe el cuerpo: cómo está construido, qué zonas son más sensibles y qué relación tiene la persona con la salud y el bienestar físico.' },
      { t: 'p', html: 'Escorpio rige los órganos reproductivos, el sistema excretor y los procesos de eliminación en la tradición astrológica. El Ascendente Escorpio tiende a registrar la tensión y los procesos no resueltos a través de estas zonas: dificultades hormonales vinculadas a períodos de alta carga emocional, problemas en los órganos pélvicos cuando hay asuntos que no se procesan, resistencia a soltar —tanto emocionalmente como físicamente.' },
      { t: 'p', html: 'También hay una relación particular con la regeneración. Escorpio es el signo de la muerte y el renacimiento, y el cuerpo con Ascendente Escorpio suele tener una capacidad de recuperación notable después de procesos duros. Puede enfermarse seriamente o pasar por crisis físicas intensas, pero también tiene recursos para salir de ellas transformado.' },
      { t: 'p', html: 'El gran desafío de salud del Ascendente Escorpio es la acumulación: de toxinas que no se eliminan, de emociones que no se procesan, de situaciones que no se cierran. La clave está en entender que el cuerpo también necesita el ciclo escorpiano —dejar ir, soltar, vaciar— para poder regenerarse. Lo que no se suelta en el plano emocional suele manifestarse en el plano físico.' },
    ],
    cta: {
      h3: '¿Tienes el Ascendente en Escorpio en tu carta?',
      body: 'La carta natal interpretada explica tu Ascendente en el contexto completo de tu mapa: dónde están Marte y Plutón (tus regentes), cómo se relaciona con tu Sol y tu Luna, y qué dice el Mediocielo sobre tu vocación real.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'mediocielo-leo', text: 'El Mediocielo en Leo: vocación y vida pública' },
      { t: 'p', html: 'Este es uno de los aspectos menos mencionados sobre el Ascendente Escorpio —y uno de los más reveladores. En los sistemas de casas más utilizados (como Placidus), el Ascendente Escorpio conlleva habitualmente un <strong>Mediocielo (MC) en Leo</strong>.' },
      { t: 'p', html: 'El Mediocielo es la cúspide de la Casa 10 —el punto más alto de la carta natal, que describe la vocación pública, la reputación y el lugar en la sociedad. Leo en el Mediocielo añade una dimensión de liderazgo, expresión creativa y necesidad de reconocimiento a la vida pública del Ascendente Escorpio.' },
      { t: 'p', html: 'La combinación Escorpio en el Ascendente + Leo en el MC produce naturalmente perfiles en los que la profundidad y la capacidad de transformación (Escorpio) se expresan públicamente a través de la creatividad, el liderazgo y el arte (Leo). No solo investigan o transforman —lo hacen con una presencia que deja huella. La intensidad escorpiana encuentra su escenario en el carisma leonino.' },
      { t: 'note', html: '<strong>El eje poder-reconocimiento.</strong> Escorpio en el Ascendente trabaja con el poder desde la sombra —desde la comprensión profunda, el control de la información, la transformación invisible. Leo en el MC reclama reconocimiento público por ese poder. La tensión entre los dos es uno de los ejes más productivos del zodiaco cuando está integrado: la profundidad escorpiana que produce algo que merece el reconocimiento leonino.' },

      { t: 'h2', id: 'infancia-patrones', text: 'Patrones de infancia y figura materna' },
      { t: 'p', html: 'El ascendente también guarda información sobre los primeros años de vida y sobre cómo la figura que maternó configuró el carácter.' },
      { t: 'p', html: 'Con Ascendente en Escorpio, la infancia suele haber incluido experiencias de pérdida, secreto o traición —reales o percibidas. Puede haber habido una figura materna con una gran presencia emocional pero también con dificultad para expresar esa emoción directamente: el amor existía, pero los mecanismos de control también. O bien la primera infancia incluyó una experiencia de abandono o vulnerabilidad que dejó una marca: el mundo no es seguro hasta que se ha probado lo contrario.' },
      { t: 'p', html: 'Una de las herencias más comunes del Ascendente Escorpio es haber aprendido muy pronto que no todo el mundo dice la verdad, que las cosas no son siempre lo que parecen, y que mostrar vulnerabilidad tiene un coste. El niño o la niña con este ascendente desarrolló muy temprano un radar para detectar lo que no se dice —una supervivencia emocional que en la vida adulta se convierte en intuición extraordinaria, pero que a veces dificulta confiar plenamente en los demás.' },
      { t: 'p', html: 'Reconocer este patrón es el primer paso para integrarlo. La desconfianza aprendida en la infancia fue adaptativa en su momento. El trabajo del Ascendente Escorpio adulto es distinguir entre la precaución útil —que protege— y la desconfianza crónica —que aísla.' },

      { t: 'h2', id: 'hombre-mujer', text: 'Ascendente en Escorpio: hombre y mujer' },
      { t: 'p', html: 'La astrología no asigna cualidades distintas por género —el Ascendente Escorpio tiene la misma energía independientemente del sexo. Sin embargo, la manera en que la sociedad recibe esa energía difiere, y eso genera experiencias distintas.' },
      { t: 'p', html: 'La <strong>mujer con Ascendente en Escorpio</strong> suele ser percibida como intensa, seductora y con una fuerza que a veces desconcierta al entorno. El magnetismo escorpiano en una mujer puede leerse como amenaza o como misterio según el contexto cultural. Con frecuencia aprende a gestionar cuánta de esa intensidad muestra —no porque la reprima, sino porque ha observado que mostrarla toda de golpe activa respuestas defensivas en los demás. Es estratégica por naturaleza, aunque ella no lo llame así.' },
      { t: 'p', html: 'El <strong>hombre con Ascendente en Escorpio</strong> proyecta una presencia que tiende a leerse como poder y control. La mirada penetrante y la economía de palabras se perciben como señales de dominio. Esto puede abrir puertas —pocas personas ignoran a un Ascendente Escorpio en una sala— pero también puede generar una soledad particular: el entorno le ve como alguien que lo tiene todo bajo control cuando por dentro puede haber una vulnerabilidad que no sabe cómo mostrar sin sentir que pierde terreno.' },
      { t: 'p', html: 'En ambos casos, el trabajo de integración apunta en la misma dirección: aprender que mostrar lo que hay debajo no destruye el magnetismo. Lo que el Ascendente Escorpio tiene miedo de perder al abrirse —la intensidad, el misterio, la percepción de poder— no desaparece con la vulnerabilidad. Se profundiza.' },

      { t: 'h2', id: 'personas-famosas', text: 'Personas famosas con Ascendente en Escorpio' },
      { t: 'p', html: 'Varias figuras públicas documentadas tienen el Ascendente en Escorpio en su carta natal. El denominador común es visible aunque no se conozca su astrología: una presencia magnética que no necesita esfuerzo, una capacidad de penetrar en la psicología humana que marca su trabajo, y una trayectoria marcada por transformaciones profundas —no siempre cómodas, pero siempre significativas.' },
      { t: 'p', html: '<strong>Meryl Streep</strong> (Sol en Cáncer, Ascendente en Escorpio) encarna la paradoja escorpiana: aparente reserva personal combinada con una capacidad de transformación total en su trabajo. Streep no "actúa" personajes —los habita hasta el fondo, los disecciona, los vuelve a construir desde la psique. Esa disposición a ir al núcleo de una persona sin distancia de seguridad es profundamente Escorpio. <strong>Sigmund Freud</strong> (Sol en Tauro, Ascendente en Escorpio) dedicó su vida a explorar exactamente lo que el Ascendente Escorpio conoce de forma intuitiva: el inconsciente, lo que se esconde detrás de lo que se muestra, el poder de lo que no se dice. No es casualidad —es astrología.' },
      { t: 'p', html: '<strong>Jack Nicholson</strong> (Sol en Tauro, Ascendente en Escorpio) tiene en pantalla exactamente la energía que describe este ascendente: presencia que ocupa toda la sala, una mirada que no pide permiso, y una capacidad de encarnar el lado oscuro de la psique humana que pocos actores igualan. Nicholson no interpreta al villano desde la distancia —lo comprende desde dentro. Lo que une a estas personas no es el miedo que proyectan sino la profundidad desde la que operan.' },

      { t: 'h2', id: 'fortalezas-sombra', text: 'Fortalezas y sombra del Ascendente Escorpio' },
      { t: 'p', html: 'Como toda posición astrológica, el Ascendente Escorpio tiene una expresión luminosa y una sombra. La diferencia entre ambas no es de carácter sino de integración.' },
      { t: 'ul', items: [
        '<strong>Fortaleza — Percepción extraordinaria.</strong> Lee lo que no se dice. Detecta la diferencia entre lo que alguien muestra y lo que hay debajo. Esta capacidad produce intuición extraordinaria y, cuando se usa conscientemente, sabiduría real sobre la naturaleza humana.',
        '<strong>Fortaleza — Lealtad absoluta.</strong> Cuando entrega su confianza, es incondicional. No abandona en las dificultades. Sus vínculos son reales, no convenientes.',
        '<strong>Fortaleza — Capacidad de transformación.</strong> Puede atravesar crisis que otros no sobrevivirían —no porque no las sienta, sino porque tiene recursos para renacer de ellas. El ciclo escorpiano de muerte y renacimiento es una fortaleza enorme cuando se acepta en lugar de resistirse.',
        '<strong>Sombra — Desconfianza crónica.</strong> El radar para detectar traiciones puede volverse detector de amenazas donde no las hay. La percepción aguda se convierte en paranoia cuando no está calibrada.',
        '<strong>Sombra — Control como mecanismo de defensa.</strong> La necesidad de controlar el entorno —de saber todo lo que ocurre— es una respuesta al miedo a la vulnerabilidad. Cuando no está integrada, genera vínculos asfixiantes y una energía de vigilancia que agota.',
        '<strong>Sombra — Dificultad para soltar.</strong> Recuerda con precisión quirúrgica. Las traiciones reales no se olvidan fácilmente, y puede quedar enganchado en ellas mucho más tiempo del que es útil. El rencor es la sombra de la lealtad.',
      ] },
      { t: 'p', html: 'La integración del Ascendente Escorpio no consiste en suavizar la intensidad sino en ponerla al servicio de la transformación —propia y de los demás. La pregunta que orienta el crecimiento: ¿uso lo que percibo para protegerme del mundo, o para comprenderlo y transformarlo?' },
    ],
    faq: [
      { q: '¿Cómo sé si mi ascendente es Escorpio?', a: 'Necesitas tu carta natal, que requiere fecha, hora y ciudad de nacimiento. La calculadora gratuita de carta natal lo calcula automáticamente. El signo solar que conoces de los horóscopos no te dice nada sobre tu ascendente —el ascendente cambia de signo cada dos horas aproximadamente, así que personas nacidas el mismo día con diferencia de pocas horas pueden tener ascendentes distintos.' },
      { q: '¿Es verdad que el Ascendente Escorpio es el más intenso del zodiaco?', a: 'La intensidad es real, pero no es el único rasgo definitorio. Lo que caracteriza al Ascendente Escorpio es la profundidad, no simplemente la intensidad emocional. Hay ascendentes que expresan emociones con más visibilidad (Aries, Leo). Lo que Escorpio aporta es una profundidad de percepción y un magnestismo que opera de forma más contenida pero igualmente poderosa.' },
      { q: '¿Qué diferencia hay entre tener Sol en Escorpio y Ascendente en Escorpio?', a: 'El Sol en Escorpio define tu identidad y energía vital consciente —cómo te experimentas a ti mismo y hacia dónde te diriges. El Ascendente en Escorpio define cómo el mundo te percibe en un primer encuentro y qué forma tiene tu manera de llegar a la vida. Puedes tener Sol en Libra y Ascendente en Escorpio: por dentro buscas el equilibrio y la armonía en las relaciones, pero por fuera proyectas intensidad, misterio y presencia magnética que nada tiene que ver con la energía libreana.' },
      { q: '¿Por qué el Ascendente Escorpio tiene fama de celoso?', a: 'Los celos escorpianos son en realidad una expresión de la necesidad de seguridad emocional y de la dificultad para confiar. No es que el Ascendente Escorpio sea posesivo por capricho —es que ha aprendido, a menudo desde la infancia, que la traición existe y que las personas que más importan pueden irse. Esa percepción genera un radar hiperactivado para señales de pérdida. Cuando se integra, esa energía se convierte en una profundidad de compromiso que pocas posiciones igualan.' },
      { q: '¿El Ascendente Escorpio cambia con los años?', a: 'El ascendente natal no cambia. Pero la forma de expresarlo sí evoluciona. En la madurez, el Ascendente Escorpio suele desarrollar una mayor capacidad para confiar, para soltar el control y para usar su percepción extraordinaria al servicio de los demás en lugar de como mecanismo defensivo. Los tránsitos de Plutón sobre el Ascendente —especialmente el Plutón cuadratura Ascendente— suelen marcar períodos de transformación profunda en la manera de llegar al mundo.' },
    ],
    ctaFinal: {
      h2: 'Tu Ascendente Escorpio explicado en el contexto completo de tu carta.',
      p: 'Dónde están Marte y Plutón (tus regentes) y qué casa rigen, los aspectos que modifican cómo se expresa este ascendente, y cómo el Mediocielo en Leo da forma a tu vocación pública. Todo en un estudio de 45–60 páginas.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },
  'ascendente-en-virgo': {
    eyebrow: 'Astrología · Ascendente · Signo Virgo',
    h1: 'Ascendente en Virgo',
    lead: 'El Ascendente en Virgo marca a alguien que llega al mundo con una misión de orden, análisis y servicio. No es un destino de protagonismo, sino de hacer las cosas bien y de verdad. La primera impresión es de calma, discreción y competencia —y detrás hay mucho más.',
    heroBg: 'var(--ink)',
    readingTime: '8 min',
    blocks1: [
      { t: 'h2', id: 'que-es-ascendente', text: 'Qué es el ascendente y por qué Virgo lo cambia todo' },
      { t: 'p', html: 'El ascendente es el signo zodiacal que estaba saliendo por el horizonte este exactamente en el momento en que naciste. No es una posición planetaria, sino el punto donde el cielo y la tierra se encuentran —el umbral por el que entras al mundo.' },
      { t: 'p', html: 'Por eso el ascendente describe <em>cómo llegas</em>: tu manera natural de presentarte, la energía que proyectas antes de que nadie sepa quién eres de verdad, el "recipiente" en el que se vierte toda tu carta natal. No es lo que eres en tu interior (eso es el Sol), ni cómo sientes (eso es la Luna). Es la forma que el mundo percibe, y también el propósito de vida que has venido a desarrollar.' },
      { t: 'p', html: 'Cuando el Ascendente es Virgo, el horizonte de nacimiento estaba marcado por el signo de la tierra más analítico, detallista y orientado al servicio. Esto imprime en la persona una tendencia innata hacia el orden, la precisión y la mejora continua —tanto en sí misma como en lo que la rodea.' },

      { t: 'h2', id: 'primera-impresion', text: 'Primera impresión: cómo te ve el mundo' },
      { t: 'p', html: 'La primera impresión del Ascendente Virgo raramente incluye espectáculo. No llega haciendo ruido. Llega con calma, con una presencia medida y una cierta contención que puede leerse como timidez o reserva, pero que en realidad es evaluación. El Ascendente Virgo observa antes de actuar.' },
      { t: 'p', html: 'Lo que el mundo percibe en un primer contacto es alguien cuidado, competente, con una manera de hablar precisa. La persona con Ascendente Virgo tiende a cuidar los detalles de su presentación —no necesariamente la moda, sino la coherencia: que nada esté fuera de lugar, que lo que dice sea exacto, que el entorno que controla funcione bien.' },
      { t: 'p', html: 'También hay una amabilidad práctica característica. El Ascendente Virgo ayuda porque sabe hacerlo, no para impresionar. Si hay un problema, lo identifica y lo resuelve. Si alguien necesita algo, lo procura antes de que lo pida. Esta disposición al servicio es genuina —y a veces queda invisible porque no la publicita.' },
      { t: 'p', html: 'La sombra de la primera impresión es la hipercrítica. Si el Ascendente Virgo está en su expresión menos integrada, puede proyectar una exigencia que los demás sienten antes de entender. La mirada que evalúa, el comentario que corrige antes de apreciar, la sensación de que nunca es suficiente. Esto no es maldad —es el análisis virgiando sin filtro de contexto.' },

      { t: 'h2', id: 'personalidad', text: 'Personalidad en profundidad: el Ascendente Virgo en el día a día' },
      { t: 'p', html: 'Más allá de la primera impresión, el Ascendente Virgo configura una forma de vivir orientada al proceso. No le basta con que algo "más o menos" funcione. Necesita entender cómo funciona, por qué funciona así y cómo podría funcionar mejor.' },
      { t: 'p', html: 'Esta orientación genera personas extraordinariamente competentes en su área de especialización. El Ascendente Virgo estudia, investiga, practica, refina. Tiene una capacidad de atención al detalle que pocas posiciones astrológicas igualan. En el trabajo, en los proyectos creativos, en el aprendizaje, esta minuciosidad produce resultados de calidad real.' },
      { t: 'p', html: 'La dificultad surge cuando ese mismo análisis se vuelve hacia dentro —hacia uno mismo o hacia los demás— con la misma exigencia. El Ascendente Virgo puede ser su crítico más severo: nada de lo que produce le parece suficientemente bueno, suficientemente terminado, suficientemente correcto. Eso produce parálisis, perfeccionismo que agota o una autoexigencia que impide disfrutar lo que ya funciona.' },
      { t: 'p', html: 'La integración de este ascendente pasa por aprender que el análisis es una herramienta, no un juicio. Que "suficientemente bueno" en el momento adecuado es sabiduría, no rendición. Que el servicio a los demás —la dimensión más elevada de Virgo— no requiere perfección previa; requiere presencia y voluntad real.' },

      { t: 'h2', id: 'mercurio-regente', text: 'Mercurio como regente del ascendente: el papel del planeta rector' },
      { t: 'p', html: 'Cada ascendente tiene un planeta regente que actúa como su "director": marca el tono de toda la carta y describe cómo se vive esa energía en la práctica.' },
      { t: 'p', html: 'El regente del Ascendente Virgo es <strong>Mercurio</strong>: el planeta de la comunicación, el pensamiento, el análisis y los intercambios. Esto significa que para entender un Ascendente Virgo en profundidad, hay que mirar dónde está Mercurio en la carta natal de esa persona: en qué signo, en qué casa y con qué aspectos.' },
      { t: 'ul', items: [
        '<strong>Mercurio en fuego</strong> (Aries, Leo, Sagitario): la tendencia analítica se vuelve más rápida y directa, aunque a veces menos paciente con los procesos lentos.',
        '<strong>Mercurio en tierra</strong> (Tauro, Virgo, Capricornio): el análisis es metódico, fiable y orientado a resultados prácticos. La energía virgiando se duplica y refuerza.',
        '<strong>Mercurio en agua</strong> (Cáncer, Escorpio, Piscis): añade una dimensión intuitiva al ascendente. En Piscis especialmente, puede crear cierta tensión entre la mente ordenadora y el mundo difuso del signo opuesto.',
        '<strong>Mercurio en aire</strong> (Géminis, Libra, Acuario): refuerza la agilidad mental y la capacidad de síntesis. El Ascendente Virgo con Mercurio en Géminis es especialmente rápido para ver los detalles y la estructura al mismo tiempo.',
      ] },

      { t: 'h2', id: 'sol-luna-ascendente', text: 'Sol en Virgo, Luna en Virgo y Ascendente en Virgo: tres cosas distintas' },
      { t: 'p', html: 'Mucha gente confunde estas tres posiciones porque llevan el mismo nombre de signo. Son capas diferentes del mapa natal, y funcionan en ámbitos diferentes de la vida:' },
      { t: 'table', heads: ['Posición', 'Qué describe', 'Cómo se nota'], rows: [
        ['Sol en Virgo', 'Tu esencia, tu energía vital, lo que te hace brillar', 'En el propósito de vida, el trabajo que da sentido, la identidad consciente'],
        ['Luna en Virgo', 'Tu mundo emocional, tus necesidades de seguridad', 'En cómo sientes, en qué te hace sentir cuidado/a, en la vida privada e íntima'],
        ['Ascendente en Virgo', 'Tu manera de llegar al mundo, la primera impresión', 'En cómo te perciben, en el cuerpo, en el estilo de vida y en el propósito encarnado'],
      ] },
      { t: 'p', html: 'El Sol en Virgo trabaja desde la identidad: necesita ser útil para sentirse completo. La Luna en Virgo gestiona las emociones con análisis: necesita entender lo que siente para poder procesarlo. El Ascendente en Virgo configura la manera de presentarse: calma, precisión, servicio —aunque el Sol sea Sagitario y la Luna sea Piscis.' },
      { t: 'p', html: 'Lo especialmente significativo ocurre cuando hay dos o tres de estas posiciones en Virgo en una misma carta. La persona duplica o triplica la energía virgiando: la exigencia, la capacidad analítica y la orientación al servicio son dominantes en prácticamente todas las áreas de su vida.' },

      { t: 'h2', id: 'descendente-piscis', text: 'Descendente en Piscis: el tipo de pareja que atraes' },
      { t: 'p', html: 'El Descendente siempre está en el signo opuesto al Ascendente. Con Ascendente en Virgo, el Descendente cae en <strong>Piscis</strong>.' },
      { t: 'p', html: 'El Descendente describe la energía que buscamos inconscientemente en los demás: lo que proyectamos fuera de nosotros mismos, lo que nos atrae en una pareja aunque no lo hayamos elegido conscientemente, lo que creemos que nos completa.' },
      { t: 'p', html: 'El Ascendente Virgo, con Descendente en Piscis, tiende a sentirse atraído por personas con fuerte energía pisciana: artistas, intuitivos, soñadores, almas sensibles con un mundo interior rico. También —en su expresión menos integrada— personas que "necesitan ser rescatadas" o que proyectan vulnerabilidad y apertura emocional que el virgiando no sabe cómo expresar directamente en sí mismo.' },
      { t: 'p', html: 'La integración del eje Virgo-Piscis en las relaciones implica desarrollar la dimensión pisciana en uno mismo —la compasión, la apertura emocional, la capacidad de fluir sin controlar— en lugar de buscarla exclusivamente en los demás. Virgo da la estructura y la competencia práctica; Piscis da la sensibilidad y el flujo. Ambas energías están en la carta: el trabajo es integrarlas, no proyectar una mitad.' },

      { t: 'h2', id: 'salud-cuerpo', text: 'Salud, cuerpo y el sexto sentido físico del Ascendente Virgo' },
      { t: 'p', html: 'El ascendente también describe el cuerpo: cómo está construido, qué zonas son más sensibles y qué relación tiene la persona con la salud y el bienestar físico.' },
      { t: 'p', html: 'Virgo rige el sistema digestivo y el intestino en la tradición astrológica. El Ascendente Virgo tiende a registrar el estrés, la ansiedad y la sobrecarga emocional a través del aparato digestivo: tensión abdominal, dificultades digestivas en períodos de alta demanda mental, colon sensible. El cuerpo avisa cuando la mente analítica no para.' },
      { t: 'p', html: 'También hay una sensibilidad nutricional característica. El Ascendente Virgo suele responder bien a una alimentación consciente, ordenada y de calidad —y sentir claramente los efectos negativos de lo que no le sienta bien. La higiene, el orden y la rutina corporal (ejercicio regular, patrones de sueño estables) son recursos reales de bienestar, no solo hábitos.' },
      { t: 'p', html: 'El gran desafío de salud del Ascendente Virgo es la hipervigilancia: la misma mente analítica que identifica síntomas reales puede también amplificar señales corporales normales convirtiéndolas en motivo de preocupación. La clave es distinguir entre la atención cuidadosa al cuerpo —virtud virgiando— y la vigilancia ansiosa permanente —sombra virgiando.' },
    ],
    cta: {
      h3: '¿Tienes el Ascendente en Virgo en tu carta?',
      body: 'La carta natal interpretada explica tu Ascendente en el contexto completo de tu mapa: qué casa ocupa Mercurio (su regente), cómo se relaciona con tu Sol y tu Luna, y qué dice el Mediocielo sobre tu vocación.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'mediocielo-geminis', text: 'El Mediocielo en Géminis: vocación y vida pública' },
      { t: 'p', html: 'Este es uno de los aspectos menos mencionados sobre el Ascendente Virgo —y uno de los más reveladores. En los sistemas de casas más utilizados (como Placidus), el Ascendente Virgo conlleva habitualmente un <strong>Mediocielo (MC) en Géminis</strong>.' },
      { t: 'p', html: 'El Mediocielo es la cúspide de la Casa 10 —el punto más alto de la carta natal, que describe la vocación pública, la reputación y el lugar en la sociedad. Géminis en el Mediocielo añade una dimensión de comunicación, versatilidad y adaptación intelectual a la vida pública del Ascendente Virgo.' },
      { t: 'p', html: 'La combinación Virgo en el Ascendente + Géminis en el MC produce naturalmente perfiles como el maestro que domina su materia y sabe explicarla, el especialista que también es divulgador, el analista que también escribe. No solo hacen bien las cosas —las comunican, las transmiten, las enseñan.' },
      { t: 'note', html: '<strong>El doble Mercurio.</strong> El regente del Mediocielo en Géminis es también Mercurio —el mismo que rige el Ascendente Virgo. Esto crea un énfasis mercurial doble en la carta: la mente, la comunicación y el análisis son el vehículo principal tanto de la personalidad como de la vocación. Una persona con este patrón que no cultiva activamente la comunicación y el pensamiento analítico estará desaprovechando una de sus mayores fortalezas.' },

      { t: 'h2', id: 'infancia-patrones', text: 'Patrones de infancia y figura materna' },
      { t: 'p', html: 'El ascendente también guarda información sobre los primeros años de vida y sobre cómo la figura que maternó configuró el carácter.' },
      { t: 'p', html: 'Con Ascendente en Virgo, la infancia suele haber tenido un énfasis en el desempeño, la corrección y el trabajo. Puede haber una figura materna —o el ambiente familiar en general— que valoraba la competencia, el orden y "hacerlo bien". Esto puede haber transmitido tanto disciplina útil como una exigencia que quedó interiorizada como voz crítica interna que nunca calla.' },
      { t: 'p', html: 'Una de las herencias más comunes del Ascendente Virgo es haber aprendido que el valor personal está vinculado a ser útil, eficiente y sin error. El niño o la niña con este ascendente aprendió a ganarse el amor o la aprobación siendo bueno/a en algo, ayudando, no dando trabajo, no siendo imperfecto. El resultado en la vida adulta es alguien muy capaz —y que a veces tiene dificultad real para simplemente ser sin necesidad de producir.' },
      { t: 'p', html: 'Reconocer este patrón es el primer paso para integrarlo. El análisis y el servicio no son errores —son recursos genuinos y valiosos. Significa aprender que el amor no depende de la utilidad, y que pedir ayuda no es una forma de debilidad sino de relación real.' },

      { t: 'h2', id: 'personas-famosas', text: 'Personas famosas con Ascendente en Virgo' },
      { t: 'p', html: 'Varias figuras públicas documentadas tienen el Ascendente en Virgo en su carta natal. El denominador común es visible aunque no se conozca su astrología: una precisión en lo que hacen que distingue su trabajo, combinada con una aparente modestia que no cabe en el molde del "gran protagonista".' },
      { t: 'p', html: '<strong>Madonna</strong> (Ascendente en Virgo) combina una disciplina de trabajo extraordinaria con una atención obsesiva al detalle de sus producciones. Detrás del espectáculo hay una mente analítica que controla cada elemento de la puesta en escena. <strong>Paul McCartney</strong> (Ascendente en Virgo) tiene esa misma precisión: el músico más prolífico de su generación no trabaja desde el caos creativo sino desde el oficio consciente. <strong>Walt Disney</strong> llevó la atención virgiando al extremo de construir mundos donde cada detalle —desde la música hasta el ángulo de las calles de Disneyland— estaba calculado al servicio de la experiencia total.' },
      { t: 'p', html: '<strong>Wolfgang Amadeus Mozart</strong> (Ascendente en Virgo) es quizá el ejemplo más perfecto de la paradoja de este ascendente: una creatividad arrolladora contenida en una forma técnica de una precisión sin igual. El genio no estaba en la improvisación —estaba en la capacidad de llevar la idea a su expresión más perfecta. Lo que une a estas personas no es la modestia sino la convicción de que la calidad del trabajo habla por sí sola.' },

      { t: 'h2', id: 'fortalezas-sombra', text: 'Fortalezas y sombra del Ascendente Virgo' },
      { t: 'p', html: 'Como toda posición astrológica, el Ascendente Virgo tiene una expresión luminosa y una sombra. La diferencia entre ambas no es de carácter sino de integración.' },
      { t: 'ul', items: [
        '<strong>Fortaleza — Análisis y resolución de problemas.</strong> Pocas posiciones astrológicas tienen una capacidad comparable de identificar qué está fallando y cómo arreglarlo. Esta habilidad produce trabajo de calidad real.',
        '<strong>Fortaleza — Servicio genuino.</strong> Ayuda porque puede, no para ser visto. Esta disposición genera confianza real y relaciones duraderas.',
        '<strong>Fortaleza — Atención al detalle.</strong> El mundo funciona bien gracias a personas que cuidan lo que los demás no ven. El Ascendente Virgo es ese custodio.',
        '<strong>Sombra — Crítica interna que nunca calla.</strong> Nada es suficientemente bueno, suficientemente terminado, suficientemente correcto. El perfeccionismo puede impedir comenzar o celebrar lo que ya está bien.',
        '<strong>Sombra — Valor personal vinculado a la utilidad.</strong> Dificultad real para simplemente existir sin producir. Cuando no hay tarea que resolver, aparece la incomodidad.',
        '<strong>Sombra — Hipercrítica hacia los demás.</strong> La misma mirada analítica que mejora el propio trabajo puede volverse juicio sobre los demás, generando distancia en los vínculos.',
      ] },
      { t: 'p', html: 'La integración del Ascendente Virgo no consiste en eliminar el análisis sino en ponerlo al servicio de la vida —no en su contra. La pregunta que orienta el crecimiento: ¿mejoro porque quiero contribuir, o mejoro porque temo que lo imperfecto no sea amado?' },
    ],
    faq: [
      { q: '¿Cómo sé si mi ascendente es Virgo?', a: 'Necesitas tu carta natal, que requiere fecha, hora y ciudad de nacimiento. La calculadora gratuita de carta natal lo calcula automáticamente. El signo solar que conoces de los horóscopos no te dice nada sobre tu ascendente —el ascendente cambia de signo cada dos horas aproximadamente.' },
      { q: '¿Es verdad que el Ascendente Virgo tiene problemas con el perfeccionismo?', a: 'El perfeccionismo es la sombra del Ascendente Virgo, no su esencia. Lo que hay en la raíz es una capacidad real de análisis y un genuino deseo de que las cosas funcionen bien. Cuando eso se vuelve exigencia sin límite —hacia uno mismo o hacia los demás— aparece el perfeccionismo paralizante. Pero integrado, ese mismo impulso produce trabajo excelente.' },
      { q: '¿Qué diferencia hay entre tener Sol en Virgo y Ascendente en Virgo?', a: 'El Sol en Virgo define tu identidad y energía vital consciente —cómo te presentas y hacia dónde te diriges. El Ascendente en Virgo define cómo el mundo te percibe en un primer encuentro y qué forma tiene tu manera de llegar a la vida. Puedes tener Sol en Sagitario y Ascendente en Virgo: por dentro sientes la llamada a la exploración y la expansión, pero por fuera proyectas contención, análisis y precisión.' },
      { q: '¿El Ascendente Virgo es compatible con todos los signos solares?', a: 'Sí. El ascendente modifica la expresión de cualquier Sol, pero no la bloquea. Un Sol en Aries con Ascendente Virgo tendrá la energía y el impulso ariético contenido en una presentación más metódica y analítica. Un Sol en Piscis con Ascendente Virgo encontrará en el ascendente la estructura que el signo solar a veces necesita para materializar su mundo interior.' },
      { q: '¿El Ascendente Virgo cambia con los años?', a: 'El ascendente natal no cambia —es fijo desde el nacimiento. Pero la forma de expresarlo sí evoluciona con el tiempo. En la madurez, el Ascendente Virgo suele integrar mejor la sombra del perfeccionismo y desarrollar más la capacidad de servicio genuino y análisis sin juicio. Los tránsitos planetarios sobre el Ascendente pueden activar momentos de transformación en cómo se llega al mundo.' },
    ],
    ctaFinal: {
      h2: 'Tu Ascendente explicado en el contexto completo de tu carta.',
      p: 'Mercurio en qué casa y qué signo, los aspectos que modifican cómo se expresa este ascendente, y cómo el Mediocielo en Géminis da forma a tu vocación. Todo en un estudio de 45–60 páginas.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'venus-en-virgo': {
    eyebrow: 'Astrología · Venus natal · Tránsito julio–agosto 2026',
    h1: 'Venus en Virgo en la carta natal',
    lead: 'Venus en caída en Virgo no es Venus debilitado. Es Venus que aprendió que el amor no se declara: se hace. Esta posición convierte el afecto en servicio, la atracción en análisis y la belleza en funcionalidad. Del 9 de julio al 6 de agosto de 2026, Venus transita por Virgo y todos los signos sienten esta energía.',
    heroBg: 'var(--ink)',
    readingTime: '10 min',
    blocks1: [
      { t: 'h2', id: 'venus-en-caida', text: 'Venus en caída en Virgo: qué significa en astrología' },
      { t: 'p', html: 'En astrología clásica, cada planeta tiene posiciones donde su energía fluye con facilidad —domicilio y exaltación— y posiciones donde se distorsiona: detrimento y caída. Venus está en exaltación en Piscis, donde puede amar sin condiciones y fluir sin análisis. En el signo exactamente opuesto —Virgo— Venus está en <strong>caída</strong>.' },
      { t: 'p', html: 'Esto no significa que Venus en Virgo sea incapaz de amar. Significa que la energía venusiana —placer, belleza, conexión, flujo sensual— se modifica profundamente al pasar por el filtro virgiando: el análisis, la precisión, la función. El amor que sale de Venus en Virgo no tiene la espontaneidad de Venus en Aries ni el romanticismo idealizador de Venus en Piscis. Pero tiene algo que pocas posiciones tienen: <strong>consistencia real</strong>.' },
      { t: 'p', html: 'La caída describe cómo Venus llega a Virgo sin sus herramientas habituales —no puede simplemente dejarse llevar, no puede amar sin pensar, no puede encontrar belleza sin buscar también la utilidad. Virgo lo hace analizar todo. La pregunta no es si eso destruye el amor, sino si ese análisis puede purificarlo hasta convertirlo en algo duradero.' },
      { t: 'note', html: '<strong>La paradoja de Venus en caída.</strong> Las personas con Venus en Virgo (o en Escorpio, el otro signo donde Venus está en detrimento) suelen construir los vínculos más profundos precisamente porque no aman a la ligera. La "dificultad" clásica no es incapacidad de amar —es incapacidad de amar de manera superficial.' },

      { t: 'h2', id: 'como-ama', text: 'Cómo ama Venus en Virgo: el amor como servicio y acción concreta' },
      { t: 'p', html: 'Venus en Virgo no escribe poemas de amor. Lleva al médico. Investiga si tienes alguna alergia antes de reservar restaurante. Revisa tu CV antes de que lo mandes. Recuerda lo que dijiste hace tres semanas sin que tú lo hayas recordado. El amor aquí no se expresa con palabras —se expresa con <em>hechos concretos y útiles</em>.' },
      { t: 'p', html: 'El signo de Virgo está regido por Mercurio, el planeta del análisis, la comunicación y el procesamiento de información. Cuando Venus opera bajo este regente, la manera de amar se vuelve cerebral, evaluadora y orientada al detalle. No porque la persona sea fría —sino porque el amor, para Venus en Virgo, es ante todo una forma de <strong>atención sostenida</strong>: te miro tan de cerca que noto lo que nadie más nota.' },
      { t: 'p', html: 'Esta orientación al servicio tiene una virtud enorme: la persona con Venus en Virgo está realmente <em>ahí</em>. No de forma espectacular ni con grandes gestos, sino de la manera más práctica y útil. Si tienes a alguien con esta posición que te ayuda sin que lo pidas, que anticipa lo que necesitas, que encuentra soluciones donde otros ofrecen consuelo —eso es Venus en Virgo diciéndote que le importas.' },
      { t: 'p', html: 'La sombra de este patrón es el <strong>autosacrificio</strong>. Venus en Virgo puede entregarse al servicio hasta olvidar sus propias necesidades, especialmente si aprendió en los primeros años que el amor se gana siendo útil, correcto o sin dar trabajo. El trabajo de integración pasa por entender que recibir también forma parte del amor —no solo dar.' },

      { t: 'h2', id: 'lenguaje-del-amor', text: 'Cuando te critica, te quiere: el lenguaje único de Venus en Virgo' },
      { t: 'p', html: 'Una de las señales más características de Venus en Virgo —y quizá la menos entendida— es esta: <strong>cuando alguien con Venus en Virgo empieza a señalarte cosas que podrías mejorar, te está diciendo que le importas</strong>.' },
      { t: 'p', html: 'La crítica constructiva es el idioma del amor de esta posición. No nace de la crueldad ni del juicio —nace del hecho de que el radar evaluador de Virgo se activa especialmente con las personas que le interesan. El análisis minucioso de los demás no es desaprobación: es la forma que tiene Venus en Virgo de involucrarse a fondo con alguien.' },
      { t: 'p', html: 'La señal opuesta es igualmente reveladora: <strong>cuando Venus en Virgo deja de sugerir mejoras, puede significar que ha perdido el interés</strong>. La indiferencia en esta posición es el silencio del análisis. Si alguien deja de observarte con atención, ya no está prestando atención real.' },
      { t: 'p', html: 'Para quien convive con este amor, entender el código hace la diferencia. Lo que se vive como crítica es, en el idioma de Venus en Virgo, una declaración de que mereces que las cosas sean mejores —y que esta persona quiere ser parte de ese proceso. Es amor en el lenguaje de Mercurio: preciso, directo y sin adornos que lo distorsionen.' },

      { t: 'h2', id: 'que-busca', text: '¿Qué busca Venus en Virgo en una relación?' },
      { t: 'p', html: 'Venus en Virgo no busca el gran amor de novela romántica. Busca algo más difícil de encontrar: <strong>alguien en quien confiar de verdad</strong>.' },
      { t: 'ul', items: [
        '<strong>Coherencia entre palabras y actos.</strong> La persona que dice que vendrá y viene. Que promete algo y lo cumple. Venus en Virgo tiene el radar más sensible del zodiaco para detectar la brecha entre lo que alguien dice y lo que hace.',
        '<strong>Que aprecie los detalles.</strong> No necesita grandes gestos —necesita que los gestos pequeños sean vistos. Que noten la comida que preparó, el error que corrigió, la gestión que hizo en silencio.',
        '<strong>Crecimiento compartido.</strong> El estímulo intelectual importa. Una relación donde ambos se mejoran mutuamente, aprenden y se ayudan a ser mejores versiones de sí mismos es el ideal virgiando.',
        '<strong>Honestidad sin drama.</strong> Los enredos emocionales complejos agotan a Venus en Virgo. La comunicación directa y la transparencia son condiciones básicas para que esta posición se sienta segura en un vínculo.',
      ] },
      { t: 'p', html: 'Lo que no tolerará fácilmente: la hipocresía, el desorden emocional crónico, los juegos de poder, las personas que no cumplen lo que dicen. Venus en Virgo es <em>selectivo</em> —puede parecer difícil de conquistar precisamente porque evalúa antes de entregarse. Pero cuando elige, está completamente presente.' },

      { t: 'h2', id: 'el-desafio', text: 'El desafío: el perfeccionismo que paraliza' },
      { t: 'p', html: 'La mayor trampa de Venus en Virgo es el perfeccionismo aplicado al amor. La misma capacidad de análisis que hace a esta persona tan perceptiva puede convertirse en un filtro tan exigente que ninguna relación real lo supera.' },
      { t: 'p', html: 'Venus en Virgo puede pasar años buscando al "compañero perfecto" —alguien sin contradicciones, sin áreas mejorables, sin inconsistencias que el ojo virgiando detecta de inmediato. Y como esa persona no existe, puede quedarse esperando indefinidamente. O puede comprometerse y luego convertir la relación en un proyecto de optimización permanente que agota a quien está del otro lado.' },
      { t: 'p', html: 'También está el sobreanálisis de las propias emociones. Venus en Virgo tiende a <em>pensar</em> el amor en lugar de sentirlo: ¿es esto amor genuino o solo costumbre? ¿Este malestar indica que algo va mal o simplemente estoy cansado? ¿Lo que siento es lo que debería sentir? Este procesamiento continuo puede desmantelar emociones perfectamente válidas antes de que tengan la oportunidad de crecer.' },
      { t: 'p', html: 'La integración de esta sombra no pasa por dejar de analizar —Venus en Virgo <em>siempre</em> analizará. Pasa por aprender que el amor no tiene que superar todos los filtros de la mente para ser real. Que la imperfección no es una señal de alarma sino la textura normal de cualquier vínculo auténtico. Que a veces sentir, sin más, es suficiente.' },

      { t: 'h2', id: 'mujer-hombre', text: 'Venus en Virgo mujer y Venus en Virgo hombre' },
      { t: 'p', html: 'La astrología no asigna cualidades distintas por género —Venus en Virgo tiene la misma energía independientemente del sexo. Pero la manera en que la sociedad recibe esa energía difiere, y eso genera experiencias distintas con una posición idéntica.' },
      { t: 'p', html: 'La <strong>mujer con Venus en Virgo</strong> suele ser percibida como reservada, competente y difícil de conquistar —no porque lo pretenda, sino porque no baja la guardia hasta tener indicios reales de que merece la pena. Su estilo tiende a la elegancia funcional: nada en exceso, nada por pura ornamentación. Puede ser muy crítica con las personas que le importan —y a veces aprende tarde que esa crítica se recibe como juicio cuando ella la vive como cuidado. Su sensualidad es real pero discreta: no se exhibe, se revela lentamente cuando hay confianza construida.' },
      { t: 'p', html: 'El <strong>hombre con Venus en Virgo</strong> se expresa en el amor principalmente a través del servicio: el que arregla lo que está roto, el que recuerda las fechas importantes, el que planifica para que todo salga bien. Puede tener dificultad para verbalizar lo que siente —no porque no lo sienta, sino porque las palabras le parecen menos fiables que los actos. "Te lo estoy diciendo con lo que hago" es su declaración de amor más honesta, y también la que con más frecuencia pasa desapercibida.' },
      { t: 'p', html: 'En ambos casos, el trabajo de integración señala la misma dirección: aprender que las palabras también son una forma de servicio. Que decir "te quiero" en voz alta no resta valor a todo lo que se demuestra con hechos —lo completa y lo hace visible.' },

      { t: 'h2', id: 'infancia-patrones', text: 'Patrones de infancia: el amor que se gana siendo perfecto' },
      { t: 'p', html: 'Venus en la carta natal también guarda información sobre cómo aprendimos a amar y a ser amados en los primeros años —los patrones que configuraron nuestra comprensión del afecto mucho antes de que pudiéramos razonarlo.' },
      { t: 'p', html: 'Con Venus en Virgo, uno de los patrones más frecuentes es haber aprendido que el amor tiene condiciones vinculadas al rendimiento. Puede haber una figura afectiva —no necesariamente los padres, a veces simplemente el ambiente familiar— donde la aprobación estaba ligada a portarse bien, ser útil, no dar trabajo, no ser imperfecto. El amor existía —pero con una capa de evaluación permanente implícita.' },
      { t: 'p', html: 'El resultado en la vida adulta es alguien que <em>sabe exactamente cómo ganarse el afecto de los demás siendo indispensable</em>. Que anticipa las necesidades. Que se hace cargo. Que no pide. Esta capacidad es una fortaleza real —y también una trampa: cuando el amor propio está construido sobre la utilidad, cualquier momento en que no se puede ser útil activa una sensación de que el amor podría retirarse.' },
      { t: 'p', html: 'Reconocer este patrón abre la puerta a un amor diferente: uno donde no hay que ganarse nada, donde estar sin producir, sin servir, sin ser perfecto es suficiente para merecer conexión. Venus en Virgo integrado sabe que el amor no es una transacción —aunque haya tardado en creerlo.' },
    ],
    cta: {
      h3: '¿Venus en Virgo aparece en tu carta natal?',
      body: 'La carta natal interpretada explica tu Venus en el contexto completo de tu mapa: en qué casa cae, cómo interactúa con tu Sol y tu Luna, y qué aspectos modifican la forma en que amas y lo que buscas en una relación.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'tres-posiciones', text: 'Sol en Virgo, Luna en Virgo y Venus en Virgo: tres posiciones distintas' },
      { t: 'p', html: 'Las tres llevan el nombre "Virgo" pero describen ámbitos completamente diferentes de la personalidad. Confundirlas lleva a interpretaciones incorrectas.' },
      { t: 'table', heads: ['Posición', 'Qué describe', 'Cómo se nota'], rows: [
        ['Sol en Virgo', 'Identidad central y propósito de vida', 'En el trabajo que da sentido, la necesidad de ser útil para sentirse completo/a'],
        ['Luna en Virgo', 'Mundo emocional y necesidades de seguridad', 'En cómo procesa las emociones —con análisis—, en la vida privada e íntima'],
        ['Venus en Virgo', 'Amor, vínculos, atracción y valores estéticos', 'En cómo ama y qué busca en una relación, en el gusto estético y lo que valora'],
      ] },
      { t: 'p', html: 'Puedes tener Sol en Aries (identidad directa e impulsiva), Luna en Cáncer (mundo emocional orientado al hogar y la familia) y Venus en Virgo (amor que se expresa a través del servicio y el análisis). Las tres posiciones coexisten y se matizan mutuamente. El Sol describe <em>quién eres</em>; la Luna, <em>cómo sientes</em>; Venus, <em>cómo amas y qué encuentras bello</em>.' },

      { t: 'h2', id: 'famosos', text: 'Personas famosas con Venus en Virgo' },
      { t: 'p', html: 'Varias figuras públicas documentadas tienen Venus en Virgo en su carta natal. El denominador común no es la frialdad que el mito astrológico le atribuye a esta posición —es la <em>precisión llevada al amor y a la creación</em>, la capacidad de servicio total y una exigencia que viene del interior, no de las expectativas del entorno.' },
      { t: 'p', html: '<strong>John Lennon</strong> (Venus en Virgo) escribió algunas de las canciones de amor más precisas y sin adornos de la historia. "Imagine" no es una declaración romántica al uso —es una hoja de ruta para construir un mundo mejor, un proyecto concreto y útil. Típicamente virgiando: el amor como acción transformadora. En su vida personal, la intensidad de sus relaciones tenía esa misma cualidad: "quiero que seas mejor, porque me importas".' },
      { t: 'p', html: '<strong>Kate Winslet</strong> (Venus en Virgo) es conocida en el mundo del cine por una meticulosidad en la preparación de sus personajes que va mucho más allá de lo que se le exige. Aprende idiomas, transforma el cuerpo, investiga hasta entender la psicología de quien va a encarnar. Eso es Venus en Virgo en la creación artística: servicio total al trabajo como forma de amor.' },
      { t: 'p', html: '<strong>Robert De Niro</strong> (Venus en Virgo) llevó esta meticulosidad al extremo: aprendió a conducir taxis reales para <em>Taxi Driver</em>, perdió y ganó peso drásticamente para sus personajes, pasó meses estudiando el lenguaje de barrios específicos. No es vanidad —es exactamente lo contrario: la subordinación completa del yo al servicio de la verdad. <strong>Robin Williams</strong> (Venus en Virgo) tenía en su base un impulso profundo de hacer que los demás estuvieran bien, incluso cuando él no lo estaba. Su comedia era, en el fondo, un servicio —transformar el dolor ajeno en risa. Lo que el mundo percibía como don fue también una forma de amor que dio sin límite ni reciprocidad.' },

      { t: 'h2', id: 'transito-2026', text: 'Tránsito Venus en Virgo julio–agosto 2026: cómo te afecta según tu ascendente' },
      { t: 'p', html: '<strong>Venus entra en Virgo el 9 de julio de 2026 a las 19:19h (hora España)</strong> y permanece en este signo hasta el 6 de agosto. Durante estos 28 días, la energía venusiana —amor, belleza, vínculos, valores— opera bajo el filtro virgiando: análisis, servicio, mejora, precisión.' },
      { t: 'p', html: 'No es un tránsito de grandes romanticismos ni de amor que cae del cielo. Es un período para construir, revisar y profundizar. El tránsito activa una casa diferente en cada carta natal según el ascendente. Aquí tienes lo que Venus en Virgo toca en tu mapa:' },
      { t: 'zodiac', items: [
        { glyph: '♈', name: 'Ascendente Aries', desc: 'Venus transita por tu Casa 6: salud, rutinas y trabajo cotidiano. Momento favorable para cuidar el cuerpo, ordenar hábitos y mejorar el entorno laboral. Los vínculos que se forman ahora tienen una base de compañerismo práctico.' },
        { glyph: '♉', name: 'Ascendente Tauro', desc: 'Venus (tu regente) transita por tu Casa 5: creatividad, placer y amor romántico. Una de las épocas del año más favorables para el amor y la expresión creativa. Lo que inicias ahora tiene potencial real de durar.' },
        { glyph: '♊', name: 'Ascendente Géminis', desc: 'Venus transita por tu Casa 4: hogar, familia y raíces. Buen momento para arreglar el espacio doméstico, sanar dinámicas familiares y reconectar con lo que realmente te nutre en la intimidad.' },
        { glyph: '♋', name: 'Ascendente Cáncer', desc: 'Venus transita por tu Casa 3: comunicación y entorno cercano. Conversaciones significativas, conexiones con personas del entorno inmediato, y una facilidad mayor para expresar lo que normalmente cuesta decir.' },
        { glyph: '♌', name: 'Ascendente Leo', desc: 'Venus transita por tu Casa 2: dinero, valores y autoestima. Momento para revisar la relación con los recursos propios, valorar lo que ya tienes y fortalecer la autoestima desde lo que genuinamente aprecias.' },
        { glyph: '♍', name: 'Ascendente Virgo', desc: 'Venus transita por tu Casa 1: imagen, identidad y presencia. Período de mayor atractivo personal y claridad sobre lo que valoras. Lo que el mundo percibe de ti está especialmente alineado con quien realmente eres.' },
        { glyph: '♎', name: 'Ascendente Libra', desc: 'Venus (tu regente) transita por tu Casa 12: lo oculto, el retiro y la vida interior. Amor que se vive en la intimidad, conexiones espirituales y una necesidad real de cuidar el mundo interno antes que el externo.' },
        { glyph: '♏', name: 'Ascendente Escorpio', desc: 'Venus transita por tu Casa 11: amistades, grupos y proyectos colectivos. Los vínculos con el círculo cercano se fortalecen. Conexiones que empiezan como amistad tienen potencial de profundizarse.' },
        { glyph: '♐', name: 'Ascendente Sagitario', desc: 'Venus transita por tu Casa 10: carrera, reputación y vida pública. Período favorable para proyectos profesionales que requieren cuidado en los detalles, y para conexiones en el ámbito laboral con potencial afectivo.' },
        { glyph: '♑', name: 'Ascendente Capricornio', desc: 'Venus transita por tu Casa 9: viajes, expansión y filosofía. Conexiones con personas de otros contextos culturales o intelectuales, y revisión profunda de lo que crees sobre el amor y las relaciones.' },
        { glyph: '♒', name: 'Ascendente Acuario', desc: 'Venus transita por tu Casa 8: intimidad, recursos compartidos y transformación. Período para profundizar en vínculos existentes, pero también para confrontar lo que está oculto en las relaciones. Intenso y revelador.' },
        { glyph: '♓', name: 'Ascendente Piscis', desc: 'Venus transita por tu Casa 7: relaciones, pareja y contratos. Uno de los tránsitos más activos para la vida afectiva en Piscis. Puede surgir una relación significativa o consolidarse una que ya existe.' },
      ] },

      { t: 'h2', id: 'como-aprovechar', text: 'Cómo aprovechar Venus en Virgo del 9 de julio al 6 de agosto' },
      { t: 'p', html: 'Venus en Virgo es un período para el amor que se construye, no para el que cae del cielo. Lo que este tránsito favorece es útil más que espectacular: conversaciones honestas, mejoras concretas en los vínculos, disposición a ver la realidad de las relaciones sin idealizarlas.' },
      { t: 'ul', items: [
        '<strong>Revisa tus relaciones existentes.</strong> Venus en Virgo no facilita el amor nuevo con la misma espontaneidad que otros tránsitos, pero tiene una capacidad excepcional para profundizar en lo que ya está. Es un buen momento para hablar de lo que no funciona —sin dramatismo, con la precisión que este tránsito favorece.',
        '<strong>Cuida el cuerpo y el espacio.</strong> Venus rige la estética y Virgo rige la salud y el orden. La combinación es ideal para reorganizar el entorno personal, iniciar una rutina de cuidado corporal o revisar hábitos que afectan al bienestar.',
        '<strong>El servicio como expresión de amor.</strong> Durante este tránsito, actuar con el afecto en mente —hacer algo por alguien sin que lo pida— tiene un impacto más profundo de lo habitual. Los gestos concretos y útiles resuenan especialmente.',
        '<strong>Honestidad sobre lo que valoras.</strong> Virgo en el eje venusiano favorece la revisión: qué buscas realmente en las relaciones, qué toleras que ya no deberías, qué mereces que no estás pidiendo. Las respuestas honestas a estas preguntas son el verdadero regalo de este tránsito.',
      ] },
    ],
    faq: [
      { q: '¿Venus en caída en Virgo significa que tengo dificultad para amar?', a: 'No. La caída describe que la energía venusiana se expresa de una manera no convencional —no que sea débil o incapaz. Venus en Virgo ama con profundidad, pero a través del análisis y el servicio en lugar del romanticismo idealizador. Muchas personas con Venus en caída construyen los vínculos más duraderos y comprometidos del zodiaco, precisamente porque no aman a la ligera.' },
      { q: '¿Cómo saber si alguien con Venus en Virgo está interesado en mí?', a: 'La señal más fiable: empieza a prestarte atención de manera práctica. Recuerda lo que dijiste, nota lo que necesitas antes de que lo pidas, te ayuda de formas concretas sin hacer ruido. También puede empezar a señalarte cosas que podrías mejorar —la crítica constructiva es el lenguaje del amor de Venus en Virgo. Paradójicamente, cuando deja de hacerlo puede significar que ha perdido el interés.' },
      { q: '¿Qué diferencia hay entre Venus en Virgo natal y el tránsito de Venus por Virgo?', a: 'Venus en Virgo natal (en la carta de nacimiento) describe tu forma permanente de amar y tus valores afectivos —es una posición fija. El tránsito de Venus por Virgo (que ocurre cada año, durante unas cuatro semanas) activa temas venusianos para todos los signos a través del filtro virgiando. Son dos niveles distintos de la astrología que pueden superponerse o no dependiendo de tu carta.' },
      { q: '¿Por qué Venus en Virgo tarda tanto en comprometerse?', a: 'Porque Virgo evalúa antes de actuar. Venus en Virgo necesita tiempo para observar si la persona es coherente, si cumple lo que dice, si merece la atención y el servicio que está dispuesto a dar. No es miedo al amor en sí —es una selección muy deliberada de a quién se da. Cuando finalmente se compromete, lo hace con una seriedad que pocas posiciones igualan.' },
      { q: '¿Venus en Virgo es compatible con Venus en Piscis?', a: 'El eje Virgo-Piscis es uno de los más interesantes en términos relacionales. Piscis aporta la sensibilidad emocional y la capacidad de idealizar que Virgo no tiene de forma natural; Virgo aporta la estructura y la confiabilidad que Piscis frecuentemente necesita. La complementariedad es real —pero también la incomprensión: Virgo puede sentir que Piscis es demasiado ilusorio; Piscis puede sentir que Virgo es demasiado crítico. El entendimiento pasa por apreciar lo que el otro aporta en lugar de intentar que sea más parecido a uno mismo.' },
    ],
    ctaFinal: {
      h2: 'Tu Venus en el contexto completo de tu carta natal.',
      p: 'En qué casa cae Venus en Virgo, cómo interactúa con tu Sol, tu Luna y el resto de los planetas, y qué dice sobre la forma en que amas y lo que buscas en una relación. Todo explicado en 45–60 páginas, con Swiss Ephemeris y revisión humana.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'venus-en-escorpio': {
    eyebrow: 'Astrología · Venus natal',
    h1: 'Venus en Escorpio en la carta natal',
    lead: 'Venus en Escorpio es la posición que más malentendidos genera en astrología. No es la "mala" Venus ni la "peligrosa" —es la Venus que ama con una intensidad que la mayor parte del mundo no está preparada para sostener. El todo o nada, la profundidad o el vacío, la fusión o la distancia: quien tiene esta posición no conoce el término medio en el amor.',
    heroBg: 'var(--ink)',
    readingTime: '11 min',
    blocks1: [
      { t: 'h2', id: 'venus-detrimento', text: 'Venus en detrimento en Escorpio: ¿debilitado o transformado?' },
      { t: 'p', html: 'En astrología clásica, cada planeta tiene posiciones donde su energía fluye con facilidad —domicilio y exaltación— y posiciones donde se distorsiona: detrimento y caída. Venus tiene dos signos de detrimento: Aries (opuesto a Libra) y Escorpio (opuesto a Tauro). El detrimento no significa que el planeta esté roto —significa que la energía del planeta y la del signo van en direcciones naturalmente opuestas, creando una tensión que hay que resolver activamente.' },
      { t: 'p', html: 'Venus ama la belleza serena, el placer sin complicaciones, la armonía y la paz. Escorpio opera en las aguas profundas de la psique: las verdades ocultas, la transformación a través de la crisis, el poder y su sombra. Cuando Venus llega a Escorpio, su impulso hacia el placer fácil y la belleza superficial se disuelve. Lo que queda es algo mucho más difícil de manejar —y mucho más real: <strong>un amor que no puede quedarse en la superficie porque Escorpio es incapaz de hacerlo</strong>.' },
      { t: 'p', html: 'El detrimento crea la sensación, especialmente en la juventud, de que hay algo "demasiado" en cómo se quiere o se desea. Demasiada intensidad, demasiados celos, demasiada necesidad de profundidad, demasiado dolor cuando algo se rompe. Con el tiempo, quien aprende a trabajar con esta posición descubre que ese "demasiado" no era un defecto —era la señal de que el amor, para esta Venus, no es decoración sino la experiencia más transformadora de la vida.' },
      { t: 'note', html: '<strong>La paradoja de Venus en detrimento.</strong> Venus en Escorpio puede construir los vínculos más duraderos y transformadores precisamente porque no puede amar de forma ligera. La "dificultad" clásica no es incapacidad de amar —es incapacidad de amar sin comprometerse completamente. Cuando esta Venus elige, elige de verdad.' },

      { t: 'h2', id: 'como-ama', text: 'Cómo ama Venus en Escorpio: el amor como fusión total' },
      { t: 'p', html: 'Venus en Escorpio no quiere conocerte. Quiere entenderte a un nivel que ni tú mismo has llegado todavía. Quiere ver lo que hay detrás de la máscara, lo que ocultas, lo que temes, lo que deseas y lo que te da vergüenza desear. Para esta Venus, el amor no empieza hasta que se llega a esa profundidad —todo lo anterior es simplemente el preámbulo.' },
      { t: 'p', html: 'Esta orientación tiene una consecuencia práctica inmediata: <strong>Venus en Escorpio tarda en entregarse pero, cuando lo hace, es totalmente</strong>. No hay amor a medias, no hay "estamos viendo qué pasa", no hay una relación donde la incertidumbre sea cómoda. Esta posición exige y ofrece al mismo tiempo: exige la misma profundidad e intensidad que da, y cuando la encuentra, la reciprocidad es absoluta.' },
      { t: 'p', html: 'El regente de Escorpio —Marte y Plutón— añade una dimensión de poder a la manera en que esta Venus se vincula. No es un poder manipulador en la mayoría de los casos: es la consciencia de que en cualquier relación profunda existen dinámicas de poder, y Venus en Escorpio las ve con una claridad que puede resultar incómoda para quienes prefieren no mirarlas. Esta posición sabe cuándo alguien tiene poder sobre ella —y eso genera a la vez atracción y vigilancia.' },
      { t: 'p', html: 'La sensualidad de Venus en Escorpio es real y profunda. A diferencia de Venus en Tauro (placer sensorial puro) o Venus en Leo (placer como espectáculo), Venus en Escorpio experimenta el erotismo como una forma de unión que trasciende lo físico. La intimidad, para esta posición, es siempre un punto de contacto con algo más intenso: con la vulnerabilidad del otro, con la propia, con la sensación de que en esa entrega hay algo que se parece a la verdad.' },

      { t: 'h2', id: 'todo-o-nada', text: 'El todo o nada: por qué Venus en Escorpio no acepta términos medios' },
      { t: 'p', html: 'Si existe una frase que define a Venus en Escorpio en el amor es esta: <em>todo o nada</em>. No es una postura ni una estrategia de negociación. Es literalmente la única forma en que esta Venus puede operar —y uno de los mayores desafíos de integrar esta posición consiste precisamente en aceptarlo sin intentar suavizarlo.' },
      { t: 'p', html: 'Una relación donde esta persona invierte el 60% no existe, en términos emocionales reales. O estás adentro —y adentro significa profundidad, exclusividad emocional, acceso a las capas más reales de la otra persona— o la relación es básicamente una performance vacía. Venus en Escorpio puede mantener esa performance durante un tiempo, especialmente si aprendió que mostrar su intensidad tiene consecuencias negativas. Pero internamente el 60% se vive como una mentira.' },
      { t: 'p', html: 'Esta estructura de todo-o-nada también explica la intensidad de las rupturas con Venus en Escorpio. Cuando una relación importante termina, no es solo la pérdida de una persona —es la pérdida de una parte del sí mismo que se había entregado completamente. El duelo en esta posición es profundo y largo no porque sea emocionalmente débil sino porque la entrega fue total y real.' },
      { t: 'p', html: 'La otra cara de esta moneda: <strong>cuando Venus en Escorpio te elige, lo sabes</strong>. No hay ambigüedad, no hay mensajes mixtos, no hay "creo que le gusto pero no estoy seguro". Esta posición comunica su vínculo con una claridad que pocas personas experimentan de otros, y esa certeza puede ser, paradójicamente, lo más liberador que alguien haya vivido en el amor.' },

      { t: 'h2', id: 'sombra-celos', text: 'El lado sombra: celos, control y la herida de la traición' },
      { t: 'p', html: 'Hablar de Venus en Escorpio sin hablar de los celos sería deshonesto. Los celos no son el rasgo definitorio de esta posición, pero son la sombra más frecuente cuando no se ha trabajado —y la que más daño puede causar tanto a la persona como a sus relaciones.' },
      { t: 'p', html: 'El origen de los celos en Venus en Escorpio no es la inseguridad simple. Es algo más complejo: como esta Venus se entrega completamente, el miedo a la traición es proporcional a esa entrega. <em>Si di todo, perder esto sería devastador</em> —y ese pensamiento se convierte, cuando no se gestiona, en vigilancia permanente, en necesidad de saber, en interpretaciones de señales que quizá no existen.' },
      { t: 'p', html: 'La misma agudeza perceptiva que hace a Venus en Escorpio tan efectiva leyendo a las personas puede convertirse en una trampa: detecta microseñales reales, pero también puede construir historias sobre microseñales inexistentes. La diferencia entre intuición válida y paranoia es una de las líneas más difíciles de trazar para esta posición, y aprender a distinguirlas es un trabajo genuinamente difícil.' },
      { t: 'p', html: 'La sombra del control también es real. Venus en Escorpio puede intentar mantener el vínculo seguro controlando la relación —la información, los accesos, el ritmo, incluso las emociones del otro. Esto suele venir de un lugar de miedo, no de maldad, pero el efecto sobre la otra persona puede ser asfixiante. El camino de integración pasa por aprender que el control es una ilusión: la profundidad que Venus en Escorpio busca solo es posible donde hay libertad real.' },
      { t: 'p', html: '<strong>La herida de la traición</strong> merece mención aparte. Venus en Escorpio que ha vivido una traición —una infidelidad, una mentira profunda, una pérdida de confianza fundamental— no la olvida fácilmente. El dolor es de una intensidad que otras Venus no comprenden del todo, porque el nivel de entrega que existía previamente era proporcional. Sanar esta herida es posible —pero exige tiempo, honestidad total y un trabajo genuino sobre la confianza.' },

      { t: 'h2', id: 'infancia', text: 'Patrones de infancia: de dónde viene esta intensidad' },
      { t: 'p', html: 'Venus en la carta natal guarda memoria de los primeros modelos de amor —los patrones que configuraron la comprensión del afecto mucho antes de que la persona pudiera razonarlo.' },
      { t: 'p', html: 'Con Venus en Escorpio, uno de los patrones más frecuentes en la historia temprana es el amor que vino mezclado con poder, secreto o pérdida. Puede haber una figura afectiva que amaba con intensidad pero también con control. O amor que existía pero no se verbalizaba, que había que interpretar a través de señales. O una experiencia de pérdida o traición temprana que enseñó al sistema nervioso que el amor siempre implica riesgo real.' },
      { t: 'p', html: 'El resultado en la vida adulta es una persona que sabe, a nivel profundo, que el amor puede doler de maneras que van más allá de lo ordinario —y que por tanto protege su vulnerabilidad hasta tener evidencia sólida de que la otra persona es de fiar. La dificultad de Venus en Escorpio para confiar no es capricho: es una respuesta aprendida que en su momento fue adaptativa.' },
      { t: 'p', html: 'El trabajo de integración pasa por diferenciar el pasado del presente. No todas las personas que se acercan traen consigo el patrón que hizo daño antes. Venus en Escorpio integrado puede ser profundamente leal y confiado —pero llega a ese lugar habiendo atravesado, no evitado, la sombra.' },
    ],
    cta: {
      h3: '¿Venus en Escorpio aparece en tu carta natal?',
      body: 'La carta natal interpretada explica tu Venus en el contexto completo de tu mapa: en qué casa cae, cómo dialoga con tu Sol y tu Luna, y qué aspectos modifican la forma en que amas y cuál es tu patrón de vínculo más profundo.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'mujer-hombre', text: 'Venus en Escorpio mujer y Venus en Escorpio hombre' },
      { t: 'p', html: 'La energía de Venus en Escorpio es la misma con independencia del género, pero la manera en que la sociedad recibe esa energía produce experiencias distintas.' },
      { t: 'p', html: 'La <strong>mujer con Venus en Escorpio</strong> suele ser percibida como magnética e intensa —a veces casi amenazante para quienes buscan vínculos más ligeros. Tiene una presencia que no pasa desapercibida: incluso cuando calla, hay algo en su manera de mirar y escuchar que comunica que está procesando mucho más de lo que dice. Su atractivo no es solo físico: es la promesa de profundidad, de un encuentro que va a dejar huella. La trampa que puede vivir es atraer a personas que quieren esa profundidad pero no están preparadas para el nivel de honestidad que ella exige —y repetir una y otra vez la experiencia de ser elegida al principio y abandonada cuando la cosa se pone real.' },
      { t: 'p', html: 'El <strong>hombre con Venus en Escorpio</strong> tiene una capacidad de vínculo emocional que pocas posiciones masculinas tienen de forma tan explícita. Ama con una intensidad que puede sorprender incluso a quien lo recibe. La dificultad que enfrenta es la de un entorno que históricamente no ha dado espacio para esa profundidad emocional masculina: puede haber aprendido a ocultar la intensidad, a expresar el amor a través del control o la pasión física en lugar de la vulnerabilidad directa. El hombre con Venus en Escorpio que ha trabajado esta sombra tiene una capacidad de presencia y compromiso emocional que pocas personas de cualquier género pueden igualar.' },
      { t: 'p', html: 'En ambos casos el patrón central es el mismo: el amor como apuesta total. Y el trabajo de integración señala en la misma dirección: aprender a confiar sin certezas, a entregarse sin garantías, a reconocer que la profundidad que buscan no puede coexistir con el control que a veces intentan mantener.' },

      { t: 'h2', id: 'compatibilidad', text: 'Compatibilidad de Venus en Escorpio con otros Venus' },
      { t: 'p', html: 'La compatibilidad entre posiciones de Venus no es una fórmula exacta —depende de la carta natal completa. Pero el signo de Venus sí indica el estilo de amor de cada persona, y algunos estilos resuenan con Venus en Escorpio de forma más natural que otros.' },
      { t: 'table', heads: ['Venus de la otra persona', 'Dinámica con Venus en Escorpio'], rows: [
        ['Venus en Escorpio', 'Intensidad total compartida. El mayor riesgo es que ambos activen mutuamente los peores patrones de control y celos. Con madurez, la comprensión mutua es profunda.'],
        ['Venus en Piscis', 'Alta resonancia. Piscis ofrece la entrega sin límites que Escorpio busca, y Escorpio da la profundidad que Piscis necesita. El riesgo: ambos pueden perderse en el vínculo.'],
        ['Venus en Cáncer', 'Buena base emocional. Cáncer ama con protección y lealtad, que Escorpio valora. Cáncer puede verse abrumado por la intensidad de Escorpio si no hay comunicación clara.'],
        ['Venus en Capricornio', 'Compatibilidad alta a largo plazo. Capricornio da la lealtad y la estructura que Escorpio necesita. La frialdad aparente de Capricornio puede activar los miedos de abandono de Escorpio.'],
        ['Venus en Tauro', 'Oposición astrológica: tensión y atracción simultáneas. Tauro busca estabilidad y placer simple; Escorpio busca transformación profunda. Pueden complementarse o chocar.'],
        ['Venus en Aries', 'Mucha energía, pero ritmos distintos. Aries ama con impulsividad y libertad; Escorpio necesita profundidad y exclusividad. Puede funcionar si ambos respetan los estilos del otro.'],
        ['Venus en Géminis', 'Difícil a largo plazo. La ligereza y variedad que Géminis necesita choca con la profundidad e intensidad que Escorpio exige. Intelectualmente estimulante, emocionalmente frustrante.'],
        ['Venus en Sagitario', 'La libertad que Sagitario necesita activa los miedos de Escorpio. El peso emocional de Escorpio puede sentirse como una carga para Sagitario. Requiere mucho trabajo consciente.'],
      ] },

      { t: 'h2', id: 'evolucion', text: 'La evolución: Venus en Escorpio antes y después de los 30' },
      { t: 'p', html: 'Venus en Escorpio es una de las posiciones que más cambia con la madurez —y donde hay más diferencia entre cómo vive el amor antes y después de haber atravesado sus propias sombras.' },
      { t: 'p', html: '<strong>Antes de los 30</strong> (aproximadamente), Venus en Escorpio suele expresarse a través de su polaridad más reactiva: la intensidad sin filtro, los celos activos, el todo-o-nada aplicado con rigidez, la necesidad de fusión que puede volverse dependencia. También puede aparecer el extremo contrario: la coraza de frialdad absoluta como mecanismo de defensa contra una vulnerabilidad que no sabe cómo proteger de otra manera. Muchas personas con esta posición oscilan entre los dos extremos: entrega total o cierre total, sin término medio.' },
      { t: 'p', html: '<strong>Después de los 30</strong> —o más precisamente, después del primer Retorno de Saturno (entre los 28 y los 30 años)— Venus en Escorpio suele empezar a integrar su sombra de manera más consciente. La intensidad no desaparece —nunca desaparece— pero empieza a dirigirse de forma más selectiva. La persona aprende a confiar en su propia intuición sin confundirla con paranoia. Los celos se vuelven información en lugar de reacción. La necesidad de profundidad se convierte en discernimiento: no cualquier persona merece esa apertura.' },
      { t: 'p', html: 'Venus en Escorpio maduro tiene una capacidad de intimidad genuina que pocas posiciones pueden igualar. Ha aprendido que la verdadera profundidad en el amor requiere vulnerabilidad —y que la vulnerabilidad no es debilidad sino la condición necesaria para cualquier conexión que valga algo. Ese aprendizaje no llega gratis, pero cuando llega, transforma la manera de amar de una forma que ya no se puede deshacer.' },

      { t: 'h2', id: 'tres-posiciones', text: 'Sol en Escorpio, Luna en Escorpio y Venus en Escorpio: tres posiciones distintas' },
      { t: 'p', html: 'Las tres llevan el nombre "Escorpio" pero describen ámbitos completamente distintos de la personalidad. Tener Venus en Escorpio no significa tener rasgos de Escorpio en todo —solo en el amor, la atracción y los valores.' },
      { t: 'table', heads: ['Posición', 'Qué describe', 'Cómo se nota'], rows: [
        ['Sol en Escorpio', 'Identidad central y propósito de vida', 'En la necesidad de transformación continua, en el poder de la voluntad, en la relación con lo oculto y profundo como tema de vida'],
        ['Luna en Escorpio', 'Mundo emocional y necesidades de seguridad', 'En la intensidad emocional privada, en la dificultad para olvidar, en la necesidad de vínculos profundos para sentirse seguro/a'],
        ['Venus en Escorpio', 'Amor, vínculos, atracción y valores estéticos', 'En cómo ama —con intensidad total y profundidad—, en lo que busca en una relación y en la manera en que experimenta el atractivo'],
      ] },
      { t: 'p', html: 'Puedes tener Sol en Cáncer (identidad orientada al hogar y la familia), Luna en Capricornio (emociones contenidas, seguridad a través de la estructura) y Venus en Escorpio (amor profundo e intenso, atracción hacia lo misterioso). Las tres posiciones coexisten y se modulan mutuamente. Lo que define el estilo de amor es Venus —no el Sol ni la Luna.' },

      { t: 'h2', id: 'famosos', text: 'Personas famosas con Venus en Escorpio' },
      { t: 'p', html: 'Varias figuras públicas documentadas tienen Venus en Escorpio en su carta natal. El patrón que aparece con más frecuencia no es el estereotipo de la persona posesiva y destructiva —es algo más interesante: personas que canalizan la profundidad de esta posición hacia una entrega total en su arte, sus relaciones o ambas cosas.' },
      { t: 'p', html: '<strong>Joaquin Phoenix</strong> (28 de octubre de 1974) tiene Venus en Escorpio. Su manera de habitar los personajes —siempre en las capas más oscuras y complejas de la psique humana— refleja directamente la energía de esta posición: la búsqueda de verdad sin ornamentación, la incomodidad con lo superficial, la necesidad de ir hasta el fondo de cualquier cosa que valga la pena.' },
      { t: 'p', html: '<strong>Leonardo DiCaprio</strong> (11 de noviembre de 1974) también tiene Venus en Escorpio. Su trayectoria artística muestra la misma pauta: personajes complejos, moralmente ambiguos, obsesionados con algo. La selectividad y la intensidad de sus relaciones personales han sido dos de sus rasgos más comentados públicamente —ambos característicos de Venus en Escorpio.' },
      { t: 'p', html: '<strong>Demi Moore</strong> (11 de noviembre de 1962) tiene Venus en Escorpio, y su historia de vida es una de las más ilustrativas de esta posición: transformaciones profundas y dolorosas, relaciones de una intensidad que rara vez pasó desapercibida, y una capacidad de reinventarse que no viene de la ligereza sino de haber atravesado la oscuridad. Su autobiografía <em>Inside Out</em> (2019) es, en muchos sentidos, un documento de Venus en Escorpio integrando su sombra.' },
    ],
    faq: [
      {
        q: '¿Venus en Escorpio es compatible con Venus en Tauro?',
        a: 'Son signos opuestos, lo que en astrología genera simultáneamente atracción y tensión. Venus en Tauro busca estabilidad, placer sensorial y tranquilidad; Venus en Escorpio busca profundidad, transformación e intensidad. Pueden complementarse si cada uno valora lo que el otro aporta, pero también pueden chocar si Tauro vive la intensidad de Escorpio como una amenaza a su calma, o si Escorpio vive la placidez de Tauro como superficialidad. La compatibilidad depende de la carta completa de ambas personas.',
      },
      {
        q: '¿Venus en Escorpio es fiel?',
        a: 'Venus en Escorpio tiene una de las mayores capacidades de lealtad del zodiaco cuando está comprometido en un vínculo que siente como real y profundo. El problema no es la infidelidad en la mayoría de los casos —el problema es que esta posición exige un nivel de profundidad que, si no lo encuentra en la relación actual, puede buscar en otro lugar. Cuando Venus en Escorpio está verdaderamente comprometido, la lealtad es casi incondicional.',
      },
      {
        q: '¿Por qué Venus en Escorpio tiene fama de celoso?',
        a: 'Los celos de Venus en Escorpio nacen de la intensidad de su entrega. Como esta posición da todo en el amor, el miedo a perderlo es proporcional. Los celos también tienen un componente de la agudeza perceptiva propia de Escorpio: detecta señales que otros no verían, lo que puede convertirse en paranoia si no se trabaja. La clave es aprender a distinguir la intuición genuina de la proyección del miedo.',
      },
      {
        q: '¿Cómo saber si tengo Venus en Escorpio?',
        a: 'Venus en Escorpio aparece en la carta natal cuando Venus estaba en el signo de Escorpio en el momento de tu nacimiento, independientemente de cuál sea tu signo solar. Venus visita Escorpio aproximadamente del 23 de octubre al 16 de noviembre cada año, aunque las fechas varían ligeramente según el año. Para saberlo con exactitud necesitas calcular tu carta natal con tu fecha, hora y lugar de nacimiento exactos.',
      },
      {
        q: '¿Dos personas con Venus en Escorpio son compatibles?',
        a: 'Pueden serlo enormemente —o pueden activar mutuamente los patrones más reactivos de esta posición. Dos personas con Venus en Escorpio se entienden a un nivel de profundidad que pocas parejas experimentan: saben exactamente qué está sintiendo el otro y tienen la misma necesidad de intensidad real. El riesgo es que cuando hay conflicto, ambos pueden activarse mutuamente en la espiral de celos y herida. Con consciencia y trabajo, es una de las combinaciones con mayor potencial de profundidad genuina.',
      },
    ],
    ctaFinal: {
      h2: 'Descubre dónde está tu Venus y qué significa',
      p: 'La posición de Venus en tu carta natal explica cómo amas, qué buscas en una relación y qué encuentras verdaderamente atractivo. La carta natal interpretada analiza tu Venus en el contexto completo de tu mapa.',
      href: '/carta-natal/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'venus-en-geminis': {
    eyebrow: 'Astrología · Venus natal',
    h1: 'Venus en Géminis en la carta natal',
    lead: 'Venus en Géminis ama con la mente. Antes de que el corazón decida nada, ya está la conversación, el intercambio de ideas, la risa compartida y la curiosidad que se abre hacia el otro como quien abre un libro interesante. Quien tiene esta posición en su carta natal no se enamora de perfiles estáticos: se enamora de personas que siguen siendo sorprendentes, que dicen cosas que no había escuchado antes, que hacen que el tiempo se pase volando sin que nadie haya calculado cuánto ha durado.',
    readingTime: '12 min',
    blocks1: [
      { t: 'h2', id: 'venus-geminis-descripcion', text: 'Venus en Géminis: el amor que necesita palabras' },
      { t: 'p', html: 'En astrología, Venus describe la manera en que una persona ama, lo que le resulta atractivo y cómo experimenta el placer y la belleza. Cuando Venus habita en Géminis —el signo del aire regido por Mercurio— estas funciones quedan impregnadas de la energía mercurial: la comunicación, la variedad, la adaptabilidad y el pensamiento ágil.' },
      { t: 'p', html: 'Géminis es el signo de los gemelos, de la dualidad, de la capacidad de ver las dos caras de cualquier moneda. Cuando Venus llega a este signo, el amor se vuelve un proceso cognitivo y relacional al mismo tiempo: <strong>no basta con sentir la atracción, hace falta también entenderla, hablarla, explorarla desde distintos ángulos</strong>. Venus en Géminis no sabe bien cómo amar en silencio —el amor que no se puede expresar en palabras le resulta difuso, casi irreal.' },
      { t: 'p', html: 'Esto no significa que Venus en Géminis sea frívolo o incapaz de profundidad. Significa que la profundidad llega a través del lenguaje y del pensamiento compartido. Las conversaciones de medianoche, los mensajes que llegan en el momento exacto, el humor que solo dos personas entienden porque comparten una referencia —eso es amor para Venus en Géminis, y puede ser tan profundo como cualquier otra forma de querer.' },
      { t: 'note', html: '<strong>Géminis como signo doble.</strong> El símbolo de los gemelos no implica que Venus en Géminis sea "una persona diferente según el día" —aunque esa simplificación circule mucho en astrología pop. Lo que el símbolo describe es la capacidad de contener perspectivas múltiples, de adaptarse a interlocutores distintos, de encontrar el hilo de conexión con personas muy diferentes. Es una inteligencia relacional, no inconstancia de carácter.' },

      { t: 'h2', id: 'como-ama', text: 'Cómo ama Venus en Géminis: la conversación como seducción' },
      { t: 'p', html: 'Para Venus en Géminis, la seducción empieza mucho antes del contacto físico. Empieza con la conversación. Una persona que dice algo inesperado, que tiene perspectivas propias sobre las cosas, que puede hablar de cualquier tema con curiosidad genuina —eso es más atractivo para esta posición que la apariencia física más convencional. La inteligencia conversacional es, para Venus en Géminis, el mayor afrodisíaco.' },
      { t: 'p', html: 'En una relación establecida, esta posición necesita que el intercambio no se detenga. Las parejas que comparten libros, artículos, ideas, que se mandan mensajes a lo largo del día, que pueden hablar de cualquier cosa y también de nada en particular —esas relaciones son las que Venus en Géminis sostiene con más facilidad. <strong>El silencio no le da seguridad: le produce la sensación de que algo ha dejado de moverse</strong>, y para esta posición el movimiento y la variedad son la señal de que el vínculo está vivo.' },
      { t: 'p', html: 'El humor es un componente central del amor de Venus en Géminis. No el humor superficial del chiste fácil, sino la capacidad de encontrar el lado absurdo de las cosas, de hacer reír en el momento inesperado, de compartir una referencia que nadie más entendería. Cuando Venus en Géminis hace reír a alguien que le gusta, es un acto íntimo de primer orden.' },
      { t: 'p', html: 'Esta posición también ama con una libertad que puede desconcertar a las posiciones más fijas del zodiaco. No necesita poseer a la persona que quiere, ni monitorizar sus movimientos, ni garantías de exclusividad que lleguen de forma prematura. Confía en el vínculo cuando este se siente vivo y presente —y tiende a desconfiar más de las estructuras de control que del propio vínculo.' },

      { t: 'h2', id: 'lenguaje-amor', text: 'El lenguaje del amor: palabras de afirmación, mensajes y detalles mentales' },
      { t: 'p', html: 'El concepto de los "cinco lenguajes del amor" (Gary Chapman) encaja de forma casi literal con Venus en Géminis: esta posición habla, sobre todo, el lenguaje de las <strong>palabras de afirmación</strong>. Decirle que importa, contarle lo que piensas de él o ella, enviarle el artículo que te recordó a una conversación de hace tres semanas, escribir un mensaje largo a las once de la noche porque se te ocurrió algo —eso es amor en el vocabulario de Venus en Géminis.' },
      { t: 'p', html: 'Los mensajes de texto son, para esta posición, una extensión natural del vínculo. No como sustituto de la presencia, sino como forma de mantener el hilo activo entre encuentros. Un buen meme enviado en el momento exacto puede valer más que un regalo elaborado. La precisión del timing —saber cuándo aparecer con la palabra justa— es una habilidad que Venus en Géminis desarrolla de forma casi instintiva.' },
      { t: 'p', html: 'Lo que esta posición da con más facilidad es también lo que más le importa recibir. Venus en Géminis se siente profundamente querido cuando alguien le dedica atención intelectual —cuando le hace preguntas de verdad, cuando recuerda lo que dijo y lo recupera en otra conversación, cuando elige compartir con él o ella algo que sabe que le va a interesar. <strong>La atención intelectual es, para Venus en Géminis, la forma más íntima de cuidado</strong>.' },

      { t: 'h2', id: 'sombra', text: 'La sombra: infidelidad emocional y el miedo al aburrimiento' },
      { t: 'p', html: 'Todo planeta tiene una sombra —el lado de su energía que aparece cuando no está integrada. En Venus en Géminis, la sombra más frecuente no es la infidelidad física (aunque puede ocurrir), sino la <strong>infidelidad emocional</strong>: la tendencia a mantener conexiones intensas con varias personas de forma simultánea, sin que ninguna llegue a tener toda la profundidad que el vínculo merece.' },
      { t: 'p', html: 'El miedo al aburrimiento es el motor que mueve esa sombra. Venus en Géminis puede interpretar el momento en que una relación deja de ser novedad como señal de que algo ha muerto —cuando en realidad puede ser simplemente que la relación ha llegado a una fase diferente, más profunda pero menos estimulante en la superficie. La trampa es salir en busca del siguiente estímulo antes de haber agotado las posibilidades del que ya existe.' },
      { t: 'p', html: 'Otra expresión de la sombra es la dificultad para tomar decisiones afectivas. Venus en Géminis puede ver con tanta claridad los pros y los contras de cualquier opción que le resulta genuinamente difícil elegir. Esto puede manifestarse como procrastinación emocional, como mantener relaciones en una zona gris indefinida o como una tendencia a reabrir vínculos que ya habían terminado porque "todavía había cosas interesantes por explorar".' },
      { t: 'p', html: '<strong>La dispersión</strong> es quizá el patrón más cotidiano de esta sombra. Tener demasiados frentes abiertos —amistades, intereses, proyectos, conversaciones— puede hacer que ningún vínculo reciba la atención suficiente para profundizar de verdad. No por mala intención, sino porque la energía de Géminis es horizontal por naturaleza y aprender a ir hacia abajo (hacia la profundidad) requiere un trabajo consciente.' },

      { t: 'h2', id: 'infancia', text: 'Patrones de infancia: el origen de la necesidad de variedad' },
      { t: 'p', html: 'Venus en la carta natal registra los primeros aprendizajes sobre el amor —los modelos tempranos que configuraron qué significa querer y ser querido antes de que se pudiera reflexionar sobre ello.' },
      { t: 'p', html: 'Con Venus en Géminis, uno de los patrones que aparece con cierta frecuencia es haber crecido en un entorno donde el afecto se expresaba principalmente a través de la conversación y la estimulación intelectual —hogares donde los libros, las discusiones de sobremesa y el intercambio de ideas eran la forma de vincularse. El amor llegaba a través de la mente, y eso configuró una Venus que busca esa misma forma de conexión en sus relaciones adultas.' },
      { t: 'p', html: 'En otros casos, el patrón puede venir del lado contrario: un entorno donde el afecto era impredecible o inconsistente, lo que llevó al desarrollo de una adaptabilidad defensiva —aprender a ser lo que la situación necesitaba, a leer el ambiente y ajustarse. Esta adaptabilidad es una fortaleza real de Venus en Géminis, pero puede convertirse en dificultad para ser plenamente uno mismo en los vínculos cuando la situación lo exige.' },
      { t: 'p', html: 'El trabajo de integración pasa por aprender que la profundidad no es enemiga de la variedad. Que quedarse —en un tema, en una persona, en un vínculo— no cierra las puertas sino que las abre hacia dentro. Venus en Géminis que ha hecho este recorrido descubre que la conversación más interesante de su vida puede ser la que lleva veinte años teniendo con la misma persona.' },
    ],
    cta: {
      h3: '¿Venus en Géminis aparece en tu carta natal?',
      body: 'La carta natal interpretada analiza tu Venus en el contexto completo de tu mapa: en qué casa cae, cómo dialoga con tu Sol y tu Luna, y qué aspectos modifican la forma en que amas y te vinculas.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'mujer-hombre', text: 'Venus en Géminis mujer y Venus en Géminis hombre' },
      { t: 'p', html: 'La energía de Venus en Géminis es la misma independientemente del género, pero la forma en que el entorno la recibe produce experiencias distintas.' },
      { t: 'p', html: 'La <strong>mujer con Venus en Géminis</strong> tiene una presencia magnética que no viene de la intensidad emocional sino de la inteligencia relacional. Es la persona que recuerdas de una reunión no porque dijera lo más profundo, sino porque dijo exactamente lo más apropiado en el momento más exacto. Puede resultar difícil de leer para quienes buscan señales emocionales convencionales —no porque no sienta, sino porque sus emociones llegan a través del pensamiento. En el amor, busca a alguien que pueda seguirle el ritmo mental y que no interprete su necesidad de espacio como desinterés.' },
      { t: 'p', html: 'El <strong>hombre con Venus en Géminis</strong> seduce con el ingenio y la conversación. Tiene la capacidad de hacer sentir a cualquier persona que es la más interesante del mundo durante el tiempo que le dedica su atención —y eso es enormemente atractivo. Su desafío es aprender a mantener esa atención cuando la relación entra en una fase más estable, y a no buscar en terceras personas el estímulo que puede encontrar, con algo más de esfuerzo, dentro del vínculo que ya tiene.' },
      { t: 'p', html: 'En ambos casos, el denominador común es el mismo: la necesidad de un amor que también sea amistad, conversación y compañía mental. Venus en Géminis —hombre o mujer— no distingue bien entre los mejores amigos y los grandes amores. La línea es permeable. Y eso no es una debilidad: es la forma particular en que esta posición construye los vínculos más duraderos.' },

      { t: 'h2', id: 'estilo', text: 'Estética y estilo: la versatilidad como firma' },
      { t: 'p', html: 'Venus rige también la dimensión estética —cómo una persona se viste, qué ambientes le atraen, cuál es su relación con la belleza. Venus en Géminis tiene una relación con la estética marcada por la versatilidad y la curiosidad: no tiene un estilo único porque no cree que deba tenerlo.' },
      { t: 'p', html: 'Puede ir de lo minimalista a lo ecléctico en la misma semana sin sentir contradicción. Le atrae lo que cuenta una historia, lo que tiene capas de significado, lo que invita a la conversación. Un accesorio con historia, una prenda con origen interesante, un look que cita referencias que no todo el mundo va a reconocer —eso es Venus en Géminis en modo estético.' },
      { t: 'p', html: 'Los colores que tienden a resonar con esta posición son los que comunican ligereza y movimiento: amarillos, turquesas, plateados, blanco puro. Pero más que una paleta fija, lo que caracteriza el estilo de Venus en Géminis es que nunca termina de definirse del todo —y eso, lejos de ser un problema, es parte de su atractivo. Siempre hay algo nuevo que descubrir.' },

      { t: 'h2', id: 'compatibilidad', text: 'Compatibilidad de Venus en Géminis con otros Venus' },
      { t: 'p', html: 'La compatibilidad entre posiciones de Venus no es una fórmula cerrada —la carta natal completa siempre matiza. Pero el signo de Venus indica el estilo afectivo de cada persona, y algunos estilos resuenan con Venus en Géminis de forma más natural que otros.' },
      { t: 'table', heads: ['Venus de la otra persona', 'Dinámica con Venus en Géminis'], rows: [
        ['Venus en Aries', 'Buena dinámica de base. Aries aporta dirección y energía; Géminis aporta variedad intelectual. Ambos se aburren de lo predecible. El riesgo es que ninguno quiera quedarse a trabajar lo que requiere más lentitud.'],
        ['Venus en Tauro', 'Ritmos muy distintos. Tauro necesita estabilidad y constancia; Géminis necesita movimiento y cambio. Lo que para Tauro es la seguridad deseada, para Géminis puede sentirse como estancamiento. Requiere mucho trabajo consciente.'],
        ['Venus en Géminis', 'Comprensión mutua inmediata. Comparten el lenguaje, el humor y la necesidad de variedad. El riesgo es que ninguno de los dos ancle el vínculo en algo más profundo que la estimulación intelectual, y que la relación se quede brillante pero sin raíces.'],
        ['Venus en Cáncer', 'Tensión entre lo que cada uno necesita. Cáncer busca profundidad emocional, seguridad y constancia; Géminis necesita ligereza y movilidad. Pueden complementarse si Géminis aprende a dar presencia emocional y Cáncer aprende a no interpretar la ligereza como abandono.'],
        ['Venus en Leo', 'Atracción real pero riesgo de desequilibrio. Leo quiere atención exclusiva y sostenida; Géminis distribuye su atención entre muchos focos. Lo que Leo lee como distancia, Géminis lo vive como su forma natural de estar en el mundo. Puede funcionar si Leo siente que sigue siendo especial.'],
        ['Venus en Virgo', 'Muy buena compatibilidad. Ambos son posiciones mercurianas —la mente y el lenguaje son el territorio compartido. Virgo añade profundidad y detalle; Géminis aporta ligereza y perspectiva amplia. Se entienden sin necesidad de traducir.'],
        ['Venus en Libra', 'Una de las mejores combinaciones. Dos signos de aire que comparten la valoración de la comunicación, la estética y el equilibrio. Libra aporta la búsqueda de armonía que a Géminis le ayuda a anclar; Géminis aporta la variedad que mantiene a Libra mentalmente activo.'],
        ['Venus en Escorpio', 'Opuestos en el eje del zodiaco: máxima tensión y máxima atracción. Escorpio busca fusión total, exclusividad y profundidad sin fondo; Géminis busca libertad, variedad y superficie brillante. Se necesitan y se exasperan. Con madurez de ambas partes, pueden complementarse extraordinariamente bien.'],
        ['Venus en Sagitario', 'Gran compatibilidad natural. Ambos valoran la libertad y la exploración. Sagitario añade la visión del mundo y la expansión; Géminis aporta la agilidad verbal y el juego intelectual. Comparten la aversión al encierro y el amor por aprender.'],
        ['Venus en Capricornio', 'Difícil sin trabajo consciente. Capricornio valora la solidez, el compromiso a largo plazo y las estructuras claras; Géminis prefiere la apertura y la fluidez. Lo que para Capricornio es responsabilidad, para Géminis puede sentirse como rigidez.'],
        ['Venus en Acuario', 'Muy buena base. Dos posiciones aéreas con una necesidad compartida de libertad intelectual y aversión a la posesividad. Acuario aporta la visión de conjunto y la distancia; Géminis aporta el dinamismo y el humor. Se respetan mutuamente sin asfixiarse.'],
        ['Venus en Piscis', 'Ritmos emocionales muy distintos. Piscis ama desde la emoción total y la disolución de fronteras; Géminis ama desde el intercambio mental y mantiene siempre cierta distancia observadora. Pueden fascinarse mutuamente —la profundidad de Piscis atrae a Géminis; la ligereza de Géminis alivia a Piscis— pero sostenerse requiere esfuerzo real de ambas partes.'],
      ] },

      { t: 'h2', id: 'evolucion', text: 'La evolución: Venus en Géminis antes y después de los 30' },
      { t: 'p', html: 'Venus en Géminis es una de las posiciones que más cambia con la madurez —no porque pierda su esencia, sino porque aprende a usar su energía de forma más consciente y deliberada.' },
      { t: 'p', html: '<strong>Antes de los 30</strong> (aproximadamente), Venus en Géminis tiende a expresar su energía de forma más dispersa: muchos vínculos simultáneos sin ninguno completamente profundo, tendencia a cambiar de pareja cuando la relación pierde la chispa inicial, dificultad para sostener el compromiso más allá de la fase de descubrimiento mutuo. Puede haber también una tendencia a hablar más de las emociones que a sentirlas —el análisis como escudo frente a la vulnerabilidad real.' },
      { t: 'p', html: '<strong>Después de los 30</strong> —o más precisamente, después del primer Retorno de Saturno— Venus en Géminis empieza a entender que la profundidad y la variedad no son opuestos. Que puede seguir siendo curioso, versátil y estimulado dentro de un vínculo sostenido. Que la conversación más interesante de su vida puede ser la que lleva años teniendo con la misma persona, precisamente porque esa persona también sigue creciendo y cambiando.' },
      { t: 'p', html: 'Venus en Géminis maduro tiene una capacidad extraordinaria para mantener vivos los vínculos a largo plazo: sabe que la clave no es encontrar a alguien perfecto, sino seguir encontrando cosas nuevas en quien ya eligió. Y eso —la curiosidad sostenida hacia el otro— es quizá la forma más sofisticada del amor.' },

      { t: 'h2', id: 'famosos', text: 'Personas famosas con Venus en Géminis' },
      { t: 'p', html: 'Las siguientes figuras públicas tienen Venus en Géminis en su carta natal, verificado con datos astronómicos precisos (Swiss Ephemeris). El patrón que aparece con más frecuencia no es el del bon vivant superficial sino algo más preciso: <strong>personas cuya grandeza creativa o pública depende directamente de su capacidad de procesar el mundo a través del lenguaje y de reinventarse continuamente</strong>.' },
      { t: 'p', html: '<strong>Bob Dylan</strong> (24 de mayo de 1941) tiene Venus a 12,5° de Géminis. Es quizá el ejemplo más completo de Venus en Géminis en el registro artístico: seis décadas de obra que nunca se repiten, un uso del lenguaje que convierte cada canción en un artefacto verbal independiente, y una vida romántica y personal marcada por la misma multiplicidad que su arte. Nadie que haya intentado "definir" a Dylan ha tenido éxito —porque definirse de forma fija va en contra de la naturaleza de esta posición.' },
      { t: 'p', html: '<strong>Al Pacino</strong> (25 de abril de 1940) tiene Venus a 21,1° de Géminis. La intensidad verbal que caracteriza a sus personajes más icónicos —desde Michael Corleone hasta Tony Montana— tiene la firma de Venus en Géminis: el poder que viene de las palabras, del timing en la frase, de la capacidad de cambiar de registro en un instante. En su vida personal, ha mantenido relaciones largas y también varias en paralelo, con una honestidad sobre esa dualidad que es también característica de esta posición.' },
      { t: 'p', html: '<strong>Cher</strong> (20 de mayo de 1946) tiene Venus a 25,8° de Géminis. La reinvención constante —musical, estética, vital— es el documento más visible de su Venus en Géminis. Décadas de carrera en las que cada capítulo ha sido casi irreconocible respecto al anterior, y una capacidad de adaptarse a cada nueva era del entretenimiento que no tiene equivalente entre sus contemporáneos. Su humor —cortante, rápido, sin filtros— es también de manual.' },
      { t: 'p', html: '<strong>Naomi Campbell</strong> (22 de mayo de 1970) tiene Venus a 29,2° de Géminis —en el grado más avanzado del signo, el llamado "grado anaretico", que concentra la energía de Géminis con una intensidad particular. La variedad de su presencia pública —modelo, activista, empresaria, presentadora, figura viral en redes— refleja esa multiplicidad de facetas que Venus en Géminis gestiona con naturalidad. Su inteligencia conversacional y su capacidad de reinventarse mediáticamente son también marcas de esta posición.' },
      { t: 'p', html: '<strong>Harrison Ford</strong> (13 de julio de 1942) tiene Venus a 18,6° de Géminis. El humor seco y el timing perfecto que caracterizan a sus personajes —Han Solo, Indiana Jones— son expresiones directas de Venus en Géminis: la seducción a través del ingenio más que de la declaración emocional abierta. En sus relaciones públicas ha mostrado la misma discreción verbal característica de la posición: dice poco, pero lo que dice está cuidadosamente elegido.' },
    ],
    faq: [
      {
        q: '¿Qué significa tener Venus en Géminis en la carta natal?',
        a: 'Tener Venus en Géminis significa que tu manera de amar, lo que encuentras atractivo y cómo expresas el afecto está profundamente vinculado a la comunicación, el intercambio intelectual y la variedad. Te enamoras de personas que te hacen pensar, que te sorprenden con lo que dicen y con quiénes son. La conversación es tu lenguaje del amor más natural. También significa que necesitas movimiento y novedad en las relaciones para sentirte completamente presente en ellas —aunque esa necesidad puede aprenderse a satisfacer dentro de un vínculo profundo más que buscando siempre en otro lugar.',
      },
      {
        q: '¿Es Venus en Géminis infiel?',
        a: 'La asociación entre Géminis y la infidelidad es uno de los estereotipos más repetidos y menos matizados de la astrología popular. Venus en Géminis tiene una tendencia real a mantener múltiples conexiones simultáneas y a buscar variedad —pero eso no equivale automáticamente a infidelidad. Lo que sí puede ocurrir, especialmente antes de que esta posición se haya trabajado, es la infidelidad emocional: mantener vínculos íntimos con varias personas sin que ninguno reciba toda la profundidad disponible. Cuando Venus en Géminis madura y aprende a canalizar su curiosidad dentro del vínculo elegido, puede ser tan fiel y presente como cualquier otra posición.',
      },
      {
        q: '¿Con qué signos es más compatible Venus en Géminis?',
        a: 'Las compatibilidades más naturales de Venus en Géminis son con otros signos de aire: Venus en Libra y Venus en Acuario comparten la valoración de la comunicación, la libertad y el intercambio intelectual. Venus en Sagitario también funciona bien porque comparte la necesidad de exploración y la aversión al encierro. Venus en Virgo es otra combinación interesante, porque ambos son signos mercurianos —la mente y el lenguaje son el territorio común. Las combinaciones más difíciles suelen ser con Venus en Tauro y Venus en Escorpio, aunque pueden complementarse bien con trabajo consciente.',
      },
      {
        q: '¿Cómo saber si tengo Venus en Géminis?',
        a: 'Venus en Géminis no es lo mismo que tener Sol en Géminis. Venus viaja cerca del Sol pero puede estar en un signo diferente —hasta dos signos por delante o por detrás. Para saber tu Venus exacto necesitas calcular tu carta natal con fecha, hora y lugar de nacimiento precisos. Si naciste con Sol en Tauro, Géminis, Cáncer o Leo tienes más probabilidades de tener Venus en Géminis, pero no es una garantía. La única forma de confirmarlo es con el cálculo exacto.',
      },
      {
        q: '¿Qué le gusta a Venus en Géminis en una relación?',
        a: 'Venus en Géminis busca en una relación lo que podría buscar en su mejor amistad y en un libro fascinante al mismo tiempo: conversación que no se agota, curiosidad mutua, humor compartido y la sensación de que la otra persona siempre tiene algo más que descubrir. Necesita libertad —no para alejarse, sino para no sentirse encerrado. Valora profundamente que le recuerden lo que dijo, que le hagan preguntas de verdad, que le manden algo porque pensaron en él o en ella. El gesto intelectual de atención es, para esta posición, el acto de amor más genuino.',
      },
    ],
    ctaFinal: {
      h2: 'Descubre dónde está tu Venus y qué significa en tu vida',
      p: 'La posición de Venus en tu carta natal explica cómo amas, qué encuentras verdaderamente atractivo y cuáles son los patrones que se repiten en tus relaciones. La carta natal interpretada analiza tu Venus en el contexto completo de tu mapa: casa, aspectos y diálogo con el resto de planetas.',
      href: '/carta-natal/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  'venus-en-aries': {
    eyebrow: 'Astrología · Venus natal',
    h1: 'Venus en Aries en la carta natal',
    lead: 'Venus en Aries no corteja. Va a por lo que quiere con una franqueza que puede parecer atrevimiento y que, en el fondo, es la forma más honesta que existe de amar. Quien tiene esta posición en su carta natal no sabe fingir desinterés, no maneja tiempos estratégicos y no entiende por qué alguien querría complicar algo tan simple como decir lo que siente. Eso tiene un precio —y también tiene una belleza que pocas posiciones planetarias pueden igualar.',
    readingTime: '11 min',
    blocks1: [
      { t: 'h2', id: 'venus-detrimento', text: 'Venus en detrimento en Aries: cuando el amor necesita aprender a esperar' },
      { t: 'p', html: 'En astrología clásica, Venus rige dos signos: Tauro y Libra. Los signos opuestos —Escorpio y Aries— son sus posiciones de detrimento. El detrimento no significa que Venus esté roto o que la persona sea incapaz de amar: significa que la energía del planeta y la del signo van en direcciones opuestas, creando una tensión productiva que hay que aprender a manejar.' },
      { t: 'p', html: 'Venus busca armonía, acuerdo, belleza y relación sin fricción. Aries opera desde el impulso inmediato, la acción unilateral, la conquista y la independencia. Cuando Venus llega a Aries, su tendencia natural a crear vínculos armoniosos choca con la naturaleza solitaria y apresurada del signo. <strong>El resultado no es incapacidad de amar —es una forma de amar que actúa antes de pensar, que elige la autenticidad sobre la diplomacia y que tiene que aprender, con el tiempo, que el amor también requiere paciencia y reciprocidad sostenida</strong>.' },
      { t: 'p', html: 'El detrimento se nota especialmente en la juventud como una tendencia a enamorarse con una rapidez que descoloca y a perder el interés con una velocidad proporcional. También puede aparecer como dificultad para negociar o ceder en las relaciones —no por egoísmo, sino porque la energía de Aries es fundamentalmente auto-referencial y tarda en aprender a incluir al otro de forma genuina.' },
      { t: 'note', html: '<strong>El detrimento como maestro.</strong> Venus en Aries en detrimento no es una sentencia: es una invitación. Las personas con esta posición tienen que aprender activamente lo que Venus en Libra da casi de forma innata —el arte del vínculo, la escucha, el compromiso. Cuando lo aprenden, lo hacen con una profundidad que las posiciones "cómodas" de Venus rara vez alcanzan, porque cada lección se ganó con experiencia real.' },

      { t: 'h2', id: 'como-ama', text: 'Cómo ama Venus en Aries: la conquista como lenguaje' },
      { t: 'p', html: 'Venus en Aries ama como actúa: rápido, directo y sin rodeos. El proceso de enamoramiento no es lento ni sutil —es una chispa que se enciende de golpe y que exige respuesta inmediata. Esta posición no maneja la incertidumbre romántica bien: si hay atracción, la expresa. Si quiere algo, lo persigue. Si no recibe señales claras, interpreta el silencio como rechazo y sigue adelante.' },
      { t: 'p', html: 'La conquista es, para Venus en Aries, parte fundamental del amor. No solo le gusta ser correspondido —le gusta el proceso de perseguir, de ganarse al otro, de sentir que la relación tiene movimiento y dinamismo. Una vez que la conquista ha terminado y la relación entra en la zona de lo conocido y predecible, el interés puede menguar. <strong>No porque no quiera a la persona: porque Venus en Aries necesita estímulo constante para mantenerse activamente comprometido</strong>.' },
      { t: 'p', html: 'El afecto de Venus en Aries es físico, activo y presente. No es el tipo de amor que se demuestra con detalles elaborados o gestos planificados con semanas de antelación —es el que aparece en el impulso del momento: un abrazo espontáneo, una llamada sin motivo, una declaración que sale antes de ser pensada. La autenticidad es la firma de esta posición: lo que dice es lo que siente, sin filtro y sin cálculo.' },
      { t: 'p', html: 'La independencia es sagrada para Venus en Aries, incluso dentro de una relación. Necesita mantener su propio espacio, su propio ritmo y la sensación de que elige estar donde está —no de que está atrapado. Las relaciones donde hay demasiada fusión, demasiada demanda de tiempo o demasiada presión hacia la estabilidad inmediata activan en esta posición una respuesta de huida que puede parecer frialdad pero que en realidad es la señal de que siente cercada su autonomía.' },

      { t: 'h2', id: 'atraccion', text: 'Lo que más le atrae a Venus en Aries' },
      { t: 'p', html: 'Venus en Aries no se enamora de quien está disponible —se enamora de quien lo desafía. Siente una atracción inmediata por las personas seguras de sí mismas, directas, con criterio propio y que no tienen ningún problema en decir que no. La pasividad, la ambigüedad y las personas que esperan ser conquistadas sin dar ninguna señal clara generan en Venus en Aries desinterés casi inmediato.' },
      { t: 'ul', items: [
        '<strong>Confianza sin arrogancia:</strong> le atrae quien sabe lo que vale sin necesitar demostrarlo constantemente.',
        '<strong>Autenticidad directa:</strong> personas que dicen lo que piensan, que no juegan a las adivinanzas emocionales.',
        '<strong>Independencia real:</strong> quien tiene su propia vida, sus propios proyectos, sus propias prioridades.',
        '<strong>Energía y vitalidad:</strong> le aburren los ritmos lentos. La chispa, el movimiento, la disposición a hacer cosas.',
        '<strong>Un poco de reto:</strong> no juegos de poder, sino la sensación de que conquistar a esta persona requiere algo real.',
      ] },
      { t: 'p', html: 'Lo que apaga a Venus en Aries con igual rapidez: la dependencia emocional excesiva, la pasividad crónica, los dramas de pareja que se repiten sin resolución y la sensación de que la relación se ha convertido en una rutina sin movimiento.' },

      { t: 'h2', id: 'sombra', text: 'El desafío y la sombra: impaciencia, aburrimiento y el miedo al compromiso' },
      { t: 'p', html: 'Venus en Aries tiene varios patrones de sombra que aparecen especialmente antes de trabajarse. El más frecuente es la impaciencia: quiere que las cosas pasen ahora, que las relaciones se definan pronto, que los conflictos se resuelvan en el momento. Esta urgencia puede presionar a la otra persona de formas que la hacen sentir atrapada o apurada —paradójicamente, exactamente lo que Venus en Aries dice que no quiere para sí misma.' },
      { t: 'p', html: 'El aburrimiento relacional es otro patrón real. La fase de enamoramiento —con su incertidumbre, su energía y su dinamismo— es cuando Venus en Aries está más activo y presente. Cuando la relación se estabiliza, puede aparecer la sensación de que algo se ha apagado. La trampa es confundir la estabilidad con el fin del amor en lugar de reconocerla como una fase diferente del mismo.' },
      { t: 'p', html: 'La impulsividad puede generar conflictos innecesarios. Venus en Aries dice lo que piensa antes de filtrar el impacto de sus palabras —y aunque esto viene de un lugar de honestidad, puede herir sin intención. También puede terminar relaciones en un momento de frustración para arrepentirse días después, cuando el impulso ha pasado y la razón ha vuelto.' },
      { t: 'p', html: '<strong>El miedo al compromiso real</strong> —no al compromiso en abstracto, sino a la vulnerabilidad que implica— es quizá la sombra más profunda de Venus en Aries. La independencia que protege con tanta energía tiene a veces una función defensiva: si no me entrego del todo, no me pueden hacer daño del todo. Aprender que el compromiso genuino no es una jaula sino la condición para el amor que en el fondo busca es uno de los aprendizajes centrales de esta posición.' },

      { t: 'h2', id: 'infancia', text: 'Patrones de infancia: de dónde viene esta urgencia' },
      { t: 'p', html: 'Venus en la carta natal guarda memoria de los primeros modelos de amor —las experiencias tempranas que configuraron la comprensión del afecto antes de que pudiera ser racionalizada.' },
      { t: 'p', html: 'Con Venus en Aries, uno de los patrones que aparece con frecuencia en el origen es haber crecido en un entorno donde el amor había que ganárselo activamente —donde la atención y el afecto no estaban garantizados sino que dependían del rendimiento, la iniciativa o el hecho de destacar. O lo contrario: un amor tan presente y sin fricción que nunca aprendió a esperar, a tolerar la frustración del deseo o a negociar.' },
      { t: 'p', html: 'En cualquiera de los dos casos, el resultado es una Venus que aprendió a moverse rápido en el amor: o porque la velocidad era la única forma de conseguir lo que necesitaba, o porque nadie le enseñó que los vínculos requieren tiempo y cultivo. La urgencia de Venus en Aries no es capricho —es a menudo la respuesta aprendida de un sistema que no tuvo suficiente experiencia de amor paciente y disponible.' },
      { t: 'p', html: 'El trabajo de integración consiste en aprender a diferenciar el pasado del presente. No todas las relaciones exigen la misma velocidad de respuesta. No todos los silencios son abandono. No toda estabilidad es trampa. Venus en Aries que ha hecho este recorrido puede aportar a sus relaciones algo que pocas posiciones traen: la misma energía y presencia del enamoramiento inicial, sostenida en el tiempo.' },
    ],
    cta: {
      h3: '¿Venus en Aries aparece en tu carta natal?',
      body: 'La carta natal interpretada explica tu Venus en el contexto completo de tu mapa: en qué casa cae, cómo dialoga con tu Sol y tu Luna, y qué aspectos modifican la forma en que amas y cuál es tu patrón de vínculo más profundo.',
      link1: { href: '/carta-natal/', text: 'Calcular mi carta natal gratis' },
      link2: { href: '/precios/', text: 'Ver la carta natal interpretada — desde 29€' },
    },
    blocks2: [
      { t: 'h2', id: 'mujer-hombre', text: 'Venus en Aries mujer y Venus en Aries hombre' },
      { t: 'p', html: 'La energía de Venus en Aries es la misma con independencia del género, pero la manera en que el entorno social recibe esa energía produce experiencias distintas.' },
      { t: 'p', html: 'La <strong>mujer con Venus en Aries</strong> suele ser percibida como directa, segura e intimidante para quien busca una dinámica más tradicional donde la mujer "espera". Toma la iniciativa sin pensarlo dos veces, dice lo que siente antes de calcular el impacto y sabe con claridad lo que quiere —y no tiene ningún interés en fingir que no. La dificultad que puede vivir es la de un entorno que aún interpreta su directness como "demasiado agresiva" o su independencia como señal de que "no necesita a nadie", cuando en realidad lo que no necesita es que le digan cómo tiene que amar. Aprende a valorar a quien puede estar a su lado sin intentar moldearla.' },
      { t: 'p', html: 'El <strong>hombre con Venus en Aries</strong> ama con generosidad espontánea y una presencia física activa. Busca a una persona que le iguale en energía y que no necesite que él modere su entusiasmo. El mayor riesgo de esta posición masculina es la tendencia a centrarse en la conquista y perder el interés una vez conseguida —no por maldad sino porque el circuito de recompensa se activó sobre todo en esa fase. El hombre con Venus en Aries que aprende a encontrar estímulo genuino dentro de la relación estable —no solo al inicio— puede ser uno de los compañeros más presentes y apasionados del zodiaco.' },
      { t: 'p', html: 'En ambos casos, el patrón central es el mismo: el amor como energía en movimiento. Y la tarea de integración apunta en la misma dirección: aprender que la profundidad no requiere velocidad, que la presencia no requiere conquista y que el compromiso no apaga la llama —puede, de hecho, ser lo que la mantiene viva.' },

      { t: 'h2', id: 'estilo', text: 'El estilo: cómo se viste Venus en Aries' },
      { t: 'p', html: 'Venus rige también la estética y la manera en que una persona se presenta visualmente al mundo. Venus en Aries tiene un estilo que comunica energía, presencia y confianza —a menudo sin darse cuenta de que lo está haciendo.' },
      { t: 'p', html: 'Tiende a preferir ropa que permita movimiento, que sea directa en su mensaje visual y que no requiera mantenimiento excesivo. Le atraen los colores que hablan sin rodeos: rojos, naranja, negro, blanco. No es el tipo de estética que acumula capas de significado sutil —lo que lleva dice exactamente lo que quiere decir.' },
      { t: 'p', html: 'Las tendencias recién salidas, los looks que tienen algo de atrevimiento, lo que otros aún no se han atrevido a ponerse —Venus en Aries llega primero. No por estrategia sino porque Aries siempre va a la vanguardia. Le aburre vestir igual que todos y le resulta poco interesante la moda que existe para pasar desapercibida. Su presencia visual es activa, incluso cuando no pretende llamar la atención.' },

      { t: 'h2', id: 'compatibilidad', text: 'Compatibilidad de Venus en Aries con otros Venus' },
      { t: 'p', html: 'La compatibilidad entre posiciones de Venus no es una fórmula exacta —depende de la carta natal completa. Pero el signo de Venus indica el estilo de amor de cada persona, y algunos estilos resuenan con Venus en Aries de forma más natural que otros.' },
      { t: 'table', heads: ['Venus de la otra persona', 'Dinámica con Venus en Aries'], rows: [
        ['Venus en Aries', 'Energía compartida y comprensión mutua de la necesidad de independencia. El riesgo es que ambos quieran liderar sin nadie que ceda, generando conflictos de ego frecuentes. Con dos Venus en Aries dispuestos a aprender a ceder, la conexión puede ser muy viva.'],
        ['Venus en Leo', 'Una de las mejores combinaciones. Dos fuegos que se entienden: Leo añade la lealtad y la teatralidad que a Aries le divierte; Aries aporta la chispa espontánea que Leo necesita para no estancarse. Mucha energía, mucho calor.'],
        ['Venus en Sagitario', 'Alta compatibilidad natural. Ambos valoran la libertad, la aventura y no sentirse encerrados. Sagitario añade profundidad filosófica; Aries aporta iniciativa concreta. Se estimulan mutuamente sin asfixiarse.'],
        ['Venus en Géminis', 'Buena dinámica. Géminis aporta variedad intelectual y adaptabilidad; Aries aporta dirección y energía. Ambos se aburren de lo repetitivo, lo que puede ser una ventaja (seguirán buscando cosas nuevas juntos) o un riesgo (pueden huir del trabajo relacional más lento).'],
        ['Venus en Acuario', 'Buena base de respeto mutuo por la independencia. Acuario da la distancia intelectual que Aries puede respetar; Aries da la presencia física que Acuario a veces necesita sin reconocerlo. La frialdad emocional de Acuario puede frustrar a Aries.'],
        ['Venus en Libra', 'Oposición astrológica: tensión y atracción simultáneas. Libra busca equilibrio, negociación y armonía; Aries prefiere la acción directa y la decisión unilateral. Se necesitan y se exasperan mutuamente. Con madurez, se complementan.'],
        ['Venus en Escorpio', 'Mucha energía, pero ritmos muy distintos. Aries quiere movimiento inmediato; Escorpio quiere profundidad y exclusividad antes de entregarse. La intensidad de Escorpio puede percibirse como control por parte de Aries; la ligereza de Aries puede herir a Escorpio.'],
        ['Venus en Tauro', 'Difícil a largo plazo. Tauro busca estabilidad, calma y ritmo lento en el amor; Aries necesita dinamismo constante. Lo que para Tauro es la seguridad deseable, para Aries puede parecer estancamiento. Requiere mucho trabajo consciente de ambas partes.'],
      ] },

      { t: 'h2', id: 'evolucion', text: 'La evolución: Venus en Aries antes y después de los 30' },
      { t: 'p', html: 'Venus en Aries es una de las posiciones que más se transforma con la madurez —no porque pierda su energía característica, sino porque aprende a dirigirla de forma más consciente.' },
      { t: 'p', html: '<strong>Antes de los 30</strong> (aproximadamente), Venus en Aries tiende a expresarse en su forma más reactiva: el enamoramiento veloz seguido de desinterés igualmente rápido, la dificultad para sostener el compromiso una vez que la novedad ha pasado, los conflictos generados por la impulsividad verbal y la impaciencia cuando el amor no se mueve al ritmo que necesita. Puede haber también un patrón de relaciones que empiezan con mucho fuego y terminan sin haber llegado a ningún lugar real, dejando una sensación de que el amor "no dura" o de que hay algo en ella o él que espanta a las personas cuando la relación empieza a ser seria.' },
      { t: 'p', html: '<strong>Después de los 30</strong> —o más precisamente, después del primer Retorno de Saturno— Venus en Aries empieza a integrar la paciencia sin perder la espontaneidad. La persona aprende a distinguir la atracción genuina del estímulo de la novedad, a mantenerse presente cuando la relación entra en su fase de profundidad y a entender que el compromiso no apaga la llama —puede ser, de hecho, la condición que la hace más real.' },
      { t: 'p', html: 'Venus en Aries maduro tiene una capacidad de presencia y de amor activo que pocas posiciones pueden igualar. Ha aprendido que la velocidad no es sinónimo de intensidad, que la conquista más difícil no es la del otro sino la de la propia impaciencia, y que el amor que más vale es el que elige quedarse cuando ya no hay nada que conquistar.' },

      { t: 'h2', id: 'famosos', text: 'Personas famosas con Venus en Aries' },
      { t: 'p', html: 'Las siguientes figuras públicas tienen Venus en Aries en su carta natal, verificado con datos astronómicos precisos (Swiss Ephemeris). El patrón que aparece con más frecuencia no es el estereotipo de la persona caprichosa e inconstante —es algo más interesante: personas con una presencia magnética, directas en su arte y en su vida pública, que han convertido la autenticidad sin filtro en su marca más reconocible.' },
      { t: 'p', html: '<strong>Lady Gaga</strong> (28 de marzo de 1986) tiene Venus en Aries a 24°. Su carrera es, en muchos sentidos, un documento de Venus en Aries en acción: la decisión de ser exactamente quien es sin calcular cómo será recibida, la energía de la reinvención constante, la capacidad de ir hacia lo que quiere sin esperar permiso. Su manera de hablar sobre el amor en canciones e entrevistas refleja la misma directness: honesta, apasionada, sin rodeos.' },
      { t: 'p', html: '<strong>Mariah Carey</strong> (27 de marzo de 1969) tiene Venus en Aries a 25°. La intensidad de sus grandes baladas —donde el amor es siempre una experiencia total, no tibia— es coherente con esta posición. Su vida pública ha mostrado también la dualidad característica de Venus en Aries: la generosidad afectiva y la dificultad para gestionar los vínculos cuando la energía del inicio se transforma en algo diferente.' },
      { t: 'p', html: '<strong>Rihanna</strong> (20 de febrero de 1988) tiene Venus en Aries a 13°. La confianza y la presencia visual que proyecta —tanto en su música como en su marca de belleza Fenty— son características directas de esta posición. Aries no pide disculpas por ocupar espacio, y Rihanna ha construido toda una identidad pública sobre esa premisa. Su afirmación frecuente de que sabe exactamente lo que quiere, en el amor y en los negocios, es un clásico de Venus en Aries maduro.' },
      { t: 'p', html: '<strong>Robert Downey Jr.</strong> (4 de abril de 1965) tiene Venus en Aries a 13°. La energía que proyecta en pantalla —carismático, directo, con un punto de arrogancia que resulta paradójicamente atractivo— es una expresión muy clara de esta posición. Su historia personal, con las caídas y las reconstrucciones, también tiene el sello de Venus en Aries: cada vez que algo terminó, la respuesta fue seguir adelante, no quedarse.' },
    ],
    faq: [
      {
        q: '¿Qué significa tener Venus en Aries en la carta natal?',
        a: 'Tener Venus en Aries significa que tu manera de amar, lo que te atrae y cómo expresas el afecto está teñida por la energía de Aries: directa, impulsiva, apasionada y orientada a la acción. Te enamoras rápido, amas con generosidad espontánea y necesitas movimiento y novedad en las relaciones para mantenerte comprometido. Es también una posición de detrimento para Venus —no porque ames mal, sino porque tienes que aprender activamente lo que Venus en Libra (su domicilio opuesto) tiene de forma más innata: la paciencia, la reciprocidad y el arte del vínculo sostenido.',
      },
      {
        q: '¿Es Venus en Aries una buena posición?',
        a: 'Todas las posiciones de Venus tienen fortalezas y desafíos. Venus en Aries tiene una capacidad de amor activo, presencia y autenticidad que pocas posiciones igualan. Lo que se presenta como dificultad —la impaciencia, el aburrimiento ante la rutina, la dificultad con el compromiso sostenido— son aprendizajes específicos de esta posición que, cuando se trabajan, generan un tipo de amor muy particular: presente, apasionado y elegido conscientemente, no por inercia.',
      },
      {
        q: '¿Cómo se viste Venus en Aries?',
        a: 'Venus en Aries tiende a un estilo directo, con presencia y que permite movimiento. Colores que hablan sin rodeos —rojos, naranjas, negro, blanco. Pocas capas de ornamentación: lo que lleva dice lo que quiere decir. Suele ser de las primeras en adoptar tendencias porque Aries siempre va a la vanguardia, no por estrategia sino porque esperar que algo ya esté de moda le parece poco interesante. Su presencia visual es activa incluso cuando no pretende llamar la atención.',
      },
      {
        q: '¿Venus en Aries se aburre en las relaciones?',
        a: 'Es uno de los desafíos más reales de esta posición. La fase de conquista —con su incertidumbre, su dinamismo y su novedad— es donde Venus en Aries está más activo. Cuando la relación se estabiliza, puede aparecer la sensación de que algo se ha apagado. La clave de integración es aprender a encontrar fuentes de estímulo genuino dentro de la relación estable: proyectos compartidos, experiencias nuevas, honestidad sin filtro. Venus en Aries maduro sabe que el aburrimiento no es la señal de que la relación terminó —es la señal de que hace falta añadir movimiento.',
      },
      {
        q: '¿Cómo saber si tengo Venus en Aries?',
        a: 'Venus en Aries no equivale a tener Sol en Aries. Venus visita Aries aproximadamente entre el 20 de marzo y el 14 de abril cada año, aunque las fechas varían según el año (a veces antes, a veces el tránsito dura más). Para saberlo con exactitud necesitas calcular tu carta natal con tu fecha, hora y lugar de nacimiento. Si naciste con Sol en Piscis, Aries, Tauro o Géminis tienes más probabilidades de tener Venus en Aries, aunque no es garantía —Venus puede estar uno o dos signos por delante o por detrás del Sol.',
      },
    ],
    ctaFinal: {
      h2: 'Descubre dónde está tu Venus y qué significa',
      p: 'La posición de Venus en tu carta natal explica cómo amas, qué buscas en una relación y qué encuentras verdaderamente atractivo. La carta natal interpretada analiza tu Venus en el contexto completo de tu mapa.',
      href: '/carta-natal/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const HERO_IMAGES: Record<string, string> = {
  'carta-natal-gratis-explicada':          '/blog/blog-carta-natal.png',
  'luna-llena-significado-astrologico':    '/blog/blog-luna-llena.png',
  'luna-en-escorpio-carta-natal':          '/blog/blog-luna-escorpio.png',
  'luna-en-capricornio-carta-natal':       '/blog/blog-luna-capricornio.png',
  'luna-en-piscis':                        '/blog/blog-luna-piscis.png',
  'luna-en-sagitario':                     '/blog/blog-luna-sagitario.png',
  'que-significa-11-11':                   '/blog/blog-11-11.png',
  '11-11-significado-espiritual':          '/blog/blog-11-11.png',
  'camino-de-vida-11-numero-maestro':      '/blog/blog-camino-11.png',
  'revolucion-solar-que-es-como-calcularla': '/blog/blog-revolucion-solar.png',
  'luna-llena-julio-2026':                   '/blog/blog-luna-julio-2026.png',
  'luna-nueva-julio-2026':                   '/blog/blog-luna-julio-2026.png',
  'hora-espejo-11-11':                       '/blog/blog-hora-espejo-1111.png',
  'ascendente-en-virgo':                     '/blog/blog-ascendente-virgo.png',
  'ascendente-en-escorpio':                  '/blog/blog-ascendente-escorpio.png',
  'venus-en-virgo':                          '/blog/blog-venus-virgo.png',
  'venus-en-escorpio':                       '/blog/blog-venus-escorpio.png',
  'venus-en-aries':                          '/blog/blog-venus-aries.png',
  'venus-en-geminis':                        '/blog/blog-venus-geminis.png',
};

function ArticleHeroImage({ slug }: { slug: string }) {
  const src = HERO_IMAGES[slug];
  if (!src) return null;
  return (
    <figure className="article-hero-img">
      <Image
        src={src}
        alt=""
        width={1200}
        height={525}
        priority
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </figure>
  );
}

function ZodiacGrid({ items }: { items: { glyph: string; name: string; desc: string }[] }) {
  return (
    <div className="zodiac-grid">
      {items.map(({ glyph, name, desc }) => (
        <div key={name} className="zodiac-card">
          <div className="zodiac-card__head">
            <svg viewBox="0 0 36 36" width="33" height="33" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="18" cy="18" r="15.5" fill="rgba(184,139,62,.10)" stroke="#b88b3e" strokeWidth="0.9" />
              <text x="18" y="22" textAnchor="middle" fontSize="16" fill="#b88b3e">
                {glyph}
              </text>
            </svg>
            <strong className="zodiac-card__name">{name}</strong>
          </div>
          <p className="zodiac-card__desc">{desc}</p>
        </div>
      ))}
    </div>
  );
}

function ArticleTable({ heads, rows }: { heads?: string[]; rows: string[][] }) {
  return (
    <div className="article-table-wrap">
      <table className="article-table">
        {heads && (
          <thead>
            <tr>
              {heads.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBlock(block: Block, idx: number): React.ReactNode {
  switch (block.t) {
    case 'h2':
      return <h2 key={idx} id={block.id}>{block.text}</h2>;
    case 'h3':
      return <h3 key={idx}>{block.text}</h3>;
    case 'p':
      return <p key={idx} dangerouslySetInnerHTML={{ __html: block.html }} />;
    case 'ul':
      return (
        <ul key={idx}>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={idx}>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      );
    case 'table':
      return <ArticleTable key={idx} heads={block.heads} rows={block.rows} />;
    case 'zodiac':
      return <ZodiacGrid key={idx} items={block.items} />;
    case 'note':
      return <p key={idx} className="article-note" dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
}

// ─── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const heroImage = HERO_IMAGES[slug];
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE}/blog/${slug}/`,
      publishedTime: post.date,
      section: post.category,
      ...(heroImage && {
        images: [{ url: `${SITE}${heroImage}`, width: 1200, height: 630, alt: post.title }],
      }),
    },
    ...(heroImage && {
      twitter: {
        card: 'summary_large_image' as const,
        title: post.title,
        description: post.excerpt,
        images: [`${SITE}${heroImage}`],
      },
    }),
  };
}

// ─── Page component ───────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const data = ARTICLES[slug];
  if (!data) notFound();

  const contentId = `article-${slug}`;

  const heroImage = HERO_IMAGES[slug];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE}/blog/${slug}/#article`,
    headline: post.title,
    description: post.excerpt,
    url: `${SITE}/blog/${slug}/`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'es',
    articleSection: post.category,
    author: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Cosmyastral',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Cosmyastral',
      url: SITE,
    },
    ...(heroImage && {
      image: {
        '@type': 'ImageObject',
        url: `${SITE}${heroImage}`,
        width: 1200,
        height: 525,
      },
    }),
    isPartOf: { '@type': 'Blog', '@id': `${SITE}/blog/#blog` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${slug}/` },
  };

  const faqSchema = data.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faq.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }
    : null;

  const darkHero = !!data.heroBg;

  return (
    <>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Breadcrumb
        crumbs={[
          { label: 'Blog', href: '/blog/' },
          { label: post.title, href: `/blog/${slug}/` },
        ]}
      />

      {/* ── PAGE HERO ── */}
      <section
        className="page-hero"
        style={darkHero ? { background: data.heroBg } : {}}
      >
        <div className="page-hero__inner">
          <span className="eyebrow" style={darkHero ? { color: 'var(--gold)' } : {}}>
            {data.eyebrow}
          </span>
          <h1 style={darkHero ? { color: 'var(--bg)' } : {}}>{data.h1}</h1>
          <p
            className="page-hero__lead"
            style={darkHero ? { color: 'rgba(247,238,219,0.75)' } : {}}
          >
            {data.lead}
          </p>
          <div
            style={{
              marginTop: '18px',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.78rem',
                fontWeight: 600,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                color: darkHero ? 'var(--gold)' : 'var(--accent)',
              }}
            >
              {post.category}
            </span>
            <span style={{ color: darkHero ? 'rgba(247,238,219,0.4)' : 'var(--line)' }}>·</span>
            <time
              dateTime={post.date}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.78rem',
                color: darkHero ? 'rgba(247,238,219,0.6)' : 'var(--ink-mute)',
              }}
            >
              {new Date(post.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span style={{ color: darkHero ? 'rgba(247,238,219,0.4)' : 'var(--line)' }}>·</span>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.78rem',
                color: darkHero ? 'rgba(247,238,219,0.6)' : 'var(--ink-mute)',
              }}
            >
              {data.readingTime} lectura
            </span>
          </div>
        </div>
      </section>

      {/* ── ARTICLE WRAP ── */}
      <div className="article-wrap" id={contentId}>
        <TocSidebar contentId={contentId} />
        <div className="article-main">
          <ArticleHeroImage slug={slug} />

          {/* Section 1 */}
          <div className="article-content">
            {data.blocks1.map((block, idx) => renderBlock(block, idx))}
          </div>

          {/* Mid-article CTA */}
          <div className="article-cta-box">
            <h3>{data.cta.h3}</h3>
            <p dangerouslySetInnerHTML={{ __html: data.cta.body }} />
            <div className="cta-btns">
              <Link href={data.cta.link1.href} className="btn btn-accent btn-lg">
                {data.cta.link1.text}
              </Link>
              <Link href={data.cta.link2.href} className="btn btn-gold btn-lg">
                {data.cta.link2.text}
              </Link>
            </div>
          </div>

          {/* Section 2 (optional) */}
          {data.blocks2 && (
            <div className="article-content">
              {data.blocks2.map((block, idx) => renderBlock(block, idx))}
            </div>
          )}
        </div>
      </div>

      {/* ── FAQ ── */}
      {data.faq && (
        <section className="faq">
          <h2>Preguntas frecuentes</h2>
          <div className="faq__list">
            {data.faq.map(({ q, a }) => (
              <details key={q} className="faq__item">
                <summary>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', width: '100%' }}>
                    <span>{q}</span>
                    <span className="faq-icon" style={{ color: 'var(--gold)', flexShrink: 0, fontSize: '1.3rem', lineHeight: 1 }}>+</span>
                  </div>
                </summary>
                <p dangerouslySetInnerHTML={{ __html: a }} />
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA FINAL ── */}
      {data.ctaFinal && (
        <section className="cta-final">
          <div className="cta-final__inner">
            <WheelSvg className="cta-final__wheel" aria-hidden={true} />
            <h2>{data.ctaFinal.h2}</h2>
            <p>{data.ctaFinal.p}</p>
            <Link href={data.ctaFinal.href} className="btn btn-gold btn-xl">
              {data.ctaFinal.btnText}
            </Link>
          </div>
        </section>
      )}

      {/* ── MORE POSTS ── */}
      <section
        style={{
          background: 'var(--bg-warm)',
          padding: 'clamp(48px,6vw,72px) 32px',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <h3
            style={{
              fontFamily: 'var(--font-garamond)',
              fontWeight: 400,
              fontSize: '1.6rem',
              color: 'var(--ink)',
              marginBottom: '24px',
            }}
          >
            Más artículos
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {POSTS.filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}/`}
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    padding: '20px',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.1em',
                      color: 'var(--accent)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    {p.category}
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-garamond)',
                      fontWeight: 400,
                      fontSize: '1.05rem',
                      color: 'var(--ink)',
                      lineHeight: 1.35,
                      margin: 0,
                    }}
                  >
                    {p.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
