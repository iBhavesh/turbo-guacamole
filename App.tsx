import 'react-native-gesture-handler';

import React from 'react';

import AuthContextProvider from './src/store/AuthContextProvider';
import Main from './src/Main';

const App = () => {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
};

export default App;
