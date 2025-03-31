// Services
import { httpClient } from '@/services/axios';

interface ISignInDTO {
  email: string;
  password?: string;
  tenant?: string;
  code?: string;
}

interface ISignInResponse {
  access_token: string;
}

export class AuthService {
  static async signIn({ email, password, tenant, code }: ISignInDTO) {
    const { data } = await httpClient.post<ISignInResponse>('/admin/login', {
      email,
      password,
      tenant,
      code,
    });

    return data;
  }
}
