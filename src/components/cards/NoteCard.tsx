import type { ReactNode } from "react";
import styles from "./NoteCard.module.css";

interface NoteCardProps {
  title?: string;
  children: ReactNode;
}

export function NoteCard({ title = "ملاحظة", children }: NoteCardProps) {
  return (
    <div className={`glass-surface ${styles.card}`} role="note">
      <span className={styles.icon} aria-hidden="true">
        <InfoIcon />
      </span>
      <div>
        <p className={styles.title}>{title}</p>
        <div className={`text-body-sm ${styles.body}`}>{children}</div>
      </div>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="7.75" r="1.05" fill="currentColor" />
    </svg>
  );
}
