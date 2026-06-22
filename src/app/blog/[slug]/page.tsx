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
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const HERO_IMAGES: Record<string, string> = {
  'carta-natal-gratis-explicada':          '/blog/blog-carta-natal.png',
  'luna-llena-significado-astrologico':    '/blog/blog-luna-llena.png',
  'luna-en-escorpio-carta-natal':          '/blog/blog-luna-escorpio.png',
  'luna-en-capricornio-carta-natal':       '/blog/blog-luna-capricornio.png',
  'que-significa-11-11':                   '/blog/blog-11-11.png',
  '11-11-significado-espiritual':          '/blog/blog-11-11.png',
  'camino-de-vida-11-numero-maestro':      '/blog/blog-camino-11.png',
  'revolucion-solar-que-es-como-calcularla': '/blog/blog-revolucion-solar.png',
  'luna-llena-julio-2026':                   '/blog/blog-luna-julio-2026.png',
  'hora-espejo-11-11':                       '/blog/blog-hora-espejo-1111.png',
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
