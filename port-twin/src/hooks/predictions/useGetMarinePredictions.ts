import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { marinePredictionsList } from '../../api/generated';

export const useGetMarinePredictions = (page = 1, fetchAllPages = false) => {
  return useQuery({
    queryKey: fetchAllPages
      ? ['marinePredictionsList', 'all']
      : ['marinePredictionsList', { page }],
    queryFn: async ({ signal }) => {
      const firstPage = await marinePredictionsList({ page }, undefined, signal);
      if (!fetchAllPages) return firstPage;

      const results = [...firstPage.results];
      let nextPage = page + 1;
      let response = firstPage;
      while (response.next) {
        response = await marinePredictionsList({ page: nextPage }, undefined, signal);
        results.push(...response.results);
        nextPage += 1;
      }

      return { ...firstPage, next: null, results };
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
