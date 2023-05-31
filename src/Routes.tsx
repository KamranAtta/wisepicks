import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './views/home';
import SelectDropDown from './components/common/Select';

const Router = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<SelectDropDown />} />
      </Routes>
    </Fragment>
  );
};

export default Router;
