import { useRef } from "react";
import { useInViewport } from "../simulations/hooks";
import styles from "./EarthMoonSystem.module.css";

/**
 * Purely decorative Earth+Moon system for the hero corner. Earth spins
 * on its axis, the Moon orbits around it — both driven by CSS
 * `@keyframes` (compositor-accelerated, no per-frame JS) so it's smooth
 * and cheap. `data-running` pauses every animation the moment the hero
 * scrolls out of view, and `prefers-reduced-motion` disables it entirely.
 */
export function EarthMoonSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewport(ref);

  return (
    <div ref={ref} className={styles.root} data-running={inView} aria-hidden="true">
      <div className={styles.orbitPath} />
      <div className={styles.moonOrbit}>
        <div className={styles.moon}>
          <div className={styles.moonCrater1} />
          <div className={styles.moonCrater2} />
        </div>
      </div>

      <div className={styles.earthShadowCast} />
      <div className={styles.earth}>
        <div className={styles.earthSpin}>
          <div className={styles.continent1} />
          <div className={styles.continent2} />
          <div className={styles.continent3} />
        </div>
        <div className={styles.earthShading} />
      </div>
    </div>
  );
}
