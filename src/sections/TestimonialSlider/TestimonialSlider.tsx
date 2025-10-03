// src/components/Testimonials/TestimonialsSlider.tsx
import React from "react";
import s from "./TestimonialsSlider.module.scss";
import { ReactComponent as SportIcon } from "@assets/imgs/home/sports-icon.svg";

export type Testimonial = {
  name: string;
  role: string;
  photo: string;
  photo2x?: string;
  quote: string;
  rating?: number;
  ctaHref?: string;
  ctaLabel?: string;
};

type Props = {
  title: string;
  strongTitle?: string;
  subtitle?: string;
  items: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  progressWidth?: number;
  className?: string;
};

export default function TestimonialsSlider({
  title,
  strongTitle = "",
  subtitle,
  items,
  autoPlay = true,
  interval = 6500,
  progressWidth = 420,
  className,
}: Props) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);

  const goTo = (i: number) => {
    const len = items.length;
    setIndex(((i % len) + len) % len);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // autoplay
  React.useEffect(() => {
    if (!autoPlay || paused) return;
    const t = setTimeout(next, interval);
    return () => clearTimeout(t);
  }, [index, autoPlay, paused, interval, next]);

  // teclado
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      className={[s.section, className || ""].join(" ")}
      aria-roledescription="carousel"
      aria-label="Testimonios"
      onKeyDown={onKeyDown}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <header className={s.header}>
        <h2 className={s.title}>
          <span className={`${s.titleLine} title-2-light`}>{title}</span>
          {strongTitle && (
            <strong className={`${s.titleStrong} title-2-bold`}>
              {strongTitle}
            </strong>
          )}
        </h2>
        {subtitle && (
          <p className={`${s.subtitle} body-1-regular`}>{subtitle}</p>
        )}
      </header>

      <div
        className={s.viewport}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={s.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {items.map((t, i) => (
            <article
              key={t.name + i}
              className={s.slide}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${items.length}`}
            >
              <div className={s.grid}>
                <figure className={s.left}>
                  <img
                    className={s.photo}
                    src={t.photo}
                    srcSet={
                      t.photo2x ? `${t.photo} 1x, ${t.photo2x} 2x` : undefined
                    }
                    sizes="(max-width: 900px) 100vw, 420px"
                    alt={t.name}
                  />
                  {t.ctaHref && (
                    <a className={`${s.cta} buttons`} href={t.ctaHref}>
                      {t.ctaLabel || "Ver más"} <SportIcon />
                    </a>
                  )}
                </figure>

                <div className={s.card}>
                  <h3 className={`${s.person} title-3`}>{t.name}</h3>
                  {typeof t.rating === "number" && (
                    <div className={s.stars} aria-label={`${t.rating} de 5`}>
                      <span aria-hidden>{"★".repeat(t.rating)}</span>
                      <span aria-hidden className={s.dim}>
                        {"★".repeat(5 - t.rating)}
                      </span>
                    </div>
                  )}
                  <div className={`${s.role} body-1-regular`}>{t.role}</div>
                  <p className={`${s.quote} body-1-regular`}>{t.quote}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={s.nav}>
        <button className={`${s.arrow} `} onClick={prev} aria-label="Anterior">
          <span className="icon icon-arrow-left" aria-hidden />
        </button>

        <div className={s.progress} style={{ width: progressWidth }}>
          <div
            className={s.progressBar}
            style={{ width: `${((index + 1) / items.length) * 100}%` }}
          />
        </div>

        <button className={s.arrow} onClick={next} aria-label="Siguiente">
          <span className="icon icon-arrow-right" aria-hidden />
        </button>
      </div>
    </section>
  );
}
