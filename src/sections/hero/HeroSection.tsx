import s from "./hero.module.scss";
import { HeroProps } from "./models/hero";

export default function HeroSection({
  heroSection,
}: {
  heroSection: HeroProps;
}) {
  const { title, text, bgImage, strongTitle } = heroSection;

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
}
