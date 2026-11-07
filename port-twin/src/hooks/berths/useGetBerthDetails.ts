import { useQuery } from '@tanstack/react-query';
import { berthsRetrieve } from '../../api/generated';

export const useGetBerthDetails = (berthId: string | undefined) => {
  return useQuery({
    queryKey: ['berthsRetrieve', berthId],
    queryFn: () => berthsRetrieve(berthId!),
    enabled: Boolean(berthId),
    staleTime: 30_000,
  });
};
