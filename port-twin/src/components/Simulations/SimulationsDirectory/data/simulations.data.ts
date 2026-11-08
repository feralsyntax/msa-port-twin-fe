import type { SimulationStatusCount, Simulation } from '../types/simulations.types';

export const simulationStatusCounts: SimulationStatusCount[] = [
  { status: 'all', label: 'All Runs', count: 18 },
  { status: 'running', label: 'Running', count: 1 },
  { status: 'completed', label: 'Completed', count: 15 },
  { status: 'failed', label: 'Failed', count: 1 },
  { status: 'pending', label: 'Pending', count: 1 },
];

export const simulations: Simulation[] = [
  {
    id: 'sim_9a4b8e',
    scenarioName: 'Scenario A: Baseline',
    status: 'completed',
    startedAt: '12 May, 14:08',
  },
  {
    id: 'sim_8f2a1c',
    scenarioName: 'Scenario B: Berth 2 Closed',
    status: 'running',
    startedAt: '12 May, 14:20',
  },
  {
    id: 'sim_7c1f4a',
    scenarioName: 'Scenario C: Heavy Traffic',
    status: 'pending',
    startedAt: '12 May, 14:22',
  },
  {
    id: 'sim_3d9e2b',
    scenarioName: 'Scenario A: Baseline',
    status: 'completed',
    startedAt: '12 May, 11:30',
  },
  {
    id: 'sim_2e5d7c',
    scenarioName: 'Scenario D: Storm Conditions',
    status: 'failed',
    startedAt: '11 May, 16:45',
  },
  {
    id: 'sim_5b8a1f',
    scenarioName: 'Scenario A: Baseline',
    status: 'completed',
    startedAt: '11 May, 09:15',
  },
];
