import { useCallback, useState } from "react";
import { DiagramDefs, VectorLabel } from "../diagrams/shared";
import { useRafLoop } from "./hooks";
import { SimShell } from "./SimShell";
import { SimSlider } from "./SimSlider";

const O = { x: 150, y: 130 };
const TUBE_RADIUS_PX = 78;
const TUBE_RADIUS_M = 0.09; // fixed rotor radius, matches the drawing
const TUBE_COUNT = 6;
const DEFAULTS = { rpm: 900, sampleMassG: 10 };

/**
 * Centrifuge Lab — replaces the static centrifuge photograph. A rotor
 * with six sample tubes spins at an adjustable RPM; centripetal
 * acceleration and the force needed to hold one sample on its circular
 * path recompute live as RPM (or sample mass) changes.
 */
export function CentrifugeLab() {
  const [rpm, setRpm] = useState(DEFAULTS.rpm);
  const [sampleMassG, setSampleMassG] = useState(DEFAULTS.sampleMassG);
  const [theta, setTheta] = useState(0);
  const [running, setRunning] = useState(false);
  const [inView, setInView] = useState(true);

  const omega = (rpm * 2 * Math.PI) / 60;

  useRafLoop(
    (dt) => setTheta((t) => t + omega * dt),
    running && inView,
  );

  const reset = useCallback(() => {
    setRpm(DEFAULTS.rpm);
    setSampleMassG(DEFAULTS.sampleMassG);
    setTheta(0);
    setRunning(false);
  }, []);

  const ac = omega * omega * TUBE_RADIUS_M;
  const fc = (sampleMassG / 1000) * ac;

  const tubes = Array.from({ length: TUBE_COUNT }, (_, i) => {
    const angle = theta + (i * 2 * Math.PI) / TUBE_COUNT;
    return {
      angle,
      x: O.x + TUBE_RADIUS_PX * Math.cos(angle),
      y: O.y + TUBE_RADIUS_PX * Math.sin(angle),
    };
  });
  const highlighted = tubes[0];
  const radial = { x: (O.x - highlighted.x) / TUBE_RADIUS_PX, y: (O.y - highlighted.y) / TUBE_RADIUS_PX };
  const aLen = Math.min(55, 14 + ac * 0.9);
  const aEnd = { x: highlighted.x + radial.x * aLen, y: highlighted.y + radial.y * aLen };

  return (
    <SimShell
      title="مختبر الطرد المركزي"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      canvas={
        <svg width="300" height="260" viewBox="0 0 300 260">
          <title>محاكاة تفاعلية لجهاز طرد مركزي — غيّر السرعة الدورانية RPM وكتلة العينة وشغّل الجهاز</title>
          <DiagramDefs />
          <circle cx={O.x} cy={O.y} r={TUBE_RADIUS_PX + 18} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.4" strokeDasharray="3 5" opacity="0.5" />
          <circle cx={O.x} cy={O.y} r="10" fill="var(--text-secondary)" />

          {tubes.map((t, i) => (
            <rect
              key={i}
              x={t.x - 8}
              y={t.y - 5}
              width="16"
              height="10"
              rx="3"
              transform={`rotate(${(t.angle * 180) / Math.PI}, ${t.x}, ${t.y})`}
              fill={i === 0 ? "var(--accent-tertiary)" : "var(--accent-primary-soft)"}
              stroke={i === 0 ? "var(--accent-tertiary)" : "var(--text-tertiary)"}
              strokeWidth="1"
            />
          ))}

          <line x1={highlighted.x} y1={highlighted.y} x2={aEnd.x} y2={aEnd.y} stroke="var(--accent-primary)" strokeWidth="2.4" markerEnd="url(#arrow-primary)" />
          <VectorLabel x={(highlighted.x + aEnd.x) / 2} y={(highlighted.y + aEnd.y) / 2 - 10} color="var(--accent-primary)">Fᴄ</VectorLabel>
        </svg>
      }
      controls={
        <>
          <SimSlider label="السرعة الدورانية RPM" value={rpm} min={0} max={3000} step={50} unit="rpm" precision={0} onChange={setRpm} />
          <SimSlider label="كتلة العينة" value={sampleMassG} min={1} max={50} step={1} unit="g" precision={0} onChange={setSampleMassG} />
        </>
      }
      readouts={[
        { label: "السرعة الزاوية ω", value: `${omega.toFixed(1)} rad/s` },
        { label: "التعجيل المركزي aᴄ = ω²r", value: `${ac.toFixed(1)} m/s²` },
        { label: "القوة المركزية Fᴄ = m·aᴄ", value: `${fc.toFixed(2)} N` },
      ]}
    />
  );
}
