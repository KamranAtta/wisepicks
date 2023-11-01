import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/Header';
import Home from './views/Home';
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
              <Home />
            }
          />
          <Route
            path='/'
            element={
              <Home />
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
