import type { ZodiacSign, SignPos } from './astro';

// ── Elemento / Modalidad ─────────────────────────────────────────────────────

export const SIGN_ELEMENT: Record<ZodiacSign, string> = {
  'Aries': 'Fuego',       'Leo': 'Fuego',       'Sagitario': 'Fuego',
  'Tauro': 'Tierra',      'Virgo': 'Tierra',    'Capricornio': 'Tierra',
  'Géminis': 'Aire',      'Libra': 'Aire',      'Acuario': 'Aire',
  'Cáncer': 'Agua',       'Escorpio': 'Agua',   'Piscis': 'Agua',
};

export const SIGN_MODALITY: Record<ZodiacSign, string> = {
  'Aries': 'Cardinal',    'Cáncer': 'Cardinal',  'Libra': 'Cardinal',   'Capricornio': 'Cardinal',
  'Tauro': 'Fijo',        'Leo': 'Fijo',          'Escorpio': 'Fijo',    'Acuario': 'Fijo',
  'Géminis': 'Mutable',   'Virgo': 'Mutable',    'Sagitario': 'Mutable', 'Piscis': 'Mutable',
};

const ELEMENT_NATURE: Record<string, string> = {
  'Fuego':  'apasionada, espontánea y orientada a la acción',
  'Tierra': 'práctica, constante y arraigada en lo concreto',
  'Aire':   'intelectual, comunicativa y orientada a las ideas',
  'Agua':   'emocional, intuitiva y profundamente sensible',
};

// ── Descripciones de Sol ─────────────────────────────────────────────────────

