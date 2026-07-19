// ============================================================
// SAMPLE / PLACEHOLDER CONTENT
//
// This is NOT Chapter One. It exists only to exercise every block
// type the content engine supports, so the rendering layer can be
// verified before any real physics content is imported. All copy
// here is generic filler, clearly labeled "تجريبي" (sample/demo).
// ============================================================

import type { Chapter } from "../types";

const engineDemoLessonBlocks: Chapter["lessons"][number]["blocks"] = [
  {
    id: "c1-l3-concept",
    type: "concept",
    title: "مفهوم تجريبي",
    body: "هذا نص شرح تجريبي لمفهوم عام، يوضّح كيف تُعرض الفقرات التوضيحية الطويلة نسبيًا داخل محرك المحتوى دون أي مشاكل في التخطيط.",
  },
  {
    id: "c1-l3-definition",
    type: "definition",
    term: "مصطلح تجريبي",
    definition: "تعريف تجريبي قصير ودقيق للمصطلح، بأسلوب أقرب لقاموس المصطلحات العلمية.",
  },
  {
    id: "c1-l3-formula",
    type: "formula",
    label: "معادلة تجريبية",
    latex: "E = mc^2",
    caption: "مثال لاختبار عرض KaTeX داخل محرك المحتوى",
  },
  {
    id: "c1-l3-example",
    type: "example",
    title: "مثال تجريبي محلول",
    body: "نص عرض تجريبي لمثال محلول، لاختبار طريقة عرض بطاقة المثال ضمن تسلسل الدرس الكامل.",
  },
  {
    id: "c1-l3-stepsolution",
    type: "stepSolution",
    steps: [
      "الخطوة الأولى: تحديد المعطيات المتوفرة في المسألة التجريبية.",
      "الخطوة الثانية: اختيار القانون المناسب وتطبيقه على المعطيات.",
      "الخطوة الثالثة: تبسيط الناتج والتحقق من وحدات القياس.",
    ],
    finalAnswer: "الناتج التجريبي = 42 وحدة",
  },
  {
    id: "c1-l3-exercise",
    type: "exercise",
    title: "تمرين تجريبي",
    difficulty: "متوسط",
    body: "نص تجريبي لعرض شكل بطاقة التمرين مع شارة المستوى وزر إظهار الحل التدريجي.",
    solution: {
      steps: ["نحدد المعطيات أولًا.", "نطبّق القانون المناسب.", "نحسب الناتج النهائي."],
      finalAnswer: "42 وحدة",
    },
  },
  {
    id: "c1-l3-mcq",
    type: "mcq",
    question: "أي خيار يمثل الإجابة الصحيحة في هذا السؤال التجريبي؟",
    options: ["الخيار الأول", "الخيار الثاني", "الخيار الثالث"],
    correctIndex: 1,
    explanation: "الخيار الثاني هو الصحيح لأنه يطابق الشرط التجريبي المطروح في السؤال.",
  },
  {
    id: "c1-l3-truefalse",
    type: "trueFalse",
    statement: "هذه العبارة التجريبية صحيحة دائمًا في جميع الحالات.",
    correctAnswer: false,
    explanation: "العبارة خاطئة لأنها تعميم غير دقيق — هذا نص تجريبي لاختبار حالة الشرح بعد الإجابة.",
  },
  {
    id: "c1-l3-fillblank",
    type: "fillBlank",
    template: "الوحدة الأساسية لقياس ___ في هذا المثال التجريبي هي ___.",
    answers: ["الكمية", "الوحدة"],
  },
  {
    id: "c1-l3-diagram",
    type: "diagram",
    title: "رسم تخطيطي تجريبي",
    shapes: [
      { kind: "circle", cx: 110, cy: 90, r: 70 },
      { kind: "polygon", points: "110,30 170,140 50,140" },
      { kind: "line", x1: 110, y1: 10, x2: 110, y2: 170, dashed: true },
    ],
  },
  {
    id: "c1-l3-image",
    type: "image",
    alt: "صورة توضيحية بديلة",
    caption: "تسمية توضيحية تجريبية أسفل الصورة",
  },
  {
    id: "c1-l3-video",
    type: "video",
    title: "عنوان فيديو تجريبي",
    duration: "٦:٤٢",
  },
  {
    id: "c1-l3-animation",
    type: "animation",
    title: "رسوم متحركة تجريبية",
    description: "وصف تجريبي قصير لما ستوضحه الرسوم المتحركة عند إضافتها لاحقًا.",
  },
  {
    id: "c1-l3-simulation",
    type: "simulation",
    title: "محاكاة تجريبية",
    description: "وصف تجريبي قصير للمحاكاة التفاعلية المرتقبة لهذا الدرس.",
  },
  {
    id: "c1-l3-hint",
    type: "hint",
    body: "تلميح تجريبي قصير يساعد الطالب على التفكير في الاتجاه الصحيح دون كشف الحل مباشرة.",
  },
  {
    id: "c1-l3-note",
    type: "note",
    body: "نص قصير لاختبار بطاقة الملاحظات ضمن تدفق القراءة الطبيعي للدرس.",
  },
  {
    id: "c1-l3-warning",
    type: "warning",
    body: "نص قصير لاختبار بطاقة التنبيه ووضوح ألوانها التحذيرية ضمن سياق القراءة.",
  },
  {
    id: "c1-l3-teachertip",
    type: "teacherTip",
    body: "ملاحظة تجريبية موجهة للمعلم حول طريقة تقديم هذا الجزء من الدرس داخل الصف.",
  },
  {
    id: "c1-l3-aitutor",
    type: "aiTutor",
    greeting: "أهلًا! هذا عرض تجريبي للمساعد الذكي داخل محرك المحتوى.",
  },
  {
    id: "c1-l3-glossary",
    type: "glossary",
    terms: [
      { term: "مصطلح أول", definition: "تعريف تجريبي قصير للمصطلح الأول." },
      { term: "مصطلح ثانٍ", definition: "تعريف تجريبي قصير للمصطلح الثاني." },
    ],
  },
  {
    id: "c1-l3-summary",
    type: "summary",
    points: [
      "النقطة الأولى في ملخص الدرس التجريبي.",
      "النقطة الثانية في ملخص الدرس التجريبي.",
      "النقطة الثالثة في ملخص الدرس التجريبي.",
    ],
  },
  {
    id: "c1-l3-references",
    type: "references",
    items: [{ label: "مرجع تجريبي أول" }, { label: "مرجع تجريبي ثانٍ — رابط خارجي", url: "https://example.com" }],
  },
  {
    id: "c1-l3-section",
    type: "section",
    title: "قسم فرعي تجريبي",
    blocks: [
      {
        id: "c1-l3-section-note",
        type: "note",
        title: "ملاحظة داخل قسم",
        body: "يثبت هذا العنصر أن الأقسام الفرعية يمكن أن تحتوي على أي نوع آخر من عناصر المحتوى بشكل متداخل.",
      },
      {
        id: "c1-l3-section-mcq",
        type: "mcq",
        question: "سؤال تجريبي داخل قسم فرعي — هل تعمل الترقيم المحلي بشكل صحيح؟",
        options: ["نعم", "لا"],
        correctIndex: 0,
      },
    ],
  },
];

