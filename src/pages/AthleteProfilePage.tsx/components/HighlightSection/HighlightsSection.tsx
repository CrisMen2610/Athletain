import { useMemo } from "react";
import styles from "./HighlightsSection.module.scss";
import type { AthletePerson } from "@hooks/useFakePeople/useFakePeople";
import { makeAchievements, type Sport } from "utils/profileMock/profileMock";

type Props = { person: AthletePerson; sport: Sport; count?: number };

export default function HighlightsSection({ person, sport, count = 8 }: Props) {
  const items = useMemo(
    () => makeAchievements(person, sport, { count }),
    [person, sport, count]
  );

  const Icon = ({
    name,
  }: {
    name: "trophy" | "cup" | "medal" | "ranking" | "star";
  }) => (
    <span className={styles.icon} aria-hidden="true">
      {name === "trophy" && (
        <svg viewBox="0 0 24 24">
          <path
            d="M4 4h16v3H4zM6 7v2a6 6 0 0 0 12 0V7M8 21h8M10 17h4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )}
      {name === "cup" && (
        <svg viewBox="0 0 24 24">
          <path
            d="M6 7h12v2a6 6 0 0 1-12 0V7zM4 4h16M8 21h8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )}
      {name === "medal" && (
        <svg viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="14"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M6 2l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      )}
      {name === "ranking" && (
        <svg viewBox="0 0 24 24">
          <path
            d="M3 21h4V10H3v11zm7 0h4V3h-4v18zm7 0h4v-6h-4v6z"
            fill="currentColor"
          />
        </svg>
      )}
      {name === "star" && (
        <svg viewBox="0 0 24 24">
          <path
            d="M12 3l3.2 6.6 7.3 1.1-5.3 5.1 1.3 7.2L12 19l-6.5 3.5 1.3-7.2L1.5 10.7l7.3-1.1L12 3z"
            fill="currentColor"
          />
        </svg>
      )}
    </span>
  );

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h3 className={`${styles.title} title-2-light`}>
          <span>Logros</span>
          <strong>Destacados</strong>
        </h3>
        <div className={`${styles.copy} body-1-regular`}>
          <strong>Compite. Gana. Deja huella.</strong>
          <p>
            Esta sección muestra los principales hitos deportivos: campeonatos
            ganados, medallas obtenidas, clasificaciones, premios o
            reconocimientos.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {items.map((it) => (
          <article
            key={it.id}
            className={styles.card}
            aria-label={`${it.text} (${it.year})`}
          >
            <Icon name={it.icon} />
            <p className={`${styles.text} body-1-regular`}>{it.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