export const SUN_DESC: Record<ZodiacSign, string> = {
  'Aries':
    'Tu esencia es pionera, impulsiva y llena de una energía primaria que necesita moverse. ' +
    'La inacción te parece una forma de muerte en vida — necesitas proyectos, retos y la sensación constante de avanzar. ' +
    'Eres el primero en lanzarte y el que abre caminos que otros seguirán después, a veces sin siquiera agradecértelo. ' +
    'Tu mayor aprendizaje es cultivar la paciencia y terminar lo que empiezas sin perder el fuego que te define.',

  'Tauro':
    'Tu esencia es constante, sensorial y profundamente arraigada en el mundo material. ' +
    'Buscas la seguridad como una necesidad fundamental, no como un lujo — sin una base estable es difícil que te sientas tú mismo. ' +
    'Tienes una paciencia excepcional y una determinación que otros confunden con terquedad, pero que en realidad es fe ciega en el proceso. ' +
    'Tu mayor fortaleza está en la capacidad de construir algo duradero y real, con tus propias manos y a tu propio ritmo.',

  'Géminis':
    'Tu esencia es curiosa, versátil e incapaz de quedarse quieta demasiado tiempo en el mismo lugar o con la misma idea. ' +
    'Necesitas información, conversación e intercambio constante de ideas para sentirte vivo — el aburrimiento es tu mayor enemigo. ' +
    'Tienes la capacidad única de ver múltiples perspectivas simultáneamente, lo que te convierte en un pensador brillante aunque a veces difícil de descifrar para los demás. ' +
    'Tu mente es tu mayor recurso y también tu mayor desafío — el reto es aprender a profundizar sin perder la amplitud.',

  'Cáncer':
    'Tu esencia es empática, protectora y profundamente vinculada al mundo emocional, familiar y al pasado. ' +
    'El hogar no es un lugar para ti sino una sensación que construyes allá donde estás, con las personas que amas. ' +
    'Tienes una memoria emocional extraordinaria y una intuición que rara vez te falla cuando aprendes a escucharla. ' +
    'Tu mayor fortaleza es la capacidad de cuidar a los demás con una profundidad que muy pocos conocen, y tu mayor reto es aprender a cuidarte también a ti mismo con esa misma intensidad.',

  'Leo':
    'Tu esencia es creativa, generosa y necesita expresarse para sentirse completa — el anonimato te apaga. ' +
    'Tienes una calidez natural que atrae a los demás sin que tengas que esforzarte, un magnetismo que no siempre eres consciente de llevar. ' +
    'La expresión en cualquier forma — arte, liderazgo, amor, presencia — no es una opción para ti sino tu modo de vida más auténtico. ' +
    'Tu mayor aprendizaje es brillar desde la autenticidad sin necesitar que los demás validen constantemente tu luz.',

  'Virgo':
    'Tu esencia es analítica, servicial y orientada a la mejora continua de todo lo que te rodea. ' +
    'Tienes un ojo excepcional para el detalle que otros ni siquiera notan, y una capacidad de trabajo que puede parecer incansable. ' +
    'El servicio genuino — ayudar, optimizar, sanar, perfeccionar — no es un sacrificio para ti sino tu forma más natural de amor y de presencia. ' +
    'Tu mayor desafío es aprender a aplicarte a ti mismo la misma compasión infinita que das a los demás sin condición.',

  'Libra':
    'Tu esencia busca constantemente el equilibrio, la belleza y la armonía en todas las dimensiones de la vida. ' +
    'Tienes un sentido estético refinado y una capacidad diplomática que te permite navegar conflictos con una elegancia que otros admiran. ' +
    'Las relaciones son tu campo de aprendizaje más profundo — descubres quién eres a través del espejo que te ofrecen los demás. ' +
    'Tu mayor desafío es tomar decisiones con convicción propia sin perder tu centro en el proceso ni necesitar que todos estén de acuerdo.',

  'Escorpio':
    'Tu esencia es intensa, transformadora y nunca se queda en la superficie de nada — vas siempre a la raíz. ' +
    'Tienes una capacidad innata para detectar lo que se oculta bajo la apariencia, lo que te convierte en un psicólogo nato aunque nunca hayas estudiado psicología. ' +
    'El poder — emocional, relacional, psíquico — es tu territorio natural y tu mayor campo de aprendizaje a lo largo de la vida. ' +
    'Tu mayor fortaleza, la que muy pocos llegan a conocer, es tu capacidad de renacer de tus propias cenizas una y otra vez.',

  'Sagitario':
    'Tu esencia es expansiva, filosófica y eternamente en busca de un horizonte más amplio que el actual. ' +
    'Necesitas sentido, propósito y la sensación de que el mundo tiene más que ofrecerte — la conformidad te resulta casi físicamente imposible. ' +
    'Tienes una honestidad a veces brutal y un optimismo que sobrevive incluso a los golpes más duros de la vida. ' +
    'Tu mayor aprendizaje es aprender a profundizar y comprometerte sin sentir que pierdes la libertad que tanto defines como tuya.',

  'Capricornio':
    'Tu esencia es ambiciosa, disciplinada y construida para el largo plazo — piensas en décadas donde otros piensan en semanas. ' +
    'Tienes una madurez natural que aparece desde joven y que se convierte en sabiduría real a medida que acumulas experiencia. ' +
    'El éxito para ti no es suerte sino el resultado previsible de la constancia, la responsabilidad y el trabajo bien hecho. ' +
    'Tu mayor aprendizaje es permitirte descansar, disfrutar y ser imperfecto sin sentirlo como una derrota o un fracaso.',

  'Acuario':
    'Tu esencia es independiente, visionaria y radicalmente comprometida con sus propias ideas aunque el resto del mundo no las entienda aún. ' +
    'Piensas en colectivos, en humanidad, en sistemas — el individuo aislado te parece a veces una unidad de análisis demasiado pequeña. ' +
    'Estás adelantado a tu tiempo en casi todo lo que piensas y haces, lo cual puede aislarte antes de que el mundo te alcance y te dé la razón. ' +
    'Tu mayor aprendizaje es conectar emocionalmente con los individuos concretos mientras mantienes tu visión global de las cosas.',

  'Piscis':
    'Tu esencia es sensible, imaginativa y capaz de disolver las fronteras entre lo visible y lo invisible con una naturalidad que asombra. ' +
    'Tienes una empatía tan profunda que a veces pierdes el límite entre tus propias emociones y las de los demás — absorbes el mundo entero. ' +
    'La creatividad, la espiritualidad y el servicio son los tres canales naturales a través de los cuales tu energía fluye con mayor autenticidad. ' +
    'Tu mayor aprendizaje es desarrollar límites que te protejan del agotamiento sin cerrar el corazón que es tu mayor don.',
};

// ── Descripciones de Luna ────────────────────────────────────────────────────

