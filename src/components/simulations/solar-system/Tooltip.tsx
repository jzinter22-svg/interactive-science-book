import styles from "./SolarSystemSimulation.module.css";

interface TooltipProps {
  x: number;
  y: number;
  radius: number;
  name: string;
  description: string;
  viewBoxWidth: number;
  viewBoxHeight: number;
}

const WIDTH = 208;
const PADDING_Y = 10;
const NAME_LINE_HEIGHT = 17;
const DESC_LINE_HEIGHT = 14;
const MAX_CHARS_PER_LINE = 24;

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Educational tooltip shown while a planet/moon/sun is hovered, focused, or tapped. Pure SVG, so it shares the exact coordinate system as the bodies it labels. */
export function Tooltip({ x, y, radius, name, description, viewBoxWidth, viewBoxHeight }: TooltipProps) {
  const descLines = wrapText(description, MAX_CHARS_PER_LINE);
  const height = PADDING_Y * 2 + NAME_LINE_HEIGHT + descLines.length * DESC_LINE_HEIGHT;

  const halfWidth = WIDTH / 2;
  const centerX = Math.min(Math.max(x, halfWidth + 8), viewBoxWidth - halfWidth - 8);

  let top = y - radius - 12 - height;
  if (top < 6) top = y + radius + 12;
  top = Math.min(top, viewBoxHeight - height - 6);

  return (
    <g className={styles.tooltip} transform={`translate(${centerX - halfWidth} ${top})`} aria-hidden="true">
      <rect width={WIDTH} height={height} rx="10" className={styles.tooltipBg} />
      <text x={halfWidth} y={PADDING_Y + NAME_LINE_HEIGHT - 4} textAnchor="middle" className={styles.tooltipName}>
        {name}
      </text>
      {descLines.map((line, i) => (
        <text
          key={i}
          x={halfWidth}
          y={PADDING_Y + NAME_LINE_HEIGHT + (i + 1) * DESC_LINE_HEIGHT - 3}
          textAnchor="middle"
          className={styles.tooltipDesc}
        >
          {line}
        </text>
      ))}
    </g>
  );
}
