import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import ResourceList from './views/ResouceList';

const Router = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<ResourceList />} />
      </Routes>
    </Fragment>
  );
};

export default Router;
