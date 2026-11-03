import { useMutation, useQueryClient } from "@tanstack/react-query";
import { vesselsCreate } from "../../api/generated";
import type { VesselCreateRequest } from "../../api/models";

export const useAddVessel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VesselCreateRequest) => vesselsCreate(data),

    onSuccess: () => {
      // Refresh the vessels list after successful registration.
      queryClient.invalidateQueries({
        queryKey: ["vesselsList"],
      });
    },

    onError: (error) => {
      console.error("Failed to register vessel:", error);
    },
  });
};