export const MOON_DESC: Record<ZodiacSign, string> = {
  'Aries':
    'Tu mundo emocional reacciona con rapidez e intensidad ante cualquier estímulo del entorno. ' +
    'Las emociones que no se expresan de inmediato se acumulan y se convierten en frustración o impaciencia que tarde o temprano estalla. ' +
    'Te nutres de desafíos, de empezar proyectos nuevos y de la sensación de que aún hay territorio por explorar y conquistar. ' +
    'Aprender a dar espacio a tus emociones antes de actuar desde ellas es uno de los trabajos interiores más importantes de tu vida.',

  'Tauro':
    'Tu mundo emocional necesita estabilidad, continuidad y sensaciones concretas para sentirse verdaderamente seguro. ' +
    'El cuerpo es tu barómetro emocional más fiable — el placer, la comida, el tacto, la naturaleza te regulan de formas que la mente racional no puede alcanzar. ' +
    'Los cambios bruscos en tu entorno o en tus relaciones te desestabilizan profundamente, mucho más de lo que sueles mostrar al exterior. ' +
    'Tu forma de cuidar y ser cuidado pasa siempre por lo tangible y lo real — el amor que no se materializa en hechos concretos no lo terminas de sentir.',

  'Géminis':
    'Tu mundo emocional procesa todo a través del intelecto — necesitas entender lo que sientes antes de poder habitarlo del todo. ' +
    'Las conversaciones, los libros y los intercambios de ideas son tu forma más eficaz de regulación emocional cuando algo dentro de ti no está bien. ' +
    'La monotonía afectiva y la rutina emocional te agotan más que cualquier conflicto — necesitas variedad incluso en el plano de los sentimientos. ' +
    'Tu mayor desafío es aprender a estar presente en la emoción sin convertirla inmediatamente en análisis o en conversación.',

  'Cáncer':
    'Tu mundo emocional es profundo, cíclico y profundamente conectado con tus raíces, tu historia y tu herencia familiar. ' +
    'Tienes una memoria emocional extraordinaria — las experiencias del pasado te acompañan durante décadas con una viveza que a veces asombra incluso a los demás. ' +
    'El hogar, la familia y la intimidad real son tu refugio más genuino y también tu mayor vulnerabilidad cuando algo en ese espacio se rompe. ' +
    'Aprender a nutrirte a ti mismo con la misma intensidad con la que nutres a los que amas es el trabajo interior más importante de tu vida.',

  'Leo':
    'Tu mundo emocional necesita ser visto, reconocido y celebrado para poder florecer con toda su intensidad. ' +
    'Das afecto con una generosidad dramática y sincera, y en el fondo esperas recibirlo con la misma calidez e intensidad. ' +
    'Cuando te sientes ignorado, no valorado o dejado de lado, la herida es profunda aunque rara vez la muestres de manera directa. ' +
    'Tu calidez emocional es uno de tus mayores dones naturales — cuando aprendes a dirigirla también hacia ti mismo, cambia todo.',

  'Virgo':
    'Tu mundo emocional procesa todo a través del análisis y busca siempre la utilidad práctica en cada sentimiento que surge. ' +
    'Te sientes seguro emocionalmente cuando eres útil, cuando las cosas tienen orden y cuando puedes mejorar o resolver algo concreto. ' +
    'La autocrítica es tu mayor enemigo interior — ningún estándar que te impongas va a ser suficientemente alto ni ningún logro suficientemente bueno. ' +
    'Aprender a abrazar la imperfección propia y a ver los errores como información en lugar de fracasos es tu camino más claro hacia la paz interior.',

  'Libra':
    'Tu mundo emocional necesita armonía y equilibrio en las relaciones para poder funcionar bien en todos los demás ámbitos. ' +
    'Los conflictos no resueltos y la tensión sostenida en el entorno te generan un malestar casi físico que interfiere con todo lo demás. ' +
    'Tienes una capacidad natural para ver todos los lados de cualquier situación, lo que a veces paraliza tu respuesta emocional cuando más necesitas claridad. ' +
    'Aprender a tener tus propias necesidades emocionales claras — sin depender de la validación o el acuerdo de los demás — es tu gran trabajo interior.',

  'Escorpio':
    'Tu mundo emocional funciona en profundidades que muy pocas personas llegan a conocer ni a intuir siquiera. ' +
    'Sientes todo con una intensidad que puede ser abrumadora tanto para ti como para quienes conviven más cerca de ti. ' +
    'La traición, la pérdida de confianza o la percepción de una mentira son las heridas que más tiempo tardan en cicatrizar en tu interior. ' +
    'Tu mayor fortaleza emocional es tu capacidad de transformar el dolor en autoconocimiento y la crisis en una regeneración profunda y real.',

  'Sagitario':
    'Tu mundo emocional necesita libertad, espacio y la sensación constante de que el futuro tiene posibilidades ilimitadas todavía. ' +
    'Te nutres de aventuras, de nuevos aprendizajes y de la sensación de que la vida sigue expandiéndose más allá de lo conocido. ' +
    'La rutina emocional y las relaciones demasiado demandantes te generan una claustrofobia casi física que resulta difícil de ignorar. ' +
    'Aprender a comprometerte emocionalmente sin sentir que en el proceso pierdes tu libertad fundamental es tu principal desafío afectivo.',

  'Capricornio':
    'Tu mundo emocional está gobernado por una disciplina tan profunda que desde fuera a veces parece que no sientes. ' +
    'Procesas las emociones internamente, en privado y durante tiempo, antes de permitir que alguien externo las vea o las conozca. ' +
    'Te sientes emocionalmente estable cuando logras metas, cuando el esfuerzo tiene recompensa visible y cuando las cosas están bajo tu control. ' +
    'Aprender a mostrar vulnerabilidad sin sentirlo como debilidad y a pedir ayuda sin sentirlo como fracaso es tu gran trabajo interior.',

  'Acuario':
    'Tu mundo emocional tiende a intelectualizar los sentimientos antes de permitirte experimentarlos en toda su dimensión. ' +
    'Te nutres de conexiones significativas con ideas y con grupos más que de la intimidad individual, que puede resultarte compleja o intensa. ' +
    'Eres capaz de una lealtad profunda hacia los que considers "tu tribu", aunque la cercanía emocional sostenida a veces te genera la necesidad de distancia. ' +
    'Aprender a habitar la emoción sin convertirla inmediatamente en concepto o en análisis es tu camino más claro hacia la plenitud afectiva.',

  'Piscis':
    'Tu mundo emocional es como el océano — sin fronteras claras, en constante movimiento y capaz de absorber las emociones de todos los que te rodean. ' +
    'Tienes una empatía tan desarrollada que frecuentemente sientes lo que otros sienten antes de que ellos mismos lo hayan identificado. ' +
    'La sobrecarga emocional y el agotamiento empático son tus mayores riesgos cuando no cuidas los límites con las personas y los entornos que te rodean. ' +
    'La soledad y el silencio no son lujos para ti — son necesidades básicas de supervivencia que debes aprender a reclamar sin culpa.',
};

