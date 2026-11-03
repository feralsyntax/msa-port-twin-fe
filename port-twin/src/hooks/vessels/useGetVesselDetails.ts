import { useQuery } from "@tanstack/react-query";
import { vesselsRetrieve } from "../../api/generated";

export const useGetVesselDetails = (vesselId: string | undefined) => {
  return useQuery({
    queryKey: ["vesselsRetrieve", vesselId],
    queryFn: () => vesselsRetrieve(vesselId!),
    enabled: Boolean(vesselId),
    staleTime: 30_000,
  });
};
