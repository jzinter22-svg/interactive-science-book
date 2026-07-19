import { ThemeProvider } from "./theme/ThemeContext";
import { AppShell } from "./components/layout/AppShell";
import { ShowcasePage } from "./pages/ShowcasePage";
import type { SidebarSection } from "./components/layout/Sidebar";

const sidebarSections: SidebarSection[] = [
  {
    id: "gallery",
    title: "معرض المكوّنات",
    items: [
      { id: "hero", label: "الترويسة الرئيسية" },
      { id: "chapters", label: "بطاقات الفصول" },
      { id: "lessons", label: "بطاقات الدروس" },
      { id: "content-cards", label: "بطاقات المحتوى" },
      { id: "media", label: "الوسائط" },
      { id: "diagram", label: "الرسم التفاعلي" },
      { id: "quiz", label: "الاختبار التفاعلي" },
      { id: "assistant", label: "المساعد الذكي" },
      { id: "interaction", label: "عناصر تفاعلية" },
    ],
  },
];

function App() {
  return (
    <ThemeProvider>
      <AppShell sidebarSections={sidebarSections} activeItemId="hero">
        <ShowcasePage />
      </AppShell>
    </ThemeProvider>
  );
}

export default App;
