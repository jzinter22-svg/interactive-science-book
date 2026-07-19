import { useRef } from "react";
import { DiagramDefs } from "../diagrams/shared";
import { useInViewport } from "../simulations/hooks";
import styles from "./CircularMotionHero.module.css";

const CENTER = { x: 120, y: 100 };
const WHEEL_R = 46;
const ORBIT_R = 84;
const SPOKE_ANGLES = [0, 60, 120, 180, 240, 300];

/**
 * The hero's live preview of "الحركة الدائرية والدورانية": a spinning
 * wheel (rotational motion) and an orbiting body carrying its velocity
 * and centripetal-force vectors (circular motion), both driven by CSS
 * `@keyframes` around a shared pivot. Meant to teach the idea at a
 * glance before the student has read a word of the lesson.
 */
export function CircularMotionHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewport(ref);

  const ballLocal = { x: CENTER.x + ORBIT_R, y: CENTER.y };

  return (
    <div ref={ref} className={styles.root} data-running={inView}>
      <svg viewBox="0 0 240 200" className={styles.svg} role="img" aria-label="رسم متحرك يوضّح الحركة الدائرية والدورانية">
        <DiagramDefs />
        <defs>
          <filter id="hero-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={ORBIT_R}
          fill="none"
          stroke="var(--glass-border-soft)"
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />

        <g className={styles.wheelGroup}>
          <circle cx={CENTER.x} cy={CENTER.y} r={WHEEL_R} fill="none" stroke="var(--text-tertiary)" strokeWidth="3" opacity="0.55" />
          {SPOKE_ANGLES.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={CENTER.x + WHEEL_R * Math.cos(rad)}
                y2={CENTER.y + WHEEL_R * Math.sin(rad)}
                stroke="var(--text-tertiary)"
                strokeWidth="2.5"
                opacity="0.55"
              />
            );
          })}
          <circle cx={CENTER.x} cy={CENTER.y} r="7" fill="var(--accent-secondary)" />
        </g>

        <g className={styles.orbitGroup}>
          <line
            x1={ballLocal.x}
            y1={ballLocal.y}
            x2={ballLocal.x}
            y2={ballLocal.y - 26}
            stroke="var(--accent-secondary)"
            strokeWidth="2.6"
            markerEnd="url(#arrow-secondary)"
          />
          <line
            x1={ballLocal.x}
            y1={ballLocal.y}
            x2={ballLocal.x - 30}
            y2={ballLocal.y}
            stroke="var(--accent-primary)"
            strokeWidth="2.8"
            markerEnd="url(#arrow-primary)"
          />
          <circle cx={ballLocal.x} cy={ballLocal.y} r="9" fill="var(--accent-tertiary)" filter="url(#hero-glow)" />
        </g>
      </svg>
    </div>
  );
}
