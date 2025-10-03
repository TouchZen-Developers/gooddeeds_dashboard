import axios from "axios";
import apiClient from "../lib/api-client";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const useAllClaims = () => {
  return useQuery({
    queryKey: ["claims"],
    queryFn: () => axios.get("/api/claims"),
    staleTime: 120000,
    gcTime: 120000,
  });
};

const useCreateClaim = () => {
  const queryClient = useQueryClient();

  const createClaimMutation = useMutation({
    mutationFn: (params) => {
      return apiClient.post("/api/claims/reject", params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    }
  });

  return createClaimMutation;
};


export {
  useAllClaims, useCreateClaim
};

