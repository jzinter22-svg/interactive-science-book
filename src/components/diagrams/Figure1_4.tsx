import { DiagramDefs, VectorLabel } from "./shared";

/**
 * قانون كبلر الأول (قانون المسارات) — الكواكب (أو الأقمار) تتحرك في
 * مسارات بيضوية (إهليلجية) يقع مركز الجذب (الشمس، أو الأرض بالنسبة
 * لقمر صناعي) عند إحدى بؤرتَي القطع الناقص، لا في مركزه.
 */
export function Figure1_4() {
  const cx = 150;
  const cy = 130;
  const rx = 110;
  const ry = 70;
  const c = Math.sqrt(rx * rx - ry * ry); // ≈ 84.85
  const f1 = { x: cx - c, y: cy };
  const f2 = { x: cx + c, y: cy };
  const P = { x: 234.3, y: 175 };
  const vEnd = { x: 198.4, y: 202.2 };

  return (
    <svg width="300" height="260" viewBox="0 0 300 260" aria-labelledby="fig14-title">
      <title id="fig14-title">شكل يوضّح مساراً إهليلجياً لكوكب أو قمر حول مركز جذب يقع عند إحدى بؤرتَي القطع الناقص</title>
      <DiagramDefs />

      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.8" />

      {/* focus 2: gravity center (sun) */}
      <circle cx={f2.x} cy={f2.y} r="9" fill="var(--accent-secondary)" />
      <VectorLabel x={f2.x} y={f2.y - 16} color="var(--accent-secondary)">
        بؤرة ٢ (مركز الجذب)
      </VectorLabel>

      {/* focus 1: empty focus */}
      <circle cx={f1.x} cy={f1.y} r="3.5" fill="var(--text-secondary)" />
      <VectorLabel x={f1.x} y={f1.y - 14} color="var(--text-secondary)">
        بؤرة ١
      </VectorLabel>

      {/* orbiting body */}
      <circle cx={P.x} cy={P.y} r="6" fill="var(--accent-tertiary)" stroke="var(--bg-surface)" strokeWidth="1.4" />
      <VectorLabel x={P.x + 16} y={P.y - 6}>P</VectorLabel>

      {/* velocity vector, tangent to the ellipse */}
      <line x1={P.x} y1={P.y} x2={vEnd.x} y2={vEnd.y} stroke="var(--accent-primary)" strokeWidth="2.4" markerEnd="url(#arrow-primary)" />
      <VectorLabel x={vEnd.x - 4} y={vEnd.y + 18} color="var(--accent-primary)">
        v
      </VectorLabel>
    </svg>
  );
}
