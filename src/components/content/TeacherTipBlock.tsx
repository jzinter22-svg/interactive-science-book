import shared from "../cards/shared.module.css";
import { RichTextParagraphs } from "./richText";
import type { RichText } from "../../content/types";
import styles from "./TeacherTipBlock.module.css";

interface TeacherTipBlockProps {
  body: RichText;
}

export function TeacherTipBlock({ body }: TeacherTipBlockProps) {
  return (
    <div className={`glass-surface ${styles.card}`}>
      <span className={styles.icon} aria-hidden="true">
        <ChalkboardIcon />
      </span>
      <div className={styles.content}>
        <span className={`${shared.badge} ${shared.badgeQuaternary}`}>ملاحظة للمعلم</span>
        <div className={`text-body-sm ${styles.body}`}>
          <RichTextParagraphs body={body} />
        </div>
      </div>
    </div>
  );
}

function ChalkboardIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 12.5 10 9l2.5 2 4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
