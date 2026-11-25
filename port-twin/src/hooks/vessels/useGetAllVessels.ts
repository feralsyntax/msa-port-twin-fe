import { useQuery } from '@tanstack/react-query';
import { vesselsList } from '../../api/generated';
import type { VesselResponse } from '../../api/models';

export const useGetAllVessels = (enabled = true) => {
  return useQuery({
    queryKey: ['vesselsList', 'all'],
    queryFn: async ({ signal }) => {
      const vessels: VesselResponse[] = [];
      let page = 1;

      while (true) {
        const response = await vesselsList({ page }, undefined, signal);
        vessels.push(...response.results);

        if (!response.next) break;
        page += 1;
      }

      return vessels;
    },
    enabled,
    staleTime: 30_000,
  });
};
