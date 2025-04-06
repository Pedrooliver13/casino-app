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

  const isEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value ?? '');

  const isEnabled = isEmail || !!value?.replace(/\D/g, '');

  return useQuery({
    queryKey: ['users', props.search, props.page, props.limit],
    queryFn: async () =>
      await new UserService().getAllUsers({
        page: props?.page || 0,
        limit: props?.limit || 10,
        email: isEmail ? value : undefined,
        document: value?.replace(/\D/g, ''),
      }),
    enabled: isEnabled,
  });
};
