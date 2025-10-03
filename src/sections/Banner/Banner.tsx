import karts from "@assets/imgs/home/karts.png";
import { ReactComponent as SportIcon } from "@assets/imgs/home/sports-icon.svg";

import { PAGES } from "services/demo-content/constants";
import styles from "./Banner.module.scss";
import { BannerProps } from "./models/Banner";

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  bgImage,
  type,
}) => {
  let content: React.ReactNode;

  switch (type) {
    case PAGES.HOME:
      content = (
        <>
          <div className={styles.home_banner}>
            <h1 className={`bannerTitle ${styles.home_banner_title}`}>
              {title}
            </h1>
            <h2 className={`bannerSubtitle ${styles.home_banner_subtitle}`}>
              {subtitle}
            </h2>
            <p
              className={`bannerDescription ${styles.home_banner_description}`}
            >
              {description}
            </p>
            <button className={`buttonText ${styles.home_banner_button}`}>
              {buttonText}
              <SportIcon />
            </button>
          </div>
          <img
            className={styles.home_banner_image}
            src={bgImage || karts}
            alt=""
          />
        </>
      );
      break;
    case PAGES.ABOUT_US:
      content = (
        <>
          <div className={styles.aboutUs_banner}>
            <h1 className={`bannerTitle ${styles.aboutUs_banner_title}`}>
              {title}
            </h1>
            <h2 className={`bannerSubtitle ${styles.aboutUs_banner_subtitle}`}>
              {subtitle}
            </h2>
            <p
              className={`bannerDescription ${styles.aboutUs_banner_description}`}
            >
              {description}
            </p>
          </div>
          <img className={styles.aboutUs_banner_image} src={bgImage} alt="" />
        </>
      );
      break;

    case PAGES.TALENT_GALLERY:
      content = (
        <>
          <div
            className={`${styles.home_banner} ${styles.talent_gallery_banner}`}
          >
            <h1
              className={`bannerTitle ${styles.home_banner_title} ${styles.talent_gallery_title}`}
            >
              {title}
            </h1>
            <h2
              className={`bannerSubtitle ${styles.home_banner_subtitle} ${styles.talent_gallery_subtitle}`}
            >
              {subtitle}
            </h2>
            <p
              className={`bannerDescription ${styles.talent_gallery_banner_description}`}
            >
              {description}
            </p>
            <button className={`buttonText ${styles.home_banner_button}`}>
              {buttonText}
              <SportIcon />
            </button>
          </div>
          <img
            className={styles.talent_gallery_image}
            src={bgImage || karts}
            alt=""
          />
        </>
      );
      break;
    default:
      content = null;
  }

  return <section className={styles.banner}>{content}</section>;
};

export default Banner;
