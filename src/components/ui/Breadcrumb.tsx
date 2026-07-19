import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="مسار التنقل" className={styles.breadcrumb}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              {item.href && !isLast ? (
                <Link to={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  <ChevronIcon />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
