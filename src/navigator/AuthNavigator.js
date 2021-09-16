import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RegistrationScreen from '../screens/RegistrationScreen';
import SigninScreen from '../screens/SigninScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={SigninScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
