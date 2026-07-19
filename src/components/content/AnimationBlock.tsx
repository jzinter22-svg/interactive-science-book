import shared from "../cards/shared.module.css";
import styles from "./AnimationBlock.module.css";

interface AnimationBlockProps {
  title: string;
  description?: string;
}

export function AnimationBlock({ title, description }: AnimationBlockProps) {
  return (
    <article className={`glass-surface-strong ${styles.card}`}>
      <div className={styles.header}>
        <span className={`${shared.badge} ${shared.badgeTeal}`}>رسوم متحركة</span>
        <h4 className={shared.title}>{title}</h4>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.preview}>
        <span className={styles.previewIcon} aria-hidden="true">
          <PlayIcon />
        </span>
        <span className={styles.previewLabel}>ستُعرض الرسوم المتحركة هنا</span>
      </div>
    </article>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}
