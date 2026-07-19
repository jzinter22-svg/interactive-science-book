import styles from "./SummaryBlock.module.css";

interface SummaryBlockProps {
  title?: string;
  points: string[];
}

export function SummaryBlock({ title = "ملخص الدرس", points }: SummaryBlockProps) {
  return (
    <article className={`glass-surface-strong ${styles.card}`}>
      <h4 className={styles.title}>{title}</h4>
      <ul className={styles.list}>
        {points.map((point, i) => (
          <li className={styles.item} key={i}>
            <span className={styles.marker} aria-hidden="true" />
            <span className={styles.text}>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
