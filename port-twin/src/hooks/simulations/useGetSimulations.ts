import { useQuery } from '@tanstack/react-query';
import { simulationsList } from '../../api/generated';
import type { SimulationHistoryItem } from '../../api/models';

export const useGetSimulations = () => {
  return useQuery({
    queryKey: ['simulationsList'],
    queryFn: async () => {
      const simulations: SimulationHistoryItem[] = [];
      let page = 1;

      while (true) {
        const response = await simulationsList({ page });

        simulations.push(...response.results);

        if (!response.next) {
          break;
        }

        page += 1;
      }

      return simulations;
    },
    staleTime: 30_000,
  });
};

export default useGetSimulations;
