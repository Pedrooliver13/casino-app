// Packages
import { useQuery } from '@tanstack/react-query';

// Services
import { UserService } from '@/services/user-services';

interface UseGetAllUsersProps {
  page?: number;
  limit?: number;
  search?: string;
  affiliation?: string;
}

export const useGetAllUsers = (props: UseGetAllUsersProps) => {
  const value = props.search
    ? String(props.search).trim().toLowerCase()
    : undefined;

  const isDocument = value && value?.replace(/\D/g, '').length >= 11;

  return useQuery({
    queryKey: ['users', props.page, props.limit],
    queryFn: async () =>
      await new UserService().getAllUsers({
        page: props?.page || 0,
        limit: props?.limit || 10,
        affiliation: props.affiliation,
        email: !isDocument ? value : undefined,
        document: isDocument ? value?.replace(/\D/g, '') : undefined,
      }),
    staleTime: 1000 * 60 * 5,
    // enabled: Boolean(props?.page && props?.page > 1),
  });
};
