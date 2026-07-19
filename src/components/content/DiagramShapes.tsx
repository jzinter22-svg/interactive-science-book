import type { DiagramShape } from "../../content/types";

/**
 * Renders a diagram purely from data. Keeping this to a small set of
 * primitives (circle/polygon/line) means a future chapter can describe
 * its own simple physics diagrams as plain data — no new component, no
 * UI change — while anything genuinely bespoke can still be built as a
 * one-off React component later without touching this contract.
 */
export function DiagramShapes({ shapes }: { shapes: DiagramShape[] }) {
  return (
    <>
      {shapes.map((shape, i) => {
        switch (shape.kind) {
          case "circle":
            return (
              <circle key={i} cx={shape.cx} cy={shape.cy} r={shape.r} fill="none" stroke="currentColor" strokeWidth="2" />
            );
          case "polygon":
            return <polygon key={i} points={shape.points} fill="none" stroke="currentColor" strokeWidth="2" />;
          case "line":
            return (
              <line
                key={i}
                x1={shape.x1}
                y1={shape.y1}
                x2={shape.x2}
                y2={shape.y2}
                stroke="currentColor"
                strokeWidth={shape.dashed ? 1 : 2}
                strokeDasharray={shape.dashed ? "4 4" : undefined}
              />
            );
          default: {
            const _exhaustive: never = shape;
            return _exhaustive;
          }
        }
      })}
    </>
  );
}
