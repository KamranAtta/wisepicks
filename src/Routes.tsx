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

const Router = () => {
  return (
    <Fragment>
      <HeaderComponent></HeaderComponent>
      <Routes>
        <Route path='/' element={<ResourceList />} />
        <Route path='/projects' element={<ProjectList />} />
        <Route path='/resources' element={<ResourceList />} />
        <Route path='/add-resource' element={<AddResource />} />
        <Route path='/add-project' element={<AddProject />} />
        <Route path='/edit-project' element={<EditProject />} />
        <Route path='/clone-project' element={<CloneProject />} />
        <Route path='/request-resource' element={<RequestResource />} />
        <Route path='/assign-resource' element={<AssignResource />} />
      </Routes>
    </Fragment>
  );
};

export default Router;
