import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import shared from "./shared.module.css";
import styles from "./ExerciseCard.module.css";

type Difficulty = "سهل" | "متوسط" | "صعب";

interface ExerciseCardProps {
  number: number;
  title: string;
  difficulty?: Difficulty;
  children: ReactNode;
  onShowSolution?: () => void;
}

const difficultyClass: Record<Difficulty, string> = {
  "سهل": shared.badgeSuccess,
  "متوسط": shared.badgeAmber,
  "صعب": shared.badgeDanger,
};

export function ExerciseCard({ number, title, difficulty = "متوسط", children, onShowSolution }: ExerciseCardProps) {
  return (
    <article className={`glass-surface-strong ${shared.card} ${styles.card}`}>
      <div className={styles.header}>
        <span className={styles.number}>{number}</span>
        <h4 className={shared.title}>{title}</h4>
        <span className={`${shared.badge} ${difficultyClass[difficulty]}`}>{difficulty}</span>
      </div>
      <div className={`text-body ${styles.body}`}>{children}</div>
      {onShowSolution && (
        <div className={styles.footer}>
          <Button variant="outline" size="sm" onClick={onShowSolution}>
            إظهار الحل
          </Button>
        </div>
      )}
    </article>
  );
}
