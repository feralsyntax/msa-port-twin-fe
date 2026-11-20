import { useMutation, useQueryClient } from '@tanstack/react-query';
import { berthsCreate } from '../../api/generated';
import type { BerthCreateRequest } from '../../api/models';

export const useAddBerth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BerthCreateRequest) => berthsCreate(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['berthsList'],
      });
    },
    // Errors are handled in the page via mutation.error + parseApiError
  });
};
