// Placeholder demo data — for foundation/layout review only.
// No real educational content. All titles and text are generic samples.

export type LessonKind = "reading" | "video" | "interactive" | "quiz";

export interface DemoLesson {
  id: string;
  title: string;
  duration: string;
  kind: LessonKind;
  completed?: boolean;
}

export interface DemoChapter {
  id: string;
  index: number;
  title: string;
  description: string;
  progress: number;
  lessons: DemoLesson[];
}

export const demoChapters: DemoChapter[] = [
  {
    id: "c1",
    index: 1,
    title: "الوحدة التجريبية الأولى",
    description: "نص وصفي تجريبي لعرض شكل البطاقة وتخطيطها البصري.",
    progress: 70,
    lessons: [
      { id: "c1-l1", title: "عنصر درس تجريبي — مقدمة", duration: "١٢ دقيقة", kind: "reading", completed: true },
      { id: "c1-l2", title: "عنصر درس تجريبي — فيديو توضيحي", duration: "٨ دقائق", kind: "video", completed: true },
      { id: "c1-l3", title: "عنصر درس تجريبي — نشاط تفاعلي", duration: "١٥ دقيقة", kind: "interactive" },
      { id: "c1-l4", title: "عنصر درس تجريبي — تحقق من الفهم", duration: "٥ دقائق", kind: "quiz" },
    ],
  },
  {
    id: "c2",
    index: 2,
    title: "الوحدة التجريبية الثانية",
    description: "نص وصفي تجريبي آخر لاختبار التفاف النص داخل البطاقة.",
    progress: 30,
    lessons: [
      { id: "c2-l1", title: "عنصر درس تجريبي — مقدمة", duration: "١٠ دقائق", kind: "reading", completed: true },
      { id: "c2-l2", title: "عنصر درس تجريبي — أمثلة إضافية", duration: "١٤ دقيقة", kind: "reading" },
      { id: "c2-l3", title: "عنصر درس تجريبي — نشاط تفاعلي", duration: "١٢ دقيقة", kind: "interactive" },
    ],
  },
  {
    id: "c3",
    index: 3,
    title: "الوحدة التجريبية الثالثة",
    description: "مثال ثالث للتأكد من انتظام الشبكة عند تعدد البطاقات.",
    progress: 0,
    lessons: [
      { id: "c3-l1", title: "عنصر درس تجريبي — مقدمة", duration: "٩ دقائق", kind: "reading" },
      { id: "c3-l2", title: "عنصر درس تجريبي — فيديو توضيحي", duration: "٧ دقائق", kind: "video" },
    ],
  },
];

export function findChapter(chapterId: string | undefined): DemoChapter {
  return demoChapters.find((c) => c.id === chapterId) ?? demoChapters[0];
}

export function findLesson(lessonId: string | undefined): { chapter: DemoChapter; lesson: DemoLesson; index: number } {
  for (const chapter of demoChapters) {
    const index = chapter.lessons.findIndex((l) => l.id === lessonId);
    if (index !== -1) return { chapter, lesson: chapter.lessons[index], index };
  }
  return { chapter: demoChapters[0], lesson: demoChapters[0].lessons[0], index: 0 };
}

export function sidebarSectionsFromChapters() {
  return demoChapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    items: chapter.lessons.map((lesson) => ({
      id: lesson.id,
      label: lesson.title,
      href: `/lesson/${lesson.id}`,
    })),
  }));
}
