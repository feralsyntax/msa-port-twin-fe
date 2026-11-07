import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ScenarioCreateUpdateRequest } from '../../api/models';
import { scenariosCreate } from '../../api/generated';

export const useAddScenario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ScenarioCreateUpdateRequest) => scenariosCreate(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['scenariosList'],
      });
    },

    onError: (error) => {
      console.error('Failed to register berth:', error);
    },
  });
};

export default useAddScenario;
