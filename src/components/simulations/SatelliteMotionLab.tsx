import { useCallback, useRef, useState } from "react";
import { DiagramDefs, VectorLabel } from "../diagrams/shared";
import { useRafLoop } from "./hooks";
import { SimShell } from "./SimShell";
import { SimSlider } from "./SimSlider";

const O = { x: 150, y: 130 };
const DEFAULTS = { radius: 1.8, omega: 0.9, mass: 1 };
const TRAIL_LENGTH = 26;

function radiusToPx(r: number) {
  return 45 + r * 22;
}

/**
 * Satellite Motion Lab — replaces the static satellite photo in Lesson
 * Two. A satellite orbits Earth leaving a fading trail; orbit radius,
 * angular speed, and satellite mass are live-adjustable, with velocity
 * and gravitational/centripetal force vectors redrawn every frame.
 */
export function SatelliteMotionLab() {
  const [radius, setRadius] = useState(DEFAULTS.radius);
  const [omega, setOmega] = useState(DEFAULTS.omega);
  const [mass, setMass] = useState(DEFAULTS.mass);
  const [theta, setTheta] = useState(0);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);

  const frameCount = useRef(0);

  useRafLoop(
    (dt) => {
      setTheta((t) => t + omega * dt);
      frameCount.current += 1;
      if (frameCount.current % 2 === 0) {
        setTrail((prev) => {
          const rPx = radiusToPx(radius);
          const next = { x: O.x + rPx * Math.cos(theta), y: O.y + rPx * Math.sin(theta) };
          const arr = [...prev, next];
          return arr.length > TRAIL_LENGTH ? arr.slice(arr.length - TRAIL_LENGTH) : arr;
        });
      }
    },
    running && inView,
  );

  const reset = useCallback(() => {
    setRadius(DEFAULTS.radius);
    setOmega(DEFAULTS.omega);
    setMass(DEFAULTS.mass);
    setTheta(0);
    setTrail([]);
    setRunning(true);
  }, []);

  const rPx = radiusToPx(radius);
  const v = omega * radius;
  const ac = omega * omega * radius;
  const fg = mass * ac;

  const P = { x: O.x + rPx * Math.cos(theta), y: O.y + rPx * Math.sin(theta) };
  const tangent = { x: -Math.sin(theta), y: Math.cos(theta) };
  const vLen = Math.min(60, 18 + v * 14);
  const aLen = Math.min(60, 18 + ac * 12);
  const vEnd = { x: P.x + tangent.x * vLen, y: P.y + tangent.y * vLen };
  const radial = { x: (O.x - P.x) / rPx, y: (O.y - P.y) / rPx };
  const aEnd = { x: P.x + radial.x * aLen, y: P.y + radial.y * aLen };

  return (
    <SimShell
      title="مختبر حركة القمر الصناعي"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      canvas={
        <svg width="300" height="260" viewBox="0 0 300 260">
          <title>محاكاة تفاعلية لحركة قمر صناعي حول الأرض — غيّر نصف قطر المدار والسرعة الزاوية وكتلة القمر</title>
          <DiagramDefs />
          <circle cx={O.x} cy={O.y} r={rPx} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.6" strokeDasharray="4 4" opacity="0.5" />

          {trail.map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="2.4" fill="var(--accent-tertiary)" opacity={(i + 1) / trail.length / 2} />
          ))}

          {/* Earth */}
          <circle cx={O.x} cy={O.y} r="14" fill="var(--accent-primary)" />
          <VectorLabel x={O.x} y={O.y + 28} color="var(--text-secondary)">الأرض</VectorLabel>

          <line x1={P.x} y1={P.y} x2={vEnd.x} y2={vEnd.y} stroke="var(--accent-secondary)" strokeWidth="2.2" markerEnd="url(#arrow-secondary)" />
          <VectorLabel x={vEnd.x + 12} y={vEnd.y} color="var(--accent-secondary)">v</VectorLabel>

          <line x1={P.x} y1={P.y} x2={aEnd.x} y2={aEnd.y} stroke="var(--accent-quaternary)" strokeWidth="2.4" markerEnd="url(#arrow-quaternary)" />
          <VectorLabel x={(P.x + aEnd.x) / 2} y={(P.y + aEnd.y) / 2 - 10} color="var(--accent-quaternary)">Fᴄ</VectorLabel>

          <circle cx={P.x} cy={P.y} r="7" fill="var(--accent-tertiary)" stroke="var(--bg-surface)" strokeWidth="1.6" />
        </svg>
      }
      controls={
        <>
          <SimSlider label="نصف قطر المدار r (بمقياس رمزي)" value={radius} min={0.6} max={3} step={0.1} unit="m" onChange={setRadius} />
          <SimSlider label="السرعة الزاوية ω" value={omega} min={0.2} max={2.5} step={0.1} unit="rad/s" onChange={setOmega} />
          <SimSlider label="كتلة القمر الصناعي m (بمقياس رمزي)" value={mass} min={0.2} max={3} step={0.1} unit="kg" onChange={setMass} />
        </>
      }
      readouts={[
        { label: "السرعة الخطية v = ωr", value: `${v.toFixed(2)} m/s` },
        { label: "التعجيل المركزي aᴄ = ω²r", value: `${ac.toFixed(2)} m/s²` },
        { label: "قوة الجاذبية اللازمة Fᴄ = m·aᴄ", value: `${fg.toFixed(2)} N` },
      ]}
    />
  );
}
