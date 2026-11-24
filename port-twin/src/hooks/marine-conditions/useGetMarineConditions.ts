import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { marineConditionsList } from '../../api/generated';
import type { MarineConditionsListSource } from '../../api/models';

export const useGetMarineConditions = (page = 1, source?: MarineConditionsListSource) => {
  return useQuery({
    queryKey: ['marineConditionsList', { page, source }],
    queryFn: ({ signal }) => marineConditionsList({ page, source }, undefined, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
