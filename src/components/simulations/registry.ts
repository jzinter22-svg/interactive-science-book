import type { ReactElement } from "react";
import { CircularMotionLab } from "./CircularMotionLab";
import { SatelliteMotionLab } from "./SatelliteMotionLab";
import { CentrifugeLab } from "./CentrifugeLab";
import { BankedRoadLab } from "./BankedRoadLab";
import { SolarSystemSimulation } from "./solar-system/SolarSystemSimulation";
import { VectorDirectionDemo } from "./concept-demos/VectorDirectionDemo";
import { AccelerationComposerDemo } from "./concept-demos/AccelerationComposerDemo";
import { CentripetalForceDemo } from "./concept-demos/CentripetalForceDemo";
import { KeplerOrbitDemo } from "./concept-demos/KeplerOrbitDemo";
import { KeplerAreaSweepDemo } from "./concept-demos/KeplerAreaSweepDemo";

/** simId → interactive simulation component. Looked up by InteractiveSimBlockData. */
export const simulationRegistry: Record<string, () => ReactElement> = {
  "circular-motion-lab": CircularMotionLab,
  "satellite-motion-lab": SatelliteMotionLab,
  "centrifuge-lab": CentrifugeLab,
  "banked-road-lab": BankedRoadLab,
  "solar-system-lab": SolarSystemSimulation,
  "vector-direction-demo": VectorDirectionDemo,
  "acceleration-composer-demo": AccelerationComposerDemo,
  "centripetal-force-demo": CentripetalForceDemo,
  "kepler-orbit-demo": KeplerOrbitDemo,
  "kepler-area-sweep-demo": KeplerAreaSweepDemo,
};
