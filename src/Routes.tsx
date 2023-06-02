import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/Header';
import EditProject from './views/EditProject';
import CloneProject from './views/CloneProject';
import RequestResource from './views/RequestResource';
import ResourceList from './views/ResouceList';
import ProjectList from './views/ProjectList';
import AddProject from './views/AddProject';

const Router = () => {
  return (
    <Fragment>
      <HeaderComponent></HeaderComponent>
      <Routes>
        <Route path='/' element={<ResourceList />} />
        <Route path='/projects' element={<ProjectList />} />
        <Route path='/resources' element={<ResourceList />} />
        <Route path='/addProject' element={<AddProject />} />
        <Route path='/editProject' element={<EditProject />} />
        <Route path='/cloneProject' element={<CloneProject />} />
        <Route path='/requestResource' element={<RequestResource />} />
      </Routes>
    </Fragment>
  );
};

export default Router;
