// Packages
import { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Services
import { AuthService } from '@/services/auth-services';

// Configs
import { storageKeys } from '@/config/storage-keys';

interface IAuthContextValue {
  signedIn: boolean;
  signIn(data: {
    email: string;
    password?: string;
    tenant: string;
    code?: string;
  }): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

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
      const { token } = await AuthService.signIn(data);
      localStorage.setItem(storageKeys.accessToken, token);

      setSignedIn(true);
      navigate('/');
    },
    [navigate],
  );

  const signOut = useCallback(() => {
    localStorage.clear();
    setSignedIn(false);
  }, []);

  const value: IAuthContextValue = {
    signedIn,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
