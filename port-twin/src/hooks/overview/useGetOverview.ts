import { useQuery } from '@tanstack/react-query';
import { overviewRetrieve } from '../../api/generated';

export const useGetOverview = () => {
  return useQuery({
    queryKey: ['overviewRetrieve'],
    queryFn: ({ signal }) => overviewRetrieve(undefined, signal),
    staleTime: 30_000,
  });
};
