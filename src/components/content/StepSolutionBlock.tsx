import shared from "../cards/shared.module.css";
import styles from "./StepSolutionBlock.module.css";

interface StepSolutionBlockProps {
  steps: string[];
  finalAnswer?: string;
}

export function StepSolutionBlock({ steps, finalAnswer }: StepSolutionBlockProps) {
  return (
    <div className={styles.wrap}>
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li className={styles.step} key={i}>
            <span className={styles.number} aria-hidden="true">
              {i + 1}
            </span>
            <p className={styles.text}>{step}</p>
          </li>
        ))}
      </ol>
      {finalAnswer && (
        <div className={styles.answer}>
          <span className={`${shared.badge} ${shared.badgeSuccess}`}>الناتج النهائي</span>
          <p className={styles.answerText}>{finalAnswer}</p>
        </div>
      )}
    </div>
  );
}
