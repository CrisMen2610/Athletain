import { useMemo } from "react";
import styles from "./HistoryProgressSection.module.scss";
import type { AthletePerson } from "@hooks/useFakePeople/useFakePeople";
import { makeProgressHistory, type Sport } from "utils/profileMock/profileMock";

type Props = { person: AthletePerson; sport: Sport };

export default function HistoryProgressSection({ person, sport }: Props) {
  const items = useMemo(
    () => makeProgressHistory(person, sport),
    [person, sport]
  );

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h3 className={`${styles.title} title-2-light`}>
          <span>Historial de</span>
          <strong>Progreso</strong>
        </h3>
        <div className={`${styles.copy} body-1-regular`}>
          <h4>Evolución constante, resultados reales.</h4>
          <p>
            El deporte es proceso y disciplina. Aquí comparto mi camino: desde
            los primeros entrenamientos hasta los momentos que definieron mi
            crecimiento.
          </p>
        </div>
      </div>

      <div className={styles.timeline}>
        {items.map((it) => (
          <div key={`${it.year}-${it.title}`} className={styles.item}>
            <div className={`${styles.year} body-1-regular`}>{it.year}</div>
            <div className={`${styles.content} body-1-regular`}>
              <div className={`${styles.itemTitle} body-1-regular`}>
                {it.title}
              </div>
              <div className={`${styles.detail} body-1-regular`}>
                {it.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
