import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import MainNavigator from './navigator/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigator/AuthNavigator';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
const Main = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationContainer>
        {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
};

export default Main;
