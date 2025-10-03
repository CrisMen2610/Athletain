import styles from "./Paginator.module.scss";

type Props = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function Paginator({ page, totalPages, onPrev, onNext }: Props) {
  const progress = Math.max(
    0,
    Math.min(1, (page - 1) / Math.max(1, totalPages - 1))
  );

  return (
    <div className={styles.wrap} role="navigation" aria-label="Paginación">
      <button
        className={styles.arrow}
        onClick={onPrev}
        disabled={page <= 1}
        aria-label="Anterior"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>

      <div className={styles.track} aria-hidden="true">
        <div
          className={styles.thumb}
          style={{ transform: `scaleX(${progress || 0.001})` }}
        />
      </div>

      <button
        className={styles.arrow}
        onClick={onNext}
        disabled={page >= totalPages}
        aria-label="Siguiente"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
}
