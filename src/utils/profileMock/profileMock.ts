import type { AthletePerson } from "@hooks/useFakePeople/useFakePeople";

function cyrb128(str: string) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = (h3 ^ (h1 >>> 18)) >>> 0;
  h2 = (h4 ^ (h2 >>> 22)) >>> 0;
  h3 = (h1 ^ (h3 >>> 17)) >>> 0;
  h4 = (h2 ^ (h4 >>> 19)) >>> 0;
  return [h1, h2, h3, h4];
}
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick<T>(rng: () => number, arr: T[]) {
  return arr[Math.floor(rng() * arr.length)];
}
function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}
export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type Sport = "soccer" | "swimming" | "tennis" | "basketball";

export type ProfileExtra = {
  coverUrl: string;
  title: string;
  subtitle: string;
  social: { ig?: string; tiktok?: string; x?: string; yt?: string };
  age: number;
  heightCm: number;
  weightKg: number;
  specialtyTitle: string;
  specialtyText: string;
};

const FALLBACK_COVERS: Record<Sport, string> = {
  tennis: "/covers/tennis.jpg",
  soccer: "/covers/soccer.jpg",
  basketball: "/covers/basketball.jpg",
  swimming: "/covers/swimming.jpg",
};

export function makeProfileExtra(
  person: AthletePerson,
  sport: Sport,
  globalSeed = "athlete-profile-2025",
  coverMap: Partial<Record<Sport, string>> = {}
): ProfileExtra {
  const [a, b, c, d] = cyrb128(
    `${globalSeed}|${sport}|${person.name}|${person.country}|${person.gender}`
  );
  const rng = mulberry32(a ^ b ^ c ^ d);

  const ranges: Record<
    Sport,
    { h: [number, number]; w: [number, number]; age: [number, number] }
  > = {
    tennis: {
      h: [
        person.gender === "female" ? 160 : 170,
        person.gender === "female" ? 183 : 198,
      ],
      w: [
        person.gender === "female" ? 52 : 63,
        person.gender === "female" ? 75 : 92,
      ],
      age: [16, 34],
    },
    soccer: {
      h: [
        person.gender === "female" ? 157 : 166,
        person.gender === "female" ? 180 : 192,
      ],
      w: [
        person.gender === "female" ? 48 : 58,
        person.gender === "female" ? 70 : 86,
      ],
      age: [16, 36],
    },
    basketball: {
      h: [
        person.gender === "female" ? 170 : 185,
        person.gender === "female" ? 195 : 215,
      ],
      w: [
        person.gender === "female" ? 60 : 80,
        person.gender === "female" ? 90 : 118,
      ],
      age: [16, 36],
    },
    swimming: {
      h: [
        person.gender === "female" ? 160 : 170,
        person.gender === "female" ? 185 : 200,
      ],
      w: [
        person.gender === "female" ? 50 : 58,
        person.gender === "female" ? 72 : 92,
      ],
      age: [14, 32],
    },
  };
  const R = ranges[sport];
  const heightCm = Math.round(
    clamp(R.h[0] + rng() * (R.h[1] - R.h[0]), R.h[0], R.h[1])
  );
  const weightKg = Math.round(
    clamp(R.w[0] + rng() * (R.w[1] - R.w[0]), R.w[0], R.w[1])
  );
  const age = Math.round(
    clamp(R.age[0] + rng() * (R.age[1] - R.age[0]), R.age[0], R.age[1])
  );

  let specialtyTitle = "POSICIÓN (ESPECIALIDAD)";
  let specialtyText = "";
  if (sport === "tennis") {
    const hand =
      person.gender === "female"
        ? pick(rng, ["Diestra", "Zurda"])
        : pick(rng, ["Diestro", "Zurdo"]);
    const style = pick(rng, [
      "juego de fondo",
      "ofensivo",
      "defensivo",
      "all-court",
      "saque-volea",
    ]);
    const bh = pick(rng, ["revés a dos manos", "revés a una mano"]);
    specialtyText = `${hand}, ${style} con ${bh}.`;
  } else if (sport === "soccer") {
    const pos = pick(rng, [
      "Portero",
      "Defensa central",
      "Lateral derecho",
      "Lateral izquierdo",
      "Mediocentro",
      "Mediapunta",
      "Extremo derecho",
      "Extremo izquierdo",
      "Delantero centro",
    ]);
    const foot =
      person.gender === "female"
        ? pick(rng, ["Diestra", "Zurda"])
        : pick(rng, ["Diestro", "Zurdo"]);
    const trait = pick(rng, [
      "velocidad",
      "finalización",
      "pase largo",
      "regate",
      "juego aéreo",
      "marcaje",
    ]);
    specialtyText = `${pos}; ${foot}; ${trait}.`;
  } else if (sport === "basketball") {
    const pos = pick(rng, ["Base", "Escolta", "Alero", "Ala-pívot", "Pívot"]);
    const trait = pick(rng, [
      "tiro exterior",
      "defensa perimetral",
      "rebote",
      "post bajo",
      "transición",
    ]);
    specialtyText = `${pos}; ${trait}.`;
  } else {
    specialtyTitle = "ESPECIALIDAD";
    const style = pick(rng, ["Libre", "Mariposa", "Pecho", "Espalda"]);
    const dist = pick(rng, ["50 m", "100 m", "200 m", "400 m"]);
    const trait = pick(rng, [
      "salida explosiva",
      "virajes",
      "resistencia",
      "ritmo negativo",
    ]);
    specialtyText = `${style} ${dist}; ${trait}.`;
  }

  const titleMap: Record<Sport, string> = {
    tennis: "Tenista profesional",
    soccer: "Futbolista profesional",
    basketball: "Basquetbolista profesional",
    swimming: "Nadador/a profesional",
  };

  const nick = slugify(`${person.name}-${person.country}`);
  const social = {
    ig: `https://instagram.com/${nick}`,
    tiktok: `https://www.tiktok.com/@${nick}`,
    x: `https://x.com/${nick}`,
    yt: `https://youtube.com/@${nick}`,
  };

  const coverUrl = coverMap[sport] ?? FALLBACK_COVERS[sport];

  return {
    coverUrl,
    title: titleMap[sport],
    subtitle: `— ${person.country}`,
    social,
    age,
    heightCm,
    weightKg,
    specialtyTitle,
    specialtyText,
  };
}

