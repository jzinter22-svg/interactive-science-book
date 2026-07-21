/**
 * Focus-based ellipse geometry, shared by the Figure 1-4 (Kepler's
 * first law) and Figure 1-5 (Kepler's second law) demos so both use the
 * exact same, physically accurate orbit rather than two approximations
 * that could quietly disagree with each other.
 *
 * Convention: the focus (the "مركز الجذب") is fixed on screen; the true
 * anomaly `nu` is measured from the focus with nu = π at periapsis (the
 * near vertex, on the opposite side of the focus from the ellipse's
 * center) and nu = 0 at apoapsis (the far vertex, same side as the
 * center). This keeps the occupied focus stationary as eccentricity
 * changes, which is what a real gravitating body does — only the far
 * side of the orbit stretches out.
 */
export interface OrbitParams {
  focusX: number;
  focusY: number;
  /** Semi-major axis, a. */
  semiMajor: number;
  /** 0 = circle, approaching 1 = very elongated. */
  eccentricity: number;
}

export function ellipseCenter({ focusX, focusY, semiMajor, eccentricity }: OrbitParams) {
  const c = semiMajor * eccentricity;
  return { x: focusX + c, y: focusY };
}

export function semiMinor({ semiMajor, eccentricity }: OrbitParams) {
  return semiMajor * Math.sqrt(1 - eccentricity * eccentricity);
}

/** Distance from the focus at true anomaly `nu` (radians). */
export function radiusAt({ semiMajor: a, eccentricity: e }: OrbitParams, nu: number) {
  return (a * (1 - e * e)) / (1 - e * Math.cos(nu));
}

/** The orbiting body's (x, y, r) at true anomaly `nu`. */
export function positionAt(params: OrbitParams, nu: number) {
  const r = radiusAt(params, nu);
  return { x: params.focusX + r * Math.cos(nu), y: params.focusY + r * Math.sin(nu), r };
}

/**
 * Kepler's second law, exactly: dA/dt = ½r²(dν/dt) is constant, so the
 * angular rate is proportional to 1/r². `baseRate` is the rate at
 * r = semiMajor (a representative middle distance), which keeps a full
 * orbit's average period roughly the same regardless of eccentricity.
 */
export function angularRate(params: OrbitParams, nu: number, baseRate: number) {
  const r = radiusAt(params, nu);
  const a = params.semiMajor;
  return (baseRate * (a * a)) / (r * r);
}
