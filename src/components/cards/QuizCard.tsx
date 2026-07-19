import { useState } from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { Button } from "../ui/Button";
import { QuestionCard } from "./QuestionCard";
import shared from "./shared.module.css";
import styles from "./QuizCard.module.css";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizCardProps {
  title: string;
  questions: QuizQuestion[];
}

export function QuizCard({ title, questions }: QuizCardProps) {
  const [step, setStep] = useState(0);
  const isLast = step === questions.length - 1;
  const current = questions[step];

  return (
    <section className={`glass-surface ${styles.card}`}>
      <div className={styles.header}>
        <span className={`${shared.badge} ${shared.badgeIndigo}`}>اختبار قصير</span>
        <h3 className={shared.title}>{title}</h3>
      </div>

      <ProgressBar value={step + 1} max={questions.length} label={`السؤال ${step + 1} من ${questions.length}`} />

      <QuestionCard
        key={step}
        index={step + 1}
        question={current.question}
        options={current.options}
        correctIndex={current.correctIndex}
      />

      <div className={styles.footer}>
        <Button variant="outline" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          السابق
        </Button>
        <Button
          size="sm"
          onClick={() => setStep((s) => Math.min(questions.length - 1, s + 1))}
          disabled={isLast}
        >
          {isLast ? "انتهى" : "التالي"}
        </Button>
      </div>
    </section>
  );
}
