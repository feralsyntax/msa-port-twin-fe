import type { SimulationRunStatusEnum } from "../../../../api/models";

export type SimulationStatus = SimulationRunStatusEnum;

export type SimulationFilter = 'all' | SimulationStatus;

export interface SimulationStatusCount {
  status: SimulationFilter;
  label: string;
  count: number;
}
