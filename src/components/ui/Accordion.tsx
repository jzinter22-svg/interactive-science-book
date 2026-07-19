import { useState, type ReactNode } from "react";
import styles from "./Accordion.module.css";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
}

export function Accordion({ items, allowMultiple = false, defaultOpenIds = [] }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (isOpen) return prev.filter((i) => i !== id);
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={styles.wrap}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div className={`glass-surface ${styles.item}`} key={item.id}>
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
            >
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={styles.chevron} data-open={isOpen} aria-hidden="true">
                <ChevronDown />
              </span>
            </button>
            {isOpen && <div className={`text-body-sm ${styles.content}`}>{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
