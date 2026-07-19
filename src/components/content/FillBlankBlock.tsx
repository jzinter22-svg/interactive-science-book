import { useState } from "react";
import shared from "../cards/shared.module.css";
import { Button } from "../ui/Button";
import styles from "./FillBlankBlock.module.css";

interface FillBlankBlockProps {
  index: number;
  template: string;
  answers: string[];
  caseSensitive?: boolean;
}

export function FillBlankBlock({ index, template, answers, caseSensitive }: FillBlankBlockProps) {
  const segments = template.split("___");
  const blankCount = segments.length - 1;
  const [values, setValues] = useState<string[]>(() => Array(blankCount).fill(""));
  const [checked, setChecked] = useState(false);

  const normalize = (s: string) => (caseSensitive ? s.trim() : s.trim().toLocaleLowerCase());
  const isBlankCorrect = (i: number) => normalize(values[i] ?? "") === normalize(answers[i] ?? "");
  const allCorrect = checked && values.every((_, i) => isBlankCorrect(i));

  return (
    <article className={`glass-surface-strong ${shared.card} ${styles.card}`}>
      <span className={`${shared.badge} ${shared.badgeIndigo}`}>أكمل الفراغ {index}</span>

      <p className={styles.template}>
        {segments.map((segment, i) => (
          <span key={i}>
            {segment}
            {i < blankCount && (
              <input
                type="text"
                className={styles.blank}
                value={values[i]}
                onChange={(e) => {
                  const next = [...values];
                  next[i] = e.target.value;
                  setValues(next);
                  setChecked(false);
                }}
                data-checked={checked}
                data-correct={checked && isBlankCorrect(i) ? "true" : undefined}
                data-incorrect={checked && !isBlankCorrect(i) ? "true" : undefined}
                aria-label={`فراغ رقم ${i + 1}`}
                size={Math.max(6, (answers[i]?.length ?? 6) + 2)}
              />
            )}
          </span>
        ))}
      </p>

      <div className={styles.footer}>
        <Button variant="outline" size="sm" onClick={() => setChecked(true)}>
          تحقق من الإجابة
        </Button>
        {checked && (
          <span className={styles.feedback} data-ok={allCorrect}>
            {allCorrect ? "إجابة صحيحة!" : "راجع إجاباتك مرة أخرى"}
          </span>
        )}
      </div>
    </article>
  );
}
