import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const url = 'https://qaazii.com/dev/public/api/sign-in';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: '',
};

export const signin = createAsyncThunk('authReducer/signin', async data => {
  console.log(data);
  try {
    const response = await axios.post(url, {
      phone: data.phone,
      country_code: '+91',
      password: data.password,
      user_type: 'V',
      login_type: 'I',
    });
    if (response.status !== 200) {
      throw 'Username/password invalid';
    }
    await Keychain.setGenericPassword('isLoggedIn', 'true');
  } catch (e) {
    console.log(e);
    throw 'Username/password invalid';
  }
});

const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      });
  },
});

export const {setLogin} = authReducer.actions;
export default authReducer.reducer;
