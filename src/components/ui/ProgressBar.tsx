import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  tone?: "indigo" | "amber" | "teal" | "success";
}

export function ProgressBar({ value, max = 100, label, showPercent = true, tone = "indigo" }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={styles.wrap}>
      {(label || showPercent) && (
        <div className={styles.labelRow}>
          {label && <span className={styles.label}>{label}</span>}
          {showPercent && <span className={styles.percent}>{Math.round(percent)}%</span>}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className={`${styles.fill} ${styles[tone]}`} style={{ inlineSize: `${percent}%` }} />
      </div>
    </div>
  );
}
