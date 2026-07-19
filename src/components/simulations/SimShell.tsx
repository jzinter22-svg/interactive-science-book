import { useEffect, useRef, type ReactNode } from "react";
import { useInViewport } from "./hooks";
import styles from "./SimShell.module.css";

interface Readout {
  label: string;
  value: string;
}

interface SimShellProps {
  title: string;
  running: boolean;
  onToggleRunning: () => void;
  onReset: () => void;
  canvas: ReactNode;
  controls: ReactNode;
  readouts: Readout[];
  /** Exposes whether the canvas is currently in the viewport, e.g. to freeze a drag. */
  onVisibilityChange?: (inView: boolean) => void;
}

/**
 * Shared shell for every physics lab: a glass card with a play/pause +
 * reset toolbar, a canvas area, a controls (sliders) area, and a live
 * numeric readouts strip. The animation loop itself lives in each
 * simulation component — this shell only decides whether it's allowed
 * to run, pausing automatically once the card scrolls out of view so
 * off-screen simulations don't burn CPU/battery.
 */
export function SimShell({ title, running, onToggleRunning, onReset, canvas, controls, readouts, onVisibilityChange }: SimShellProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInViewport(cardRef);

  useEffect(() => {
    onVisibilityChange?.(inView);
  }, [inView, onVisibilityChange]);

  return (
    <div ref={cardRef} className={`glass-surface-strong ${styles.card}`}>
      <div className={styles.toolbar}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.iconButton}
            data-active={running}
            onClick={onToggleRunning}
            aria-label={running ? "إيقاف مؤقت" : "تشغيل"}
          >
            {running ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button type="button" className={styles.iconButton} onClick={onReset} aria-label="إعادة ضبط">
            <ResetIcon />
          </button>
        </div>
      </div>

      <div className={styles.canvas}>{canvas}</div>

      {!inView && running && <p className={styles.pausedNote}>أُوقفت المحاكاة مؤقتاً لأنها خارج نطاق العرض</p>}

      <div className={styles.body}>{controls}</div>

      <div className={styles.readouts}>
        {readouts.map((r) => (
          <div className={styles.readout} key={r.label}>
            <span className={styles.readoutLabel}>{r.label}</span>
            <span className={styles.readoutValue}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <rect x="6.5" y="5.5" width="4" height="13" rx="1" />
      <rect x="13.5" y="5.5" width="4" height="13" rx="1" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <path d="M4.5 12a7.5 7.5 0 1 1 2.4 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4.5 17.5V13H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
