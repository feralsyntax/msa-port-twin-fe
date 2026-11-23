const app = '/app';

export const routes = {
  home: () => '/',
  app: () => app,
  dashboard: () => app,
  vessels: () => `${app}/vessels`,
  vesselNew: () => `${app}/vessels/new`,
  vessel: (id: string) => `${app}/vessels/${encodeURIComponent(id)}`,
  berths: () => `${app}/berths`,
  berthNew: () => `${app}/berths/new`,
  berth: (id: string) => `${app}/berths/${encodeURIComponent(id)}`,
  scenarios: () => `${app}/scenarios`,
  scenarioNew: () => `${app}/scenarios/new`,
  scenario: (id: string) => `${app}/scenarios/${encodeURIComponent(id)}`,
  simulations: () => `${app}/simulations`,
  simulationNew: () => `${app}/simulations/new`,
  simulation: (id: string) => `${app}/simulations/${encodeURIComponent(id)}`,
  compare: (runA?: string, runB?: string) => {
    const params = new URLSearchParams();
    if (runA) params.set('run_a', runA);
    if (runB) params.set('run_b', runB);
    const query = params.toString();
    return `${app}/simulations/compare${query ? `?${query}` : ''}`;
  },
  predictions: () => `${app}/predictions`,
  predictionNew: () => `${app}/predictions/new`,
  prediction: (id: string) => `${app}/predictions/${encodeURIComponent(id)}`,
  map: () => `${app}/map`,
  about: () => `${app}/about`,
};

export const appRoutePaths = {
  vessels: 'vessels',
  vessel: 'vessels/:vesselId',
  vesselNew: 'vessels/new',
  berths: 'berths',
  berth: 'berths/:berthId',
  berthNew: 'berths/new',
  scenarios: 'scenarios',
  scenario: 'scenarios/:scenarioId',
  scenarioNew: 'scenarios/new',
  simulations: 'simulations',
  simulation: 'simulations/:simulationId',
  simulationNew: 'simulations/new',
  compare: 'simulations/compare',
  predictions: 'predictions',
  prediction: 'predictions/:predictionId',
  predictionNew: 'predictions/new',
  map: 'map',
  about: 'about',
};
