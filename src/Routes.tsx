import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './views/home';
import SearchBar from './components/common/Search';

const Router = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<SearchBar />} />
      </Routes>
    </Fragment>
  );
};

export default Router;
