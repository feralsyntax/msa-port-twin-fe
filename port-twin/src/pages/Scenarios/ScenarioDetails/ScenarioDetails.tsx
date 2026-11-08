import { useParams } from 'react-router-dom';

import ScenarioDetailsTopBar from '../../../components/Scenarios/ScenarioDetails/ScenarioDetailsTopBar/ScenarioDetailsTopBar';
import ScenarioDetailsHeader from '../../../components/Scenarios/ScenarioDetails/ScenarioDetailsHeader/ScenarioDetailsHeader';
import ScenarioMetrics from '../../../components/Scenarios/ScenarioDetails/ScenarioMetrics/ScenarioMetrics';
import ScenarioParameters from '../../../components/Scenarios/ScenarioDetails/ScenarioParameters/ScenarioParameters';
import ScenarioSimulationHistory, {
  type ScenarioSimulation,
} from '../../../components/Scenarios/ScenarioDetails/ScenarioSimulationHistory/ScenarioSimulationHistory';

import { useGetScenarioDetails } from '../../../hooks/scenarios/useGetScenarioDetails';
import { useGetScenarioSimulations } from '../../../hooks/simulations/useGetScenarioSimulations';

import type { ScenarioParameters as ApiScenarioParameters } from '../../../api/models';

import './ScenarioDetails.scss';
import useAddScenarioSimulation from '../../../hooks/simulations/useAddScenarioSimulation';

type ScenarioParametersWithNullableBerths = Omit<ApiScenarioParameters, 'available_berths'> & {
  available_berths?: number | null;
};

const ScenarioDetailsPage = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();

  const {
    data: scenario,
    isLoading: isScenarioLoading,
    isError: isScenarioError,
    refetch: refetchScenario,
  } = useGetScenarioDetails(scenarioId);

  const {
    data: simulations = [],
    isLoading: isSimulationsLoading,
    isError: isSimulationsError,
  } = useGetScenarioSimulations(scenarioId);

  const runSimulation = useAddScenarioSimulation();

  if (isScenarioLoading) {
    return (
      <div className="scenario-details scenario-details--state">
        <p>Loading scenario details...</p>
      </div>
    );
  }

  if (isScenarioError || !scenario) {
    return (
      <div className="scenario-details scenario-details--state">
        <p>Unable to load this scenario.</p>
        <button type="button" onClick={() => refetchScenario()}>
          Try again
        </button>
      </div>
    );
  }

  const parameters = scenario.parameters as ScenarioParametersWithNullableBerths;

  const scenarioSimulations: ScenarioSimulation[] = simulations.map((simulation) => ({
    id: simulation.id,
    status: simulation.status ?? 'pending',
    executedAt: simulation.completed_at ?? simulation.started_at ?? simulation.created_at,
  }));

  return (
    <div className="scenario-details">
      <ScenarioDetailsTopBar
        scenarioName={scenario.name}
        onRunSimulation={() => runSimulation.mutate(scenario.id)}
        isRunning={runSimulation.isPending}
      />

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
            expectedArrivals={parameters.expected_vessel_arrivals}
            arrivalInterval={parameters.arrival_interval_hours}
            averageServiceTime={parameters.average_service_time_hours}
            simulationHours={parameters.simulation_hours}
            availableBerths={parameters.available_berths}
          />

          <section className="scenario-details__panels">
            <ScenarioParameters
              arrivalInterval={parameters.arrival_interval_hours}
              averageServiceTime={parameters.average_service_time_hours}
              simulationHours={parameters.simulation_hours}
              expectedArrivals={parameters.expected_vessel_arrivals}
              availableBerths={parameters.available_berths}
              createdAt={scenario.created_at}
              updatedAt={scenario.updated_at}
            />

            {isSimulationsLoading ? (
              <p>Loading simulation history...</p>
            ) : isSimulationsError ? (
              <p>Unable to load simulation history.</p>
            ) : (
              <ScenarioSimulationHistory
                simulations={scenarioSimulations}
                totalRuns={scenarioSimulations.length}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ScenarioDetailsPage;
