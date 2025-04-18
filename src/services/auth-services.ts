// Services
import { httpClient } from '@/services/axios';

interface ISignIn {
  email: string;
  password?: string;
  tenant?: string;
  code?: string;
}

interface ISignInResponse {
  token: string;
}

export class AuthService {
  static async signIn({ email, password, tenant, code }: ISignIn) {
    const { data } = await httpClient.post<ISignInResponse>('/admin/login', {
      email,
      password,
      tenant,
      code,
    });

    return data;
  }
}
