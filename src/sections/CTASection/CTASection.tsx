import s from "./ctaSection.module.scss";
import { CtaProps } from "./models/cta";

export default function CtaSection({ ctaSection }: { ctaSection: CtaProps }) {
  const { title, text, bgImage, maxWidth, center, className, children } =
    ctaSection;

  return (
    <section
      className={[s.wrapper, center ? s.center : "", className || ""].join(" ")}
      aria-labelledby="hero-title"
    >
      {bgImage && (
        <div
          className={s.bg}
          style={{
            background: `url(${bgImage}) lightgray 50% / cover no-repeat`,
          }}
          aria-hidden="true"
        />
      )}

      <div className={s.inner} style={{ maxWidth }}>
        <h1 id="hero-title" className={[s.title, "title-1-bold"].join(" ")}>
          {title}
        </h1>
        <p className={[s.text, "body-1-regular"].join(" ")}>{text}</p>

        {children && <div className={s.actions}>{children}</div>}
      </div>
    </section>
  );
}
