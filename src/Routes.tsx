import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './views/Home';

const Router = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Fragment>
  );
};

export default Router;
