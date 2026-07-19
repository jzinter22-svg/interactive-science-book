import styles from "./SimSlider.module.css";

interface SimSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  /** How many decimal places to show in the live value readout. Default 1. */
  precision?: number;
}

export function SimSlider({ label, value, min, max, step = 1, unit, onChange, precision = 1 }: SimSliderProps) {
  return (
    <label className={styles.wrap}>
      <span className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>
          {value.toFixed(precision)}
          {unit && <span className={styles.unit}> {unit}</span>}
        </span>
      </span>
      <input
        type="range"
        className={styles.range}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
