import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/common/Dashboard'
import Home from './views/Home';
const Router = () => {
  return (
    <Fragment>
      <Dashboard />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Fragment>
  );
};

export default Router;
