import AthletesCatalog from "sections/AthleteCatalog/AthleteCatalog";
import Banner from "sections/Banner/Banner";
import Services from "sections/ServicesSection/Services";
import {
  PAGES,
  TALENT_GALLERY_CONTENTS,
} from "services/demo-content/constants";

import s from "./Talent-gallery.module.scss";

import smallBannerBg from "@assets/imgs/talentGallery/gallery-banner.webp";

const TalentGalleryContent = TALENT_GALLERY_CONTENTS.TalentGallery;

const typePage = PAGES.TALENT_GALLERY;

const TalentGallery: React.FC = () => (
  <div>
    <Banner
      title={TalentGalleryContent.banner.title}
      subtitle={TalentGalleryContent.banner.subtitle}
      description={TalentGalleryContent.banner.description}
      buttonText={TalentGalleryContent.banner.buttonText}
      bgImage={TalentGalleryContent.banner.bgImage}
      type={TalentGalleryContent.banner.type}
    />
    <Services services={[]} type={typePage} />
    <AthletesCatalog />
    <div className={s.gallery_small_banner}>
      <img src={smallBannerBg} alt="" className={s.gallery_small_image} />
      <div className={s.gallery_small_banner_overlay}>
        <h1 className={`bannerTitle h2-title ${s.gallery_small_banner_title}`}>
          Tu talento
        </h1>
        <h2
          className={`bannerSubtitle h2-title-bold ${s.gallery_small_banner_subtitle}`}
        >
          merece ser visto.
        </h2>
        <p
          className={`bannerDescription body-1-regular ${s.gallery_small_banner_description}`}
        >
          En Athletain creemos que tu carrera merece visibilidad. Por eso,
          creamos esta sección donde puedes subir tu perfil deportivo, compartir
          tus métricas clave y mostrar tu rendimiento real en video.
          <br /> <br />
          Tu perfil será revisado por nuestro equipo y podrá ser publicado en
          nuestra galería de atletas destacados.
        </p>
      </div>
    </div>
  </div>
);

export default TalentGallery;
