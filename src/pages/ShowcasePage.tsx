import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { Container } from "../components/layout/Container";
import { Hero } from "../components/layout/Hero";
import { ChapterCard } from "../components/cards/ChapterCard";
import { LessonCard } from "../components/cards/LessonCard";
import { ExampleCard } from "../components/cards/ExampleCard";
import { ExerciseCard } from "../components/cards/ExerciseCard";
import { SolutionCard } from "../components/cards/SolutionCard";
import { FormulaCard } from "../components/cards/FormulaCard";
import { NoteCard } from "../components/cards/NoteCard";
import { WarningCard } from "../components/cards/WarningCard";
import { VideoCard } from "../components/cards/VideoCard";
import { ImageCard } from "../components/cards/ImageCard";
import { QuizCard, type QuizQuestion } from "../components/cards/QuizCard";
import { AIAssistantCard } from "../components/cards/AIAssistantCard";
import { InteractiveDiagramContainer } from "../components/math/InteractiveDiagramContainer";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Tabs } from "../components/ui/Tabs";
import { Accordion } from "../components/ui/Accordion";
import { Timeline } from "../components/ui/Timeline";
import { ProgressBar } from "../components/ui/ProgressBar";
import styles from "./ShowcasePage.module.css";

const demoQuizQuestions: QuizQuestion[] = [
  {
    question: "كم عدد وضعيات السمة (الثيم) المتوفرة في هذه المنصة؟",
    options: ["وضع واحد فقط", "وضعان: فاتح وداكن", "ثلاثة أوضاع"],
    correctIndex: 1,
  },
  {
    question: "ما اتجاه الواجهة الأساسي المعتمد في هذا التصميم؟",
    options: ["من اليسار لليمين (LTR)", "من اليمين لليسار (RTL)", "كلاهما بالتساوي"],
    correctIndex: 1,
  },
];

const faqItems = [
  {
    id: "faq-1",
    title: "ما هذه الصفحة؟",
    content: "هذه صفحة معاينة تعرض جميع مكوّنات النظام التصميمي للمنصة، دون أي محتوى تعليمي فعلي.",
  },
  {
    id: "faq-2",
    title: "هل يمكن التبديل بين السمة الفاتحة والداكنة؟",
    content: "نعم، استخدم مفتاح التبديل في أعلى الصفحة للتنقل بين الوضعين في أي وقت.",
  },
  {
    id: "faq-3",
    title: "هل التصميم متجاوب مع جميع الأجهزة؟",
    content: "نعم، تم بناء كل مكوّن باستخدام Grid وFlexbox بدون أي ارتفاعات أو مواضع ثابتة، ليتكيف مع أي مقاس شاشة.",
  },
];

const buildTimeline = [
  { id: "t1", title: "نظام التصميم", description: "الألوان، الطباعة، والتباعد", status: "done" as const },
  { id: "t2", title: "مكتبة المكوّنات", description: "البطاقات والعناصر التفاعلية", status: "done" as const },
  { id: "t3", title: "المحتوى التعليمي", description: "بانتظار الموافقة للبدء", status: "current" as const },
  { id: "t4", title: "الإطلاق", description: "نشر المنصة للطلاب", status: "upcoming" as const },
];

