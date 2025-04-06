// Packages
import { useQuery } from '@tanstack/react-query';

// Services
import { UserService } from '@/services/user-services';

interface UseGetAllUsersProps {
  page?: number;
  limit?: number;
  search?: string;
}

export const useGetAllUsers = (props: UseGetAllUsersProps) => {
  const value = props.search
    ? String(props.search).trim().toLowerCase()
    : undefined;

  const isDocument = value && value?.replace(/\D/g, '').length >= 11;

  return useQuery({
    queryKey: ['users', props.search, props.page, props.limit],
    queryFn: async () =>
      await new UserService().getAllUsers({
        page: props?.page || 0,
        limit: props?.limit || 10,
        email: !isDocument ? value : undefined,
        document: isDocument ? value?.replace(/\D/g, '') : undefined,
      }),
    enabled: !!props.search,
  });
};
