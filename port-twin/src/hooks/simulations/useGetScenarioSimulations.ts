import { useQuery } from '@tanstack/react-query';

import { simulationsList } from '../../api/generated';

export const useGetScenarioSimulations = (scenarioId: string | undefined) => {
  return useQuery({
    queryKey: ['simulationsList', 'scenario', scenarioId],
    queryFn: async () => {
      const simulations = [];
      let page = 1;

      while (true) {
        const response = await simulationsList({ page });

        simulations.push(
          ...response.results.filter((simulation) => simulation.scenario_id === scenarioId),
        );

        if (!response.next) {
          break;
        }

        page += 1;
      }

      return simulations;
    },
    enabled: Boolean(scenarioId),
    staleTime: 30_000,
  });
};

export default useGetScenarioSimulations;
