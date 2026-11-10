import { useQuery } from '@tanstack/react-query';
import { simulationsRetrieve } from '../../api/generated';

const useGetSimulationDetails = (simulationId: string) => {
  return useQuery({
    queryKey: ['simulationsRetrieve', simulationId],
    queryFn: () => simulationsRetrieve(simulationId),
    enabled: Boolean(simulationId),
    staleTime: 30_000,
  });
};

export default useGetSimulationDetails;
