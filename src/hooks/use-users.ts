import {
  useQuery,
} from '@tanstack/react-query';
import { usersApi } from "@/lib/api";

const useAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => usersApi.getUsers(),
    staleTime: 120000,
    gcTime: 120000,
  });
};

export {
  useAllUsers
};

