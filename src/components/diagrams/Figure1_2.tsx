import { DiagramDefs, VectorLabel } from "./shared";

/**
 * محصلة التعجيل — when the speed itself is also changing, the total
 * acceleration is the vector sum of the centripetal component a_c
 * (toward the center) and the tangential component a_t (along the
 * path). Dashed lines show the parallelogram construction of the
 * resultant a. Illustrates 1-2-2.
 */
export function Figure1_2() {
  const P = { x: 218.9, y: 82.1 };
  const aC = { x: 172.94, y: 120.68 };
  const aT = { x: 244.62, y: 112.74 };
  const aR = { x: 198.66, y: 151.32 };

  return (
    <svg width="300" height="260" viewBox="0 0 300 260" aria-labelledby="fig12-title">
      <title id="fig12-title">شكل يوضّح جمع متجه التعجيل المركزي ومتجه التعجيل المماسي للحصول على محصلة التعجيل</title>
      <DiagramDefs />

      {/* parallelogram construction (dashed) */}
      <line x1={aC.x} y1={aC.y} x2={aR.x} y2={aR.y} stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1={aT.x} y1={aT.y} x2={aR.x} y2={aR.y} stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="3 3" />

      {/* point P */}
      <circle cx={P.x} cy={P.y} r="3.6" fill="var(--text-primary)" />
      <VectorLabel x={P.x + 10} y={P.y - 8}>P</VectorLabel>

      {/* a_c */}
      <line x1={P.x} y1={P.y} x2={aC.x} y2={aC.y} stroke="var(--accent-primary)" strokeWidth="2.4" markerEnd="url(#arrow-primary)" />
      <VectorLabel x={aC.x - 18} y={aC.y - 4} color="var(--accent-primary)">
        aᴄ
      </VectorLabel>

      {/* a_t */}
      <line x1={P.x} y1={P.y} x2={aT.x} y2={aT.y} stroke="var(--accent-secondary)" strokeWidth="2.4" markerEnd="url(#arrow-secondary)" />
      <VectorLabel x={aT.x + 16} y={aT.y - 2} color="var(--accent-secondary)">
        aᵀ
      </VectorLabel>

      {/* resultant a */}
      <line x1={P.x} y1={P.y} x2={aR.x} y2={aR.y} stroke="var(--accent-quaternary)" strokeWidth="2.8" markerEnd="url(#arrow-quaternary)" />
      <VectorLabel x={aR.x - 8} y={aR.y + 18} color="var(--accent-quaternary)">
        a
      </VectorLabel>
    </svg>
  );
}