// ── Descripciones de Ascendente ──────────────────────────────────────────────

export const ASC_DESC: Record<ZodiacSign, string> = {
  'Aries':
    'El mundo te percibe como alguien directo, enérgico y listo para la acción desde el primer momento del encuentro. ' +
    'Tu presencia tiene una inmediatez que puede ser magnética o intimidante según el contexto y la persona que tienes enfrente. ' +
    'Proyectas independencia y la capacidad de actuar sin necesitar el permiso ni la aprobación de nadie. ' +
    'A veces muestras más impaciencia y más urgencia de las que realmente sientes por dentro, lo cual puede dar una primera impresión más dura de lo que eres.',

  'Tauro':
    'El mundo te percibe como alguien sereno, fiable y con una presencia física reconfortante y sólida. ' +
    'Proyectas estabilidad — la gente siente instintivamente que puede apoyarse en ti sin que te tambalees. ' +
    'Tu imagen transmite paciencia, constancia y un apetito refinado por las cosas buenas y bien hechas de la vida. ' +
    'La elegancia natural, la calidez física y el atractivo son constantes en tu presencia que no requieren esfuerzo ni actuación.',

  'Géminis':
    'El mundo te percibe como alguien vivaz, inteligente y siempre con algo interesante o estimulante que decir o preguntar. ' +
    'Proyectas una energía juvenil e inquieta que resulta contagiosa y estimulante para la mayoría de personas con las que interactúas. ' +
    'Tu imagen es versátil — puedes adaptarte a contextos y registros muy distintos con una facilidad que asombra a quienes te conocen. ' +
    'A veces das una primera impresión de superficialidad o de ligereza que no se corresponde en absoluto con la profundidad real que tienes.',

  'Cáncer':
    'El mundo te percibe como alguien cercano, empático y con una calidez que se siente desde los primeros minutos del encuentro. ' +
    'Tu cara es expresiva y tu mirada transmite una profundidad emocional que otros reconocen y buscan de manera instintiva. ' +
    'Proyectas protección — la gente siente que puede ser vulnerable en tu presencia sin riesgo de ser juzgada o expuesta. ' +
    'Tu imagen más auténtica y más poderosa aparece en contextos íntimos y de confianza, no en los escenarios públicos y formales.',

  'Leo':
    'El mundo te percibe como alguien con presencia, con carisma natural y con una confianza que atrae miradas sin buscarlo. ' +
    'Entras en cualquier sala y el espacio cambia ligeramente — no por arrogancia sino por una energía genuina que simplemente irradia. ' +
    'Proyectas generosidad, calidez y la sensación de que estar cerca de ti tiene algo de especial y de exclusivo. ' +
    'Hay un elemento teatral en tu imagen que usas con más consciencia de la que aparentas, y que te convierte en alguien difícil de ignorar.',

  'Virgo':
    'El mundo te percibe como alguien preciso, competente y con un nivel de atención al detalle que genera confianza inmediata. ' +
    'Proyectas eficiencia y un rigor silencioso que las personas captan antes de que hayas dicho o hecho nada especial. ' +
    'Tu presencia es más reservada que expansiva, lo que a veces oculta una calidez interior que solo muestras cuando alguien se ha ganado tu confianza real. ' +
    'La discreción y la modestia son parte permanente de tu imagen, incluso cuando los logros que acumulas merecerían mucho más reconocimiento.',

  'Libra':
    'El mundo te percibe como alguien elegante, diplomático y agradable desde el primer momento del encuentro. ' +
    'Proyectas equilibrio y una capacidad natural para hacer que los demás se sientan cómodos, escuchados y bien tratados. ' +
    'Tu imagen estética está siempre cuidada — el aspecto, el entorno y los detalles visuales importan como extensión de tu identidad. ' +
    'La amabilidad y el tacto son tus herramientas de navegación social más características y también las que más te abren puertas en la vida.',

  'Escorpio':
    'El mundo te percibe como alguien intenso, con profundidad y con una presencia que no se revela ni se deja conocer fácilmente. ' +
    'Tu mirada es de las que la gente recuerda tiempo después del encuentro — hay algo en ella que parece ver más allá de lo que se muestra. ' +
    'Proyectas poder y una sensación de control sin necesitar declararlo ni demostrarlo explícitamente ante nadie. ' +
    'La gente puede sentirse inicialmente un poco cautelosa ante ti, y profundamente atraída e intrigada después de conocerte un poco más.',

  'Sagitario':
    'El mundo te percibe como alguien abierto, optimista y con una energía expansiva que resulta genuinamente contagiosa. ' +
    'Proyectas aventura y la sensación de que la vida tiene siempre algo más por ofrecer si te atreves a buscarlo. ' +
    'Tu imagen es directa y sin capas — lo que ves en la superficie es en gran medida lo que hay por dentro, sin agendas ocultas. ' +
    'El humor y la honestidad son las dos constantes más reconocibles de tu presencia en cualquier contexto y con cualquier persona.',

  'Capricornio':
    'El mundo te percibe como alguien serio, responsable y con una madurez que no siempre corresponde a tu edad real ni a tu momento vital. ' +
    'Proyectas autoridad y la sensación de que tienes las cosas bajo control incluso en los momentos en que sientes lo contrario por dentro. ' +
    'Tu imagen es profesional y estructurada — raramente muestras en público lo que realmente está pasando en tu interior o en tu vida personal. ' +
    'La gente te toma en serio desde el primer momento y te asigna responsabilidades con una naturalidad que a veces no pediste ni buscaste.',

  'Acuario':
    'El mundo te percibe como alguien diferente, original y con una forma de ver y de hacer las cosas que no encaja en ninguna categoría estándar. ' +
    'Proyectas una independencia radical y cierta indiferencia hacia las normas sociales convencionales que no parecen tener sentido para ti. ' +
    'Tu imagen puede ser excéntrica o simplemente única, pero siempre es reconociblemente tuya — nadie te confunde con nadie más. ' +
    'Marcas tendencia sin proponértelo, porque genuinamente vas por delante del tiempo en la mayoría de las cosas que adoptas y defiendes.',

  'Piscis':
    'El mundo te percibe como alguien sensible, adaptable y con una presencia suave que no amenaza ni genera tensión. ' +
    'Proyectas comprensión y la sensación de que puedes escuchar y sostener lo que otros traen sin juzgar ni aconsejar antes de tiempo. ' +
    'Tu imagen tiene algo de etéreo y de ligeramente ausente — no siempre pareces del todo anclado en el plano físico y concreto. ' +
    'La gente se acerca a ti de manera natural en busca de consuelo, de comprensión o de una perspectiva distinta sobre sus problemas.',
};

