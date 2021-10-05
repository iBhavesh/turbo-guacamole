import React, {useEffect, useState} from 'react';
import {Image, StatusBar, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigator/AuthNavigator';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogin} from './store/reducers/authSlice';
import TabNavigator from './navigator/TabNavigator';
import colors from './constants/colors';
import {setUsers} from './store/reducers/userSlice';
const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [splashScreen, setSplashScreen] = useState(
    require('./assets/images/splash.png'),
  );
  const [statusBarColor, setStatusBarColor] = useState(colors.secondary);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      setSplashScreen(require('./assets/images/splash3.png'));
      setStatusBarColor(colors.secondaryDark);
    }, 3000);
    setTimeout(() => {
      setSplashScreen(require('./assets/images/splash2.png'));
      setStatusBarColor(colors.primary);
    }, 6000);
    setTimeout(() => {
      setSplashScreen('');
    }, 9000);
  }, []);

  useEffect(() => {
    if (isLoading && isLoggedIn) {
      setIsLoading(false);
    }
  }, [isLoading, isLoggedIn]);

  useEffect(() => {
    setIsLoading(true);
    const func = async () => {
      const data = await AsyncStorage.getItem('user');
      const users = await AsyncStorage.getItem('userList');
      if (users) {
        dispatch(setUsers(JSON.parse(users)));
      }
      if (data) {
        dispatch(setLogin(JSON.parse(data)));
      } else {
        setIsLoading(false);
      }
    };
    func();
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (splashScreen) {
    return (
      <>
        <StatusBar backgroundColor={statusBarColor} barStyle="light-content" />
        <Image style={styles.splashImageStyle} source={splashScreen} />
      </>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <NavigationContainer>
        {isLoggedIn ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  splashImageStyle: {
    height: '100%',
    width: '100%',
  },
});
