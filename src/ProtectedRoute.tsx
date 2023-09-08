// // ProtectedRoute.tsx
// import React from 'react';
// import { Route, PathRouteProps, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

// // Define the interface for ProtectedRouteProps
// interface ProtectedRouteProps extends PathRouteProps {
//   element: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, ...rest }) => {
//   const { user } = useAuth();

//   return user ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default ProtectedRoute;
