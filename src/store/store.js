const {configureStore} = require('@reduxjs/toolkit');
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: authReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
