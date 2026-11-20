import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scenariosSimulationsCreate } from '../../api/generated';

export const useAddScenarioSimulation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scenarioId: string) => scenariosSimulationsCreate(scenarioId),

    onSuccess: (_data, scenarioId) => {
      queryClient.invalidateQueries({
        queryKey: ['simulationsList', 'scenario', scenarioId],
      });
    },
    // Errors handled in ScenarioDetails via mutation.error + parseApiError
  });
};

export default useAddScenarioSimulation;
