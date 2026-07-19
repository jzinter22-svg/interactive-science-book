import { ProgressBar } from "../ui/ProgressBar";
import shared from "./shared.module.css";
import styles from "./ChapterCard.module.css";

interface ChapterCardProps {
  index: number;
  title: string;
  description: string;
  lessonCount: number;
  progress: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ChapterCard({
  index,
  title,
  description,
  lessonCount,
  progress,
  icon,
  onClick,
  className = "",
}: ChapterCardProps) {
  return (
    <article
      className={`glass-surface ${shared.card} ${shared.cardHover} ${styles.card} ${className}`.trim()}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.header}>
        <div className={`${shared.iconWrap} ${styles.icon}`} aria-hidden="true">
          {icon ?? <DefaultIcon />}
        </div>
        <span className={styles.index}>{String(index).padStart(2, "0")}</span>
      </div>

      <h3 className={shared.title}>{title}</h3>
      <p className={shared.description}>{description}</p>

      <div className={shared.footerRow}>
        <span className={`${shared.badge} ${shared.badgeIndigo}`}>{lessonCount} دروس</span>
      </div>

      <ProgressBar value={progress} label="التقدم" tone="indigo" />
    </article>
  );
}

function DefaultIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H18a1 1 0 0 1 1 1v15.5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 18v-12.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H19" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
