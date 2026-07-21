import { useRef, useState } from "react";
import { DiagramDefs, VectorLabel } from "../../diagrams/shared";
import { useRafLoop } from "../hooks";
import { ConceptDemoShell } from "./ConceptDemoShell";
import { ellipseCenter, semiMinor, positionAt, angularRate, type OrbitParams } from "./orbitMath";

const FOCUS = { x: 110, y: 130 };
const SEMI_MAJOR = 90;
const ECCENTRICITY = 0.55;
const BASE_RATE = 0.5;
const WINDOW = 1.1; // seconds — the fixed Δt every wedge represents

const PARAMS: OrbitParams = { focusX: FOCUS.x, focusY: FOCUS.y, semiMajor: SEMI_MAJOR, eccentricity: ECCENTRICITY };

/**
 * Replaces the static Kepler's-second-law figure. Rather than showing
 * two fixed wedges side by side, this demo sweeps ONE wedge in real
 * time, always spanning the same fixed Δt — so its angular width
 * visibly widens near the focus (moving fast) and narrows far from it
 * (moving slow), which is the actual content of the law, watched
 * happening rather than read off a diagram.
 */
export function KeplerAreaSweepDemo() {
  const [nu, setNu] = useState(0);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);
  const historyRef = useRef<{ t: number; nu: number }[]>([{ t: 0, nu: 0 }]);
  const clockRef = useRef(0);

  useRafLoop((dt) => {
    clockRef.current += dt;
    setNu((n) => {
      const next = n + angularRate(PARAMS, n, BASE_RATE) * dt;
      historyRef.current.push({ t: clockRef.current, nu: next });
      while (historyRef.current.length > 2 && historyRef.current[1].t < clockRef.current - WINDOW) {
        historyRef.current.shift();
      }
      return next;
    });
  }, running && inView);

  const reset = () => {
    setNu(0);
    clockRef.current = 0;
    historyRef.current = [{ t: 0, nu: 0 }];
    setRunning(true);
  };

  const center = ellipseCenter(PARAMS);
  const b = semiMinor(PARAMS);

  const windowStart = historyRef.current[0].nu;
  const pStart = positionAt(PARAMS, windowStart);
  const pNow = positionAt(PARAMS, nu);
  const sweptDeg = ((nu - windowStart) * 180) / Math.PI;

  const wedgePath = `M ${FOCUS.x} ${FOCUS.y} L ${pStart.x} ${pStart.y} A ${SEMI_MAJOR} ${b} 0 0 1 ${pNow.x} ${pNow.y} Z`;

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: مساحات متساوية في أزمان متساوية"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      hint={`القطاع الملوّن يمثّل المساحة التي يمسحها الخط الواصل خلال آخر ${WINDOW.toFixed(1)} ثانية دائماً — راقب كيف يتّسع قرب مركز الجذب ويضيق بعيداً عنه رغم أن مساحته الفعلية تبقى متكافئة. الزاوية الممسوحة الآن ≈ ${sweptDeg.toFixed(0)}°.`}
      canvas={
        <svg width="320" height="260" viewBox="0 0 320 260">
          <title>راقب قطاع المساحة الممسوح خلال فاصل زمني ثابت يتّسع قرب مركز الجذب ويضيق بعيداً عنه</title>
          <DiagramDefs />

          <ellipse cx={center.x} cy={center.y} rx={SEMI_MAJOR} ry={b} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.6" opacity="0.6" />

          <path d={wedgePath} fill="var(--accent-primary-soft)" stroke="var(--accent-primary)" strokeWidth="1.3" />

          <circle cx={FOCUS.x} cy={FOCUS.y} r="8" fill="var(--accent-secondary)" />
          <VectorLabel x={FOCUS.x} y={FOCUS.y - 15} color="var(--accent-secondary)">مركز الجذب</VectorLabel>

          <circle cx={pNow.x} cy={pNow.y} r="7" fill="var(--accent-tertiary)" stroke="var(--bg-surface)" strokeWidth="1.4" />
        </svg>
      }
    />
  );
}
