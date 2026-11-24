import { useQuery } from '@tanstack/react-query';
import { marinePredictionsRetrieve } from '../../api/generated';

export const useGetMarinePredictionStatus = (
  predictionId: string | undefined,
  recheckIntervalMs = 2_000,
) => {
  return useQuery({
    queryKey: ['marinePredictionStatus', predictionId],
    queryFn: ({ signal }) => marinePredictionsRetrieve(predictionId!, undefined, signal),
    enabled: Boolean(predictionId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'completed' || status === 'failed' ? false : recheckIntervalMs;
    },
  });
};
