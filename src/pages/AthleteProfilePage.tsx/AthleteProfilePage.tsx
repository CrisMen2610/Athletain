import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { AthletePerson } from "@hooks/useFakePeople/useFakePeople";
import {
  makeProfileExtra,
  makeProfileExtraPexels,
  type ProfileExtra,
  type Sport,
} from "utils/profileMock/profileMock";
import ProfileHeader from "./components/profileHeader/ProfileHeader";
import WhoAmISection from "./components/whoAmISection/WhoAmISection";
import SportGallerySlider from "./components/SportGallerySlider/SportGallerySlider";
import StatsPerformanceSection from "./components/statsPerformanceSection/StatsPerformanceSection";
import ProfileSubmenu from "./components/ProfileSubmenu/ProfileSubmenu";
import HighlightsSection from "./components/HighlightSection/HighlightsSection";
import HistoryProgressSection from "./components/HistoryProgressSection/HistoryProgressSection";

type LocationState = { person: AthletePerson; sport: Sport };

export default function AthleteProfilePage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: LocationState };

  useEffect(() => {
    if (!state?.person) navigate("/expo_de_talento", { replace: true });
  }, [state, navigate]);
  if (!state?.person) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tab, setTab] = useState("achievements");

  const { person, sport } = state;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const baseExtra = useMemo(
    () => makeProfileExtra(person, sport),
    [person, sport]
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [extra, setExtra] = useState<ProfileExtra>(baseExtra);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    let alive = true;
    makeProfileExtraPexels(person, sport, {
      globalSeed: "athlete-profile-2025",

      perPage: 60,
    }).then((x) => {
      if (alive) setExtra(x);
    });
    return () => {
      alive = false;
    };
  }, [person, sport]);

  return (
    <div>
      <ProfileHeader extra={extra} person={person} sport={sport} />
      <WhoAmISection person={person} sport={sport} />
      <SportGallerySlider person={person} sport={sport} count={12} />
      <StatsPerformanceSection person={person} sport={sport} />
      <ProfileSubmenu active={tab} onChange={setTab} />

      {tab === "achievements" && (
        <HighlightsSection person={person} sport={sport} />
      )}
      {tab === "history" && (
        <HistoryProgressSection person={person} sport={sport} />
      )}
      {tab === "health" && (
        <div style={{ padding: "24px 20px" }}>
          Salud y físico — próximamente
        </div>
      )}
      {tab === "academic" && (
        <div style={{ padding: "24px 20px" }}>
          Información académica — próximamente
        </div>
      )}
    </div>
  );
}
