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
    mutationFn: (params: {
      category_id: number,
      urls: string[],
    }) => {
      return amazonItemsApi.createBulkProducts(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    }
  });

  return createItemMutation;
};

const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const updateItemMutation = useMutation({
    mutationFn: (params: { id: number; item: FormData }) => {
      const { id, item } = params;
      return amazonItemsApi.updateProduct(id, item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    }
  });
  return updateItemMutation;
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
  useUpdateItem,
  useDeleteItem
};

