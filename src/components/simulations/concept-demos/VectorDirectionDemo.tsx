import { useCallback, useRef, useState } from "react";
import { DiagramDefs, VectorLabel } from "../../diagrams/shared";
import { useRafLoop } from "../hooks";
import { ConceptDemoShell } from "./ConceptDemoShell";

const O = { x: 150, y: 130 };
const R = 90;
const OMEGA = 0.7; // rad/s, gentle default auto-orbit

/**
 * Replaces the static Figure 1-1. The body auto-orbits, or the student
 * can drag it anywhere on the circle directly — either way, v stays
 * tangent to the path and aᴄ keeps pointing at the center O no matter
 * where the body is, which is the entire point of the figure.
 */
export function VectorDirectionDemo() {
  const [theta, setTheta] = useState(-Math.PI / 4);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);

  useRafLoop((dt) => {
    if (draggingRef.current) return;
    setTheta((t) => t + OMEGA * dt);
  }, running && inView);

  const reset = useCallback(() => {
    setTheta(-Math.PI / 4);
    setRunning(true);
  }, []);

  const angleFromPointer = (clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = ((clientX - rect.left) / rect.width) * 300;
    const y = ((clientY - rect.top) / rect.height) * 260;
    return Math.atan2(y - O.y, x - O.x);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    const next = angleFromPointer(e.clientX, e.clientY);
    if (next !== null) setTheta(next);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const next = angleFromPointer(e.clientX, e.clientY);
    if (next !== null) setTheta(next);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const P = { x: O.x + R * Math.cos(theta), y: O.y + R * Math.sin(theta) };
  const tangent = { x: -Math.sin(theta), y: Math.cos(theta) };
  const vEnd = { x: P.x + tangent.x * 55, y: P.y + tangent.y * 55 };
  const radial = { x: (O.x - P.x) / R, y: (O.y - P.y) / R };
  const aEnd = { x: P.x + radial.x * 60, y: P.y + radial.y * 60 };

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: اتجاها v وaᴄ"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      hint="اسحب الجسم إلى أي موضع على الدائرة — ستلاحظ أن v تبقى مماسّة للمسار وaᴄ يبقى متجهاً نحو O دائماً."
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
          <title>اسحب الجسم حول الدائرة لترى أن السرعة تبقى مماسّة والتعجيل المركزي يبقى متجهاً نحو المركز</title>
          <DiagramDefs />
          <circle cx={O.x} cy={O.y} r={R} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.6" strokeDasharray="4 4" opacity="0.6" />
          <circle cx={O.x} cy={O.y} r="3.2" fill="var(--text-secondary)" />
          <VectorLabel x={O.x - 14} y={O.y + 5} color="var(--text-secondary)">O</VectorLabel>

          <line x1={P.x} y1={P.y} x2={vEnd.x} y2={vEnd.y} stroke="var(--accent-secondary)" strokeWidth="2.4" markerEnd="url(#arrow-secondary)" />
          <VectorLabel x={vEnd.x + 14} y={vEnd.y + 4} color="var(--accent-secondary)">v</VectorLabel>

          <line x1={P.x} y1={P.y} x2={aEnd.x} y2={aEnd.y} stroke="var(--accent-primary)" strokeWidth="2.6" markerEnd="url(#arrow-primary)" />
          <VectorLabel x={(P.x + aEnd.x) / 2 + 4} y={(P.y + aEnd.y) / 2 - 12} color="var(--accent-primary)">aᴄ</VectorLabel>

          <circle cx={P.x} cy={P.y} r="9" fill="var(--accent-tertiary)" stroke="var(--bg-surface)" strokeWidth="2" style={{ cursor: "grab" }} onPointerDown={onPointerDown} />
        </svg>
      }
    />
  );
}
