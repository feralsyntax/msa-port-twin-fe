import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { scenariosList } from '../../api/generated';

export const useGetScenarios = (page: number) => {
  return useQuery({
    queryKey: ['scenariosList', { page }],
    queryFn: () => scenariosList({ page }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
