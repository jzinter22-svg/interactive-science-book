import { useParams, useNavigate } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { LessonCard } from "../components/cards/LessonCard";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Button } from "../components/ui/Button";
import { findChapter } from "../data/demoContent";
import styles from "./ChapterPage.module.css";

export function ChapterPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const chapter = findChapter(chapterId);
  const nextLesson = chapter.lessons.find((l) => !l.completed) ?? chapter.lessons[0];

  return (
    <Container>
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: chapter.title }]} />

      <header className={`glass-surface-strong ${styles.header}`}>
        <div className={styles.topRow}>
          <span className={styles.indexBadge} aria-hidden="true">
            {String(chapter.index).padStart(2, "0")}
          </span>
          <div className={styles.titleCol}>
            <h1 className={styles.title}>{chapter.title}</h1>
            <p className={styles.description}>{chapter.description}</p>
          </div>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon} aria-hidden="true">
              <BookIcon />
            </span>
            {chapter.lessons.length} دروس
          </span>
          <div className={styles.progressWrap}>
            <ProgressBar value={chapter.progress} label="التقدّم في الوحدة" />
          </div>
        </div>

        <div className={styles.actionsRow}>
          <Button onClick={() => navigate(`/lesson/${nextLesson.id}`)}>
            {chapter.progress > 0 ? "متابعة الوحدة" : "ابدأ الوحدة"}
          </Button>
        </div>
      </header>

      <section className={styles.lessonsSection}>
        <h2 className={styles.sectionTitle}>الدروس</h2>
        <div className={styles.lessonsList}>
          {chapter.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              duration={lesson.duration}
              kind={lesson.kind}
              completed={lesson.completed}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H18a1 1 0 0 1 1 1v15.5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 18v-12.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
