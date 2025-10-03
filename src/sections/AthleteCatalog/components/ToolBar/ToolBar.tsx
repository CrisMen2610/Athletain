import styles from "./ToolBar.module.scss";
import { Gender } from "@hooks/useFakePeople/useFakePeople";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  gender: Gender;
  onGenderChange: (v: Gender) => void;
  sport: string;
  onSportChange: (v: string) => void;
};

export default function Toolbar({
  query,
  onQueryChange,
  gender,
  onGenderChange,
  sport,
  onSportChange,
}: Props) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrap}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar"
          aria-label="Buscar atletas"
        />
      </div>

      <div className={styles.filters}>
        <label className={styles.select}>
          <span>Género</span>
          <select
            value={gender}
            onChange={(e) => onGenderChange(e.target.value as Gender)}
          >
            <option value="any">Todos</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </label>

        <label className={styles.select}>
          <span>Deporte</span>
          <select value={sport} onChange={(e) => onSportChange(e.target.value)}>
            <option value="tennis">Tenis</option>
            <option value="soccer">Fútbol</option>
            <option value="basketball">Básquet</option>
            <option value="swimming">Natación</option>
            <option value="athletics">Atletismo</option>
          </select>
        </label>
      </div>
    </div>
  );
}
