import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { affectedEventsApi } from '@/lib/api';

const useAllAffectedEvents = () => {
  return useQuery({
    queryKey: ["affectedEvents"],
    queryFn: () => affectedEventsApi.getAffectedEvents(),
    staleTime: 120000,
    gcTime: 120000,
  });
};

export {
  useAllAffectedEvents
};

