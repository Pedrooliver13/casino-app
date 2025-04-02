// Packages
import { useContext } from 'react';

// Contexts
import { AuthContext } from '@/contexts/auth-context';

export const useAuthContext = () => useContext(AuthContext);
