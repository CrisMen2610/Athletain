import { useMemo } from "react";
import styles from "./StatsPerformanceSection.module.scss";
import type { AthletePerson } from "@hooks/useFakePeople/useFakePeople";
import {
  makePerformanceStats,
  type Sport,
} from "utils/profileMock/profileMock";

type Props = {
  person: AthletePerson;
  sport: Sport;
};

export default function StatsPerformanceSection({ person, sport }: Props) {
  const stats = useMemo(
    () => makePerformanceStats(person, sport),
    [person, sport]
  );

  const fmtMove = (n: number) => (n === 0 ? "—" : n > 0 ? `+${n}` : `${n}`);
  const WL = (w: number, l: number) => `${w}–${l}`;

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h3 className={`${styles.title} title-2-light`}>
          <span>Estadísticas y</span>
          <strong>Rendimiento</strong>
        </h3>
        <div className={`${styles.copy} body-1-regular`}>
          <strong>Una mirada clara a mis números en competencia.</strong>
          <p>
            Esta sección muestra los datos clave que reflejan mi desempeño
            técnico, físico y estratégico en la cancha.
          </p>
        </div>
      </div>

      <div
        className={styles.table}
        role="table"
        aria-label="Estadísticas y rendimiento"
      >
        {/* Row: Año actual */}
        <div className={styles.row} role="row">
          <div
            className={`${styles.cell} ${styles.rowHeader} body-1-medium`}
            role="rowheader"
          >
            Este año
          </div>
          <div className={styles.cell} role="cell">
            <div className={`${styles.big} body-1-regular`}>
              {stats.year.ranking}
            </div>
            <div className={`${styles.sub} body-1-light`}>Ranking</div>
          </div>
          <div className={styles.cell} role="cell">
            <div className={`${styles.big} body-1-regular`}>
              {fmtMove(stats.year.movement)}
            </div>
            <div className={`${styles.sub} body-1-light`}>Movimiento</div>
          </div>
          <div className={styles.cell} role="cell">
            <div className={`${styles.bigInfo} body-1-regular`}>
              {WL(stats.year.wins, stats.year.losses)}
            </div>
            <div className={`${styles.sub} body-1-light`}>W-L</div>
          </div>
          <div className={styles.cell} role="cell">
            <div className={`${styles.bigInfo} body-1-regular`}>
              {stats.year.titles}
            </div>
            <div className={`${styles.sub} body-1-light`}>Títulos</div>
          </div>
        </div>

        <div className={styles.row} role="row">
          <div
            className={`${styles.cell} ${styles.rowHeader} body-1-medium`}
            role="rowheader"
          >
            Carrera
          </div>
          <div className={styles.cell} role="cell">
            <div className={`${styles.big} body-1-regular`}>
              {stats.career.rankingPeak}
            </div>
            <div className={`${styles.sub} body-1-light`}>
              Ranking ({stats.career.rankingPeakDate})
            </div>
          </div>
          <div className={styles.cell} role="cell">
            <div className={`${styles.big} body-1-regular`}>
              {fmtMove(stats.career.movement)}
            </div>
            <div className={`${styles.sub} body-1-light`}>Movimiento</div>
          </div>
          <div className={styles.cell} role="cell">
            <div className={`${styles.bigInfo} body-1-regular`}>
              {WL(stats.career.wins, stats.career.losses)}
            </div>
            <div className={`${styles.sub} body-1-light`}>W-L</div>
          </div>
          <div className={styles.cell} role="cell">
            <div className={`${styles.bigInfo} body-1-regular`}>
              {stats.career.titles}
            </div>
            <div className={`${styles.sub} body-1-light`}>Títulos</div>
          </div>
        </div>
      </div>
    </section>
  );
}
