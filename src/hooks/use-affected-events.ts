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

const useCreateAffectedEvent = () => {
  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation({
    mutationFn: (event: FormData) => {
      return affectedEventsApi.createAffectedEvent(event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affectedEvents"] });
    }
  });

  return deleteCategoryMutation;
};
const useUpdateAffectedEvent = () => {
  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation({
    mutationFn: ({ id, event }: { id: number, event: FormData }) => {
      return affectedEventsApi.updateAffectedEvent(id, event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affectedEvents"] });
    }
  });

  return deleteCategoryMutation;
};

const useDeleteAffectedEvent = () => {
  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => {
      return affectedEventsApi.deleteAffectedEvent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affectedEvents"] });
    }
  });

  return deleteCategoryMutation;
};

export {
  useAllAffectedEvents,
  useCreateAffectedEvent,
  useUpdateAffectedEvent,
  useDeleteAffectedEvent
};

