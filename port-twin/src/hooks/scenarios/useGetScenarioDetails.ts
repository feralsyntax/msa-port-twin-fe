import { useQuery } from '@tanstack/react-query';

import { scenariosRetrieve } from '../../api/generated';

export const useGetScenarioDetails = (scenarioId: string | undefined) => {
  return useQuery({
    queryKey: ['scenariosRetrieve', scenarioId],
    queryFn: () => scenariosRetrieve(scenarioId!),
    enabled: Boolean(scenarioId),
    staleTime: 30_000,
  });
};

export default useGetScenarioDetails;
