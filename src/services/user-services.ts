// Packages
import { AxiosResponse } from 'axios';
import { httpClient } from './axios';

// Models
import { GetAllUsersResponse } from '@/models/user.model';

interface UserServiceMethods {
  getAllUsers: (params: {
    page: number;
    limit: number;
    email?: string;
  }) => Promise<AxiosResponse<GetAllUsersResponse>>;
}

export class UserService implements UserServiceMethods {
  async getAllUsers(params: {
    page: number;
    limit: number;
    email?: string;
  }): Promise<AxiosResponse<GetAllUsersResponse>> {
    const response = await httpClient.get<GetAllUsersResponse>(`/admin/user`, {
      params: {
        page: params?.page,
        limit: params?.limit,
        email: params?.email,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'pt-BR',
      },
    });

    return response;
  }
}
