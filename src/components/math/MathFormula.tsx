import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathFormulaProps {
  expression: string;
  display?: boolean;
  className?: string;
}

export function MathFormula({ expression, display = false, className }: MathFormulaProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(expression, ref.current, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      });
    } catch {
      if (ref.current) ref.current.textContent = expression;
    }
  }, [expression, display]);

  return <span ref={ref} className={className} aria-label={expression} />;
}
