import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {all, fork, put, takeLatest} from 'redux-saga/effects';
import {login, setError, setLoading, setLogin} from '../reducers/authReducer';

const url = 'https://qaazii.com/dev/public/api/sign-in';

function* signinUser(action) {
  yield put(setLoading(true));
  try {
    const response = yield axios.post(url, {
      phone: action.payload.phone,
      country_code: '+' + action.payload.callingCode[0],
      password: action.payload.password,
      user_type: 'V',
      login_type: 'I',
    });
    if (response.status !== 200) {
      throw 'Username/password invalid';
    }
    console.log(response.data);
    const user = {
      name: response.data.user.name,
      profile_picture: response.data.profile_picture,
    };
    yield AsyncStorage.setItem('user', JSON.stringify(user));
    yield put(setLogin(user));
  } catch (e) {
    yield put(setError(e.message));
  }
  yield put(setLoading(false));
}

function* watchSigninUser() {
  yield takeLatest(login.type, signinUser);
}

export default function* singinSaga() {
  yield all([fork(watchSigninUser)]);
}
