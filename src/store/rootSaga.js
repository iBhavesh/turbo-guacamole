import {all, fork} from 'redux-saga/effects';
import signinSaga from './sagas/authSaga';

export default function* rootSaga() {
  yield all([fork(signinSaga)]);
}
