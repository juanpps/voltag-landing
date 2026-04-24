// ─────────────────────────────────────────────────────────────────────────────
// Voltag Gym — Programmatic SEO Location Data
// Playbook: Locations — "Gimnasio en [barrio/sector]"
// Targets: Manzanares Sector 1–35, Poblado Campestre, Arboleda Campestre
// ─────────────────────────────────────────────────────────────────────────────

export interface GymLocation {
  slug: string;
  name: string;           // Full location name for headings
  shortName: string;      // For breadcrumbs/badges
  sector?: string;        // Sector number if applicable
  distanceText: string;   // "a 3 minutos caminando" etc.
  distanceMinutes: number;// For sorting/filtering
  hook: string;           // Unique opening hook sentence
  description: string;    // 80–120 word unique description
  nearbyLandmarks: string[];// Nearby reference points
  keywords: string[];     // Primary keywords for this page
  metaTitle: string;
  metaDescription: string;
  competitors?: string[]; // Competitor names mentioned in the area
}

export const locations: GymLocation[] = [
  // ── Manzanares Sector 17 (home base) ─────────────────────────────────────
  {
    slug: 'manzanares-sector-17',
    name: 'Manzanares Sector 17',
    shortName: 'Sector 17',
    sector: '17',
    distanceText: 'en tu mismo sector',
    distanceMinutes: 0,
    hook: 'Voltag Gym está en tu manzana — literalmente.',
    description: 'Si vives en el Sector 17 de Manzanares, Voltag Gym es TU gimnasio. No tienes que coger bus ni cargar maletín lejos. Estamos en la Cl 12 # 20 Oeste - 10, a pasos de los conjuntos del sector. Equipos profesionales de grado comercial, entrenadores certificados, suplementos deportivos y la energía más potente de Candelaria, todo en tu barrio.',
    nearbyLandmarks: ['Conjunto Pórtico', 'Parque Manzanares', 'Supermercado sector 17'],
    keywords: ['gimnasio manzanares sector 17', 'gym sector 17 candelaria', 'voltag gym manzanares'],
    metaTitle: 'Gimnasio en Manzanares Sector 17 | Voltag Gym — tu gym del barrio',
    metaDescription: 'Voltag Gym está en Manzanares Sector 17, Candelaria. Equipos profesionales, entrenadores certificados y planes desde $69.000. ¡El gym de tu barrio!',
  },
  // ── Manzanares Sector 1 ───────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-1',
    name: 'Manzanares Sector 1',
    shortName: 'Sector 1',
    sector: '1',
    distanceText: 'a 7 minutos en moto o bus',
    distanceMinutes: 7,
    hook: 'Del Sector 1 de Manzanares a Voltag Gym son menos de 10 minutos.',
    description: 'Vivir en el Sector 1 de Manzanares ya no es excusa para no entrenar. Voltag Gym en la Cl 12 # 20 Oeste - 10 queda a 7 minutos en moto o en el bus del barrio. Pasas, cambias y entrenas con equipos profesionales, sin pagar lo que cobran los gyms de Cali. Entrenadores certificados, suplementos deportivos directamente importados y la comunidad fitness más seria de Candelaria te esperan.',
    nearbyLandmarks: ['Entrada Manzanares', 'Colegio sector 1', 'Vía Candelaria-Palmira'],
    keywords: ['gimnasio manzanares sector 1', 'gym cerca de manzanares 1', 'gimnasio candelaria sector 1'],
    metaTitle: 'Gimnasio cerca de Manzanares Sector 1 | Voltag Gym Candelaria',
    metaDescription: 'Desde Manzanares Sector 1 llegas a Voltag Gym en 7 minutos. Equipos profesionales, entrenadores certificados y planes desde $69.000 COP.',
  },
  // ── Manzanares Sector 2 ───────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-2',
    name: 'Manzanares Sector 2',
    shortName: 'Sector 2',
    sector: '2',
    distanceText: 'a 6 minutos caminando o en moto',
    distanceMinutes: 6,
    hook: 'Sector 2 de Manzanares tiene el gym más cercano: Voltag.',
    description: 'Los residentes del Sector 2 de Manzanares tienen una ventaja enorme: Voltag Gym está a solo 6 minutos. Sin tener que ir hasta Cali, sin precios absurdos, sin perder toda la tarde. Equipos de pesas libres, máquinas de musculación, cardio, entrenamiento personal y asesoría nutricional. Todo lo que necesitas para transformar tu cuerpo, a un paso de tu casa.',
    nearbyLandmarks: ['Parque sector 2', 'Tienda de barrio Manzanares', 'Vía interna Manzanares'],
    keywords: ['gimnasio manzanares sector 2', 'gym manzanares 2', 'gym cerca candelaria'],
    metaTitle: 'Gimnasio Manzanares Sector 2 | Voltag Gym — entrena cerca',
    metaDescription: 'Voltag Gym, el mejor gimnasio desde Manzanares Sector 2. A 6 minutos de tu casa, con equipos profesionales y planes desde $69.000.',
  },
  // ── Manzanares Sector 3 ───────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-3',
    name: 'Manzanares Sector 3',
    shortName: 'Sector 3',
    sector: '3',
    distanceText: 'a 6 minutos',
    distanceMinutes: 6,
    hook: 'El Sector 3 de Manzanares ya tiene su gym de confianza.',
    description: 'Desde el Sector 3 de Manzanares, llegar a Voltag Gym es tan fácil que no tienes pretexto. 6 minutos y estás dentro, cambiándote y calentando. Nuestras instalaciones tienen 2 pisos completamente equipados, iluminación estilo hexagonal, la mejor vibra del sector y entrenadores que saben lo que hacen. No hay gym más cercano y con mejor calidad en Candelaria.',
    nearbyLandmarks: ['Acceso sur Manzanares', 'Via Ciudad del Valle'],
    keywords: ['gimnasio manzanares sector 3', 'gym candelaria sector 3'],
    metaTitle: 'Gimnasio Manzanares Sector 3 | Voltag Gym Candelaria',
    metaDescription: 'Desde Manzanares Sector 3 hasta Voltag Gym son 6 minutos. Planes desde $69.000, equipos pro y entrenadores certificados.',
  },
  // ── Manzanares Sector 4 ───────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-4',
    name: 'Manzanares Sector 4',
    shortName: 'Sector 4',
    sector: '4',
    distanceText: 'a 5 minutos',
    distanceMinutes: 5,
    hook: 'Manzanares Sector 4 — 5 minutos te separan del gym que mereces.',
    description: 'El Sector 4 de Manzanares está a 5 minutos de Voltag Gym, la opción de entrenamiento más completa de Candelaria. Peso libre, máquinas selectorizadas, cardio, asesoría personalizada y suplementos deportivos en un solo lugar. Planes accesibles desde $69.000 al mes para que no tengas que elegir entre entrenar y tu bolsillo.',
    nearbyLandmarks: ['Zona residencial sector 4', 'Via Candelaria principal'],
    keywords: ['gimnasio manzanares sector 4', 'gym sector 4 candelaria'],
    metaTitle: 'Gimnasio Manzanares Sector 4 | Voltag Gym — 5 min de tu casa',
    metaDescription: 'El mejor gimnasio para Manzanares Sector 4. Voltag Gym a 5 minutos, con equipos profesionales y planes desde $69.000 COP.',
  },
  // ── Manzanares Sector 5 ───────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-5',
    name: 'Manzanares Sector 5',
    shortName: 'Sector 5',
    sector: '5',
    distanceText: 'a 5 minutos',
    distanceMinutes: 5,
    hook: 'Sector 5 de Manzanares: hay un gym de verdad más cerca de lo que crees.',
    description: 'Si buscas un gimnasio desde el Sector 5 de Manzanares, Voltag Gym es tu respuesta. Estamos a 5 minutos y ofrecemos lo que ningún otro gym del área tiene: equipos de grado comercial, entrenadores con certificación, comunidad motivada y un ambiente diferente. Entrena antes del trabajo, al mediodía o en la noche — abrimos desde las 5am hasta las 10pm de lunes a viernes.',
    nearbyLandmarks: ['Residencias sector 5', 'Manzanares norte'],
    keywords: ['gimnasio manzanares 5', 'gym cerca de sector 5 candelaria'],
    metaTitle: 'Gimnasio Manzanares Sector 5 | Voltag Gym Candelaria Valle',
    metaDescription: 'Desde Manzanares Sector 5 a Voltag Gym son 5 minutos. Horarios amplios, planes desde $69.000 y entrenadores certificados.',
  },
  // ── Manzanares Sector 7 ───────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-7',
    name: 'Manzanares Sector 7',
    shortName: 'Sector 7',
    sector: '7',
    distanceText: 'a 8 minutos',
    distanceMinutes: 8,
    hook: 'Sector 7 de Manzanares — Voltag es el gym que tu barrio necesitaba.',
    description: 'Voltag Gym es la mejor opción de entrenamiento para los residentes del Sector 7 de Manzanares. A 8 minutos en moto, encontrarás un gimnasio con 2 pisos de equipos profesionales, entrenadores certificados y un ambiente que te motiva a superar tus metas. Mucho más cerca que Cali y sin los precios de los gyms del norte.',
    nearbyLandmarks: ['Conjunto residencial sector 7', 'Parroquia Manzanares'],
    keywords: ['gimnasio manzanares sector 7', 'gym manzanares 7'],
    metaTitle: 'Gimnasio Manzanares Sector 7 | Voltag Gym — el gym de Candelaria',
    metaDescription: 'Desde Sector 7 de Manzanares llegas a Voltag Gym en 8 minutos. El mejor gym de Candelaria, con precios desde $69.000/mes.',
  },
  // ── Manzanares Sector 10 ──────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-10',
    name: 'Manzanares Sector 10',
    shortName: 'Sector 10',
    sector: '10',
    distanceText: 'a 8 minutos',
    distanceMinutes: 8,
    hook: 'Sector 10, Manzanares — tu gym lo esperas a 8 minutos.',
    description: 'Desde el Sector 10 de Manzanares hasta Voltag Gym son 8 minutos de camino. Nada comparado con el resultado de entrenar con equipos profesionales y el respaldo de entrenadores certificados. Planes desde $69.000 al mes. Sin contratos trampa. Sin mensualidades que te roben. Solo hierro, dedicación y resultados.',
    nearbyLandmarks: ['Zona comercial Manzanares', 'Escuela Manzanares'],
    keywords: ['gimnasio manzanares sector 10', 'gym cerca candelaria sector 10'],
    metaTitle: 'Gimnasio Manzanares Sector 10 | Voltag Gym Candelaria',
    metaDescription: 'Entrena desde Manzanares Sector 10 en Voltag Gym, a solo 8 minutos. Planes desde $69.000, equipos pro, abierto desde las 5am.',
  },
  // ── Manzanares Sector 12 ──────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-12',
    name: 'Manzanares Sector 12',
    shortName: 'Sector 12',
    sector: '12',
    distanceText: 'a 6 minutos',
    distanceMinutes: 6,
    hook: 'Sector 12 — Voltag Gym es el gym que vale la pena.',
    description: 'Los del Sector 12 de Manzanares saben que el buen entreno está cerca. Voltag Gym, a 6 minutos, ofrece los equipos que necesitas para crecer: peso libre completo, máquinas de musculación Panatta, cardio de alto rendimiento y planes de nutrición personalizados. Horarios de lunes a domingo para que nunca tengas excusa de no entrenar.',
    nearbyLandmarks: ['Via interna sector 12', 'Conjunto Manzanares norte'],
    keywords: ['gimnasio manzanares 12', 'gym sector 12 candelaria'],
    metaTitle: 'Gimnasio Manzanares Sector 12 | Voltag Gym — calidad real',
    metaDescription: 'El gym del Sector 12, Manzanares. Voltag Gym a 6 minutos, con equipos de calidad y planes desde $69.000. ¡Entrena hoy!',
  },
  // ── Manzanares Sector 15 ──────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-15',
    name: 'Manzanares Sector 15',
    shortName: 'Sector 15',
    sector: '15',
    distanceText: 'a 4 minutos',
    distanceMinutes: 4,
    hook: 'Sector 15 de Manzanares — estás a 4 minutos de cambiar tu cuerpo.',
    description: 'Desde el Sector 15 de Manzanares, Voltag Gym está a solo 4 minutos. Los más cercanos al sector 17 tienen una ventaja loca: llegar a uno de los mejores gimnasios de Candelaria en menos tiempo que calentar. Pesas libres, máquinas, cardio, entrenadores y comunidad fitness real.',
    nearbyLandmarks: ['Acceso sector 15-16', 'Vía Ciudad del Valle'],
    keywords: ['gimnasio manzanares sector 15', 'gym cerca de sector 15 candelaria'],
    metaTitle: 'Gimnasio Manzanares Sector 15 | Voltag Gym — a 4 min',
    metaDescription: 'Desde Sector 15 de Manzanares a Voltag Gym son 4 minutos. Entrena con equipos pros y paga desde $69.000/mes.',
  },
  // ── Manzanares Sector 20 ──────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-20',
    name: 'Manzanares Sector 20',
    shortName: 'Sector 20',
    sector: '20',
    distanceText: 'a 5 minutos',
    distanceMinutes: 5,
    hook: 'Sector 20 de Manzanares tiene el gym más serio del sur de Cali.',
    description: 'Voltag Gym, a 5 minutos del Sector 20 de Manzanares, es el establecimiento fitness más completo de Ciudad del Valle y Candelaria. 2 pisos de equipo profesional, entrenadores certificados, suplementos, asesoría nutricional y precios justos para los del sector. Sin necesidad de viajar hasta Cali para entrenar como se debe.',
    nearbyLandmarks: ['Zona residencial sector 20', 'Cancha sector 20'],
    keywords: ['gimnasio manzanares sector 20', 'gym sur candelaria', 'gym ciudad del valle'],
    metaTitle: 'Gimnasio Manzanares Sector 20 | Voltag Gym Ciudad del Valle',
    metaDescription: 'Desde Manzanares Sector 20 hasta Voltag Gym son 5 minutos. El gym más completo de Candelaria. Planes desde $69.000 COP.',
  },
  // ── Manzanares Sector 25 ──────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-25',
    name: 'Manzanares Sector 25',
    shortName: 'Sector 25',
    sector: '25',
    distanceText: 'a 8 minutos',
    distanceMinutes: 8,
    hook: 'Sector 25 — ya no tienes que ir a Cali para un gym de verdad.',
    description: 'Desde el Sector 25 de Manzanares, Voltag Gym está a 8 minutos. Antes tocaba ir hasta Cali o conformarse con gimnasios sin equipo. Ahora Voltag cambió el juego: máquinas profesionales, entrenadores con formación, un ambiente que inspira y precios que tienen sentido para la gente del barrio.',
    nearbyLandmarks: ['Residencias sector 25', 'Via Manzanares-Candelaria central'],
    keywords: ['gimnasio manzanares 25', 'gym cerca sector 25'],
    metaTitle: 'Gimnasio Manzanares Sector 25 | Voltag Gym — el gym definitivo',
    metaDescription: 'El gym de Manzanares Sector 25: Voltag Gym a 8 minutos. Equipos pro, planes desde $69.000. Sin ir hasta Cali.',
  },
  // ── Manzanares Sector 30 ──────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-30',
    name: 'Manzanares Sector 30',
    shortName: 'Sector 30',
    sector: '30',
    distanceText: 'a 10 minutos en moto',
    distanceMinutes: 10,
    hook: 'Sector 30 de Manzanares — 10 minutos es todo lo que te separa de Voltag.',
    description: 'Para los del Sector 30 de Manzanares, el gym de calidad ya no queda lejos. Voltag Gym está a 10 minutos en moto, con 2 pisos de equipos profesionales, entrenadores certificados y suplementos deportivos. Más cercano que cualquier gym de Cali y con resultados que hablan solos. Planes desde $69.000 al mes.',
    nearbyLandmarks: ['Conjunto residencial 30', 'Via principal Manzanares norte'],
    keywords: ['gimnasio manzanares sector 30', 'gym manzanares norte'],
    metaTitle: 'Gimnasio Manzanares Sector 30 | Voltag Gym — 10 min de ti',
    metaDescription: 'Desde Manzanares Sector 30 a Voltag Gym son 10 minutos. Entrena con equipos de calidad. Planes desde $69.000 COP.',
  },
  // ── Manzanares Sector 35 ──────────────────────────────────────────────────
  {
    slug: 'manzanares-sector-35',
    name: 'Manzanares Sector 35',
    shortName: 'Sector 35',
    sector: '35',
    distanceText: 'a 12 minutos en moto',
    distanceMinutes: 12,
    hook: 'Sector 35, el más lejano de Manzanares — pero Voltag sigue siendo tu mejor opción.',
    description: 'Aunque el Sector 35 está al otro extremo de Manzanares, Voltag Gym sigue siendo la mejor y más cercana opción de entrenamiento de calidad. 12 minutos en moto y estarás en el único gym de Candelaria con equipos de grado comercial. Vale cada minuto del camino.',
    nearbyLandmarks: ['Límite norte Manzanares', 'Sector residencial 35'],
    keywords: ['gimnasio manzanares sector 35', 'gym candelaria norte'],
    metaTitle: 'Gimnasio Manzanares Sector 35 | Voltag Gym Candelaria',
    metaDescription: 'Desde Manzanares Sector 35 a Voltag Gym son 12 minutos. El gym más completo de Candelaria te espera. Planes desde $69.000.',
  },
  // ── Poblado Campestre ─────────────────────────────────────────────────────
  {
    slug: 'poblado-campestre',
    name: 'Poblado Campestre',
    shortName: 'Poblado Campestre',
    distanceText: 'a 5 minutos en moto o carro',
    distanceMinutes: 5,
    hook: 'Poblado Campestre tiene el gym que nunca pensó que tendría tan cerca.',
    description: 'Los residentes de Poblado Campestre ya saben el secreto: Voltag Gym está a solo 5 minutos, pasando por la vía principal. Un gimnasio de verdad — no un cuarto con unas mancuernas — con 2 pisos de equipos de grado comercial, entrenadores certificados, suplementos y la energía que impulsa a los mejores atletas del sur de Cali. Planes desde $69.000.',
    nearbyLandmarks: ['Conjunto Poblado Campestre', 'Vía Ciudad del Valle', 'Club campestre'],
    keywords: ['gimnasio poblado campestre', 'gym poblado campestre candelaria', 'gym cerca de poblado campestre'],
    metaTitle: 'Gimnasio en Poblado Campestre | Voltag Gym — a 5 min',
    metaDescription: 'Desde Poblado Campestre a Voltag Gym son 5 minutos. El mejor gym cerca de ti. Equipos pro, planes desde $69.000 y entrenadores certificados.',
    competitors: ['Tauros Gym'],
  },
  // ── Arboleda Campestre ────────────────────────────────────────────────────
  {
    slug: 'arboleda-campestre',
    name: 'Arboleda Campestre',
    shortName: 'Arboleda Campestre',
    distanceText: 'a 5 minutos',
    distanceMinutes: 5,
    hook: 'Arboleda Campestre — Voltag Gym es el gimnasio más completo de tu zona.',
    description: 'Si vives en Arboleda Campestre y buscas un gimnasio serio, Voltag Gym es la respuesta. A 5 minutos, tendrás acceso a equipos de musculación profesionales, máquinas de cardio, zona de peso libre, entrenadores con formación y asesoría en nutrición deportiva. La mejor inversión que puedes hacer para tu salud está a la vuelta de la esquina.',
    nearbyLandmarks: ['Conjunto Arboleda Campestre', 'Via Candelaria-Palmira', 'Zona verde Arboleda'],
    keywords: ['gimnasio arboleda campestre', 'gym arboleda campestre candelaria', 'gym cerca de arboleda'],
    metaTitle: 'Gimnasio en Arboleda Campestre | Voltag Gym Candelaria',
    metaDescription: 'Voltag Gym es el gym más cercano a Arboleda Campestre. A 5 minutos, con equipos profesionales y planes desde $69.000 COP.',
    competitors: ['Tauros Gym', 'Leandro Gym'],
  },
  // ── Ciudad del Valle ──────────────────────────────────────────────────────
  {
    slug: 'ciudad-del-valle',
    name: 'Ciudad del Valle',
    shortName: 'Ciudad del Valle',
    distanceText: 'en el corazón de Ciudad del Valle',
    distanceMinutes: 2,
    hook: 'Ciudad del Valle finalmente tiene el gimnasio que merecía.',
    description: 'Voltag Gym está en el corazón de Ciudad del Valle — Manzanares Sector 17 de Candelaria. El gimnasio profesional que los residentes de Ciudad del Valle necesitaban: 2 pisos de equipos de grado comercial, entrenadores certificados, suplementos deportivos, horarios amplios y precios accesibles. Si buscas gym en Ciudad del Valle, Voltag es la respuesta definitiva.',
    nearbyLandmarks: ['Ciudad del Valle centro', 'Colegio Ciudad del Valle', 'Parque principal'],
    keywords: ['gimnasio ciudad del valle', 'gym ciudad del valle candelaria', 'gimnasio en ciudad del valle'],
    metaTitle: 'Gimnasio en Ciudad del Valle, Candelaria | Voltag Gym',
    metaDescription: 'El mejor gimnasio en Ciudad del Valle, Candelaria. Voltag Gym con equipos profesionales, entrenadores certificados y planes desde $69.000.',
    competitors: ['Tauros Gym', 'Leandro Gym'],
  },
  // ── Candelaria ────────────────────────────────────────────────────────────
  {
    slug: 'candelaria',
    name: 'Candelaria, Valle del Cauca',
    shortName: 'Candelaria',
    distanceText: 'en Candelaria',
    distanceMinutes: 5,
    hook: 'El mejor gimnasio de Candelaria no está en el centro — está en tu sector.',
    description: 'Voltag Gym es el gimnasio de referencia de Candelaria, Valle del Cauca. Ubicado en Manzanares Sector 17, Cl 12 # 20 Oeste - 10, ofrecemos lo que los candelareños merecen: equipos profesionales de grado comercial, entrenadores certificados, asesoría nutricional, suplementos deportivos y la comunidad fitness más fuerte del municipio. Planes desde $69.000.',
    nearbyLandmarks: ['Alcaldía Candelaria', 'Parque principal Candelaria', 'Hospital Candelaria'],
    keywords: ['gimnasio candelaria', 'gym candelaria valle del cauca', 'mejor gimnasio candelaria'],
    metaTitle: 'Gimnasio en Candelaria Valle del Cauca | Voltag Gym',
    metaDescription: 'El mejor gimnasio de Candelaria está en Manzanares. Voltag Gym con 2 pisos de equipo profesional, entrenadores y planes desde $69.000.',
    competitors: ['Tauros Gym', 'Leandro Gym'],
  },
  // ── Sur de Cali ───────────────────────────────────────────────────────────
  {
    slug: 'sur-de-cali',
    name: 'Sur de Cali',
    shortName: 'Sur de Cali',
    distanceText: 'a 20 minutos del sur de Cali',
    distanceMinutes: 20,
    hook: 'Al sur de Cali no necesitas un gym caro — Voltag lo tiene todo.',
    description: 'Para quienes viven en el sur de Cali — Puerto Tejada, Villa del Sur, o cerca de Candelaria — Voltag Gym en Manzanares Sector 17 es la alternativa perfecta. Mismo nivel de equipos que los gyms de Cali norte, a 20 minutos, sin el tráfico ni los precios exorbitantes. Entrena como un profesional pagando lo justo.',
    nearbyLandmarks: ['Autopista Cali-Palmira', 'Sector sur Cali', 'Candelaria sur'],
    keywords: ['gimnasio sur de cali', 'gym al sur de cali', 'gimnasio cerca de cali candelaria'],
    metaTitle: 'Gimnasio al Sur de Cali | Voltag Gym en Candelaria',
    metaDescription: 'El mejor gym al sur de Cali está en Candelaria. Voltag Gym a 20 min, con equipos pro y planes desde $69.000. Sin tráfico, sin precios caleños.',
    competitors: ['Bodytech', 'Smart Fit'],
  },
];

// Helper: get by slug
export function getLocationBySlug(slug: string): GymLocation | undefined {
  return locations.find(l => l.slug === slug);
}

// All slugs for Astro getStaticPaths
export function getAllLocationSlugs(): string[] {
  return locations.map(l => l.slug);
}
