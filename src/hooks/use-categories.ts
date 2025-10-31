import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api';

const useAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getCategories(),
    staleTime: 120000,
    gcTime: 120000,
  });
};
const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: (params: FormData) => {
      return categoriesApi.createCategory(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  return createCategoryMutation;
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

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => {
      return categoriesApi.deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });
  return deleteCategoryMutation;
};

export {
  useAllCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory
};

