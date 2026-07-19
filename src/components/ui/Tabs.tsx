import { useId, useState, type ReactNode } from "react";
import styles from "./Tabs.module.css";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
}

export function Tabs({ tabs, defaultTabId }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id);
  const baseId = useId();

  return (
    <div className={styles.wrap}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={activeId === tab.id}
            aria-controls={`${baseId}-panel-${tab.id}`}
            className={styles.tab}
            data-active={activeId === tab.id}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map(
        (tab) =>
          activeId === tab.id && (
            <div
              key={tab.id}
              id={`${baseId}-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${tab.id}`}
              className={styles.panel}
            >
              {tab.content}
            </div>
          ),
      )}
    </div>
  );
}
