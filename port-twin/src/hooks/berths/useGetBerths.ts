import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { berthsList } from "../../api/generated";

export const useGetBerths = (page: number) => {
  return useQuery({
    queryKey: ["berthsList", { page }],
    queryFn: ({ signal }) => berthsList({ page }, undefined, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
