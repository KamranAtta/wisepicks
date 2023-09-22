import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }: any) {
  const { token } = useAuth();
  return token?.access_token ? <>{children}</> : <Navigate to='/login' />;
}

export default PrivateRoute;
