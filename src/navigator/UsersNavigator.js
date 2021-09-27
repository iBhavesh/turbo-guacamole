import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {isIOS} from 'react-native-elements/dist/helpers';

import colors from '../constants/colors';
import UserEditScreen from '../screens/UserEditScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import UsersScreen from '../screens/UsersScreen';

const Stack = createNativeStackNavigator();

const UsersNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: !isIOS ? colors.white : colors.primary,
        headerStyle: !isIOS ? {backgroundColor: colors.primary} : {},
      }}>
      <Stack.Screen name="TabUserScreen" component={UsersScreen} />
      <Stack.Screen
        name="UserEdit"
        component={UserEditScreen}
        options={{title: 'Edit'}}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{title: 'User Detail'}}
      />
    </Stack.Navigator>
  );
};

export default UsersNavigator;
