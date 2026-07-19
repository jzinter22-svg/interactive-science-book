import type { GlossaryTerm } from "../../content/types";
import styles from "./GlossaryBlock.module.css";

interface GlossaryBlockProps {
  title?: string;
  terms: GlossaryTerm[];
}

export function GlossaryBlock({ title = "مسرد المصطلحات", terms }: GlossaryBlockProps) {
  return (
    <article className={`glass-surface ${styles.card}`}>
      <h4 className={styles.title}>{title}</h4>
      <dl className={styles.list}>
        {terms.map((entry) => (
          <div className={styles.row} key={entry.term}>
            <dt className={styles.term}>{entry.term}</dt>
            <dd className={styles.definition}>{entry.definition}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
