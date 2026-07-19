import type { ReactElement } from "react";
import { CircularMotionLab } from "./CircularMotionLab";
import { SatelliteMotionLab } from "./SatelliteMotionLab";
import { CentrifugeLab } from "./CentrifugeLab";
import { BankedRoadLab } from "./BankedRoadLab";

/** simId → interactive simulation component. Looked up by InteractiveSimBlockData. */
export const simulationRegistry: Record<string, () => ReactElement> = {
  "circular-motion-lab": CircularMotionLab,
  "satellite-motion-lab": SatelliteMotionLab,
  "centrifuge-lab": CentrifugeLab,
  "banked-road-lab": BankedRoadLab,
};
