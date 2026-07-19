import { MathFormula } from "../math/MathFormula";
import shared from "./shared.module.css";
import styles from "./FormulaCard.module.css";

interface FormulaCardProps {
  label?: string;
  formula: string;
  caption?: string;
}

export function FormulaCard({ label = "القانون", formula, caption }: FormulaCardProps) {
  return (
    <figure className={`glass-surface-strong ${styles.card}`}>
      <span className={`${shared.badge} ${shared.badgeAmber}`}>{label}</span>
      <div className={styles.formula}>
        <MathFormula expression={formula} display />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
