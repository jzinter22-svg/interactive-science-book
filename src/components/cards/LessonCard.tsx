import shared from "./shared.module.css";
import styles from "./LessonCard.module.css";

interface LessonCardProps {
  title: string;
  duration: string;
  kind?: "reading" | "video" | "interactive" | "quiz";
  completed?: boolean;
  onClick?: () => void;
  className?: string;
}

const kindLabel: Record<NonNullable<LessonCardProps["kind"]>, string> = {
  reading: "قراءة",
  video: "فيديو",
  interactive: "تفاعلي",
  quiz: "اختبار",
};

export function LessonCard({ title, duration, kind = "reading", completed, onClick, className = "" }: LessonCardProps) {
  return (
    <button type="button" className={`glass-surface ${styles.card} ${className}`.trim()} onClick={onClick}>
      <span className={styles.status} data-done={completed} aria-hidden="true">
        {completed ? <CheckIcon /> : <span className={styles.dot} />}
      </span>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.meta}>
          <span className={`${shared.badge} ${shared.badgeTeal}`}>{kindLabel[kind]}</span>
          <span className={styles.duration}>{duration}</span>
        </span>
      </span>
      <ChevronIcon />
    </button>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d="M5 12.5 10 17l9-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className={styles.chevron}>
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
