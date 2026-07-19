import shared from "../cards/shared.module.css";
import styles from "./SimulationBlock.module.css";

interface SimulationBlockProps {
  title: string;
  description?: string;
}

export function SimulationBlock({ title, description }: SimulationBlockProps) {
  return (
    <article className={`glass-surface-strong ${styles.card}`}>
      <div className={styles.header}>
        <span className={`${shared.badge} ${shared.badgeAmber}`}>محاكاة تفاعلية</span>
        <h4 className={shared.title}>{title}</h4>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.preview}>
        <span className={styles.previewIcon} aria-hidden="true">
          <SlidersIcon />
        </span>
        <span className={styles.previewLabel}>ستُعرض المحاكاة التفاعلية هنا</span>
      </div>
    </article>
  );
}

function SlidersIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="5" y1="6" x2="19" y2="6" />
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="5" y1="18" x2="19" y2="18" />
      </g>
      <circle cx="9" cy="6" r="2" fill="currentColor" />
      <circle cx="15" cy="12" r="2" fill="currentColor" />
      <circle cx="10" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}