// ── Descripciones de números (numerología) ───────────────────────────────────

export const NUM_DESC: Record<number, string> = {
  1:  'Líder nato, independiente y pionero. Tu camino de vida consiste en aprender a confiar en tu propia visión aunque nadie más la vea todavía. ' +
      'Tienes una capacidad innata para iniciar, para abrir caminos que otros después recorrerán. ' +
      'El mayor desafío es la dependencia emocional de la validación externa — mientras más confíes en ti mismo, más fluirá tu camino.',

  2:  'Diplomático, empático y cooperativo por naturaleza. Tu fuerza más genuina está en las relaciones, la mediación y la capacidad de hacer que los demás se sientan comprendidos. ' +
      'Tienes una sensibilidad extraordinaria a las necesidades ajenas que puede ser un don y también una carga. ' +
      'El mayor desafío es aprender que tus propias necesidades importan tanto como las de quienes cuidas.',

  3:  'Creativo, expresivo y comunicador nato. Tu misión pasa por inspirar al mundo con tus palabras, tu arte o tu presencia, en cualquier forma que tome. ' +
      'Tienes un optimismo natural y una capacidad para conectar con las personas que resultan casi magnéticos. ' +
      'El mayor desafío es la dispersión — tienes tantos dones que a veces cuesta comprometerse de verdad con uno solo.',

  4:  'Constructor, práctico y metódico. Tu camino consiste en crear cimientos sólidos y duraderos — en ti, en tu trabajo, en lo que construyes para los demás. ' +
      'Tienes una ética de trabajo excepcional y una capacidad para la organización que pocas personas igualan. ' +
      'El mayor desafío es la rigidez — aprender a adaptarte cuando los planes cambian sin sentirlo como un fracaso personal.',

  5:  'Libre, adaptable y radicalmente versátil. Tu vida exige cambio, aventura y experiencia directa del mundo para sentirse completa. ' +
      'Tienes una curiosidad insaciable y una capacidad de adaptación que te permite prosperar donde otros se perderían. ' +
      'El mayor desafío es el compromiso — aprender a profundizar en algo antes de pasar al siguiente horizonte.',

  6:  'Cuidador, armonioso y profundamente responsable. Tu misión pasa por nutrir, sanar, enseñar o crear belleza en el entorno que te rodea. ' +
      'Tienes una capacidad de amor y de entrega que puede ser tu mayor fortaleza y también tu mayor vulnerabilidad. ' +
      'El mayor desafío es aprender que el cuidado tiene que empezar por uno mismo para poder darse con genuinidad a los demás.',

  7:  'Analítico, espiritual e introspectivo por naturaleza. Tu camino pasa por la búsqueda profunda de la verdad — interna, filosófica o espiritual. ' +
      'Tienes una mente penetrante y una capacidad para el análisis que te lleva a conclusiones que otros tardan años en alcanzar. ' +
      'El mayor desafío es el aislamiento — la profundidad necesita también de la conexión con los demás para no volverse ensimismamiento.',

  8:  'Ambicioso, ejecutivo y con un magnetismo natural para el poder y los recursos. Tu misión pasa por gestionar el poder — económico, institucional, personal — con integridad. ' +
      'Tienes una capacidad para los negocios, el liderazgo y la gestión de recursos que pocas personas igualan de manera natural. ' +
      'El mayor desafío es el equilibrio entre el mundo material y el mundo interior, y aprender que el éxito exterior no sustituye a la plenitud interna.',

  9:  'Humanitario, sabio y profundamente compasivo. Tu camino pasa por dar al mundo desde la plenitud, no desde la necesidad ni la obligación. ' +
      'Tienes una visión universal y una capacidad para entender el sufrimiento humano que te convierte en un canal natural de sanación y servicio. ' +
      'El mayor desafío es aprender a soltar — personas, situaciones, identidades — cuando el ciclo ha terminado y la vida pide renovación.',

  11: 'Número Maestro de intuición elevada y misión espiritual. Vibras en una frecuencia doble — la intensidad del 11 requiere un trabajo interior constante para canalizarse sin agotarse. ' +
      'Tienes una sensibilidad extraordinaria y una capacidad de percepción que va más allá de lo racional. ' +
      'El mayor desafío es gestionar la intensidad — aprender a ser puente entre mundos sin perder el suelo bajo los pies.',

  22: 'Número Maestro del Gran Constructor. Tienes la capacidad de materializar visiones a escala global — no en lo pequeño sino en lo que transforma sistemas enteros. ' +
      'Esta vibración combina la intuición del 11 con la capacidad constructiva del 4, generando un potencial extraordinario cuando se usa conscientemente. ' +
      'El mayor desafío es la presión de semejante potencial — aprender a avanzar sin paralizarse por la magnitud de lo que eres capaz de crear.',

  33: 'Número Maestro del Maestro Servidor. Estás aquí para amar y servir al mundo desde el amor incondicional más profundo. ' +
      'Esta vibración combina la creatividad del 3 multiplicada, con una misión de sanación y compasión universal que pocos pueden sostener. ' +
      'El mayor desafío es no confundir la entrega con el autosacrificio — el 33 necesita tener su propia copa llena para poder dar desde la abundancia.',
};

