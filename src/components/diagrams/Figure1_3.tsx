import { DiagramDefs, VectorLabel } from "./shared";

/**
 * القوة المركزية — a ball whirled on a string in a horizontal circle:
 * the string provides the centripetal force F_c, directed along the
 * string from the ball toward the center O, keeping the ball on its
 * circular path while v stays tangent to it. Illustrates 1-3.
 */
export function Figure1_3() {
  const O = { x: 150, y: 140 };
  const r = 90;
  const P = { x: 218.9, y: 82.1 };
  const vEnd = { x: 254.3, y: 124.2 };
  const fEnd = { x: 172.9, y: 120.7 };

  return (
    <svg width="300" height="260" viewBox="0 0 300 260" aria-labelledby="fig13-title">
      <title id="fig13-title">شكل يوضّح كرة مربوطة بخيط تدور في مسار دائري، وقوة الجذب المركزية الواقعة عليها باتجاه المركز</title>
      <DiagramDefs />

      {/* circular path */}
      <circle cx={O.x} cy={O.y} r={r} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.6" strokeDasharray="4 4" opacity="0.5" />

      {/* the string, O to P */}
      <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="var(--text-secondary)" strokeWidth="1.8" />

      {/* pivot / hand at center */}
      <circle cx={O.x} cy={O.y} r="4" fill="var(--text-secondary)" />
      <VectorLabel x={O.x - 16} y={O.y + 5} color="var(--text-secondary)">
        O
      </VectorLabel>

      {/* the ball at P */}
      <circle cx={P.x} cy={P.y} r="7" fill="var(--accent-tertiary)" stroke="var(--bg-surface)" strokeWidth="1.5" />
      <VectorLabel x={P.x + 14} y={P.y - 10}>m</VectorLabel>

      {/* velocity vector (tangent) */}
      <line x1={P.x} y1={P.y} x2={vEnd.x} y2={vEnd.y} stroke="var(--accent-secondary)" strokeWidth="2.4" markerEnd="url(#arrow-secondary)" />
      <VectorLabel x={vEnd.x + 14} y={vEnd.y + 4} color="var(--accent-secondary)">
        v
      </VectorLabel>

      {/* centripetal force along the string */}
      <line x1={P.x} y1={P.y} x2={fEnd.x} y2={fEnd.y} stroke="var(--accent-primary)" strokeWidth="2.8" markerEnd="url(#arrow-primary)" />
      <VectorLabel x={(P.x + fEnd.x) / 2 + 6} y={(P.y + fEnd.y) / 2 - 14} color="var(--accent-primary)">
        Fᴄ
      </VectorLabel>
    </svg>
  );
}
