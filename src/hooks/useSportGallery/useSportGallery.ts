import { useEffect, useMemo, useState } from "react";
import type { AthletePerson } from "@hooks/useFakePeople/useFakePeople";

// tipos
export type Sport = "soccer" | "swimming" | "tennis" | "basketball";

// --- utils deterministas (mismas que ya usas) ---
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
function shuffle<T>(rng: () => number, arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// env keys (Vite/CRA)
const CRA_PEXELS_KEY: string | undefined = process.env.REACT_APP_PEXELS_KEY;

const VITE_PEXELS_KEY: string | undefined = (import.meta as any)?.env
  ?.VITE_PEXELS_KEY;
const resolvePexelsKey = (explicit?: string) =>
  explicit || VITE_PEXELS_KEY || CRA_PEXELS_KEY || "";

// Queries por deporte (verticales y de acción)
const SPORT_QUERIES: Record<Sport, string[]> = {
  tennis: [
    "tennis clay close up racket legs",
    "tennis court action portrait",
    "tennis practice close-up",
  ],
  soccer: [
    "soccer player close up legs",
    "football pitch action portrait",
    "soccer training cones dribble",
  ],
  basketball: [
    "basketball court close up dribble",
    "basketball shoes parquet",
    "basketball street court action",
  ],
  swimming: [
    "swimming pool lanes athlete start",
    "swimmer training pool close up",
    "swimming goggles pool deck",
  ],
};

export type GalleryImage = { src: string; src2x: string; alt: string };

type UseSportGalleryOpts = {
  person: AthletePerson;
  sport: Sport;
  count?: number; // cuántas mostrar (default 12)
  perPage?: number; // resultados por query (10–80)
  apiKey?: string; // si no usas .env
  seed?: string; // para determinismo global
};

export function useSportGallery({
  person,
  sport,
  count = 12,
  perPage = 60,
  apiKey,
  seed = "athlete-gallery-2025",
}: UseSportGalleryOpts) {
  const key = resolvePexelsKey(apiKey);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const rng = useMemo(() => {
    const [a, b, c, d] = cyrb128(
      `${seed}|${sport}|${person.name}|${person.country}|${person.gender}`
    );
    return mulberry32(a ^ b ^ c ^ d);
  }, [seed, sport, person]);

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);

      const collected: GalleryImage[] = [];
      if (key) {
        for (const q of SPORT_QUERIES[sport]) {
          try {
            const res = await fetch(
              `https://api.pexels.com/v1/search?query=${encodeURIComponent(
                q
              )}&orientation=portrait&per_page=${Math.min(
                80,
                Math.max(10, perPage)
              )}&size=large`,
              { headers: { Authorization: key } }
            );
            const json = await res.json();
            const batch: GalleryImage[] = (json?.photos || []).map(
              (p: any) => ({
                src: p.src.large ?? p.src.medium,
                src2x: p.src.large2x ?? p.src.large ?? p.src.medium,
                alt: p.alt || q,
              })
            );
            collected.push(...batch);
          } catch {
            // continúa con la siguiente query
          }
        }
      }

      // Si Pexels no trajo nada, usa el cover local repetido (no rompe layout)
      if (collected.length === 0) {
        const fallback = `/covers/${sport}.jpg`;
        const arr = Array.from({ length: count }, (_, i) => ({
          src: fallback,
          src2x: fallback,
          alt: `${sport} fallback ${i + 1}`,
        }));
        if (alive) {
          setImages(arr);
          setLoading(false);
        }
        return;
      }

      // Selección determinista y sin repetidos
      const dedup = Array.from(
        new Map(collected.map((i) => [i.src, i])).values()
      );
      const shuffled = shuffle(rng, dedup);
      const picked = shuffled.slice(0, Math.min(count, shuffled.length));

      if (alive) {
        setImages(picked);
        setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [key, sport, perPage, count, rng]);

  return { images, loading };
}
