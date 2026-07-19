import { useTheme } from "../../theme/ThemeContext";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
      onClick={toggleTheme}
    >
      <span className={styles.track} data-checked={isDark}>
        <span className={styles.thumb} data-checked={isDark}>
          <SunIcon className={styles.iconSun} />
          <MoonIcon className={styles.iconMoon} />
        </span>
      </span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="12" y1="2.5" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.5" y2="12" />
        <line x1="5.1" y1="5.1" x2="6.8" y2="6.8" />
        <line x1="17.2" y1="17.2" x2="18.9" y2="18.9" />
        <line x1="5.1" y1="18.9" x2="6.8" y2="17.2" />
        <line x1="17.2" y1="6.8" x2="18.9" y2="5.1" />
      </g>
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
