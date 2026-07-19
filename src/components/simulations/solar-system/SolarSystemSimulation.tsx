import { useRef, useState } from "react";
import { useRafLoop, useInViewport, useDocumentVisible, usePrefersReducedMotion } from "../hooks";
import { Orbit } from "./Orbit";
import { Planet } from "./Planet";
import { Moon } from "./Moon";
import { Stars } from "./Stars";
import { Tooltip } from "./Tooltip";
import { PLANETS, SUN, MOON } from "./data";
import styles from "./SolarSystemSimulation.module.css";

const VIEW = 700;
const CENTER = { x: VIEW / 2, y: VIEW / 2 };

type ActiveBody = { id: string; x: number; y: number; radius: number; name: string; description: string } | null;

/**
 * A fully interactive Solar System — replaces the static hero photo in
 * Lesson One. Every orbit runs at its own angular velocity (Mercury
 * fastest, Neptune slowest), Earth spins on its axis while the Moon
 * orbits it and both revolve around the Sun together, and every body is
 * hoverable/tappable/focusable for a name + one-line educational blurb.
 * Pauses the moment the tab is hidden, the card scrolls off-screen, or
 * the user's OS asks for reduced motion.
 */
export function SolarSystemSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInViewport(containerRef);
  const docVisible = useDocumentVisible();
  const reducedMotion = usePrefersReducedMotion();

  const [manualRunning, setManualRunning] = useState(true);
  const [time, setTime] = useState(0);
  const [active, setActive] = useState<ActiveBody>(null);

  const running = !reducedMotion && manualRunning && inView && docVisible;
  useRafLoop((dt) => setTime((t) => t + dt), running);

  const planetPositions = PLANETS.map((p) => {
    const angle = p.startAngle + p.angularVelocity * time;
    return { ...p, x: CENTER.x + p.orbitRadius * Math.cos(angle), y: CENTER.y + p.orbitRadius * Math.sin(angle) };
  });

  const earth = planetPositions.find((p) => p.isEarth)!;
  const moonAngle = time * MOON.angularVelocity;
  const moon = {
    x: earth.x + MOON.orbitRadius * Math.cos(moonAngle),
    y: earth.y + MOON.orbitRadius * Math.sin(moonAngle),
  };

  const activate = (body: ActiveBody) => setActive(body);
  const deactivate = () => setActive(null);

  return (
    <div ref={containerRef} className={`glass-surface-strong ${styles.wrap}`} data-running={running}>
      <div className={styles.toolbar}>
        <h4 className={styles.title}>محاكاة تفاعلية: المجموعة الشمسية</h4>
        {reducedMotion ? (
          <span className={styles.reducedMotionNote}>الحركة مصغّرة حسب إعدادات جهازك</span>
        ) : (
          <button
            type="button"
            className={styles.playButton}
            onClick={() => setManualRunning((r) => !r)}
            aria-label={manualRunning ? "إيقاف الحركة" : "تشغيل الحركة"}
          >
            {manualRunning ? <PauseIcon /> : <PlayIcon />}
          </button>
        )}
      </div>

      <div className={styles.canvasWrap}>
        <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className={styles.svg} role="img" aria-label="محاكاة المجموعة الشمسية: الشمس والكواكب الثمانية والقمر">
          <defs>
            <radialGradient id="sun-gradient" cx="35%" cy="32%">
              <stop offset="0%" stopColor="#fff6d5" />
              <stop offset="45%" stopColor="#ffd166" />
              <stop offset="100%" stopColor="#f2994a" />
            </radialGradient>
          </defs>

          <Stars width={VIEW} height={VIEW} />

          {PLANETS.map((p) => (
            <Orbit key={p.id} cx={CENTER.x} cy={CENTER.y} radius={p.orbitRadius} />
          ))}

          <g
            className={styles.sunGroup}
            tabIndex={0}
            role="button"
            aria-label={SUN.nameAr}
            onMouseEnter={() => activate({ id: "sun", x: CENTER.x, y: CENTER.y, radius: SUN.radius, name: SUN.nameAr, description: SUN.description })}
            onMouseLeave={deactivate}
            onFocus={() => activate({ id: "sun", x: CENTER.x, y: CENTER.y, radius: SUN.radius, name: SUN.nameAr, description: SUN.description })}
            onBlur={deactivate}
            onClick={() =>
              active?.id === "sun" ? deactivate() : activate({ id: "sun", x: CENTER.x, y: CENTER.y, radius: SUN.radius, name: SUN.nameAr, description: SUN.description })
            }
          >
            <circle className={styles.sunGlow} cx={CENTER.x} cy={CENTER.y} r={SUN.radius * 1.9} fill="url(#sun-gradient)" opacity="0.28" />
            <circle
              className={styles.sunCorona}
              cx={CENTER.x}
              cy={CENTER.y}
              r={SUN.radius * 1.35}
              fill="none"
              stroke="#ffb347"
              strokeWidth="2"
              strokeDasharray="4 10"
              opacity="0.65"
            />
            <circle cx={CENTER.x} cy={CENTER.y} r={SUN.radius} fill="url(#sun-gradient)" />
          </g>

          {planetPositions.map((p) => (
            <Planet
              key={p.id}
              id={p.id}
              x={p.x}
              y={p.y}
              radius={p.radius}
              color={p.color}
              name={p.nameAr}
              hasRing={p.hasRing}
              spinning={p.isEarth}
              active={active?.id === p.id}
              onActivate={() => activate({ id: p.id, x: p.x, y: p.y, radius: p.radius, name: p.nameAr, description: p.description })}
              onDeactivate={deactivate}
            />
          ))}

          <Moon
            x={moon.x}
            y={moon.y}
            active={active?.id === "moon"}
            onActivate={() => activate({ id: "moon", x: moon.x, y: moon.y, radius: MOON.radius, name: MOON.nameAr, description: MOON.description })}
            onDeactivate={deactivate}
          />

          {active && (
            <Tooltip
              x={active.x}
              y={active.y}
              radius={active.radius}
              name={active.name}
              description={active.description}
              viewBoxWidth={VIEW}
              viewBoxHeight={VIEW}
            />
          )}
        </svg>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <rect x="6.5" y="5.5" width="4" height="13" rx="1" />
      <rect x="13.5" y="5.5" width="4" height="13" rx="1" />
    </svg>
  );
}
