import { useMutation, useQueryClient } from '@tanstack/react-query';
import { berthsCreate } from '../../api/generated';
import type { BerthCreateRequest } from '../../api/models';

export const useAddBerth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BerthCreateRequest) => berthsCreate(data),

    onSuccess: () => {
      // Refresh the berths list after successful registration.
      queryClient.invalidateQueries({
        queryKey: ['berthsList'],
      });
    },

    onError: (error) => {
      console.error('Failed to register berth:', error);
    },
  });
};
