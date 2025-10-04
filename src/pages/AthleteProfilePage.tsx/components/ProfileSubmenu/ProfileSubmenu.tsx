import styles from "./ProfileSubmenu.module.scss";

type Item = { key: string; label: string };
type Props = { active: string; onChange: (k: string) => void };

const ITEMS: Item[] = [
  { key: "history", label: "Historia" },
  { key: "achievements", label: "Logros destacados" },
  { key: "health", label: "Salud y físico" },
  { key: "academic", label: "Información académica" },
];

export default function ProfileSubmenu({ active, onChange }: Props) {
  return (
    <nav className={styles.bar} aria-label="Submenú del perfil">
      <ul>
        {ITEMS.map((it) => (
          <li key={it.key}>
            <button
              className={`${styles.link} ${
                active === it.key ? styles.active : ""
              } buttons`}
              onClick={() => onChange(it.key)}
            >
              {it.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
