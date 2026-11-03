import { useQuery } from "@tanstack/react-query";
import { vesselsPositionsList } from "../../api/generated";

export const useGetVesselPositions = (vesselId: string | undefined) => {
  return useQuery({
    queryKey: ["vesselsPositionsList", vesselId],
    queryFn: () => vesselsPositionsList(vesselId!),
    enabled: Boolean(vesselId),
    staleTime: 30_000,
  });
};
