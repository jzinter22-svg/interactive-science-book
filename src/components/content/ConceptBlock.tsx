import shared from "../cards/shared.module.css";
import { RichTextParagraphs } from "./richText";
import type { RichText } from "../../content/types";
import styles from "./ConceptBlock.module.css";

interface ConceptBlockProps {
  title: string;
  body: RichText;
}

export function ConceptBlock({ title, body }: ConceptBlockProps) {
  return (
    <article className={`glass-surface-strong ${shared.card} ${styles.card}`}>
      <span className={styles.icon} aria-hidden="true">
        <BulbIcon />
      </span>
      <h4 className={shared.title}>{title}</h4>
      <div className={`text-body ${styles.body}`}>
        <RichTextParagraphs body={body} />
      </div>
    </article>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
