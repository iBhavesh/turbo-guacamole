import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import AccountScreen from '../screens/AccountScreen';
import DashboardScreen from '../screens/DashboardScreen';

export type DrawerParamList = {
  DashboardScreen: undefined;
  Account: undefined;
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        options={{
          title: 'Dashboard',
        }}
        name="DashboardScreen"
        component={DashboardScreen}
      />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
