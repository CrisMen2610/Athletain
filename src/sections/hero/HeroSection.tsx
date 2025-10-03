import { PAGES } from "services/demo-content/constants";
import s from "./hero.module.scss";
import { HeroProps } from "./models/hero";

export default function HeroSection({
  heroSection,
}: {
  heroSection: HeroProps;
}) {
  const { title, text, bgImage, strongTitle, multipleTexts, type } =
    heroSection;

  switch (type) {
    case PAGES.ABOUT_US:
      return (
        <section
          className={[s.wrapper, s.aboutUs].join(" ")}
          aria-labelledby="hero-title"
        >
          <div className={[s.content, s.aboutUsContent].join(" ")}>
            <h1
              id="hero-title"
              className={[s.title, "title-3-light"].join(" ")}
            >
              {title}{" "}
            </h1>
            {multipleTexts ? (
              multipleTexts.map((item, index) => (
                <p key={index} className={[s.text, "body-1-regular"].join(" ")}>
                  <strong>{item.strongText}</strong> {item.text}
                </p>
              ))
            ) : (
              <p className={[s.text, "body-1-regular"].join(" ")}>{text}</p>
            )}
          </div>
          {bgImage && <img src={bgImage} alt={title} className={s.bgImage} />}
        </section>
      );
    case PAGES.HOME:
      return (
        <section className={[s.wrapper].join(" ")} aria-labelledby="hero-title">
          {bgImage && <img src={bgImage} alt={title} className={s.bgImage} />}
          <div className={s.content}>
            <h1 id="hero-title" className={[s.title, "title-1"].join(" ")}>
              {title}{" "}
              {strongTitle && (
                <strong className="title-1-bold">{strongTitle}</strong>
              )}
            </h1>
            <p className={[s.text, "body-1-regular"].join(" ")}>{text}</p>
          </div>
        </section>
      );
    default:
      return <div></div>;
  }
}
