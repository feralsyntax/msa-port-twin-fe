import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { vesselsList } from '../../api/generated';

export const useGetVessels = (page: number) => {
  return useQuery({
    queryKey: ['vesselsList', { page }],
    queryFn: () => vesselsList({ page }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
