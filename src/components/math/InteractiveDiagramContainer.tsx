import { useState, type ReactNode } from "react";
import styles from "./InteractiveDiagramContainer.module.css";

interface InteractiveDiagramContainerProps {
  title: string;
  children: ReactNode;
  onReset?: () => void;
}

export function InteractiveDiagramContainer({ title, children, onReset }: InteractiveDiagramContainerProps) {
  const [zoom, setZoom] = useState(1);

  const zoomIn = () => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)));
  const reset = () => {
    setZoom(1);
    onReset?.();
  };

  return (
    <div className={`glass-surface-strong ${styles.card}`}>
      <div className={styles.toolbar}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.controls}>
          <button type="button" className={styles.controlButton} onClick={zoomOut} aria-label="تصغير">
            −
          </button>
          <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
          <button type="button" className={styles.controlButton} onClick={zoomIn} aria-label="تكبير">
            +
          </button>
          <button type="button" className={styles.controlButton} onClick={reset} aria-label="إعادة ضبط">
            <ResetIcon />
          </button>
        </div>
      </div>
      <div className={styles.canvas}>
        <div className={styles.canvasInner} style={{ transform: `scale(${zoom})` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <path
        d="M4.5 12a7.5 7.5 0 1 1 2.4 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M4.5 17.5V13H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
