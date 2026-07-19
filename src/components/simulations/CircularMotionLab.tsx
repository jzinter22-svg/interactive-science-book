import { useCallback, useRef, useState } from "react";
import { DiagramDefs, VectorLabel } from "../diagrams/shared";
import { useRafLoop } from "./hooks";
import { SimShell } from "./SimShell";
import { SimSlider } from "./SimSlider";

const O = { x: 150, y: 130 };
const DEFAULTS = { radius: 1.5, omega: 1.2, mass: 1 };

function radiusToPx(r: number) {
  return 40 + r * 23; // meters → canvas px, keeps the circle inside the 300x260 viewBox
}

/**
 * Circular Motion Lab — replaces the static car-on-curve photo. The
 * student can drag the body around the circle directly, or let it spin;
 * radius, angular velocity, and mass are all live-adjustable, and v,
 * a_c, F_c recompute and redraw every frame.
 */
export function CircularMotionLab() {
  const [radius, setRadius] = useState(DEFAULTS.radius);
  const [omega, setOmega] = useState(DEFAULTS.omega);
  const [mass, setMass] = useState(DEFAULTS.mass);
  const [theta, setTheta] = useState(-Math.PI / 4);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);

  useRafLoop(
    (dt) => {
      if (draggingRef.current) return;
      setTheta((t) => t + omega * dt);
    },
    running && inView,
  );

  const reset = useCallback(() => {
    setRadius(DEFAULTS.radius);
    setOmega(DEFAULTS.omega);
    setMass(DEFAULTS.mass);
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

  const rPx = radiusToPx(radius);
  const v = omega * radius;
  const ac = omega * omega * radius;
  const fc = mass * ac;

  const P = { x: O.x + rPx * Math.cos(theta), y: O.y + rPx * Math.sin(theta) };
  const tangent = { x: -Math.sin(theta), y: Math.cos(theta) };
  const vLen = Math.min(70, 20 + v * 12);
  const aLen = Math.min(70, 20 + ac * 10);
  const vEnd = { x: P.x + tangent.x * vLen, y: P.y + tangent.y * vLen };
  const radial = { x: (O.x - P.x) / rPx, y: (O.y - P.y) / rPx };
  const aEnd = { x: P.x + radial.x * aLen, y: P.y + radial.y * aLen };

  return (
    <SimShell
      title="مختبر الحركة الدائرية"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
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
          <title>محاكاة تفاعلية للحركة الدائرية — اسحب الجسم أو غيّر نصف القطر والسرعة الزاوية والكتلة</title>
          <DiagramDefs />
          <circle cx={O.x} cy={O.y} r={rPx} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.6" strokeDasharray="4 4" opacity="0.6" />
          <circle cx={O.x} cy={O.y} r="3" fill="var(--text-secondary)" />

          <line x1={P.x} y1={P.y} x2={vEnd.x} y2={vEnd.y} stroke="var(--accent-secondary)" strokeWidth="2.4" markerEnd="url(#arrow-secondary)" />
          <VectorLabel x={vEnd.x + 12} y={vEnd.y} color="var(--accent-secondary)">v</VectorLabel>

          <line x1={P.x} y1={P.y} x2={aEnd.x} y2={aEnd.y} stroke="var(--accent-primary)" strokeWidth="2.6" markerEnd="url(#arrow-primary)" />
          <VectorLabel x={(P.x + aEnd.x) / 2} y={(P.y + aEnd.y) / 2 - 10} color="var(--accent-primary)">aᴄ</VectorLabel>

          <circle
            cx={P.x}
            cy={P.y}
            r="10"
            fill="var(--accent-tertiary)"
            stroke="var(--bg-surface)"
            strokeWidth="2"
            style={{ cursor: "grab" }}
            onPointerDown={onPointerDown}
          />
        </svg>
      }
      controls={
        <>
          <SimSlider label="نصف القطر r" value={radius} min={0.5} max={3} step={0.1} unit="m" onChange={setRadius} />
          <SimSlider label="السرعة الزاوية ω" value={omega} min={0.3} max={3} step={0.1} unit="rad/s" onChange={setOmega} />
          <SimSlider label="الكتلة m" value={mass} min={0.5} max={5} step={0.1} unit="kg" onChange={setMass} />
        </>
      }
      readouts={[
        { label: "السرعة الخطية v = ωr", value: `${v.toFixed(2)} m/s` },
        { label: "التعجيل المركزي aᴄ = ω²r", value: `${ac.toFixed(2)} m/s²` },
        { label: "القوة المركزية Fᴄ = m·aᴄ", value: `${fc.toFixed(2)} N` },
      ]}
    />
  );
}
