import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigator/AuthNavigator';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogin} from './store/reducers/authSlice';
import TabNavigator from './navigator/TabNavigator';
import colors from './constants/colors';
const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading && isLoggedIn) {
      setIsLoading(false);
    }
  }, [isLoading, isLoggedIn]);

  useEffect(() => {
    setIsLoading(true);
    const func = async () => {
      const data = await AsyncStorage.getItem('user');
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
