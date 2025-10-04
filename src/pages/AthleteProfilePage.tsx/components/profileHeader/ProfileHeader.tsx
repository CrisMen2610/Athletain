import { ProfileExtra, Sport } from "utils/profileMock/profileMock";
import styles from "./ProfileHeader.module.scss";
import { AthletePerson } from "@hooks/useFakePeople/useFakePeople";

type ProfileHeaderProps = {
  extra: ProfileExtra;
  person: AthletePerson;
  sport: Sport;
};

export default function ProfileHeader({
  extra,
  person,
  sport,
}: ProfileHeaderProps) {
  const meters = (extra.heightCm / 100).toFixed(2).replace(".", ",");

  return (
    <article className={styles.page}>
      <div
        className={styles.cover}
        style={{ backgroundImage: `url(${extra.coverUrl})` }}
      />

      <header className={styles.header}>
        <div className={styles.avatar}>
          <img
            src={person.photo}
            srcSet={`${person.photo2x} 2x`}
            alt={`Foto de ${person.name}`}
          />
        </div>

        <h1 className={`${styles.name} title-3`}>{person.name}</h1>
        <p className={`${styles.subtitle} body-1-regular`}>
          {extra.title} <span className={styles.country}>{extra.subtitle}</span>
        </p>

        <ul className={styles.social} aria-label="Redes sociales">
          <li>
            <a
              href={extra.social.ig}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm6.5-.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href={extra.social.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24">
                <path d="M14 3h3a5 5 0 0 0 5 5v3a8 8 0 1 1-8-8z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href={extra.social.x}
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              <svg viewBox="0 0 24 24">
                <path d="M3 3l18 18M21 3L3 21" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href={extra.social.yt}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24">
                <path d="M22 8.2v7.6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8.2a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3zM10 9l6 3-6 3V9z" />
              </svg>
            </a>
          </li>
        </ul>

        <section className={styles.tiles}>
          <div className={styles.tile}>
            <div className={`${styles.icon} icon icon-sports_football`}></div>
            <h4 className="body-1-regular">DEPORTE</h4>
            <p className={`${styles.kv} body-1-regular`}>
              {sport === "soccer"
                ? "Fútbol"
                : sport === "tennis"
                ? "Tenis"
                : sport === "basketball"
                ? "Básquet"
                : "Natación"}
            </p>
          </div>

          <div className={styles.tile}>
            <div className={`${styles.icon} icon icon-calendar`}></div>

            <h4 className="body-1-regular">EDAD</h4>
            <p className={`${styles.kv} body-1-regular`}>{extra.age} Años</p>
          </div>

          <div className={styles.tile}>
            <div className={`${styles.icon} icon icon-check`}></div>

            <h4 className="body-1-regular">{extra.specialtyTitle}</h4>
            <p className={`${styles.kv} body-1-regular`}>
              {extra.specialtyText}
            </p>
          </div>

          <div className={styles.tile}>
            <div className={`${styles.icon} icon icon-form`}></div>

            <h4 className="body-1-regular">ESTATURA Y PESO</h4>
            <p className={`${styles.kv} body-1-regular`}>
              {meters} m / {extra.weightKg} kg
            </p>
          </div>
        </section>
      </header>
    </article>
  );
}
