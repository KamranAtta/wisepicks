import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: any) {
  const user = localStorage.getItem('user');
  return user ? <>{children}</> : <Navigate to='/login' />;
}

export default PrivateRoute;
