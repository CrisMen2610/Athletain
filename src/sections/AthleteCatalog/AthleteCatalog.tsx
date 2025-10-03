import { useEffect, useMemo, useState } from "react";
import s from "./AthletesCatalog.module.scss";
import {
  useAthletePeople,
  AthletePerson,
  Gender,
} from "@hooks/useFakePeople/useFakePeople";
import AthleteCard from "./components/AthleteCard/AthleteCard";
import Toolbar from "./components/ToolBar/ToolBar";
import Paginator from "./components/Paginator/Paginator";
import { USER_ROLES } from "services/demo-content/constants";

const PAGE_SIZE = 9;

export default function AthletesCatalog() {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState<Gender>("any");
  const [sport, setSport] = useState<string>("tennis");
  const [page, setPage] = useState(1);

  const { data, loading } = useAthletePeople({
    count: 60,
    gender,
    sport,
    seed: "athletein-2025",
    latamOnly: true,
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((p) =>
      q.length === 0 ? true : `${p.name} ${p.country}`.toLowerCase().includes(q)
    );
  }, [data, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => {
    setPage(1);
  }, [query, gender, sport]);
  const start = (page - 1) * PAGE_SIZE;
  const pageItems: AthletePerson[] = filtered.slice(start, start + PAGE_SIZE);

  return (
    <section className={s.catalog}>
      <header className={s.header}>
        <div className={s.titleTag}></div>

        <Toolbar
          query={query}
          onQueryChange={setQuery}
          gender={gender}
          onGenderChange={setGender}
          sport={sport}
          onSportChange={setSport}
        />
      </header>

      {loading ? (
        <div className={s.grid}>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className={s.skeleton} aria-hidden="true" />
          ))}
        </div>
      ) : (
        <>
          <div className={s.grid}>
            {pageItems.map((p, i) => (
              <AthleteCard
                key={`${p.name}-${i}`}
                person={p}
                role={
                  USER_ROLES[sport.toUpperCase() as keyof typeof USER_ROLES]
                }
              />
            ))}
          </div>

          <Paginator
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((v) => Math.max(1, v - 1))}
            onNext={() => setPage((v) => Math.min(totalPages, v + 1))}
          />
        </>
      )}
    </section>
  );
}
