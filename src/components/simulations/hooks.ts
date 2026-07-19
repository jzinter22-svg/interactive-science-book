import { useEffect, useRef, useState } from "react";

/**
 * Runs `callback` once per animation frame while `running` is true,
 * passing the elapsed time in seconds since the previous frame. Capped
 * at 50ms/frame so a tab coming back from background doesn't produce a
 * huge simulation jump.
 */
export function useRafLoop(callback: (dtSeconds: number) => void, running: boolean) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!running) return;
    let frameId: number;
    let lastTime: number | null = null;

    const tick = (time: number) => {
      if (lastTime !== null) {
        const dt = Math.min(0.05, (time - lastTime) / 1000);
        callbackRef.current(dt);
      }
      lastTime = time;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [running]);
}

/** True while `ref`'s element has any part inside the viewport. */
export function useInViewport<T extends Element>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
