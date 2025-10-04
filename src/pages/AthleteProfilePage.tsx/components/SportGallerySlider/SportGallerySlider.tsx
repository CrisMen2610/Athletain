import { useEffect, useRef, useState } from "react";
import styles from "./SportGallerySlider.module.scss";
import type { AthletePerson } from "@hooks/useFakePeople/useFakePeople";
import { Sport } from "utils/profileMock/profileMock";
import { useSportGallery } from "@hooks/useSportGallery/useSportGallery";

type Props = {
  person: AthletePerson;
  sport: Sport;
  count?: number;
};

export default function SportGallerySlider({
  person,
  sport,
  count = 12,
}: Props) {
  const { images, loading } = useSportGallery({ person, sport, count });
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [images]);

  const scrollByAmount = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = el.clientWidth * 0.95; // casi una “página”
    el.scrollBy({ left: dir === "next" ? +delta : -delta, behavior: "smooth" });
  };

  return (
    <section className={styles.wrap} aria-label="Galería del deportista">
      <div className={styles.scroller} ref={scrollerRef}>
        {(loading ? Array.from({ length: 6 }) : images).map((img, i) => (
          <figure key={i} className={styles.slide} aria-hidden={loading}>
            {loading ? (
              <div className={styles.skeleton} />
            ) : (
              <img
                src={(img as { src: string; src2x: string; alt: string }).src}
                srcSet={`${
                  (img as { src: string; src2x: string; alt: string }).src2x
                } 2x`}
                alt={(img as { src: string; src2x: string; alt: string }).alt}
                loading="lazy"
              />
            )}
          </figure>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.arrow}
          onClick={() => scrollByAmount("prev")}
          aria-label="Anterior"
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>

        <div className={styles.track} aria-hidden="true">
          <div
            className={styles.thumb}
            style={{ transform: `scaleX(${Math.max(0.02, progress)})` }}
          />
        </div>

        <button
          className={styles.arrow}
          onClick={() => scrollByAmount("next")}
          aria-label="Siguiente"
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
