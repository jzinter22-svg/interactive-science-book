import { useCallback, useRef, useState } from "react";
import { VectorLabel } from "../../diagrams/shared";
import { useRafLoop } from "../hooks";
import { ConceptDemoShell } from "./ConceptDemoShell";

const S1 = { x: 90, y: 90 };
const S2 = { x: 90, y: 170 };
const WAVELENGTH_PX = 22;
const RING_COUNT = 9;
const MAX_R = 210;
const SPEED = 14; // px/s ring expansion speed

/**
 * Replaces the static Figure 2-2 (two speakers driven by one signal
 * generator). Two coherent point sources emit expanding circular
 * wavefronts spaced one wavelength apart — exactly the classic
 * ripple-tank picture the source text describes — and the overlapping
 * rings visibly cross into bright (constructive) and faint
 * (destructive) regions. Drag the listener dot anywhere to read the
 * actual path difference at that point and whether it lands on a loud
 * or quiet spot.
 */
export function TwoSourceInterferenceDemo() {
  const [t, setT] = useState(0);
  const [listener, setListener] = useState({ x: 210, y: 130 });
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);

  useRafLoop((dt) => setT((p) => (p + SPEED * dt) % WAVELENGTH_PX), running && inView);

  const reset = useCallback(() => {
    setT(0);
    setListener({ x: 210, y: 130 });
    setRunning(true);
  }, []);

  const d1 = Math.hypot(listener.x - S1.x, listener.y - S1.y);
  const d2 = Math.hypot(listener.x - S2.x, listener.y - S2.y);
  const pathDiffLambda = Math.abs(d1 - d2) / WAVELENGTH_PX;
  const frac = pathDiffLambda % 1;
  const isConstructive = frac < 0.12 || frac > 0.88;
  const isDestructive = frac > 0.38 && frac < 0.62;
  const state = isConstructive ? "بنّاء — صوت عالٍ" : isDestructive ? "اتلافي — صوت خافت" : "حالة بينية";

  const clampToField = (x: number, y: number) => ({
    x: Math.max(140, Math.min(295, x)),
    y: Math.max(10, Math.min(250, y)),
  });

  const pointerToLocal = (clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return { x: ((clientX - rect.left) / rect.width) * 300, y: ((clientY - rect.top) / rect.height) * 260 };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    const p = pointerToLocal(e.clientX, e.clientY);
    if (p) setListener(clampToField(p.x, p.y));
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const p = pointerToLocal(e.clientX, e.clientY);
    if (p) setListener(clampToField(p.x, p.y));
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const rings = Array.from({ length: RING_COUNT }, (_, k) => t + k * WAVELENGTH_PX).filter((r) => r <= MAX_R);

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: تداخل مصدرين متشاكهين"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      hint={`فرق المسار عند نقطة الاستماع ≈ ${pathDiffLambda.toFixed(2)}λ — الحالة: ${state}.`}
      canvas={
        <svg
          ref={svgRef}
          width="300"
          height="260"
          viewBox="0 0 300 260"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{ touchAction: "none" }}
        >
          <title>اسحب نقطة الاستماع لترى فرق المسار من المصدرين وهل هي نقطة تقوية أم إلغاء</title>
          <clipPath id="field-clip">
            <rect x="0" y="0" width="300" height="260" />
          </clipPath>
          <g clipPath="url(#field-clip)">
            {rings.map((r, i) => (
              <circle key={`s1-${i}`} cx={S1.x} cy={S1.y} r={r} fill="none" stroke="var(--accent-primary)" strokeWidth="1.3" opacity={0.55} />
            ))}
            {rings.map((r, i) => (
              <circle key={`s2-${i}`} cx={S2.x} cy={S2.y} r={r} fill="none" stroke="var(--accent-secondary)" strokeWidth="1.3" opacity={0.55} />
            ))}
          </g>

          <circle cx={S1.x} cy={S1.y} r="5" fill="var(--accent-primary)" />
          <VectorLabel x={S1.x - 18} y={S1.y + 4} color="var(--accent-primary)">S1</VectorLabel>
          <circle cx={S2.x} cy={S2.y} r="5" fill="var(--accent-secondary)" />
          <VectorLabel x={S2.x - 18} y={S2.y + 4} color="var(--accent-secondary)">S2</VectorLabel>

          <line x1={S1.x} y1={S1.y} x2={listener.x} y2={listener.y} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
          <line x1={S2.x} y1={S2.y} x2={listener.x} y2={listener.y} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />

          <circle
            cx={listener.x}
            cy={listener.y}
            r="8"
            fill={isConstructive ? "var(--status-success)" : isDestructive ? "var(--status-danger)" : "var(--accent-tertiary)"}
            stroke="var(--bg-surface)"
            strokeWidth="2"
            style={{ cursor: "grab" }}
            onPointerDown={onPointerDown}
          />
        </svg>
      }
    />
  );
}
