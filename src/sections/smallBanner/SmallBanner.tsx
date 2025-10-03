import smallBannerBg from "@assets/imgs/home/smallBanner.webp";
import styles from "./SmallBanner.module.scss";

const SmallBanner: React.FC = () => {
  let content: React.ReactNode;

  content = (
    <>
      <div className={styles.home_banner}>
        <img src={smallBannerBg} alt="" className={styles.home_banner_image} />
        <div className={styles.home_banner_overlay}>
          <h1 className={`bannerTitle h2-title ${styles.home_banner_title}`}>
            Da el primer paso hacia
          </h1>
          <h2
            className={`bannerSubtitle h2-title-bold ${styles.home_banner_subtitle}`}
          >
            tu próximo logro
          </h2>
          <p
            className={`bannerDescription body-1-regular ${styles.home_banner_description}`}
          >
            Ya seas atleta o representante de una organización, Athletain es tu
            puerta de entrada al futuro del deporte.
          </p>
        </div>
      </div>
    </>
  );
  return content;
};

export default SmallBanner;
