import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { ChapterPage } from "./pages/ChapterPage";
import { LessonPage } from "./pages/LessonPage";
import { ShowcasePage } from "./pages/ShowcasePage";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chapter/:chapterId" element={<ChapterPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/design-system" element={<ShowcasePage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
