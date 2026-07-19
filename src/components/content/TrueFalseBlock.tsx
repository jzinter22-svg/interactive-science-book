import { useState } from "react";
import shared from "../cards/shared.module.css";
import styles from "./TrueFalseBlock.module.css";

interface TrueFalseBlockProps {
  index: number;
  statement: string;
  correctAnswer: boolean;
  explanation?: string;
}

export function TrueFalseBlock({ index, statement, correctAnswer, explanation }: TrueFalseBlockProps) {
  const [answer, setAnswer] = useState<boolean | null>(null);
  const answered = answer !== null;
  const isCorrect = answer === correctAnswer;

  return (
    <article className={`glass-surface-strong ${shared.card} ${styles.card}`}>
      <span className={`${shared.badge} ${shared.badgeIndigo}`}>سؤال {index}</span>
      <h4 className={shared.title}>{statement}</h4>

      <div className={styles.options} role="radiogroup" aria-label={statement}>
        <button
          type="button"
          role="radio"
          aria-checked={answer === true}
          className={styles.option}
          data-selected={answer === true}
          data-correct={answered && correctAnswer === true ? "true" : undefined}
          data-incorrect={answered && answer === true && !isCorrect ? "true" : undefined}
          onClick={() => setAnswer(true)}
        >
          صح
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={answer === false}
          className={styles.option}
          data-selected={answer === false}
          data-correct={answered && correctAnswer === false ? "true" : undefined}
          data-incorrect={answered && answer === false && !isCorrect ? "true" : undefined}
          onClick={() => setAnswer(false)}
        >
          خطأ
        </button>
      </div>

      {answered && explanation && <p className={styles.explanation}>{explanation}</p>}
    </article>
  );
}
