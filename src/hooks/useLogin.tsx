import { useState } from 'react';
import { getMe } from '../apis/auth.api';
import { useAuthContext } from './useAuthContext';
import { useLogout } from './useLogout';

export const useSignin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useLogout();

  const login = async () => {
    setError(null);
    setIsLoading(true);

    const response = await getMe();
    if (response.statusCode == 401) {
      setIsLoading(false);
      logout();
    } else {
      localStorage.setItem('user', JSON.stringify(response));
      dispatch({ type: 'LOGIN', payload: response });
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
