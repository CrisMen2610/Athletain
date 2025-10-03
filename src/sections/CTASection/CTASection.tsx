import s from "./ctaSection.module.scss";
import { CtaProps } from "./models/cta";

export default function CtaSection({ ctaSection }: { ctaSection: CtaProps }) {
  const {
    title,
    text,
    bgImage,
    maxWidth,
    center,
    className,
    children,
    subItems,
  } = ctaSection;

  switch (ctaSection.type) {
    case "about-us":
      return (
        <section
          className={[s.wrapper, center ? s.center : "", className || ""].join(
            " "
          )}
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

          <div
            className={[s.inner, s.aboutUs_inner].join(" ")}
            style={{ maxWidth }}
          >
            <h1
              id="hero-title"
              className={[s.title, s.aboutUs_title, "title-1-bold"].join(" ")}
            >
              {title}
            </h1>
            <div className={s.aboutUs_texts}>
              {subItems &&
                subItems.map((item, index) => (
                  <div key={index} className={s.subItem}>
                    <h2 className={[s.subTitle, "body-1-regular"].join(" ")}>
                      <strong>{item.title}:</strong> {item.text}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
        </section>
      );
    case "home":
      return (
        <section
          className={[s.wrapper, center ? s.center : "", className || ""].join(
            " "
          )}
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
    default:
      return null;
  }
}
