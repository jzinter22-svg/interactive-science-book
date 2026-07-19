import { useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar, type SidebarSection } from "./Sidebar";
import { Footer } from "./Footer";
import styles from "./AppShell.module.css";

interface AppShellProps {
  sidebarSections?: SidebarSection[];
  activeItemId?: string;
  children: ReactNode;
}

export function AppShell({ sidebarSections, activeItemId, children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <a href="#main-content" className="skip-link">
        تخطَّ إلى المحتوى الرئيسي
      </a>
      <Header onMenuToggle={() => setMenuOpen((v) => !v)} menuOpen={menuOpen} />
      <div className={styles.body}>
        {sidebarSections && (
          <Sidebar
            sections={sidebarSections}
            activeItemId={activeItemId}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
        )}
        <main id="main-content" className={styles.main}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
