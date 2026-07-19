import { useState } from "react";
import { Button } from "../ui/Button";
import styles from "./AIAssistantCard.module.css";

interface Message {
  role: "assistant" | "user";
  text: string;
}

const initialMessages: Message[] = [
  { role: "assistant", text: "أهلًا! أنا مساعدك الذكي، اسألني عن أي فكرة لم تتضح لك في الدرس." },
];

const suggestions = ["اشرح هذا المفهوم بطريقة أبسط", "أعطني مثالاً إضافياً", "اختبرني في هذا الموضوع"];

export function AIAssistantCard() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "assistant", text: "هذا عرض تجريبي لواجهة المساعد — سيتم ربطه بمصدر إجابات لاحقًا." },
    ]);
    setDraft("");
  };

  return (
    <section className={`glass-surface-strong ${styles.card}`}>
      <header className={styles.header}>
        <span className={styles.avatar} aria-hidden="true">
          <SparkleIcon />
        </span>
        <div>
          <h3 className={styles.title}>المساعد الذكي</h3>
          <p className={styles.subtitle}>متاح للمساعدة على مدار الساعة</p>
        </div>
      </header>

      <div className={styles.messages} role="log" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={styles.messageRow} data-role={m.role}>
            <p className={styles.bubble} data-role={m.role}>
              {m.text}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.suggestions}>
        {suggestions.map((s) => (
          <button key={s} type="button" className={styles.suggestion} onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>

      <form
        className={styles.composer}
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <input
          className={styles.input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="اكتب سؤالك هنا..."
          aria-label="اكتب سؤالك للمساعد الذكي"
        />
        <Button type="submit" size="sm">
          إرسال
        </Button>
      </form>
    </section>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 2.5 13.6 8.4 19.5 10 13.6 11.6 12 17.5 10.4 11.6 4.5 10 10.4 8.4 12 2.5Z" />
    </svg>
  );
}
