import { useCallback, useState } from "react";
import { DiagramDefs, VectorLabel } from "../../diagrams/shared";
import { useRafLoop } from "../hooks";
import { SimSlider } from "../SimSlider";
import { ConceptDemoShell } from "./ConceptDemoShell";

const O = { x: 150, y: 165 };
const RX = 95;
const RY = 34;
const R_M = 0.3; // fixed rim radius, only ω (and its sign) changes here

/**
 * Replaces the static Figure 1-8 (right-hand rule). The disc is drawn
 * in perspective; ω's slider is signed exactly like θ's sign convention
 * on the previous page — positive is counter-clockwise, negative is
 * clockwise — and flipping the sign flips the ω arrow up/down through
 * the right-hand rule, while the rim's tangential speed vₜ = ωr stays
 * tangent to the ellipse wherever the marked point currently sits.
 */
export function AngularVelocityDemo() {
  const [omega, setOmega] = useState(1.5);
  const [phi, setPhi] = useState(-Math.PI / 2);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);

  useRafLoop((dt) => setPhi((p) => p - omega * dt), running && inView);

  const reset = useCallback(() => {
    setOmega(1.5);
    setPhi(-Math.PI / 2);
    setRunning(true);
  }, []);

  const ccw = omega >= 0;
  const vT = Math.abs(omega) * R_M;

  const P = { x: O.x + RX * Math.cos(phi), y: O.y + RY * Math.sin(phi) };
  // Tangent to the ellipse at φ, oriented for the current rotation sign.
  const tangentRaw = { x: -RX * Math.sin(phi), y: RY * Math.cos(phi) };
  const tangentLen = Math.hypot(tangentRaw.x, tangentRaw.y) || 1;
  const dir = ccw ? -1 : 1;
  const tangent = { x: (dir * tangentRaw.x) / tangentLen, y: (dir * tangentRaw.y) / tangentLen };
  const vEnd = { x: P.x + tangent.x * 42, y: P.y + tangent.y * 42 };

  const omegaArrowLen = 62;
  const omegaEnd = ccw ? { x: O.x, y: O.y - omegaArrowLen } : { x: O.x, y: O.y + omegaArrowLen };

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: اتجاه السرعة الزاوية بقاعدة اليد اليمنى"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      hint={`${ccw ? "الدوران عكس عقارب الساعة (ω موجبة) — السهم يشير للأعلى نحوك." : "الدوران مع عقارب الساعة (ω سالبة) — السهم يشير للأسفل مبتعداً عنك."} vₜ = ωr ≈ ${vT.toFixed(2)} m/s.`}
      sliders={<SimSlider label="السرعة الزاوية ω (موجبة = عكس الساعة)" value={omega} min={-3} max={3} step={0.1} unit="rad/s" onChange={setOmega} />}
      canvas={
        <svg width="300" height="260" viewBox="0 0 300 260">
          <title>غيّر إشارة السرعة الزاوية لترى اتجاه دورانها واتجاه ω يتغيران معاً بقاعدة اليد اليمنى</title>
          <DiagramDefs />

          <ellipse cx={O.x} cy={O.y} rx={RX} ry={RY} fill="var(--accent-primary-soft)" stroke="var(--text-tertiary)" strokeWidth="1.6" opacity="0.7" />

          {ccw ? (
            <line x1={O.x} y1={O.y} x2={omegaEnd.x} y2={omegaEnd.y} stroke="var(--accent-secondary)" strokeWidth="3" markerEnd="url(#arrow-secondary)" />
          ) : (
            <line
              x1={O.x}
              y1={O.y}
              x2={omegaEnd.x}
              y2={omegaEnd.y}
              stroke="var(--accent-secondary)"
              strokeWidth="3"
              strokeDasharray="4 4"
              opacity="0.7"
              markerEnd="url(#arrow-secondary)"
            />
          )}
          <VectorLabel x={omegaEnd.x + 16} y={omegaEnd.y + (ccw ? 4 : -4)} color="var(--accent-secondary)">ω</VectorLabel>

          <circle cx={O.x} cy={O.y} r="3.2" fill="var(--text-secondary)" />
          <VectorLabel x={O.x - 14} y={O.y + 4} color="var(--text-secondary)">O</VectorLabel>

          <line x1={P.x} y1={P.y} x2={vEnd.x} y2={vEnd.y} stroke="var(--accent-primary)" strokeWidth="2.4" markerEnd="url(#arrow-primary)" />
          <VectorLabel x={vEnd.x + (dir < 0 ? -16 : 16)} y={vEnd.y - 6} color="var(--accent-primary)">vₜ</VectorLabel>

          <circle cx={P.x} cy={P.y} r="7" fill="var(--accent-tertiary)" stroke="var(--bg-surface)" strokeWidth="1.6" />
        </svg>
      }
    />
  );
}
