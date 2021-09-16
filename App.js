import 'react-native-gesture-handler';

import React from 'react';

import Main from './src/Main';
import {Provider} from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
