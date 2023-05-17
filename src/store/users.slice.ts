import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  authLoader: boolean;
  initialLoad: boolean;
  isLoggedIn: boolean;
  loading: 'idle' | 'loading';
}

const initialState: UserState = {
  authLoader: false,
  initialLoad: false,
  isLoggedIn: false,
  loading: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAuthLoader(state, action) {
      state.authLoader = action.payload;
    },
  },
});

export const selectAuthLoader = (state: UserState) => state.authLoader;
export const { updateAuthLoader } = userSlice.actions;
export default userSlice.reducer;
