import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import ResourceList from './views/ResouceList';
import HeaderComponent from './components/Header';

const Router = () => {
  return (
    <Fragment>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/resources' element={<ResourceList />} />
      </Routes>
    </Fragment>
  );
};

export default Router;
