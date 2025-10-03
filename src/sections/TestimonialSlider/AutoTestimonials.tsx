// src/sections/TestimonialSlider/AutoTestimonialsMixedLatam.tsx
import { useMemo } from "react";
import { useAthletePeople } from "@hooks/useFakePeople/useFakePeople";
import TestimonialsSlider, { Testimonial } from "./TestimonialSlider";

const QUOTES = [
  "Gracias a Athletain pude mostrar mi perfil a entrenadores en Europa. Subí mis métricas y videos, y en menos de un mes ya estaba viajando para competir en una liga internacional. La asesoría legal me dio total tranquilidad para firmar mi primer contrato afuera.",
  "Con Athletain pude conectar con visores de distintos países. Gracias a la plataforma mi talento no se quedó en el ámbito local y en pocas semanas recibí llamadas de clubes interesados en mí.",
  "Subir mi perfil deportivo y estadísticas fue muy sencillo. Lo mejor es que en poco tiempo empecé a recibir oportunidades reales para probarme en academias europeas. Athletain me abrió puertas que nunca pensé alcanzar.",
  "Lo que más destaco es el acompañamiento. Desde que publiqué mis videos me guiaron paso a paso y con la asesoría legal sentí seguridad al firmar con un equipo internacional por primera vez.",
];

function interleave<T>(a: T[], b: T[]) {
  const out: T[] = [];
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (a[i]) out.push(a[i]);
    if (b[i]) out.push(b[i]);
  }
  return out;
}

export default function AutoTestimonialsMixedLatam() {
  const SPORT = "soccer";
  const female = useAthletePeople({
    count: 1,
    gender: "female",
    sport: SPORT,
    seed: "latam-f-2025",
    latamOnly: true,
  });
  const male = useAthletePeople({
    count: 3,
    gender: "male",
    sport: SPORT,
    seed: "latam-m-2025",
    latamOnly: true,
  });

  const loading = female.loading || male.loading;

  const items: Testimonial[] = useMemo(() => {
    if (loading) return [];
    const merged = interleave(male.data, female.data);
    return merged.map((p, i) => ({
      name: p.name,
      role: `${
        p.gender === "female" ? "Deportista profesional" : "Atleta profesional"
      } – ${p.country}`,
      photo: p.photo,
      photo2x: p.photo2x,
      rating: 5,
      quote: QUOTES[i % QUOTES.length],
      ctaHref: "/historias",
      ctaLabel: "Ver más",
    }));
  }, [loading, male.data, female.data]);

  if (loading) return null;

  return (
    <TestimonialsSlider
      title={"LO QUE DICEN QUIENES YA\nCONFIARON EN NOSOTROS"}
      subtitle="Historias reales de atletas latinoamericanos que crecieron con Athletein."
      items={items}
      autoPlay
      interval={7000}
      progressWidth={420}
    />
  );
}
