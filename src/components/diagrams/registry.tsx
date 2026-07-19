import type { ReactElement } from "react";
import { Figure1_1 } from "./Figure1_1";
import { Figure1_2 } from "./Figure1_2";
import { Figure1_3 } from "./Figure1_3";

/** diagramId → bespoke React component. Looked up by CustomDiagramBlockData. */
export const customDiagramRegistry: Record<string, () => ReactElement> = {
  "fig-1-1-centripetal-acceleration": Figure1_1,
  "fig-1-2-resultant-acceleration": Figure1_2,
  "fig-1-3-centripetal-force": Figure1_3,
};
