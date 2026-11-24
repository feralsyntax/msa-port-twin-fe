import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { vesselPositionsList } from '../../api/generated';

export const useGetAllVesselPositions = (page = 1) => {
  return useQuery({
    queryKey: ['vesselPositionsList', { page }],
    queryFn: ({ signal }) => vesselPositionsList({ page }, undefined, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
