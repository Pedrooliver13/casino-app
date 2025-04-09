// Packages
import { AxiosResponse } from 'axios';
import { httpClient } from './axios';

// Models
import {
  GetAllUsersResponse,
  GetUserByIdResponse,
  GetUserOperationsByIdResponse,
} from '@/models/user.model';

interface UserServiceMethods {
  getAllUsers: (params: {
    page: number;
    limit: number;
    email?: string;
    document?: string;
    affiliation?: string;
  }) => Promise<AxiosResponse<GetAllUsersResponse>>;

  getUserById: (params: {
    id: string;
  }) => Promise<AxiosResponse<GetUserByIdResponse>>;

  getUserOperation: (params: {
    id: string;
  }) => Promise<AxiosResponse<GetUserOperationsByIdResponse>>;
}

export class UserService implements UserServiceMethods {
  async getAllUsers(params: {
    page: number;
    limit: number;
    email?: string;
    document?: string;
    affiliation?: string;
  }): Promise<AxiosResponse<GetAllUsersResponse>> {
    const response = await httpClient.get<GetAllUsersResponse>(`/admin/user`, {
      params: {
        page: params?.page,
        limit: params?.limit,
        email: params?.email,
        document: params.document,
        affiliation: params.affiliation,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'pt-BR',
      },
    });

    return response;
  }

  async getUserById(params: {
    id: string;
  }): Promise<AxiosResponse<GetUserByIdResponse>> {
    const response = await httpClient.get<GetUserByIdResponse>(
      `/admin/user/${params?.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'pt-BR',
        },
      },
    );

    return response;
  }

  async getUserOperation(params: {
    id: string;
  }): Promise<AxiosResponse<GetUserOperationsByIdResponse>> {
    const response = await httpClient.get<GetUserOperationsByIdResponse>(
      `/admin/user/${params?.id}/operations`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'pt-BR',
        },
      },
    );

    return response;
  }
}
