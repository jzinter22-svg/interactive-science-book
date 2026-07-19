import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

export interface SidebarSection {
  id: string;
  title: string;
  items: { id: string; label: string; progress?: number; href?: string }[];
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
                {section.items.map((item) => {
                  const isActive = item.id === activeItemId;
                  const content = (
                    <>
                      <span className={styles.itemDot} data-active={isActive} />
                      <span className={styles.itemLabel}>{item.label}</span>
                      {typeof item.progress === "number" && (
                        <span className={styles.itemProgress}>{item.progress}%</span>
                      )}
                    </>
                  );
                  return (
                    <li key={item.id}>
                      {item.href ? (
                        <Link to={item.href} className={styles.item} data-active={isActive} onClick={onClose}>
                          {content}
                        </Link>
                      ) : (
                        <a href={`#${item.id}`} className={styles.item} data-active={isActive}>
                          {content}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