export const YEAR_DESC: Record<number, string> = {
  1:  'Año 1 — El inicio de un ciclo nuevo de 9 años. Es el momento de sembrar con consciencia las semillas que quieres cosechar en la próxima década. ' +
      'La energía favorece los nuevos comienzos, los proyectos propios y el desarrollo de la independencia personal. ' +
      'Lo que inicies este año marcará el tono de los ocho años que siguen — actúa desde la visión, no desde el miedo.',

  2:  'Año 2 — Año de cooperación, paciencia y relaciones. Las asociaciones, los equipos y la diplomacia son el foco central de este ciclo. ' +
      'La energía no favorece los grandes avances en solitario — pide colaboración, escucha activa y sensibilidad hacia los demás. ' +
      'Lo que construyas con otros este año puede resultar más duradero que lo que puedas construir solo.',

  3:  'Año 3 — Año de expresión, creatividad y expansión social. La comunicación, el arte y el optimismo están en su punto más alto. ' +
      'Es un año para disfrutar, compartir y dejar que la alegría sea un motor legítimo de decisiones. ' +
      'Cuidado con la dispersión y la superficialidad — disfruta del año pero sin perder el hilo de lo que importa.',

  4:  'Año 4 — Año de trabajo, estructura y consolidación. Es tiempo de construir las bases de lo que quieres que sea duradero. ' +
      'La energía pide responsabilidad, disciplina y atención a los detalles que antes pasaban desapercibidos. ' +
      'No es el año más glamuroso, pero el trabajo bien hecho ahora da frutos durante los siguientes ciclos.',

  5:  'Año 5 — Año de cambio, libertad y renovación profunda. Las transformaciones — elegidas o impuestas — son el tema central. ' +
      'La energía pide adaptabilidad, apertura a lo nuevo y disposición a soltar lo que ya no sirve. ' +
      'Abraza lo inesperado — este año los mejores regalos frecuentemente llegan disfrazados de sorpresas o de crisis.',

  6:  'Año 6 — Año de hogar, amor, familia y responsabilidades. El foco se mueve hacia las relaciones más cercanas e íntimas. ' +
      'Es un año para cuidar, para crear belleza en el entorno y para asumir compromisos con consciencia. ' +
      'El servicio genuino a los demás este año puede traer satisfacciones profundas y duraderas.',

  7:  'Año 7 — Año de introspección, espiritualidad y búsqueda interior. Es el año menos extrovertido del ciclo — y por algo es así. ' +
      'La energía pide quietud, reflexión y la valentía de hacerte las preguntas que llevas tiempo evitando. ' +
      'No es el mejor año para grandes movimientos externos — es el mejor año para entender qué quieres realmente y por qué.',

  8:  'Año 8 — Año de poder, abundancia y cosecha. Lo que sembrastes en los últimos 7 años empieza a dar frutos visibles. ' +
      'La energía favorece los negocios, el reconocimiento, las inversiones y todo lo relacionado con el mundo material. ' +
      'Es el año de actuar con decisión y ambición — los recursos y las oportunidades están disponibles si los buscas.',

  9:  'Año 9 — Año de cierre, liberación y preparación. El ciclo de 9 años está terminando — es tiempo de soltar lo que ya no sirve. ' +
      'La energía pide perdón, cierre de asuntos pendientes y dejar ir personas, situaciones e identidades que ya cumplieron su función. ' +
      'No inicies nada nuevo de gran envergadura — primero termina lo que hay que terminar para llegar limpio al próximo ciclo.',

  11: 'Año Maestro 11 — Año de inspiración, visión y revelaciones espirituales. La intuición está amplificada al máximo. ' +
      'Es un año para confiar en lo que percibes más allá de la lógica y para compartir esa visión con el mundo. ' +
      'La sensibilidad también estará amplificada — cuida los límites y los descansos con más cuidado de lo habitual.',

  22: 'Año Maestro 22 — Año de materialización y grandes proyectos. La capacidad de hacer real lo que parece imposible está disponible. ' +
      'Es el año para iniciar los proyectos más ambiciosos, los que requieren más estructura y más visión a largo plazo. ' +
      'La presión puede ser intensa — pero la recompensa de lo que construyas en este ciclo puede durar décadas.',

  33: 'Año Maestro 33 — Año de servicio, amor universal y entrega consciente. La compasión y la sanación son los temas centrales. ' +
      'Es un año para dar, para crear, para sanar — a ti mismo y a los que te rodean — desde el amor más profundo. ' +
      'Cuida el equilibrio entre el dar y el recibir — el Maestro Servidor necesita también ser cuidado.',
};

