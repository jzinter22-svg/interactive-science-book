import styles from "./SolarSystemSimulation.module.css";

interface OrbitProps {
  cx: number;
  cy: number;
  radius: number;
}

/** One faint, glowing, slowly-marching-dashes orbit path. Purely decorative. */
export function Orbit({ cx, cy, radius }: OrbitProps) {
  return <circle className={styles.orbit} cx={cx} cy={cy} r={radius} fill="none" />;
}
