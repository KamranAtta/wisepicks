import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import AddProject from './views/addProject';
import SelectDropDown from './components/common/Select';
import HeaderComponent from './components/Header';
import EditProject from './views/editProject';
import CloneProject from './views/cloneProject';
import RequestResource from './views/requestResource';
import ResourceList from './views/ResouceList';
import ProjectList from './views/ProjectList';
const Router = () => {
  return (
    <Fragment>
      <HeaderComponent></HeaderComponent>
      <Routes>
        <Route path='/' element={<ResourceList />} />
        <Route path='/projects' element={<ProjectList />} />
        <Route path='/resources' element={<ResourceList />} />
        <Route path='/test' element={<SelectDropDown />} />
        <Route path='/addProject' element={<AddProject />} />
        <Route path='/editProject' element={<EditProject />} />
        <Route path='/cloneProject' element={<CloneProject />} />
        <Route path='/requestResource' element={<RequestResource />} />
      </Routes>
    </Fragment>
  );
};

export default Router;
