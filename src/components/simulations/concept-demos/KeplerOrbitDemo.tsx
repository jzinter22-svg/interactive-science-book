import { useCallback, useRef, useState } from "react";
import { DiagramDefs, VectorLabel } from "../../diagrams/shared";
import { useRafLoop } from "../hooks";
import { SimSlider } from "../SimSlider";
import { ConceptDemoShell } from "./ConceptDemoShell";
import { ellipseCenter, semiMinor, positionAt, angularRate, type OrbitParams } from "./orbitMath";

const FOCUS = { x: 110, y: 130 };
const SEMI_MAJOR = 90;
const BASE_RATE = 0.55;

/**
 * Replaces the static Kepler's-first-law figure. An eccentricity
 * slider reshapes a true, focus-based ellipse live — the occupied
 * focus (مركز الجذب) stays fixed on screen
 * while the far side stretches out, which is the point: the
 * gravitating body sits at a focus, never at the geometric center. The
 * orbiting body auto-orbits at the exact Kepler-accurate rate (faster
 * near the focus, slower far from it) and can also be dragged directly.
 */
export function KeplerOrbitDemo() {
  const [eccentricity, setEccentricity] = useState(0.5);
  const [nu, setNu] = useState(Math.PI * 0.75);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);

  const params: OrbitParams = { focusX: FOCUS.x, focusY: FOCUS.y, semiMajor: SEMI_MAJOR, eccentricity };

  useRafLoop((dt) => {
    if (draggingRef.current) return;
    setNu((n) => n + angularRate(params, n, BASE_RATE) * dt);
  }, running && inView);

  const reset = useCallback(() => {
    setEccentricity(0.5);
    setNu(Math.PI * 0.75);
    setRunning(true);
  }, []);

  const angleFromPointer = (clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = ((clientX - rect.left) / rect.width) * 320;
    const y = ((clientY - rect.top) / rect.height) * 260;
    return Math.atan2(y - FOCUS.y, x - FOCUS.x);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    const next = angleFromPointer(e.clientX, e.clientY);
    if (next !== null) setNu(next);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const next = angleFromPointer(e.clientX, e.clientY);
    if (next !== null) setNu(next);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const center = ellipseCenter(params);
  const b = semiMinor(params);
  const c = SEMI_MAJOR * eccentricity;
  const otherFocus = { x: FOCUS.x + 2 * c, y: FOCUS.y };

  const P = positionAt(params, nu);
  const eps = 0.01;
  const pNext = positionAt(params, nu + eps);
  const pPrev = positionAt(params, nu - eps);
  const tLen = Math.hypot(pNext.x - pPrev.x, pNext.y - pPrev.y) || 1;
  const tangent = { x: (pNext.x - pPrev.x) / tLen, y: (pNext.y - pPrev.y) / tLen };
  const vEnd = { x: P.x + tangent.x * 34, y: P.y + tangent.y * 34 };

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: الشكل البيضوي وموقع مركز الجذب"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      hint="غيّر الاختلاف المركزي e ولاحظ أن مركز الجذب يبقى ثابتاً في مكانه بينما يتمدد المسار بعيداً عنه — ولاحظ أيضاً أن الجسم يتحرك أسرع عندما يقترب من مركز الجذب."
      sliders={<SimSlider label="الاختلاف المركزي e" value={eccentricity} min={0} max={0.75} step={0.05} precision={2} onChange={setEccentricity} />}
      canvas={
        <svg
          ref={svgRef}
          width="320"
          height="260"
          viewBox="0 0 320 260"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{ touchAction: "none" }}
        >
          <title>غيّر الاختلاف المركزي للمسار البيضوي واسحب الجسم لترى تغيّر سرعته حسب بعده عن مركز الجذب</title>
          <DiagramDefs />

          <ellipse cx={center.x} cy={center.y} rx={SEMI_MAJOR} ry={b} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.6" opacity="0.7" />

          <circle cx={FOCUS.x} cy={FOCUS.y} r="8" fill="var(--accent-secondary)" />
          <VectorLabel x={FOCUS.x} y={FOCUS.y - 15} color="var(--accent-secondary)">مركز الجذب</VectorLabel>

          <circle cx={otherFocus.x} cy={otherFocus.y} r="3" fill="var(--text-secondary)" opacity="0.7" />

          <line x1={P.x} y1={P.y} x2={vEnd.x} y2={vEnd.y} stroke="var(--accent-primary)" strokeWidth="2.2" markerEnd="url(#arrow-primary)" />
          <VectorLabel x={vEnd.x + 12} y={vEnd.y} color="var(--accent-primary)">v</VectorLabel>

          <circle
            cx={P.x}
            cy={P.y}
            r="8"
            fill="var(--accent-tertiary)"
            stroke="var(--bg-surface)"
            strokeWidth="1.6"
            style={{ cursor: "grab" }}
            onPointerDown={onPointerDown}
          />
        </svg>
      }
    />
  );
}
