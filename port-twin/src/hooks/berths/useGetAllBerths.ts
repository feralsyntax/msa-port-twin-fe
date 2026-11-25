import { useQuery } from '@tanstack/react-query';
import { berthsList } from '../../api/generated';
import type { Berth } from '../../api/models';

export const useGetAllBerths = () => {
  return useQuery({
    queryKey: ['berthsList', 'all'],
    queryFn: async ({ signal }) => {
      const berths: Berth[] = [];
      let page = 1;

      while (true) {
        const response = await berthsList({ page }, undefined, signal);
        berths.push(...response.results);

        if (!response.next) break;
        page += 1;
      }

      return berths;
    },
    staleTime: 30_000,
  });
};
