import type { ReactElement } from "react";
import { Figure1_1 } from "./Figure1_1";
import { Figure1_2 } from "./Figure1_2";
import { Figure1_3 } from "./Figure1_3";
import { Figure1_4 } from "./Figure1_4";
import { Figure1_5 } from "./Figure1_5";

/** diagramId → bespoke React component. Looked up by CustomDiagramBlockData. */
export const customDiagramRegistry: Record<string, () => ReactElement> = {
  "fig-1-1-centripetal-acceleration": Figure1_1,
  "fig-1-2-resultant-acceleration": Figure1_2,
  "fig-1-3-centripetal-force": Figure1_3,
  "fig-1-4-keplers-first-law": Figure1_4,
  "fig-1-5-keplers-second-law": Figure1_5,
};
