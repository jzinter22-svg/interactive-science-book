import { useState } from "react";
import shared from "./shared.module.css";
import styles from "./QuestionCard.module.css";

interface QuestionCardProps {
  index: number;
  question: string;
  options: string[];
  correctIndex?: number;
  explanation?: string;
}

export function QuestionCard({ index, question, options, correctIndex, explanation }: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <article className={`glass-surface-strong ${shared.card} ${styles.card}`}>
      <span className={`${shared.badge} ${shared.badgeIndigo}`}>السؤال {index}</span>
      <h4 className={shared.title}>{question}</h4>

      <div className={styles.options} role="radiogroup" aria-label={question}>
        {options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrect = correctIndex === i;
          const revealed = selected !== null;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={styles.option}
              data-selected={isSelected}
              data-correct={revealed && isCorrect ? "true" : undefined}
              data-incorrect={revealed && isSelected && !isCorrect ? "true" : undefined}
              onClick={() => setSelected(i)}
            >
              <span className={styles.optionMarker}>{String.fromCharCode(65 + i)}</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
      {selected !== null && explanation && <p className={styles.explanation}>{explanation}</p>}
    </article>
  );
}
