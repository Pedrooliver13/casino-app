// Packages
import { useQuery } from '@tanstack/react-query';

// Services
import { UserService } from '@/services/user-services';

interface UseGetAllUsersProps {
  page?: number;
  limit?: number;
  email?: string;
}

export const useGetAllUsers = (props: UseGetAllUsersProps) => {
  return useQuery({
    queryKey: ['users', props.email, props.page, props.limit],
    queryFn: async () =>
      await new UserService().getAllUsers({
        page: props?.page || 0,
        limit: props?.limit || 10,
        email: props?.email
          ? String(props?.email).trim().toLowerCase()
          : undefined,
      }),
    enabled: !!props.email,
  });
};
