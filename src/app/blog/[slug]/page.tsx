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

      { t: 'h2', id: 'preguntas-frecuentes-carta', text: 'Preguntas frecuentes' },
      { t: 'h3', text: '¿Necesito saber de astrología para entender la carta interpretada?' },
      { t: 'p', html: 'No. Está escrita en lenguaje narrativo, no en jerga técnica. Si aparece un término técnico, va explicado en el contexto.' },
      { t: 'h3', text: '¿El PDF incluye la imagen de la rueda natal?' },
      { t: 'p', html: 'Sí, el PDF incluye el gráfico de la rueda zodiacal con todos los planetas y casas posicionados, generado con Swiss Ephemeris.' },
      { t: 'h3', text: '¿Puedo pedir la carta natal de otra persona como regalo?' },
      { t: 'p', html: 'Sí. Al pedir el estudio introduces los datos de nacimiento de la persona para quien lo quieres, y te lo enviamos a ti. Es un regalo inusual y muy bien recibido.' },
      { t: 'h3', text: '¿Y si tengo dudas sobre algo del estudio una vez recibido?' },
      { t: 'p', html: 'Puedes escribirnos por email. Incluimos dirección de contacto en el PDF.' },
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
      { t: 'h2', id: 'fechas-2026', text: 'Fechas de luna llena 2026: signo por signo' },
      { t: 'p', html: 'En 2026 hay 12 lunas llenas. Cada una ocurre en el signo opuesto al Sol de ese mes. Las fechas exactas varían 1-2 días según la zona horaria:' },
      { t: 'table', heads: ['Mes', 'Signo de la luna llena', 'Temática principal'], rows: [
        ['Enero', 'Cáncer', 'Familia, hogar, emociones íntimas'],
        ['Febrero', 'Leo', 'Autoexpresión, reconocimiento, creatividad'],
        ['Marzo', 'Virgo', 'Salud, rutinas, perfeccionismo'],
        ['Abril', 'Libra', 'Relaciones, equilibrio, compromisos'],
        ['Mayo', 'Escorpio', 'Transformación, intimidad, lo oculto'],
        ['Junio', 'Sagitario', 'Creencias, viajes, expansión filosófica'],
        ['Julio', 'Capricornio', 'Carrera, ambición, estructura vital'],
        ['Agosto', 'Acuario', 'Colectivo, innovación, libertad individual'],
        ['Septiembre', 'Piscis', 'Intuición, espiritualidad, disolución'],
        ['Octubre', 'Aries', 'Independencia, acción, nuevos comienzos'],
        ['Noviembre', 'Tauro', 'Seguridad material, cuerpo, placeres'],
        ['Diciembre', 'Géminis', 'Comunicación, dualidad, intercambios'],
      ] },
      { t: 'note', html: 'Las fechas exactas varían 1-2 días según la zona horaria. Asignaciones de signo astronómicamente correctas: en la luna llena el Sol y la Luna están en signos opuestos.' },

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
      { t: 'p', html: 'Varias figuras conocidas tienen la Luna en Escorpio en su carta natal, lo que puede ayudar a entender cómo se manifiesta esta energía en contextos reales: la intensidad artística, la profundidad psicológica visible en sus obras, la capacidad de hablar sobre lo que otros callan.' },
    ],
    faq: [
      { q: '¿La Luna en Escorpio es "mala" o problemática?', a: 'No. Todas las posiciones lunares tienen luces y sombras. La Luna en Escorpio tiene una sombra más visible (los celos, el rencor) pero también unas fortalezas excepcionales (resiliencia, lealtad, profundidad). "Mala" o "buena" depende del nivel de integración de la persona, no del signo.' },
      { q: '¿La Luna en Escorpio siempre tiene infancias difíciles?', a: 'Hay cierta tendencia estadística: la Luna en Escorpio a menudo corresponde a personas que tuvieron que madurar emocionalmente antes de lo esperado o que crecieron en entornos con dinámicas de poder o secretos familiares. Pero no es una regla absoluta, y muchas personas con esta posición tuvieron infancias estables.' },
      { q: '¿Puedo calcular mi Luna gratis?', a: 'Sí. Nuestra calculadora de <a href="/carta-natal/">carta natal</a> calcula tu Luna (y todos los planetas) de forma gratuita. Solo necesitas tu fecha, hora y ciudad de nacimiento.' },
    ],
    ctaFinal: {
      h2: 'Tu Luna natal explicada en profundidad.',
      p: 'Dónde cae, qué aspectos forma y cómo dialoga con tu Sol y tu Ascendente. Todo en un estudio de 45–60 páginas, con revisión humana incluida.',
      href: '/precios/',
      btnText: 'Ver la carta natal interpretada →',
    },
  },

  '11-11-significado-espiritual': {
    eyebrow: 'Horas espejo · Numerología angelical · Número maestro 11',
    h1: '11:11 — qué significa espiritualmente',
    lead: 'Ves la hora espejo 11:11 en el reloj, en tickets, en matrículas. No es casualidad que te hayas preguntado qué significa. Este artículo te da una respuesta honesta desde la numerología y la psicología, sin exageraciones ni promesas vacías.',
    readingTime: '7 min',
    blocks1: [
      { t: 'h2', id: 'numerologia-11', text: 'Lo que dice la numerología sobre el 11:11' },
      { t: 'p', html: 'En numerología pitagórica, el 11 es uno de los tres <strong>números maestros</strong> (junto al 22 y al 33). A diferencia del resto de números que se reducen a un solo dígito, el 11 no se reduce —se considera que tiene una vibración propia de mayor intensidad.' },
      { t: 'p', html: 'La energía del 11 se asocia a:' },
      { t: 'ul', items: [
        '<strong>Intuición elevada</strong>: mayor capacidad para percibir lo que no se dice, para sentir antes de entender.',
        '<strong>Visión y inspiración</strong>: tendencia a tener ideas que van por delante del entorno inmediato.',
        '<strong>Sensibilidad extrema</strong>: el 11 amplifica todo. Las emociones son más intensas, la empatía más profunda.',
        '<strong>Tensión interna</strong>: el 1+1=2 que subyace al 11 crea una tensión constante entre el impulso individual (1) y la necesidad de armonía y conexión (2).',
      ] },
      { t: 'p', html: 'Cuando el número 11 aparece duplicado —como 11:11— la tradición numerológica lo interpreta como una amplificación de esa energía. No es una instrucción ni un mensaje concreto, sino una señal de que estás en un momento de mayor receptividad intuitiva.' },

      { t: 'h2', id: 'sesgo-confirmacion', text: 'La explicación psicológica: el sesgo de confirmación' },
      { t: 'p', html: 'Hay algo que conviene decir con honestidad: parte de la razón por la que "siempre" ves el 11:11 es neurológica, no mística.' },
      { t: 'p', html: 'El cerebro procesa miles de datos por minuto y desecha la mayoría. Una vez que un dato —un número, una cara, una melodía— adquiere significado emocional, el sistema de atención lo prioriza automáticamente. Ves muchos más números durante el día (11:47, 14:30, 22:18) pero no los registras porque no tienen carga significativa. El 11:11 ya la tiene, así que lo "ves" con más frecuencia de la estadística.' },
      { t: 'p', html: 'Esto no invalida la lectura numerológica. Significa que el significado simbólico coexiste con el mecanismo neurológico, y que ambas perspectivas son verdaderas a su nivel.' },

      { t: 'h2', id: 'jung-sincronicidad', text: 'Carl Jung y la sincronicidad' },
      { t: 'p', html: 'El psiquiatra Carl Jung acuñó el término <em>sincronicidad</em> para describir coincidencias que no tienen relación causal pero que tienen una correspondencia de significado. Ver 11:11 repetidamente entraría en esa categoría: no hay ninguna causa física que lo provoque, pero puede tener un valor simbólico para quien lo experimenta si ese símbolo resuena con algo real en su proceso interno.' },
      { t: 'p', html: 'Jung no era un esotérico ingénuo: consideraba que los símbolos tienen valor real —psicológico, no sobrenatural— y que trabajar con ellos puede ser una herramienta de autoconocimiento legítima.' },

      { t: 'h2', id: 'que-hacer-1111', text: '¿Qué hacer cuando ves 11:11?' },
      { t: 'p', html: 'Las respuestas que circulan en redes ("pide un deseo", "los ángeles te escuchan") son simplificaciones que no ayudan a nadie. Una respuesta más útil:' },
      { t: 'ul', items: [
        '<strong>Pausa.</strong> Úsalo como recordatorio de volver a tu estado interior. ¿Qué estabas pensando justo antes de verlo? ¿Qué decisión tienes pendiente?',
        '<strong>Abre el foco.</strong> El 11 energéticamente es un portal entre lo consciente y lo intuitivo. Si hay algo que "sabes" pero te niegas a admitir, es un buen momento para reconocerlo.',
        '<strong>No interpretes en exceso.</strong> Un número que aparece no te dice qué hacer. A lo sumo, te recuerda que debes prestar atención.',
      ] },

      { t: 'h2', id: 'horas-espejo', text: 'Horas espejo: qué son y cómo interpretarlas' },
      { t: 'p', html: 'Se llaman <strong>horas espejo</strong> a los patrones de números repetidos que aparecen en el reloj: 11:11, 22:22, 3:33, 4:44, 2:22. La <strong>hora espejo 11:11</strong> es la más buscada de todas, pero hay un sistema de lectura para cada patrón:' },
      { t: 'ul', items: [
        '<strong>Hora espejo 11:11</strong>: el número maestro 11, intuición y visión. Señal de mayor receptividad intuitiva y conexión con el propio camino.',
        '<strong>Hora espejo 22:22</strong>: el número maestro 22, el "constructor". Aparece en ciclos de acción concreta y manifestación de ideas en el mundo material.',
        '<strong>Hora espejo 3:33</strong>: el número maestro 33, la compasión y el servicio. Ciclos de cuidado o llamado hacia los demás.',
        '<strong>Hora espejo 1:11</strong>: el 1 triple, inicio y nuevos comienzos. Momento de pensamiento creativo activo.',
        '<strong>Hora espejo 4:44</strong>: estabilidad, trabajo, fundamentos. Lo que construyes tiene base sólida o necesita tenerla.',
        '<strong>Hora espejo 2:22</strong>: cooperación, relación, equilibrio. Decisiones que afectan a otros o momentos de paciencia necesaria.',
      ] },

      { t: 'h2', id: 'numerologia-personal', text: 'El 11 en tu carta numerológica personal' },
      { t: 'p', html: 'Si el 11 aparece con frecuencia en tu vida (como Camino de Vida 11, Número de la Expresión 11, o como Año Personal 11), no es coincidencia: es parte de tu estructura numerológica. Las personas con el número maestro 11 en posiciones clave de su perfil suelen tener una relación más intensa con las sincronicidades numéricas porque es su propio patrón energético el que resuena con ellas.' },
      { t: 'p', html: '¿Quieres saber si el 11 forma parte de tu numerología personal?' },
    ],
    cta: {
      h3: '¿Tienes el 11 en tu perfil numerológico?',
      body: 'La calculadora gratuita te da tus números principales. El estudio completo los interpreta en profundidad: qué significa el 11 en tu posición específica, cómo convivir con su intensidad y dónde se activa más en tu vida.',
      link1: { href: '/numerologia/', text: 'Calcular mi numerología gratis' },
      link2: { href: '/precios/', text: 'Ver el estudio completo — desde 19€' },
    },
    blocks2: [
      { t: 'h2', id: 'significado-universal', text: '¿El 11:11 tiene un significado espiritual universal?' },
      { t: 'p', html: 'No hay un significado universal fijo, aunque la mayoría de tradiciones esotéricas modernas convergen en temas similares: despertar de conciencia, intuición, sincronicidad, transición. Lo que sí existe es un significado que se construye a través de la experiencia personal: si cada vez que ves 11:11 coincide con momentos de claridad o de decisiones importantes, esa es tu lectura válida, independientemente de lo que diga la tradición.' },
      { t: 'p', html: 'La numerología es un sistema de símbolos. Como todos los sistemas simbólicos (incluidos el lenguaje, el arte, los sueños), produce sentido en la medida en que se trabaja activamente con él. No es un horóscopo que predice el futuro. Es un vocabulario para explorar quién eres.' },
    ],
    faq: [
      { q: '¿Es malo ver 11:11?', a: 'No. En ninguna tradición numerológica el 11 tiene connotaciones negativas. Lo que puede ser intenso es vivir con la energía del 11 en posiciones clave del perfil numerológico (ansiedad, hipersensibilidad), pero ver el número en sí no augura nada malo.' },
      { q: '¿Debo pedir un deseo cuando veo 11:11?', a: 'Es una práctica lúdica que no tiene base en la tradición numerológica seria. Si te ayuda como recordatorio de lo que deseas, úsalo. Si lo tomas literalmente como mecanismo de manifestación, probablemente te lleve a una decepción.' },
      { q: '¿Tiene que ver con los ángeles? ¿Qué es la numerología angelical?', a: 'La llamada <strong>numerología angelical</strong> es una corriente moderna (surgida en los años 90-2000) que interpreta las horas espejo como mensajes de ángeles o guías espirituales. No tiene base en las tradiciones numerológicas clásicas —pitagórica, caldea ni cabalística— sino que es un sistema de significados de desarrollo relativamente reciente. Puede tener valor como marco espiritual o poético, pero conviene saber que es una creación moderna, no una tradición milenaria.' },
    ],
    ctaFinal: {
      h2: 'Tu perfil numerológico completo.',
      p: 'Camino de Vida, Expresión, Alma, Personalidad y todos los números maestros que aparecen en tu fecha y nombre. 52 páginas de interpretación narrativa.',
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
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const HERO_IMAGES: Record<string, string> = {
  'carta-natal-gratis-explicada':          '/blog/blog-carta-natal.png',
  'luna-llena-significado-astrologico':    '/blog/blog-luna-llena.png',
  'luna-en-escorpio-carta-natal':          '/blog/blog-luna-escorpio.png',
  '11-11-significado-espiritual':          '/blog/blog-11-11.png',
  'camino-de-vida-11-numero-maestro':      '/blog/blog-camino-11.png',
  'revolucion-solar-que-es-como-calcularla': '/blog/blog-revolucion-solar.png',
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
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
