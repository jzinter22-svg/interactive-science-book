import { useState } from "react";
import { DiagramDefs, VectorLabel } from "../../diagrams/shared";
import { useRafLoop } from "../hooks";
import { SimSlider } from "../SimSlider";
import { ConceptDemoShell } from "./ConceptDemoShell";

const O = { x: 150, y: 130 };
const R_PX = 90;
const R_M = 0.4; // fixed string length, matches the fixed mass below
const MASS = 1; // kg, fixed on purpose — this demo isolates speed alone

/**
 * Replaces the static Figure 1-3. One slider — speed only — so the
 * student can isolate exactly what the formula says: Fᴄ = mv²/r grows
 * with the *square* of the speed. The string's own color intensifies
 * with tension as a second, non-numeric cue toward the same fact.
 */
export function CentripetalForceDemo() {
  const [speed, setSpeed] = useState(1.6);
  const [theta, setTheta] = useState(-Math.PI / 4);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);

  const displayOmega = 0.3 + speed * 0.35;
  useRafLoop((dt) => setTheta((t) => t + displayOmega * dt), running && inView);

  const fc = (MASS * speed * speed) / R_M;
  const fLen = Math.min(80, 14 + fc * 2.2);
  const tension = Math.min(1, fc / 40);

  const P = { x: O.x + R_PX * Math.cos(theta), y: O.y + R_PX * Math.sin(theta) };
  const radial = { x: (O.x - P.x) / R_PX, y: (O.y - P.y) / R_PX };
  const fEnd = { x: P.x + radial.x * fLen, y: P.y + radial.y * fLen };

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: القوة المركزية تتناسب مع مربع السرعة"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={() => {
        setSpeed(1.6);
        setTheta(-Math.PI / 4);
        setRunning(true);
      }}
      onVisibilityChange={setInView}
      hint={`عند مضاعفة السرعة تتضاعف القوة المركزية اللازمة أربع مرات: Fᴄ = m v²/r ≈ ${fc.toFixed(1)} N حالياً.`}
      sliders={<SimSlider label="سرعة الكرة v" value={speed} min={0.5} max={4} step={0.1} unit="m/s" onChange={setSpeed} />}
      canvas={
        <svg width="300" height="260" viewBox="0 0 300 260">
          <title>غيّر سرعة الكرة وراقب القوة المركزية اللازمة تتغيّر مع مربع السرعة</title>
          <DiagramDefs />
          <circle cx={O.x} cy={O.y} r={R_PX} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.4" strokeDasharray="3 5" opacity="0.4" />

          <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="var(--text-tertiary)" strokeWidth="1.6" />
          <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="var(--accent-primary)" strokeWidth={1.6 + tension * 2.4} opacity={tension} />

          <circle cx={O.x} cy={O.y} r="4" fill="var(--text-secondary)" />
          <circle cx={P.x} cy={P.y} r="9" fill="var(--accent-tertiary)" stroke="var(--bg-surface)" strokeWidth="1.6" />

          <line x1={P.x} y1={P.y} x2={fEnd.x} y2={fEnd.y} stroke="var(--accent-primary)" strokeWidth="2.6" markerEnd="url(#arrow-primary)" />
          <VectorLabel x={(P.x + fEnd.x) / 2 + 6} y={(P.y + fEnd.y) / 2 - 12} color="var(--accent-primary)">Fᴄ</VectorLabel>
        </svg>
      }
    />
  );
}
