const {configureStore} = require('@reduxjs/toolkit');
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
