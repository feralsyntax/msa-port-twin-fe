import ScenarioDetailsTopBar from '../../../components/Scenarios/ScenarioDetails/ScenarioDetailsTopBar/ScenarioDetailsTopBar';
import ScenarioDetailsHeader from '../../../components/Scenarios/ScenarioDetails/ScenarioDetailsHeader/ScenarioDetailsHeader';
import ScenarioMetrics from '../../../components/Scenarios/ScenarioDetails/ScenarioMetrics/ScenarioMetrics';
import ScenarioParameters from '../../../components/Scenarios/ScenarioDetails/ScenarioParameters/ScenarioParameters';
import ScenarioSimulationHistory, {
  type ScenarioSimulation,
} from '../../../components/Scenarios/ScenarioDetails/ScenarioSimulationHistory/ScenarioSimulationHistory';

import './ScenarioDetails.scss';

const scenario = {
  name: 'Baseline Operations',
  description: 'Standard port operations with expected vessel arrivals.',
  status: 'ready' as const,

  expectedArrivals: 14,
  arrivalInterval: 3.5,
  averageServiceTime: 8.0,
  simulationHours: 48,

  availableBerths: 2,
  totalBerths: 4,

  availableBerthNames: ['Berth 1 (Container)', 'Berth 3 (Bulk)'],

  createdAt: '2025-05-12T10:00:00Z',
  updatedAt: '2025-05-12T13:42:00Z',
};

const simulations: ScenarioSimulation[] = [
  {
    id: 'sim_9a4b8e',
    status: 'completed',
    executedAt: '2025-05-12T14:08:00Z',
  },
  {
    id: 'sim_7c1f4a',
    status: 'completed',
    executedAt: '2025-05-12T11:30:00Z',
  },
  {
    id: 'sim_3d9e2b',
    status: 'failed',
    executedAt: '2025-05-11T16:45:00Z',
  },
];

const ScenarioDetailsPage = () => {
  return (
    <div className="scenario-details">
      <ScenarioDetailsTopBar scenarioName={scenario.name} />

      <div className="scenario-details__provenance">
        <span aria-hidden="true">◇</span>
        <span>Simulated Scenario Configuration — Not Live Port Data</span>
      </div>

      <main className="scenario-details__content">
        <div className="scenario-details__container">
          <ScenarioDetailsHeader
            name={scenario.name}
            description={scenario.description}
            status={scenario.status}
          />

          <ScenarioMetrics
            expectedArrivals={scenario.expectedArrivals}
            arrivalInterval={scenario.arrivalInterval}
            averageServiceTime={scenario.averageServiceTime}
            simulationHours={scenario.simulationHours}
            availableBerths={scenario.availableBerths}
            totalBerths={scenario.totalBerths}
            activeBerthNames={scenario.availableBerthNames}
          />

          <section className="scenario-details__panels">
            <ScenarioParameters
              arrivalInterval={scenario.arrivalInterval}
              averageServiceTime={scenario.averageServiceTime}
              simulationHours={scenario.simulationHours}
              expectedArrivals={scenario.expectedArrivals}
              availableBerthNames={scenario.availableBerthNames}
              createdAt={scenario.createdAt}
              updatedAt={scenario.updatedAt}
            />

            <ScenarioSimulationHistory simulations={simulations} totalRuns={28} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ScenarioDetailsPage;
