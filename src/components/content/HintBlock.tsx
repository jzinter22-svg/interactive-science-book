import { useState } from "react";
import shared from "../cards/shared.module.css";
import { RichTextParagraphs } from "./richText";
import type { RichText } from "../../content/types";
import styles from "./HintBlock.module.css";

interface HintBlockProps {
  body: RichText;
  defaultOpen?: boolean;
}

export function HintBlock({ body, defaultOpen = false }: HintBlockProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`glass-surface ${styles.card}`}>
      <button type="button" className={styles.trigger} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className={`${shared.badge} ${shared.badgeAmber}`}>
          <BulbIcon /> تلميح
        </span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className={`text-body ${styles.content}`}>
          <RichTextParagraphs body={body} />
        </div>
      )}
    </div>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path
        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform var(--dur-base) var(--ease-standard)" }}
    >
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
