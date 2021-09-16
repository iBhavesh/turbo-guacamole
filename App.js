import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import AuthContextProvider from './src/store/AuthContextProvider';
import Main from './src/Main';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
};

export default App;
