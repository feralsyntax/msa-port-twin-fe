const app = '/app';

export const routes = {
  home: () => '/',
  app: () => app,
  dashboard: () => app,
  vessels: () => `${app}/vessels`,
  vesselNew: () => `${app}/vessels/new`,
  vesselDetails: (id: string) => `${app}/vessels/${encodeURIComponent(id)}`,
  berths: () => `${app}/berths`,
  berthNew: () => `${app}/berths/new`,
  berthDetails: (id: string) => `${app}/berths/${encodeURIComponent(id)}`,
  scenarios: () => `${app}/scenarios`,
  scenarioNew: () => `${app}/scenarios/new`,
  scenarioDetails: (id: string) => `${app}/scenarios/${encodeURIComponent(id)}`,
  simulations: () => `${app}/simulations`,
  simulationNew: () => `${app}/simulations/new`,
  simulationDetails: (id: string) => `${app}/simulations/${encodeURIComponent(id)}`,
  compare: (runA?: string, runB?: string) => {
    const params = new URLSearchParams();
    if (runA) params.set('run_a', runA);
    if (runB) params.set('run_b', runB);
    const query = params.toString();
    return `${app}/simulations/compare${query ? `?${query}` : ''}`;
  },
  predictions: () => `${app}/predictions`,
  predictionNew: () => `${app}/predictions/new`,
  predictionDetails: (id: string) => `${app}/predictions/${encodeURIComponent(id)}`,
  map: () => `${app}/map`,
  about: () => `${app}/about`,
};

export const appRoutePaths = {
  vessels: 'vessels',
  vesselDetails: 'vessels/:vesselId',
  vesselNew: 'vessels/new',
  berths: 'berths',
  berthDetails: 'berths/:berthId',
  berthNew: 'berths/new',
  scenarios: 'scenarios',
  scenarioDetails: 'scenarios/:scenarioId',
  scenarioNew: 'scenarios/new',
  simulations: 'simulations',
  simulationDetails: 'simulations/:simulationId',
  simulationNew: 'simulations/new',
  compare: 'simulations/compare',
  predictions: 'predictions',
  predictionDetails: 'predictions/:predictionId',
  predictionNew: 'predictions/new',
  map: 'map',
  about: 'about',
};