// Key desde .env (Vite y CRA)
const CRA_PEXELS_KEY: string | undefined = process.env.REACT_APP_PEXELS_KEY;

function resolvePexelsKey(explicit?: string) {
  return explicit || CRA_PEXELS_KEY || "";
}

function hashIdx(str: string, mod: number) {
  const [a, b, c, d] = cyrb128(str);
  return ((a ^ b ^ c ^ d) >>> 0) % Math.max(1, mod);
}

// Consultas por deporte (orientación horizontal)
const SPORT_QUERIES: Record<Sport, string[]> = {
  tennis: [
    "tennis court aerial",
    "tennis court top view",
    "tennis court grass lines",
  ],
  soccer: [
    "soccer field aerial",
    "football pitch aerial",
    "soccer stadium pitch",
  ],
  basketball: ["basketball court aerial", "basketball parquet top view"],
  swimming: ["swimming pool lanes top view", "olympic swimming pool aerial"],
};

// Devuelve una URL de cover desde Pexels o el fallback local
async function fetchPexelsCoverUrl(
  person: AthletePerson,
  sport: Sport,
  opts?: {
    seed?: string;
    apiKey?: string;
    perPage?: number;
    coverMap?: Partial<Record<Sport, string>>;
  }
): Promise<string> {
  const seed = opts?.seed ?? "athlete-profile-2025";
  const key = resolvePexelsKey(opts?.apiKey);
  const per = Math.min(80, Math.max(10, opts?.perPage ?? 40));
  const fallback = opts?.coverMap?.[sport] ?? FALLBACK_COVERS[sport];

  if (!key) return fallback;

  const queries = SPORT_QUERIES[sport];
  let photos: any[] = [];

  for (const q of queries) {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          q
        )}&orientation=landscape&per_page=${per}&size=large`,
        { headers: { Authorization: key } }
      );
      const json = await res.json();
      if (Array.isArray(json?.photos) && json.photos.length) {
        photos = json.photos;
        break;
      }
    } catch {
      // ignoramos y probamos la siguiente query
    }
  }

  if (!photos.length) return fallback;

  const idx = hashIdx(
    `${seed}|${sport}|${person.name}|${person.country}|${person.gender}`,
    photos.length
  );
  const chosen = photos[idx];
  return (
    chosen?.src?.landscape ||
    chosen?.src?.original ||
    chosen?.src?.large ||
    fallback
  );
}

export async function makeProfileExtraPexels(
  person: AthletePerson,
  sport: Sport,
  options?: {
    globalSeed?: string;
    apiKey?: string;
    perPage?: number;
    coverMap?: Partial<Record<Sport, string>>;
  }
): Promise<ProfileExtra> {
  const base = makeProfileExtra(
    person,
    sport,
    options?.globalSeed ?? "athlete-profile-2025",
    options?.coverMap
  );

  const coverUrl = await fetchPexelsCoverUrl(person, sport, {
    seed: options?.globalSeed,
    apiKey: options?.apiKey,
    perPage: options?.perPage,
    coverMap: options?.coverMap,
  });

  return { ...base, coverUrl };
}

export function makeAthleteBio(
  person: AthletePerson,
  sport: Sport,
  seed = "athlete-profile-2025"
): string {
  const [a, b, c, d] = cyrb128(
    `${seed}|bio|${sport}|${person.name}|${person.country}|${person.gender}`
  );
  const rng = mulberry32(a ^ b ^ c ^ d);

  const startAge = Math.floor(8 + rng() * 6); // 8–13
  const regionals = 8 + Math.floor(rng() * 28); // 8–35
  const nationals = 2 + Math.floor(rng() * 7); // 2–8

  const goals = [
    "competir a nivel internacional",
    "dar el salto al alto rendimiento",
    "conseguir apoyo para giras y torneos",
    "consolidarme en el circuito profesional",
    "obtener una beca deportiva",
  ];
  const goal = pick(rng, goals);

  let strengthBlock = "";
  if (sport === "tennis") {
    const s1 = pick(rng, [
      "el saque",
      "el primer golpe",
      "la movilidad",
      "el juego de fondo",
      "la devolución",
    ]);
    const s2 = pick(rng, [
      "revés sólido",
      "variedad en el slice",
      "transiciones a la red",
      "regularidad en peloteos",
    ]);
    strengthBlock = `Mi fortaleza está en ${s1} y un ${s2}.`;
  } else if (sport === "soccer") {
    const pos = pick(rng, [
      "mediocampista",
      "extremo",
      "delantero",
      "lateral",
      "central",
    ]);
    const s1 = pick(rng, [
      "la velocidad",
      "la visión de juego",
      "la presión alta",
      "el pase entre líneas",
      "la definición",
    ]);
    strengthBlock = `Me desempeño como ${pos}; destaco por ${s1}.`;
  } else if (sport === "basketball") {
    const pos = pick(rng, ["base", "escolta", "alero", "ala-pívot", "pívot"]);
    const s1 = pick(rng, [
      "el tiro exterior",
      "la defensa perimetral",
      "el rebote",
      "el 1-contra-1",
      "la transición ofensiva",
    ]);
    strengthBlock = `Juego como ${pos} y mi punto fuerte es ${s1}.`;
  } else {
    // swimming
    const style = pick(rng, ["libre", "mariposa", "pecho", "espalda"]);
    const dist = pick(rng, ["50 m", "100 m", "200 m", "400 m"]);
    const s1 = pick(rng, [
      "la salida",
      "los virajes",
      "la resistencia",
      "el ritmo negativo",
    ]);
    strengthBlock = `Mi especialidad es ${style} en ${dist}; sobresalgo por ${s1}.`;
  }

  return [
    `Soy ${
      sport === "tennis"
        ? "tenista"
        : sport === "soccer"
        ? "futbolista"
        : sport === "basketball"
        ? "basquetbolista"
        : "nadador/a"
    } desde los ${startAge} años, con participación en más de ${regionals} torneos regionales y ${nationals} nacionales.`,
    strengthBlock,
    `Aspiro a ${goal} y continuar desarrollándome técnica y mentalmente con el acompañamiento adecuado.`,
  ].join(" ");
}

// ================== ESTADÍSTICAS Y RENDIMIENTO ==================
export type PerfStats = {
  year: {
    ranking: number; // ranking actual del año
    movement: number; // variación vs. última actualización (neg/pos)
    wins: number; // victorias
    losses: number; // derrotas
    titles: number; // títulos en el año
  };
  career: {
    rankingPeak: number; // mejor ranking histórico
    rankingPeakDate: string; // YYYY-MM-DD
    movement: number; // movimiento reciente (puede ser 0)
    wins: number; // victorias históricas
    losses: number; // derrotas históricas
    titles: number; // títulos de carrera
  };
};

function randInt(rng: () => number, min: number, max: number) {
  return Math.floor(min + rng() * (max - min + 1));
}
function dateISO(rng: () => number, yearsBack = 6) {
  const now = new Date();
  const year = now.getFullYear() - randInt(rng, 0, yearsBack);
  const month = randInt(rng, 1, 12);
  const day = randInt(rng, 1, 28);
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

/**
 * Genera estadísticas por deporte de forma determinística.
 * Los rangos son diferentes por deporte para que se sientan reales.
 */
export function makePerformanceStats(
  person: AthletePerson,
  sport: Sport,
  seed = "athlete-stats-2025"
): PerfStats {
  const [a, b, c, d] = cyrb128(
    `${seed}|${sport}|${person.name}|${person.country}|${person.gender}`
  );
  const rng = mulberry32(a ^ b ^ c ^ d);

  // RANGOS por deporte (aprox. realistas)
  type R = {
    rankMax: number;
    yearGames: [number, number];
    yearTitles: [number, number];
    careerGames: [number, number];
    careerTitles: [number, number];
    moveSpan: number; // +- movimiento máximo
  };
  const ranges: Record<Sport, R> = {
    tennis: {
      rankMax: 800,
      yearGames: [18, 70],
      yearTitles: [0, 6],
      careerGames: [150, 900],
      careerTitles: [0, 60],
      moveSpan: 7,
    },
    soccer: {
      rankMax: 200,
      yearGames: [15, 50],
      yearTitles: [0, 3],
      careerGames: [120, 650],
      careerTitles: [0, 40],
      moveSpan: 5,
    },
    basketball: {
      rankMax: 150,
      yearGames: [20, 65],
      yearTitles: [0, 4],
      careerGames: [160, 900],
      careerTitles: [0, 30],
      moveSpan: 6,
    },
    swimming: {
      rankMax: 400,
      yearGames: [10, 40],
      yearTitles: [0, 5],
      careerGames: [80, 300],
      careerTitles: [0, 35],
      moveSpan: 4,
    },
  };
  const Rg = ranges[sport];

  // Año
  const gamesY = randInt(rng, Rg.yearGames[0], Rg.yearGames[1]);
  const winsY = randInt(rng, Math.floor(gamesY * 0.5), gamesY); // 50–100% victorias
  const lossesY = gamesY - winsY;
  const titlesY = randInt(rng, Rg.yearTitles[0], Rg.yearTitles[1]);
  const rankingY = randInt(rng, 1, Math.max(2, Rg.rankMax));
  const movementY = randInt(rng, -Rg.moveSpan, Rg.moveSpan);

  // Carrera
  const gamesC = randInt(rng, Rg.careerGames[0], Rg.careerGames[1]);
  const winsC = randInt(
    rng,
    Math.floor(gamesC * 0.45),
    Math.floor(gamesC * 0.9)
  );
  const lossesC = Math.max(0, gamesC - winsC);
  const titlesC = randInt(rng, Rg.careerTitles[0], Rg.careerTitles[1]);
  const peak = Math.min(
    rankingY,
    randInt(rng, 1, Math.floor(Rg.rankMax * 0.6))
  ); // mejor ranking
  const movementC = randInt(rng, -Rg.moveSpan, Rg.moveSpan);
  const peakDate = dateISO(rng, 8);

  return {
    year: {
      ranking: rankingY,
      movement: movementY,
      wins: winsY,
      losses: lossesY,
      titles: titlesY,
    },
    career: {
      rankingPeak: peak,
      rankingPeakDate: peakDate,
      movement: movementC,
      wins: winsC,
      losses: lossesC,
      titles: titlesC,
    },
  };
}

// ----- LOGROS DESTACADOS -----
export type Achievement = {
  id: string;
  kind: "title" | "runnerup" | "ranking" | "award" | "medal";
  text: string; // lo que se muestra en la tarjeta
  icon: "trophy" | "cup" | "medal" | "ranking" | "star";
  year: number;
};

// regiones genéricas para darle color al texto
const REGIONS = [
  "Pacífico",
  "Andes",
  "Norte",
  "Sur",
  "Centro",
  "Cono Sur",
  "Caribe",
];
const CATS = ["Sub-16", "Sub-18", "Absoluto", "Sub-20"];

export function makeAchievements(
  person: AthletePerson,
  sport: Sport,
  opts?: { count?: number; seed?: string }
): Achievement[] {
  const count = opts?.count ?? 8;
  const seed = opts?.seed ?? "athlete-achievements-2025";
  const [a, b, c, d] = cyrb128(
    `${seed}|${sport}|${person.name}|${person.country}|${person.gender}`
  );
  const rng = mulberry32(a ^ b ^ c ^ d);

  const thisYear = new Date().getFullYear();
  const yrs = Array.from({ length: 7 }, () => thisYear - randInt(rng, 0, 6)); // últimos 7 años

  const items: Achievement[] = [];

  const push = (
    kind: Achievement["kind"],
    icon: Achievement["icon"],
    text: string,
    year: number
  ) => {
    items.push({
      id: `${kind}-${year}-${items.length}`,
      kind,
      icon,
      text,
      year,
    });
  };

  // Genéricos por deporte
  if (sport === "tennis") {
    const r1 = pick(rng, REGIONS);
    const cat = pick(rng, CATS);
    const itf = randInt(rng, 80, 900);

    push(
      "title",
      "trophy",
      `Campeón ${cat} – Torneo Federación ${yrs[0]}`,
      yrs[0]
    );
    push(
      "runnerup",
      "cup",
      `Subcampeón Copa Regional ${r1} – ${yrs[1]}`,
      yrs[1]
    );
    push("ranking", "ranking", `Ranking ITF: #${itf} (${yrs[2]})`, yrs[2]);
    push(
      "award",
      "star",
      `Reconocimiento a deportista destacado — ${person.country} (${yrs[3]})`,
      yrs[3]
    );
  } else if (sport === "soccer") {
    const r1 = pick(rng, REGIONS);
    const goals = randInt(rng, 8, 28);
    push(
      "title",
      "trophy",
      `Campeón Torneo Apertura — Liga ${r1} (${yrs[0]})`,
      yrs[0]
    );
    push("runnerup", "cup", `Subcampeón Copa Regional — ${yrs[1]}`, yrs[1]);
    push(
      "award",
      "star",
      `Goleador del torneo — ${goals} goles (${yrs[2]})`,
      yrs[2]
    );
    push(
      "ranking",
      "ranking",
      `Convocado a selección juvenil (${yrs[3]})`,
      yrs[3]
    );
  } else if (sport === "basketball") {
    const r1 = pick(rng, REGIONS);
    push("title", "trophy", `Campeón Liga ${r1} — ${yrs[0]}`, yrs[0]);
    push("runnerup", "cup", `Subcampeón Nacional U-19 — ${yrs[1]}`, yrs[1]);
    push("award", "star", `MVP de la temporada — ${yrs[2]}`, yrs[2]);
    push(
      "ranking",
      "ranking",
      `Seleccionado Juego de las Estrellas — ${yrs[3]}`,
      yrs[3]
    );
  } else {
    // swimming
    const style = pick(rng, ["Libre", "Mariposa", "Pecho", "Espalda"]);
    const dist = pick(rng, ["50 m", "100 m", "200 m", "400 m"]);
    push(
      "medal",
      "medal",
      `Medalla de oro — ${style} ${dist} (${yrs[0]})`,
      yrs[0]
    );
    push("title", "trophy", `Campeón Nacional — ${yrs[1]}`, yrs[1]);
    push("runnerup", "cup", `Plata en Campeonato Regional (${yrs[2]})`, yrs[2]);
    push(
      "award",
      "star",
      `Récord del club — ${style} ${dist} (${yrs[3]})`,
      yrs[3]
    );
  }

  // Completar hasta "count" con variaciones
  while (items.length < count) {
    const y = thisYear - randInt(rng, 0, 6);
    const r = pick(rng, REGIONS);
    const more = [
      () => ({
        kind: "title" as Achievement["kind"],
        icon: "trophy" as Achievement["icon"],
        txt: `Campeón Copa ${r} — ${y}`,
      }),
      () => ({
        kind: "runnerup" as Achievement["kind"],
        icon: "cup" as Achievement["icon"],
        txt: `Subcampeón Copa ${r} — ${y}`,
      }),
      () => ({
        kind: "award" as Achievement["kind"],
        icon: "star" as Achievement["icon"],
        txt: `Premio al Fair Play — ${y}`,
      }),
      () => ({
        kind: "ranking" as Achievement["kind"],
        icon: "ranking" as Achievement["icon"],
        txt: `Top ${randInt(rng, 10, 200)} nacional — ${y}`,
      }),
      () => ({
        kind: "medal" as Achievement["kind"],
        icon: "medal" as Achievement["icon"],
        txt: `Medalla en torneo ${r} — ${y}`,
      }),
    ];
    const m = pick(rng, more)();
    push(m.kind, m.icon, m.txt, y);
  }

  // orden cronológico descendente
  items.sort((a, b) => b.year - a.year);
  return items.slice(0, count);
}

