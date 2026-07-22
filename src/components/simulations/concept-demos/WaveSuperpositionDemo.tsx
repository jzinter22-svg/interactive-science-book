import { useState } from "react";
import { VectorLabel } from "../../diagrams/shared";
import { useRafLoop } from "../hooks";
import { SimSlider } from "../SimSlider";
import { ConceptDemoShell } from "./ConceptDemoShell";

const WIDTH = 280;
const WAVELENGTH_PX = WIDTH / 3;
const AMPLITUDE = 22;
const OMEGA = 2.4; // rad/s, traveling-wave animation speed

function wavePath(width: number, centerY: number, amplitude: number, phase: number) {
  const points: string[] = [];
  for (let x = 0; x <= width; x += 4) {
    const y = centerY - amplitude * Math.sin((2 * Math.PI * x) / WAVELENGTH_PX - phase);
    points.push(`${x},${y.toFixed(1)}`);
  }
  return `M ${points.join(" L ")}`;
}

/**
 * Replaces the static Figure 2-1 (four hand-drawn superposition sketches).
 * Two coherent waves travel together; a path-difference slider (in units
 * of λ) sets their relative phase, and the resultant A+B redraws live —
 * doubling in amplitude at Δl = 0, λ, 2λ... (constructive) and vanishing
 * at Δl = λ/2, 3λ/2... (destructive), exactly the two conditions the
 * source text states.
 */
export function WaveSuperpositionDemo() {
  const [pathDiff, setPathDiff] = useState(0); // in units of λ
  const [phaseT, setPhaseT] = useState(0);
  const [running, setRunning] = useState(true);
  const [inView, setInView] = useState(true);

  useRafLoop((dt) => setPhaseT((p) => p + OMEGA * dt), running && inView);

  const phi = 2 * Math.PI * pathDiff;
  const resultAmplitude = 2 * Math.abs(Math.cos(phi / 2));
  const isConstructive = Math.abs(pathDiff % 1) < 0.05 || Math.abs((pathDiff % 1) - 1) < 0.05;
  const isDestructive = Math.abs((pathDiff % 1) - 0.5) < 0.05;
  const state = isConstructive ? "تداخل بنّاء (تقوية)" : isDestructive ? "تداخل اتلافي (إلغاء)" : "تداخل جزئي";

  const laneA = 42;
  const laneB = 122;
  const laneC = 202;
  const height = 240;

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: تراكب موجتين متشاكهتين"
      running={running}
      onToggleRunning={() => setRunning((r) => !r)}
      onReset={() => {
        setPathDiff(0);
        setRunning(true);
      }}
      onVisibilityChange={setInView}
      hint={`فرق المسار Δl = ${pathDiff.toFixed(2)}λ — الحالة: ${state}. سعة المحصلة ≈ ${resultAmplitude.toFixed(2)} × سعة الموجة الواحدة.`}
      sliders={<SimSlider label="فرق المسار البصري Δl" value={pathDiff} min={0} max={2} step={0.25} unit="λ" precision={2} onChange={setPathDiff} />}
      canvas={
        <svg width={WIDTH} height={height} viewBox={`0 0 ${WIDTH} ${height}`}>
          <title>غيّر فرق المسار بين الموجتين وراقب المحصلة تتقوى أو تتلاشى</title>

          <path d={wavePath(WIDTH, laneA, AMPLITUDE, phaseT)} fill="none" stroke="var(--accent-primary)" strokeWidth="2.4" strokeLinejoin="round" />
          <VectorLabel x={30} y={laneA - AMPLITUDE - 12} color="var(--accent-primary)" anchor="start">A</VectorLabel>

          <path d={wavePath(WIDTH, laneB, AMPLITUDE, phaseT + phi)} fill="none" stroke="var(--accent-secondary)" strokeWidth="2.4" strokeLinejoin="round" />
          <VectorLabel x={30} y={laneB - AMPLITUDE - 12} color="var(--accent-secondary)" anchor="start">B</VectorLabel>

          <line x1="0" y1={laneC - AMPLITUDE * 2 - 6} x2={WIDTH} y2={laneC - AMPLITUDE * 2 - 6} stroke="var(--glass-border-soft)" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="0" y1={laneC + AMPLITUDE * 2 + 6} x2={WIDTH} y2={laneC + AMPLITUDE * 2 + 6} stroke="var(--glass-border-soft)" strokeWidth="1" strokeDasharray="2 4" />
          <path
            d={Array.from({ length: WIDTH / 4 + 1 }, (_, i) => {
              const x = i * 4;
              const y = laneC - AMPLITUDE * Math.sin((2 * Math.PI * x) / WAVELENGTH_PX - phaseT) - AMPLITUDE * Math.sin((2 * Math.PI * x) / WAVELENGTH_PX - phaseT - phi);
              return `${x},${y.toFixed(1)}`;
            }).reduce((acc, p, i) => (i === 0 ? `M ${p}` : `${acc} L ${p}`), "")}
            fill="none"
            stroke="var(--accent-tertiary)"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <VectorLabel x={30} y={laneC - AMPLITUDE * 2 - 14} color="var(--accent-tertiary)" anchor="start">A + B</VectorLabel>
        </svg>
      }
    />
  );
}
