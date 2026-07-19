import shared from "../cards/shared.module.css";
import styles from "./DefinitionBlock.module.css";

interface DefinitionBlockProps {
  term: string;
  definition: string;
}

export function DefinitionBlock({ term, definition }: DefinitionBlockProps) {
  return (
    <article className={`glass-surface-strong ${styles.card}`}>
      <span className={`${shared.badge} ${shared.badgeIndigo}`}>تعريف</span>
      <h4 className={styles.term}>{term}</h4>
      <p className={`text-body ${styles.definition}`}>{definition}</p>
    </article>
  );
}