export const sampleChapters: Chapter[] = [
  {
    id: "c1",
    index: 1,
    title: "الوحدة التجريبية الأولى",
    description: "نص وصفي تجريبي لعرض شكل البطاقة وتخطيطها البصري.",
    progress: 70,
    lessons: [
      {
        id: "c1-l1",
        title: "عنصر درس تجريبي — مقدمة",
        duration: "١٢ دقيقة",
        kind: "reading",
        completed: true,
        blocks: [
          {
            id: "c1-l1-concept",
            type: "concept",
            title: "فكرة عامة تجريبية",
            body: "نص افتتاحي تجريبي لتقديم فكرة عامة في بداية الدرس، لاختبار تنسيق الفقرات وسهولة القراءة.",
          },
          {
            id: "c1-l1-definition",
            type: "definition",
            term: "مصطلح تمهيدي",
            definition: "تعريف تجريبي مختصر يمهّد للمصطلحات التي سترد لاحقًا في الدرس.",
          },
          {
            id: "c1-l1-note",
            type: "note",
            body: "ملاحظة تجريبية قصيرة ضمن الدرس التمهيدي.",
          },
        ],
      },
      {
        id: "c1-l2",
        title: "عنصر درس تجريبي — فيديو توضيحي",
        duration: "٨ دقائق",
        kind: "video",
        completed: true,
        blocks: [
          { id: "c1-l2-video", type: "video", title: "عنوان فيديو توضيحي تجريبي", duration: "٨:١٠" },
          {
            id: "c1-l2-note",
            type: "note",
            body: "نص تجريبي قصير يلخص أهم ما جاء في الفيديو أعلاه.",
          },
        ],
      },
      {
        id: "c1-l3",
        title: "عنصر درس تجريبي — نشاط تفاعلي",
        duration: "١٥ دقيقة",
        kind: "interactive",
        blocks: engineDemoLessonBlocks,
      },
      {
        id: "c1-l4",
        title: "عنصر درس تجريبي — تحقق من الفهم",
        duration: "٥ دقائق",
        kind: "quiz",
        blocks: [
          {
            id: "c1-l4-mcq",
            type: "mcq",
            question: "سؤال تجريبي أول للتحقق من الفهم.",
            options: ["إجابة أولى", "إجابة ثانية", "إجابة ثالثة"],
            correctIndex: 2,
          },
          {
            id: "c1-l4-truefalse",
            type: "trueFalse",
            statement: "عبارة تجريبية ثانية للتحقق من الفهم.",
            correctAnswer: true,
          },
          {
            id: "c1-l4-summary",
            type: "summary",
            title: "ملخص سريع",
            points: ["نقطة تجريبية أولى.", "نقطة تجريبية ثانية."],
          },
        ],
      },
    ],
  },
  {
    id: "c2",
    index: 2,
    title: "الوحدة التجريبية الثانية",
    description: "نص وصفي تجريبي آخر لاختبار التفاف النص داخل البطاقة.",
    progress: 30,
    lessons: [
      { id: "c2-l1", title: "عنصر درس تجريبي — مقدمة", duration: "١٠ دقائق", kind: "reading", completed: true, blocks: [] },
      { id: "c2-l2", title: "عنصر درس تجريبي — أمثلة إضافية", duration: "١٤ دقيقة", kind: "reading", blocks: [] },
      { id: "c2-l3", title: "عنصر درس تجريبي — نشاط تفاعلي", duration: "١٢ دقيقة", kind: "interactive", blocks: [] },
    ],
  },
  {
    id: "c3",
    index: 3,
    title: "الوحدة التجريبية الثالثة",
    description: "مثال ثالث للتأكد من انتظام الشبكة عند تعدد البطاقات.",
    progress: 0,
    lessons: [
      { id: "c3-l1", title: "عنصر درس تجريبي — مقدمة", duration: "٩ دقائق", kind: "reading", blocks: [] },
      { id: "c3-l2", title: "عنصر درس تجريبي — فيديو توضيحي", duration: "٧ دقائق", kind: "video", blocks: [] },
    ],
  },
];
