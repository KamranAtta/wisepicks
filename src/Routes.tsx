import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import AddProject from './views/AddProject';
import EditProject from './views/EditProject';
import ProjectList from './views/ProjectList';
import ResourceList from './views/ResouceList';
import AddResource from './views/AddResource';
import CloneProject from './views/CloneProject';
import HeaderComponent from './components/Header';
import RequestResource from './views/RequestResource';
import AssignResource from './views/AssignResource';
import Login from './views/Auth/Login';
import PrivateRoute from './ProtectedRoute';

const Router = () => {
  return (
    <Fragment>
      <HeaderComponent></HeaderComponent>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ResourceList />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route
          path="/resources"
          element={
            <PrivateRoute>
              <ResourceList />
            </PrivateRoute>
          }
        />
        <Route path='/projects' element={
          <PrivateRoute>
            <ProjectList />
          </PrivateRoute>
        } />
        {/* <Route path='/resources' element={<ResourceList />} /> */}
        <Route path='/add-resource' element={
          <PrivateRoute>
            <AddResource />
          </PrivateRoute>
        } />
        <Route path='/add-project' element={
          <PrivateRoute>
            <AddProject />
          </PrivateRoute>
        } />
        <Route path='/edit-project' element={
          <PrivateRoute>
            <EditProject />
          </PrivateRoute>
        } />
        <Route path='/clone-project' element={
          <PrivateRoute>
            <CloneProject />
          </PrivateRoute>
        } />
        <Route path='/request-resource' element={
          <PrivateRoute>
            <RequestResource />
          </PrivateRoute>
        } />
        <Route path='/assign-resource' element={
          <PrivateRoute>
            <AssignResource />
          </PrivateRoute>
        } />
      </Routes>
    </Fragment>
  );
};

export default Router;
