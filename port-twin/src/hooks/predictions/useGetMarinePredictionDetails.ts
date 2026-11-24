import { useQuery } from '@tanstack/react-query';
import { marinePredictionsRetrieve } from '../../api/generated';

export const useGetMarinePredictionDetails = (predictionId: string | undefined) => {
  return useQuery({
    queryKey: ['marinePredictionsRetrieve', predictionId],
    queryFn: ({ signal }) => marinePredictionsRetrieve(predictionId!, undefined, signal),
    enabled: Boolean(predictionId),
    staleTime: 30_000,
  });
};