// ── Síntesis Big Three ───────────────────────────────────────────────────────

export function buildSynthesis(sun: SignPos, moon: SignPos, asc: SignPos): string {
  const sunEl  = SIGN_ELEMENT[sun.sign];
  const moonEl = SIGN_ELEMENT[moon.sign];
  const ascEl  = SIGN_ELEMENT[asc.sign];

  const counts: Record<string, number> = {};
  for (const el of [sunEl, moonEl, ascEl]) counts[el] = (counts[el] || 0) + 1;
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

  if (dominant[1] === 3) {
    return (
      `Con los tres pilares de tu carta en ${dominant[0].toLowerCase()}, hay una coherencia notable entre quien eres en esencia (Sol en ${sun.sign}), cómo sientes (Luna en ${moon.sign}) y cómo te proyectas al mundo (Ascendente en ${asc.sign}). ` +
      `Tu naturaleza ${ELEMENT_NATURE[dominant[0]]} se expresa de manera consistente en todas las dimensiones de tu personalidad. ` +
      `Hay muy poca distancia entre quien eres por dentro y quien el mundo ve — esa autenticidad es tu mayor fortaleza y también tu mayor vulnerabilidad.`
    );
  }

  if (dominant[1] === 2) {
    const domEl = dominant[0];
    const otherEl = [sunEl, moonEl, ascEl].find(el => el !== domEl)!;
    const dominantPlacements = [
      sunEl === domEl  ? `Sol en ${sun.sign}`  : null,
      moonEl === domEl ? `Luna en ${moon.sign}` : null,
      ascEl === domEl  ? `Ascendente en ${asc.sign}` : null,
    ].filter(Boolean).join(' y ');
    const otherPlacement =
      sunEl !== domEl  ? `Sol en ${sun.sign}` :
      moonEl !== domEl ? `Luna en ${moon.sign}` :
      `Ascendente en ${asc.sign}`;

    return (
      `Con ${dominantPlacements} en ${domEl.toLowerCase()}, tu naturaleza fundamental es ${ELEMENT_NATURE[domEl]}. ` +
      `El ${otherPlacement} añade una dimensión de energía ${ELEMENT_NATURE[otherEl]} que enriquece y complementa ese carácter dominante. ` +
      `Esta combinación te da una base reconocible y sólida con matices que evitan la rigidez — eres inconfundiblemente tú mismo y a la vez capaz de adaptarte cuando el momento lo requiere.`
    );
  }

  // All three elements different
  return (
    `Tu Big Three combina tres energías elementales distintas: Sol en ${sun.sign} (${sunEl.toLowerCase()}), Luna en ${moon.sign} (${moonEl.toLowerCase()}) y Ascendente en ${asc.sign} (${ascEl.toLowerCase()}). ` +
    `Esta diversidad elemental te da una riqueza interior notable — diferentes partes de ti resuenan con energías muy distintas. ` +
    `Puedes adaptarte a contextos muy variados y comprender perspectivas que para otros resultan completamente ajenas, aunque a veces cueste sentir que tienes un centro claro desde el que operar.`
  );
}
