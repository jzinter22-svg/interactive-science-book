import { Link, useLocation } from "react-router-dom";
import { Container } from "./Container";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/Button";
import styles from "./Header.module.css";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "الرئيسية", href: "/" },
  { label: "الفصول", href: "/chapter/c1" },
  { label: "الدروس", href: "/lesson/c1-l1" },
  { label: "معرض المكوّنات", href: "/design-system" },
];

interface HeaderProps {
  onMenuToggle?: () => void;
  menuOpen?: boolean;
}

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
        >
          <span className={styles.menuIcon} data-open={menuOpen} />
        </button>

        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <BookIcon />
          </span>
          <span className={styles.brandText}>منصة العلوم التفاعلية</span>
        </Link>

        <nav className={styles.nav} aria-label="التنقل الرئيسي">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={styles.navLink}
                  data-active={location.pathname === link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <Button size="sm" className={styles.hideOnMobile}>
            تسجيل الدخول
          </Button>
        </div>
      </Container>
    </header>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M12 6.5c-1.7-1.2-4-1.4-6-.8v11.4c2-.6 4.3-.4 6 .8 1.7-1.2 4-1.4 6-.8V5.7c-2-.6-4.3-.4-6 .8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 6.5v11.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
