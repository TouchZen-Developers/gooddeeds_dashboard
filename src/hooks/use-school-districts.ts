import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { schoolDistrictsApi } from "@/lib/api";

const useAllSchoolDistricts = () => {
  return useQuery({
    queryKey: ["schoolDistricts"],
    queryFn: () => schoolDistrictsApi.getSchoolDistricts(),
    staleTime: 120000,
    gcTime: 120000,
  });
};

const useDeleteSchoolDistrict = () => {
  const queryClient = useQueryClient();

  const deleteSchoolDistrictMutation = useMutation({
    mutationFn: (id: number) => {
      return schoolDistrictsApi.deleteSchoolDistrict(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolDistricts"] });
    }
  });

  return deleteSchoolDistrictMutation;
};

const usePostSchoolDistrict = () => {
  const queryClient = useQueryClient();

  const postSchoolDistrictsMutation = useMutation({
    mutationFn: (productData: Record<string, unknown>) => {
      return schoolDistrictsApi.postSchoolDistrict(productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolDistricts"] });
    }
  });

  return postSchoolDistrictsMutation;
};

const useUpdateSchoolDistrict = () => {
  const queryClient = useQueryClient();

  const updateSchoolDistrictMutation = useMutation({
    mutationFn: ({ id, schoolDistrictData }: { id: number; schoolDistrictData: Record<string, unknown> }) => {
      return schoolDistrictsApi.updateSchoolDistrict(id, schoolDistrictData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolDistricts"] });
    }
  });

  return updateSchoolDistrictMutation;
};
export {
  useAllSchoolDistricts,
  useDeleteSchoolDistrict,
  usePostSchoolDistrict,
  useUpdateSchoolDistrict
};

