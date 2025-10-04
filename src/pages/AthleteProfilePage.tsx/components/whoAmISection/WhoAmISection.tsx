import { useMemo } from "react";
import styles from "./WhoAmISection.module.scss";
import type { AthletePerson } from "@hooks/useFakePeople/useFakePeople";
import { makeAthleteBio, type Sport } from "utils/profileMock/profileMock";
import coverUrl from "@assets/imgs/aboutUs/ctaBg2.webp";
import { ReactComponent as SportIcon } from "@assets/imgs/home/sports-icon.svg";

type Props = {
  person: AthletePerson;
  sport: Sport;
  coverUrl?: string;
  contactHref?: string;
};

export default function WhoAmISection({ person, sport, contactHref }: Props) {
  const bio = useMemo(() => makeAthleteBio(person, sport), [person, sport]);

  return (
    <section className={styles.wrap}>
      {coverUrl ? (
        <img className={styles.bg} src={coverUrl} alt="" aria-hidden="true" />
      ) : null}

      <div className={styles.inner}>
        <h3 className={`${styles.title} title-2-bold`}>¿Quién soy?</h3>

        <div className={styles.body}>
          <div className={styles.rule} aria-hidden="true" />
          <p className={`${styles.text} body-1-regular`}>{bio}</p>

          <a
            className={`${styles.cta} buttons`}
            href={contactHref ?? "#"}
            target={contactHref ? "_blank" : undefined}
            rel={contactHref ? "noreferrer" : undefined}
          >
            Contáctame
            <SportIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
