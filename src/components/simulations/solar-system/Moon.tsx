import { Planet } from "./Planet";
import { MOON } from "./data";

interface MoonProps {
  x: number;
  y: number;
  active: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
}

/** The Moon is just a small, ring-less, non-spinning Planet that the parent positions relative to Earth. */
export function Moon({ x, y, active, onActivate, onDeactivate }: MoonProps) {
  return (
    <Planet
      id="moon"
      x={x}
      y={y}
      radius={MOON.radius}
      color="#b7bcc4"
      name={MOON.nameAr}
      active={active}
      onActivate={onActivate}
      onDeactivate={onDeactivate}
    />
  );
}
