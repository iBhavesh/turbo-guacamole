import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DetailScreen from '../screens/DetailScreen';
import DrawerNavigator from './DrawerNavigator';

export type MainStackParamList = {
  Dashboard: undefined;
  DetailScreen: {item: {id: number; name: string}};
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
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
