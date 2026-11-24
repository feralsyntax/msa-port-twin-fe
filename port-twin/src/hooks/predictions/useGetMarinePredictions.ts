import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { marinePredictionsList } from '../../api/generated';

export const useGetMarinePredictions = (page = 1) => {
  return useQuery({
    queryKey: ['marinePredictionsList', { page }],
    queryFn: ({ signal }) => marinePredictionsList({ page }, undefined, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
