import styles from "./Sidebar.module.css";

export interface SidebarSection {
  id: string;
  title: string;
  items: { id: string; label: string; progress?: number }[];
}

interface SidebarProps {
  sections: SidebarSection[];
  activeItemId?: string;
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ sections, activeItemId, open, onClose }: SidebarProps) {
  return (
    <>
      <div className={styles.scrim} data-open={open} onClick={onClose} aria-hidden="true" />
      <aside className={styles.sidebar} data-open={open} aria-label="التنقل بين الفصول">
        <nav className={styles.nav}>
          {sections.map((section) => (
            <div className={styles.section} key={section.id}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <ul className={styles.itemList}>
                {section.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={styles.item}
                      data-active={item.id === activeItemId}
                    >
                      <span className={styles.itemDot} data-active={item.id === activeItemId} />
                      <span className={styles.itemLabel}>{item.label}</span>
                      {typeof item.progress === "number" && (
                        <span className={styles.itemProgress}>{item.progress}%</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
