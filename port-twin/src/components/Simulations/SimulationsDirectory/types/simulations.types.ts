export type SimulationStatus = 'running' | 'completed' | 'failed' | 'pending';

export type SimulationFilter = 'all' | SimulationStatus;

export interface Simulation {
  id: string;
  scenarioName: string;
  status: SimulationStatus;
  startedAt: string;
}

export interface SimulationStatusCount {
  status: SimulationFilter;
  label: string;
  count: number;
}
