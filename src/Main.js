import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import MainNavigator from './navigator/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigator/AuthNavigator';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogin} from './store/reducers/authReducer';
const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = useSelector(state => state.isLoggedIn);
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
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationContainer>
        {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
};

export default Main;
