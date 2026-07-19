import { useRef } from "react";
import { useInViewport } from "../simulations/hooks";
import styles from "./ChemistryDecorations.module.css";

/**
 * Purely decorative floating chemistry composition for the hero's other
 * corner: a few molecules, a hexagonal ring, an electron-orbit glyph,
 * and formula chips, each gently floating/rotating on its own CSS
 * animation. Kept sparse on purpose — "elegant, not cluttered."
 */
export function ChemistryDecorations() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewport(ref);

  return (
    <div ref={ref} className={styles.root} data-running={inView} aria-hidden="true">
      <div className={`${styles.item} ${styles.hexagon}`}>
        <svg viewBox="0 0 40 40" width="40" height="40">
          <polygon
            points="20,3 35,11.5 35,28.5 20,37 5,28.5 5,11.5"
            fill="none"
            stroke="var(--accent-tertiary)"
            strokeWidth="1.6"
          />
        </svg>
      </div>

      <div className={`${styles.item} ${styles.molecule}`}>
        <svg viewBox="0 0 60 40" width="60" height="40">
          <line x1="14" y1="20" x2="30" y2="10" stroke="var(--accent-primary)" strokeWidth="1.6" />
          <line x1="30" y1="10" x2="46" y2="20" stroke="var(--accent-primary)" strokeWidth="1.6" />
          <circle cx="14" cy="20" r="6" fill="var(--accent-secondary)" />
          <circle cx="30" cy="10" r="7.5" fill="var(--accent-primary)" />
          <circle cx="46" cy="20" r="6" fill="var(--accent-secondary)" />
        </svg>
        <span className={styles.formulaLabel}>H₂O</span>
      </div>

      <div className={`${styles.item} ${styles.electron}`}>
        <svg viewBox="0 0 50 50" width="50" height="50">
          <circle cx="25" cy="25" r="3.4" fill="var(--accent-quaternary)" />
          <ellipse cx="25" cy="25" rx="22" ry="9" fill="none" stroke="var(--accent-quaternary)" strokeWidth="1.2" opacity="0.7" />
          <ellipse cx="25" cy="25" rx="22" ry="9" fill="none" stroke="var(--accent-primary)" strokeWidth="1.2" opacity="0.7" transform="rotate(60 25 25)" />
          <ellipse cx="25" cy="25" rx="22" ry="9" fill="none" stroke="var(--accent-tertiary)" strokeWidth="1.2" opacity="0.7" transform="rotate(120 25 25)" />
          <circle className={styles.electronDot} cx="47" cy="25" r="2" fill="var(--accent-primary)" />
        </svg>
      </div>

      <div className={`${styles.item} ${styles.moleculeLinear}`}>
        <svg viewBox="0 0 60 24" width="60" height="24">
          <line x1="10" y1="12" x2="50" y2="12" stroke="var(--accent-tertiary)" strokeWidth="1.6" />
          <circle cx="10" cy="12" r="5.5" fill="var(--accent-tertiary)" />
          <circle cx="30" cy="12" r="6.5" fill="var(--text-tertiary)" />
          <circle cx="50" cy="12" r="5.5" fill="var(--accent-tertiary)" />
        </svg>
        <span className={styles.formulaLabel}>CO₂</span>
      </div>

      <span className={`${styles.item} ${styles.chip} ${styles.chipA}`}>NaCl</span>
      <span className={`${styles.item} ${styles.chip} ${styles.chipB}`}>CH₄</span>
      <span className={`${styles.item} ${styles.chip} ${styles.chipC}`}>O₂</span>
      <span className={`${styles.item} ${styles.chip} ${styles.chipD}`}>H₂SO₄</span>

      <div className={`${styles.item} ${styles.particle} ${styles.particleA}`} />
      <div className={`${styles.item} ${styles.particle} ${styles.particleB}`} />
    </div>
  );
}
