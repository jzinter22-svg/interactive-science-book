import type { ReactNode } from "react";
import styles from "./WarningCard.module.css";

interface WarningCardProps {
  title?: string;
  children: ReactNode;
}

export function WarningCard({ title = "تنبيه", children }: WarningCardProps) {
  return (
    <div className={`glass-surface ${styles.card}`} role="alert">
      <span className={styles.icon} aria-hidden="true">
        <AlertIcon />
      </span>
      <div>
        <p className={styles.title}>{title}</p>
        <div className={`text-body-sm ${styles.body}`}>{children}</div>
      </div>
    </div>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M12 3.5 21 19.5H3L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 10v4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.9" r="1" fill="currentColor" />
    </svg>
  );
}
