import s from "./AthleteCard.module.scss";
import { AthletePerson } from "@hooks/useFakePeople/useFakePeople";
import { ReactComponent as SportIcon } from "@assets/imgs/home/sports-icon.svg";
import { useNavigate } from "react-router-dom";
import { slugify } from "utils/profileMock/profileMock";

type Props = {
  person: AthletePerson;
  role?: string;
  sport?: "tennis" | "soccer" | "basketball" | "swimming";
  highlight?: boolean;
};

export default function AthleteCard({
  person,
  role = "Tenista profesional",
  sport = "tennis",
  highlight,
}: Props) {
  const navigate = useNavigate();

  const goProfile = () => {
    navigate(`/perfil/${slugify(person.name)}`, {
      state: { person, sport },
    });
  };

  return (
    <article className={`${s.card} ${highlight ? s.highlight : ""}`}>
      <div className={s.media}>
        <img
          src={person.photo}
          srcSet={`${person.photo2x} 2x`}
          alt={`Foto de ${person.name}`}
          loading="lazy"
        />
      </div>

      <div className={s.body}>
        <h4 className={`${s.name} title-3`}>{person.name}</h4>
        <p className={`${s.meta} body-1-regular`}>
          {role} — <span className={s.country}>{person.country}</span>
        </p>

        <button
          className={`${s.cta} buttons`}
          type="button"
          aria-label={`Ver más de ${person.name}`}
          onClick={goProfile}
        >
          Ver más
          <SportIcon />
        </button>
      </div>
    </article>
  );
}
