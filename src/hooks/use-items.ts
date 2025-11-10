import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { amazonItemsApi } from '@/lib/api';

const useAllItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: () => amazonItemsApi.getProducts(),
    staleTime: 120000,
    gcTime: 120000,
  });
};
const useCreateItem = () => {
  const queryClient = useQueryClient();

  const createItemMutation = useMutation({
    mutationFn: (params: any) => {
      return amazonItemsApi.createBulkProducts(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    }
  });

  return createItemMutation;
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const updateCategoryMutation = useMutation({
    mutationFn: (params: { id: number; category: FormData }) => {
      const { id, category } = params;
      return categoriesApi.updateCategory(id, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });
  return updateCategoryMutation;
};

const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const deleteItemMutation = useMutation({
    mutationFn: (id: number) => {
      return amazonItemsApi.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    }
  });
  return deleteItemMutation;
};

export {
  useAllItems,
  useCreateItem,
  // useUpdateCategory,
  useDeleteItem
};

