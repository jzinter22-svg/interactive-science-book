import { useCallback, useRef, useState } from "react";
import { DiagramDefs, VectorLabel } from "../../diagrams/shared";
import { useRafLoop } from "../hooks";
import { SimSlider } from "../SimSlider";
import { ConceptDemoShell } from "./ConceptDemoShell";

const O = { x: 150, y: 140 };
const THETA_A = -Math.PI / 2; // reference point A sits at the top, fixed
const OMEGA = 0.5; // rad/s, gentle default auto-sweep

/** Maps the physical radius (m, from the slider) to a legible on-screen radius. */
function pxRadius(rMeters: number) {
  return 40 + rMeters * 32;
}

/**
 * Replaces the static Figure 1-7. A body sweeps from fixed point A to a
 * draggable/auto-orbiting point B; the wedge angle θ and the arc length
 * S it carves out both stay on screen at once, with S = rθ recomputed
 * live — including when the radius slider changes, so the student sees
 * the same angle carve a longer arc on a bigger circle.
 */
export function AngularDisplacementDemo() {
  const [theta, setTheta] = useState(1.1);
  const [r, setR] = useState(1.2);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);

  useRafLoop((dt) => {
    if (draggingRef.current) return;
    setTheta((t) => (t + OMEGA * dt) % (2 * Math.PI));
  }, running && inView);

  const reset = useCallback(() => {
    setTheta(1.1);
    setR(1.2);
    setRunning(true);
  }, []);

  const R_PX = pxRadius(r);

  const angleFromPointer = (clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = ((clientX - rect.left) / rect.width) * 300;
    const y = ((clientY - rect.top) / rect.height) * 260;
    let next = Math.atan2(y - O.y, x - O.x) - THETA_A;
    if (next < 0) next += 2 * Math.PI;
    return next;
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

  const A = { x: O.x + R_PX * Math.cos(THETA_A), y: O.y + R_PX * Math.sin(THETA_A) };
  const thetaB = THETA_A + theta;
  const B = { x: O.x + R_PX * Math.cos(thetaB), y: O.y + R_PX * Math.sin(thetaB) };
  const largeArc = theta > Math.PI ? 1 : 0;
  const arcPath = `M ${A.x} ${A.y} A ${R_PX} ${R_PX} 0 ${largeArc} 1 ${B.x} ${B.y}`;

  const midAngle = THETA_A + theta / 2;
  const midR = R_PX + 16;
  const sLabelPos = { x: O.x + midR * Math.cos(midAngle), y: O.y + midR * Math.sin(midAngle) };
  const rLabelPos = { x: O.x + (R_PX * 0.55) * Math.cos(THETA_A - 0.25), y: O.y + (R_PX * 0.55) * Math.sin(THETA_A - 0.25) };
  const thetaLabelR = 26;
  const thetaLabelPos = { x: O.x + thetaLabelR * Math.cos(THETA_A + theta / 2), y: O.y + thetaLabelR * Math.sin(THETA_A + theta / 2) };

  const s = r * theta;

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: الإزاحة الزاوية θ = S/r"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      hint={`θ = ${theta.toFixed(2)} rad، وبنصف قطر r = ${r.toFixed(1)} m فإن طول القوس S = rθ ≈ ${s.toFixed(2)} m — كبّر r من المنزلق وشاهد القوس يطول لنفس الزاوية.`}
      sliders={<SimSlider label="نصف القطر r" value={r} min={0.5} max={2.2} step={0.1} unit="m" onChange={setR} />}
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
          <title>اسحب النقطة B حول الدائرة أو غيّر نصف القطر لترى العلاقة بين الزاوية والقوس ونصف القطر</title>
          <DiagramDefs />
          <circle cx={O.x} cy={O.y} r={R_PX} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.4" strokeDasharray="3 5" opacity="0.45" />

          <path d={`M ${O.x} ${O.y} L ${A.x} ${A.y} A ${R_PX} ${R_PX} 0 ${largeArc} 1 ${B.x} ${B.y} Z`} fill="var(--accent-primary-soft)" opacity="0.6" />

          <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} stroke="var(--text-secondary)" strokeWidth="1.6" strokeDasharray="3 3" />
          <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} stroke="var(--text-secondary)" strokeWidth="1.6" />

          <path d={arcPath} fill="none" stroke="var(--accent-primary)" strokeWidth="3.4" strokeLinecap="round" />

          <circle cx={O.x} cy={O.y} r="3.2" fill="var(--text-secondary)" />
          <VectorLabel x={O.x - 12} y={O.y + 16} color="var(--text-secondary)">O</VectorLabel>
          <VectorLabel x={rLabelPos.x} y={rLabelPos.y} color="var(--text-secondary)">r</VectorLabel>
          <VectorLabel x={thetaLabelPos.x} y={thetaLabelPos.y} color="var(--accent-secondary)">θ</VectorLabel>
          <VectorLabel x={sLabelPos.x} y={sLabelPos.y} color="var(--accent-primary)">S</VectorLabel>

          <circle cx={A.x} cy={A.y} r="5" fill="var(--text-secondary)" />
          <VectorLabel x={A.x} y={A.y - 12} color="var(--text-secondary)">A</VectorLabel>

          <circle cx={B.x} cy={B.y} r="9" fill="var(--accent-tertiary)" stroke="var(--bg-surface)" strokeWidth="2" style={{ cursor: "grab" }} onPointerDown={onPointerDown} />
          <VectorLabel x={B.x + (B.x >= O.x ? 14 : -14)} y={B.y - 8} color="var(--accent-tertiary)">B</VectorLabel>
        </svg>
      }
    />
  );
}
