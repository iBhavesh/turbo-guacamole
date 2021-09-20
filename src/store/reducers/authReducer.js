import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  user: {},
  error: '',
};

const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    login() {},
    register() {},
    signout(state, action) {
      state.isLoggedIn = false;
    },
    setLogin(state, action) {
      state.isLoggedIn = true;
      if (action.payload) {
        state.user = action.payload;
      }
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {setLogin, setError, setLoading, login, register, signout} =
  authReducer.actions;
export default authReducer.reducer;
