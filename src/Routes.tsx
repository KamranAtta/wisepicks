import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/Header';
import AssignResource from './views/AssignResource';
import Fixture from './views/Fixture';

const Router = () => {
  return (
    <>
      <Fragment>
        <HeaderComponent></HeaderComponent>
        <Routes>
        <Route
            path='/streams/:categoryName'
            element={
              <AssignResource />
            }
          />
          <Route
            path='/'
            element={
              <AssignResource />
            }
          />
          <Route
            path='/fixture/:teams'
            element={
              <Fixture />
            }
          />
        </Routes>
      </Fragment>
    </>
  );
};

export default Router;
