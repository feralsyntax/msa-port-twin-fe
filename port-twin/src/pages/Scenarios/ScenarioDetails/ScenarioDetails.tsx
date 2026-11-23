import { useParams } from 'react-router-dom';

import TopBar from '../../../components/Common/TopBar/TopBar';
import ScenarioDetailsHeader from '../../../components/Scenarios/ScenarioDetails/ScenarioDetailsHeader/ScenarioDetailsHeader';
import ScenarioMetrics from '../../../components/Scenarios/ScenarioDetails/ScenarioMetrics/ScenarioMetrics';
import ScenarioParameters from '../../../components/Scenarios/ScenarioDetails/ScenarioParameters/ScenarioParameters';
import ScenarioSimulationHistory, {
  type ScenarioSimulation,
} from '../../../components/Scenarios/ScenarioDetails/ScenarioSimulationHistory/ScenarioSimulationHistory';

import { useGetScenarioDetails } from '../../../hooks/scenarios/useGetScenarioDetails';
import { useGetScenarioSimulations } from '../../../hooks/simulations/useGetScenarioSimulations';
import useAddScenarioSimulation from '../../../hooks/simulations/useAddScenarioSimulation';

import type { ScenarioParameters as ApiScenarioParameters } from '../../../api/models';
import { parseApiError } from '../../../utils/apiError';
import ServerErrors from '../../../components/errors/ServerErrors';
import { routes } from '../../../utils/routes';

import './ScenarioDetails.scss';

type ScenarioParametersWithNullableBerths = Omit<ApiScenarioParameters, 'available_berths'> & {
  available_berths?: number | null;
};

const ScenarioDetailsPage = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();

  const {
    data: scenario,
    isPending: isScenarioPending,
    isError: isScenarioError,
    error: scenarioError,
    refetch: refetchScenario,
    isFetching: isScenarioFetching,
  } = useGetScenarioDetails(scenarioId);

  const {
    data: simulations = [],
    isPending: isSimulationsPending,
    isError: isSimulationsError,
    error: simulationsError,
    refetch: refetchSimulations,
    isFetching: isSimulationsFetching,
  } = useGetScenarioSimulations(scenarioId);

  const runSimulation = useAddScenarioSimulation();

  const parsedScenarioError = isScenarioError ? parseApiError(scenarioError) : null;
  const parsedSimulationsError = isSimulationsError ? parseApiError(simulationsError) : null;
  const parsedRunError = runSimulation.isError ? parseApiError(runSimulation.error) : null;

  const showBlockingState =
    isScenarioPending ||
    isScenarioError ||
    parsedScenarioError != null ||
    isScenarioFetching ||
    !scenario;

  if (showBlockingState) {
    return (
      <main className="scenario-details">
        <TopBar
          breadcrumb={{ label: 'Scenarios', to: routes.scenarios() }}
          current={scenario?.name}
          showSearch={false}
          action={
            <button type="button" className="app-topbar__action" disabled>
              <span className="material-symbols-outlined">play_arrow</span>
              <span>Run Simulation</span>
            </button>
          }
        />
        <div className="scenario-details__content">
          <ServerErrors
            isPending={isScenarioPending}
            isError={isScenarioError}
            isFetching={isScenarioFetching}
            parsedError={parsedScenarioError}
            refetch={refetchScenario}
            requestedData="scenario details"
            noData={!isScenarioPending && !isScenarioError && !scenario}
          />
        </div>
      </main>
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
      <TopBar
        breadcrumb={{ label: 'Scenarios', to: routes.scenarios() }}
        current={scenario.name}
        showSearch={false}
        action={
          <button
            type="button"
            className="app-topbar__action"
            onClick={() => {
              runSimulation.reset();
              runSimulation.mutate(scenario.id);
            }}
            disabled={runSimulation.isPending}
          >
            <span className="material-symbols-outlined">play_arrow</span>
            <span>{runSimulation.isPending ? 'Queuing...' : 'Run Simulation'}</span>
          </button>
        }
      />

      <div className="scenario-details__provenance">
        <span aria-hidden="true">◇</span>
        <span>Simulated Scenario Configuration — Not Live Port Data</span>
      </div>

      <main className="scenario-details__content">
        <div className="scenario-details__container">
          {parsedRunError && (
            <div className="scenario-details__run-error" role="alert">
              <p className="scenario-details__run-error-title">Failed to start simulation</p>
              <p className="scenario-details__run-error-message">{parsedRunError.message}</p>
              {(parsedRunError.status != null || parsedRunError.code) && (
                <p className="scenario-details__run-error-meta">
                  {parsedRunError.status != null && <span>HTTP {parsedRunError.status}</span>}
                  {parsedRunError.status != null && parsedRunError.code ? ' · ' : null}
                  {parsedRunError.code && <span>{parsedRunError.code}</span>}
                </p>
              )}
            </div>
          )}

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

            {isSimulationsPending ? (
              <p role="status">Loading simulation history...</p>
            ) : isSimulationsError && parsedSimulationsError ? (
              <div role="alert">
                <p>Failed to load simulation history</p>
                <p>{parsedSimulationsError.message}</p>
                <button
                  type="button"
                  onClick={() => refetchSimulations()}
                  disabled={isSimulationsFetching}
                >
                  {isSimulationsFetching ? 'Retrying…' : 'Try again'}
                </button>
              </div>
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
