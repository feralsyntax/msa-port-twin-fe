import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vesselsCreate } from '../../api/generated';
import type { VesselCreateRequest } from '../../api/models';

export const useAddVessel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VesselCreateRequest) => vesselsCreate(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vesselsList'],
      });
    },
    // Errors are handled in the page via mutation.error + parseApiError
  });
};
