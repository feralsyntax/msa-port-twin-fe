import { useQuery } from "@tanstack/react-query";
import { berthsList } from "../../api/generated/berths/berths";

export const useBerths = (page: number = 1) => {
  return useQuery({
    queryKey: ["berthsList", page],
    queryFn: ({ signal }) => berthsList({ page }, undefined, signal),
    enabled: page >= 1,
  });
};
