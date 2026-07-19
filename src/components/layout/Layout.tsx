import { Outlet, useLocation, useParams } from "react-router-dom";
import { AppShell } from "./AppShell";
import { getSidebarNavSections } from "../../content/registry";

const sidebarSections = getSidebarNavSections();

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
