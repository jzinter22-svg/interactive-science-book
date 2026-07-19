import type { ReferenceItem } from "../../content/types";
import styles from "./ReferencesBlock.module.css";

interface ReferencesBlockProps {
  title?: string;
  items: ReferenceItem[];
}

export function ReferencesBlock({ title = "المراجع", items }: ReferencesBlockProps) {
  return (
    <article className={`glass-surface ${styles.card}`}>
      <h4 className={styles.title}>{title}</h4>
      <ol className={styles.list}>
        {items.map((item, i) => (
          <li className={styles.item} key={i}>
            <span className={styles.index}>{i + 1}.</span>
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {item.label}
              </a>
            ) : (
              <span className={styles.text}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </article>
  );
}
