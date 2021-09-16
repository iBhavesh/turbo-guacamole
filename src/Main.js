import React, {useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';

import MainNavigator from './navigator/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from './store/auth-context';
import AuthNavigator from './navigator/AuthNavigator';
import SplashScreen from 'react-native-splash-screen';
import * as Keychain from 'react-native-keychain';
import {useSelector} from 'react-redux';
const Main = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  useEffect(() => {
    const func = async () => {
      // const data = await Keychain.getGenericPassword();
      // console.log(data);
      // if (data) {
      //   authCtx.setLogin(true);
      // }
      SplashScreen.hide();
    };
    func();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationContainer>
        {!isLoggedIn ? <AuthNavigator /> : <MainNavigator />}
      </NavigationContainer>
    </>
  );
};

export default Main;
