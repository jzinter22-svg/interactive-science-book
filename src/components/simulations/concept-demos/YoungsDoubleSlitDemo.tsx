import { useState } from "react";
import { VectorLabel } from "../../diagrams/shared";
import { SimSlider } from "../SimSlider";
import { ConceptDemoShell } from "./ConceptDemoShell";
import { wavelengthToRGB } from "./wavelengthColor";

const BARRIER_X = 110;
const SCREEN_Y_TOP = 20;
const SCREEN_Y_BOTTOM = 240;
const CENTER_Y = 130;
const PX_PER_MM = 18; // schematic — real fringe spacing is sub-millimeter, scaled up for legibility

/**
 * Replaces the static Figures 2-3/2-4/2-5 (Young's-experiment apparatus
 * photo and its two ray-diagram redraws) with one live double-slit
 * simulation. Independent sliders for slit separation a, screen distance
 * D, and wavelength λ recompute the fringe spacing X = λD/a and redraw
 * the actual bright/dark pattern on the screen — including the swatch
 * color shifting with λ, so changing color visibly changes fringe
 * spacing exactly as the formula predicts.
 */
export function YoungsDoubleSlitDemo() {
  const [aMm, setAMm] = useState(0.4);
  const [dM, setDM] = useState(1.0);
  const [lambdaNm, setLambdaNm] = useState(590);

  const lambdaM = lambdaNm * 1e-9;
  const aM = aMm * 1e-3;
  const xMm = (lambdaM * dM) / aM / 1e-3;
  const xPx = xMm * PX_PER_MM;

  const halfSepPx = 10 + ((aMm - 0.2) / (1.0 - 0.2)) * 20;
  const screenX = 200 + ((dM - 0.5) / (2.0 - 0.5)) * 70;
  const color = wavelengthToRGB(lambdaNm);

  const s1y = CENTER_Y - halfSepPx;
  const s2y = CENTER_Y + halfSepPx;
  const gapHalf = 4;

  const fringeCount = Math.min(120, Math.round((SCREEN_Y_BOTTOM - SCREEN_Y_TOP) / 2));

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: تجربة يونك للشقين"
      hint={`مسافة الشقين a = ${aMm.toFixed(1)} mm، بُعد الشاشة D = ${dM.toFixed(1)} m، الطول الموجي λ = ${lambdaNm} nm ⇐ المسافة بين الهدابين X = λD/a ≈ ${xMm.toFixed(2)} mm.`}
      sliders={
        <>
          <SimSlider label="المسافة بين الشقين a" value={aMm} min={0.2} max={1.0} step={0.1} unit="mm" onChange={setAMm} />
          <SimSlider label="بُعد الشاشة D" value={dM} min={0.5} max={2.0} step={0.1} unit="m" onChange={setDM} />
          <SimSlider label="الطول الموجي λ" value={lambdaNm} min={400} max={700} step={10} unit="nm" precision={0} onChange={setLambdaNm} />
        </>
      }
      canvas={
        <svg width="300" height="260" viewBox="0 0 300 260">
          <title>غيّر مسافة الشقين وبعد الشاشة والطول الموجي وراقب نمط الأهداب يتغيّر على الشاشة</title>

          <circle cx="22" cy={CENTER_Y} r="5" fill={color} />
          <VectorLabel x={22} y={CENTER_Y + 20} color="var(--text-tertiary)">مصدر</VectorLabel>
          <line x1="27" y1={CENTER_Y} x2={BARRIER_X - 2} y2={s1y} stroke={color} strokeWidth="1" opacity="0.35" />
          <line x1="27" y1={CENTER_Y} x2={BARRIER_X - 2} y2={s2y} stroke={color} strokeWidth="1" opacity="0.35" />

          <rect x={BARRIER_X} y={SCREEN_Y_TOP} width="6" height={s1y - gapHalf - SCREEN_Y_TOP} fill="var(--text-secondary)" />
          <rect x={BARRIER_X} y={s1y + gapHalf} width="6" height={s2y - gapHalf - (s1y + gapHalf)} fill="var(--text-secondary)" />
          <rect x={BARRIER_X} y={s2y + gapHalf} width="6" height={SCREEN_Y_BOTTOM - (s2y + gapHalf)} fill="var(--text-secondary)" />
          <VectorLabel x={BARRIER_X - 14} y={s1y + 3} color="var(--text-secondary)">S1</VectorLabel>
          <VectorLabel x={BARRIER_X - 14} y={s2y + 3} color="var(--text-secondary)">S2</VectorLabel>

          <line x1={BARRIER_X + 8} y1={s1y} x2={screenX - 8} y2={SCREEN_Y_TOP + 4} stroke={color} strokeWidth="0.8" opacity="0.2" />
          <line x1={BARRIER_X + 8} y1={s2y} x2={screenX - 8} y2={SCREEN_Y_BOTTOM - 4} stroke={color} strokeWidth="0.8" opacity="0.2" />

          <rect x={screenX - 7} y={SCREEN_Y_TOP} width="14" height={SCREEN_Y_BOTTOM - SCREEN_Y_TOP} fill="var(--bg-surface-sunken)" />
          {Array.from({ length: fringeCount }, (_, i) => {
            const y = SCREEN_Y_TOP + i * 2 + 1;
            const yRel = y - CENTER_Y;
            const intensity = Math.cos((Math.PI * yRel) / xPx) ** 2;
            return <rect key={i} x={screenX - 6} y={y} width="12" height="2.2" fill={color} opacity={intensity} />;
          })}
          <rect x={screenX - 7} y={SCREEN_Y_TOP} width="14" height={SCREEN_Y_BOTTOM - SCREEN_Y_TOP} fill="none" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
        </svg>
      }
    />
  );
}
