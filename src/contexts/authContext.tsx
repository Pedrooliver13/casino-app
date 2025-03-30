import { storageKeys } from '@/config/storageKeys';

// Packages
import { createContext, useCallback, useState } from 'react';

// Services
import { AuthService } from '@/services/authServices';

interface IAuthContextValue {
  signedIn: boolean;
  signIn(data: {
    email: string;
    password?: string;
    tenant: string;
    code?: string;
  }): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem(storageKeys.accessToken);
  });

  const signIn = useCallback(
    async (data: {
      email: string;
      password: string;
      tenant: string;
      code: string;
    }) => {
      const { access_token } = await AuthService.signIn(data);
      localStorage.setItem(storageKeys.accessToken, access_token);

      setSignedIn(true);
    },
    [],
  );

  const value: IAuthContextValue = {
    signedIn,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
