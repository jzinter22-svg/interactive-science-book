import { Outlet, useLocation, useParams } from "react-router-dom";
import { AppShell } from "./AppShell";
import { sidebarSectionsFromChapters } from "../../data/demoContent";

const sidebarSections = sidebarSectionsFromChapters();

export function Layout() {
  const location = useLocation();
  const params = useParams();
  const showSidebar = location.pathname.startsWith("/chapter") || location.pathname.startsWith("/lesson");

  return (
    <AppShell sidebarSections={showSidebar ? sidebarSections : undefined} activeItemId={params.lessonId}>
      <Outlet />
    </AppShell>
  );
}
