import { useCallback, useState } from "react";
import { DiagramDefs, VectorLabel } from "../../diagrams/shared";
import { useRafLoop } from "../hooks";
import { SimSlider } from "../SimSlider";
import { ConceptDemoShell } from "./ConceptDemoShell";

const O = { x: 150, y: 130 };
const PX_PER_CM = 15;
const V_T = 1.2; // m/s — a real CD/DVD player's constant linear read velocity
const SPOKE_COUNT = 8;
const VISUAL_SPIN_SCALE = 0.18; // slows the on-screen spin for legibility; the ω/rpm readouts stay the real computed values

/**
 * Replaces the "هل تعلم؟" CD/DVD player box. The laser reads at a fixed
 * point in space while the disc spins beneath it; dragging the read
 * radius (via the slider, mirroring the drive moving the head between
 * a CD's real 2.2–5.8 cm track range) keeps vₜ = ωr fixed at 1.2 m/s —
 * exactly why the motor must spin faster near the center and slower
 * near the rim, which is the whole point of the original textbook box.
 */
export function ConstantLinearVelocityDemo() {
  const [rCm, setRCm] = useState(4);
  const [phi, setPhi] = useState(0);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);

  const rM = rCm / 100;
  const omega = V_T / rM; // rad/s
  const rpm = (omega * 60) / (2 * Math.PI);

  useRafLoop((dt) => setPhi((p) => p + omega * VISUAL_SPIN_SCALE * dt), running && inView);

  const reset = useCallback(() => {
    setRCm(4);
    setPhi(0);
    setRunning(true);
  }, []);

  const trackPx = rCm * PX_PER_CM;
  const headPos = { x: O.x + trackPx, y: O.y };
  const discOuterPx = 5.8 * PX_PER_CM + 6;

  const spokes = Array.from({ length: SPOKE_COUNT }, (_, i) => {
    const angle = phi + (i * 2 * Math.PI) / SPOKE_COUNT;
    return {
      x1: O.x + 8 * Math.cos(angle),
      y1: O.y + 8 * Math.sin(angle),
      x2: O.x + discOuterPx * Math.cos(angle),
      y2: O.y + discOuterPx * Math.sin(angle),
    };
  });

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: القرص المرن — vₜ ثابتة رغم تغيّر r"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={reset}
      onVisibilityChange={setInView}
      hint={`عند نصف قطر قراءة r = ${rCm.toFixed(1)} cm يجب أن يدور القرص بسرعة ω ≈ ${omega.toFixed(1)} rad/s (≈ ${rpm.toFixed(0)} rpm) ليبقى vₜ = ωr = ${V_T.toFixed(1)} m/s ثابتاً — لهذا يدور القرص أسرع كلما اقترب رأس القراءة من المركز.`}
      sliders={<SimSlider label="نصف قطر رأس القراءة r" value={rCm} min={2.2} max={5.8} step={0.1} unit="cm" onChange={setRCm} />}
      canvas={
        <svg width="300" height="260" viewBox="0 0 300 260">
          <title>غيّر نصف قطر رأس القراءة لترى أن سرعة دوران القرص تتغيّر للحفاظ على سرعة خطية ثابتة عند الرأس</title>
          <DiagramDefs />

          <circle cx={O.x} cy={O.y} r={discOuterPx} fill="var(--accent-primary-soft)" stroke="var(--text-tertiary)" strokeWidth="1.6" opacity="0.85" />
          <circle cx={O.x} cy={O.y} r={12} fill="var(--bg-surface)" stroke="var(--text-tertiary)" strokeWidth="1.4" />

          {spokes.map((s, i) => (
            <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.35" />
          ))}

          <circle cx={O.x} cy={O.y} r={trackPx} fill="none" stroke="var(--accent-secondary)" strokeWidth="1.6" strokeDasharray="3 4" opacity="0.8" />

          <line x1={O.x} y1={O.y - discOuterPx - 22} x2={O.x} y2={O.y + discOuterPx + 22} stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.5" />
          <VectorLabel x={O.x} y={O.y - discOuterPx - 30} color="var(--text-tertiary)">رأس القراءة (ثابت)</VectorLabel>

          <circle cx={headPos.x} cy={headPos.y} r="7" fill="var(--accent-tertiary)" stroke="var(--bg-surface)" strokeWidth="1.6" />
          <line x1={headPos.x} y1={headPos.y} x2={headPos.x} y2={headPos.y - 40} stroke="var(--accent-primary)" strokeWidth="2.4" markerEnd="url(#arrow-primary)" />
          <VectorLabel x={headPos.x + 20} y={headPos.y - 30} color="var(--accent-primary)">vₜ</VectorLabel>
        </svg>
      }
    />
  );
}
