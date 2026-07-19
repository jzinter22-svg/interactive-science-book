import { Button } from "./Button";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "حدث خطأ غير متوقع",
  description = "تعذّر تحميل هذا المحتوى. يرجى المحاولة مرة أخرى.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles.wrap} role="alert">
      <span className={styles.icon} aria-hidden="true">
        <AlertIcon />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          إعادة المحاولة
        </Button>
      )}
    </div>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
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
