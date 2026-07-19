import type { ReactNode } from "react";
import { Button } from "./Button";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className={styles.wrap} role="status">
      <span className={styles.icon} aria-hidden="true">
        {icon ?? <DefaultIcon />}
      </span>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

function DefaultIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <path
        d="M4 7.5 12 4l8 3.5M4 7.5v9L12 20l8-3.5v-9M4 7.5 12 11m0 0 8-3.5M12 11v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
