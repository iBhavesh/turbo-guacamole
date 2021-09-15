import React, {useContext} from 'react';
import {StatusBar} from 'react-native';

import MainNavigator from './navigator/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from './store/auth-context';
import AuthNavigator from './navigator/AuthNavigator';
const Main = () => {
  const isAuthenticated = useContext(AuthContext);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationContainer>
        {!isAuthenticated?.isLoggedIn ? <AuthNavigator /> : <MainNavigator />}
      </NavigationContainer>
    </>
  );
};

export default Main;
