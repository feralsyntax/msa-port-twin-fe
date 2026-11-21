import { useState } from 'react';

import './AddSimulation.scss';

import OperationalModeNotice from '../../../components/Simulations/AddSimulation/OperationalModeNotice/OperationalModeNotice';
import ScenarioSelector from '../../../components/Simulations/AddSimulation/ScenarioSelector/ScenarioSelector';
import LockedParameters from '../../../components/Simulations/AddSimulation/LockedParameters/LockedParameters';
import AddSimulationActions from '../../../components/Simulations/AddSimulation/AddSimulationActions/AddSimulationActions';
import AddSimulationHeader from '../../../components/Simulations/AddSimulation/AddSimulationHeader/AddSimulationHeader';
import AddSimulationTopBar from '../../../components/Simulations/AddSimulation/AddSimulationTopBar/AddSimulationTopBar';
import { useGetScenarios } from '../../../hooks/scenarios/useGetScenarios';
import useAddScenarioSimulation from '../../../hooks/simulations/useAddScenarioSimulation';
import type { ScenarioParameters } from '../../../api/models';
import ServerErrors from '../../../components/errors/ServerErrors';
import { parseApiError } from '../../../utils/apiError';

const isScenarioParameters = (value: unknown): value is ScenarioParameters => {
  if (!value || typeof value !== 'object') return false;

  const parameters = value as Record<string, unknown>;

  return (
    typeof parameters.simulation_hours === 'number' &&
    typeof parameters.expected_vessel_arrivals === 'number' &&
    typeof parameters.average_service_time_hours === 'number' &&
    typeof parameters.arrival_interval_hours === 'number' &&
    (parameters.available_berths === undefined || typeof parameters.available_berths === 'number')
  );
};

const AddSimulationPage = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState('');

  const {
    data: scenariosResponse,
    isLoading: isLoadingScenarios,
    isError: isScenariosError,
    error: scenariosError,
    isFetching: isFetchingScenarios,
    refetch: refetchScenarios,
  } = useGetScenarios(1);

  const addScenarioSimulation = useAddScenarioSimulation();

  const scenarios = scenariosResponse?.results ?? [];

  const selectedScenario =
    scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0];

  const selectedParameters =
    selectedScenario && isScenarioParameters(selectedScenario.parameters)
      ? selectedScenario.parameters
      : null;

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    addScenarioSimulation.reset();
  };

  const handleRunSimulation = () => {
    if (!selectedScenario || addScenarioSimulation.isPending) return;

    addScenarioSimulation.mutate(selectedScenario.id);
  };

  const parsedScenariosError = isScenariosError ? parseApiError(scenariosError) : null;
  const parsedRunError = addScenarioSimulation.isError
    ? parseApiError(addScenarioSimulation.error)
    : null;
  const errorMessage =
    parsedRunError?.message ?? 'The simulation could not be queued. Please try again.';

  return (
    <div className="add-simulation-page">
      <AddSimulationTopBar />

      <div className="add-simulation-page__content">
        <div className="add-simulation-page__container">
          <OperationalModeNotice />

          <AddSimulationHeader />

          {(isLoadingScenarios || isScenariosError || parsedScenariosError) && (
            <ServerErrors
              isPending={isLoadingScenarios}
              isError={isScenariosError}
              isFetching={isFetchingScenarios}
              parsedError={parsedScenariosError}
              refetch={refetchScenarios}
              requestedData="saved scenarios"
              noData={false}
            />
          )}

          {!isLoadingScenarios && !isScenariosError && scenarios.length === 0 && (
            <p>No saved scenarios are available. Create a scenario before running a simulation.</p>
          )}

          {selectedScenario && (
            <>
              <ScenarioSelector
                scenarios={scenarios}
                selectedScenario={selectedScenario.id}
                onScenarioChange={handleScenarioChange}
              />

              {selectedParameters ? (
                <LockedParameters parameters={selectedParameters} />
              ) : (
                <p role="alert">
                  The selected scenario has missing or invalid simulation parameters.
                </p>
              )}

              <AddSimulationActions
                onRun={handleRunSimulation}
                disabled={
                  !selectedParameters ||
                  addScenarioSimulation.isPending ||
                  addScenarioSimulation.isSuccess
                }
                status={
                  addScenarioSimulation.isPending
                    ? 'pending'
                    : addScenarioSimulation.isSuccess
                      ? 'success'
                      : addScenarioSimulation.isError
                        ? 'error'
                        : 'idle'
                }
                responseStatus={addScenarioSimulation.data?.status}
                errorMessage={errorMessage}
                errorStatus={parsedRunError?.status}
                errorCode={parsedRunError?.code}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSimulationPage;
