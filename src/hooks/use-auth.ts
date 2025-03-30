// Packages
import { useContext } from 'react';

// Contexts
import { AuthContext } from '@/contexts/authContext';

export const useAuthContext = () => useContext(AuthContext);
