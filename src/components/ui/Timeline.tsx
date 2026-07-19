import type { ReactNode } from "react";
import styles from "./Timeline.module.css";

interface TimelineStep {
  id: string;
  title: string;
  description?: string;
  status?: "done" | "current" | "upcoming";
}

interface TimelineProps {
  steps: TimelineStep[];
  renderExtra?: (step: TimelineStep) => ReactNode;
}

export function Timeline({ steps, renderExtra }: TimelineProps) {
  return (
    <ol className={styles.timeline}>
      {steps.map((step) => (
        <li className={styles.step} key={step.id} data-status={step.status ?? "upcoming"}>
          <span className={styles.marker} aria-hidden="true">
            {step.status === "done" ? <CheckIcon /> : null}
          </span>
          <div className={styles.content}>
            <h4 className={styles.title}>{step.title}</h4>
            {step.description && <p className={styles.description}>{step.description}</p>}
            {renderExtra?.(step)}
          </div>
        </li>
      ))}
    </ol>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M5 12.5 10 17l9-10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
