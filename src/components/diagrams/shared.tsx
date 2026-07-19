import type { ReactNode } from "react";

/** Shared arrowhead marker defs — every bespoke physics diagram references these by id. */
export function DiagramDefs() {
  return (
    <defs>
      <marker id="arrow-primary" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent-primary)" />
      </marker>
      <marker id="arrow-secondary" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent-secondary)" />
      </marker>
      <marker id="arrow-tertiary" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent-tertiary)" />
      </marker>
      <marker id="arrow-neutral" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 Z" fill="var(--text-tertiary)" />
      </marker>
      <marker id="arrow-quaternary" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent-quaternary)" />
      </marker>
    </defs>
  );
}

interface VectorLabelProps {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
  anchor?: "start" | "middle" | "end";
}

/** Consistent bold label for a vector/point, positioned in diagram-local coordinates. */
export function VectorLabel({ x, y, children, color = "var(--text-primary)", anchor = "middle" }: VectorLabelProps) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      textAnchor={anchor}
      fontSize="13"
      fontWeight="700"
      fontFamily="Cairo, sans-serif"
      style={{ direction: "ltr" }}
    >
      {children}
    </text>
  );
}
