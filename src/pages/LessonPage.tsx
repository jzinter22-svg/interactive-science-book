import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Button } from "../components/ui/Button";
import { NoteCard } from "../components/cards/NoteCard";
import { ExampleCard } from "../components/cards/ExampleCard";
import { FormulaCard } from "../components/cards/FormulaCard";
import { WarningCard } from "../components/cards/WarningCard";
import { ExerciseCard } from "../components/cards/ExerciseCard";
import { SolutionCard } from "../components/cards/SolutionCard";
import { QuizCard, type QuizQuestion } from "../components/cards/QuizCard";
import { InteractiveDiagramContainer } from "../components/math/InteractiveDiagramContainer";
import shared from "../components/cards/shared.module.css";
import { findLesson } from "../data/demoContent";
import styles from "./LessonPage.module.css";

const kindLabel: Record<string, string> = {
  reading: "قراءة",
  video: "فيديو",
  interactive: "تفاعلي",
  quiz: "اختبار",
};

const demoQuizQuestions: QuizQuestion[] = [
  {
    question: "أي بطاقة تُستخدم لعرض حل مخفي يمكن إظهاره عند الطلب؟",
    options: ["بطاقة المثال", "بطاقة الحل", "بطاقة الفيديو"],
    correctIndex: 1,
  },
  {
    question: "ما الغرض من حاوية الرسم التفاعلي في هذه الصفحة؟",
    options: ["تشغيل صوت", "عرض رسم بأدوات تكبير وتصغير", "تسجيل الدخول"],
    correctIndex: 1,
  },
];

export function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [showSolution, setShowSolution] = useState(false);
  const { chapter, lesson, index } = findLesson(lessonId);

  const prevLesson = chapter.lessons[index - 1];
  const nextLesson = chapter.lessons[index + 1];

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
        <p className={`text-body-lg ${styles.intro}`}>
          هذا نص افتتاحي تجريبي لعرض تنسيق الفقرات وسهولة القراءة داخل صفحة الدرس، بعرض عمود مريح للعين وارتفاع سطر
          مناسب للقراءة الطويلة.
        </p>

        <NoteCard title="ملاحظة تجريبية">نص قصير لاختبار بطاقة الملاحظات ضمن تدفق القراءة الطبيعي للدرس.</NoteCard>

        <ExampleCard title="عنوان مثال تجريبي">
          هذا نص عرض تجريبي داخل بطاقة المثال، لاختبار التباين والمسافات وسهولة القراءة ضمن سياق الدرس الكامل.
        </ExampleCard>

        <FormulaCard label="معادلة تجريبية" formula="E = mc^2" caption="مثال لاختبار عرض KaTeX داخل تدفق الدرس" />

        <InteractiveDiagramContainer title="رسم تخطيطي تجريبي">
          <svg width="220" height="180" viewBox="0 0 220 180" style={{ color: "var(--accent-primary)" }}>
            <circle cx="110" cy="90" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
            <polygon points="110,30 170,140 50,140" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="110" y1="10" x2="110" y2="170" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </InteractiveDiagramContainer>

        <WarningCard title="تنبيه تجريبي">نص قصير لاختبار بطاقة التنبيه ووضوح ألوانها ضمن سياق القراءة.</WarningCard>

        <div className={styles.sectionDivider}>
          <ExerciseCard number={1} title="عنوان تمرين تجريبي" difficulty="متوسط" onShowSolution={() => setShowSolution(true)}>
            نص تجريبي لعرض شكل بطاقة التمرين مع شارة المستوى وزر إظهار الحل ضمن الدرس.
          </ExerciseCard>
          {showSolution && (
            <div style={{ marginTop: "var(--space-3)" }}>
              <SolutionCard defaultOpen>هذا نص الحل التجريبي المرتبط بالتمرين أعلاه.</SolutionCard>
            </div>
          )}
        </div>

        <div className={styles.sectionDivider}>
          <h2 className={styles.checkTitle}>تحقّق من فهمك</h2>
          <QuizCard title="اختبار قصير تجريبي" questions={demoQuizQuestions} />
        </div>
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
