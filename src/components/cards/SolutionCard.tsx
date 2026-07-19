import { useState, type ReactNode } from "react";
import shared from "./shared.module.css";
import styles from "./SolutionCard.module.css";

interface SolutionCardProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export function SolutionCard({ children, defaultOpen = false }: SolutionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`glass-surface ${styles.card}`}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={`${shared.badge} ${shared.badgeSuccess}`}>
          <CheckCircleIcon /> الحل
        </span>
        <ChevronIcon open={open} />
      </button>
      {open && <div className={`text-body ${styles.content}`}>{children}</div>}
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path
        d="M8 12.5 11 15.5 16.5 9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform var(--dur-base) var(--ease-standard)" }}
    >
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
