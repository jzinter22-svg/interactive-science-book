import { DiagramDefs, VectorLabel } from "./shared";

/**
 * قانون كبلر الثاني (قانون المساحات) — الخط الواصل بين مركز الجذب
 * والكوكب (أو القمر) يمسح مساحات متساوية في أزمان متساوية Δt. عند
 * الاقتراب من مركز الجذب يتحرك الجسم أسرع فيمسح قطاعاً أعرض في مسافة
 * أقصر، وعند الابتعاد يتحرك أبطأ فيمسح قطاعاً أضيق في مسافة أطول —
 * فتتساوى المساحتان A1 وA2.
 */
export function Figure1_5() {
  const cx = 150;
  const cy = 130;
  const rx = 110;
  const ry = 70;
  const F = { x: cx - Math.sqrt(rx * rx - ry * ry), y: cy }; // gravity focus (sun)

  // wide wedge near perihelion (left vertex) — short radius, wide angle
  const p1a = { x: 50.3, y: 159.6 };
  const p1b = { x: 50.3, y: 100.4 };
  // narrow wedge near aphelion (right vertex) — long radius, thin angle.
  // Both wedges are sized so their areas read as roughly equal, echoing
  // "A1 = A2" — the same fast-near / slow-far trade-off Kepler's second
  // law describes.
  const p2a = { x: 259.9, y: 132.2 };
  const p2b = { x: 259.9, y: 127.8 };

  return (
    <svg width="300" height="260" viewBox="0 0 300 260" aria-labelledby="fig15-title">
      <title id="fig15-title">شكل يوضّح تساوي المساحتين الممسوحتين في زمنين متساويين وفق قانون كبلر الثاني</title>
      <DiagramDefs />

      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.8" />

      {/* gravity center (sun) at focus */}
      <circle cx={F.x} cy={F.y} r="9" fill="var(--accent-secondary)" />
      <VectorLabel x={F.x} y={F.y - 16} color="var(--accent-secondary)">
        مركز الجذب
      </VectorLabel>

      {/* wide wedge — near, fast, short time-slice */}
      <path d={`M ${F.x} ${F.y} L ${p1a.x} ${p1a.y} L ${p1b.x} ${p1b.y} Z`} fill="var(--accent-primary-soft)" stroke="var(--accent-primary)" strokeWidth="1.2" />
      <VectorLabel x={46} y={185} color="var(--accent-primary)">
        A₁
      </VectorLabel>

      {/* narrow wedge — far, slow */}
      <path d={`M ${F.x} ${F.y} L ${p2a.x} ${p2a.y} L ${p2b.x} ${p2b.y} Z`} fill="var(--accent-tertiary-soft)" stroke="var(--accent-tertiary)" strokeWidth="1" />
      <VectorLabel x={272} y={122} color="var(--accent-tertiary)">
        A₂
      </VectorLabel>

      <VectorLabel x={22} y={162} color="var(--text-tertiary)">Δt</VectorLabel>
      <VectorLabel x={272} y={145} color="var(--text-tertiary)">Δt</VectorLabel>

      <VectorLabel x={150} y={244} color="var(--text-secondary)">A₁ = A₂</VectorLabel>
    </svg>
  );
}
