import { useMemo } from "react";
import styles from "./SolarSystemSimulation.module.css";

interface StarsProps {
  width: number;
  height: number;
  count?: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
  duration: number;
  delay: number;
}

/** A quiet, randomly-twinkling star field. Positions are seeded once per mount, never regenerated. */
export function Stars({ width, height, count = 70 }: StarsProps) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.5 + Math.random() * 1.1,
      duration: 2.5 + Math.random() * 3.5,
      delay: -Math.random() * 6,
    }));
  }, [count, width, height]);

  return (
    <g className={styles.starField} aria-hidden="true">
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="var(--text-tertiary)"
          className={styles.star}
          style={{ animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }}
        />
      ))}
    </g>
  );
}
