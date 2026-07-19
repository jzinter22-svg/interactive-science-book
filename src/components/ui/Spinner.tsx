import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeMap: Record<NonNullable<SpinnerProps["size"]>, number> = {
  sm: 16,
  md: 24,
  lg: 36,
};

export function Spinner({ size = "md", label = "جارٍ التحميل" }: SpinnerProps) {
  const px = sizeMap[size];
  return (
    <span className={styles.wrap} role="status" aria-live="polite">
      <svg
        className={styles.spinner}
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeOpacity="0.18" strokeWidth="3" />
        <path
          d="M21.5 12a9.5 9.5 0 0 0-9.5-9.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
