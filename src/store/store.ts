/**
 * combine reducer for the store
 */
import { configureStore } from '@reduxjs/toolkit';

/**
 * reducer slices
 */
import usersReducer from './users.slice';
const combineReducers = {
  user: usersReducer,
};

const createStore = () =>
  configureStore({
    reducer: combineReducers,
    devTools: true,
  });
export const store = createStore();
