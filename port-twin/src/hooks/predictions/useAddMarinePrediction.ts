import { useMutation, useQueryClient } from '@tanstack/react-query';
import { marinePredictionsCreateCreate } from '../../api/generated';
import type { MarinePredictionRequest } from '../../api/models';

export const useAddMarinePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: MarinePredictionRequest) => marinePredictionsCreateCreate(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marinePredictionsList'] });
      queryClient.invalidateQueries({ queryKey: ['marinePredictionStatus'] });
      queryClient.invalidateQueries({ queryKey: ['dataStatusRetrieve'] });
    },
  });
};
