import { useNavigate } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Hero } from "../components/layout/Hero";
import { ChapterCard } from "../components/cards/ChapterCard";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useTheme } from "../theme/ThemeContext";
import { demoChapters } from "../data/demoContent";
import styles from "./HomePage.module.css";

const totalLessons = demoChapters.reduce((sum, c) => sum + c.lessons.length, 0);

export function HomePage() {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  return (
    <>
      <Hero
        eyebrow="بيانات تجريبية — للمعاينة فقط"
        title="منصة العلوم التفاعلية"
        subtitle="مساحة تعلّم واحدة تجمع القراءة والفيديو والتمارين التفاعلية والمساعد الذكي، بتصميم مريح للقراءة الطويلة."
        primaryAction={{ label: "استعرض الفصول", onClick: () => navigate("/chapter/c1") }}
        secondaryAction={{ label: "تبديل السمة", onClick: toggleTheme }}
        stats={[
          { value: String(demoChapters.length), label: "وحدات" },
          { value: String(totalLessons), label: "دروس" },
          { value: "٢", label: "وضع سمة" },
          { value: "AA", label: "توافق إتاحة" },
        ]}
      />

      <Container>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>متابعة التعلّم</h2>
          </div>
          <div className="bento-grid">
            <div className="span-8">
              <div className={`glass-surface ${styles.continueCard}`}>
                <div className={styles.continueTopRow}>
                  <div className={styles.continueMeta}>
                    <span className={styles.continueChapterLabel}>{demoChapters[0].title}</span>
                    <h3 className={styles.continueLessonTitle}>{demoChapters[0].lessons[2].title}</h3>
                  </div>
                  <Button onClick={() => navigate(`/lesson/${demoChapters[0].lessons[2].id}`)}>متابعة</Button>
                </div>
                <div className={styles.continueProgressRow}>
                  <div className={styles.continueProgressBar}>
                    <ProgressBar value={demoChapters[0].progress} label="تقدّم الوحدة الحالية" />
                  </div>
                </div>
              </div>
            </div>
            <div className="span-4">
              <div className={`glass-surface-strong ${styles.assistantTeaser}`}>
                <span className={styles.assistantIcon} aria-hidden="true">
                  <SparkleIcon />
                </span>
                <h3 className={styles.assistantTitle}>المساعد الذكي</h3>
                <p className={styles.assistantText}>
                  اسأل عن أي فكرة لم تتضح لك أثناء القراءة، متاح داخل كل درس.
                </p>
                <Button variant="outline" size="sm" onClick={() => navigate(`/lesson/${demoChapters[0].lessons[0].id}`)}>
                  افتح المساعد
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="chapters">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>الفصول</h2>
            <span className={styles.sectionCaption}>بيانات تجريبية — سيتم استبدالها بالمحتوى الفعلي لاحقًا</span>
          </div>
          <div className="auto-grid">
            {demoChapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                index={chapter.index}
                title={chapter.title}
                description={chapter.description}
                lessonCount={chapter.lessons.length}
                progress={chapter.progress}
                onClick={() => navigate(`/chapter/${chapter.id}`)}
              />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 2.5 13.6 8.4 19.5 10 13.6 11.6 12 17.5 10.4 11.6 4.5 10 10.4 8.4 12 2.5Z" />
    </svg>
  );
}
