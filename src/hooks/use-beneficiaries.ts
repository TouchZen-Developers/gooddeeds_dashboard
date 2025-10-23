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

const useBeneficiary = (id: number) => {
  return useQuery({
    queryKey: ["beneficiary", id],
    queryFn: () => beneficiariesApi.getBeneficiary(id),
    staleTime: 120000,
    gcTime: 120000,
  });
};

// const useCreateCategory = () => {
//   const queryClient = useQueryClient();

//   const createCategoryMutation = useMutation({
//     mutationFn: (params: CategoryItem) => {
//       return categoriesApi.createCategory(params);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["categories"] });
//     }
//   });

//   return createCategoryMutation;
// };

// const useUpdateCategory = () => {
//   const queryClient = useQueryClient();

//   const updateCategoryMutation = useMutation({
//     mutationFn: ({ id, params }: { id: number; params: CategoryItem }) => {
//       return categoriesApi.updateCategory(id, params);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["categories"] });
//     }
//   });

//   return updateCategoryMutation;
// };
// const useDeleteCategory = () => {
//   const queryClient = useQueryClient();

//   const deleteCategoryMutation = useMutation({
//     mutationFn: (id: number) => {
//       return categoriesApi.deleteCategory(id);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["categories"] });
//     }
//   });

//   return deleteCategoryMutation;
// };


export {
  useAllBeneficiaries,
  useBeneficiary
};

