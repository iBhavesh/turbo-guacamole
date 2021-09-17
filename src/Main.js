import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  View,
} from 'react-native';

import MainNavigator from './navigator/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigator/AuthNavigator';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {autoSignin} from './store/reducers/authReducer';
import colors from './constants/colors';
const Main = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const func = async () => {
      await dispatch(autoSignin());
      SplashScreen.hide();
    };
    func();
  }, [dispatch]);

  // return (
  //   <ImageBackground
  //     style={{width: '100%', height: '100%'}}
  //     source={require('./assets/images/splash.png')}>
  //     <View style={{justifyContent: 'flex-end', paddingBottom: 30, flex: 1}}>
  //       <StatusBar
  //         backgroundColor={colors.secondary}
  //         barStyle="light-content"
  //       />
  //       <ActivityIndicator size="large" />
  //     </View>
  //   </ImageBackground>
  // );

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
