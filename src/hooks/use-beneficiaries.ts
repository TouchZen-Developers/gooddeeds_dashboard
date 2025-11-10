import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { beneficiariesApi } from "@/lib/api";

const useAllBeneficiaries = (status?: string) => {
  return useQuery({
    queryKey: ["beneficiaries", status],
    queryFn: () => beneficiariesApi.getBeneficiaries({status: status}),
    staleTime: 120000,
    gcTime: 120000,
  });
};

const useBeneficiariesStatistics = () => {
  return useQuery({
    queryKey: ["beneficiaries", "statistics"],
    queryFn: () => beneficiariesApi.getBeneficiariesStatistics(),
    staleTime: 120000,
    gcTime: 120000,
  });
};

const useBeneficiary = (id: number) => {
  return useQuery({
    queryKey: ["beneficiary", id],
    queryFn: () => beneficiariesApi.getBeneficiary(id),
    staleTime: 120000,
    gcTime: 120000,
  });
};

const useApproveBeneficiary = () => {
  const queryClient = useQueryClient();

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return beneficiariesApi.approveBeneficiary(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
    }
  });

  return updateCategoryMutation;
};

const useRejectBeneficiary = () => {
  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => {
      return beneficiariesApi.rejectBeneficiary(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
    }
  });

  return deleteCategoryMutation;
};


export {
  useAllBeneficiaries,
  useBeneficiary,
  useBeneficiariesStatistics,
  useApproveBeneficiary,
  useRejectBeneficiary
};

