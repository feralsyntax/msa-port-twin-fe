import { useQuery } from '@tanstack/react-query';
import { dataStatusRetrieve } from '../../api/generated';

export const useGetDataStatus = () => {
  return useQuery({
    queryKey: ['dataStatusRetrieve'],
    queryFn: ({ signal }) => dataStatusRetrieve(undefined, signal),
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
};
