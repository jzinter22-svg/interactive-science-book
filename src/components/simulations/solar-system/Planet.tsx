import type { KeyboardEvent } from "react";
import styles from "./SolarSystemSimulation.module.css";

interface PlanetProps {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  name: string;
  active: boolean;
  hasRing?: boolean;
  /** Earth only: spins a small shading overlay to show axial rotation. */
  spinning?: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
}

/**
 * One orbiting body — planet or moon. Handles its own hover/focus/tap
 * interaction (mouse hover, keyboard focus, and touch tap all route
 * through the same activate/deactivate pair) and a subtle hover-enlarge.
 * Positioning is computed by the parent simulation each frame; this
 * component only ever renders where it's told to.
 */
export function Planet({ id, x, y, radius, color, name, active, hasRing, spinning, onActivate, onDeactivate }: PlanetProps) {
  const handleKeyDown = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (active) onDeactivate();
      else onActivate(id);
    }
    if (e.key === "Escape") onDeactivate();
  };

  return (
    <g
      className={styles.planetGroup}
      data-active={active}
      transform={`translate(${x} ${y})`}
      tabIndex={0}
      role="button"
      aria-label={name}
      onMouseEnter={() => onActivate(id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(id)}
      onBlur={onDeactivate}
      onClick={() => (active ? onDeactivate() : onActivate(id))}
      onKeyDown={handleKeyDown}
    >
      {hasRing && (
        <ellipse
          className={styles.planetRing}
          rx={radius * 1.9}
          ry={radius * 0.6}
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          opacity="0.75"
        />
      )}
      <circle className={styles.planetBody} r={radius} fill={color} />
      {spinning && (
        <g className={styles.planetSpin}>
          <path
            d={`M 0 ${-radius} A ${radius} ${radius} 0 0 1 0 ${radius} Z`}
            fill="rgba(0,0,0,0.32)"
          />
        </g>
      )}
    </g>
  );
}
