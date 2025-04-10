// Packages
import { useQuery } from '@tanstack/react-query';

// Services
import { UserService } from '@/services/user-services';

interface useGetUserDepositByIdProps {
  id?: string;
  page: number;
  limit: number;
}

export const useGetUserDepositById = (props: useGetUserDepositByIdProps) => {
  return useQuery({
    queryKey: ['userDepositId', props?.id, props?.page, props?.limit],
    queryFn: async () =>
      await new UserService().getUserDepositById({
        id: props?.id || '',
        page: props?.page,
        limit: props?.limit,
      }),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(props?.id),
  });
};
