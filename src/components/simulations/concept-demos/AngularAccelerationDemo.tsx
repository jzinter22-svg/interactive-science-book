import { useCallback, useState } from "react";
import { DiagramDefs, VectorLabel } from "../../diagrams/shared";
import { useRafLoop } from "../hooks";
import { SimSlider } from "../SimSlider";
import { ConceptDemoShell } from "./ConceptDemoShell";

const O = { x: 150, y: 130 };
const R_PX = 90;
const R_M = 0.35;
const OMEGA_MAX = 8; // rad/s — clamps the visual so a long-running demo stays legible

/**
 * Replaces the static figure for §1-5-3 (angular acceleration, α = Δω/Δt).
 * The disc starts from rest and speeds up or slows down at the slider's
 * α; the rim point's tangential velocity vₜ = ωr (blue) and tangential
 * acceleration aₜ = αr (amber) are both drawn tangent to the circle —
 * same direction means speeding up, opposite means slowing down, which
 * is exactly the sign convention the source text calls out (a negative
 * α precedes deceleration).
 */
export function AngularAccelerationDemo() {
  const [alpha, setAlpha] = useState(0.6);
  const [omega, setOmega] = useState(0);
  const [theta, setTheta] = useState(0);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);

  useRafLoop((dt) => {
    setOmega((w) => Math.max(-OMEGA_MAX, Math.min(OMEGA_MAX, w + alpha * dt)));
    setTheta((t) => t + omega * dt);
  }, running && inView);

  const reset = useCallback(() => {
    setAlpha(0.6);
    setOmega(0);
    setTheta(0);
    setRunning(true);
  }, []);

  const vT = omega * R_M;
  const aT = alpha * R_M;
  const speedingUp = Math.sign(alpha) === Math.sign(omega) && alpha !== 0 && omega !== 0;

  const P = { x: O.x + R_PX * Math.cos(theta), y: O.y + R_PX * Math.sin(theta) };
  const tangentUnit = { x: -Math.sin(theta), y: Math.cos(theta) };
  const radialUnit = { x: Math.cos(theta), y: Math.sin(theta) };

  // v_T and a_T often point the same tangential direction (speeding up) with
  // similar lengths — drawn from the same point they'd overlap and hide one
  // another, so each gets its own small radial offset, side by side.
  const vBase = { x: P.x - radialUnit.x * 9, y: P.y - radialUnit.y * 9 };
  const aBase = { x: P.x + radialUnit.x * 9, y: P.y + radialUnit.y * 9 };

  const vLen = Math.min(60, 10 + Math.abs(vT) * 12);
  const vSign = Math.sign(omega) || 1;
  const vEnd = { x: vBase.x + tangentUnit.x * vLen * vSign, y: vBase.y + tangentUnit.y * vLen * vSign };

  const aLen = Math.min(60, 10 + Math.abs(aT) * 22);
  const aSign = Math.sign(alpha) || 1;
  const aEnd = { x: aBase.x + tangentUnit.x * aLen * aSign, y: aBase.y + tangentUnit.y * aLen * aSign };

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: التعجيل الزاوي α = Δω/Δt"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      hint={`ω الحالية ≈ ${omega.toFixed(1)} rad/s، وaₜ = αr ≈ ${aT.toFixed(2)} m/s² — ${
        alpha === 0 ? "بدون تعجيل زاوي تبقى ω ثابتة." : speedingUp ? "aₜ وvₜ بنفس الاتجاه ⇐ الجسم يتسارع." : "aₜ وvₜ متعاكسان ⇐ الجسم يتباطأ."
      }`}
      sliders={<SimSlider label="التعجيل الزاوي α" value={alpha} min={-1.5} max={1.5} step={0.1} unit="rad/s²" onChange={setAlpha} />}
      canvas={
        <svg width="300" height="260" viewBox="0 0 300 260">
          <title>غيّر التعجيل الزاوي لترى متى تتسارع النقطة على حافة القرص ومتى تتباطأ</title>
          <DiagramDefs />
          <circle cx={O.x} cy={O.y} r={R_PX} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.4" strokeDasharray="3 5" opacity="0.45" />
          <circle cx={O.x} cy={O.y} r="3.2" fill="var(--text-secondary)" />
          <VectorLabel x={O.x - 14} y={O.y + 5} color="var(--text-secondary)">O</VectorLabel>

          <line x1={vBase.x} y1={vBase.y} x2={vEnd.x} y2={vEnd.y} stroke="var(--accent-primary)" strokeWidth="2.4" markerEnd="url(#arrow-primary)" />
          <VectorLabel x={vEnd.x + (vSign > 0 ? 14 : -14)} y={vEnd.y} color="var(--accent-primary)">vₜ</VectorLabel>

          <line x1={aBase.x} y1={aBase.y} x2={aEnd.x} y2={aEnd.y} stroke="var(--accent-secondary)" strokeWidth="2.6" markerEnd="url(#arrow-secondary)" />
          <VectorLabel x={aEnd.x + (aSign > 0 ? 14 : -14)} y={aEnd.y - 14} color="var(--accent-secondary)">aₜ</VectorLabel>

          <circle cx={P.x} cy={P.y} r="9" fill="var(--accent-tertiary)" stroke="var(--bg-surface)" strokeWidth="2" />
        </svg>
      }
    />
  );
}
