import { DiagramDefs, VectorLabel } from "./shared";

/**
 * التعجيل المركزي — a body at point P moving on a circular path: its
 * velocity v is always tangent to the path, while its acceleration a_c
 * (caused by the continuously changing direction of v) points radially
 * inward, toward the center O. Illustrates the definition given in 1-2-1.
 */
export function Figure1_1() {
  const O = { x: 150, y: 140 };
  const r = 90;
  const P = { x: 218.9, y: 82.1 };
  const vEnd = { x: 254.3, y: 124.2 };
  const aEnd = { x: 172.9, y: 120.7 };

  return (
    <svg width="300" height="260" viewBox="0 0 300 260" aria-labelledby="fig11-title">
      <title id="fig11-title">شكل يوضّح متجه السرعة المماسية ومتجه التعجيل المركزي لجسم يتحرك حركة دائرية</title>
      <DiagramDefs />

      {/* circular path */}
      <circle cx={O.x} cy={O.y} r={r} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.6" strokeDasharray="4 4" opacity="0.6" />

      {/* radius O→P */}
      <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="var(--text-tertiary)" strokeWidth="1.4" markerEnd="url(#arrow-neutral)" />
      <VectorLabel x={(O.x + P.x) / 2 + 14} y={(O.y + P.y) / 2 - 4} color="var(--text-tertiary)">
        r
      </VectorLabel>

      {/* center O */}
      <circle cx={O.x} cy={O.y} r="3.2" fill="var(--text-secondary)" />
      <VectorLabel x={O.x - 14} y={O.y + 5} color="var(--text-secondary)">
        O
      </VectorLabel>

      {/* point P */}
      <circle cx={P.x} cy={P.y} r="3.6" fill="var(--text-primary)" />
      <VectorLabel x={P.x + 10} y={P.y - 8}>P</VectorLabel>

      {/* velocity vector (tangent) */}
      <line x1={P.x} y1={P.y} x2={vEnd.x} y2={vEnd.y} stroke="var(--accent-secondary)" strokeWidth="2.4" markerEnd="url(#arrow-secondary)" />
      <VectorLabel x={vEnd.x + 14} y={vEnd.y + 4} color="var(--accent-secondary)">
        v
      </VectorLabel>

      {/* centripetal acceleration vector (points to center) */}
      <line x1={P.x} y1={P.y} x2={aEnd.x} y2={aEnd.y} stroke="var(--accent-primary)" strokeWidth="2.6" markerEnd="url(#arrow-primary)" />
      <VectorLabel x={(P.x + aEnd.x) / 2 + 4} y={(P.y + aEnd.y) / 2 - 12} color="var(--accent-primary)">
        aᴄ
      </VectorLabel>
    </svg>
  );
}
