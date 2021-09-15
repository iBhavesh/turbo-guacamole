import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import AccountScreen from '../screens/AccountScreen';
import DashboardScreen from '../screens/DashboardScreen';
import colors from '../constants/colors';
import {isIOS} from 'react-native-elements/dist/helpers';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        options={{
          title: 'Dashboard',
          headerTintColor: !isIOS ? colors.white : colors.primary,
          headerStyle: !isIOS ? {backgroundColor: colors.primary} : {},
        }}
        name="DashboardScreen"
        component={DashboardScreen}
      />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