// ─────────── HISTORIAL DE PROGRESO ───────────
export type ProgressEntry = {
  year: number;
  title: string;
  detail: string;
};

const CLUBS = [
  "Club Deportivo Valle Verde",
  "Academia Alto Rendimiento",
  "Centro Olímpico Municipal",
  "Club Atlético Unión",
  "Academia ProSport",
  "Club Deportivo Horizonte",
];

function ri(rng: () => number, a: number, b: number) {
  return Math.floor(a + rng() * (b - a + 1));
}

export function makeProgressHistory(
  person: AthletePerson,
  sport: Sport,
  seed = "athlete-history-2025"
): ProgressEntry[] {
  const [a, b, c, d] = cyrb128(
    `${seed}|${sport}|${person.name}|${person.country}|${person.gender}`
  );
  const rng = mulberry32(a ^ b ^ c ^ d);

  const now = new Date().getFullYear();
  const start = now - 6; // 7 años
  const club = CLUBS[ri(rng, 0, CLUBS.length - 1)];
  const region = REGIONS[ri(rng, 0, REGIONS.length - 1)];

  const bySport = {
    tennis: (y: number, i: number): ProgressEntry => {
      const cat = ["Sub-12", "Sub-14", "Sub-16", "Sub-18"][ri(rng, 0, 3)];
      const items: ProgressEntry[] = [
        {
          year: y,
          title: `Inicio en la escuela de tenis (${club})`,
          detail:
            "Participación en torneos internos y primeros entrenamientos formales.",
        },
        {
          year: y + 1,
          title: "Primer torneo intercolegial",
          detail: "Entrenamiento con enfoque técnico (drive, revés y saque).",
        },
        {
          year: y + 2,
          title: `Ingreso al ranking departamental ${cat}`,
          detail:
            "Inicio de preparación física paralela (resistencia y flexibilidad).",
        },
        {
          year: y + 3,
          title: "Primer podio en torneo regional",
          detail: "Trabajo de fortaleza mental con psicólogo deportivo.",
        },
        {
          year: y + 4,
          title: `Campeón Torneo Nacional Juvenil — Categoría ${cat}`,
          detail:
            "Entrenamientos específicos en cancha dura y polvo de ladrillo.",
        },
        {
          year: y + 5,
          title: "Participación en primer torneo internacional (ITF J5)",
          detail:
            "Mejor ranking nacional alcanzado; fortalecimiento del juego ofensivo.",
        },
        {
          year: y + 6,
          title: "Preparación para competencias internacionales",
          detail: "Evaluación biomecánica y cambios técnicos en el servicio.",
        },
      ];
      return items[i];
    },
    soccer: (y: number, i: number): ProgressEntry => {
      const pos = ["Lateral", "Mediocampista", "Extremo", "Delantero"][
        ri(rng, 0, 3)
      ];
      const items: ProgressEntry[] = [
        {
          year: y,
          title: `Ingreso a escuela de fútbol (${club})`,
          detail: "Fundamentos técnicos y participación en ligas internas.",
        },
        {
          year: y + 1,
          title: "Debut en liga intercolegial",
          detail: `Entrenamiento por posiciones (${pos}) y trabajo en coordinación.`,
        },
        {
          year: y + 2,
          title: "Convocatoria a selección regional",
          detail: "Plan de fuerza y prevención de lesiones.",
        },
        {
          year: y + 3,
          title: `Subcampeón Copa ${region}`,
          detail:
            "Primer microciclo de alto rendimiento (GPS y análisis de carga).",
        },
        {
          year: y + 4,
          title: "Debut en torneo nacional juvenil",
          detail: "Mejora en finalización y juego sin balón.",
        },
        {
          year: y + 5,
          title: "Goleador del torneo regional",
          detail: "Trabajo específico de velocidad y potencia.",
        },
        {
          year: y + 6,
          title: "Pruebas en club profesional",
          detail: "Entrenamientos tácticos avanzados y videoanálisis.",
        },
      ];
      return items[i];
    },
    basketball: (y: number, i: number): ProgressEntry => {
      const items: ProgressEntry[] = [
        {
          year: y,
          title: `Ingreso a escuela de básquet (${club})`,
          detail: "Fundamentos de drible y tiro; primeros amistosos.",
        },
        {
          year: y + 1,
          title: "Liga intercolegial — primer quinteto",
          detail: "Enfoque en defensa perimetral y transiciones.",
        },
        {
          year: y + 2,
          title: "Selección regional U-17",
          detail: "Plan de fuerza/hipertrofia y técnica de salto.",
        },
        {
          year: y + 3,
          title: `Subcampeón Liga ${region}`,
          detail: "Inicio de trabajo de lectura de pick and roll.",
        },
        {
          year: y + 4,
          title: "Campeón nacional juvenil",
          detail: "MVP del torneo; plan de tiro exterior de alto volumen.",
        },
        {
          year: y + 5,
          title: "Debut en torneo internacional escolar",
          detail: "Mejora en spacing y rebote ofensivo.",
        },
        {
          year: y + 6,
          title: "Ingreso a programa élite",
          detail: "Monitoreo con GPS y test de potencia (CMJ).",
        },
      ];
      return items[i];
    },
    swimming: (y: number, i: number): ProgressEntry => {
      const style = ["Libre", "Mariposa", "Pecho", "Espalda"][ri(rng, 0, 3)];
      const dist = ["50 m", "100 m", "200 m"][ri(rng, 0, 2)];
      const items: ProgressEntry[] = [
        {
          year: y,
          title: `Ingreso a equipo de natación (${club})`,
          detail: "Técnica de nado y primeros festivales federados.",
        },
        {
          year: y + 1,
          title: "Primer campeonato regional",
          detail: `Clasificación a finales en ${style} ${dist}.`,
        },
        {
          year: y + 2,
          title: "Podio regional",
          detail: "Trabajo específico de virajes y salidas.",
        },
        {
          year: y + 3,
          title: "Finalista nacional juvenil",
          detail: "Plan de resistencia aeróbica y ritmo negativo.",
        },
        {
          year: y + 4,
          title: "Récord del club",
          detail: `${style} ${dist}; control de cargas y pulso en series clave.`,
        },
        {
          year: y + 5,
          title: "Debut en Open internacional",
          detail: "Entrenamiento por pulsos y técnica subacuática.",
        },
        {
          year: y + 6,
          title: "Programa de alto rendimiento",
          detail: "Monitoreo de lactato y fuerza específica en gimnasio.",
        },
      ];
      return items[i];
    },
  } as const;

  const picker = bySport[sport];
  const entries: ProgressEntry[] = Array.from({ length: 7 }, (_, i) =>
    picker(start, i)
  );
  return entries;
}
