// Packages
import { useQuery } from '@tanstack/react-query';

// Services
import { UserService } from '@/services/user-services';

interface UseGetUserByIdProps {
  id?: string;
}

export const useGetUserById = (props: UseGetUserByIdProps) => {
  return useQuery({
    queryKey: ['userId', props?.id],
    queryFn: async () =>
      await new UserService().getUserById({
        id: props?.id || '',
      }),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(props?.id),
  });
};
