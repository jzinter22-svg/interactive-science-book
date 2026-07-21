import { useEffect, useRef, type ReactNode } from "react";
import { useInViewport } from "../hooks";
import styles from "./ConceptDemoShell.module.css";

interface ConceptDemoShellProps {
  title: string;
  canvas: ReactNode;
  sliders?: ReactNode;
  hint?: string;
  running?: boolean;
  onToggleRunning?: () => void;
  onReset?: () => void;
  onVisibilityChange?: (inView: boolean) => void;
}

/**
 * A lighter sibling of SimShell for the small, single-concept demos
 * that replace a static figure: a title bar with an optional
 * play/pause + reset (only shown when the demo actually auto-animates),
 * the canvas, optional sliders, and an optional one-line hint. Every
 * demo still gets off-screen pausing via the same useInViewport hook.
 */
export function ConceptDemoShell({ title, canvas, sliders, hint, running, onToggleRunning, onReset, onVisibilityChange }: ConceptDemoShellProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInViewport(cardRef);

  useEffect(() => {
    onVisibilityChange?.(inView);
  }, [inView, onVisibilityChange]);

  return (
    <div ref={cardRef} className={`glass-surface-strong ${styles.card}`}>
      <div className={styles.toolbar}>
        <h4 className={styles.title}>{title}</h4>
        {onToggleRunning && (
          <div className={styles.controls}>
            <button type="button" className={styles.iconButton} onClick={onToggleRunning} aria-label={running ? "إيقاف مؤقت" : "تشغيل"}>
              {running ? <PauseIcon /> : <PlayIcon />}
            </button>
            {onReset && (
              <button type="button" className={styles.iconButton} onClick={onReset} aria-label="إعادة ضبط">
                <ResetIcon />
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles.canvas}>{canvas}</div>

      {sliders && <div className={styles.sliders}>{sliders}</div>}
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <rect x="6.5" y="5.5" width="4" height="13" rx="1" />
      <rect x="13.5" y="5.5" width="4" height="13" rx="1" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
      <path d="M4.5 12a7.5 7.5 0 1 1 2.4 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4.5 17.5V13H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
