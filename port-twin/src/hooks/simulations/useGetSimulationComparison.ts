import { useQuery } from '@tanstack/react-query';
import { simulationsCompareRetrieve } from '../../api/generated';

const useGetSimulationComparison = (runAId: string, runBId: string) => {
  return useQuery({
    queryKey: ['simulationsCompareRetrieve', runAId, runBId],
    queryFn: () =>
      simulationsCompareRetrieve({
        run_a: runAId,
        run_b: runBId,
      }),
    enabled: Boolean(runAId && runBId && runAId !== runBId),
    staleTime: 30_000,
  });
};

export default useGetSimulationComparison;
