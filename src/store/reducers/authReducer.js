import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://qaazii.com/dev/public/api/sign-in';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  user: {},
  error: '',
};

export const signin = createAsyncThunk('authReducer/signin', async data => {
  try {
    const response = await axios.post(url, {
      phone: data.phone,
      country_code: '+' + data.callingCode[0],
      password: data.password,
      user_type: 'V',
      login_type: 'I',
    });
    if (response.status !== 200) {
      throw 'Username/password invalid';
    }
    const user = {
      name: response.data.user.name,
      profile_picture: response.data.user.profile_picture,
    };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (e) {
    console.log(e);
    throw 'Username/password invalid';
  }
});
export const signout = createAsyncThunk('authReducer/signout', async data => {
  AsyncStorage.removeItem('user');
});

export const autoSignin = createAsyncThunk(
  'authReducer/autoSignin',
  async () => {
    const data = await AsyncStorage.getItem('user');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  },
);

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
        state.user = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
      })
      .addCase(autoSignin.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isLoggedIn = true;
        }
      });
  },
});

export const {setLogin} = authReducer.actions;
export default authReducer.reducer;
