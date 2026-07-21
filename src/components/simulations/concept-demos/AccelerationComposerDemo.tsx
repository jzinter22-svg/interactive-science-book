import { useState } from "react";
import { DiagramDefs, VectorLabel } from "../../diagrams/shared";
import { SimSlider } from "../SimSlider";
import { ConceptDemoShell } from "./ConceptDemoShell";

const O = { x: 150, y: 130 };
const R = 90;
const THETA = -0.7;
const SCALE = 7; // px per unit of acceleration

/**
 * Replaces the static Figure 1-2. Two independent sliders control the
 * magnitude of the tangential and centripetal components; the resultant
 * vector and its parallelogram construction redraw live, so the student
 * builds the vector-sum intuition themselves instead of reading it off
 * one fixed drawing.
 */
export function AccelerationComposerDemo() {
  const [aT, setAT] = useState(3);
  const [aC, setAC] = useState(5);

  const P = { x: O.x + R * Math.cos(THETA), y: O.y + R * Math.sin(THETA) };
  const tangent = { x: -Math.sin(THETA), y: Math.cos(THETA) };
  const radial = { x: (O.x - P.x) / R, y: (O.y - P.y) / R };

  const aCVec = { x: radial.x * aC * SCALE, y: radial.y * aC * SCALE };
  const aTVec = { x: tangent.x * aT * SCALE, y: tangent.y * aT * SCALE };
  const resultant = { x: aCVec.x + aTVec.x, y: aCVec.y + aTVec.y };

  const aCEnd = { x: P.x + aCVec.x, y: P.y + aCVec.y };
  const aTEnd = { x: P.x + aTVec.x, y: P.y + aTVec.y };
  const rEnd = { x: P.x + resultant.x, y: P.y + resultant.y };

  const magnitude = Math.hypot(resultant.x, resultant.y) / SCALE;

  return (
    <ConceptDemoShell
      title="جرّب بنفسك: تركيب التعجيلين"
      hint={`المحصلة a تتغيّر مقداراً واتجاهاً كلما غيّرت aᵀ أو aᴄ — المقدار الحالي لِـ a ≈ ${magnitude.toFixed(1)} (بوحدات تعسّفية).`}
      sliders={
        <>
          <SimSlider label="التعجيل المماسي aᵀ" value={aT} min={0} max={8} step={0.5} onChange={setAT} />
          <SimSlider label="التعجيل المركزي aᴄ" value={aC} min={0} max={8} step={0.5} onChange={setAC} />
        </>
      }
      canvas={
        <svg width="300" height="260" viewBox="0 0 300 260">
          <title>غيّر مقداري التعجيل المماسي والمركزي وراقب محصلتهما</title>
          <DiagramDefs />

          {aC > 0.05 && aT > 0.05 && (
            <>
              <line x1={aCEnd.x} y1={aCEnd.y} x2={rEnd.x} y2={rEnd.y} stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1={aTEnd.x} y1={aTEnd.y} x2={rEnd.x} y2={rEnd.y} stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="3 3" />
            </>
          )}

          <circle cx={P.x} cy={P.y} r="3.6" fill="var(--text-primary)" />
          <VectorLabel x={P.x + 10} y={P.y - 8}>P</VectorLabel>

          {aC > 0.05 && (
            <>
              <line x1={P.x} y1={P.y} x2={aCEnd.x} y2={aCEnd.y} stroke="var(--accent-primary)" strokeWidth="2.4" markerEnd="url(#arrow-primary)" />
              <VectorLabel x={aCEnd.x - 18} y={aCEnd.y - 4} color="var(--accent-primary)">aᴄ</VectorLabel>
            </>
          )}

          {aT > 0.05 && (
            <>
              <line x1={P.x} y1={P.y} x2={aTEnd.x} y2={aTEnd.y} stroke="var(--accent-secondary)" strokeWidth="2.4" markerEnd="url(#arrow-secondary)" />
              <VectorLabel x={aTEnd.x + 16} y={aTEnd.y - 2} color="var(--accent-secondary)">aᵀ</VectorLabel>
            </>
          )}

          {magnitude > 0.05 && (
            <>
              <line x1={P.x} y1={P.y} x2={rEnd.x} y2={rEnd.y} stroke="var(--accent-quaternary)" strokeWidth="2.8" markerEnd="url(#arrow-quaternary)" />
              <VectorLabel x={rEnd.x - 8} y={rEnd.y + 18} color="var(--accent-quaternary)">a</VectorLabel>
            </>
          )}
        </svg>
      }
    />
  );
}
