import { useEffect, useMemo, useState } from "react";

export type Gender = "male" | "female" | "any";

export type AthletePerson = {
  name: string;
  country: string;
  gender: Gender;
  photo: string;
  photo2x: string;
};

type Opts = {
  count?: number;
  gender?: Gender;
  sport?: string;
  seed?: string;
  apiKey?: string;
  latamOnly?: boolean;
  countries?: string[];
};

function hashIdx(str: string, mod: number) {
  const [a, b, c, d] = cyrb128(str);
  return ((a ^ b ^ c ^ d) >>> 0) % Math.max(1, mod);
}

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

const LATAM_COUNTRIES = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Puerto Rico",
  "República Dominicana",
  "Uruguay",
  "Venezuela",
];

const FIRST_ES_M = [
  "Juan",
  "Mateo",
  "Santiago",
  "Diego",
  "Lucas",
  "Thiago",
  "Nicolás",
  "Sebastián",
  "Andrés",
  "Bruno",
];
const FIRST_ES_F = [
  "Valentina",
  "Camila",
  "Isabella",
  "Sofía",
  "Mariana",
  "Daniela",
  "Gabriela",
  "Lucía",
  "Paula",
  "Carolina",
];
const FIRST_PT_M = [
  "Miguel",
  "Gustavo",
  "Pedro",
  "Henrique",
  "Rafael",
  "João",
  "Felipe",
  "Thiago",
  "Bruno",
  "Luís",
];
const FIRST_PT_F = [
  "Ana",
  "Beatriz",
  "Larissa",
  "Carolina",
  "Mariana",
  "Camila",
  "Fernanda",
  "Eduarda",
  "Isabela",
  "Luísa",
];
const LAST_ES = [
  "García",
  "Martínez",
  "Rodríguez",
  "Gómez",
  "Fernández",
  "González",
  "Pérez",
  "López",
  "Sánchez",
  "Ramírez",
  "Torres",
  "Vargas",
  "Rojas",
  "Castro",
  "Morales",
];
const LAST_PT = [
  "Silva",
  "Santos",
  "Oliveira",
  "Pereira",
  "Costa",
  "Souza",
  "Mendes",
  "Carvalho",
  "Cardoso",
  "Rocha",
];

const CRA_PEXELS_KEY: string | undefined = process.env.REACT_APP_PEXELS_KEY;
// Vite opcional
const VITE_PEXELS_KEY: string | undefined =
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env?.VITE_PEXELS_KEY) ||
  undefined;
const resolvePexelsKey = (explicit?: string) =>
  explicit || CRA_PEXELS_KEY || VITE_PEXELS_KEY || "";

export function useAthletePeople(opts: Opts = {}) {
  const {
    count = 6,
    gender = "any",
    sport = "athlete",
    seed = "athlete-seed",
    apiKey,
    latamOnly = false,
    countries,
  } = opts;

  const [data, setData] = useState<AthletePerson[]>([]);
  const [loading, setLoading] = useState(true);
  const PEXELS_KEY = resolvePexelsKey(apiKey);

  const randomUserUrl = useMemo(() => {
    if (latamOnly) return "";
    const nat = ["BR", "ES", "US"].join(",");
    const g = gender !== "any" ? `&gender=${gender}` : "";
    return `https://randomuser.me/api/?results=${count}&nat=${nat}${g}&seed=${seed}`;
  }, [count, gender, seed, latamOnly]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);

      let base: Array<{
        name: string;
        country: string;
        gender: Gender;
        id: string;
      }> = [];

      if (latamOnly) {
        const [a, b, c, d] = cyrb128(seed);
        const rng = mulberry32(a ^ b ^ c ^ d);

        const poolCountries =
          countries && countries.length ? countries : LATAM_COUNTRIES;
        for (let i = 0; i < count; i++) {
          const g: Gender =
            gender === "any" ? (rng() > 0.5 ? "male" : "female") : gender;

          const country = pick(rng, poolCountries);
          const isPT = country === "Brasil";

          const first =
            g === "male"
              ? pick(rng, isPT ? FIRST_PT_M : FIRST_ES_M)
              : pick(rng, isPT ? FIRST_PT_F : FIRST_ES_F);
          const last = pick(rng, isPT ? LAST_PT : LAST_ES);

          base.push({
            name: `${first} ${last}`,
            country,
            gender: g,
            id: `${seed}-${i}`,
          });
        }
      } else {
        const ru = await fetch(randomUserUrl).then((r) => r.json());
        base = ru.results.map((u: any, i: number) => ({
          name: `${u.name.first} ${u.name.last}`,
          country: u.location.country as string,
          gender: (u.gender as Gender) ?? "any",
          id: (u.login.uuid as string) || `${seed}-${i}`,
        }));
      }

      type PhotoPair = { one: string; two: string };

      const per = Math.min(80, Math.max(10, count + 12));

      async function fetchPexels(q: string): Promise<PhotoPair[]> {
        if (!PEXELS_KEY) return [];
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          q
        )}&orientation=portrait&per_page=${per}&size=large`;
        try {
          const pex = await fetch(url, {
            headers: { Authorization: PEXELS_KEY },
          }).then((r) => r.json());
          return (pex.photos || []).map((p: any) => ({
            one: p.src.large ?? p.src.medium,
            two: p.src.large2x ?? p.src.large ?? p.src.medium,
          }));
        } catch {
          return [];
        }
      }

      const dicebear = (seedStr: string): PhotoPair => {
        const svg = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(
          seedStr
        )}&radius=8&backgroundType=gradientLinear`;
        return { one: svg, two: svg };
      };

      let malePhotos: PhotoPair[] = [];
      let femalePhotos: PhotoPair[] = [];

      if (gender === "male") {
        malePhotos = await fetchPexels(
          `${sport} athlete portrait latino male man south american`
        );
      } else if (gender === "female") {
        femalePhotos = await fetchPexels(
          `${sport} athlete portrait latina female woman south american`
        );
      } else {
        [malePhotos, femalePhotos] = await Promise.all([
          fetchPexels(
            `${sport} athlete portrait latino male man south american`
          ),
          fetchPexels(
            `${sport} athlete portrait latina female woman south american`
          ),
        ]);
      }

      if (malePhotos.length === 0) {
        malePhotos = base.map((b) => dicebear(`male-${sport}-${b.id}`));
      }
      if (femalePhotos.length === 0) {
        femalePhotos = base.map((b) => dicebear(`female-${sport}-${b.id}`));
      }

      const merged: AthletePerson[] = base.map((b) => {
        const pool = b.gender === "female" ? femalePhotos : malePhotos;
        const idx = hashIdx(`${b.id}-${sport}`, pool.length); // <-- fija y por género
        return {
          name: b.name,
          country: b.country,
          gender: b.gender,
          photo: pool[idx].one,
          photo2x: pool[idx].two,
        };
      });

      if (!cancelled) {
        setData(merged);
        setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [
    count,
    gender,
    sport,
    seed,
    PEXELS_KEY,
    randomUserUrl,
    latamOnly,
    countries,
  ]);

  return { data, loading };
}
