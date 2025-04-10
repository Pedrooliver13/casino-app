// Packages
import { useQuery } from '@tanstack/react-query';

// Services
import { UserService } from '@/services/user-services';

interface useGetUserOperationByIdProps {
  id?: string;
}

export const useGetUserOperationById = (
  props: useGetUserOperationByIdProps,
) => {
  return useQuery({
    queryKey: ['userOperationId', props?.id],
    queryFn: async () =>
      await new UserService().getUserOperationById({
        id: props?.id || '',
      }),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(props?.id),
  });
};
