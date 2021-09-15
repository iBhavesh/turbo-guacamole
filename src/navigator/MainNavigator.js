import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {isIOS} from 'react-native-elements/dist/helpers';
import colors from '../constants/colors';
import DetailScreen from '../screens/DetailScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: !isIOS ? colors.white : colors.primary,
        headerStyle: !isIOS ? {backgroundColor: colors.primary} : {},
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Dashboard"
        component={DrawerNavigator}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={({route}) => ({
          title: route.params.item.name,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
