import type { ReactElement } from "react";

/**
 * diagramId → bespoke, static React component. Looked up by
 * CustomDiagramBlockData. Empty for now — every figure that used to
 * live here (Figures 1-1 through 1-5) was upgraded to a genuine
 * interactive simulation in src/components/simulations/concept-demos/,
 * per the "every image becomes an interaction" content policy. This
 * mechanism stays available for the rare future figure where a static
 * illustration is the more scientifically accurate choice.
 */
export const customDiagramRegistry: Record<string, () => ReactElement> = {};