export function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { toggleTheme } = useTheme();

  const scrollToChapters = () => {
    document.getElementById("chapters")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div id="hero">
        <Hero
          eyebrow="معاينة النظام التصميمي — لا يحتوي على محتوى تعليمي"
          title="منصة العلوم التفاعلية"
          subtitle="بنية تصميم فاخرة بأسلوب الزجاج الشفاف، مصممة لتجربة قراءة مريحة وطويلة، ومهيأة بالكامل لدعم المحتوى العلمي والمعادلات التفاعلية لاحقًا."
          primaryAction={{ label: "استكشف المكوّنات", onClick: scrollToChapters }}
          secondaryAction={{ label: "تبديل السمة", onClick: toggleTheme }}
          stats={[
            { value: "٢٤+", label: "مكوّن جاهز" },
            { value: "٢", label: "وضع سمة" },
            { value: "٤", label: "نقاط استجابة" },
            { value: "AA", label: "توافق إتاحة" },
          ]}
        />
      </div>

      <Container>
        {/* CHAPTER CARDS */}
        <section id="chapters" className={styles.section}>
          <SectionHeader
            eyebrow="Chapter Card"
            description="بطاقات عرض تجريبية لهيكل الفصول — بيانات نموذجية فقط لاختبار المكوّن."
          />
          <div className="auto-grid">
            <ChapterCard index={1} title="الوحدة التجريبية الأولى" description="نص وصفي تجريبي لعرض شكل البطاقة وتخطيطها البصري." lessonCount={6} progress={70} />
            <ChapterCard index={2} title="الوحدة التجريبية الثانية" description="نص وصفي تجريبي آخر لاختبار التفاف النص داخل البطاقة." lessonCount={4} progress={30} />
            <ChapterCard index={3} title="الوحدة التجريبية الثالثة" description="مثال ثالث للتأكد من انتظام الشبكة عند تعدد البطاقات." lessonCount={8} progress={0} />
          </div>
        </section>

        <div className={styles.divider} />

        {/* LESSON CARDS */}
        <section id="lessons" className={styles.section}>
          <SectionHeader eyebrow="Lesson Card" description="عناصر قائمة الدروس بحالات مختلفة: مكتمل، فيديو، تفاعلي، اختبار." />
          <div className="stack">
            <LessonCard title="عنصر درس تجريبي — قراءة" duration="١٢ دقيقة" kind="reading" completed />
            <LessonCard title="عنصر درس تجريبي — فيديو" duration="٨ دقائق" kind="video" />
            <LessonCard title="عنصر درس تجريبي — تفاعلي" duration="١٥ دقيقة" kind="interactive" />
            <LessonCard title="عنصر درس تجريبي — اختبار" duration="٥ دقائق" kind="quiz" />
          </div>
        </section>

        <div className={styles.divider} />

        {/* CONTENT CARDS */}
        <section id="content-cards" className={styles.section}>
          <SectionHeader
            eyebrow="Content Cards"
            description="مثال، تمرين، حل، قانون، ملاحظة، وتنبيه — جاهزة لاستقبال أي محتوى مستقبلًا."
          />
          <div className="bento-grid">
            <div className="span-6">
              <ExampleCard title="عنوان مثال تجريبي">
                هذا نص عرض تجريبي داخل بطاقة المثال، لاختبار التباين والمسافات وسهولة القراءة.
              </ExampleCard>
            </div>
            <div className="span-6">
              <ExerciseCard number={1} title="عنوان تمرين تجريبي" difficulty="متوسط" onShowSolution={() => setModalOpen(true)}>
                نص تجريبي لعرض شكل بطاقة التمرين مع شارة المستوى وزر إظهار الحل.
              </ExerciseCard>
            </div>
            <div className="span-4">
              <FormulaCard label="معادلة تجريبية" formula="E = mc^2" caption="مثال لاختبار عرض KaTeX داخل البطاقة" />
            </div>
            <div className="span-4">
              <NoteCard title="ملاحظة تجريبية">نص قصير لاختبار بطاقة الملاحظات وتباينها اللوني.</NoteCard>
            </div>
            <div className="span-4">
              <WarningCard title="تنبيه تجريبي">نص قصير لاختبار بطاقة التنبيه ووضوح ألوانها التحذيرية.</WarningCard>
            </div>
            <div className="span-full">
              <SolutionCard>هذا نص الحل التجريبي الذي يظهر عند الضغط على البطاقة — لاختبار حركة الطي والفتح.</SolutionCard>
            </div>
          </div>
        </section>

        <div className={styles.divider} />

        {/* MEDIA */}
        <section id="media" className={styles.section}>
          <SectionHeader eyebrow="Video / Image Card" description="بطاقات وسائط بديلة (Placeholder) لاختبار النسب والتخطيط دون ملفات حقيقية." />
          <div className="auto-grid">
            <VideoCard title="عنوان فيديو تجريبي" duration="٦:٤٢" />
            <ImageCard alt="صورة توضيحية بديلة" caption="تسمية توضيحية تجريبية أسفل الصورة" />
          </div>
        </section>

        <div className={styles.divider} />

        {/* INTERACTIVE DIAGRAM */}
        <section id="diagram" className={styles.section}>
          <SectionHeader eyebrow="Interactive Diagram Container" description="حاوية جاهزة للرسوم البيانية التفاعلية أو SVG، بأدوات تكبير وتصغير وإعادة ضبط." />
          <InteractiveDiagramContainer title="رسم تخطيطي تجريبي">
            <svg width="220" height="180" viewBox="0 0 220 180" className={styles.diagramShape}>
              <circle cx="110" cy="90" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
              <polygon points="110,30 170,140 50,140" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="110" y1="10" x2="110" y2="170" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </InteractiveDiagramContainer>
        </section>

        <div className={styles.divider} />

        {/* QUIZ */}
        <section id="quiz" className={styles.section}>
          <SectionHeader eyebrow="Quiz Card" description="اختبار تفاعلي تجريبي بأسئلة عن المنصة نفسها، لاختبار التنقل والتقدّم." />
          <div style={{ maxWidth: "36rem" }}>
            <QuizCard title="اختبار تجريبي عن المنصة" questions={demoQuizQuestions} />
          </div>
        </section>

        <div className={styles.divider} />

        {/* AI ASSISTANT */}
        <section id="assistant" className={styles.section}>
          <SectionHeader eyebrow="AI Assistant Card" description="واجهة محادثة تجريبية للمساعد الذكي، جاهزة للربط بمصدر إجابات لاحقًا." />
          <div style={{ maxWidth: "28rem" }}>
            <AIAssistantCard />
          </div>
        </section>

        <div className={styles.divider} />

        {/* INTERACTION ELEMENTS */}
        <section id="interaction" className={styles.section}>
          <SectionHeader eyebrow="Buttons · Tabs · Accordion · Timeline · Modal · Progress" description="بقية عناصر التفاعل الأساسية في مكتبة المكوّنات." />

          <div className="stack stack--xl">
            <div className={styles.buttonGroup}>
              <span className={styles.groupLabel}>الأزرار</span>
              <div className={styles.buttonRow}>
                <Button variant="primary">أساسي</Button>
                <Button variant="secondary">ثانوي</Button>
                <Button variant="outline">محدد</Button>
                <Button variant="ghost">شفاف</Button>
                <Button variant="danger">تحذيري</Button>
                <Button variant="primary" onClick={() => setModalOpen(true)}>
                  فتح نافذة منبثقة
                </Button>
              </div>
            </div>

            <Tabs
              tabs={[
                { id: "tab-1", label: "علامة تبويب ١", content: <p className="text-body">محتوى تجريبي لعلامة التبويب الأولى.</p> },
                { id: "tab-2", label: "علامة تبويب ٢", content: <p className="text-body">محتوى تجريبي لعلامة التبويب الثانية.</p> },
                { id: "tab-3", label: "علامة تبويب ٣", content: <p className="text-body">محتوى تجريبي لعلامة التبويب الثالثة.</p> },
              ]}
            />

            <Accordion items={faqItems} />

            <Timeline steps={buildTimeline} />

            <div className={styles.progressStack}>
              <ProgressBar value={80} label="تقدّم — لون بنفسجي" tone="indigo" />
              <ProgressBar value={55} label="تقدّم — لون كهرماني" tone="amber" />
              <ProgressBar value={40} label="تقدّم — لون فيروزي" tone="teal" />
              <ProgressBar value={95} label="تقدّم — لون نجاح" tone="success" />
            </div>
          </div>
        </section>
      </Container>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="نافذة منبثقة تجريبية">
        <p>هذا نص تجريبي داخل النافذة المنبثقة، لاختبار التركيز، الإغلاق بمفتاح Esc، والانتقال الحركي.</p>
      </Modal>
    </>
  );
}

function SectionHeader({ eyebrow, description }: { eyebrow: string; description: string }) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionEyebrow}>{eyebrow}</span>
      <p className={`text-body-lg ${styles.sectionDescription}`}>{description}</p>
    </div>
  );
}
