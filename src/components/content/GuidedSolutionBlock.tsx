import shared from "../cards/shared.module.css";
import { MathFormula } from "../math/MathFormula";
import type { GivenQuantity, UnitConversionStep } from "../../content/types";
import styles from "./GuidedSolutionBlock.module.css";

interface GuidedSolutionBlockProps {
  title: string;
  restatement: string;
  givens: GivenQuantity[];
  required: string;
  equation: { latex: string; reasoning: string };
  conversions?: UnitConversionStep[];
  steps: string[];
  finalAnswer: string;
  commonMistake: string;
}

/**
 * A worked example for a student with zero prior knowledge: restate,
 * list givens, name what's required, justify the equation, explain
 * every unit conversion before it happens, one operation per line, a
 * highlighted final answer, and a common-mistake warning. See
 * src/content/types.ts (GuidedSolutionBlockData) for the contract.
 */
export function GuidedSolutionBlock({
  title,
  restatement,
  givens,
  required,
  equation,
  conversions,
  steps,
  finalAnswer,
  commonMistake,
}: GuidedSolutionBlockProps) {
  return (
    <article className={`glass-surface-strong ${styles.card}`}>
      <div>
        <span className={`${shared.badge} ${shared.badgeTeal}`}>مثال محلول خطوة بخطوة</span>
        <h4 className={styles.title}>{title}</h4>
      </div>

      <Section number={1} heading="إعادة صياغة السؤال ببساطة">
        <p className={styles.body}>{restatement}</p>
      </Section>

      <Section number={2} heading="المعطيات">
        <div className={styles.givensList}>
          {givens.map((g) => (
            <div className={styles.givenItem} key={g.label}>
              <span className={styles.givenLabel}>{g.label} =</span>
              <span className={styles.givenValue}>{g.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section number={3} heading="المطلوب">
        <p className={styles.body}>{required}</p>
      </Section>

      <Section number={4} heading="القانون المستخدم ولماذا">
        <div className={styles.equationBox}>
          <MathFormula expression={equation.latex} display className={styles.equationFormula} />
        </div>
        <p className={styles.body}>{equation.reasoning}</p>
      </Section>

      {conversions && conversions.length > 0 && (
        <Section number={5} heading="تحويل الوحدات">
          <div className={styles.conversionsList}>
            {conversions.map((c, i) => (
              <div className={styles.conversionItem} key={i}>
                <p className={styles.body}>{c.explanation}</p>
                <p className={styles.conversionResult}>{c.result}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section number={conversions?.length ? 6 : 5} heading="خطوات الحل (خطوة واحدة في كل مرة)">
        <ol className={styles.stepsList}>
          {steps.map((step, i) => (
            <li className={styles.step} key={i}>
              <span className={styles.stepNumber} aria-hidden="true">
                {i + 1}
              </span>
              <p className={styles.stepText}>{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <div className={styles.answerBox}>
        <span className={`${shared.badge} ${shared.badgeSuccess}`}>الإجابة النهائية</span>
        <p className={styles.answerText}>{finalAnswer}</p>
      </div>

      <div className={styles.mistakeBox}>
        <span className={styles.mistakeIcon} aria-hidden="true">
          <WarningIcon />
        </span>
        <div>
          <p className={`${shared.badge} ${shared.badgeDanger}`}>خطأ شائع</p>
          <p className={styles.mistakeText}>{commonMistake}</p>
        </div>
      </div>
    </article>
  );
}

function Section({ number, heading, children }: { number: number; heading: string; children: React.ReactNode }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeading}>
        <span className={styles.sectionNumber} aria-hidden="true">
          {number}
        </span>
        {heading}
      </div>
      {children}
    </div>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M12 3.5 21 19.5H3L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 10v4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.9" r="1" fill="currentColor" />
    </svg>
  );
}
