import { useCallback, useState } from "react";
import { DiagramDefs, VectorLabel } from "../diagrams/shared";
import { useRafLoop } from "./hooks";
import { SimShell } from "./SimShell";
import { SimSlider } from "./SimSlider";

const B = { x: 66, y: 214 }; // base pivot of the incline cross-section
const CAR_DIST = 104; // px along the incline from B to the car
const MASS_KG = 1000; // representative car mass — cancels out of the safe-speed range, shown for scale only
const G = 9.8;
const RADIUS_M = 50; // fixed curve radius for this exploratory lab
const MG = MASS_KG * G;

function lenFor(forceN: number) {
  return Math.min(90, Math.max(14, (Math.abs(forceN) / MG) * 50));
}

const DEFAULTS = { angleDeg: 15, speed: 16, mu: 0.3 };

/**
 * Banked Road Lab — replaces the static banked-road illustration. The
 * student adjusts the bank angle, the car's speed, and the road-tire
 * friction coefficient; the force diagram (N, its components, mg, the
 * required centripetal force, and the friction actually needed) redraws
 * live, and a status line reports whether the car stays on its circular
 * path or slides at the current settings.
 */
export function BankedRoadLab() {
  const [angleDeg, setAngleDeg] = useState(DEFAULTS.angleDeg);
  const [speed, setSpeed] = useState(DEFAULTS.speed);
  const [mu, setMu] = useState(DEFAULTS.mu);
  const [wheelSpin, setWheelSpin] = useState(0);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);

  useRafLoop((dt) => setWheelSpin((s) => s + speed * dt * 2), running && inView);

  const reset = useCallback(() => {
    setAngleDeg(DEFAULTS.angleDeg);
    setSpeed(DEFAULTS.speed);
    setMu(DEFAULTS.mu);
    setWheelSpin(0);
    setRunning(true);
  }, []);

  const theta = (angleDeg * Math.PI) / 180;
  const d = { x: Math.cos(theta), y: -Math.sin(theta) };
  const n = { x: -Math.sin(theta), y: -Math.cos(theta) };
  const car = { x: B.x + d.x * CAR_DIST, y: B.y + d.y * CAR_DIST };

  const fc = (MASS_KG * speed * speed) / RADIUS_M;
  const normalForce = MG * Math.cos(theta) + fc * Math.sin(theta);
  const friction = fc * Math.cos(theta) - MG * Math.sin(theta);
  const maxFriction = mu * normalForce;
  const safe = Math.abs(friction) <= maxFriction;
  const slidingUp = friction > maxFriction;

  const nLen = lenFor(normalForce);
  const mgLen = lenFor(MG);
  const fcLen = lenFor(fc);
  const fLen = lenFor(friction);

  const nEnd = { x: car.x + n.x * nLen, y: car.y + n.y * nLen };
  const mgEnd = { x: car.x, y: car.y + mgLen };
  const fcEnd = { x: car.x - fcLen, y: car.y };
  const nSinEnd = { x: car.x + n.x * nLen, y: car.y };
  const nCosEnd = { x: car.x, y: car.y + n.y * nLen };
  const frictionDir = friction >= 0 ? { x: -d.x, y: -d.y } : d;
  const fEnd = { x: car.x + frictionDir.x * fLen, y: car.y + frictionDir.y * fLen };

  const roadEnd = { x: B.x + d.x * 210, y: B.y + d.y * 210 };
  const wheelAngle = (wheelSpin * 180) / Math.PI;

  return (
    <SimShell
      title="مختبر الطريق المائل"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      canvas={
        <svg width="300" height="260" viewBox="0 0 300 260">
          <title>محاكاة تفاعلية لسيارة على طريق مائل — غيّر زاوية الميل والسرعة ومعامل الاحتكاك وراقب تحلل القوى</title>
          <DiagramDefs />

          <line x1={20} y1={B.y} x2={280} y2={B.y} stroke="var(--glass-border-soft)" strokeWidth="1.5" />
          <line x1={B.x} y1={B.y} x2={roadEnd.x} y2={roadEnd.y} stroke="var(--text-secondary)" strokeWidth="3" strokeLinecap="round" />

          {/* dashed N component decomposition */}
          <line x1={car.x} y1={car.y} x2={nSinEnd.x} y2={nSinEnd.y} stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1={car.x} y1={car.y} x2={nCosEnd.x} y2={nCosEnd.y} stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="3 3" />
          <VectorLabel x={nSinEnd.x} y={car.y + 14} color="var(--text-tertiary)">N sinθ</VectorLabel>
          <VectorLabel x={car.x - 34} y={nCosEnd.y} color="var(--text-tertiary)">N cosθ</VectorLabel>

          <line x1={car.x} y1={car.y} x2={nEnd.x} y2={nEnd.y} stroke="var(--accent-primary)" strokeWidth="2.4" markerEnd="url(#arrow-primary)" />
          <VectorLabel x={nEnd.x + 10} y={nEnd.y - 6} color="var(--accent-primary)">N</VectorLabel>

          <line x1={car.x} y1={car.y} x2={mgEnd.x} y2={mgEnd.y} stroke="var(--accent-secondary)" strokeWidth="2.4" markerEnd="url(#arrow-secondary)" />
          <VectorLabel x={mgEnd.x + 18} y={mgEnd.y} color="var(--accent-secondary)">mg</VectorLabel>

          <line x1={car.x} y1={car.y} x2={fcEnd.x} y2={fcEnd.y} stroke="var(--accent-quaternary)" strokeWidth="2.4" markerEnd="url(#arrow-quaternary)" />
          <VectorLabel x={fcEnd.x - 14} y={fcEnd.y - 8} color="var(--accent-quaternary)">Fᴄ</VectorLabel>

          {fLen > 15 && (
            <>
              <line x1={car.x} y1={car.y} x2={fEnd.x} y2={fEnd.y} stroke="var(--accent-tertiary)" strokeWidth="2.2" markerEnd="url(#arrow-tertiary)" />
              <VectorLabel x={fEnd.x} y={fEnd.y - 10} color="var(--accent-tertiary)">f</VectorLabel>
            </>
          )}

          {/* car body with spinning wheels, oriented flush with the incline */}
          <g transform={`rotate(${-angleDeg}, ${car.x}, ${car.y})`}>
            <rect x={car.x - 16} y={car.y - 9} width="32" height="12" rx="3" fill={safe ? "var(--accent-tertiary)" : "var(--status-danger)"} />
            {[car.x - 9, car.x + 9].map((wx) => (
              <g key={wx} transform={`rotate(${wheelAngle}, ${wx}, ${car.y + 5})`}>
                <circle cx={wx} cy={car.y + 5} r="4" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.4" />
                <line x1={wx} y1={car.y + 5} x2={wx} y2={car.y + 1.5} stroke="var(--text-secondary)" strokeWidth="1.2" />
              </g>
            ))}
          </g>
        </svg>
      }
      controls={
        <>
          <SimSlider label="زاوية الميل θ" value={angleDeg} min={0} max={40} step={1} unit="°" precision={0} onChange={setAngleDeg} />
          <SimSlider label="سرعة السيارة v" value={speed} min={2} max={30} step={1} unit="m/s" precision={0} onChange={setSpeed} />
          <SimSlider label="معامل الاحتكاك μ" value={mu} min={0} max={1} step={0.05} onChange={setMu} />
        </>
      }
      readouts={[
        { label: "القوة المركزية اللازمة Fᴄ", value: `${fc.toFixed(0)} N` },
        { label: "قوة رد الفعل العمودي N", value: `${normalForce.toFixed(0)} N` },
        { label: "الاحتكاك اللازم f (الأقصى المتاح μN)", value: `${friction.toFixed(0)} N (${maxFriction.toFixed(0)} N)` },
        {
          label: "الحالة",
          value: safe ? "آمنة ضمن النطاق المسموح" : slidingUp ? "⚠ ستنزلق للأعلى وللخارج" : "⚠ ستنزلق للأسفل وللداخل",
        },
      ]}
    />
  );
}
