import { useParams, useNavigate } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { ContentBlockList } from "../components/content/BlockRenderer";
import shared from "../components/cards/shared.module.css";
import { getLessonById, getAdjacentLessons } from "../content/registry";
import styles from "./LessonPage.module.css";

const kindLabel: Record<string, string> = {
  reading: "قراءة",
  video: "فيديو",
  interactive: "تفاعلي",
  quiz: "اختبار",
};

export function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { chapter, lesson, index } = getLessonById(lessonId);
  const { prev: prevLesson, next: nextLesson } = getAdjacentLessons(lessonId);

  return (
    <Container size="reading">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: chapter.title, href: `/chapter/${chapter.id}` },
          { label: lesson.title },
        ]}
      />

      <header className={styles.header}>
        <div className={styles.metaRow}>
          <span className={`${shared.badge} ${shared.badgeIndigo}`}>{kindLabel[lesson.kind]}</span>
          <span className={styles.progressLabel}>{lesson.duration}</span>
        </div>
        <h1 className={styles.title}>{lesson.title}</h1>
        <div className={styles.progressRow}>
          <span className={styles.progressLabel}>
            الدرس {index + 1} من {chapter.lessons.length}
          </span>
          <div className={styles.progressBar}>
            <ProgressBar value={index + 1} max={chapter.lessons.length} showPercent={false} />
          </div>
        </div>
      </header>

      <div className={styles.content}>
        {lesson.blocks.length > 0 ? (
          <ContentBlockList blocks={lesson.blocks} />
        ) : (
          <EmptyState
            title="لم يُضف محتوى لهذا الدرس بعد"
            description="هذا الدرس جزء من بنية الفصل الأساسية، وسيُستكمل محتواه لاحقًا."
          />
        )}
      </div>

      <div className={styles.navRow}>
        <Button variant="outline" disabled={!prevLesson} onClick={() => prevLesson && navigate(`/lesson/${prevLesson.id}`)}>
          الدرس السابق
        </Button>
        <Button disabled={!nextLesson} onClick={() => nextLesson && navigate(`/lesson/${nextLesson.id}`)}>
          الدرس التالي
        </Button>
      </div>
    </Container>
  );
}
