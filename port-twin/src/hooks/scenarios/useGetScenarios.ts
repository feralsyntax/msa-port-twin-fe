import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { scenariosList } from '../../api/generated';

export const useGetScenarios = (page: number) => {
  return useQuery({
    queryKey: ['scenariosList', { page }],
    queryFn: ({ signal }) => scenariosList({ page }, undefined, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
